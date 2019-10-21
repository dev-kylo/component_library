import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'child-component',
  shadow: false
})
export class ChildComponent {

  @Prop() number: number;

  render() {
    return(
      <div class="row">
        <div class="col-md-6">
            <h1>{this.number}</h1>
        </div>
        <div class="col-md-6">
              This should be on the right
        </div>
      </div>
    );
  }
}
