# label-card



<!-- Auto Generated Below -->


## Properties

| Property         | Attribute        | Description                                   | Type      | Default                                                                                                                                       |
| ---------------- | ---------------- | --------------------------------------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `buttonlink`     | `buttonlink`     | If a button included, the link for the button | `string`  | `undefined`                                                                                                                                   |
| `buttontitle`    | `buttontitle`    | If a button included, the text for the button | `string`  | `'Find out more'`                                                                                                                             |
| `cardheight`     | `cardheight`     |                                               | `string`  | `undefined`                                                                                                                                   |
| `cardtitle`      | `cardtitle`      | The main title of the card                    | `string`  | `undefined`                                                                                                                                   |
| `highlightText`  | `highlight-text` | The main title of the card                    | `boolean` | `undefined`                                                                                                                                   |
| `image`          | `image`          |                                               | `string`  | `'https://res.cloudinary.com/kclsu-media/image/upload/v1573644938/website_uploads/KCLSU%20Brand/db75df131542437eb3da2415c7f91fc6_hhoknp.jpg'` |
| `link`           | `link`           | The link for the card - NOT for the button    | `string`  | `undefined`                                                                                                                                   |
| `reverse`        | `reverse`        | If image to be displayed on right hand side   | `boolean` | `undefined`                                                                                                                                   |
| `smallestheight` | `smallestheight` |                                               | `boolean` | `undefined`                                                                                                                                   |
| `smallheading`   | `smallheading`   |                                               | `boolean` | `undefined`                                                                                                                                   |
| `text`           | `text`           | The sub text beneath the title                | `string`  | `undefined`                                                                                                                                   |


## Dependencies

### Used by

 - [varsity-landing](../../projects/varsity/varsity-landing)
 - [varsity-next-matches](../../projects/varsity/varsity-next-matches)

### Depends on

- [kclsu-button](../../buttons/kclsu-button)
- [lazy-image](../../images/lazy-image)

### Graph
```mermaid
graph TD;
  label-card --> kclsu-button
  label-card --> lazy-image
  kclsu-button --> flex-container
  varsity-landing --> label-card
  varsity-next-matches --> label-card
  style label-card fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
