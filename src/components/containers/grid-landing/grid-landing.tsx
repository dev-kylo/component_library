import { Component, h, Element, State } from '@stencil/core';


@Component({
    tag: 'grid-landing',
    styleUrl: 'grid-landing.css',
    shadow: true
})
export class GridLanding {
    @Element() host: HTMLElement;
    @State() griditems;

    componentDidLoad(){
        console.log(this.host.querySelectorAll('grid-landing-item'))
        this.griditems = this.host.querySelectorAll('grid-landing-item');
    }

    renderItems(){
        let items = []
        for(let x=0; x< this.griditems.length; x++){
            let item = this.griditems[x];
            let classes = ['item'];
            item.width? classes.push(item.width) : '';
            item.height? classes.push(item.height) : '';
            let el = <div class={classes.join(' ')}><slot name={item.label}>{item}</slot></div>;
            items.push(el);
        }
        return items;
    }
    
    render() {
        let items;
        if (this.griditems) items= this.renderItems();
        return (
            <div class="grid">
                {items}
            </div>   
        );
    }
}