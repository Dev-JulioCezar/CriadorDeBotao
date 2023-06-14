const controles = document.getElementById("controles");
const cssTexto = document.querySelector(".css");
const btn = document.querySelector(".btn");
const reset = document.querySelector(".reset");

const defaultValues = {
  backgroundColor: "#FFFFFF",
  color: "#000000",
  backgroundColorHover: "#000000",
  hoverColor: "#FFFFFF",
};

Object.entries(defaultValues).forEach(([key, value]) => {
  if (!localStorage[key]) {
    localStorage.setItem(key, value);
  }
});

const handleStyle = {
  element: btn,
  backgroundColor(value) {
    this.element.style.backgroundColor = value;
  },
  height(value) {
    this.element.style.height = value + "px";
  },
  color(value) {
    this.element.style.color = value;
  },
  width(value) {
    this.element.style.width = value + "px";
  },
  border(value) {
    this.element.style.border = value;
  },
  borderRadius(value) {
    this.element.style.borderRadius = value + "px";
  },
  fontFamily(value) {
    this.element.style.fontFamily = value;
  },
  fontSize(value) {
    this.element.style.fontSize = value + "rem";
  },
  texto(value) {
    this.element.innerText = value;
  },
  backgroundColorHover(value) {
    this.element.addEventListener("mouseover", () => {
      this.element.style.backgroundColor = value;
    });
    this.element.addEventListener("mouseout", () => {
      this.element.style.backgroundColor = localStorage["backgroundColor"];
    });
  },
  hoverColor(value) {
    this.element.addEventListener("mouseover", () => {
      this.element.style.color = value;
    });
    this.element.addEventListener("mouseout", () => {
      this.element.style.color = localStorage["color"];
    });
  },
  fontWeight(value) {
    this.element.style.fontWeight = value;
  },
};

function handleChange(event) {
  const name = event.target.name;
  const value = event.target.value;
  handleStyle[name](value);
  showCss();
  saveValues(name, value);
}

function showCss() {
  cssTexto.innerHTML =
    "<span>" +
    btn.style.cssText.split("; ").join(";</span><span>") +
    "</span><span>" +
    "background-Color: Hover: " +
    localStorage.backgroundColorHover +
    "</span><span>" +
    "Color: Hover: " +
    localStorage.hoverColor;
}

function saveValues(name, value) {
  localStorage[name] = value;
}

function setValues() {
  const propriedades = Object.keys(localStorage);
  propriedades.forEach((item) => {
    handleStyle[item](localStorage[item]);
    controles.elements[item].value = localStorage[item];
  });
  showCss();
}

setValues();

function watchHover() {
  setInterval(() => {
    const backgroundHover = localStorage.backgroundColorHover;
    const ColorHover = localStorage.hoverColor;
    if (
      backgroundHover !== lastBackgroundHover ||
      ColorHover !== lastColorHover
    ) {
      lastBackgroundHover = backgroundHover;
      lastColorHover = ColorHover;
      showCss();
    }
  }, 100);
}

let lastBackgroundHover = localStorage.backgroundColorHover;
let lastColorHover = localStorage.hoverColor;
watchHover();

function resetar() {
  location.reload();
  localStorage.clear();
}

controles.addEventListener("change", handleChange);
reset.addEventListener("click", resetar);
