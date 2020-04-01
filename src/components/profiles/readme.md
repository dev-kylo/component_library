# profile-tabs



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                                | Type     | Default                                                                                                                                     |
| ---------- | ---------- | -------------------------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `activeid` | `activeid` | Specify Tab ID you want to keep open by default                            | `string` | `'Tab1'`                                                                                                                                    |
| `database` | `database` | The URL of the database to fetch profiles from (firebase)                  | `string` | `undefined`                                                                                                                                 |
| `headings` | `headings` | Array with child arrays containing Tab Heading, Tab ID, and Text(optional) | `any`    | `[['First Tab', 'Tab1', 'A maximum of two lines of text can go here. This is meant only as a brief introduction'], ['Second Tab', 'Tab2']]` |


## Dependencies

### Depends on

- [tab-header](../tabs/primarytabs/tab-header)
- [tab-content](../tabs/primarytabs/tab-content)
- [profile-card-layout](../containers/profile-card-layout)
- [profile-card](../cards/profile-card)
- [full-bio](bio)
- [kclsu-modal](../modal)
- [tabs-container](../tabs/primarytabs)

### Graph
```mermaid
graph TD;
  profile-tabs --> tab-header
  profile-tabs --> tab-content
  profile-tabs --> profile-card-layout
  profile-tabs --> profile-card
  profile-tabs --> full-bio
  profile-tabs --> kclsu-modal
  profile-tabs --> tabs-container
  profile-card --> loading-spinner
  profile-card --> flex-container
  full-bio --> kclsu-button
  full-bio --> flex-container
  kclsu-button --> flex-container
  kclsu-modal --> modal-backdrop
  style profile-tabs fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
