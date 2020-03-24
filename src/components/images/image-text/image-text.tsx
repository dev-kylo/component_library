import { Component, h, Prop } from '@stencil/core';


@Component({
    tag: 'image-text',
    styleUrl: 'image-text.css',
    shadow: true
})
export class ImageText {

    @Prop() heading: string;
    @Prop() text: string;
    @Prop() image: string;
    @Prop() switch: boolean;
    
    render() {
        let info = this.text? <p>{this.text}</p> : '';
        let style = !this.switch? {} : {"flex-direction": "row-reverse"}
        return (
            <page-content>
                <div class="image-text" style={style}>
                    <div class="info">
                        <h4>{this.heading}</h4>
                        {info}
                        <slot></slot>
                    </div>
                    <div class="image">
                        <img src={this.image}></img>
                    </div>
                </div>
            </page-content>
        );
    }
}