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
  "Sit reprehenderit architecto consequuntur non repudiandae Corrupti vitae architecto sunt excepturi doloremque aliquid. Sequi excepturi nisi veniam inventore sed eius Sunt quae cumque odit quasi adipisci. Tempore nulla doloribus debitis consequuntur numquam Reprehenderit voluptatem perferendis accusantium aperiam fugit In nisi vero magnam repudiandae molestiae dolores deserunt? Ducimus ab assumenda facilis voluptates mollitia Maiores voluptatum sapiente eligendi accusantium obcaecati perspiciatis Eligendi libero nulla reiciendis cumque dicta? Quidem ab nostrum temporibus deserunt voluptates!",
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
  `<img src="./img/03-cat350x.jpeg"></img>`,
  `<pre>${codeString}</pre>`,
  `<img src="./img/02-cat350x.jpeg"></img>`,
  `<pre>${codeString}</pre>`,
  `<img src="./img/01-cat350x.jpeg"></img>`,
]

export default { h2Elements, pElements, mediaArray }
