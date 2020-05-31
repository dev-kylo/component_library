import { Component, h, Prop, State, Watch} from '@stencil/core';



@Component({
    tag: 'inner-tab-content',
    styleUrl: 'tab-content.css',
    shadow: true
})
export class InnerTabContent {

    @Prop() name: string;
    @Prop() active: boolean = false;

    @State() isSelected: boolean = this.active;

    
        
    render() {
        const classes = {
            'tab-content': true,
            'tab-content-active' : this.isSelected
        }

        return (
            <section class={classes} hidden={this.isSelected} role="tabpanel" aria-labelledby={this.name}>
                <slot></slot>
            </section>
        );
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