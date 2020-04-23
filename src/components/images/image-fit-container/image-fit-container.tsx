import { Component, h, Prop } from '@stencil/core';


@Component({
    tag: 'image-fit-container',
    styleUrl: 'image-fit-container.css'
})
export class ImageFitContainer {
    /* The URL of the image */
    @Prop() src: string;
    /* The alt tag of the image for accessibility */
    @Prop() alt: string;
    /* Any classes to be added to the image */
    @Prop() classes:string;
    
    render() {
        return (
            <img src={this.src} alt={this.alt} class={this.classes? this.classes : ''}></img>
        );
    }
}