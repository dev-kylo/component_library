import { Component, h } from '@stencil/core';


@Component({
    tag: 'aux-comp',
})
export class AuxComp {
    
    render() {
        return (
            <slot></slot>
        );
    }
}