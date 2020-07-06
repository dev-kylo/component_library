import { Component, h, Prop, State, Element } from '@stencil/core';
// import { verifyCloudinaryApprovedUrl } from '../../../utils/utils';


@Component({
    tag: 'lazy-image',
    styleUrl: 'lazy-image.css',
    shadow: true
})

export class LazyImage {

    @Prop() image: string = 'https://res.cloudinary.com/kclsu-media/image/upload/f_auto,fl_any_format,g_center,q_100/v1581516201/website_uploads/KCLSU%20Brand/Bzcl1r6L_400x400_se7grm.jpg';
    /** Use standard CSS values to set a focus area on the image. EG 'center left' */
    @Prop() focusarea: string = 'center';
    /** Image will scale into view */
    @Prop() animatein: boolean = false;
    /** A width for the image in pixels */
    @Prop() width:string = '500';
    /** If setting width for mobile and desktop, use width property for mobile and this property for desktop */
    @Prop() desktopwidth: string;

    @Element() el: HTMLElement;

    @State() imageloading: boolean = true;
    @State() imageclasses:any = ['fit', 'show'];

    private observer: IntersectionObserver;

    componentDidRender(){
        console.log('lazy reload did load')
        const img :HTMLElement = this.el.shadowRoot.querySelector('img');
        const options = { rootMargin: '10px 0px' }
        if (img) {
            this.observer = new IntersectionObserver(entries => this.onIntersection(entries, this.animatein), options);
            this.observer.observe(img)
        }
    }

    onIntersection(entries, animation){
        for (const entry of entries){
            if (entry.isIntersecting){
                console.log('intersect detected')
                if (this.observer) this.observer.disconnect();
                if (entry.target.getAttribute('data-src')){
                    entry.target.setAttribute('src', entry.target.getAttribute('data-src'));
                    entry.target.removeAttribute('data-src');
                    if (animation) entry.target.classList.add('scaleIn');
                }
            }
        }
    }

    disconnectedCallback(){
        console.log('disconnect')
        this.observer.disconnect();
    }

    // imageLoaded(){
    //     this.imageloading = false;
    //     this.imageclasses = ['fit', 'show', 'scale-in-center'];
    //   }
    
    render() {
        console.log('Lazy Component re-renders')
        let imageWidth = this.width;
        if (this.desktopwidth) {
            if ( window.innerHeight > 500) imageWidth = this.desktopwidth;
        }

        let objectPosition = {
           'object-position': this.focusarea
        };

        let loadingImage, loadedImage;

        if (this.image && this.image.includes('kclsu.org')) {
            const imageRef = this.image;
            loadingImage = ` https://res.cloudinary.com/kclsu-media/image/fetch/c_fill,f_auto,fl_any_format.flatten,g_center,q_10,w_200/e_saturation:-10/${imageRef}`;
            loadedImage = ` https://res.cloudinary.com/kclsu-media/image/fetch/c_fill,f_auto,fl_any_format,w_${imageWidth}/${imageRef}`;
        }

        else if (this.image && this.image.includes('res.cloudinary.com')){
            loadingImage = this.image;
            loadedImage = this.image;
        }

        //THIS WAS USED WITH CLOUDINARY'S AUTO UPLOAD FEATURE. WE NOW USE THE FETCH FEATURE INSTEAD
        // if (verifyCloudinaryApprovedUrl(this.image)) {
        //     const imageRef = this.image.split('/').pop();    
        //     loadingImage = `https://res.cloudinary.com/kclsu-media/image/upload/c_fill,f_auto,fl_any_format.flatten,g_center,q_10,w_200/e_saturation:-10/temporary/${imageRef}`;
        //     loadedImage = `https://res.cloudinary.com/kclsu-media/image/upload/c_fill,f_auto,fl_any_format,w_${imageWidth}/temporary/${imageRef}`;
        // }

        // IMAGES NOT HOSTED ON KCLSU.ORG WONT BE MANIPULATED BY CLOUDINARY. ALLOW FOR OTHER 'RAW' IMAGES
        else {
            //LOAD GREY BLOCK IMAGE
            loadingImage = 'https://res.cloudinary.com/kclsu-media/image/upload/f_auto,fl_any_format,g_center,q_100/v1581516201/website_uploads/KCLSU%20Brand/Bzcl1r6L_400x400_se7grm.jpg'
            loadedImage = this.image;
        }
    


        return (
            <div class="loadingimage">
                {/* <loading-spinner show={this.imageloading}></loading-spinner> */}
                <img 
                    style={objectPosition} 
                    // onLoad={() => this.imageLoaded()} 
                    class={this.imageclasses.join(' ')} 
                    alt=""
                    data-src={loadedImage}
                    src={loadingImage}
                ></img>
            </div>
        );
    }
}