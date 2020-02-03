import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'purple-button',
  styleUrl: 'purple-button.css',
  shadow: true
})

export class PurpleButton {

  @Prop() link: string;
  @Prop() whitetext: boolean;

  render() {
    let color;
    color = this.whitetext ? 'white' : 'purple';

    return (
    <div class="buttonCTA purpleBorder">
        <a class={color} href={this.link}> <slot></slot> </a>
    </div>
    );
  }
}
