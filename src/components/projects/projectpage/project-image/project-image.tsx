import { Component, h, Prop } from '@stencil/core';


@Component({
    tag: 'project-image',
    shadow: true
})
export class ProjectImage {

    @Prop() link;
    
    render() {
        return (
            <lazy-image image={this.link}></lazy-image>
        );
    }
}