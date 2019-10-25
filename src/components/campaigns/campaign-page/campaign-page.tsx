import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'campaign-page',
  shadow: true
})

export class CampaignPage {

  @Prop() campaignId: number;
  @Prop() name: string;
  @Prop() logo: string;

  render() {
    return (
        <div>
            <div id="intro">
                <h1>{this.name}</h1>
                <slot name="campaign-aim"></slot>
                <slot name="get-involved"></slot>
            </div>
            <div id="logo">
                <img src={this.logo} alt={"The logo for the campaign: " + this.name} />
            </div>
            <div id="accordion">
                <slot name="campaign-tabs"></slot>
            </div>
        </div>
    );
  }
}
