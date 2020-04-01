import { Component, h, Prop } from '@stencil/core';


@Component({
    tag: 'video-embed',
    styleUrl: 'video-embed.css',
    shadow: true
})
export class VideoEmbed {

    @Prop() embedid!: string;
    
    render() {
        return (
            <div class="dc-video-container">
                <iframe frameborder=" 0" src={`https://www.youtube.com/embed/${this.embedid}`}></iframe>
            </div>
        );
    }
}