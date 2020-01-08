const h2Elements = [
  "First Demo",
  "Second Demo",
  "Third Demo",
  "Fourth Demo",
  "Fifth Demo",
]
const pElements = [
  "Unus consectetur adipisci rerum id veniam earum facere. Placeat nostrum obcaecati nostrum nostrum provident? Quibusdam ad quae inventore esse fugit? Magnam quis quisquam eum deserunt recusandae nemo quis Porro neque ab",
  "Duo consectetur adipisci rerum id veniam earum facere. Placeat nostrum obcaecati nostrum nostrum provident? Quibusdam ad quae inventore esse fugit? Magnam quis quisquam eum deserunt recusandae nemo quis Porro neque ab",
  "Tres consectetur adipisci rerum id veniam earum facere. Placeat nostrum obcaecati nostrum nostrum provident? Quibusdam ad quae inventore esse fugit? Magnam quis quisquam eum deserunt recusandae nemo quis Porro neque ab",
  "Quattuor consectetur adipisci rerum id veniam earum facere. Placeat nostrum obcaecati nostrum nostrum provident? Quibusdam ad quae inventore esse fugit? Magnam quis quisquam eum deserunt recusandae nemo quis Porro neque ab",
  "Quinque consectetur adipisci rerum id veniam earum facere. Placeat nostrum obcaecati nostrum nostrum provident? Quibusdam ad quae inventore esse fugit? Magnam quis quisquam eum deserunt recusandae nemo quis Porro neque ab",
]
const codeString = `h(
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
)
`
const mediaArray = [
  `<img src="./img/01-cat350x.jpeg"></img>`,
  `<img src="./img/02-cat350x.jpeg"></img>`,
  `<pre><code>${codeString}</code></pre>`,
  `<img src="./img/03-cat350x.jpeg"></img>`,
  `<pre><code>${codeString}</code></pre>`,
]

export default { h2Elements, pElements, mediaArray }
