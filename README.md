# switchwitch

A Web Component using the Shadow DOM - Cycle through various media gracefully.

## Demo

[Click](https://timonson.github.io/switchwitch/).

## Qick Start

Serve the file `demo.html` to your browser.

## Example

```html
<body>
  <switch-witch
    id="switcher"
    indexes="ABCDE"
    width="50em"
    height="25em"
    loop="4000"
    color="#f0ede2"
  >
  </switch-witch>
  <script type="module">
    import data from "./demo-data/inputData.js"
    switcher.data = data
  </script>
</body>
```

## API

```
"width",
"height",
"color",
"border-color",
"indexes",
"active-index",
"loop",
"data",
"item"
```
