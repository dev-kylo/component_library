import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'quick-links',
  shadow: false
})
export class QuickLinks {

  @Prop() name: string = 'quick access.';

  render() {
    return (
        <fullwidth-strip>
            <p>Useful links for {this.name}:</p>
            <ul>
                <slot></slot>  
            </ul>
        </fullwidth-strip>
    )
  }
}

