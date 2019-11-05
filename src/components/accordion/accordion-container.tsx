import { Component, h } from '@stencil/core';

@Component({
  tag: 'accordion-container',
  shadow: false
})

export class AccordionContainer {

  render() {
    return (
      <div class="acc-container">
          <slot></slot>
      </div>
    );
  }
}
