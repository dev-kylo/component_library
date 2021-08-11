# video-gallery



<!-- Auto Generated Below -->


## Properties

| Property                | Attribute  | Description                            | Type  | Default     |
| ----------------------- | ---------- | -------------------------------------- | ----- | ----------- |
| `playlist` _(required)_ | `playlist` | The Youtube URL for any given playlist | `any` | `undefined` |


## Dependencies

### Depends on

- [gallery-thumbnail](gallery-thumbnail)
- [video-embed](../video-embed)
- [loading-spinner](../../spinner)

### Graph
```mermaid
graph TD;
  video-gallery --> gallery-thumbnail
  video-gallery --> video-embed
  video-gallery --> loading-spinner
  style video-gallery fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
