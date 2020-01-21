import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'purple-button',
  shadow: false
})

export class PurpleButton {

  @Prop() link: string;

  render() {
    return (
    <div class="buttonCTA purpleBorder">
        <a href={this.link}> <slot></slot> </a>
    </div>
    );
  }
}
