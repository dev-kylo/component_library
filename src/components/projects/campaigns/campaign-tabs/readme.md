# campaign-tabs



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description | Type     | Default     |
| ------------- | ------------- | ----------- | -------- | ----------- |
| `facebook`    | `facebook`    |             | `string` | `undefined` |
| `newsid`      | `newsid`      |             | `string` | `undefined` |
| `socials`     | `socials`     |             | `string` | `undefined` |
| `strategydoc` | `strategydoc` |             | `string` | `undefined` |


## Dependencies

### Used by

 - [campaign-page](../campaign-page)

### Depends on

- [page-content](../../../containers/page-content)
- [kclsu-tabs-container](../../../tabs/kclsu-tabs)
- [campaign-news](../campaign-news)
- [primary-button](../../../buttons/primary-button)

### Graph
```mermaid
graph TD;
  campaign-tabs --> page-content
  campaign-tabs --> kclsu-tabs-container
  campaign-tabs --> campaign-news
  campaign-tabs --> primary-button
  campaign-news --> news-card
  campaign-page --> campaign-tabs
  style campaign-tabs fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
