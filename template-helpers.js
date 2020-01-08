import { defineSwitchWitch } from "./components/switchwitch.js"

async function requestHtmlString(filePath) {
  return fetch(filePath).then(response => response.text())
}

requestHtmlString("./template.html").then(templateString =>
  defineSwitchWitch("switch-witch", templateString)
)
