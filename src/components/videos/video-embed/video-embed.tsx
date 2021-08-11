import { Component, h, Prop, State } from '@stencil/core';


@Component({
    tag: 'video-embed',
    styleUrl: 'video-embed.css',
    shadow: true
})
export class VideoEmbed {

    /** The URL of the Youtube video you want to display - CURRENTLY NOT WORKING */
    @Prop() url: string;
     /** The id of the Youtube Video - found in the URL eg youtube.com/watch?v={VIDEO_ID} */
    @Prop() embedid: any;

    @State()videoId: string;

    componentDidLoad(){
        if (!this.embedid && this.url){
            const urlParams = new URLSearchParams(this.url);
            let vid = urlParams.get('v');
            this.videoId = vid;  
        }
    }
    
    render() {
        let video;
        if (this.url) video = !this.videoId ? '' : <iframe frameborder=" 0" src={`https://www.youtube.com/embed/${this.videoId}`}></iframe>
        return (
            <div class="dc-video-container">
                {this.embedid ?  <iframe id="the-iframe" frameborder=" 0" src={`https://www.youtube.com/embed/${this.embedid}`}></iframe> : video}
            </div>
        );
    }
}