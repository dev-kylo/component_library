import { Component, h, Prop } from '@stencil/core';


@Component({
    tag: 'image-fit-container',
    styleUrl: 'image-fit-container.css'
})
export class ImageFitContainer {

    @Prop() src: string;
    @Prop() alt: string;
    @Prop() classes:string[];
    
    render() {
        return (
            <img src={this.src} alt={this.alt}></img>
        );
    }
}