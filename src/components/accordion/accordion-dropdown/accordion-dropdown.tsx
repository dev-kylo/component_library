import { Component, Prop, Host, h } from '@stencil/core';

@Component({
  tag: 'accordion-dropdown',
  shadow: true
})

export class AccordionDropdown {

  @Prop() header: string;

  render() {
    return (
        <Host>
            <div class="acc-btn selected">
                <p>{this.header}</p>
            </div>
            <div class="acc-content open">
                <div class="acc-content-inner">
                    <slot></slot>
            </div>
            </div>
        </Host>
    );
  }
}
