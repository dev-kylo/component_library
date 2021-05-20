import { Component, h, Prop } from '@stencil/core';


@Component({
    tag: 'project-card',
    styleUrl: 'project-card.css',
    shadow: true
})
export class ProjectCard {

    @Prop() transparent: boolean = false;
    @Prop() image: string;
    /** Applies to mobile displays only. Will hide the image and display content only */
    @Prop() hideimage: boolean = false;
    @Prop() heading: string;
    /** The primary image focus area. standard CSS object-position values to set a focus area on the image. EG 'center left' */
    @Prop() focusarea: string = 'center';
    @Prop() text: string;
    /** Position the content of the card along the X axis */
    @Prop() alignx: string = 'flex-start';
    /** Position the content of the card along the Y axis */
    @Prop() aligny: string = 'center';
    /** Display an event listing */
    @Prop() eventtag:string;
    /** If displaying events, set a custom URL for 'all events' in place of dynamically created URL */
    @Prop() alleventsurl: string ;
    
    render() {
        const containerPadding = {
            'padding': this.image? '0' : '2em'
        };
        const cardClasses = {
            "card": true,
            "transparent_bg": this.transparent,
            "white_bg": !this.transparent,
            "shadow": !this.transparent
        }
        let card =  (
            <div class="textcontainer" style={containerPadding}>
                <flex-container alignx={this.aligny} aligny={this.alignx} fillcontainer direction="column">
                    {this.heading && <h3>{this.heading}</h3>}
                    {this.text && <p>{this.text}</p>}
                    <div style={{"max-width": "100%"}}>
                        <slot></slot>
                    </div>
                </flex-container>
            </div>
        )
        if (this.image) card = (
            <image-text
                card
                focusarea={this.focusarea}
                reversestack
                hideimage={this.hideimage}
                image={this.image}
                imagewidth= "40"
                text={this.text}
                heading={this.heading}
            >
                <slot></slot>
            </image-text>
        );
        
        if (this.eventtag) card = (
            <project-card-events alleventsurl={this.alleventsurl} tag={this.eventtag}><slot></slot></project-card-events>
        )


        return (
            <scroll-observer animation="slide-in-bottom">
                <section class={cardClasses}>
                    {card}
                </section>
            </scroll-observer>
            
        );
    }
}