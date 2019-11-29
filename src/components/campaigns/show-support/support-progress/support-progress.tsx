import { Component,h, Element} from '@stencil/core';

@Component({
  tag: 'support-progress',
  shadow: false
})

export class SupportProgress {

    @Element() el: HTMLElement;
    private progressBar: HTMLElement;

    componentDidLoad(){
        this.progressBar = this.el.querySelector('.ui-progressbar-value');
        this.progressBar.style.width = '64%';
    }

  render() {

    return (
        <div class="col-md-6">
            <div class="well setwell">
                <h5>Disabled Association Members</h5>
                <div aria-valuemax="75" aria-valuemin="0" aria-valuenow="3" class="ui-progressbar ui-corner-all ui-widget ui-widget-content">
                    <div class="setcaption">3 of 75</div>
                    <div class="ui-progressbar-value ui-corner-left ui-widget-header"></div>
                </div>
                <p>Petition Closed</p>
            </div>
        </div>
    );
  }
}

