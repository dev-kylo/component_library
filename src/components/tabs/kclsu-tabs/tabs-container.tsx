import { Component, h } from '@stencil/core';


@Component({
    tag: 'tabs-container',
})
export class TabsContainer {
    
    render() {
        return (
            <div class="tabs">
                <slot></slot>
            </div>
        );
    }
}