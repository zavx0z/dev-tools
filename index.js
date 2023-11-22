const html = String.raw

class Component extends HTMLElement {
  name = { ru: "DevTools" }
  input = {}
  output = {}
  property = {}
  static observedAttributes = ["mobile"];
  constructor() {
    super()
    this.attachShadow({ mode: "closed" })
    if (this.hasAttribute("mobile")) {
      if (navigator.maxTouchPoints && navigator.maxTouchPoints > 2)
        this.render()
    } else
      this.render()
  }
  render() {
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
  connectedCallback() { }
  attributeChangedCallback(attrName, oldValue, newValue) { }
}
customElements.define("dev-tools", Component)