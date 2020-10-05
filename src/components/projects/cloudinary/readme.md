# cloudinary-app



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute   | Description                                                                                                    | Type     | Default     |
| ----------- | ----------- | -------------------------------------------------------------------------------------------------------------- | -------- | ----------- |
| `public_id` | `public_id` | The Cloudinary image id - provided using the browser-side upload script, or using the the node server function | `string` | `undefined` |


## Dependencies

### Depends on

- [preset-card](preset-card)
- [flex-container](../../containers/flex-container)
- [kclsu-button](../../buttons/kclsu-button)
- [preset-controls](preset-controls)
- [loading-spinner](../../spinner)

### Graph
```mermaid
graph TD;
  cloudinary-app --> preset-card
  cloudinary-app --> flex-container
  cloudinary-app --> kclsu-button
  cloudinary-app --> preset-controls
  cloudinary-app --> loading-spinner
  kclsu-button --> flex-container
  preset-controls --> kclsu-modal
  preset-controls --> flex-container
  preset-controls --> kclsu-button
  kclsu-modal --> modal-backdrop
  style cloudinary-app fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
