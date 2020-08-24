import { Component, Prop, h } from '@stencil/core';


//THIS BUTTON RENDERS THE HTML FOR MSL BUTTONS, AND RELIES ON STYLING INSIDE MSL

@Component({
  tag: 'primary-button',
  shadow: false
})
  
export class PrimaryButton {

  @Prop() to: string;

  render() {
    return (
    <div class="buttonCTA green">
        <a href={this.to}> <slot></slot> </a>
    </div>
    );
  }
}
