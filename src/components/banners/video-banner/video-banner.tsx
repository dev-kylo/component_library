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
            <iframe allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" frameborder="0" height="315" src={this.url} width="560"></iframe>
        </div>
    );
  }
}

