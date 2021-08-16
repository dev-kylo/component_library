import { Component, h, Prop, Listen, Element } from '@stencil/core';


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
    /** Set custom width, height and background colour */
    @Prop() custom:string;
    /** Supply a custom function to be invoked when modal is closed */
    @Prop() exitfn: () => void;
    /** Supply a custom function to be invoked when modal is opened */
    @Prop() enterfn: () => void;

    styles = {
        in:  'translate(-50%, -50%)',
        out: 'translate(-200vh, -200vw)',
    };

    @Element() host: HTMLElement;

    componentDidLoad(){
        if (this.enterfn) this.enterfn();
        this.animate(this.styles);
    }

    @Listen('exitModal') exitHandler(){
        if (this.autoexit){
            this.show = false;
            this.animate(this.styles)
            if (this.exitfn)
                this.exitfn();
        } 
    }

    animate(styles){
        const modal = this.host.shadowRoot.querySelector('.Modal') as HTMLElement;
        modal.style.position = this.position;

        if (this.show) {
            modal.style.display = "block";
            modal.style.transform =  this.custom ? 'inherit' : styles.in;
            modal.style.opacity = '1';
        } else {
            modal.style.transform = styles.out;
            modal.style.opacity = '0';
            modal.addEventListener("transitionend", () => modal.style.display = "none")
        }

    }

    render() {

        const classes = ['Modal'];
        const style = {} as any;
        if (!this.custom) classes.push('Modal-Standard');
        else {
            let customSpecs = this.custom.split(',');
            style.width = customSpecs[0];
            style.height = customSpecs[1];
            style.backgroundColor =  'white';
            style.bottom = 0;
        }

        return ([
            <modal-backdrop showbg={this.show}></modal-backdrop>,
            <dialog style={style} class={classes.join(' ')} open={this.show}>
                <slot></slot>
            </dialog>
        ]);
    }
}