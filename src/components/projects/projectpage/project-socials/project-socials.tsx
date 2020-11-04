import { Component, h, Prop, Element } from '@stencil/core';
import { createArrayFromString } from '../../../../utils/utils';


@Component({
    tag: 'project-socials',
    styleUrl: 'project-socials.css',
    shadow: true
})
export class ProjectSocials {
    /** For developers only. The name of the slot for this component to be inserted */
    @Prop() slotr:string ="socials";
    /** The hashtag used in social media. Do not include the hash symbol */
    @Prop() hashtag:string;
     /** The colours for the background & text of <project-heading>, separated with a comma. eg "text colour, bg colour" */
    @Prop() colourscheme: string;
    
    @Element() host: HTMLElement;

    componentWillLoad(){
        this.host.slot = "socials";
        const parent = this.host.parentElement as any;
        this.colourscheme = parent.colourscheme? parent.colourscheme : '';
    }
    
    render() {
        const bgscheme: string[] = createArrayFromString(this.colourscheme, ',');
        const bgcolour = {
            "background-color": bgscheme[1] || "#502669",
        }
        const followMsg = this.hashtag? (<p style={{"color": bgscheme[0] || "white"}}>Keep track of the news and events! Use hashtag <em>#{this.hashtag}</em> and share your experiences.</p>) : (<p style={{"color": bgscheme[0] || "white"}}>Keep track of the news and events!</p>);
        
        return (
            <div class="grid">
                <div class="section" style={bgcolour}>
                    <project-heading colourscheme={this.colourscheme} heading="Follow what's happening">
                        {followMsg}
                        <div style={{"margin": "2em 0"}}>
                            <flex-container wrap alignx="center" aligny="center">
                                <kclsu-button link="https://www.facebook.com/kclsupage/" newtab>Facebook</kclsu-button>
                                <kclsu-button link="https://www.instagram.com/kclsu/" newtab>Instagram</kclsu-button>
                                <kclsu-button link="https://twitter.com/kclsu" newtab>Twitter</kclsu-button>
                            </flex-container>
                        </div>
                    </project-heading>
                </div>
            </div>
        );
    }
}