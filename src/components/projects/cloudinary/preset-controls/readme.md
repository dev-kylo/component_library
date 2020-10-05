# preset-controls



<!-- Auto Generated Below -->


## Events

| Event         | Description | Type               |
| ------------- | ----------- | ------------------ |
| `submitEdits` |             | `CustomEvent<any>` |


## Dependencies

### Used by

 - [cloudinary-app](..)

### Depends on

- [kclsu-modal](../../../modal)
- [flex-container](../../../containers/flex-container)
- [kclsu-button](../../../buttons/kclsu-button)

### Graph
```mermaid
graph TD;
  preset-controls --> kclsu-modal
  preset-controls --> flex-container
  preset-controls --> kclsu-button
  kclsu-modal --> modal-backdrop
  kclsu-button --> flex-container
  cloudinary-app --> preset-controls
  style preset-controls fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
