import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'get-involved',
  shadow: false
})

export class GetInvolved {

  @Prop()typeform: string;

  render() {
    return (
        <fullwidth-beige-strip>
          <div id="getInvolved">
            <h2>Get invoved!</h2>
            <p>Join to get updates about the campaign and more on how to get involved.</p>
            <div class="buttonCTA green"><a href={this.typeform}>Sign up</a></div>
            <slot></slot>
          </div>
        </fullwidth-beige-strip>
    );
  }
}
