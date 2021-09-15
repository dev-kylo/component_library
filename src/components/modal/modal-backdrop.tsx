import { Component, h, Prop, EventEmitter, Event} from '@stencil/core';


@Component({
    tag: 'modal-backdrop',
    styleUrl: 'kclsu-modal.css'
})
export class ModalBackdrop {

    /** NEVER set directly. Set in parent component */
    @Prop() showbg: boolean;
    /** NEVER set directly. Set in parent component */
    @Prop() position: string;
    @Event() exitModal: EventEmitter;

    clickHandler(e){
        this.exitModal.emit(e)
    }
    
    render() {


        return (
            this.showbg? <div style={{"position": this.position}} class='Backdrop' onClick={(e) => this.clickHandler(e)}></div> : null
        );
    }
}