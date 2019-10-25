import { Component, Prop, Host, h } from '@stencil/core';

@Component({
  tag: 'campaign-aim',
  shadow: true
})

export class CampaignAim {

  @Prop() aim: string;

  render() {
      const slot = 'campaign-aim'
    return (
        <Host slot={slot}>
            <h3>Campaign Aim</h3>
            <slot></slot>
        </Host>
    );
  }
}
