export default function switcher(node, h2Text, pText, mediaArray) {
  if (h2Text.length !== pText.length || h2Text.length !== mediaArray.length)
    throw Error("Arrays must have the same length!")
  const listElementContent = Array.from(Array(h2Text.length), (el, i) => i + 1)
  const mediaNodes = mediaArray.map(el =>
    el[0] === "code" ? h("pre", {}, h(...el)) : h(...el)
  )
  const sheet = document.styleSheets[0]
  node.appendChild(view())
  const change = makeObserver(observer)()

  function h(type, attributes, children) {
    const element = document.createElement(type)
    for (let key in attributes) {
      if (key in element) {
        element[key] = attributes[key]
      } else
        attributes[key]
          ? element.setAttribute(key, attributes[key])
          : element.removeAttribute(key)
    }
    if (typeof children === "string")
      element.appendChild(document.createTextNode(children))
    else if (children)
      Array.isArray(children)
        ? children.forEach(child => element.appendChild(child))
        : element.appendChild(children)
    return element
  }

  function view() {
    const index = 0
    return h("div", { class: "demo-component" }, [
      h(
        "ul",
        { class: "demo-switcher" },
        listElementContent.map((el, i) =>
          h(
            "li",
            {
              onclick: event => change.next(event),
              class: i === 0 ? "active-index" : null,
            },
            el.toString()
          )
        )
      ),
      h("div", { class: `demo-element demo-animation` }, [
        h("div", { class: "demo-description" }, [
          h("h2", {}, h2Text[index]),
          h("p", {}, pText[index]),
        ]),
        h("div", { class: "demo-media" }, mediaNodes[index]),
      ]),
    ])
  }

  function makeObserver(generatorFunction) {
    return function(...args) {
      const generatorObject = generatorFunction(...args)
      generatorObject.next()
      return generatorObject
    }
  }

  function getSiblingThroughClass(element, className) {
    return [...element.parentNode.children].find(el =>
      el.classList.contains(className)
    )
  }

  async function* observer() {
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
