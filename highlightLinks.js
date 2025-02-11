let isStylesApplied = false; // State to track if styles are applied

export default function toggleHighlightLinks() {
  const allLinks = window.parent.document.querySelectorAll("a");

  if (isStylesApplied) {
    // Reset styles
    resetStyles();
  } else {
    // Apply styles
    document.querySelector("#highlightLinks").classList.add("selected");
    allLinks.forEach((element) => {
      if (element.hasAttribute("href")) {
        element.style.setProperty("color", "yellow", "important");
        element.style.setProperty("background-color", "black", "important");
        element.style.setProperty("text-decoration", "underline", "important");
      }

      // Apply styles for children
      element.querySelectorAll("*").forEach((child) => {
        child.style.setProperty("color", "inherit", "important");
        child.style.setProperty("background-color", "inherit", "important");
        child.style.setProperty("text-decoration", "underline", "important");
      });
    });

    isStylesApplied = true; // Update state
    console.log("Highlight applied to links.");
  }
  function resetStyles() {
    document.querySelector("#highlightLinks").classList.remove("selected");
    allLinks.forEach((element) => {
      element.style.removeProperty("color");
      element.style.removeProperty("background-color");
      element.style.removeProperty("text-decoration");

      // Reset styles for children
      element.querySelectorAll("*").forEach((child) => {
        child.style.removeProperty("color");
        child.style.removeProperty("background-color");
        child.style.removeProperty("text-decoration");
      });
    });

    isStylesApplied = false; // Update state
    console.log("Highlight removed from links.");
  }
  return { resetStyles };
}
