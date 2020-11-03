import { Component, h, Prop, State, Element } from '@stencil/core';
// import { verifyCloudinaryApprovedUrl } from '../../../utils/utils';


@Component({
    tag: 'lazy-image',
    styleUrl: 'lazy-image.css',
    shadow: true
})

export class LazyImage {

    @Prop() image: string = 'https://res.cloudinary.com/kclsu-media/image/upload/v1581516201/website_uploads/KCLSU%20Brand/Bzcl1r6L_400x400_se7grm.jpg';
    /** Use standard CSS object-position values to set a focus area on the image. EG 'center left' */
    @Prop() focusarea: string = 'center';
    /** Image will scale into view */
    @Prop() animatein: boolean = false;
    /** A width for the image in pixels */
    @Prop() width:string;
    /** If setting width for mobile and desktop, use width property for mobile and this property for desktop */
    @Prop() desktopwidth: string;
    /** The alt tag of the image */
    @Prop() alt: string = '';
    /** If you want to render an img element in a responsive container without object positioning */
    @Prop() plainimg: boolean = false;
    /** If the image is being used only as thumbnail, such as in event cards, label cards and profile cards */
    @Prop() thumbnail: boolean = false;
    /** If the image is being used only as thumbnail, such as project-cards and image-text components */
    @Prop() contentimage: boolean = false;

    @Element() el: HTMLElement;

    @State() imageloading: boolean = true;
    @State() imageclasses:any = ['fit', 'show'];

    componentWillLoad(){
        if (!this.width){
            if (this.thumbnail) this.width='400';
            else if (this.contentimage) this.width='800';
            else if ( window.innerWidth > 500 && window.innerWidth < 800) this.width = '1000';
            else if ( window.innerWidth > 500 && this.desktopwidth) this.width = this.desktopwidth;
            else if (window.innerWidth <= 500 ) this.width = '800';
            else if (window.innerWidth > 1400 ) this.width = '1500';
            else this.width = 'auto';
        }
    }
    
    render() {
        let imageWidth = this.width;
        let loadingImage, loadedImage;
        const loadingTransforms = 'c_fill,f_auto,fl_any_format.flatten,g_center,q_10,w_20/e_saturation:-10';
        const loadedTransforms = `c_fill,f_auto,fl_any_format,w_${imageWidth}`;

        if (this.image && this.image.includes('kclsu.org')) {
            loadingImage = `https://res.cloudinary.com/kclsu-media/image/fetch/${loadingTransforms}/${this.image}`;
            loadedImage = `https://res.cloudinary.com/kclsu-media/image/fetch/${loadedTransforms}/${this.image}`;
        }

        else if (this.image && this.image.includes('res.cloudinary.com')){
            //not available in safari: regex = /(?<=upload\/)[\w,]*\//;
            const existingTransforms = /upload\/[\w,]*\//;
            if (existingTransforms.test(this.image)){
                loadingImage = this.image.replace(existingTransforms, `upload/${loadingTransforms}/`);
                loadedImage = this.image.replace(existingTransforms, `upload/${loadedTransforms}/`);
            }
            else {
                loadingImage = this.image.replace('upload/', `upload/${loadingTransforms}/`);
                loadedImage = this.image;
            }
        }

        // IMAGES NOT HOSTED ON KCLSU.ORG WONT BE MANIPULATED BY CLOUDINARY. ALLOW FOR OTHER 'RAW' IMAGES
        else {
            //LOAD GREY BLOCK IMAGE
            loadingImage = 'https://res.cloudinary.com/kclsu-media/image/upload/f_auto,fl_any_format,g_center,q_100/v1581516201/website_uploads/KCLSU%20Brand/Bzcl1r6L_400x400_se7grm.jpg'
            loadedImage = this.image;
        }
    

        let objectPosition = {
            'object-position': this.focusarea
         };

        const cs = {
            "loadingimage": !this.plainimg? true : false,
            "plainimg": this.plainimg
        }


        return (
            <div class={cs}>
                <scroll-observer lazy-image animation={!this.animatein? '' : 'scaleIn'}>
                    <img 
                        style={objectPosition} 
                        class={!this.plainimg? this.imageclasses.join(' ') : ''} 
                        alt={this.alt}
                        data-src={loadedImage}
                        sizes="500px"
                        src={loadingImage}
                    ></img>
                </scroll-observer>
            </div>
        );
    }
}

