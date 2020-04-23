import { Component, h, Prop } from '@stencil/core';


@Component({
    tag: 'image-text',
    styleUrl: 'image-text.css',
    shadow: true
})
export class ImageText {

    /** The title at the top of the text */
    @Prop() heading: string;
    /** The paragraph text */
    @Prop() text: string;
    /** The image link (get from Cloudinary) */
    @Prop() image: string;
    /** 	Switch the side the image is on*/
    @Prop() switch: boolean;
    
    render() {
        let info = this.text? <p>{this.text}</p> : '';
        let style = !this.switch? {} : {"flex-direction": "row-reverse"}
        return (
                <div class="image-text" style={style}>
                    <div class="info">
                        <h4>{this.heading}</h4>
                        {info}
                        <slot></slot>
                    </div>
                    <div class="image">
                        <img src={this.image}></img>
                    </div>
                </div>
        );
    }
}