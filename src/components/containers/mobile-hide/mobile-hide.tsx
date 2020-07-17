import { Component, h, Prop } from '@stencil/core';


@Component({
    tag: 'mobile-hide',
    styleUrl: 'mobile-hide.css'
})
export class MobileHide {

    /** In addition to hiding all children in screens mobile + smaller, this will hide content in screens tablet + smaller */
    @Prop() hidetablet:boolean = false;
    
    render() {

        const classname = this.hidetablet? 'hidefromtablet' : 'hidefrommobile';
        return (
            <div class={classname}>
                <slot></slot>
            </div>
        );
    }
}