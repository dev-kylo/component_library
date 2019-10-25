import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'get-involved',
  shadow: true
})

export class GetInvolved {

  render() {
    const slot = "get-involved";
    return (
        <Host slot={slot}>
            <h3>Get Involved</h3>
            <p>Join to get updates about the campaign and how to get involved.</p>
            <slot></slot>
        </Host>
    );
  }
}
