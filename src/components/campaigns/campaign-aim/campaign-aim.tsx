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
            <p>Sign the petition, vote to end the assessment cap to achieve fairer assessments for all.</p>
            <div class="buttonCTA purpleBorder icon like"><a href="https://www.facebook.com/groups/1758956314405344/" target="_blank">Like</a></div>
            <div class="buttonCTA purpleBorder icon share" id="fb-share-button"><span>Share</span></div>
        </page-content>
    );
  }
}
