import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'get-involved',
  shadow: false
})

export class GetInvolved {

  render() {
    const slot = "get-involved";
    return (
        <Host slot={slot}>
          <fullwidth-strip>
            <h3>Get Involved</h3>
            <p>Join to get updates about the campaign and how to get involved.</p>
            <slot></slot>
          </fullwidth-strip>
        </Host>
    );
  }
}
