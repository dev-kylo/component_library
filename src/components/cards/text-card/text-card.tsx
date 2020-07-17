import { Component, h, Prop } from '@stencil/core';


@Component({
    tag: 'text-card',
    styleUrl: 'text-card.css',
    shadow: true
})
export class TextCard {

    /** The Url link you want to link to */
    @Prop() link: string;
     /** The purple heading in the card */
    @Prop() cardtitle!: string;
    /** Any extra text. If you want it to be empty, add empty string value:  "" */
    @Prop() subtext: string;
    
    render() {

        return (
            <a href={this.link}>
                <div class="card">
                    <div class="content">
                        <span class="title">{this.cardtitle}</span>
                        {this.subtext? <p>{this.subtext}</p> : ''}
                    </div>
                </div>
            </a>
        );
    }
};  