import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'profile-card',
  shadow: false
})

export class ProfileCard{

  @Prop()typeform: string;

  render() {
    return (
        <fullwidth-beige-strip>
            card
        </fullwidth-beige-strip>
    );
  }
}
