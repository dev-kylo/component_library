import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'flex-container',
  styleUrl: 'flex-container.css',
  shadow: false
})


export class FlexContainer {

    @Prop() alignx: string = 'center';
    @Prop() aligny: String = 'center';
    @Prop() wrap: Boolean;
    @Prop() direction: String;
    @Prop() mobcolumn: Boolean;

    setPosition = () => {
        return ` flex-${this.alignx}-${this.aligny} `
    }

    setDirection = () => {

        let direction = ' row';

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
