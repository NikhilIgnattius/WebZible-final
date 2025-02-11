function accessibilityButton() {
  const style = document.createElement("style");
  document.head.appendChild(style);
  const sheet = style.sheet;

  const cssRules = [
    `.accessibility-button { height: 72px; width: 72px; position: fixed; right: 20px; bottom: 30px; z-index: 99997; transition: 0.3s; }`,
    `.accessibility-button:hover { transform: scale(1.2); cursor: pointer; }`,
    `iframe { position: fixed; right: 0; top: 0; width: 100vw; height: 100vh; display: none; z-index: 99998; background: transparent; border: none;}`,
  ];

  cssRules.forEach((rule) => sheet.insertRule(rule, sheet.cssRules.length));
  console.log("CSS rules added successfully.");

  // Adding Google Font
  const googleFontLink = document.createElement("link");
  googleFontLink.rel = "stylesheet";
  googleFontLink.href =
    "https://fonts.googleapis.com/css2?family=Poppins:wght@400&display=swap";
  document.head.appendChild(googleFontLink);

  // Creating Accessibility Button
  const accessibilityButton = document.createElement("div");
  accessibilityButton.className = "accessibility-button";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 922.07 905.51">
  <defs>
    <style>
      .cls-1 {
        fill: #faba34;
      }

      .cls-1, .cls-2, .cls-3 {
        mix-blend-mode: multiply;
      }

      .cls-2 {
        fill: #387cbb;
      }

      .cls-4 {
        isolation: isolate;
      }

      .cls-5 {
        fill: url(#linear-gradient);
        stroke: #fff;
        stroke-miterlimit: 10;
        stroke-width: 9px;
      }

      .cls-6 {
        fill: #fff;
      }

      .cls-3 {
        fill: #e84244;
      }

      .cls-7 {
        fill: #21a35b;
      }
    </style>
    <linearGradient id="linear-gradient" x1="110.94" y1="545.82" x2="810.3" y2="358.43" gradientUnits="userSpaceOnUse">
      <stop offset=".06" stop-color="#392d69"/>
      <stop offset="1" stop-color="#2472fc"/>
    </linearGradient>
  </defs>
  <g class="cls-4">
    <g id="Layer_2">
      <g id="Layer_1-2" data-name="Layer_1">
        <g>
          <path class="cls-1" d="M462.41,904.07C215.14,904.35-3.52,701.1.04,438.46h462.37v465.61Z"/>
          <path class="cls-2" d="M463.05,904.95v-461h456.91c19.65,225.31-198.08,475.05-456.91,461Z"/>
          <path class="cls-3" d="M462.79,439.65H1.85C2.36,211.9,210.58-3.75,462.79.05v439.6Z"/>
          <path class="cls-7" d="M462.95,445.05V.28c225.75-3.39,448.61,184.85,459.11,444.77h-459.11ZM530.32,214.18c-4.97,3.1-9.93,6.2-15.34,9.58,13.6,10.61,13.74,29.89.82,44h19.58c-1.7-17.99-3.29-34.86-5.06-53.58Z"/>
        </g>
        <path class="cls-5" d="M822.49,452.04c0,200.36-162.42,362.79-362.78,362.79-480.24-16.6-480.12-709.05,0-725.57,200.35,0,362.78,162.42,362.78,362.79Z"/>
        <g>
          <path class="cls-6" d="M315.14,356.64c15.22,2.53,30.46,5.02,45.69,7.61,29.72,5.05,59.4,10.33,89.16,15.15,14.39,2.33,28.52-1.02,42.64-3.43,36.41-6.2,72.8-12.47,109.22-18.59,15.07-2.53,27.95,5.92,30.23,19.52,2.47,14.72-6.28,26.5-22.13,29.25-32.67,5.69-65.36,11.29-98.08,16.65-4.29.7-5.5,2.17-5.48,6.42.17,32.27.05,64.53.16,96.8,0,2.75.69,5.6,1.58,8.22,14.37,42.08,28.85,84.11,43.24,126.19,5.71,16.7-1.56,31.13-17.42,34.86-12.45,2.93-24.2-4.05-28.95-17.54-6.13-17.42-12.02-34.92-18-52.39-6.9-20.14-13.84-40.26-20.61-60.45-1.16-3.46-2.56-5.21-6.66-5.15-3.92.06-5.08,1.88-6.15,5.03-12.51,36.74-25.09,73.45-37.71,110.16-1.1,3.19-2.25,6.46-3.98,9.32-6.46,10.63-19.8,14.51-31.17,9.32-11.46-5.23-17.1-17.68-12.96-30.32,7.21-22.02,14.85-43.9,22.4-65.81,7.85-22.8,15.82-45.56,23.65-68.36.59-1.72.63-3.69.63-5.55.04-31.51-.05-63.02.12-94.53.02-4.25-1.17-5.66-5.48-6.36-32.73-5.34-65.41-10.96-98.08-16.64-12.48-2.17-20.7-11.21-21.36-22.87-.67-11.82,6.36-22,17.65-25.24,2.5-.72,5.17-.83,7.88-1.24Z"/>
          <path class="cls-6" d="M527.36,274.46c0,36.63-29.56,66.3-66.08,66.36-36.69.06-66.86-30.14-66.56-66.63.3-36.58,30.03-66.09,66.55-66.06,36.52.03,66.1,29.72,66.09,66.32Z"/>
        </g>
      </g>
    </g>
  </g>
</svg>`;
  const logo = document.createElement("img");
  logo.src =
    "https://cdn-icons-png.freepik.com/256/668/668274.png?semt=ais_hybrid";
  logo.style.width = "100%";
  accessibilityButton.innerHTML = svg;
  document.body.appendChild(accessibilityButton);

  // Creating the iframe
  const iframe = document.createElement("iframe");
  iframe.src = "https://nikhilignattius.github.io/widget.html";
  iframe.className = "iframe-page";
  document.body.appendChild(iframe);

  // Toggle iframe visibility on button click
  document.querySelector(".iframe-page").style.display = "none";
  let isIframeVisible = document.querySelector(".iframe-page").style.display;
  accessibilityButton.addEventListener("click", () => {
    //isIframeVisible = !isIframeVisible;
    iframe.style.display = isIframeVisible == "none" ? "block" : "none";
  });
}

document.addEventListener("DOMContentLoaded", accessibilityButton);
