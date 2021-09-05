# academic-candidate-display



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type  | Default     |
| -------- | --------- | ----------- | ----- | ----------- |
| `data`   | `data`    |             | `any` | `undefined` |


## Dependencies

### Used by

 - [elections-candidates](..)

### Depends on

- [tab-title](../../../../tabs/kclsu-tabs/tab-title)
- [tab-area](../../../../tabs/kclsu-tabs/tab-area)
- [candidate-display](../candidates-display)
- [kclsu-tabs](../../../../tabs/kclsu-tabs)

### Graph
```mermaid
graph TD;
  grouped-candidate-display --> tab-title
  grouped-candidate-display --> tab-area
  grouped-candidate-display --> candidate-display
  grouped-candidate-display --> kclsu-tabs
  candidate-display --> profile-card
  candidate-display --> profile-card-layout
  profile-card --> lazy-image
  profile-card --> flex-container
  elections-candidates --> grouped-candidate-display
  style grouped-candidate-display fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
