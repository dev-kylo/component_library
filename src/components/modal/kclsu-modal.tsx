import { Component, h, Prop } from '@stencil/core';


@Component({
    tag: 'kclsu-modal',
    styleUrl: 'kclsu-modal.css'
})
export class KclsuModal {

    @Prop() show:boolean = false;
    
    render() {

        let styles = {
            'transform': this.show? 'translateY(0)' : 'translateY(-100vh)',
            'opacity': this.show? '1' : '0'
        };

        return (
            <div 
                class="Modal"
                style={styles}>
            <slot></slot>
        </div>
        );
    }
}