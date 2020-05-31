import { Component, h, Prop, State, Watch} from '@stencil/core';

@Component({
    tag: 'tab-content',
    styleUrl: 'tab-content.css',
    shadow: true
})
export class TabContent {

    @Prop() name: string;
    @Prop() active: boolean = false;

    @State() isSelected: boolean = this.active;

    
    
    render() {
        const classes = {
            'tab-content': true,
            'tab-content-active' : this.isSelected
        }

        if(this.isSelected){
            return (
                <section class={classes} role="tabpanel" aria-labelledby={this.name}>
                    <slot></slot>
                </section>
            );
        }

        else {
            return (
                <section class={classes} tabindex="-1" hidden role="tabpanel" aria-labelledby={this.name}>
                    <slot></slot>
                </section>
            );
        }

    }

    @Watch('active') 
    onActiveChanged(newValue: boolean) {
      this.isSelected = newValue;
    }

    select() {
        this.isSelected = true;
    }

    unselect(){
        this.isSelected = false;
    }
}