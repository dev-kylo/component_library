import { Component, h, Prop, Listen, Element, Watch } from '@stencil/core';
import { createArrayFromString } from '../../utils/utils';

@Component({
    tag: 'kclsu-modal',
    styleUrl: 'kclsu-modal.css',
    shadow: true
})
export class KclsuModal {

    /** Controls when the modal is open and visible or not */
    @Prop({ mutable: true }) show: boolean = false;
    /** This will allow a user to click away and hide the modal when open */
    @Prop() autoexit: boolean = false;
    /** Set position to absolute or other. Defaults to fixed */
    @Prop() position: string = 'fixed';
    /** Set custom width, height and background colour */
    @Prop() custom: string;
    /** Provide a comma separated list of container web components inside the modal - for trapping focus */
    @Prop() innercmps: string;
    /** Provide a comma separated list of element selectors which contain slotted content */
    @Prop() slotparents: string;
    /** Supply a callback function to be invoked when modal is closed */
    @Prop() exitfn: () => void;
    /** Supply a callback function to be invoked when modal is opened */
    @Prop() enterfn: () => void;
    @Element() host: HTMLElement;

    focusables: any[] = [];
    currentFocusIndex = 0;

    styles = {
        in: 'translate(-50%, -50%)',
        out: 'translate(-200vh, -200vw)',
    };

    componentDidLoad() {
        if (this.enterfn) this.enterfn();
        this.animate(this.styles);
        this.findFocusableElements();

        document.addEventListener('keydown', (e) => {

            if (this.show && e.key === 'Tab') {
                e.preventDefault();
                // if(this.focusables.length <=1) this.findFocusableElements();
                let focusables = this.focusables;

                let indexToFocus = this.currentFocusIndex;
                indexToFocus = indexToFocus === focusables.length - 1 ? 0 : indexToFocus + 1;

                this.findFocus(focusables[indexToFocus]);
                this.currentFocusIndex = indexToFocus;
            }


        });
    }

    componentDidUpdate() {
        if (this.focusables.length <= 1) this.findFocusableElements();
    }


    findFocus(el) {
        if (el) {
            if (el.tagName === 'KCLSU-BUTTON') {
                const btn = el as HTMLKclsuButtonElement;
                btn.addFocus();
            }
            else if (el.tagName === 'PROFILE-CARD') {
                const card = el as HTMLProfileCardElement;
                card.addFocus();
            } else if (el.tagName === 'EXIT-BUTTON') {
                const btn = el as HTMLExitButtonElement;
                btn.addFocus();
            } else el.focus();

        }
    }

    @Listen('exitModal') exitHandler() {
        this.currentFocusIndex = 0;
        if (this.autoexit) {
            this.show = false;
            this.animate(this.styles)
            if (this.exitfn)
                this.exitfn();
        }
    }

    findFocusableElements() {
        let ar = Array.from(this.host.querySelectorAll(
            'a, kclsu-button, exit-button, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
        )) as any;
        let slotFocusables = [];
        let innerCmpFocusables = [];
        if (this.slotparents) {
            let cmps = createArrayFromString(this.slotparents, ',');
            cmps.forEach(selector => {
                let el: HTMLElement = document.querySelector(selector);
                if (el) {
                    slotFocusables = Array.from(el.querySelectorAll(
                        'a, kclsu-button, exit-button, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
                    )) as any;
                }
            })
        }
        if (this.innercmps) {
            let cmps = createArrayFromString(this.innercmps, ',');
            cmps.forEach(selector => {
                let el: HTMLElement = this.host.querySelector(selector);
                if (el) {
                    innerCmpFocusables = Array.from(el.querySelectorAll(
                        'a, kclsu-button, exit-button, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
                    )) as any;
                }
            })
        }

        if (this.autoexit) ar.unshift(this.host.shadowRoot.querySelector('exit-button'));
        ar = ar.concat(innerCmpFocusables).concat(slotFocusables);
        this.focusables = ar;
        return ar;
    }



    @Watch('show') showHandler(newVal, __) {
        if (!newVal) {
            if (this.exitfn) this.exitfn();
        } else {
            this.currentFocusIndex = 0;

            this.findFocusableElements();

            if ((this.enterfn)) this.enterfn()
        }
        this.animate(this.styles);
    }

    animate(styles) {
        const modal = this.host.shadowRoot.querySelector('.Modal') as HTMLElement;
        modal.style.position = this.position;

        if (this.show) {
            modal.style.display = "block";
            modal.style.transform = this.custom ? 'inherit' : styles.in;
            modal.style.opacity = '1';
        } else {
            modal.style.transform = styles.out;
            modal.style.opacity = '0';
            modal.addEventListener("transitionend", () => {
                if (modal.style.transform === styles.out) modal.style.display = "none"
            })
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
            style.backgroundColor = 'white';
            style.bottom = 0;
        }

        return ([
            <modal-backdrop position={this.position} showbg={this.show}></modal-backdrop>,
            <dialog style={style} class={classes.join(' ')} open={this.show}>
                <div class="Exit">
                    {this.autoexit && <exit-button purple callback={() => this.exitHandler()}></exit-button>}
                </div>
                <slot></slot>
            </dialog>
        ]);
    }
}