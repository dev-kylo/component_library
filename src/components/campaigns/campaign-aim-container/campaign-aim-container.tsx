import { Component, Prop, h} from '@stencil/core';

@Component({
  tag: 'campaign-aim-container',
  shadow: false
})

export class CampaignAimContainer {

  @Prop()title: string;

  render() {
      const slot = 'campaign-aim'
    return (
        <page-container>
            <h1>{this.title}</h1>
            <slot></slot>
        </page-container>
    );
  }
}
