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

        return (
            <li role="presentation" class={classes} onClick={() => this.onClick()}>
                <h6 id={this.name} aria-selected={this.active} role="tab"><slot></slot></h6>
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