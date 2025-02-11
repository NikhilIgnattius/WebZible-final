let clickCount = 0;
const featureDiv = document.querySelector("#lineHeight");
const featureText = document.querySelector("#lineHeightText");
const parentDocument = window.parent.document;
const choices = [1.75, 2, 2.5];

export default function increaseLineHeight() {
  clickCount++;
  const elements = parentDocument.querySelectorAll("body *:not(iframe)");
  featureDiv.classList.add("selected");

  if (clickCount <= 3) {
    elements.forEach((element) => {
      const newLineHeight = choices[clickCount - 1];
      featureText.innerText = `Line Height (${newLineHeight}x)`;
      element.style.setProperty("line-height", newLineHeight, "important");
    });
  } else {
    resetStyles();
  }
  function resetStyles() {
    featureText.innerText = `Line Height`;
    featureDiv.classList.remove("selected");
    elements.forEach((element) => {
      element.style.removeProperty("line-height");
    });
    clickCount = 0;
  }
  return { resetStyles };
}
