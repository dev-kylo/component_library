import { Component, h, Prop, Event, EventEmitter, Watch} from '@stencil/core';



@Component({
    tag: 'inner-tab-header',
    styleUrl: 'tab-header.css',
    shadow: true
})
export class InnerTabHeader {

    // @State() isSelected: boolean;

    @Prop() active: boolean = false;
    @Prop() name: string;


    @Event()
    selectInnerTab: EventEmitter;


    // componentDidLoad(){
    //     if (this.active) this.isSelected = true;
    // }

    
    render() {
        const classes = {
            'tab-header': true,
            'tab-header-active': this.active
        }
        let name = this.name.replace(/\s+/g, '');
        const id = `innertab_${name}`;

        const selected = this.active? 'true' : 'false';

        return (
            <li role="presentation" class={classes} onClick={() => this.onClick()}>
                <h6 id={id} aria-controls={name} aria-selected={selected} role="tab"><slot></slot></h6>
            </li>
        );
    }

    @Watch('active') 
    onActiveChanged(newValue: boolean) {
      this.active = newValue;
    }

    onClick() {
        this.selectInnerTab.emit(this.name);
    }

    select(){
        this.active = true;
    }

    unselect(){
        this.active = false;
    }


}