let currentTheme = "Reset";
let featureDiv = document.querySelector("#contrastChange");

export default function contrastChanger() {
  const parentDocument = window.parent.document;
  const iframeHTML = parentDocument.querySelector(".iframe-page");

  function resetStyles() {
    if (iframeHTML) {
      iframeHTML.style.filter = "invert(0%)";
    }
    const allElements = parentDocument.querySelectorAll("*");
    allElements.forEach((element) => {
      element.style.removeProperty("color");
      element.style.removeProperty("background-color");
      element.style.removeProperty("border-color");
    });
    parentDocument.querySelector("html").style.removeProperty("filter");
  }

  function applyStyles(elements, styles, content) {
    if (!styles) return;
    document.body.querySelector("#contrastText").innerText = content;
    elements.forEach((element) => {
      for (let property in styles) {
        element.style.setProperty(property, styles[property], "important");
      }
    });
  }

  const themes = ["Reset", "Invert", "Dark", "Light"];
  const nextTheme = themes[(themes.indexOf(currentTheme) + 1) % themes.length];
  currentTheme = nextTheme;

  if (currentTheme === "Reset") {
    document.body.querySelector("#contrastText").innerText = "Contrast +";
    featureDiv.classList.remove("selected");
    resetStyles();
  } else if (currentTheme === "Invert") {
    resetStyles();
    const htmlElement = parentDocument.querySelector("html");
    document.body.querySelector("#contrastText").innerText = "Invert";
    featureDiv.classList.add("selected");
    if (iframeHTML) iframeHTML.style.filter = "invert(100%)";
    htmlElement.style.filter = "invert(100%)";
  } else {
    resetStyles();
    const themeStyles = {
      Dark: {
        text: { color: "#50D0A0", "background-color": "black" },
        link: {
          color: "#FDFF3C",
          "background-color": "black",
          "border-color": "white",
        },
        input: {
          color: "#50D0A0",
          "background-color": "black",
          "border-color": "white",
        },
        content: "Dark",
      },
      Light: {
        text: { color: "black", "background-color": "white" },
        link: {
          color: "blue",
          "background-color": "white",
          "border-color": "black",
        },
        input: {
          color: "black",
          "background-color": "white",
          "border-color": "black",
        },
        content: "Light",
      },
    };

    const selectedTheme = themeStyles[currentTheme]; // ✅ Now defined before use

    applyStyles(
      parentDocument.querySelectorAll(
        "h1, h2, h3, h4, h5, h6, p, li, span, ul"
      ),
      selectedTheme.text,
      selectedTheme.content
    );
    applyStyles(
      parentDocument.querySelectorAll("div, section, body"),
      selectedTheme.text,
      selectedTheme.content
    );

    const linksAndChildren = [];
    parentDocument.querySelectorAll("a").forEach((link) => {
      linksAndChildren.push(link, ...link.querySelectorAll("*"));
    });
    applyStyles(linksAndChildren, selectedTheme.link, selectedTheme.content);

    applyStyles(
      parentDocument.querySelectorAll("input, button"),
      selectedTheme.input,
      selectedTheme.content
    );
  }

  function resetMain() {
    document.body.querySelector("#contrastText").innerText = "Contrast +";
    featureDiv.classList.remove("selected");
    resetStyles();
    currentTheme = "Reset";
  }

  return { resetMain }; // ✅ Always returning an object
}
