# video-gallery-stacked



<!-- Auto Generated Below -->


## Properties

| Property                | Attribute  | Description                            | Type  | Default     |
| ----------------------- | ---------- | -------------------------------------- | ----- | ----------- |
| `playlist` _(required)_ | `playlist` | The Youtube URL for any given playlist | `any` | `undefined` |


## Dependencies

### Depends on

- [gallery-thumbnail-stacked](gallery-thumbnail-stacked)
- [video-embed](../video-embed)
- [loading-spinner](../../spinner)

### Graph
```mermaid
graph TD;
  video-gallery-stacked --> gallery-thumbnail-stacked
  video-gallery-stacked --> video-embed
  video-gallery-stacked --> loading-spinner
  gallery-thumbnail-stacked --> lazy-image
  lazy-image --> scroll-observer
  video-embed --> loading-spinner
  style video-gallery-stacked fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
