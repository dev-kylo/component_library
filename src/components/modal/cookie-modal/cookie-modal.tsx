import { Component, h, Prop, Element, State } from '@stencil/core';
import { cookieConfig } from './types';

@Component({
    tag: 'cookie-modal',
    shadow: true,
    styleUrl: 'cookie-modal.scss'
})

export class CookieModal {

    @Prop() config: cookieConfig;
    @Prop() daysvalid: number = 30;
    @Prop() devmode: boolean = false;
    
    @State() visible: boolean = true;

    
    @Element() host: HTMLElement;
    
    cookiename = '__kclsuconsentedcookies';

    componentWillLoad(){
        this.visible = !this.useExistingCookie();
    }


    useExistingCookie(): boolean {
        let existing = this.getCookie(this.cookiename);
        if (existing){
            if (existing === 'none') return true;
            // Fire the callback functions for any cookie setters
            let keys = existing.split(',');
            keys.forEach((key: string) => this.config[key]());
            return true;
        } 
        return false;
    }

    fetchAcceptedCookies(){
        return Array.from(this.host.querySelectorAll('input[type=checkbox]:checked'))
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
                let key = input.dataset.cookiename.trim();
                if(this.config[key]) {
                    this.config[key]();
                    consentedCookies.push(key);
                }
            })
        }
        return consentedCookies
    }

    setConsentCookie(consentedCookies?: string[]): void{
        let cookieVal = consentedCookies && consentedCookies.length  > 0 ? consentedCookies.join(',') : 'none';
        let cookie = `${this.cookiename}=${cookieVal}; path=/; max-age=${60 * 60 * 24 * +(this.daysvalid)}`
        document.cookie = cookie;
    }


    acceptHandler(){
        if (this.devmode) return this.visible = false;
        let checked = this.fetchAcceptedCookies();
        let appliedcookies = this.applyCookieSetter(checked);
        this.setConsentCookie(appliedcookies)
        this.visible = false;
    }

    rejectHandler(){
        this.visible = false;
        if (this.devmode) return;
        this.setConsentCookie();
    }

    render() {
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
                    <slot name="cookiecheckboxes"></slot>
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