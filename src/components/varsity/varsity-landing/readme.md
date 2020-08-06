# varsity-landing



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute | Description | Type                                                                                 | Default        |
| ------------- | --------- | ----------- | ------------------------------------------------------------------------------------ | -------------- |
| `currentDate` | --        |             | `{ weekday: string; day: any; month: string; year: any; hours: any; minutes: any; }` | `returnDate()` |
| `year`        | `year`    |             | `string`                                                                             | `undefined`    |


## Dependencies

### Depends on

- [label-card](../../cards/label-card)
- [varsity-total-score](varsity-total-score)
- [varsity-race](varsity-race)
- [image-slider-auto](../../images/image-slider-auto)
- [varsity-upcoming](varsity-upcoming)
- [flex-container](../../containers/flex-container)
- [kclsu-modal](../../modal)
- [last-year-scores](last-year-scores)
- [image-fit-container](../../images/image-fit-container)

### Graph
```mermaid
graph TD;
  varsity-landing --> label-card
  varsity-landing --> varsity-total-score
  varsity-landing --> varsity-race
  varsity-landing --> image-slider-auto
  varsity-landing --> varsity-upcoming
  varsity-landing --> flex-container
  varsity-landing --> kclsu-modal
  varsity-landing --> last-year-scores
  varsity-landing --> image-fit-container
  label-card --> kclsu-button
  label-card --> lazy-image
  kclsu-button --> flex-container
  varsity-total-score --> flex-container
  varsity-upcoming --> kclsu-modal
  varsity-upcoming --> varsity-next-matches
  kclsu-modal --> modal-backdrop
  varsity-next-matches --> label-card
  last-year-scores --> flex-container
  last-year-scores --> kclsu-modal
  style varsity-landing fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
