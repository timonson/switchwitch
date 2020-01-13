// https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API
function handlePageVisibilityChange(onHidden, onVisible) {
  // Set the name of the hidden property and the change event for visibility
  var hidden, visibilityChange
  if (typeof document.hidden !== "undefined") {
    // Opera 12.10 and Firefox 18 and later support
    hidden = "hidden"
    visibilityChange = "visibilitychange"
  } else if (typeof document.msHidden !== "undefined") {
    hidden = "msHidden"
    visibilityChange = "msvisibilitychange"
  } else if (typeof document.webkitHidden !== "undefined") {
    hidden = "webkitHidden"
    visibilityChange = "webkitvisibilitychange"
  }

  var videoElement = document.getElementById("videoElement")

  // If the page is hidden, pause the video;
  // if the page is shown, play the video
  function handleVisibilityChange() {
    if (document[hidden]) {
      onHidden()
    } else {
      onVisible()
    }
  }

  // Warn if the browser doesn't support addEventListener or the Page Visibility API
  if (typeof document.addEventListener === "undefined" || hidden === undefined)
    console.log(
      "This demo requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API."
    )
  // Handle page visibility change
  else
    document.addEventListener(visibilityChange, handleVisibilityChange, false)

  return [hidden, visibilityChange]
}

export { handlePageVisibilityChange }
