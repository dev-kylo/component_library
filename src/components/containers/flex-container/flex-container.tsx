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

    setPosition = () => {
        if (!this.alignx || !this.aligny) return ' '
        else return ` flex-${this.alignx}-${this.aligny} `
    }

    setDirection = () => {

        let direction = 'row'
        if (this.direction === 'column') direction = 'column'

        if (this.wrap){
            direction += ' wrap';
        }

        return direction;
    }

  render() {

    let position = this.setPosition();
    let flow = this.setDirection();

    
    return (
        <div class={'flex ' + position + flow}>
            <slot></slot>
        </div>
    );
  }
}
