import { Component,h, Element, Prop} from '@stencil/core';

@Component({
  tag: 'support-progress',
  shadow: false
})

export class SupportProgress {

    @Element() el: HTMLElement;
    @Prop() maxtotal: any;
    @Prop() current: any;
    @Prop() supportname: string;
    private progressBar: HTMLElement;

    componentDidLoad(){
        this.progressBar = this.el.querySelector('.ui-progressbar-value');
        let amt = Number(this.current) / Number(this.maxtotal) * 100;
        this.progressBar.style.width =  `${amt}%`
    }

  render() {

    return (
        <div class="col-md-6">
            <div class="well setwell">
                <h5> {this.supportname} </h5>
                <div aria-valuemax={this.maxtotal} aria-valuemin="0" aria-valuenow={this.current} class="ui-progressbar ui-corner-all ui-widget ui-widget-content">
                    <div class="setcaption caption"> {this.current + ' of ' + this.maxtotal} </div>
                    <div class="ui-progressbar-value ui-corner-left ui-widget-header"></div>
                </div>
                <p>Petition Closed</p>
            </div>
        </div>
    );
  }
}

