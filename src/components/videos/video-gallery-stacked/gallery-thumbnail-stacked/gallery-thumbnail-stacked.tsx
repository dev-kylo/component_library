import { Component, h , Prop, Event, EventEmitter} from '@stencil/core';


@Component({
    tag: 'gallery-thumbnail-stacked',
    styleUrl: 'gallery-thumbnail-stacked.css',
    shadow: true
})
export class GalleryThumbnailStacked {

    @Prop() videotitle: string;
    @Prop() cardheight: string;
    @Prop() image: string;
    @Prop() active: boolean;
    @Prop() emitid: string;

    @Event()emitClick:EventEmitter;

    clickHandler(e){
        e.preventDefault();
        this.emitClick.emit(this.emitid)
    }
    
    render() {


        let activeStyle= !this.active? {} : {"background-color": "teal", "color": "white"};

        return (
            <div class={`card vid_${this.emitid}`} onClick={e => this.clickHandler(e)} style={activeStyle}>
                <div class="image">
                    <lazy-image mobile="10" desktop="10" image={this.image} alt=""></lazy-image>
                </div>
                <div class="content">
                    <span class="title" style={activeStyle}>{this.videotitle}</span>
                </div>
            </div>
        );
    }
}