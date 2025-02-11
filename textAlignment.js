let alignments = ["Text Align", "Left", "Right", "Center", "Justify"];
let currentIndex = 0;
let currentIcon = 0;
const parentDocument = window.parent.document;
let iconList = [
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M288 64c0 17.7-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l224 0c17.7 0 32 14.3 32 32zm0 256c0 17.7-14.3 32-32 32L32 352c-17.7 0-32-14.3-32-32s14.3-32 32-32l224 0c17.7 0 32 14.3 32 32zM0 192c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 224c-17.7 0-32-14.3-32-32zM448 448c0 17.7-14.3 32-32 32L32 480c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"/></svg>`,
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M288 64c0 17.7-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l224 0c17.7 0 32 14.3 32 32zm0 256c0 17.7-14.3 32-32 32L32 352c-17.7 0-32-14.3-32-32s14.3-32 32-32l224 0c17.7 0 32 14.3 32 32zM0 192c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 224c-17.7 0-32-14.3-32-32zM448 448c0 17.7-14.3 32-32 32L32 480c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"/></svg>`,
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M448 64c0 17.7-14.3 32-32 32L192 96c-17.7 0-32-14.3-32-32s14.3-32 32-32l224 0c17.7 0 32 14.3 32 32zm0 256c0 17.7-14.3 32-32 32l-224 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l224 0c17.7 0 32 14.3 32 32zM0 192c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 224c-17.7 0-32-14.3-32-32zM448 448c0 17.7-14.3 32-32 32L32 480c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"/></svg>`,
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M352 64c0-17.7-14.3-32-32-32L128 32c-17.7 0-32 14.3-32 32s14.3 32 32 32l192 0c17.7 0 32-14.3 32-32zm96 128c0-17.7-14.3-32-32-32L32 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l384 0c17.7 0 32-14.3 32-32zM0 448c0 17.7 14.3 32 32 32l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L32 416c-17.7 0-32 14.3-32 32zM352 320c0-17.7-14.3-32-32-32l-192 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l192 0c17.7 0 32-14.3 32-32z"/></svg>`,
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M448 64c0-17.7-14.3-32-32-32L32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32zm0 256c0-17.7-14.3-32-32-32L32 288c-17.7 0-32 14.3-32 32s14.3 32 32 32l384 0c17.7 0 32-14.3 32-32zM0 192c0 17.7 14.3 32 32 32l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L32 160c-17.7 0-32 14.3-32 32zM448 448c0-17.7-14.3-32-32-32L32 416c-17.7 0-32 14.3-32 32s14.3 32 32 32l384 0c17.7 0 32-14.3 32-32z"/></svg>`,
];
let originalStyles = {};

function textAlignment(element) {
  const unsupportedTags = ["IMG", "SCRIPT", "STYLE", "CANVAS", "IFRAME"];
  if (unsupportedTags.includes(element.tagName) || element.hidden) return;

  const styles = getComputedStyle(element);

  const elementKey = `${element.tagName}-${element.id || element.className}`; // Unique identifier for each element

  if (!originalStyles[elementKey]) {
    // Store the original text-align or justify-content/align-items value
    // justify-content/align-items value is only available for flex items. For others it's value would be 'normal,
    originalStyles[elementKey] = {
      textAlign: styles.textAlign,
      justifyContent: styles.justifyContent,
      alignItems: styles.alignItems,
    };
  }

  if (styles.display === "flex") {
    // Handle flex containers
    const flexAlignmentMap = {
      left: "flex-start",
      right: "flex-end",
      center: "center",
      justify: "space-between",
    };
    const flexDirection = styles.flexDirection;
    const flexValue = flexAlignmentMap[alignments[currentIndex]];

    if (flexDirection === "row" || flexDirection === "row-reverse") {
      element.style.setProperty("justify-content", flexValue, "important");
    } else if (
      flexDirection === "column" ||
      flexDirection === "column-reverse"
    ) {
      element.style.setProperty("align-items", flexValue, "important");
    }
  } else {
    // Handle regular elements
    element.style.setProperty(
      "text-align",
      alignments[currentIndex],
      "important"
    );
  }
}

function editAllElementsAlignments() {
  const ELEMENTS = parentDocument.body.querySelectorAll("*");
  ELEMENTS.forEach(textAlignment);
}

export default function changeAlignment() {
  currentIndex = (currentIndex + 1) % alignments.length;
  currentIcon = iconList[currentIndex % alignments.length];

  console.log(
    `Current Alignment ${alignments[currentIndex % alignments.length]}`
  );
  let currentAlignment = alignments[currentIndex % alignments.length];
  document.querySelector("#alignText").innerText = currentAlignment;
  document.querySelector("#alignmentIcon").innerHTML = currentIcon;
  //   console.log(parentDocument);
  if (currentAlignment === "Text Align") {
    let featureDiv = document.querySelector("#alignmentChange");
    featureDiv.classList.remove("selected");
    resetAlignment();
    return;
  }
  let featureDiv = document.querySelector("#alignmentChange");
  featureDiv.classList.add("selected");
  editAllElementsAlignments();

  function resetStyles() {
    let featureDiv = document.querySelector("#alignmentChange");
    featureDiv.classList.remove("selected");
    document.querySelector("#alignText").innerText = alignments[0];
    document.querySelector("#alignmentIcon").innerHTML = iconList[0];
    currentIndex = 0;
    currentIcon = 0;

    resetAlignment();
  }
  return { resetStyles };
}

function resetAlignment() {
  const elements = parentDocument.querySelectorAll("body, body *");
  elements.forEach((element) => {
    element.style.textAlign = originalStyles[element] || "";
  });
}
