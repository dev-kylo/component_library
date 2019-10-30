import { Component, Prop, h, Element } from '@stencil/core';

@Component({
  tag: 'fullwidth-strip',
  shadow: false
})
export class FullwidthStrip {

    @Element() fullStrip: HTMLElement;

    @Prop() height: string = '';
    @Prop() color: string = '#502765';

    private strip: HTMLElement;

  componentDidLoad(){
    this.strip = this.fullStrip.querySelector('.relContent');
    if (this.height) this.styleElement('height', this.height);
    if (this.color) this.styleElement('background', this.color);
  }

  styleElement = (styleProp, val) => {
    this.strip.style[styleProp] = val
  }


  render() {

    return (
        <div class="row relContent">
            <div class="container">
                <div class="col-xs-12 col-md-8 col-md-push-2">
                    <slot></slot>
                </div>
            </div>
        </div>
    )
  }
}

