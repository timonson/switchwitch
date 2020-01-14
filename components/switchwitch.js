import createHimple from "https://cdn.jsdelivr.net/gh/timonson/himple/himple.js"
import { handlePageVisibilityChange } from "./handlePageVisibilityChange.js"

function createElementFromHTML(htmlString) {
  var div = document.createElement("div")
  div.innerHTML = htmlString.trim()
  return div.firstElementChild
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
  updateElements(0)
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

function defineSwitchWitch(tag, templateString) {
  class SwitchWitch extends HTMLElement {
    constructor() {
      super()
      this.listElements = this.querySelectorAll("li")
      this.attachShadow({ mode: "open" }).appendChild(
        createElementFromHTML(templateString).content.cloneNode(true)
      )
      this.listElements.forEach(
        node => (node.onclick = event => this.updateGraphics.next(event))
      )
      this.himple = createHimple(this.shadowRoot, false)
      this.data
        ? this.start(this.data)
        : Object.defineProperty(this, "data", {
            set(data) {
              this.start(data)
            },
          })
    }
    start(data) {
      ;(this.updateGraphics = generateObserver(
        this.shadowRoot.querySelectorAll(".demo-animation")[0],
        this.listElements.item(0),
        data,
        this.himple
      )).next()
    }
    static get observedAttributes() {
      return ["width", "height", "color", "index", "loop"]
    }
    attributeChangedCallback(name, oldValue, newValue) {
      switch (name) {
        case "width":
          this.style.width = newValue
          break
        case "height":
          this.style.height = newValue
          break
        case "index":
          this.updateGraphics.next({
            target: this.listElements.item(newValue),
          })
          break
        case "color":
          this.shadowRoot.querySelector(
            ".demo-element"
          ).style.backgroundColor = newValue
          break
        case "loop":
          let counter = 0
          const startIntervalling = (counter, time) => {
            return setInterval(
              () =>
                this.updateGraphics.next({
                  target: this.listElements.item(
                    counter < 4 ? ++counter : (counter = 0)
                  ),
                }),
              time
            )
          }
          this.cancelId = startIntervalling(counter, newValue)
          handlePageVisibilityChange(
            () => clearInterval(this.cancelId),
            () =>
              (this.cancelId = startIntervalling(
                getIndexOfElement(this.querySelector(".active-index")),
                newValue
              ))
          )
          break
      }
    }
    disconnectedCallback() {
      clearInterval(this.cancelId)
    }
  }

  return customElements.define(tag, SwitchWitch)
}

function requestString(filePath) {
  return fetch(filePath).then(response => response.text())
}

const templateUrl = new URL("./template.html", import.meta.url)
requestString(templateUrl).then(templateString =>
  defineSwitchWitch("switch-witch", templateString)
)
