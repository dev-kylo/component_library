import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'get-involved',
  shadow: false
})

export class GetInvolved {

  /** The typeform URL */
  @Prop()typeform: string;

  render() {
    return (
        <fullwidth-beige-strip>
          <div id="getInvolved">
            <h2>Get involved!</h2>
            <p>Join to get updates about the campaign and more on how to get involved.</p>
            <kclsu-button link={this.typeform}>Sign up</kclsu-button>
            <slot></slot>
          </div>
        </fullwidth-beige-strip>
    );
  }
}
