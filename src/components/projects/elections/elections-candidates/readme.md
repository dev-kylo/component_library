# elections-candidates



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute    | Description                                                          | Type      | Default     |
| ------------ | ------------ | -------------------------------------------------------------------- | --------- | ----------- |
| `electionid` | `electionid` | The election ID from MSL!                                            | `string`  | `undefined` |
| `removeron`  | `removeron`  | Filter out RON profiles in the candidate listing                     | `boolean` | `false`     |
| `results`    | `results`    | Set to true to display results data. False to display All Candidates | `boolean` | `false`     |


## Dependencies

### Depends on

- [tab-title](../../../tabs/kclsu-tabs/tab-title)
- [tab-area](../../../tabs/kclsu-tabs/tab-area)
- [candidate-display](candidates-display)
- [kclsu-tabs](../../../tabs/kclsu-tabs)
- [grouped-candidate-display](grouped-candidates-display)
- [loading-spinner](../../../spinner)

### Graph
```mermaid
graph TD;
  elections-candidates --> tab-title
  elections-candidates --> tab-area
  elections-candidates --> candidate-display
  elections-candidates --> kclsu-tabs
  elections-candidates --> grouped-candidate-display
  elections-candidates --> loading-spinner
  candidate-display --> profile-card
  candidate-display --> profile-card-layout
  profile-card --> lazy-image
  profile-card --> flex-container
  grouped-candidate-display --> tab-title
  grouped-candidate-display --> tab-area
  grouped-candidate-display --> candidate-display
  grouped-candidate-display --> kclsu-tabs
  style elections-candidates fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
