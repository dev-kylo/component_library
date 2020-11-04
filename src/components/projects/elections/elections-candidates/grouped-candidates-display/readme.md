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

- [candidate-display](../candidates-display)

### Graph
```mermaid
graph TD;
  grouped-candidate-display --> candidate-display
  candidate-display --> profile-card
  candidate-display --> profile-card-layout
  profile-card --> lazy-image
  profile-card --> flex-container
  lazy-image --> scroll-observer
  elections-candidates --> grouped-candidate-display
  style grouped-candidate-display fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
