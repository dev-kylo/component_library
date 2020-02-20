import { Component, h, Prop } from '@stencil/core';


@Component({
    tag: 'label-card',
    styleUrl: 'label-card.css',
    shadow: true
})
export class LabelCard {

    @Prop() cardtitle: string;
    @Prop() buttonTitle: string = 'Find out more';
    @Prop() buttonLink: string
    @Prop() text: string = '';
    @Prop() reverse: boolean;
    @Prop() image: string = 'https://res.cloudinary.com/kclsu-media/image/upload/c_fill,f_auto,fl_any_format,h_90,q_93,w_90/v1573644938/website_uploads/KCLSU%20Brand/db75df131542437eb3da2415c7f91fc6_hhoknp.jpg';
    
    render() {
        let content = !this.buttonLink? this.text : <a href={this.buttonLink}>{this.buttonTitle}</a>
        let style = {
            'background-image': `url(${this.image})`,
            'background-position': 'center center',
            'background-size': 'cover',
            'background-repeat': 'no-repeat'
        }

        let reverse =  !this.reverse? {} : {'flex-direction': 'row-reverse'};
        return (
            <div class="card" style={reverse}>
                <div class="image" style={style}></div>
                <div class="content">
                    <span class="title">{this.cardtitle}</span>
                    {content}
                </div>
            </div>
        );
    }
}