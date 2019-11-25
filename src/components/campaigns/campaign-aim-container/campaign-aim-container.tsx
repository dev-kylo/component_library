import { Component, Prop, h} from '@stencil/core';

@Component({
  tag: 'campaign-aim-container',
  shadow: false
})

export class CampaignAimContainer {

  @Prop()campaignname: string;

  render() {
    return (
        <page-container>
            <h1>{this.campaignname}</h1>
            <slot></slot>
        </page-container>
    );
  }
}
