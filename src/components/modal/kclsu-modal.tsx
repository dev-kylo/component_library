import { Component, h, Prop, Watch } from '@stencil/core';


@Component({
    tag: 'kclsu-modal',
    styleUrl: 'kclsu-modal.css',
    shadow: true
})
export class KclsuModal {

    @Prop() show:boolean = false;

    @Watch('show') watchHandler(newVal){
        console.log("The modal is now showing:" + newVal)
    }
    
    render() {

        let styles = {
            'transform': this.show? 'translate(-50%, -50%)' : 'translateY(-200vh)',
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