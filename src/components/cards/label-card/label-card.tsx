import { Component, h, Prop } from '@stencil/core';


@Component({
    tag: 'label-card',
    styleUrl: 'label-card.css',
    shadow: true
})
export class LabelCard {

    @Prop() cardtitle: string;
    @Prop() buttontitle: string = 'Find out more';
    @Prop() buttonlink: string
    @Prop() text: string = '';
    @Prop() highlightText: boolean;
    @Prop() reverse: boolean;
    @Prop() smallheading: boolean;
    @Prop() cardheight: string;
    @Prop() image: string = 'https://res.cloudinary.com/kclsu-media/image/upload/c_fill,f_auto,fl_any_format,h_90,q_93,w_90/v1573644938/website_uploads/KCLSU%20Brand/db75df131542437eb3da2415c7f91fc6_hhoknp.jpg';
    
    render() {
        let text = this.highlightText? <p><em>{this.text}</em></p> : <p>{this.text}</p>
        let content = !this.buttonlink? text : <kclsu-button verysmall rounded link={this.buttonlink}>{this.buttontitle}</kclsu-button>

        let style = {
            'background-image': `url(${this.image})`,
            'background-position': 'center center',
            'background-size': 'cover',
            'background-repeat': 'no-repeat'
        }

        // let reverse =  !this.reverse? {} : {'flex-direction': 'row-reverse'};
        let cardStyle = {
            'flex-direction': `${!this.reverse? 'row' : 'row-reverse'}`,
            'height':  `${this.cardheight? this.cardheight : '100%'}`
        }

        let headingStyle = this.smallheading? {'font-size': '16px', 'margin': '0!important'} : {'font-size': '20px'};

        return (
            <div class="card" style={cardStyle}>
                <div class="image" style={style}></div>
                <div class="content">
                    <span class="title" style={headingStyle}>{this.cardtitle}</span>
                    {content}
                </div>
            </div>
        );
    }
}