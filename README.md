# switchwitch

A Web Component using the Shadow DOM - Cycle through various media gracefully.

## Demo

Click [**here**](https://timonson.github.io/switchwitch/).

## Qick Start

Serve the file `demo.html` to your browser.

## Example

```html
<body>
  <switch-witch width="50em" height="25em" loop="4000" color="#f0ede2">
    <li slot="item">A</li>
    <li slot="item">B</li>
    <li slot="item">C</li>
    <li slot="item">D</li>
    <li slot="item">E</li>
  </switch-witch>
</body>
```

## API

```
"width",
"height",
"color",
"index",
"loop",
"data",
"item"
```
