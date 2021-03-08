import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'campaign-tabs',
  shadow: false
})

export class CampaignTabs {
/** The MSL organisation ID where the news is kept */
@Prop() newsid: string;
/**The URL of the facebook page or group */
@Prop() facebook: string;
/**The URL of the document for the Strategy Doc uploaded under Resources for that campaign organisation. */
@Prop() strategydoc: string;

  render() {
    let fbclass;
    let socialFeed;

    if (this.facebook){
        fbclass = this.facebook.includes('group') ? 'fb-group' : 'fb-page';
        socialFeed = `
            <h3>Social Media</h3>
            <div class="social-col">
                <div class=${fbclass} data-href=${this.facebook} data-show-metadata="false" data-show-social-context="true" data-width="320">&nbsp;</div>
            </div>
       `
    }


    return (
        <page-content>
            <kclsu-tabs-container>
                <h2>UPDATES</h2>
                <div>
                    <section class="col-md-6">
                        <div class="news cardBorder green container">
                            <div class="mobileView news_full">
                                <h3>Campaign News</h3>
                                <campaign-news newsid={this.newsid}></campaign-news>
                            </div>
                            <kclsu-button purple link="/latest-news/">View all News</kclsu-button>
                        </div>
                    </section>

                    <section class="col-md-6" innerHTML={socialFeed}>
                        
                    </section>
                </div>

                <h2>OVERVIEW</h2>
                <div>
                    <slot></slot>
                </div>

                <h2>HOW IT WORKS</h2>
                <div>
                    <h3>How do campaigns work?</h3>
                    <p>For a campaign to be officially supported by KCLSU, it needs to have the support of our student membership which is done through an online petition. Add your name to the petition to support the campaign.</p>
                    <p><em>To support this campaign as an association member, please update your eligibility on your voting profile.</em>&nbsp;You can find out more information about how to update your voting profile <a href="https://www.kclsu.org/elections/eligibilityexplained/">here</a></p>
                    <p>Campaigns need to be supported by <em>150 KCLSU members</em> to become a KCLSU supported campaign <em>or 75 Association members</em> to become a KCLSU Association Supported campaign.</p>
                    <p>Once the threshold is reached, it means the campaign will receive guidance and support from KCLSU staff to create a strategy and deliver the campaign aim. </p>
                    <p>To find out more about this campaign and how to get involved, be sure to&nbsp;join up!</p>
                </div>
                {!this.strategydoc ? null : <h2>STRATEGY</h2> }
                {!this.strategydoc ?  null : 
                <div>
                    <h3>You must be logged in as a student to access the document below:</h3>
                    <kclsu-button link={this.strategydoc}>Campaign Strategy Document</kclsu-button>
                </div>}
            </kclsu-tabs-container>
        </page-content>
    );
  }
}
