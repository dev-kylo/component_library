import { Component, Prop, Host, h } from '@stencil/core';

@Component({
  tag: 'tab-menu',
  shadow: false
})

export class TabMenu {

  @Prop() title: string;

  render() {
    return (
        <Host>
            <h2> { this.title } </h2>
            <div>
                <slot></slot>
            </div>
        </Host>
    );
  }
}