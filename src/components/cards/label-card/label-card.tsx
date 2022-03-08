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
    /** This will reduce the size of the heading in the card */
    @Prop() smallheading: boolean;
    /** Specify a fixed cardheight */
    @Prop() cardheight: string;
    /** Specify a fixed card with*/
    @Prop() cardwidth: string;
    /** Give the card a custom margin */
    @Prop() margin: string;
    /** Make the card the smallest height possible */
    @Prop() smallestheight: boolean;
    /** The image URL for the card. Defaults to the kclsu logo */
    @Prop() image: string = 'https://res.cloudinary.com/kclsu-media/image/upload/v1573644938/website_uploads/KCLSU%20Brand/db75df131542437eb3da2415c7f91fc6_hhoknp.jpg';
    /** Add a custom shadow colour to the card */
    @Prop() boxshadow: string;
    /** the teal border on the left side of the card */
    @Prop() withleftborder: boolean = true;

    render() {

        let text = null;
        if (this.text) text = <p>{this.text}</p>;
        if (this.highlightText && this.text) text = <p><em>{this.text}</em></p>

        let content = !this.buttonlink ? text : <kclsu-button verysmall rounded link={this.buttonlink}>{this.buttontitle}</kclsu-button>

        // let reverse =  !this.reverse? {} : {'flex-direction': 'row-reverse'};
        let cardStyle = {
            'flex-direction': `${!this.reverse ? 'row' : 'row-reverse'}`,
            'height': `${this.cardheight ? this.cardheight : this.smallestheight ? '60px' : !this.text ? '80px' : '120px'}`,
            'width': `${this.cardwidth ? this.cardwidth : 'auto'}`,
            'margin': `${this.margin ? this.margin : '0'}`,
            'box-shadow': `${this.boxshadow || '0.5px 3px 5px 0px rgba(0, 0, 0, 0.15)'}`
        }

        let headingStyle = this.smallheading ? { 'font-size': '18px', 'margin': '0!important' } : { 'font-size': '20px' };


        if (this.link) {
            return (
                <a href={this.link} target="_blank" rel="noopener noreferrer" class="link">
                    <div class={`card ${this.withleftborder ? 'cardborder' : ''}`} style={cardStyle}>
                        <div class="image">
                            <lazy-image
                                animatein
                                image={this.image}
                                mobile="25"
                                desktop="10"
                            ></lazy-image>
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
                    <lazy-image
                        animatein
                        image={this.image}
                        mobile="25"
                        desktop="10"
                    ></lazy-image>
                </div>
                <div class="content">
                    <span class="title" style={headingStyle}>{this.cardtitle}</span>
                    {content}
                </div>
            </div>
        );
    }
}





