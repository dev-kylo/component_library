import { Component, h, Prop, Event, EventEmitter, Watch, Element, Listen} from '@stencil/core';



@Component({
    tag: 'inner-tab-header',
    styleUrl: 'tab-header.css',
    shadow: true
})
export class InnerTabHeader {

    // @State() isSelected: boolean;

    @Prop() active: boolean = false;
    @Prop() name: string;
    @Prop() index: number;


    @Event()
    selectInnerTab: EventEmitter;
    @Event()
    selectInnerTabByIndex: EventEmitter;

    @Element() element: HTMLElement;

    componentDidLoad(){
        if (this.active) {
            let link = this.element.querySelector('a');
            if(link) link.focus();
        };
    }

    
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
                <a href="#" id={id} aria-controls={name} aria-selected={selected} role="tab"><slot></slot></a>
            </li>
        );

        
    }

    @Watch('active') 
    onActiveChanged(newValue: boolean) {
      this.active = newValue;
    }

    @Listen('keydown')
    handleKeyDown(e: KeyboardEvent){

        //CHECK FOR ENTER 
        // LOOK FOR INNER TABS CONTAINER
        // IF TRUE, FOCUS ON FIRST CHILD
        // IF FALSE ALLOW NATURAL FOCUS

    // let dir = e.which === 37 ? index - 1 : e.which === 39 ? index + 1 : e.which === 40 ? 'down' : null;
        if (e.key === 'Tab'){ 
            //THIS WORKS EXCEPT FOR INITIAL LOAD TAB THAT IS ALREADY ACTIVE. 
            //USING THIS INDEX, CAN EMIT AN EVENT WITH NEW INDEX TO MAKE ACTIVE
            this.selectInnerTabByIndex.emit(+this.index + 1);
        }
        else if (e.key === 'Enter'){ 
            const innerTabsContainer = this.element.querySelector('inner-tabs-component');
            const keyboardfocusableElement = this.element.querySelector(
                'a, kclsu-button, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
            ) as HTMLElement;

            // console.log('Did I find a focussable element')
            console.log(this.element);

            if (keyboardfocusableElement){
                keyboardfocusableElement.focus();
            }
            else if (innerTabsContainer){

            }
            else return;
            
        }
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