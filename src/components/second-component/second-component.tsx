import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'second-component',
  shadow: true
})
export class MyComponent {
  /**
   * The first name
   */
  @Prop() first: string;

  render() {
    return <div>Okay seriously man, come on {this.first}</div>;
  }
}
