import createHimple from "https://cdn.jsdelivr.net/gh/timonson/himple/himple.js"
import { handlePageVisibilityChange } from "./handlePageVisibilityChange.js"
import Template from "./template.js"

function createElementFromHTML(html) {
  var template = document.createElement("template")
  template.innerHTML = html
  return template.content.firstChild
}

function handleElements([demoDescription, demoMedia], data, himple) {
  const [demoH2, demoP] = demoDescription.children
  return function(index) {
    demoH2.textContent = data.h2Elements[index]
    demoP.textContent = data.pElements[index]
    demoMedia.innerHTML = data.mediaArray[index]
    if (demoMedia.childNodes[0].tagName === "PRE") {
      himple(demoMedia.childNodes[0])
    }
  }
}

function getIndexOfElement(element) {
  return [...element.parentNode.children].indexOf(element)
}

async function* generateObserver(demoElement, selectedElement, data, himple) {
  selectedElement.classList.add("active-index")
  const updateElements = handleElements(demoElement.children, data, himple)
  updateElements(getIndexOfElement(selectedElement))
  while (true) {
    const selectedElementOld = selectedElement
    selectedElement = (yield event).target
    const index = getIndexOfElement(selectedElement)
    const oldIndex = getIndexOfElement(selectedElementOld)
    if (index === oldIndex) continue
    selectedElementOld.classList.remove("active-index")
    selectedElement.classList.add("active-index")
    // remove the temporary appearance of the scrollbar caused by the animation:
    const oldOverflowXValue = document.body.style.overflowX
    document.body.style.overflowX = "hidden"
    demoElement.style.animation = `slide-from-center-to-${
      oldIndex < index ? "left" : "right"
    } 0.25s ease-in`
    // queue high frequency clicks:
    const animationPromise = new Promise(resolve => {
      demoElement.addEventListener("animationend", slideIn, { once: true })
      function slideIn() {
        demoElement.style.animation = `slide-from-${
          oldIndex < index ? "right" : "left"
        }-to-center 0.25s ease-out`
        updateElements(index)
        demoElement.addEventListener("animationend", cleanup, { once: true })
        function cleanup() {
          document.body.style.overflowX = oldOverflowXValue
          resolve()
        }
      }
    })
    await animationPromise
  }
}

class SwitchWitch extends HTMLElement {
  constructor() {
    super()
    if (!this.indexes)
      throw Error("You must set attribute 'indexes'. E.g. '12345'!")
    this.attachShadow({ mode: "open" }).innerHTML = Template.render([
      ...this.indexes,
    ])
    this.dom = Template.mapDOM(this.shadowRoot)
    this.dom.listElements.forEach(
      node => (node.onclick = event => this.updateGraphics.next(event))
    )
    this._himple = createHimple(this.shadowRoot, false)
    this._startIntervalling = (counter, time) => {
      return setInterval(
        () =>
          this.updateGraphics.next({
            target: this.dom.listElements.item(
              ++counter < this.dom.listElements.length ? counter : (counter = 0)
            ),
          }),
        time
      )
      handlePageVisibilityChange(
        () => clearInterval(this.cancelId),
        () =>
          (this.cancelId = this._startIntervalling(
            getIndexOfElement(this.querySelector(".active-index")),
            newValue
          ))
      )
    }
  }
  _start(data) {
    this.updateGraphics = generateObserver(
      this.dom.demoAnimation,
      this.dom.listElements.item(this.activeIndex),
      data,
      this._himple
    )
    this.updateGraphics.next()
    if (this.loop)
      this.cancelId = this._startIntervalling(this.activeIndex, this.loop)
  }
  set indexes(indexes) {
    this.setAttribute("indexes", indexes)
  }
  get indexes() {
    return this.getAttribute("indexes")
  }
  set loop(time) {
    this.setAttribute("loop", time)
  }
  get loop() {
    return this.getAttribute("loop")
  }
  set activeIndex(number) {
    this.setAttribute("active-index", number)
  }
  get activeIndex() {
    return this.getAttribute("active-index")
  }
  set data(data) {
    this._data = data
    this._start(data)
  }
  get data() {
    return this._data
  }
  static get observedAttributes() {
    return ["width", "height", "color", "border-color", "active-index", "loop"]
  }
  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "width":
        this.style.width = newValue
        break
      case "height":
        this.style.height = newValue
        break
      case "active-index":
        if (this.updateGraphics) {
          this.updateGraphics.next({
            target: this.dom.listElements.item(newValue),
          })
        }
        break
      case "color":
        this.dom.demoElement.style.backgroundColor = newValue
        break
      case "border-color":
        this.style.setProperty("--border-color", newValue)
        break
      case "loop":
        if (this.updateGraphics) {
          clearInterval(this.cancelId)
          this.cancelId = this._startIntervalling(this.activeIndex, this.loop)
        }
        break
    }
  }
  disconnectedCallback() {
    clearInterval(this.cancelId)
  }
  static get is() {
    return "switch-witch"
  }
}
customElements.define(SwitchWitch.is, SwitchWitch)

export { SwitchWitch }
