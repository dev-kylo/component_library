import { Component, h, Prop, Element, State } from '@stencil/core';
import { cookieConfig } from './types';

@Component({
    tag: 'cookie-modal',
    styleUrl: 'cookie-modal.scss'
})

export class CookieModal {

    @Prop() config: cookieConfig;
    @Prop() daysvalid: number = 30;
    @Prop() testmod: boolean = false;
    
    @State() visible: boolean = true;

    
    @Element() host: HTMLElement;
    
    cookiename = 'kclsuconsentedcookies';


    useExistingCookie(): boolean {
        let existing = this.getCookie(this.cookiename);
        if (existing){
            let keys = existing.split(',');
            keys.forEach((key: string) => this.config[key]());
            return true;
        }
        return false;
    }

    fetchAcceptedCookies(){
        return Array.from(this.host.shadowRoot.querySelectorAll('input[type=checkbox]:checked'))
    }

    getCookie(name: string): string {
        let value = `; ${document.cookie}`;
        let segments = value.split(`; ${name}=`);
        if (segments.length === 2) return segments.pop().split(';').shift();
    }

    applyCookieSetter(cookieInputs = []): string[]{
        let consentedCookies = [];
        if(cookieInputs.length > 0){
            cookieInputs.forEach(input => {
                let key = input.data.cookiename.trim();
                if(this.config[key]) {
                    this.config[key]();
                    consentedCookies.push(key);
                }
            })
        }
        return consentedCookies
    }

    setConsentCookie(consentedCookies: string[] = []): void{
        if (consentedCookies.length  > 0){
            let cookie = `${this.cookiename}=${consentedCookies.join(',')}; path=/; max-age=${60 * 60 * 24 * +(this.daysvalid)}`
            document.cookie = cookie;
        }
    }


    acceptHandler(){
        console.log(this.testmod);
       
        if (this.testmod) {
            this.visible = false;
            console.log(this.visible)
        } else {
            console.log('Running rest of code')
            let checked = this.fetchAcceptedCookies();
            let appliedcookies = this.applyCookieSetter(checked);
            this.setConsentCookie(appliedcookies)
            this.visible = false;
        }
    }

    rejectHandler(){
        this.visible = false;
    }

    render() {
        console.log('rendering')
        return (
            <kclsu-modal custom="100vw, 65vh, white" show={this.visible}>
            <div id="canvas">
              <span>You have control over your data</span>
              <flex-container alignx="space-around" wrap>
                <div id="info">
                    <span> Why do we use cookies</span>
                    <slot name="info"></slot>
                </div>
                <div id="cookielist">
                    <span> Manage your cookies</span>
                    <p>Please manage your cookie choices by switching the consent toggles on or off.</p>
                    <div>
                    <slot name="cookiecheckboxes"></slot>
                    </div>
                </div>
              </flex-container>
              <div id="buttons">
                 <flex-container alignx="center" wrap>
                    <kclsu-button small clickfn={this.acceptHandler.bind(this)}> I Consent to these Cookies</kclsu-button>
                    <kclsu-button small purple clickfn={this.rejectHandler.bind(this)}>  I Reject unneccesary cookies </kclsu-button>
                  </flex-container>
            </div>
            </div>
          </kclsu-modal>
        );
    }
}