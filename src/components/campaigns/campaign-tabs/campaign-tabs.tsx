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
                            <div class="fb-group" data-href="" data-show-metadata="false" data-show-social-context="true" data-width="320">&nbsp;</div>
                        </div>
                    </section>
                </single-tab>

                <single-tab tabheading="OVERVIEW">
                    <slot></slot>
                </single-tab>
                <single-tab tabheading="HOW IT WORKS">
                    <h3>How do campaigns work?</h3>
                    <p>For a campaign to be officially supported by KCLSU, it needs to have the support of our student membership which is done through an online petition. Add your name to the petition to support the campaign.</p>
                    <p><em>To support this campaign as an association member, please update your eligibility on your voting profile.</em>&nbsp;You can find out more information about how to update your voting profile <a href="https://www.kclsu.org/elections/eligibilityexplained/">here</a></p>
                    <p>Campaigns need to be supported by <em>150 KCLSU members</em> to become a KCLSU supported campaign <em>or 75 Association members</em> to become a KCLSU Association Supported campaign.</p>
                    <p>Once the threshold is reached, it means the campaign will receive guidance and support from KCLSU staff to create a strategy and deliver the campaign aim. </p>
                    <p>To find out more about this campaign and how to get involved, be sure to&nbsp;join up!</p>
                </single-tab>
                {/* <single-tab tabheading="DOCUMENTS">
                    <h3>You must be logged in as a student to view these documents.</h3>
                    
                </single-tab> */}
            </tabs-container>
        </page-content>
    );
  }
}
