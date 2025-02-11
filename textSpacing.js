let clickCount = 0;
const parentDocument = window.parent.document;
const wordSpacingChoices = [".16em", ".32em", ".48em"];
const letterSpacingChoices = [".12em", ".24em", ".36em"];
const choices = ["Small Spacing", "Medium Spacing", "Large Spacing"];
let featureDiv = document.querySelector("#textSpacing");
let featureText = document.querySelector("#spacingText");
export default function increaseTextSpacing() {
  clickCount++;
  if (clickCount <= 3) {
    featureDiv.classList.add("selected");
    const elements = parentDocument.querySelectorAll("body *:not(iframe)");
    elements.forEach((element) => {
      featureText.innerText = choices[clickCount - 1];
      let newWordSpacing = wordSpacingChoices[clickCount - 1];
      let newLetterSpacing = letterSpacingChoices[clickCount - 1];
      element.style.setProperty("word-spacing", newWordSpacing, "important");
      element.style.setProperty(
        "letter-spacing",
        newLetterSpacing,
        "important"
      );
    });
  } else {
    resetStyles();
  }
  function resetStyles() {
    featureText.innerText = "Text Spacing";
    featureDiv.classList.remove("selected");
    const elements = parentDocument.querySelectorAll("body *:not(iframe)");
    elements.forEach((element) => {
      element.style.removeProperty("word-spacing");
      element.style.removeProperty("letter-spacing");
    });
    clickCount = 0;
  }
  return { resetStyles };
}
