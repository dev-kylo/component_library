import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'flex-container',
  styleUrl: 'flex-container.css',
  shadow: false
})


export class FlexContainer {

    /** The same as the 'justify-content' flex property along the x axis */
    @Prop() alignx: string;
    /** The same as the 'align-items' flex property along the y axis */
    @Prop() aligny: string;
    /** Add flex-wrap to flex items */
    @Prop() wrap: boolean;
    /** Ensure the container stretches the full width and height of parent container */
    @Prop() fillcontainer: boolean;
    /** Set the flex direction: column, reverse-column, row, reverse-row */
    @Prop() direction: string;
    /** In mobile display in column direction - NOT YET RELEASED*/
    @Prop() mobcolumn: boolean;
    /** If the parent container element needs to be an <ul> list element */
    @Prop() renderlist: boolean = false;

  render() {

    let classes = {
      'display': 'flex',
      'justify-content': this.alignx || '',
      'align-items': this.aligny || '',
      'flex-wrap': this.wrap? 'wrap': 'nowrap',
      'flex-direction': this.direction || 'row',
      'width': this.fillcontainer? '100%' : '',
      'height': this.fillcontainer? '100%': ''
    }

    if (this.renderlist) {
      return (
        <ul class="flexlist" style={classes}>
            <slot></slot>
        </ul>
    );
    }
    
    else return (
        <div style={classes}>
            <slot></slot>
        </div>
    );
  }
}

