import { Component, h, Prop, Event, EventEmitter, Watch, Listen, Element} from '@stencil/core';


@Component({
    tag: 'tab-header',
    styleUrl: 'tab-header.css',
    shadow: true
})
export class TabHeader {


    // @State() isSelected: boolean;

    @Prop() active: boolean = false;
    @Prop() name: string;
    @Prop() index: string;

    @Element() element: HTMLElement;

    @Event()
    selectTab: EventEmitter;

    @Event()
    selectTabByIndex: EventEmitter;

    componentDidLoad(){
        if (this.active) {
            // this.isSelected = true;
            let link = this.element.querySelector('a');
            if(link) link.focus();
        };
    }
    
    render() {
        const classes = {
            'tab-header': true,
            'tab-header-active': this.active
        }

        if (this.active){
            return (
                <li role="presentation" class={classes} >
                    <a href="#" onClick={(e) => this.onClick(e)} id={this.name} aria-selected="true" role="tab" ><slot></slot></a>
                </li>
            );
        }
        else {
            return (
                <li role="presentation" class={classes} >
                    <a href="#" onClick={(e) => this.onClick(e)} id={this.name} role="tab" ><slot></slot></a>
                </li>
            );
        }

    }

    @Watch('active') 
    onActiveChanged(newValue: boolean) {
      this.active = newValue;
    }

    @Listen('keydown')
        handleKeyDown(e: KeyboardEvent){
        // let dir = e.which === 37 ? index - 1 : e.which === 39 ? index + 1 : e.which === 40 ? 'down' : null;
        if (e.which === 39  ){
            console.log('down arrow pressed')
            console.log('Index')
            console.log(this.index)
            //THIS WORKS EXCEPT FOR INITIAL LOAD TAB THAT IS ALREADY ACTIVE. 
            //USING THIS INDEX, CAN EMIT AN EVENT WITH NEW INDEX TO MAKE ACTIVE
            this.selectTabByIndex.emit(+this.index + 1);
        }
    }

    onClick(e) {
        e.preventDefault();
        this.selectTab.emit(this.name);
    }

    select(){
        this.active = true;
    }

    unselect(){
        this.active = false;
    }


}