import { Component, h, Prop, Watch } from '@stencil/core';


@Component({
    tag: 'kclsu-modal',
    styleUrl: 'kclsu-modal.css'
})
export class KclsuModal {

    @Prop() show:boolean = false;

    // @Listen('exitModal') closeModal(e){
    //     console.log(e)
    //     this.show = false;
    // }

    @Watch('show') watchHandler(newVal){
        console.log("The modal is now showing:" + newVal)
    }
    
    render() {

        let styles = {
            'transform': this.show? 'translateY(0)' : 'translateY(-100vh)',
            'opacity': this.show? '1' : '0'
        };

        return ([
        <modal-backdrop showbg={this.show}></modal-backdrop>,
        <div class="Modal" style={styles}>
            <slot></slot>
        </div>
        ]);
    }
}