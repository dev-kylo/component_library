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

    @Element() host: HTMLElement;

    @State() videos: any;
    @State() active: string;
    @State() loading: boolean = false;
    @State() carouselPosition: number = 0;

    timer;

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
                });
        }
    }

    @Listen('emitClick')
    changeActive(event: CustomEvent){
        this.loading = true;
        this.active = event.detail;
        let host  = this.host.shadowRoot;
        console.log('host')
        console.log(host);
        let thumbnailComponents = Array.from(host.querySelectorAll('gallery-thumbnail-stacked'));
        
        let selected = thumbnailComponents.find(comp => comp.emitid === '2Vv-BfVoq4g')
        // console.log('thumbnial elements')
        // console.log(thumbnailComponents);
        console.log('selected')
        console.log(selected)
        let div = selected.shadowRoot.querySelector(`.vid_2Vv-BfVoq4g`);
        console.log(div);
        
        div.scrollIntoView(false);

        //console.log(this.host.shadowRoot.querySelector("." + event.detail));
        // this.host.shadowRoot.querySelector("." + event.detail).scrollIntoView();
    } 
    
    calculateCarousel(direction: string){
        let host  = this.host.shadowRoot;
        let thumbnailComponents = Array.from(host.querySelectorAll('gallery-thumbnail-stacked'));
        
        if (direction = "L"){
            if (this.carouselPosition > 0){
                this.carouselPosition--;
                this.scrollIntoView()
            } else {
                this.carouselPosition++;
            }
        }
    }

    scrollIntoView(){
        
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
                    <div class="thumbnails">
                        {this.createThumbnails()}
                    </div>
                </div>
            </div>
        );
    }
}