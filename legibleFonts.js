function loadFonts() {
  const preconnect1 = document.createElement("link");
  preconnect1.rel = "preconnect";
  preconnect1.href = "https://fonts.googleapis.com";
  document.head.appendChild(preconnect1);

  const preconnect2 = document.createElement("link");
  preconnect2.rel = "preconnect";
  preconnect2.href = "https://fonts.gstatic.com";
  preconnect2.crossOrigin = "anonymous";
  document.head.appendChild(preconnect2);

  const fontLink = document.createElement("link");
  fontLink.rel = "stylesheet";
  fontLink.href =
    "https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap";
  document.head.appendChild(fontLink);
}
loadFonts();
let clickCount = 0;
let diffFonts = ["Merriweather", "Lato", "Poppins"];
const parentDocument = window.parent.document;
let featureDiv = document.getElementById("legibleFonts");
let featureText = document.getElementById("legibleText");

export default function changeFonts() {
  const elements = parentDocument.querySelectorAll(
    "h1, h2, h3, h4, h5, h6, p, span, a, strong, em, b, i, u, small, mark, del, ins, sub, sup, blockquote, q, code, pre, abbr, cite, dfn, kbd, samp, var"
  );
  clickCount++;
  featureDiv.classList.add("selected");
  if (clickCount <= 3) {
    //body.style.fontFamily = diffFonts[clickCount - 1];
    featureText.innerText = diffFonts[clickCount - 1] + " Font";
    elements.forEach((element) => {
      element.style.setProperty(
        "font-family",
        `${diffFonts[clickCount - 1]},serif`,
        "important"
      );
    });
  } else {
    resetStyles();
  }
  function resetStyles() {
    featureDiv.classList.remove("selected");
    featureText.innerText = "Legible Fonts";
    elements.forEach((element) => {
      element.style.removeProperty("font-family");
    });
    clickCount = 0;
  }
  return { resetStyles };
}
