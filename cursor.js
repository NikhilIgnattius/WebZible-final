let currentCursor = "Cursor";
let parentDocument = window.parent.document;
let featureDiv = document.querySelector("#cursorChanger");
console.log(featureDiv);

export default function cursorChanger() {
  function bigCursor() {
    // just simply changing cursor by url
    const styleContent = `
  .large-cursor, .large-cursor * {
    cursor: url('Big-Cursor1.png'), auto !important;
    }
    `;

    const ele = parentDocument.createElement("style");
    ele.textContent = styleContent;

    // Cloning the style element for the current document
    const eleClone = ele.cloneNode(true);

    parentDocument.head.appendChild(ele);
    document.head.appendChild(eleClone);
    parentDocument.querySelector("html").classList.add("large-cursor");
    document.querySelector("html").classList.add("large-cursor");
  }

  function createReadingGuide() {
    parentDocument.querySelector("html").classList.remove("large-cursor");
    document.querySelector("html").classList.remove("large-cursor");

    const container = parentDocument.createElement("div"); // creating a parent div and giving them z index so that it could appear on top of every div or section
    const line = parentDocument.createElement("div"); // creating a line for the reading guide
    const pointer = parentDocument.createElement("div"); // creating a pointer to locate the letters

    let style = parentDocument.createElement("style");
    style.textContent = `
    .rg-line01 {
  position: fixed;
  z-index: 9999;
  pointer-events: none;
  display: flex; 
  flex-direction: column;
  align-items: center;
}
*{
cursor:none;
}
.rg-line02 {
  width: 100%;
  height: 12px;
  border-radius:6px;
  background-color: black;
  border: 2px solid yellow;
}
.rg-line03 {
  border: 1px solid yellow;
  width: 16px;
  height: 16px;
  border-left:10px solid transparent ;
  border-right: 10px solid transparent;
  border-bottom: 16px solid black;
  margin-bottom: -2px;
  position: relative;
  transition: left 0.0001s ease-out;
}`;
    parentDocument.head.appendChild(style);

    // Clone elements for the current document
    const containerClone = container.cloneNode(true);
    const lineClone = line.cloneNode(true);
    const pointerClone = pointer.cloneNode(true);
    const styleClone = style.cloneNode(true);

    container.classList.add("rg-line01");
    line.classList.add("rg-line02");
    pointer.classList.add("rg-line03");

    container.appendChild(pointer);
    container.appendChild(line);

    parentDocument.body.appendChild(container);

    // Append clones to the current document
    document.head.appendChild(styleClone);
    containerClone.classList.add("rg-line01");
    lineClone.classList.add("rg-line02");
    pointerClone.classList.add("rg-line03");

    containerClone.appendChild(pointerClone);
    containerClone.appendChild(lineClone);

    document.body.appendChild(containerClone);

    const updateGuideWidth = () => {
      // A function where Reading line changes its width according to its viewport size
      const guideWidth = Math.max(750, Math.min(window.innerWidth * 0.1, 150));
      container.style.width = `${guideWidth}px`;
      containerClone.style.width = `${guideWidth}px`;
      return guideWidth;
    };

    let guideWidth = updateGuideWidth();

    window.addEventListener("resize", () => {
      //every time the window gets resized the line width gets resized
      guideWidth = updateGuideWidth();
    });

    const updateGuidePosition = (e, docContainer, docPointer) => {
      // Every time the cursor moves the reading guide line moves along with it
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      let leftPosition = e.clientX - guideWidth / 2;
      let topPosition = e.clientY;

      let pointerOffset = 0;

      if (leftPosition <= 0) {
        // if the reading guide hits the left side of the screen the pointer starts to move on left side
        const overflow = -leftPosition;
        pointerOffset = -Math.min(overflow, guideWidth / 2 - 8);
        leftPosition = 0;
      } else if (leftPosition + guideWidth >= windowWidth) {
        // elseif the reading guide hits the right side of the screen the pointer starts to move right side
        const overflow = leftPosition + guideWidth - windowWidth;
        pointerOffset = Math.min(overflow, guideWidth / 2 - 8);
        leftPosition = windowWidth - guideWidth;
      }

      topPosition = Math.max(8, Math.min(topPosition, windowHeight - 2));

      docContainer.style.left = `${leftPosition}px`;
      docContainer.style.top = `${topPosition}px`;
      docPointer.style.left = `${pointerOffset}px`;
    };

    parentDocument.addEventListener("mousemove", (e) => {
      updateGuidePosition(e, container, pointer);
    });

    document.addEventListener("mousemove", (e) => {
      updateGuidePosition(e, containerClone, pointerClone);
    });
  }
  function addReadingMask() {
    // creating a Readingmask
    parentDocument.body.removeChild(parentDocument.querySelector(".rg-line01"));
    document.body.removeChild(document.querySelector(".rg-line01"));

    const maskOverlay = parentDocument.createElement("div"); // creating a parent div where the opacity less black background is applied
    const borderElement = parentDocument.createElement("div");
    let style = parentDocument.createElement("style");
    style.textContent = `
      .cm-line01 {
  position: fixed;
  top: 0;
  left: 0;
  width: 150%;
  height: 150%;
  background-color: rgba(0, 0, 0, 0.7);
  pointer-events: none;
  z-index:10000;
  overflow: hidden;
  scroll-width: none;
}
*{
cursor:auto;
}
.cm-line02 {
  position: absolute;
  top: 0;
  left: 0;
  width: 150%;
  height: 150%;
  pointer-events: none;
  border: 2px solid white;
  z-index:8000;
  scroll-width: none;
  overflow: hidden;
}`;
    parentDocument.head.appendChild(style);
    document.querySelector("html").classList.remove("large-cursor");

    // Clone elements for the current document
    const maskOverlayClone = maskOverlay.cloneNode(true);
    const borderElementClone = borderElement.cloneNode(true);
    const styleClone = style.cloneNode(true);

    maskOverlay.classList.add("cm-line01");
    borderElement.classList.add("cm-line02");

    parentDocument.body.appendChild(borderElement);
    parentDocument.body.appendChild(maskOverlay);

    // Append clones to the current document
    // document.head.appendChild(styleClone);
    // maskOverlayClone.classList.add("cm-line01");
    // borderElementClone.classList.add("cm-line02");

    // document.body.appendChild(borderElementClone);
    // document.body.appendChild(maskOverlayClone);

    const updateMaskPosition = (event, docMaskOverlay, docBorderElement) => {
      const mouseY = event.clientY;
      const stripHeight = 150;
      const topPosition = mouseY - stripHeight / 2;
      docMaskOverlay.style.clipPath = `polygon(
                0 0,
                100% 0,
                100% ${topPosition}px,
                0 ${topPosition}px,
                0 ${topPosition + stripHeight}px,
                100% ${topPosition + stripHeight}px,
                100% 100%,
                0 100%
            )`;

      docBorderElement.style.clipPath = `polygon(
                0 0,
                100% 0,
                100% ${topPosition + 2}px, /* Adjust for border width */
                0 ${topPosition + 2}px,       /* Adjust for border width */
                0 ${
                  topPosition + stripHeight - 2
                }px, /* Adjust for border width */
                100% ${
                  topPosition + stripHeight - 2
                }px, /* Adjust for border width */
                100% 100%,
                0 100%
            )`;
    };

    parentDocument.addEventListener("mousemove", (event) => {
      updateMaskPosition(event, maskOverlay, borderElement);
    });

    // document.addEventListener("mousemove", (event) => {
    //   updateMaskPosition(event, maskOverlayClone, borderElementClone);
    // });
  }

  function resetStyles() {
    //resets to normal page mode by removing the reading mask
    parentDocument.body.removeChild(parentDocument.querySelector(".cm-line01"));
    parentDocument.body.removeChild(parentDocument.querySelector(".cm-line02"));
    document.body.removeChild(document.querySelector(".cm-line01"));
    document.body.removeChild(document.querySelector(".cm-line02"));
  }

  //Changing the modes on button clicks

  let cursor = ["Cursor", "Big Cursor", "Reading Guide", "Reading Mask"];
  const nextCursor =
    cursor[(cursor.indexOf(currentCursor) + 1) % cursor.length];
  console.log(currentCursor, nextCursor);
  currentCursor = nextCursor;
  document.getElementById("cursorText").textContent = currentCursor;
  featureDiv.classList.add("selected");
  console.log(featureDiv);

  if (currentCursor === "Cursor") {
    featureDiv.classList.remove("selected");
    resetStyles();
    return;
  }

  if (currentCursor === "Big Cursor") {
    bigCursor();
    return;
  }

  if (currentCursor === "Reading Guide") {
    createReadingGuide();
    return;
  }

  if (currentCursor === "Reading Mask") {
    addReadingMask();
    return;
  }
}
