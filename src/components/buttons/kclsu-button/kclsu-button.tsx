import { Component, h, Prop} from '@stencil/core';


@Component({
    tag: 'kclsu-button',
    styleUrl: 'kclsu-button.css',
    shadow: true
})
export class KclsuButton {

    @Prop() link: string = '/';
    @Prop() green: boolean;
    @Prop() rounded: boolean;
    @Prop() small: boolean;
    @Prop() download: boolean;
    @Prop() clickHandler: Function;
    
    render() {

        let classes =  [];
        this.green? classes.push('green') : classes.push('purple');
        this.rounded? classes.push('rounded') : null;
        this.small? classes.push('small') : classes.push('big')

        if (this.download){
            return (
                <a href={!this.link? '' : this.link } download onClick={(e) => this.clickHandler(e)} class={classes.join(' ')}><slot></slot></a>
            );
        }

        else return <a href={!this.link? '' : this.link } onClick={(e) => this.clickHandler(e)} class={classes.join(' ')}><slot></slot></a>

    }
}