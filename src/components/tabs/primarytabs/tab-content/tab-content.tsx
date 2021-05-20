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
        };
        const id =this.name.replace(/\s+/g, '');
        const label = `tab_${id}`;

        if (this.isSelected){
            return (
                <section class={classes} aria-hidden="false" id={id} role="tabpanel" aria-labelledby={label}>
                    <slot></slot>
                </section>
            );
        }

        else {
            return (
                <section class={classes} id={id} tabindex="-1" aria-hidden="true" hidden role="tabpanel" aria-labelledby={label}>
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