let parentDocument = window.parent.document;

export default function altOpener() {
  function generateAltInputForm() {
    const styleContent = `
  .alt-changer{
  width:100%;
  background-color: rgba(255, 255, 255, 0.813);
  height: 125px;
  border-radius:16px;
  padding: 16px 16px;
  display: flex;
  gap: 16px;
}

.alt-changer img{
  border-radius: 8px;
  width: 30%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  /* border: 1px solid red; */
}
.alt-changer>.alt-img-info{
  /* border: 1px solid green; */
  width: 90%;
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  /* padding: 8px; */
  gap:1em;
}
.alt-img-info>.alt-inp{
  width: 100%;
  /* height: 20%; */
  height: 1.8em;
  border-radius: 16px;
  padding: 0.6em 0.8em;
  border:0.2px solid grey;
}
.alt-img-info.alt-inp:focus{
  outline: 1px solid rgb(31, 64, 125);
}
.alt-img-info>.alt-info1{
  /* border: 1px solid blue; */
  height: 35%;
  padding: 4px;
  padding-top: 1em;
  display: flex;
  justify-content: center;
  /* align-items: center; */
  gap:0.5em;
}
.alt-img-info>.alt-info2{
  /* border: 1px solid brown; */
  height: 20%;
  display: flex;
  align-items: center;
  padding: 0.5em;
  justify-content: space-between;
  font-size: 1.1em;
  letter-spacing: 0.5px;
  padding-right: 0.8em;

}

.alt-info1 button{
  background-color: #006be6;
  color: white;
  border: none;
  height: 95%;
  padding: 0.01em 0.8em;
  border-radius: 8px;
  letter-spacing: 1.5px;
  font-size: 1em;

}

.toggle-container {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.toggle {
  width: 50px;
  height: 25px;
  padding: 0.2em;
  background-color: #ccc;
  border-radius: 25px;
  position: relative;
  transition: background 0.3s;
}

.toggle-circle {
  width: 20px;
  height: 20px;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 5px;
  transform: translateY(-50%);
  transition: left 0.3s;
}

.toggle.on {
  background-color: #006be6;
}

.toggle.on .toggle-circle {
  left: 32px;
}

.toggle-label {
  margin-left: 10px;
  font-size: 18px;
  font-weight: bold;
  color: #333;
}
    `;

    let ele = document.createElement("style");
    ele.textContent = styleContent;
    document.head.appendChild(ele);
    let maindiv = document.querySelector(".main-div");

    let images = parentDocument.querySelectorAll("img");
    console.log(images);
    images.forEach((img) => {
      const main_box = document.createElement("div");
      main_box.classList.add("alt-changer");
      const innerSmall = document.createElement("div");
      innerSmall.classList.add("alt-img-info");
      const info1 = document.createElement("div");
      info1.classList.add("alt-info1");
      const info2 = document.createElement("div");
      info2.classList.add("alt-info2");
      let imge = document.createElement("img");

      let att = document.createAttribute("src");
      att.value = img.getAttribute("src");
      imge.setAttributeNode(att);

      let info1_inp = document.createElement("input");
      let type = document.createAttribute("type");
      type.value = "text";
      info1_inp.setAttributeNode(type);
      info1_inp.classList.add("alt-inp");
      let info1_bttn = document.createElement("button");
      let type2 = document.createAttribute("type");
      type2.value = "button";
      info1_bttn.setAttributeNode(type2);
      info1_bttn.textContent = "Apply";
      info1.appendChild(info1_inp);
      info1.appendChild(info1_bttn);

      let p = document.createElement("p");
      p.textContent = "Decorative";
      let cont = document.createElement("div");
      cont.classList.add("toggle-container");
      let toggle = document.createElement("div");
      toggle.classList.add("toggle");
      toggle.id = "toggle";
      let circle = document.createElement("div");
      circle.classList.add("toggle-circle");
      toggle.appendChild(circle);
      cont.appendChild(toggle);
      info2.appendChild(p);
      info2.appendChild(cont);
      console.log(imge);
      main_box.appendChild(imge);
      innerSmall.appendChild(info1);
      innerSmall.appendChild(info2);
      main_box.appendChild(innerSmall);
      console.log(main_box);
      console.log(maindiv);
      maindiv.appendChild(main_box);
    });
  }

  function decorativeOnOff() {
    const tog = document.querySelectorAll(".toggle-container");
    tog.forEach((element) => {
      element.addEventListener("click", (ele) => {
        let present = ele.target.closest(".toggle");
        present.classList.toggle("on");
      });
    });
  }
  return {
    generateAltInputForm,
    decorativeOnOff,
  };
}

// document.addEventListener('DOMContentLoaded', () => {
//     generateAltInputForm();
//     const applyButton = document.getElementById('apply-alt');
//     applyButton.addEventListener('click', applyAltToImages);
// });
