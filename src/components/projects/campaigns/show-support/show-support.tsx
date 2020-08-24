import { Component, h } from '@stencil/core';

@Component({
  tag: 'show-support',
  shadow: false
})

export class ShowSupport {

  render() {
    return (
        <page-content>
            <h2>Show your support</h2>
            <p>Add your name to the petition to support the campaign.</p>
            <div id="support">
                <slot></slot>
            </div>
        </page-content>
    );
  }
}
