import { Component, Prop, h, Host } from '@stencil/core';

@Component({
  tag: 'campaign-page',
  shadow: false 
})

export class CampaignPage {

  @Prop() campaignId: number;
  @Prop() name: string;

  render() {
    return (
      <Host>
        <campaign-aim-container>
          <slot></slot>
        </campaign-aim-container>
        <slot name="get-involved"></slot>
        <slot name="show-support"></slot>
        <campaign-tabs newsid={this.campaignId} facebook=''>
            <slot name="campaign-tabs"></slot>
        </campaign-tabs>
      </Host>
    );
  }
}
