import { Component, h, Prop, Listen, Element, Watch} from '@stencil/core';


@Component({
    tag: 'kclsu-modal',
    styleUrl: 'kclsu-modal.css',
    shadow: true
})
export class KclsuModal {

    /** Controls when the modal is open and visible or not */
    @Prop({ mutable: true }) show:boolean = false;
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
    @Element() host: HTMLElement;

    focusables:any[] = [];
    currentFocusIndex = 0;

    styles = {
        in:  'translate(-50%, -50%)',
        out: 'translate(-200vh, -200vw)',
    };

    componentDidLoad(){
        if (this.enterfn) this.enterfn();
        this.animate(this.styles);

        this.focusables = this.host.shadowRoot.querySelectorAll(
            'a, kclsu-button, exit-button, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
        )as any;

        document.addEventListener('keydown', (e) => {


            if (this.show && e.key === 'Tab'){
                e.preventDefault();
                let focusables = Array.from(this.host.querySelectorAll(
                    'a, kclsu-button, exit-button, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
                )) as any;
                focusables.unshift(this.host.shadowRoot.querySelector('exit-button'));
                console.log(focusables);
         
                let indexToFocus = this.currentFocusIndex;
                indexToFocus = indexToFocus === focusables.length - 1 ? 0 : indexToFocus + 1;
                console.log(indexToFocus)
                this.findFocus(focusables[indexToFocus]);
                this.currentFocusIndex = indexToFocus;
            }
    

            // if(this.show){
            //     console.log('keydown and finding')
            //     this.findFocus(this.focusables[0])

            //     if (e.shiftKey){
            //         indexToFocus = indexToFocus === 0 ? this.focusables.length - 1 : indexToFocus - 1;
            //     } else {
            //         indexToFocus = indexToFocus === this.focusables.length - 1 ? 0 : indexToFocus + 1;
            //     }
            //     console.log(this.focusables.length)
            //     console.log('Index to focus:' + indexToFocus)
            //     this.findFocus(this.focusables[indexToFocus]);
            //     this.currentFocusIndex = indexToFocus;
            // }

          

        });
    }


    findFocus(el){
        if(el){
            if (el.tagName === 'KCLSU-BUTTON'){
                const btn = el as HTMLKclsuButtonElement;
                btn.addFocus();
            }
            else if(el.tagName === 'PROFILE-CARD'){
                const card = el as HTMLProfileCardElement;
                card.addFocus();
            } else if(el.tagName === 'EXIT-BUTTON'){
                const btn = el as HTMLExitButtonElement;
                btn.addFocus();
            } else el.focus();

        } 
    }

    @Listen('exitModal') exitHandler(){
        this.currentFocusIndex = 0;
        if (this.autoexit){
            this.show = false;
            this.animate(this.styles)
            if (this.exitfn)
                this.exitfn();
        } 
    }

    

    @Watch('show') showHandler(newVal, __){
        if (!newVal){
            if (this.exitfn) this.exitfn(); 
        } else {
            this.currentFocusIndex = 0;
      
            this.focusables = Array.from(this.host.querySelectorAll(
                'a, kclsu-button, exit-button, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
            )) as any;
            this.focusables.unshift(this.host.shadowRoot.querySelector('exit-button'));
            
            if ((this.enterfn)) this.enterfn()
        }
        this.animate(this.styles);
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

        console.log('rendering new modal')

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
                <div class="Exit">
                    {this.autoexit && <exit-button purple callback={() => this.exitHandler()}></exit-button>}
                </div>
                <slot></slot>
            </dialog>
        ]);
    }
}