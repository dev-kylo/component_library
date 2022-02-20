import { Component, h, Prop, Event, EventEmitter, Method, Element } from '@stencil/core';

type btnClass = 'green' | 'rounded' | 'purple' | 'verysmall' | 'big' | 'small';
type btnStyle = { margin: string }

@Component({
    tag: 'kclsu-button',
    styleUrl: 'kclsu-button.css',
    shadow: true
})

export class KclsuButton {

    /** The text for the button */
    @Prop() text: string;
    /** The URL to link to */
    @Prop() link: string;
    /** Event Listener name */
    @Prop() emitid: string;
    /** Make the button a secondary purple button */
    @Prop() purple: boolean;
    /** Give the button rounded corners */
    @Prop() rounded: boolean;
    /** Make the button small */
    @Prop() small: boolean;
    /** Makes the button very small */
    @Prop() verysmall: boolean;
    /** Makes the link download */
    @Prop() download: boolean;
    /** Centres the button in the page */
    @Prop() center: boolean;
    /** Adds icon to the button */
    @Prop() icon: string;
    /** Opens the link in a new tab */
    @Prop() newtab: boolean;
    /** Give the button a fixed width */
    @Prop() fixedwidth: string;
    /** specify a margin, otherwise uses default */
    @Prop() margin: string = '15px';
    /** Provide a custom click function handler. Use emitid rather if a parent component is listening for event.*/
    @Prop() clickfn: () => void;

    @Element() host: HTMLElement;


    @Event() emitClick: EventEmitter;

    clickHandler(e: Event) {
        e.preventDefault();
        this.clickfn();
    }

    emitHandler(e: Event) {
        e.preventDefault();
        this.emitClick.emit(this.emitid);
    }

    @Method()
    async addFocus() {
        let button = this.link ? this.host.shadowRoot.querySelector('a')
            : this.host.shadowRoot.querySelector('button');
        Promise.resolve(button.focus());
    }


    render() {

        //SET BTN MARGIN
        const style: btnStyle = {
            'margin': this.margin
        };

        //SET BUTTON CLASSES
        let classes: btnClass[] = [];
        !this.purple ? classes.push('green') : classes.push('purple');
        this.rounded ? classes.push('rounded') : null;
        if (this.small) classes.push('small');
        else if (this.verysmall) classes.push('verysmall');
        else classes.push('big');

        //BTN CLICK WILL EITHER NAVIGATE AWAY OR EMIT EVENT
        let btn: null | HTMLLinkElement | HTMLButtonElement;

        if (this.link)
            btn = <a role="button" href={this.link} target={this.newtab ? "_blank" : "_self"} rel={this.newtab ? "noopener noreferrer" : ""} class={classes.join(' ')} style={style}>{this.text}<slot></slot></a>


        else if (this.emitid)
            btn = <button onClick={(e) => this.emitHandler(e)} class={classes.join(' ')} style={style}>{this.text}<slot></slot></button>;

        else if (this.clickfn)
            btn = <button onClick={(e) => this.clickHandler(e)} class={classes.join(' ')} style={style}>{this.text}<slot></slot></button>;

        else btn = <button class={classes.join(' ')} style={style}>{this.text}<slot></slot></button>;

        return (
            <flex-container alignx={this.center ? 'center' : 'flex-start'} >
                {btn}
            </flex-container>
        )
    }
}
