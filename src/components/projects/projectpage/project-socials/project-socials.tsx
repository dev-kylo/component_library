import { Component, h, Prop, Element } from '@stencil/core';
import { createArrayFromString } from '../../../../utils/utils';


@Component({
    tag: 'project-socials',
    styleUrl: 'project-socials.css',
    shadow: true
})
export class ProjectSocials {
    @Prop() slotr:string ="socials";
    /** The hashtag used in social media. Do not include the hash symbol */
    @Prop() hashtag:string;
    @Prop() colourscheme: string;
    @Prop() pagetitlecolours: string
    @Element() host: HTMLElement;

    componentWillLoad(){
        this.host.slot = "socials";
        const parent = this.host.parentElement as any;
        this.colourscheme = parent.colourscheme? parent.colourscheme : '';
        this.pagetitlecolours = parent.pagetitlecolours? parent.pagetitlecolours : '';
    }
    
    render() {
        const bgscheme: string[] = createArrayFromString(this.colourscheme, ',');
        const bgcolour = {
            "background-color": bgscheme[1] || "white",
        }
        const followMsg = this.hashtag? (<p style={{"color": bgscheme[0] || "#502669"}}>Keep track of the news and events! Use hashtag <em>#{this.hashtag}</em> and share your experiences.</p>) : (<p style={{"color": bgscheme[0] || "#502669"}}>Keep track of the news and events!</p>);
        
        return (
            <div class="grid">
                <div class="section" style={bgcolour}>
                    <project-heading colourscheme={this.colourscheme} pagetitlecolours={this.pagetitlecolours}  heading="Follow what's happening">
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