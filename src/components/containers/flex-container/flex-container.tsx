import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'flex-container',
  styleUrl: 'flex-container.css',
  shadow: false
})


export class FlexContainer {

    @Prop() alignx: string;
    @Prop() aligny: string;
    @Prop() wrap: boolean;
    @Prop() direction: string;
    @Prop() mobcolumn: boolean;

  render() {

    let classes = {
      'display': 'flex',
      'justify-content': this.alignx || '',
      'align-items': this.aligny || '',
      'flex-wrap': this.wrap? 'wrap': 'nowrap',
      'flex-direction': this.direction || 'row',
    }

    
    return (
        <div style={classes}>
            <slot></slot>
        </div>
    );
  }
}
