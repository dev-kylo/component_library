# label-card



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute        | Description | Type      | Default                                                                                                                                                                                  |
| --------------- | ---------------- | ----------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `buttonlink`    | `buttonlink`     |             | `string`  | `undefined`                                                                                                                                                                              |
| `buttontitle`   | `buttontitle`    |             | `string`  | `'Find out more'`                                                                                                                                                                        |
| `cardheight`    | `cardheight`     |             | `string`  | `undefined`                                                                                                                                                                              |
| `cardtitle`     | `cardtitle`      |             | `string`  | `undefined`                                                                                                                                                                              |
| `highlightText` | `highlight-text` |             | `boolean` | `undefined`                                                                                                                                                                              |
| `image`         | `image`          |             | `string`  | `'https://res.cloudinary.com/kclsu-media/image/upload/c_fill,f_auto,fl_any_format,h_90,q_93,w_90/v1573644938/website_uploads/KCLSU%20Brand/db75df131542437eb3da2415c7f91fc6_hhoknp.jpg'` |
| `reverse`       | `reverse`        |             | `boolean` | `undefined`                                                                                                                                                                              |
| `smallheading`  | `smallheading`   |             | `boolean` | `undefined`                                                                                                                                                                              |
| `text`          | `text`           |             | `string`  | `''`                                                                                                                                                                                     |


## Dependencies

### Used by

 - [varsity-landing](../../varsity/varsity-landing)
 - [varsity-next-matches](../../varsity/varsity-next-matches)

### Depends on

- [kclsu-button](../../buttons/kclsu-button)

### Graph
```mermaid
graph TD;
  label-card --> kclsu-button
  kclsu-button --> flex-container
  varsity-landing --> label-card
  varsity-next-matches --> label-card
  style label-card fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
