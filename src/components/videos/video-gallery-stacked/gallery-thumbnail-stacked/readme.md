# gallery-thumbnail-stacked



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute    | Description | Type      | Default     |
| ------------ | ------------ | ----------- | --------- | ----------- |
| `active`     | `active`     |             | `boolean` | `undefined` |
| `cardheight` | `cardheight` |             | `string`  | `undefined` |
| `emitid`     | `emitid`     |             | `string`  | `undefined` |
| `image`      | `image`      |             | `string`  | `undefined` |
| `videotitle` | `videotitle` |             | `string`  | `undefined` |


## Events

| Event       | Description | Type               |
| ----------- | ----------- | ------------------ |
| `emitClick` |             | `CustomEvent<any>` |


## Dependencies

### Used by

 - [video-gallery-stacked](..)

### Depends on

- [lazy-image](../../../images/lazy-image)

### Graph
```mermaid
graph TD;
  gallery-thumbnail-stacked --> lazy-image
  lazy-image --> scroll-observer
  video-gallery-stacked --> gallery-thumbnail-stacked
  style gallery-thumbnail-stacked fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
