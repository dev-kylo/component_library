# candidate-upload



<!-- Auto Generated Below -->


## Properties

| Property          | Attribute         | Description                                                             | Type     | Default     |
| ----------------- | ----------------- | ----------------------------------------------------------------------- | -------- | ----------- |
| `electionid`      | `electionid`      | MSL ELections ID                                                        | `string` | `undefined` |
| `spreadsheetdata` | `spreadsheetdata` | The JSON generated from the browser-side uploaded excel spreadsheet     | `any`    | `undefined` |
| `stage`           | `stage`           | Either 'candidates' or 'results'. Will set the firebase url and key map | `string` | `'results'` |


## Dependencies

### Depends on

- [candidate-display](../elections-candidates/candidates-display)
- [loading-spinner](../../../spinner)
- [kclsu-modal](../../../modal)
- [user-login](../../../authentication/user-login)
- [kclsu-button](../../../buttons/kclsu-button)

### Graph
```mermaid
graph TD;
  candidate-upload --> candidate-display
  candidate-upload --> loading-spinner
  candidate-upload --> kclsu-modal
  candidate-upload --> user-login
  candidate-upload --> kclsu-button
  candidate-display --> profile-card
  candidate-display --> profile-card-layout
  profile-card --> lazy-image
  profile-card --> flex-container
  kclsu-modal --> modal-backdrop
  kclsu-modal --> exit-button
  user-login --> kclsu-modal
  user-login --> kclsu-button
  user-login --> loading-spinner
  kclsu-button --> flex-container
  style candidate-upload fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
