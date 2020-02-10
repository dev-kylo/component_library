import { Component, h, State, Prop, Event, EventEmitter, Watch} from '@stencil/core';
import { createId } from '../../../../utils/utils';


@Component({
    tag: 'tab-header',
    styleUrl: 'tab-header.css',
    shadow: true
})
export class TabHeader {


    @State() isSelected: boolean;

    @Prop() active: boolean = false;
    @Prop() name: string;
    @Prop() id: string;


    @Event()
    selectTab: EventEmitter;

    componentDidLoad(){
        this.id = createId();
        if (this.active) this.isSelected = true;
    }
    
    render() {
        const classes = {
            'tab-header': true,
            'tab-header-active': this.isSelected
        }

        return (
            <div class={classes} onClick={() => this.onClick()}>
                <h5><slot></slot></h5>
            </div>
        );
    }

    @Watch('active') 
    onActiveChanged(newValue: boolean) {
      this.isSelected = newValue;
    }

    onClick() {
        this.selectTab.emit(this.name);
    }

    select(){
        this.isSelected = true;
    }

    unselect(){
        this.isSelected = false;
    }


}