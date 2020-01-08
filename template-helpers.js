import { defineSwitchWitch } from "./components/switchwitch.js"

async function requestHtmlString(filePath) {
  return fetch(filePath).then(response => response.text())
}

function createTemplateDocumentFragment(templateString) {
  return templateString.then
    ? templateString.then(string => createElementFromHTML(string).content)
    : createElementFromHTML(string).content
}

function createElementFromHTML(htmlString) {
  var div = document.createElement("div")
  div.innerHTML = htmlString.trim()
  return div.firstElementChild
}

createTemplateDocumentFragment(
  requestHtmlString("./template.html")
).then(template => defineSwitchWitch("switch-witch", template))
