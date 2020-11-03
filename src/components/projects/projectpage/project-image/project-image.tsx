import { Component, h, Prop } from '@stencil/core';


@Component({
    tag: 'project-image',
    shadow: true
})
export class ProjectImage {

    @Prop() link: string;
    @Prop() alt: string;
    @Prop() focusarea: string = 'center';

    render() {
        return (
            <lazy-image  focusarea={this.focusarea} alt={this.alt || ''} image={this.link}></lazy-image>
        );
    }
}