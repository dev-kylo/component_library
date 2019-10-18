import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'second-component',
  shadow: false
})
export class MyComponent {
  /**
   * The first name
   */
  @Prop() first: string;

  render() {
    return <h3>Okay seriously man, come on {this.first}</h3>;
  }
}
