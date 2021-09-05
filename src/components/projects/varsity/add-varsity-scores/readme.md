# add-varsity-scores



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type     | Default     |
| -------- | --------- | ----------- | -------- | ----------- |
| `year`   | `year`    |             | `string` | `undefined` |


## Dependencies

### Depends on

- [user-login](../../../authentication/user-login)
- [flex-container](../../../containers/flex-container)
- [kclsu-modal](../../../modal)

### Graph
```mermaid
graph TD;
  add-varsity-scores --> user-login
  add-varsity-scores --> flex-container
  add-varsity-scores --> kclsu-modal
  user-login --> kclsu-modal
  user-login --> kclsu-button
  user-login --> loading-spinner
  kclsu-modal --> modal-backdrop
  kclsu-modal --> exit-button
  kclsu-button --> flex-container
  style add-varsity-scores fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
