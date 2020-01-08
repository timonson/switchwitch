import Template from "./template.js"

class SwitchWitch extends HTMLElement {
  index = 0

  set data(dataObject) {
    console.log("aaaa")
    this.dataObject = dataObject
  }
  get data() {
    console.log("bbb")
    return this.dataObject
  }

  connectedCallback() {
    this.innerHTML = Template.render({ ...this.data, index: this.index }, this)

    this.dom = Template.mapDOM(this)
    // this.dom.activeIndex.addEventListener("change", e => this.updateGraphics())
    // this.dom.logoPicker.addEventListener("change", e => this.updateGraphics())

    // Template.mapDOM replaces the following two commented out lines
    //this.querySelector('.logo-picker select').addEventListener( 'change', e => this.updateGraphics() );
    //this.querySelector('.background-picker select').addEventListener( 'change', e => this.updateGraphics() );
    // this.updateGraphics()
  }
  updateGraphics(event) {
    console.log(event.target)
    // this.selectedElementOld = this.getElementsByClassName("active-index")
    this.selectedElementOld = this.getElementsByClassName("active-index")[0]
    console.log(this.selectedElementOld)
    this.selectedElement = event.target
    this.index = parseInt(this.selectedElement.innerText) - 1
    this.oldIndex = parseInt(this.selectedElementOld.innerText) - 1
    if (this.index === this.oldIndex) return
    console.log(this.index)
    this.innerHTML = Template.render(this.data, this)
  }

  async *observer() {
    const demoElement = node.getElementsByClassName("demo-animation")[0]
    const [demoDescription, demoMedia] = demoElement.children
    const [demoH2, demoP] = demoDescription.children
    let selectedElement
    while (true) {
      const event = yield
      const selectedElementOld =
        selectedElement || getSiblingThroughClass(event.target, "active-index")
      selectedElement = event.target
      const index = parseInt(selectedElement.innerText) - 1
      const oldIndex = parseInt(selectedElementOld.innerText) - 1
      if (index === oldIndex) continue
      selectedElementOld.classList.remove("active-index")
      selectedElement.classList.add("active-index")
      document.body.classList.toggle("of-x-hidden")
      demoElement.style = `animation: slide-from-center-to-${
        oldIndex < index ? "left" : "right"
      } 0.25s ease-in`
      const animationPromise = new Promise(resolve => {
        demoElement.addEventListener("animationend", animateDemoDisplay)
        function animateDemoDisplay() {
          demoElement.style = `animation: slide-from-${
            oldIndex < index ? "right" : "left"
          }-to-center 0.25s ease-out`
          demoH2.textContent = h2Text[index]
          demoP.textContent = pText[index]
          demoMedia.firstChild.remove()
          demoMedia.appendChild(mediaNodes[index])
          demoElement.removeEventListener("animationend", animateDemoDisplay)
          demoElement.addEventListener("animationend", cleanup)
          function cleanup() {
            demoElement.removeEventListener("animationend", cleanup)
            document.body.classList.toggle("of-x-hidden")
            resolve()
          }
        }
      })
      await animationPromise
    }
  }
}

customElements.define("switch-witch", SwitchWitch)
