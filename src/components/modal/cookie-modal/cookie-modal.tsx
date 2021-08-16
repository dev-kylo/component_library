import { Component, h, Prop } from '@stencil/core';

type cookieConfig = {
    checkboxId : string,
    optIn : () => void
}

@Component({
    tag: 'cookie-modal',
    styleUrl: 'cookie-modal.scss'
})
export class CookieModal {

    @Prop() configs: cookieConfig[]


    checkForExistingCookie(): boolean {
        return false;
    }

    fetchAcceptedCookies(){


    }

    setCookie(){

    }

    createCheckBox(): HTMLElement{
        return (
         <div>
            <label>Google Analytics</label>
            <input type="checkbox" value="Google Analytics"></input>
          </div>
        )
    }
    
    render() {
        return (
            <kclsu-modal custom="100vw, 50vh, white" show autoexit>
            <div>
              <h1>You have control over your data</h1>
              <flex-container alignx="space-around">
                <div>
                    <slot name="info"></slot>
                </div>
                <div>
                  <h2> Current cookies tracked</h2>
                    {this.createCheckBox()}
                </div>
                <div>
                  <h2>Are you happy to accept these cookies?</h2>
                  <flex-container>
                    <kclsu-button > Accept</kclsu-button>
                    <kclsu-button purple> Reject all</kclsu-button>
                  </flex-container>
                </div>
              </flex-container>
            </div>
          </kclsu-modal>
        );
    }
}