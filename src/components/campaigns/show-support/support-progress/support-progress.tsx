import { Component, h } from '@stencil/core';

@Component({
  tag: 'support-progress',
  shadow: false
})

export class SupportProgress {

  render() {
    return (
        <div class="well">
            <h5>KCLSU Members</h5>
            <div role="progressbar" aria-valuemin="" class="ui-progressbar ui-corner-all ui-widget ui-widget-content" aria-valuemax="150" aria-valuenow="99">
                <div class="caption">99 of 150</div>
                <div class="ui-progressbar-value ui-corner-left ui-widget-header"></div>
            </div>
            <div class="mslwidget">
                <h3>Signups</h3>
                <a class="msl_edit" href="">Edit Signups</a>
                <div>
                    <dl class="msl_signup">
                        <dt></dt>
                        <dd class="msl_signup_date"></dd>
                        <dd class="msl_signup_places"></dd>
                        <dd class="msl_signup_body"></dd>
                        <dd class="msl_signup_controls">Petition Closed</dd>			
                    </dl>  
                </div>
            </div>
        </div>
    );
  }
}

