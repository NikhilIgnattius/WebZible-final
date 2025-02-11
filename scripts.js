console.log("scripts.js running")
import contrastChanger from "./contrastChanger.js";
import highlightLink from "./highlightLinks.js";
import biggerText from "./biggerText.js";
import increaseLineHeight from "./lineHeight.js";
import saturationChange from "./saturation.js";
import cursorChanger from "./cursor.js";
import changeAlignment from "./textAlignment.js";
import textSpacing from "./textSpacing.js";
import changeText from "./legibleFonts.js";
import hideImages from "./hideImages.js";
import toolTip from "./toolTips.js";

const parentDocument = window.parent.document;

document
  .getElementById("contrastChange")
  .addEventListener("click", contrastChanger);

document
  .getElementById("highlightLinks")
  .addEventListener("click", highlightLink);

document.getElementById("biggerText").addEventListener("click", biggerText);

document.getElementById("textSpacing").addEventListener("click", textSpacing);

document.getElementById("hideImages").addEventListener("click", hideImages);

document
  .getElementById("lineHeight")
  .addEventListener("click", increaseLineHeight);

document
  .getElementById("saturationChange")
  .addEventListener("click", saturationChange);

document.getElementById("legibleFonts").addEventListener("click", changeText);

document
  .getElementById("cursorChanger")
  .addEventListener("click", cursorChanger);

document
  .getElementById("alignmentChange")
  .addEventListener("click", changeAlignment);

document.getElementById("toolTip").addEventListener("click", toolTip);

document.getElementById("close-widget").addEventListener("click", () => {
  // print("Widget closed.");
  const iframeHTML = parentDocument.querySelector(".iframe-page");
  iframeHTML.style.display = "none";
});

document.getElementById("resetSettings").addEventListener("click", () => {
  contrastChanger().resetMain();
  highlightLink().resetStyles();
  biggerText().resetStyles();
  textSpacing().resetStyles();
  changeText().resetStyles();
  saturationChange().resetStyles();
  increaseLineHeight().resetStyles();
  hideImages().resetStyles();
  toolTip().resetStyles();
  changeAlignment().resetStyles();
});

// let alt = imageAlt;
// console.log(alt().generateAltInputForm());
// console.log(alt().decorativeOnOff());
