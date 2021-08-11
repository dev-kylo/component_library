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

- [tab-header](../../../tabs/primarytabs/tab-header)
- [tab-content](../../../tabs/primarytabs/tab-content)
- [candidate-display](candidates-display)
- [inner-tabs-container](../../../tabs/innertabs)
- [inner-tab-header](../../../tabs/innertabs/inner-tab-header)
- [inner-tab-content](../../../tabs/innertabs/inner-tab-content)
- [grouped-candidate-display](grouped-candidates-display)
- [loading-spinner](../../../spinner)
- [tabs-container](../../../tabs/primarytabs)

### Graph
```mermaid
graph TD;
  elections-candidates --> tab-header
  elections-candidates --> tab-content
  elections-candidates --> candidate-display
  elections-candidates --> inner-tabs-container
  elections-candidates --> inner-tab-header
  elections-candidates --> inner-tab-content
  elections-candidates --> grouped-candidate-display
  elections-candidates --> loading-spinner
  elections-candidates --> tabs-container
  candidate-display --> profile-card
  candidate-display --> profile-card-layout
  profile-card --> lazy-image
  profile-card --> flex-container
  grouped-candidate-display --> candidate-display
  style elections-candidates fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
