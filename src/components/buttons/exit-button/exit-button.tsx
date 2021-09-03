import { Component, h, Prop, Method, Element } from '@stencil/core';


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

    @Element() host: HTMLElement;

    clickHandler(e){
        e.preventDefault();
        this.callback();
    }

    @Method()
    async addFocus(){
        console.log('finding focus on btton')
        let button = this.host.shadowRoot.querySelector('.exitIcon')! as HTMLButtonElement;
        console.log(button)
        Promise.resolve(button.focus());
    }
    
    render() {

        return (
            <button class="exitIcon" onClick={this.callback}>
                <div class={`${this.purple? 'purple' : 'white'}`}></div>
            </button>
        );
    }
}