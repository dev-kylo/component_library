import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'video-banner',
  shadow: true
})
export class VideoBanner {

  @Prop() url: string;

  render() {
    return (
        <div id="topVideoEmbed">
            <slot></slot>
        </div>
    );
  }
}

