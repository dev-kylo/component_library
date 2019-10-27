import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'quick-link',
  shadow: false
})
export class QuickLink {

  @Prop() to: string = '/';

  render() {
    return (
        <li class="arrowBefore">
            <a href={this.to}><slot></slot></a>
        </li>
    )
  }
}

