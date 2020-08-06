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
  academic-candidate-display --> candidate-display
  candidate-display --> profile-card
  candidate-display --> profile-card-layout
  profile-card --> lazy-image
  profile-card --> flex-container
  elections-candidates --> academic-candidate-display
  style academic-candidate-display fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
