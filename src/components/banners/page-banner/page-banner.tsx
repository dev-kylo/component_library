import { Component, h, Prop } from '@stencil/core';
import { createArrayFromString } from '../../../utils/utils';


@Component({
    tag: 'page-banner',
    styleUrl: 'page-banner.css',
    shadow: true
})

export class PageBanner{

    /** The <h1> heading for a page. There should only be one pagetitle for page. Use the heading attribute for other titles. */
    @Prop() pagetitle: string;
    /** The <h2> heading for the section */
    @Prop() heading: string;
    /** The paragraph text. If you need text links or separate paragraphs, rather insert HTML. */
    @Prop() text: string;
    /** The colours for the background & text of <project-heading>, separated with a comma. eg "text colour, bg colour" */
    @Prop() colourscheme: string = "white, #502669";
    /** The colours for the <h1> heading, separated with a comma. eg "h1 colour, bg colour" */
    @Prop() pagetitlecolours: string = "white, #1BA39C";
    /** Supply a background image for the banner */
    @Prop() bgimage: string;
    /** Supply an image for  */
    @Prop() image:string;
    /** Supply a video URL  */
    @Prop() video:string;
    /** If a landing page  */
    @Prop() landing:boolean = false;


    render() {
        const bgscheme: string[] = createArrayFromString(this.colourscheme, ',');
        const titlescheme: string[] = createArrayFromString(this.pagetitlecolours, ',');

        const bgcolour = {
            "background-color": bgscheme[1] || "#502669"
        };
        
        const textcolour = {
            "color": bgscheme[0] || "white"
        };

        const  pagetitlecolours = {
            "background": titlescheme[1] || "#1BA39C",
            "box-shadow": `10px 0 0 ${ titlescheme[1] || "#1BA39C"}, -11px 0 0 ${ titlescheme[1] || "#1BA39C"}`,
            "color":  titlescheme[0] || "white",
        }

        let text= this.text && this.landing? <p class="subtext" style={textcolour}>{this.text}</p>: null;
        let heading = this.heading && this.landing? <h2 class="subtitle" style={textcolour}>{this.heading}</h2> : null;
        let shape = !this.landing ? <div id="floating_shape"><lazy-image image="https://res.cloudinary.com/kclsu-media/image/upload/v1615198635/website_uploads/Graphics/geometricshapes_kftod0.png" thumbnail></lazy-image></div> : null;
        const headingClass = this.landing? 'landing-heading' : 'heading-container';
        const rowClass = this.landing? 'landing-rows' 
                        : this.image? 'media-rows'
                        : this.video ? 'media-rows'
                        : 'headingonly-rows'
        

        const pagetitle  = (
            <div class={headingClass}>
                <div style={pagetitlecolours} class="heading">
                    {this.pagetitle? <h1>{this.pagetitle}</h1> : <slot name="pagetitle"></slot>}
                </div>
            </div>
        );
                        
        
        // Set the image banner
        // If no image, create a slot area to optionally be used for a content overlap;
        let image = <div id="overlap"><slot name="overlap"></slot></div>;
        if (this.image){
            image = (
                <div id="pagebanner">
                    <lazy-image image={this.image}></lazy-image>
                    {shape}
                </div>
            )
        }

        return ([
            <div id="banner-grid" class={rowClass}>
                <div style={bgcolour} class="section"></div>
                <div class="breadcrumbs"><slot name="bc"></slot></div>
                <div class="banner-content">
                        <flex-container alignx={this.landing? "center" : "flex-start"} aligny="center" fillcontainer>
                            <div>
                                {pagetitle}
                                {heading}
                                {text}
                                <div style={textcolour} class="slotted">
                                    <slot></slot>
                                </div>
                            </div>
                        </flex-container>
                    </div>
                {image}
             </div>,
            
        ]);
    }
}