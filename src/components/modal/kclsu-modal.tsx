import { Component, h, Prop, Listen, Watch } from '@stencil/core';


@Component({
    tag: 'kclsu-modal',
    styleUrl: 'kclsu-modal.css',
    shadow: true
})
export class KclsuModal {

    /** Controls when the modal is open and visible or not */
    @Prop() show:boolean = false;
    /** This will allow a user to click away and hide the modal when open */
    @Prop() autoexit:boolean = false;
    /** Set position to absolute or other. Defaults to fixed */
    @Prop() position:string = 'fixed';
    /** Supply a custom function to be invoked when modal is closed */
    @Prop() exitfn: () => void;
    /** Supply a custom function to be invoked when modal is opened */
    @Prop() enterfn: () => void;


    componentDidLoad(){
        if (this.enterfn) this.enterfn();
    }

    // @Watch('show') watchHandler(newVal){    
    //     if (this.enterfn && newVal === true) this.enterfn();
    // }

    @Listen('exitModal') exitHandler(){
        if (this.autoexit){
            this.show = false;
            if (this.exitfn)
                this.exitfn();
        } 
    }

    render() {

        let styles = {
            'transform': this.show? 'translate(-50%, -50%)' : 'translate(-200vh, -200vw)',
            'opacity': this.show? '1' : '0',
            'position': this.position || 'fixed'
        };

        return ([
            <modal-backdrop showbg={this.show}></modal-backdrop>,
            <div class="Modal" style={styles}>
                <slot></slot>
            </div>
        ]);
    }
}