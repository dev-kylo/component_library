import { Component, h, Prop } from '@stencil/core';


@Component({
    tag: 'label-card',
    styleUrl: 'label-card.css',
    shadow: true
})
export class LabelCard {

    /** The main title of the card */
    @Prop() cardtitle: string;
    /** If a button included, the text for the button */
    @Prop() buttontitle: string = 'Find out more';
    /** If a button included, the link for the button */
    @Prop() buttonlink: string;
    /** The link for the card - NOT for the button */
    @Prop() link: string;
    /** The sub text beneath the title */
    @Prop() text: string;
    /** The main title of the card */
    @Prop() highlightText: boolean;
    /** If image to be displayed on right hand side */
    @Prop() reverse: boolean;
    @Prop() smallheading: boolean;
    @Prop() cardheight: string;
    @Prop() smallestheight: boolean;
    @Prop() image: string = 'https://res.cloudinary.com/kclsu-media/image/upload/v1573644938/website_uploads/KCLSU%20Brand/db75df131542437eb3da2415c7f91fc6_hhoknp.jpg';
    
    render() {

        let text = null;
        if (this.text) text = <p>{this.text}</p>;
        if (this.highlightText && this.text) text = <p><em>{this.text}</em></p>

        let content = !this.buttonlink? text : <kclsu-button verysmall rounded link={this.buttonlink}>{this.buttontitle}</kclsu-button>

        // let reverse =  !this.reverse? {} : {'flex-direction': 'row-reverse'};
        let cardStyle = {
            'flex-direction': `${!this.reverse? 'row' : 'row-reverse'}`,
            'height':  `${this.cardheight? this.cardheight : this.smallestheight? '60px' : !this.text? '80px' : '120px'}`
        }

        let headingStyle = this.smallheading? {'font-size': '18px', 'margin': '0!important'} : {'font-size': '20px'};

        
        if (this.link){
            return (
                <a href={this.link} target="_blank" class="link">
                    <div class="card" style={cardStyle}>
                        <div class="image">
                            <lazy-image animatein image={this.image}></lazy-image>
                        </div>
                        <div class="content">
                            <span class="title" style={headingStyle}>{this.cardtitle}</span>
                            {content}
                        </div>
                    </div>
                </a>
            );
        }

        else return (
            <div class="card" style={cardStyle}>
                <div class="image">
                    <lazy-image animatein image={this.image}></lazy-image>
                </div>
                <div class="content">
                    <span class="title" style={headingStyle}>{this.cardtitle}</span>
                    {content}
                </div>
            </div>
        );
    }
}