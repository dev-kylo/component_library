import { Component, h } from '@stencil/core';

@Component({
  tag: 'fullwidth-beige-strip',
  shadow: false
})

export class FullWidthBeigeStrip {

  render() {
    return (
        <div class="row ulStyle liBullet">
            <page-content>

            </page-content>
        </div>
    );
  }
}
