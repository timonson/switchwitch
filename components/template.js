export default {
  render(listItems) {
    return `${this.css()} ${this.html(listItems)}`
  },
  mapDOM(scope) {
    return {
      listElements: scope.querySelectorAll("li"),
      demoAnimation: scope.querySelectorAll(".demo-animation")[0],
      demoElement: scope.querySelector(".demo-element"),
      demoMedia: scope.querySelector(".demo-media"),
    }
  },
  makeListItems(listItems) {
    return listItems.reduce((acc, item) => acc + `<li>${item}</li>`, "")
  },
  html(listItems) {
    return `
<div class="demo-component">
  <ul class="demo-switcher">
  ${this.makeListItems(listItems)}
  </ul>
  <div class="demo-element demo-animation">
    <div class="demo-description">
      <h2 class="h2Elements">My H2 Template Text</h2>
      <p class="pElements">My p Template Text</p>
    </div>
    <div class="demo-media">media Elements place</div>
  </div>
</div>`
  },
  css() {
    return `<style>

  :host {
    display: block;
    box-sizing: border-box;
    margin: 1em;
    width: 45em;
    height: 22.9em;
  }
  li {
    list-style: none;
    display: inline-block;
    padding: 0.25em 0.85em;
    background-color: white;
    color: black;
    cursor: pointer;
    line-height: 1.4rem;
    font-size: 1.1rem;
  }
  li.active-index {
    color: white;
    background-color: grey;
  }

  .demo-component {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
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

  .demo-element {
    padding: 2.5em 1.5em;
    height: 90%;
    width: 100%;
    border-style: solid;
    border-radius: 0.5em;
    border-color: var(--border-color, darkgrey);
    display: flex;
  }

  .demo-description {
    padding: 0 1.5em 0 0;
    flex-direction: column;
    flex: 1 1 0px;
    overflow: auto;
  }
  .demo-description h2 {
    margin: 0 0 1em;
  }
  .demo-description p {
    line-height: 1.4em;
    font-size: 1.1em;
  }

  .demo-media {
    flex-direction: column;
    flex: 1 1 0px;
    padding-top: 0.3em;
  }
  .demo-media pre {
    padding: 2.5em 1.5em;
    height: 100%;
    width: 100%;
    background-color: white;
    border-style: solid;
    border-width: 0.04em;
    border-radius: 0.5em;
    border-color: var(--border-color,darkgrey);
    overflow: auto;
  }
  .demo-media img {
    height: 100%;
    width: 100%;
    /* max-width: 100%; */
    /* max-height: 100%; */
    border-style: solid;
    border-width: 0.05em;
    border-radius: 0.5em;
    border-color: var(--border-color,darkgrey);
    background-color: silver;
    object-fit: contain;
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
  }</style
>`
  },
}
