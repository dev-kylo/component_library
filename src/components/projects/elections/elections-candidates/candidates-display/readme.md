# candidate-display



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type  | Default     |
| -------- | --------- | ----------- | ----- | ----------- |
| `data`   | `data`    |             | `any` | `undefined` |


## Dependencies

### Used by

 - [candidate-upload](../../candidate_upload)
 - [elections-candidates](..)
 - [grouped-candidate-display](../grouped-candidates-display)

### Depends on

- [profile-card](../../../../cards/profile-card)
- [profile-card-layout](../../../../containers/profile-card-layout)

### Graph
```mermaid
graph TD;
  candidate-display --> profile-card
  candidate-display --> profile-card-layout
  profile-card --> lazy-image
  profile-card --> flex-container
  lazy-image --> scroll-observer
  candidate-upload --> candidate-display
  elections-candidates --> candidate-display
  grouped-candidate-display --> candidate-display
  style candidate-display fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
