import { Component, h, Prop, State, Element } from '@stencil/core';
// import { verifyCloudinaryApprovedUrl } from '../../../utils/utils';


@Component({
    tag: 'lazy-image',
    styleUrl: 'lazy-image.css',
    shadow: true
})

export class LazyImage {

    @Prop() image: string;
    /** Use standard CSS object-position values to set a focus area on the image. EG 'center left' */
    @Prop() focusarea: string = 'center';
    /** Image will scale into view */
    @Prop() animatein: boolean = false;
    /** A width for the image in pixels */
    @Prop() width:string;
    /** The alt tag of the image */
    @Prop() alt: string = '';
    /** If you want to render an img element in a responsive container without object positioning */
    @Prop() plainimg: boolean = false;
    /** Remove lazy-loading functionality. Retains Object Fit positioing */
    @Prop() nolazy: boolean = false;
    /** If set to false, it will keep any existing cloudinary transforms */
    @Prop() keeptransforms: boolean = false;
    /** Provide a custom cloudinary transformation. Must be in format: string,string,string eg: c_fill,f_auto,fl_any_format  */
    @Prop() customtransform: string;

    urlOrigin: 'kclsu' | 'cloudinary' | 'firebase' | 'unknown';
    breakPoints:number[] = [1920, 1600, 1366, 1024, 768, 640];


    @Element() el: HTMLElement;

    @State() imageloading: boolean = true;
    @State() imageclasses:any = ['fit', 'show'];

    componentWillLoad(){
        if (this.image.includes('kclsu.org') && !(this.image.includes('res.cloudinary'))) {
            this.urlOrigin = 'kclsu';
        } else if (this.image.includes('res.cloudinary.com')){
            this.urlOrigin = 'cloudinary';
        } else if (this.image.includes('firebase')){
            this.urlOrigin = 'firebase';
        }  else this.urlOrigin = 'unknown';
    }

    createUrl(url, transforms): string{
        switch (this.urlOrigin){
            case 'kclsu' : 
                return `https://res.cloudinary.com/kclsu-media/image/fetch/${transforms}/${url}`
            case 'cloudinary':
                const existingTransforms = /upload\/[\w,]*\//;
                if (existingTransforms.test(url)){
                    //IF THERE ARE CLOUDINARY TRANSFORMS PRESENT ALREADY AND WE WANT REMOVED
                    return url.replace(existingTransforms, `upload/${transforms}/`);
                } else return url
            default:  return 'https://res.cloudinary.com/kclsu-media/image/upload/v1581516201/website_uploads/KCLSU%20Brand/Bzcl1r6L_400x400_se7grm.jpg';
        }
    }

    createTransformation(width:number): string {
        return `c_lfill,f_auto,fl_any_format,w_${width}`;
    }

    createSrcSet(){
        return this.breakPoints.map(width => `${this.createUrl(this.image, this.createTransformation(width))} ${width}w,`).join(' ');
    }

    
    render() {

        let objectPosition = {
            'object-position': this.focusarea
         };

        const classes = {
            "loadingimage": !this.plainimg? true : false,
            "plainimg": this.plainimg
        }

        return (
            <div class={classes}>
                <img
                    style={objectPosition}
                    src={this.image}
                    srcset={this.createSrcSet()}
                    alt={this.alt}
                />
            </div>
        )

    //    return (
    //         <div class={cs}>
    //             <scroll-observer lazy-image animation={!this.animatein? '' : 'scaleIn'}>
    //                 <img 
    //                     style={objectPosition} 
    //                     class={!this.plainimg? this.imageclasses.join(' ') : ''} 
    //                     alt={this.alt}
    //                     data-src={loadedImage}
    //                     src={ !this.nolazy ? loadingImage : loadedImage }
    //                 ></img>
    //             </scroll-observer>
    //         </div>
    //     );


    }
}
