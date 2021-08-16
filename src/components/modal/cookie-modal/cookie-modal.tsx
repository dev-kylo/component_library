import { Component, h, Prop, Element, State } from '@stencil/core';

type cookieConfig = {
    [name: string] : () => void
}


@Component({
    tag: 'cookie-modal',
    styleUrl: 'cookie-modal.scss'
})

export class CookieModal {

    @Prop() config: cookieConfig;
    @Prop() daysvalid: number = 30;

    @State() visible = true;

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
        let checked = this.fetchAcceptedCookies();
        let appliedcookies = this.applyCookieSetter(checked);
        this.setConsentCookie(appliedcookies)
        this.visible = false;
    }

    rejectHandler(){
        this.visible = false;
    }

    render() {
        return (
            <kclsu-modal custom="100vw, 50vh, white" show={this.visible}>
            <div>
              <h1>You have control over your data</h1>
              <flex-container alignx="space-around">
                <div>
                    <h2> Why do we use cookies?</h2>
                    <slot name="info"></slot>
                </div>
                <div>
                    <h2> Manage your cookies</h2>
                    <p>Please manage your cookie choices by switching the consent toggles on or off.</p>
                    <slot name="cookiecheckboxes"></slot>
                </div>
              </flex-container>
              <div >
                 <flex-container>
                    <kclsu-button clickfn={() => this.fetchAcceptedCookies()}> I Consent to these Cookies</kclsu-button>
                    <kclsu-button purple clickfn={() => this.rejectHandler()}>  I Reject unneccesary cookies </kclsu-button>
                  </flex-container>
            </div>
            </div>
          </kclsu-modal>
        );
    }
}