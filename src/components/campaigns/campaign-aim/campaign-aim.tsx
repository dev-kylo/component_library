import { Component, h } from '@stencil/core';

@Component({
  tag: 'campaign-aim',
  shadow: false
})

export class CampaignAim {

  render() {
    return (
        <page-content>
            <h2>Campaign Aim</h2>
            <p><slot></slot></p>
            <p>Sign the petition, or get involved by signing up for news and updates.<em>Your voice counts!</em></p>
            <div id="social_links"></div>
        </page-content>
    );
  }
}
