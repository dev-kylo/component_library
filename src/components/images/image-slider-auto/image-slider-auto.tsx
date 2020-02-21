import { Component, h, Prop, State, Element} from '@stencil/core';


@Component({
    tag: 'image-slider-auto',
    styleUrl: 'image-slider-auto.css',
    
})
export class ImageSliderAuto {

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
        console.log("SLIDES")
        console.log(slides)
            console.log("looping")
            for (i = 0; i < slides.length; i++) {
                if(!slides[i].classList.contains('hide'))slides[i].classList.add('hide');
                if(slides[i].classList.contains('show')){
                    slides[i].classList.remove('show')
                } 
              }
      
              this.slideI++;
              if (this.slideI > slides.length) {this.slideI = 1}
              slides[this.slideI-1].classList.remove('hide')
              slides[this.slideI-1].classList.add('show')
    }


    changeImage(images){
        let i = this.slideIndex;
        if (i >= images.length - 1){
             i = 0
        }

        else i = i + 1;

        this.slideIndex = i;
        // this.changeImages(i)
    }

    // changeImages(i){
    //     let images =  [...this.currentImages];
    //     images[0].classes = 'slide-out-left';
    //     images[0].src = this.images[this.slideIndex];

    //     images[1].classes = 'slide-in-right';
    //     images[1].src = this.images[i];

    //     this.slideIndex = i;
    //     this.currentImages = images;
    // }

    // @Watch('slideIndex') trigger(){
    // console.log(this.host.children)
    // }

    // renderImage(){
    //     let image = this.images.filter((_, i) => i === this.slideIndex);
    //     console.log("FOUND");
    //     console.log(image)
    //     return <img class="slide slide-in-right" src={image[0]} ></img>
    // }
    render() {

        // if(this.slideIndex > 0) this.test();
        return (
           <div class="slider-container">
               {this.images.map(img => <img class="slide" src={img} alt=""></img> )}
               {/* {this.renderImage()} */}
                {/* <img class={this.classes} src={this.images[this.slideIndex]} alt=""></img> */}
                {/* {this.images.find((i, _) => i === this.slideIndex).map(img => <img class="slide" src={img} ></img> )} */}
                {/* {!this.currentImages[0].src? '' : this.currentImages.map(img => <img class={img.classes} src={img.src} alt=""></img> )} */}
           </div>
        );
    }
}