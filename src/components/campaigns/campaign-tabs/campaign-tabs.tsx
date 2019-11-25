import { Component, h } from '@stencil/core';

@Component({
  tag: 'campaign-tabs',
  shadow: false
})

export class CampaignTabs {

  render() {
    return (
        <page-content>
            <tabs-container>
                <single-tab tabheading="UPDATES">
                    <section class="col-md-6">
                        <div class="news cardBorder green container">
                            <div class="mobileView news_full">
                            <h3>Campaign News</h3>
                            <campaign-news></campaign-news>
                        </div>

                        <div class="buttonCTA purpleBorder arrow"><a href="/latest-news/">View all News</a></div>
                        </div>
                    </section>

                    <section class="col-md-6">
                        <h3>Social Media</h3>

                        <div class="social-col">
                        <div class="fb-group" data-href="https://www.facebook.com/groups/1758956314405344/" data-show-metadata="false" data-show-social-context="true" data-width="320">&nbsp;</div>
                        </div>
                    </section>
                </single-tab>

                <single-tab tabheading="OVERVIEW">
                    <slot></slot>
                </single-tab>
                <single-tab tabheading="HOW IT WORKS">
                    
                </single-tab>
            </tabs-container>
        </page-content>
    );
  }
}
