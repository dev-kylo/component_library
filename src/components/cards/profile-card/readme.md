# profile-card



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute    | Description | Type     | Default                                                                                                                                                           |
| ------------ | ------------ | ----------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `cta`        | `cta`        |             | `string` | `'Find Out More'`                                                                                                                                                 |
| `emitid`     | `emitid`     |             | `string` | `undefined`                                                                                                                                                       |
| `image`      | `image`      |             | `string` | `'https://res.cloudinary.com/kclsu-media/image/upload/f_auto,fl_any_format,g_center,q_100/v1581516201/website_uploads/KCLSU%20Brand/Bzcl1r6L_400x400_se7grm.jpg'` |
| `link`       | `link`       |             | `string` | `undefined`                                                                                                                                                       |
| `name`       | `name`       |             | `string` | `undefined`                                                                                                                                                       |
| `position`   | `position`   |             | `string` | `undefined`                                                                                                                                                       |
| `secondcta`  | `secondcta`  |             | `string` | `undefined`                                                                                                                                                       |
| `secondlink` | `secondlink` |             | `string` | `undefined`                                                                                                                                                       |


## Events

| Event       | Description | Type               |
| ----------- | ----------- | ------------------ |
| `emitClick` |             | `CustomEvent<any>` |


## Dependencies

### Used by

 - [candidate-display](../../elections/elections-candidates/candidates-display)
 - [profile-tabs](../../profiles)

### Depends on

- [loading-spinner](../../spinner)
- [flex-container](../../containers/flex-container)

### Graph
```mermaid
graph TD;
  profile-card --> loading-spinner
  profile-card --> flex-container
  candidate-display --> profile-card
  profile-tabs --> profile-card
  style profile-card fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
