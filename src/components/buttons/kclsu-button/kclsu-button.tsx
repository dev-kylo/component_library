import { Component, h, Prop, Event, EventEmitter} from '@stencil/core';


@Component({
    tag: 'kclsu-button',
    styleUrl: 'kclsu-button.css',
    shadow: true
})
export class KclsuButton {

    @Prop() text: string;
    @Prop() link: string;
    @Prop() emitid: string;
    @Prop() purple: boolean;
    @Prop() green: boolean;
    @Prop() rounded: boolean;
    @Prop() small: boolean;
    @Prop() download: boolean;
    @Prop() center: boolean;
    @Prop() icon: string;
    

    @Event()emitClick:EventEmitter;

    clickHandler(e){
        e.preventDefault();
        this.emitClick.emit(this.emitid)
    }

    
    render() {

        let classes =  [];
        !this.purple? classes.push('green') : classes.push('purple');
        this.rounded? classes.push('rounded') : null;
        this.small? classes.push('small') : classes.push('big');
        let link;

        if (this.link){
            link = <a href={this.link} download class={classes.join(' ')}>{this.text}<slot></slot></a>
    
        }

    else link = <a onClick={(e) => this.clickHandler(e)} class={classes.join(' ')}>{this.text}<slot></slot></a>;

        return (
        <flex-container alignx={this.center? 'center' : 'flex-start'} fillContainer>
            {link}
        </flex-container>)
            
        

    }
}