const html = String.raw

class DevTools extends HTMLElement {
  name = "DevTools"
  input = {}
  output = {}
  property = {}
  static observedAttributes = ["mobile"];
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: "closed" })
    shadow.innerHTML = html` <link rel="stylesheet" type="text/css" href="./styles.css" /> `
    if (this.hasAttribute("mobile") && navigator.maxTouchPoints && navigator.maxTouchPoints > 2) {
      import("//cdn.jsdelivr.net/npm/eruda").then(() => {
        eruda.init({
          default: {
            displaySize: 40,
            transparency: 1,
            theme: "Material Oceanic",
          },
        })
        if (localStorage.getItem("eruda-active") === "true") eruda.show()
        eruda._entryBtn._$el[0].addEventListener("click", (event) => {
          setTimeout(() => {
            localStorage.setItem(
              "eruda-active",
              eruda._$el[0].children[0].style.display === "block" ? "true" : "false"
            )
          }, 300)
        })
      })
    }
  }
  connectedCallback() { }
  attributeChangedCallback(attrName, oldValue, newValue) {
    // console.log(attrName)
  }
}
customElements.define("dev-tools", DevTools)