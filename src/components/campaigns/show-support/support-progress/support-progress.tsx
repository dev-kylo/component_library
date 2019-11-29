import { Component, h } from '@stencil/core';

@Component({
  tag: 'support-progress',
  shadow: false
})

export class SupportProgress {

  render() {
    return (
        <div class="col-md-6">
            <div class="well">
                <h5>Disabled Association Members</h5>
                <div aria-valuemax="75" aria-valuemin="0" aria-valuenow="3" class="ui-progressbar ui-corner-all ui-widget ui-widget-content">
                    <div class="setcaption">3 of 75</div>
                </div>
                <p>Petition Closed</p>
                <p></p>
            </div>
        </div>
    );
  }
}

