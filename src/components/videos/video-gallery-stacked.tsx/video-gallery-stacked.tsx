import { Component, h, Prop, State, Listen } from '@stencil/core';


@Component({
    tag: 'video-gallery-stacked',
    styleUrl: 'video-gallery-stacked.css',
    shadow: true
})
export class VideoGalleryStacked {

    /** The Youtube URL for any given playlist */
    @Prop() playlist!: any;

    @State() videos: any;
    @State() active: string;
    @State() loading: boolean = false;

    timer;

    componentDidLoad(){
        if(!this.active){
            const urlParams = new URLSearchParams(this.playlist);
            let playlistId = urlParams.get('list');
            fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&key=AIzaSyAn8yWZA_9rYBtPZ8i1up_uF6Vo3Mulzsc&maxResults=15`)
                .then(res => res.json())
                .then(data => {
                    this.videos = data.items;
                    this.active = data.items[0].snippet.resourceId.videoId;
                });
        }
    }

    @Listen('emitClick')
        changeActive(event: CustomEvent){
            this.loading = true;
            this.active = event.detail;
            this.timer = setTimeout(() => {
                this.loading = false;
                clearTimeout(this.timer)
            }, 800)
        }

    createThumbnails(){
        if (this.videos){
           return this.videos.map(video => {
               let active=false
                if (video.snippet.resourceId.videoId === this.active) active=true
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
        let opacity = this.loading? {'opacity': '0'} : {'opacity': '1'};

        return (
            <div class="gallery-container">
                <div class="gallery-flex">
                    <div class="video-container">
                        <div class="video-inner-container" style={opacity}>
                            {this.videos? <video-embed embedid={this.active}></video-embed> : ''}
                        </div>
                        <loading-spinner show={this.loading}></loading-spinner>
                    </div>
                    <div class="thumbnails">
                        {this.createThumbnails()}
                    </div>
                </div>
            </div>
        );
    }
}