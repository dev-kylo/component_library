import { Component, Prop, Host, h } from '@stencil/core';

@Component({
  tag: 'single-tab',
  shadow: false
})

export class SingleTab {

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