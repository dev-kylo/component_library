import { Component, h, Prop, EventEmitter, Event} from '@stencil/core';


@Component({
    tag: 'modal-backdrop',
    styleUrl: 'kclsu-modal.css'
})
export class ModalBackdrop {


    @Prop() showbg: boolean;
    @Event() exitModal: EventEmitter;

    clickHandler(e){
        this.exitModal.emit(e)
    }
    
    render() {
        return (
            this.showbg? <div class='Backdrop' onClick={(e) => this.clickHandler(e)}></div> : null
        );
    }
}