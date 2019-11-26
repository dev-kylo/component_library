import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'support-option',
  shadow: false
})

export class SupportOption {
    @Prop() supportname: string;
    @Prop() heading: string;

  render() {
    return (
        <div class="col-md-6">
            <div class="well">
                <h5>{this.heading}</h5>
                <div id={this.supportname + "_progress"}>&nbsp;</div>
                <p><slot></slot></p>
            </div>
        </div>
    );
  }
}
