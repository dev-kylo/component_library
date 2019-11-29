import { Component, Prop, Host, h } from '@stencil/core';

@Component({
  tag: 'single-tab',
  shadow: true
})

export class SingleTab {

  @Prop() tabheading: string;

  render() {
    return (
        <Host>
            <h2> { this.tabheading } </h2>
            <div>
                <slot></slot>
            </div>
        </Host>
    );
  }
}