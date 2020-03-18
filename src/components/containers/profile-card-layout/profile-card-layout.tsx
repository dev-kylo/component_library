import { Component, h } from '@stencil/core';


@Component({
    tag: 'profile-card-layout',
    styleUrl: 'profile-card-layout.css',
    shadow: true
})
export class ProfileCardLayout {
    
    render() {
        return (
            <div class="card-layout">
                <slot></slot>
            </div>
        );
    }
}