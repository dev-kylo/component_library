import { Component, h, Prop, State } from '@stencil/core';


@Component({
    tag: 'lazy-image',
    styleUrl: 'lazy-image.css'
})

export class LazyImage {

    @Prop() image: string = 'https://res.cloudinary.com/kclsu-media/image/upload/f_auto,fl_any_format,g_center,q_100/v1581516201/website_uploads/KCLSU%20Brand/Bzcl1r6L_400x400_se7grm.jpg';

    @State() imageloading: boolean = true;
    @State() imageclasses:any = ['fit', 'hide'];

    imageLoaded(){
        this.imageloading = false;
        this.imageclasses = ['fit', 'show', 'scale-in-center'];
      }
    
    render() {
        return (
            <div class="loadingimage">
                <loading-spinner show={this.imageloading}></loading-spinner>
                <img onLoad={() => this.imageLoaded()} class={this.imageclasses.join(' ')} src={this.image}></img>
            </div>
        );
    }
}