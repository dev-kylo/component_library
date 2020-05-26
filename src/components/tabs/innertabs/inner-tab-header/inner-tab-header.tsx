import { Component, h, State, Prop, Event, EventEmitter, Watch} from '@stencil/core';



@Component({
    tag: 'inner-tab-header',
    styleUrl: 'tab-header.css',
    shadow: true
})
export class InnerTabHeader {



    @State() isSelected: boolean;

    @Prop() active: boolean = false;
    @Prop() name: string;


    @Event()
    selectInnerTab: EventEmitter;


    componentDidLoad(){
        if (this.active) this.isSelected = true;
    }

    
    render() {
        const classes = {
            'tab-header': true,
            'tab-header-active': this.isSelected
        }

        return (
            <div class={classes} onClick={() => this.onClick()}>
                <h6><slot></slot></h6>
            </div>
        );
    }

    @Watch('active') 
    onActiveChanged(newValue: boolean) {
      this.isSelected = newValue;
    }

    onClick() {
        this.selectInnerTab.emit(this.name);
    }

    select(){
        this.isSelected = true;
    }

    unselect(){
        this.isSelected = false;
    }


}