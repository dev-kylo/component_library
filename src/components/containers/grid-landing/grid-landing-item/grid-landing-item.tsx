import { Component, h, Prop } from '@stencil/core';


@Component({
    tag: 'grid-landing-item',
    styleUrl: 'grid-landing-item.css',
    shadow: true
})
export class GridLandingItem {

    @Prop() width: string;
    @Prop() height: string;
    @Prop() label: string = '';
    
    render() {
        // let classes = ['item'];
        // this.width? classes.push(this.width) : '';
        // this.height? classes.push(this.height) : '';

        return (
         
                [<h3 class="tilelabel">{this.label}</h3>,
                <slot></slot>]
         
        );
    }
}