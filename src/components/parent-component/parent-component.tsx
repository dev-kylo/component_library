import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'parent-component',
  shadow: false
})

export class ParentComponent {

  @Prop() number: number;

  render() {
    return <child-component number={this.number} />;
  }
}
