import { Component, h , Prop, Event, EventEmitter} from '@stencil/core';


@Component({
    tag: 'gallery-thumbnail',
    styleUrl: 'gallery-thumbnail.css'
})
export class GalleryThumbnail {

    @Prop() videotitle: string;
    @Prop() cardheight: string;
    @Prop() image: string = 'https://res.cloudinary.com/kclsu-media/image/upload/c_fill,f_auto,fl_any_format,h_90,q_93,w_90/v1573644938/website_uploads/KCLSU%20Brand/db75df131542437eb3da2415c7f91fc6_hhoknp.jpg';
    @Prop() active: boolean;
    @Prop() emitid: string;

    @Event()emitClick:EventEmitter;

    clickHandler(e){
        e.preventDefault();
        this.emitClick.emit(this.emitid)
    }
    
    render() {

        let style = {
            'background-image': `url(${this.image})`,
            'background-position': 'center center',
            'background-size': 'cover',
            'background-repeat': 'no-repeat'
        }

        let activeStyle= !this.active? {} : {"background-color": "teal", "color": "white"};

        return (
            <div class="card" onClick={e => this.clickHandler(e)} style={activeStyle}>
                <div class="image" style={style}></div>
                <div class="content">
                    <span class="title" style={activeStyle}>{this.videotitle}</span>
                </div>
            </div>
        );
    }
}