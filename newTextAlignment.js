let alignments = ["left", "right", "center", "justify"];
let currentIndex = 0;

let originalStyles = {}; // Object to store original styles for elements

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
  const ELEMENTS = document.body.querySelectorAll("*");
  ELEMENTS.forEach(textAlignment);
}

function changeAlignment() {
  currentIndex = (currentIndex + 1) % alignments.length;
  console.log(`Current Alignment ${alignments[currentIndex]}`);
  editAllElementsAlignments();
}

// Reset alignment to original values stored
function resetAlignment() {
  const ELEMENTS = document.body.querySelectorAll("*");
  ELEMENTS.forEach((element) => {
    const elementKey = `${element.tagName}-${element.id || element.className}`;

    if (originalStyles[elementKey]) {
      const original = originalStyles[elementKey];

      // Reset the styles to original
      if (element.style.textAlign) {
        element.style.removeProperty("text-align");
      }
      if (element.style.justifyContent) {
        element.style.removeProperty("justify-content");
      }
      if (element.style.alignItems) {
        element.style.removeProperty("align-items");
      }

      // Restore the original style
      if (original.textAlign) {
        element.style.setProperty("text-align", original.textAlign);
      }
      if (original.justifyContent) {
        element.style.setProperty("justify-content", original.justifyContent);
      }
      if (original.alignItems) {
        element.style.setProperty("align-items", original.alignItems);
      }
    }
  });
}
