import { Component, h, Prop } from '@stencil/core';


@Component({
    tag: 'desktop-hide',
    styleUrl: 'desktop-hide.css'
})
export class DesktopHide {

    /** In addition to hiding all children content in screens desktop + bigger, this will hide content in screens tablet + bigger*/
    @Prop() hidetablet:boolean = false;
    
    render() {

        const classname = this.hidetablet? 'hidefromtablet' : 'hidefromdesktop';
        return (
            <div class={classname}>
                <slot></slot>
            </div>
        );
    }
}