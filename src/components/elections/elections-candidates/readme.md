# elections-candidates



<!-- Auto Generated Below -->


## Properties

| Property  | Attribute | Description | Type      | Default     |
| --------- | --------- | ----------- | --------- | ----------- |
| `results` | `results` |             | `boolean` | `undefined` |


## Dependencies

### Depends on

- [inner-tab-header](../../tabs/innertabs/inner-tab-header)
- [inner-tab-content](../../tabs/innertabs/inner-tab-content)
- [candidate-display](candidates-display)
- [tabs-container](../../tabs/primarytabs)
- [tab-header](../../tabs/primarytabs/tab-header)
- [tab-content](../../tabs/primarytabs/tab-content)
- [inner-tabs-container](../../tabs/innertabs)
- [academic-candidate-display](academic-candidates-display)

### Graph
```mermaid
graph TD;
  elections-candidates --> inner-tab-header
  elections-candidates --> inner-tab-content
  elections-candidates --> candidate-display
  elections-candidates --> tabs-container
  elections-candidates --> tab-header
  elections-candidates --> tab-content
  elections-candidates --> inner-tabs-container
  elections-candidates --> academic-candidate-display
  candidate-display --> profile-card
  candidate-display --> profile-card-layout
  profile-card --> loading-spinner
  profile-card --> flex-container
  academic-candidate-display --> candidate-display
  style elections-candidates fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
