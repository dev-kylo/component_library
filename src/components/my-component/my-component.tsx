import { Component, h, Element } from '@stencil/core';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css'
})
export class MyComponent {

  @Element() host: HTMLElement;

  componentDidLoad(){
    const pCards = this.host.firstElementChild as HTMLElement;
    console.log(pCards)
    pCards.style.color ='yellow';
  }

  render() {
    return <slot></slot>;
  }
}
