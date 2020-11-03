import { Component, h, Prop } from '@stencil/core';
import { createArrayFromString } from '../../../../utils/utils'


@Component({
    tag: 'project-heading',
    styleUrl: 'project-heading.css',
    shadow: true
})


export class ProjectHeading {

    @Prop() pagetitle: string;
    @Prop() heading: string;
    @Prop() text: string;
    @Prop() colourscheme: string = "white, #502669";
    @Prop() pagetitlecolours: string = "white, #1BA39C";
    
    render() {
        const bgscheme: string[] = createArrayFromString(this.colourscheme, ',');
        const titlescheme: string[] = createArrayFromString(this.pagetitlecolours, ',');

        const bgcolour = {
            "background-color": bgscheme[1] || "#502669",
        }
        const textcolour = {
            "color": bgscheme[0] || "white",
        }

        const  pagetitlecolours = {
            "background": titlescheme[1] || "#1BA39C",
            "box-shadow": `10px 0 0 ${ titlescheme[1] || "#1BA39C"}, -10px 0 0 ${ titlescheme[1] || "#1BA39C"}`,
            "color":  titlescheme[0] || "white",
        }

        const pagetitle  = (
            <div style={pagetitlecolours} class="heading">
                <h1>{this.pagetitle}</h1>
            </div>
        ); 

        return (
                <flex-container alignx="center" aligny="center" fillcontainer>
                    <section style={bgcolour}>
                        {this.pagetitle && pagetitle}
                        <h2 style={textcolour}>{this.heading}</h2>
                        <p style={textcolour}>{this.text}</p>
                        <div style={textcolour} class="slotted">
                            <slot></slot>
                        </div>
                    </section>
                </flex-container>
            );
    }
}