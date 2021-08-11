# video-gallery-stacked



<!-- Auto Generated Below -->


## Properties

| Property                | Attribute  | Description                                     | Type      | Default     |
| ----------------------- | ---------- | ----------------------------------------------- | --------- | ----------- |
| `playlist` _(required)_ | `playlist` | The Youtube URL for any given playlist          | `any`     | `undefined` |
| `shuffle`               | `shuffle`  | This will randomise the order of the thumbnails | `boolean` | `false`     |


## Dependencies

### Depends on

- [gallery-thumbnail-stacked](gallery-thumbnail-stacked)
- [video-embed](../video-embed)

### Graph
```mermaid
graph TD;
  video-gallery-stacked --> gallery-thumbnail-stacked
  video-gallery-stacked --> video-embed
  gallery-thumbnail-stacked --> lazy-image
  style video-gallery-stacked fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
