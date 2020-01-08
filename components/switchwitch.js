function makeObserver(generatorFunction) {
  return function(...args) {
    const generatorObject = generatorFunction(...args)
    generatorObject.next()
    return generatorObject
  }
}

function handleElements([demoDescription, demoMedia], data) {
  const [demoH2, demoP] = demoDescription.children
  return function(index) {
    demoH2.textContent = data.h2Elements[index]
    demoP.textContent = data.pElements[index]
    demoMedia.innerHTML = data.mediaArray[index]
  }
}

async function* observer(index, demoElement, selectedElement, data) {
  const updateElements = handleElements(demoElement.children, data)
  updateElements(index)
  console.log(index)
  while (true) {
    const event = yield
    const selectedElementOld = selectedElement
    selectedElement = event.target
    const index = parseInt(selectedElement.innerText) - 1
    const oldIndex = parseInt(selectedElementOld.innerText) - 1
    if (index === oldIndex) continue
    selectedElementOld.classList.remove("active-index")
    selectedElement.classList.add("active-index")
    // remove the temporary appearance of the scrollbar caused by the animation:
    const oldOverflowXValue = document.body.style.overflowX
    document.body.style = "overflow-x: hidden"
    demoElement.style = `animation: slide-from-center-to-${
      oldIndex < index ? "left" : "right"
    } 0.25s ease-in`
    // queue high frequency clicks:
    const animationPromise = new Promise(resolve => {
      demoElement.addEventListener("animationend", slideIn, { once: true })
      function slideIn() {
        demoElement.style = `animation: slide-from-${
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

function defineSwitchWitch(tag, template) {
  class SwitchWitch extends HTMLElement {
    constructor() {
      super()
      this.attachShadow({ mode: "open" }).appendChild(template.cloneNode(true))
      this.index = parseInt(this.getAttribute("index")) || 0
      this.querySelectorAll("li").forEach((node, i) => {
        if (i === this.index) node.className = "active-index"
        node.onclick = event => this.updateGraphics.next(event)
      })
      // race condition:
      if (this.data) this.start(this.data)
      else
        Object.defineProperty(this, "data", {
          set(input) {
            this.start(input)
          },
        })
    }
    start(data) {
      this.updateGraphics = makeObserver(observer)(
        this.index,
        this.shadowRoot.querySelectorAll(".demo-animation")[0],
        this.querySelector(".active-index"),
        data
      )
    }
  }

  customElements.define(tag, SwitchWitch)
}

export { defineSwitchWitch }
