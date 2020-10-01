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
    /**  Applies to MOBILE / TABLET <780px screens only. Paragraph and heading sizes reduced*/
    @Prop() smalltext: boolean;
    /**  Choose the colour for the paragraph text*/
    @Prop() textcolour: string;
    /**  Set the margin for the card*/
    @Prop() margin: string = "0";
    /**  Animate the image (scale in) on scroll*/
    @Prop() imagezoom: boolean = false;
    
    render() {
        let info = this.text? 
                        <p 
                            class={this.smalltext? "smalltext" : ""} 
                            style={{"color": this.textcolour? this.textcolour: ''}}
                        >{this.text}</p> : '';
        let style = {
            "flex-direction": this.switch? "row-reverse" : "",
            "margin": this.margin
        }
        console.log(this)

        return (
                <div class="image-text" style={style}>
                    <div class="info">
                        <h3 style={{"color": this.textcolour || '#502669'}}>{this.heading}</h3>
                        {info}
                        <slot></slot>
                    </div>
                    <div class="image">
                        <lazy-image image={this.image} animatein={this.imagezoom}></lazy-image>
                    </div>
                    
                </div>
        );
    }
}