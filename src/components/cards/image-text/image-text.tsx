import { Component, h, Prop } from '@stencil/core';


@Component({
    tag: 'image-text',
    styleUrl: 'image-text.css',
    shadow: true
})
export class ImageText {

    /** The title at the top of the text */
    @Prop() heading: string;
    /** This turns the component into a card, rather than just an image/text layout */
    @Prop() card: boolean;
    /** The paragraph text */
    @Prop() text: string;
    /** The image link (get from Cloudinary) */
    @Prop() image: string;
    /** Provide a set % width for the image. Takes a  number without the % sign*/
    @Prop() imagewidth: string;
    /** Switch the side the image is on.*/
    @Prop() switch: boolean;
    /**  Applies to MOBILE / TABLET <780px screens only. Paragraph and heading sizes reduced*/
    @Prop() smalltext: boolean;
    /**  Choose the colour for the paragraph text*/
    @Prop() textcolour: string;
    /**  Set the margin for the card*/
    @Prop() margin: string = "45px auto";
    /**  Animate the image (scale in) on scroll*/
    @Prop() imagezoom: boolean = false;
    
    render() {
        let info = this.text? 
                        <p 
                            class={this.smalltext? "smalltext" : ""} 
                            style={{"color": this.textcolour? this.textcolour: ''}}
                        >{this.text}</p> : '';
        const mobilebreakpoint = screen.width < 800;
        const container_styles = {
            "flex-direction": this.switch? "row-reverse" : "",
            "margin": this.margin,
            "box-shadow": this.card? "0.5px 3px 5px 0px rgba(0,0,0,0.15)" : "none",
            "max-width": this.card? "900px" : "100%",
            "display": "flex",
            "justify-content": this.card? "space-between" : "center"
        };

        const imageWidth = {
            "width": mobilebreakpoint? "auto" : this.imagewidth? `${this.imagewidth}%` : this.card? "35%" : "50%",
            "height":  mobilebreakpoint? "350px" : "auto" 
        };
        const contentWidth = {
            "width": mobilebreakpoint? "auto" : this.imagewidth? `${100 - +this.imagewidth}%` : this.card? "65%" : "50%",
            "text-align": this.switch? 'right': 'left'
        };

        return (
                <div class="image-text" style={container_styles}>
                    <div class="info" style={contentWidth}>
                        <h3 style={{"color": this.textcolour || '#502669'}}>{this.heading}</h3>
                            {info}
                        <slot></slot>
                    </div>
                    <div class="image" style={imageWidth}>
                        <lazy-image image={this.image} animatein={this.imagezoom}></lazy-image>
                    </div>
                    
                </div>
        );
    }
}