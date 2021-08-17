# cookie-modal



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute   | Description | Type                              | Default     |
| ----------- | ----------- | ----------- | --------------------------------- | ----------- |
| `config`    | --          |             | `{ [name: string]: () => void; }` | `undefined` |
| `daysvalid` | `daysvalid` |             | `number`                          | `30`        |
| `devmode`   | `devmode`   |             | `boolean`                         | `false`     |


## Dependencies

### Depends on

- [kclsu-modal](..)
- [flex-container](../../containers/flex-container)
- [kclsu-button](../../buttons/kclsu-button)

### Graph
```mermaid
graph TD;
  cookie-modal --> kclsu-modal
  cookie-modal --> flex-container
  cookie-modal --> kclsu-button
  kclsu-modal --> modal-backdrop
  kclsu-button --> flex-container
  style cookie-modal fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
