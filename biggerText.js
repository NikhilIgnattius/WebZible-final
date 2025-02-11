let clickCount = 0;
const parentDocument = window.parent.document;
const featureDiv = document.querySelector("#biggerText");
const biggerZoom = [1.2, 1.3, 1.5, 1.6];
const biggerText = [4, 8, 12, 16];

export default function increaseTextSizeOrZoom() {
  const userAgent = navigator.userAgent.toLowerCase();
  const isFirefox = userAgent.indexOf("firefox") > -1;
  const elements = parentDocument.querySelectorAll(
    "body *:not(div,nav,footer,section,header,aside,article,main,iframe)"
  );

  clickCount++;

  if (clickCount <= 4) {
    featureDiv.classList.add("selected");
    if (isFirefox) {
      // Increase font size for Firefox
      elements.forEach((element) => {
        element.style.removeProperty("font-size");
        const currentSize = window.getComputedStyle(element).fontSize;
        const newSize = parseFloat(currentSize) + biggerText[clickCount - 1]; // Increase size by factor
        element.style.setProperty("font-size", newSize + "px", "important");
      });
    } else {
      // Use zoom for other browsers, excluding iframes
      const bodyElements = parentDocument.querySelectorAll(
        "body > *:not(iframe)"
      );
      bodyElements.forEach((element) => {
        let nextZoom = biggerZoom[clickCount - 1];
        element.style.setProperty("zoom", nextZoom, "important");
      });
    }
  } else {
    resetStyles(); // Reset click count
  }
  function resetStyles() {
    featureDiv.classList.remove("selected");
    // Reset styles after four clicks
    if (isFirefox) {
      const elements = parentDocument.querySelectorAll("body *");
      elements.forEach((element) => {
        element.style.removeProperty("font-size"); // Reset font size
      });
    } else {
      const bodyElements = parentDocument.querySelectorAll(
        "body > *:not(iframe)"
      );
      bodyElements.forEach((element) => {
        element.style.removeProperty("zoom"); // Reset zoom
      });
    }
    clickCount = 0;
  }
  return { resetStyles };
}

// Attach the function to a button click event
// document
//   .getElementById("increaseTextSizeButton")
//   .addEventListener("click", increaseTextSizeOrZoom);
