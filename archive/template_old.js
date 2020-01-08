export default {
  render(props, scope) {
    return `${this.html(props)}
                ${this.css(props)}`
  },

  options(list) {
    let choices = ``
    for (let c = 0; c < list.length; c++) {
      choices += `<option value="${list[c].uri}">${list[c].name}</option>`
    }
    return `<select>${choices}</select>`
  },

  mapDOM(scope) {
    return {
      activeIndex: scope.querySelector(".active-index"),
      backgroundPicker: scope.querySelector(".background-picker select"),
      logo: scope.querySelector(".logo"),
      background: scope.querySelector(".biz-card"),
    }
  },

  html(p, scope) {
    return `
           <div class="demo-component"> 
        <ul class="demo-switcher">
        ${p.listElementContent.reduce((acc, el, i) => {
          return (acc += `<li onclick='this.closest("switch-witch").updateGraphics(event)' class=${
            i === 0 ? "active-index" : null
          }> ${el}</li>`)
        }, "")}
        </ul>
      <div class="demo-element demo-animation">
        <div class="demo-description">
          <h2>${p.h2Elements[p.index]}</h2>
          <p>${p.pElements[p.index]}</p>
        </div>
        <div class="demo-media">${p.mediaArray[p.index]}
        </div>
        </div>
    `
  },

  css(p) {
    return `<style>
                    
body.of-x-hidden {
  overflow-x: hidden;
}
.demo-component {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  box-sizing: border-box;
  width: 50em;
  height: 25em;
  margin: auto;
}
.demo-component *,
.demo-component ::before,
.demo-component ::after {
  box-sizing: inherit;
  margin: 0;
}

.demo-switcher {
  height: 10%;
  width: 100%;
  padding: 0 1.5em;
  background-color: white;
}
.demo-switcher > li {
  list-style: none;
  display: inline-block;
  padding: 0.25em 0.85em;
  background-color: white;
  color: black;
  cursor: pointer;
  line-height: 1.4rem;
  font-size: 1.1rem;
}
.demo-switcher > li.active-index {
  color: white;
  background-color: grey;
}

.demo-element {
  padding: 2.5em 1.5em;
  height: 90%;
  width: 100%;
  background-color: #f0ede2;
  border-style: solid;
  border-radius: 0.5em;
  border-color: darkgrey;
  display: flex;
}

.demo-description {
  padding: 0 1.5em 0 0;
  flex-direction: column;
  flex: 1 1 0px;
}
.demo-description h2 {
  margin: -0.3em 0 1em;
}
.demo-description p {
  line-height: 1.4em;
  font-size: 1.1em;
}

.demo-media {
  flex-direction: column;
  height: 100%;
  flex: 1 1 0px;
}
.demo-media pre {
  padding: 2.5em 1.5em;
  height: 100%;
  width: 100%;
  background-color: white;
  border-style: solid;
  border-width: 0.1em;
  border-radius: 0.5em;
  border-color: silver;
}
.demo-media pre .highlight-code-function {
  color: red;
}
.demo-media img {
  height: 100%;
  width: 100%;
  border-style: solid;
  border-width: 0.05em;
  border-radius: 0.5em;
  border-color: silver;
}

@keyframes slide-from-center-to-left {
  0% {
    opacity: 1;
    transform: translate(0);
  }
  100% {
    opacity: 0.5;
    transform: translate(-100%);
  }
}
@keyframes slide-from-center-to-right {
  0% {
    opacity: 1;
    transform: translate(0);
  }
  100% {
    opacity: 0.5;
    transform: translate(100%);
  }
}
@keyframes slide-from-right-to-center {
  0% {
    opacity: 0.4;
    transform: translate(100%);
  }
  100% {
    opacity: 1;
    transform: translate(0);
  }
}
@keyframes slide-from-left-to-center {
  0% {
    opacity: 0.4;
    transform: translate(-100%);
  }
  100% {
    opacity: 1;
    transform: translate(0);
  }
}
                </style>`
  },
}
