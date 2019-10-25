import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'second-component',
  shadow: true
})
export class SecondComponent {

  @Prop() animal: string;

  render() {
    return <h3 id="llama">Damien has an obsession with {this.animal}</h3>;
  }
}

