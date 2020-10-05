# tab-header



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type      | Default     |
| -------- | --------- | ----------- | --------- | ----------- |
| `active` | `active`  |             | `boolean` | `false`     |
| `index`  | `index`   |             | `string`  | `undefined` |
| `name`   | `name`    |             | `string`  | `undefined` |


## Events

| Event              | Description | Type               |
| ------------------ | ----------- | ------------------ |
| `selectTab`        |             | `CustomEvent<any>` |
| `selectTabByIndex` |             | `CustomEvent<any>` |


## Dependencies

### Used by

 - [elections-candidates](../../../projects/elections/elections-candidates)
 - [profile-tabs](../../../profiles)

### Graph
```mermaid
graph TD;
  elections-candidates --> tab-header
  profile-tabs --> tab-header
  style tab-header fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
