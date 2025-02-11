const allImages = document.querySelectorAll("img");
console.log(allImages);

function hideImages(isHidden) {
  if (isHidden) {
    allImages.forEach((image) => {
      image.style.display = "none";
    });
  } else {
    allImages.forEach((image) => {
      image.style.display = "";
    });
  }
}
