import { Component, h, Prop } from '@stencil/core';


@Component({
    tag: 'exit-button',
    styleUrl: 'exit-button.css',
    shadow: true
})
export class ExitButton {
    /** The callback function for the button */
    @Prop() callback: () => void;
    /** Change the colour of the exit button to purple */
    @Prop() purple:boolean = false;

    clickHandler(e){
        e.preventDefault();
        this.callback();
    }
    
    render() {

        return (
            <button onClick={this.callback}>
                <div class={`${this.purple? 'purple' : 'white'}`}></div>
            </button>
        );
    }
}