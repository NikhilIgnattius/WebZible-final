const parentDocument = window.parent.document;
const featureDiv = document.getElementById("toolTip");
let tooltipElements = [];
let tooltipsEnabled = false;

function createTooltip(element, tooltipText) {
  element.removeAttribute("title");
  element.setAttribute("aria-label", tooltipText);
  element.setAttribute("role", "tooltip");

  const tooltip = document.createElement("span");
  tooltip.classList.add("custom-tooltip");
  tooltip.textContent = tooltipText;

  const styles = tooltip.style;
  styles.setProperty("position", "absolute", "important");
  styles.setProperty("background", "#333", "important");
  styles.setProperty("color", "#fff", "important");
  styles.setProperty("padding", "8px 16px", "important");
  styles.setProperty("border-radius", "4px", "important");
  styles.setProperty("font-size", "15px", "important");
  styles.setProperty("white-space", "nowrap", "important");
  styles.setProperty(
    "box-shadow",
    "0px 2px 6px rgba(0, 0, 0, 0.2)",
    "important"
  );
  styles.setProperty("opacity", "0", "important");
  styles.setProperty("transition", "opacity 0.1s", "important");
  styles.setProperty("z-index", "1000", "important");
  styles.setProperty("pointer-events", "none", "important");

  parentDocument.body.appendChild(tooltip);

  function positionTooltip(event) {
    let x = event.pageX + 10;
    let y = event.pageY + 10;

    const tooltipWidth = tooltip.offsetWidth;
    const tooltipHeight = tooltip.offsetHeight;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const scrollX = window.scrollX || window.pageXOffset;
    const scrollY = window.scrollY || window.pageYOffset;

    if (x + tooltipWidth > screenWidth + scrollX) {
      x = event.pageX - tooltipWidth - 10; // Move left
    }
    if (y + tooltipHeight > screenHeight + scrollY) {
      y = event.pageY - tooltipHeight - 10; // Move up
    }

    tooltip.style.left = `${x}px`;
    tooltip.style.top = `${y}px`;
  }

  function showTooltip(event) {
    positionTooltip(event);
    tooltip.style.opacity = "1";
  }

  function hideTooltip() {
    tooltip.style.opacity = "0";
  }

  element.addEventListener("mouseenter", showTooltip);
  element.addEventListener("mousemove", positionTooltip);
  element.addEventListener("mouseleave", hideTooltip);
  element.addEventListener("focus", showTooltip);
  element.addEventListener("blur", hideTooltip);

  tooltipElements.push({ element, showTooltip, positionTooltip, hideTooltip });
}

function displayToolTips() {
  featureDiv.classList.add("selected");
  const elements = parentDocument.querySelectorAll("*");
  elements.forEach((element) => {
    const tagName = element.tagName.toLowerCase();
    const hasTitle = element.hasAttribute("title");
    const hasAriaLabel = element.hasAttribute("aria-label");
    const hasAlt = element.hasAttribute("alt");

    if (hasAriaLabel) {
      createTooltip(element, element.ariaLabel);
    } else if (hasTitle) {
      createTooltip(element, element.title);
    } else if ((tagName === "button" || tagName === "a") && !hasAriaLabel) {
      createTooltip(element, element.innerText.trim());
    } else if (tagName === "img" && hasAlt) {
      createTooltip(element, element.alt);
    } else if (tagName === "img" && !hasAlt) {
      createTooltip(element, "Image description missing");
    } else if (hasTitle && !hasAriaLabel) {
      createTooltip(element, element.getAttribute("title"));
    }
  });
}

function disableToolTips() {
  featureDiv.classList.remove("selected");
  tooltipElements.forEach(
    ({ element, showTooltip, positionTooltip, hideTooltip }) => {
      element.removeEventListener("mouseenter", showTooltip);
      element.removeEventListener("mousemove", positionTooltip);
      element.removeEventListener("mouseleave", hideTooltip);
      element.removeEventListener("focus", showTooltip);
      element.removeEventListener("blur", hideTooltip);
    }
  );
  tooltipElements = [];
}

export default function toggleToolTips() {
  if (tooltipsEnabled) {
    disableToolTips();
  } else {
    displayToolTips();
  }
  tooltipsEnabled = !tooltipsEnabled;

  function resetStyles() {
    disableToolTips();
  }
  return { resetStyles };
}
