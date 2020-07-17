import { Component, h, Prop, State, Element} from '@stencil/core';


@Component({
    tag: 'image-slider-auto',
    styleUrl: 'image-slider-auto.css',
    
})
export class ImageSliderAuto {

    /** A string of images */
    @Prop() images: string[];
    @Prop() classes: string = 'slide-in-right';
    @Prop() interval: number;

    @State() slideIndex:any = 0;


    @Element() host: HTMLElement;


    timer : number;
    slideI = 0;

    componentDidLoad(){
        this.oldWay();
        this.timer = setInterval(() => this.oldWay(), this.interval);
    }

    oldWay(){
        let i;
        let slides;
        slides = this.host.querySelectorAll('.slide');
            for (i = 0; i < slides.length; i++) {
                if(!slides[i].classList.contains('hide'))slides[i].classList.add('hide');
                if(slides[i].classList.contains('show')){
                    slides[i].classList.remove('show')
                } 
            }
      
            this.slideI++;
            if (this.slideI > slides.length) {this.slideI = 1}
            slides[this.slideI-1].classList.remove('hide');
            slides[this.slideI-1].classList.add('show');
    }


    changeImage(images){
        let i = this.slideIndex;
        if (i >= images.length - 1){
             i = 0
        }

        else i = i + 1;

        this.slideIndex = i;
    }
    render() {
        return (
           <div class="slider-container">
               {this.images.map(img => <img class="slide" src={img} alt=""></img> )}
           </div>
        );
    }
}