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
                    <p>KCLSU is a charity and so has charitable aims and purpose. Our union campaigns must seek to further these.</p>
                    <p>Union Campaigns aim to challenge, influence and change structures, policies and behaviours that affect the lived student experience of KCLSU members as students of King’s College London.</p>
                    <p>Union Campaigns are campaigns to make change for students at KCL that have a democratic mandate from our membership.</p>
                    <p>Union Campaigns are developed based on the manifestos of our elected Officer Team or through our elected Network Committees, Union Development Committees and Academic Associations.</p>
                    <p>We also support our student members to campaign for change. You can <a href="https://kclsu.typeform.com/to/EbYqUb" class="link">submit a campaign idea here</a>, and our campaigns team will help you to work with our elected student representatives or build engagement through seeking campaign support from 50 student members and approval from our student officer team.</p>
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
