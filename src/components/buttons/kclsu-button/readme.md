# kclsu-button



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description             | Type      | Default     |
| ---------- | ---------- | ----------------------- | --------- | ----------- |
| `center`   | `center`   |                         | `boolean` | `undefined` |
| `download` | `download` |                         | `boolean` | `undefined` |
| `emitid`   | `emitid`   |                         | `string`  | `undefined` |
| `green`    | `green`    |                         | `boolean` | `undefined` |
| `icon`     | `icon`     |                         | `string`  | `undefined` |
| `link`     | `link`     |                         | `string`  | `undefined` |
| `purple`   | `purple`   |                         | `boolean` | `undefined` |
| `rounded`  | `rounded`  |                         | `boolean` | `undefined` |
| `small`    | `small`    |                         | `boolean` | `undefined` |
| `text`     | `text`     | The text for the button | `string`  | `undefined` |


## Events

| Event       | Description | Type               |
| ----------- | ----------- | ------------------ |
| `emitClick` |             | `CustomEvent<any>` |


## Dependencies

### Used by

 - [cloudinary-app](../../cloudinary)
 - [full-bio](../../profiles/bio)
 - [preset-controls](../../cloudinary/preset-controls)

### Depends on

- [flex-container](../../containers/flex-container)

### Graph
```mermaid
graph TD;
  kclsu-button --> flex-container
  cloudinary-app --> kclsu-button
  full-bio --> kclsu-button
  preset-controls --> kclsu-button
  style kclsu-button fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
