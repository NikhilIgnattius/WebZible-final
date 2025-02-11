var originalBackgroundImages = {};
var allHidden = false;
const parentDocument = window.parent.document;
const featureDiv = document.getElementById("hideImages");

export default function hideOrShowImages() {
  var images = parentDocument.getElementsByTagName("img");
  var elementsWithBackgroundImages = parentDocument.querySelectorAll("*");

  for (var i = 0; i < images.length; i++) {
    if (images[i].style.display !== "none") {
      allHidden = false;
      break;
    }
  }
  for (var i = 0; i < elementsWithBackgroundImages.length; i++) {
    var style = window.getComputedStyle(elementsWithBackgroundImages[i]);
    if (style.backgroundImage !== "none") {
      allHidden = false;
      break;
    }
  }
  if (allHidden) {
    resetStyles();
  } else {
    featureDiv.classList.add("selected");
    for (var i = 0; i < images.length; i++) {
      images[i].style.display = "none";
    }

    for (var i = 0; i < elementsWithBackgroundImages.length; i++) {
      var element = elementsWithBackgroundImages[i];
      var style = window.getComputedStyle(element);

      if (style.backgroundImage !== "none") {
        originalBackgroundImages[i] = style.backgroundImage;
        element.style.backgroundImage = "none";
      }
    }
    allHidden = true;
  }
  console.log(originalBackgroundImages);
  function resetStyles() {
    featureDiv.classList.remove("selected");
    for (var i = 0; i < images.length; i++) {
      images[i].style.display = "";
    }

    for (var i = 0; i < elementsWithBackgroundImages.length; i++) {
      var element = elementsWithBackgroundImages[i];
      var style = window.getComputedStyle(element);
      if (originalBackgroundImages[i] && style.backgroundImage === "none") {
        element.style.backgroundImage = originalBackgroundImages[i];
      }
    }
  }
  return { resetStyles };
}
