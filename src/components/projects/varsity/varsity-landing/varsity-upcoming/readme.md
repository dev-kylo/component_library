# varsity-upcoming



<!-- Auto Generated Below -->


## Properties

| Property  | Attribute | Description | Type      | Default     |
| --------- | --------- | ----------- | --------- | ----------- |
| `data`    | `data`    |             | `any`     | `undefined` |
| `showall` | `showall` |             | `boolean` | `false`     |


## Dependencies

### Used by

 - [varsity-landing](..)

### Depends on

- [kclsu-modal](../../../modal)
- [varsity-next-matches](../../varsity-next-matches)

### Graph
```mermaid
graph TD;
  varsity-upcoming --> kclsu-modal
  varsity-upcoming --> varsity-next-matches
  kclsu-modal --> modal-backdrop
  varsity-next-matches --> label-card
  label-card --> kclsu-button
  label-card --> lazy-image
  kclsu-button --> flex-container
  varsity-landing --> varsity-upcoming
  style varsity-upcoming fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
