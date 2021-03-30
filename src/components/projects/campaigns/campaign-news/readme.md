# campaign-news



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description                                                                                      | Type     | Default     |
| -------- | --------- | ------------------------------------------------------------------------------------------------ | -------- | ----------- |
| `newsid` | `newsid`  | The MSL organisation ID where the news is kept - filled in automatically by campaign-tabs parent | `string` | `undefined` |


## Dependencies

### Used by

 - [campaign-tabs](../campaign-tabs)

### Depends on

- [news-card](../../../cards/news-card)

### Graph
```mermaid
graph TD;
  campaign-news --> news-card
  campaign-tabs --> campaign-news
  style campaign-news fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
