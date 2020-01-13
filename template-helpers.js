import { defineSwitchWitch } from "./components/switchwitch.js"

function requestString(filePath) {
  return fetch(filePath).then(response => response.text())
}

// requestString("./template.html").then(templateString =>
// defineSwitchWitch("switch-witch", templateString)
// )

function requestStringSync(filePath) {
  var request = new XMLHttpRequest()
  request.open("GET", filePath, false) // `false` makes the request synchronous
  request.send(null)
  return request.status === 200 ? request.responseText : null
}

defineSwitchWitch("switch-witch", requestStringSync("./template.html"))

export { requestString, requestStringSync }
