import { Component, h, Prop, Event, EventEmitter} from '@stencil/core';


@Component({
    tag: 'kclsu-button',
    styleUrl: 'kclsu-button.css',
    shadow: true
})
export class KclsuButton {

    @Prop() link: string;
    @Prop() clicked: Function;
    @Prop() emitid: string;
    @Prop() green: boolean;
    @Prop() rounded: boolean;
    @Prop() small: boolean;
    @Prop() download: boolean;

    @Event()emitClick:EventEmitter;

    clickHandler(e){
        e.preventDefault();
        this.emitClick.emit(this.emitid)
    }

    
    render() {

        let classes =  [];
        this.green? classes.push('green') : classes.push('purple');
        this.rounded? classes.push('rounded') : null;
        this.small? classes.push('small') : classes.push('big')

        if (this.link){
            return (
                <a href={this.link } download class={classes.join(' ')}><slot></slot></a>
            );
        }

        else return <a onClick={(e) => this.clickHandler(e)} class={classes.join(' ')}><slot></slot></a>

    }
}