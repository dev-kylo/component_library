import { Component, h } from '@stencil/core';

@Component({
  tag: 'page-content',
  shadow: false
})

export class PageContent {

  render() {
    return (
        <div class="container">
            <div class="row">
                <div class="col-xs-12 col-md-8 col-md-push-2">
                    <slot></slot>
                </div>
            </div>
        </div>
    );
  }
}
