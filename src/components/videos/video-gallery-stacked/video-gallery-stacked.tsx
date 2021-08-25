import { Component, h, Prop, State, Listen, Element } from '@stencil/core';
import { shuffleArray } from '../../../utils/utils';

@Component({
    tag: 'video-gallery-stacked',
    styleUrl: 'video-gallery-stacked.css',
    shadow: true
})
export class VideoGalleryStacked {

    /** The Youtube URL for any given playlist */
    @Prop() playlist!: any;
    /** This will randomise the order of the thumbnails */
    @Prop() shuffle: boolean = false;
    /** This will display the current selected video. Desktop and tablet only */
    @Prop() showcurrent: boolean = false;

    @Element() host: HTMLElement;

    @State() videos: any;
    @State() active: string;
    @State() loading: boolean = false;
    @State() carouselPosition: number = 2;

    timer;
    thumbnailComponents;

    componentDidLoad(){
        if(!this.active){
            const urlParams = new URLSearchParams(this.playlist);
            let playlistId = urlParams.get('list');
            fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&key=AIzaSyAn8yWZA_9rYBtPZ8i1up_uF6Vo3Mulzsc&maxResults=15`)
                .then(res => res.json())
                .then(data => {
                    this.videos = data.items;
                    if (this.shuffle)shuffleArray(this.videos);
                    this.active = this.videos[0].snippet.resourceId.videoId;
                    console.log(this.videos[0])
                });
        }
    }

    componentDidUpdate(){
        let host  = this.host.shadowRoot;
        this.thumbnailComponents = Array.from(host.querySelectorAll('gallery-thumbnail-stacked'));
    }

    @Listen('emitClick')
    changeActive(event: CustomEvent){
        this.loading = true;
        this.active = event.detail;
        this.carouselPosition = this.getVideoIndex(event.detail)

        //console.log(this.host.shadowRoot.querySelector("." + event.detail));
        // this.host.shadowRoot.querySelector("." + event.detail).scrollIntoView();
    } 
    
    shiftCarousel(direction: string){
        let newPosition = direction === 'L' ? +this.carouselPosition -  1 : +this.carouselPosition + 1;
        let shiftToId = this.videos[newPosition].snippet.resourceId.videoId;
        let selected = this.thumbnailComponents.find(comp => comp.emitid === shiftToId)
        console.log('Next Thumbnail to Scroll to:')
        
        
        let div = selected.shadowRoot.querySelector(`.vid_${shiftToId}`);
        console.log(div)
        div.scrollIntoView({ behavior: 'smooth', block: "end", inline: "nearest" });
        
        this.carouselPosition =  newPosition;
    }

    getVideoIndex(id){
        return this.videos.findIndex(vid => vid.snippet.resourceId.videoId === id)
    }

    createThumbnails(){
        if (this.videos){
           return this.videos.map(video => {
               let active=false
                if (video.snippet.resourceId.videoId === this.active) active=true
                // console.log(video.snippet.thumbnails.medium.url)
                return (
                    <gallery-thumbnail-stacked
                        videotitle={video.snippet.title}
                        image={video.snippet.thumbnails.medium.url}
                        active={active}
                        emitid={video.snippet.resourceId.videoId}
                    ></gallery-thumbnail-stacked>)
            })
        }
    }
    
    render() {
        
        return (
            <div class="gallery-container">
                <div class="gallery-flex">
                    <div class="video-container">
                        <div class="video-inner-container">
                            {this.videos? <video-embed embedid={this.active}></video-embed> : ''}
                        </div>
                    </div>
                    <div id="thumbnails-container">
                        <div class="thumbnails">
                            {this.createThumbnails()}
                        </div>
                        <div id="controls">
                            <div role="button" onClick={() => this.shiftCarousel('L')}></div>
                            <div role="button" onClick={() => this.shiftCarousel('R')}></div>
                        </div>
                    </div>
                    <flex-container alignx="space-between">
                        <mobile-hide>
                           {this.active && this.showcurrent ? <aside>-- {this.videos[this.getVideoIndex(this.active)].snippet.title}</aside> : ''} 
                        </mobile-hide>
                        
                        {this.videos ? <aside>{this.getVideoIndex(this.active) + 1} / {this.videos.length}</aside> : ''}
                    </flex-container>
                    {/* <button onClick={() => this.shiftCarousel('R')}>Shift</button> */}
                </div>
            </div>
        );
    }
}