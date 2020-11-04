import { Component, h, Prop } from '@stencil/core';


@Component({
    tag: 'project-image',
    shadow: true
})
export class ProjectImage {

    /** The image URL link */
    @Prop() link: string;
    /** The alt tage for the image */
    @Prop() alt: string;
    /** Choose an area of the image to focus: top, left, right, bottom */
    @Prop() focusarea: string = 'center';

    render() {
        return (
            <lazy-image  focusarea={this.focusarea} alt={this.alt || ''} image={this.link}></lazy-image>
        );
    }
}