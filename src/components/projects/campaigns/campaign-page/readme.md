# campaign-page



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute     | Description | Type     | Default     |
| ------------ | ------------- | ----------- | -------- | ----------- |
| `campaignId` | `campaign-id` |             | `number` | `undefined` |
| `name`       | `name`        |             | `string` | `undefined` |


## Dependencies

### Depends on

- [campaign-aim-container](../campaign-aim-container)
- [campaign-tabs](../campaign-tabs)

### Graph
```mermaid
graph TD;
  campaign-page --> campaign-aim-container
  campaign-page --> campaign-tabs
  campaign-tabs --> page-content
  campaign-tabs --> kclsu-tabs-container
  campaign-tabs --> campaign-news
  campaign-tabs --> primary-button
  campaign-news --> news-card
  style campaign-page fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
