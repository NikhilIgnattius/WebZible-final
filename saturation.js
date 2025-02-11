let currentSaturation = "Normal";
const saturationLevels = ["Normal", "Low", "High", "Desaturate"];
const parentDocument = window.parent.document;

export default function changeSaturation() {
  const nextSaturation =
    saturationLevels[
      (saturationLevels.indexOf(currentSaturation) + 1) %
        saturationLevels.length
    ];
  currentSaturation = nextSaturation;
  let element = parentDocument.querySelector("html");
  let text = document.querySelector("#saturationText");
  let featureDiv = document.querySelector("#saturationChange");
  if (currentSaturation === "Low") {
    element.style.setProperty("filter", "saturate(0.5)", "important");
    featureDiv.classList.add("selected");
    text.innerHTML = "Low";
    console.log("Low");
  } else if (currentSaturation === "High") {
    element.style.setProperty("filter", "saturate(3)", "important");
    text.innerHTML = "High";
  } else if (currentSaturation === "Desaturate") {
    element.style.setProperty("filter", "saturate(0)", "important");
    text.innerHTML = "Desaturate";
  } else {
    resetStyles();
  }
  function resetStyles() {
    element.style.removeProperty("filter");
    text.innerHTML = "Saturation";
    featureDiv.classList.remove("selected");
    currentSaturation = "Normal";
  }
  return { resetStyles };
}
