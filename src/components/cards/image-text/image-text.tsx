import { Component, h, Prop, State } from '@stencil/core';


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
    @Prop() switch: boolean = false;
    /**  Applies to MOBILE / TABLET <780px screens only. Paragraph and heading sizes reduced*/
    @Prop() smalltext: boolean;
    /**  Choose the colour for the paragraph text*/
    @Prop() textcolour: string;
    /**  Set the margin for the card*/
    @Prop() margin: string = "45px auto";
 /** The primary image focus area. standard CSS object-position values to set a focus area on the image. EG 'center left' */
    @Prop() focusarea: string = 'center';
    /**  Animate the image (scale in) on scroll*/
    @Prop() imagezoom: boolean = false;
    /**  When the image and content stack, reverse the order so the image is on top*/
    @Prop() reversestack: boolean = false;
    /** Applies to mobilescreen displays only. Will hide the image and display content only */
    @Prop() hideimage: boolean = false;

    @State() mobilescreen: boolean = false;
    mediaquery;

    componentWillLoad(){
        this.mediaquery = window.matchMedia('(max-width: 800px)');
        // IMMEIDATELY CHECK FOR MOBILE SCREEN
        this.checkForMobileScreen(this.mediaquery);
        this.mediaquery.addListener(this.checkForMobileScreen.bind(this));
    }

    checkForMobileScreen(e){
        if (e.matches) this.mobilescreen = true;
        else this.mobilescreen = false;
    }
    
    render() {
        let info = this.text? 
                        <p 
                            class={this.smalltext? "smalltext" : ""} 
                            style={{"color": this.textcolour? this.textcolour: ''}}
                        >{this.text}</p> : '';
                        
        const mobilescreen = this.mobilescreen;
        const container_styles = {
            "flex-direction": this.switch? "row-reverse" : "",
            "margin": this.margin,
            "box-shadow": this.card? "0.5px 3px 5px 0px rgba(0,0,0,0.15)" : "none",
            "max-width": this.card? "900px" : "100%",
            "display": "flex",
            "justify-content": this.card? "space-between" : "center",
            "flex-flow": mobilescreen && this.reversestack? "column-reverse" 
                            : mobilescreen ? "column"
                            : this.switch? "row-reverse"
                            : "row"
        };

        const imageWidth = {
            "width": mobilescreen? "auto" : this.imagewidth? `${this.imagewidth}%` : this.card? "35%" : "50%",
            "height":  mobilescreen? "350px" : "auto",
            "display": mobilescreen && this.hideimage ? "none" : "block"
        };

        const contentWidth = {
            "width": mobilescreen? "auto" : this.imagewidth? `${100 - +this.imagewidth}%` : this.card? "65%" : "50%",
            "text-align": mobilescreen? 'left' :
                          this.switch? 'right': 'left'
        };

        return (
                <div class="image-text" style={container_styles}>
                    <div class="info" style={contentWidth}>
                        <h3 style={{"color": this.textcolour || '#502669'}}>{this.heading}</h3>
                            {info}
                        <slot></slot>
                    </div>
                    <div class="image" style={imageWidth}>
                        <lazy-image 
                            focusarea={this.focusarea} 
                            image={this.image} 
                            animatein={this.imagezoom}
                            minwidth="400"
                            mobile="95"
                            desktop="40"
                        ></lazy-image>
                    </div>
                    
                </div>
        );
    }
}