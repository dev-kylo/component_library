# user-login



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                          | Type     | Default     |
| ---------- | ---------- | ---------------------------------------------------- | -------- | ----------- |
| `database` | `database` | The name of the database area. For example: projectx | `string` | `undefined` |


## Dependencies

### Used by

 - [add-varsity-scores](../../varsity/add-varsity-scores)
 - [candidate-upload](../../elections/candidate_upload)

### Depends on

- [kclsu-modal](../../modal)

### Graph
```mermaid
graph TD;
  user-login --> kclsu-modal
  kclsu-modal --> modal-backdrop
  add-varsity-scores --> user-login
  candidate-upload --> user-login
  style user-login fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
