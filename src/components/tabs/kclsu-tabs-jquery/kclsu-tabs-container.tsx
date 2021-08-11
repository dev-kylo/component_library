import { Component, h } from '@stencil/core';


@Component({
    tag: 'kclsu-tabs-container',
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