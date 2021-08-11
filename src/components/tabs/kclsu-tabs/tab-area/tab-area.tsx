import { Component, h, Element, Prop, State, Watch, Method, Listen, Event, EventEmitter} from '@stencil/core';
import { KeysPressed } from '../tabtypes';


@Component({
    tag: 'tab-area',
    styleUrl: 'tab-area.scss',
    shadow: true
})

export class TabArea {

    @Prop() name: string;
    @Prop() active: boolean = false;

    @Element() element: HTMLElement;
    
    @State() isSelected: boolean = this.active;

    @Event() closeArea: EventEmitter;
    
    keysPressed: KeysPressed = {};
    hasKeyboardFocus: boolean = false;
    
    componentDidLoad(){
        this.element.slot = 'tab-content';
    }

    @Watch('active') 
    onActiveChanged(newValue: boolean) {
      this.isSelected = newValue;
      this.hasKeyboardFocus = false;
    }

    @Method()
    async findFocus(){
        const nestedTabs = this.element.querySelector('kclsu-tabs') as HTMLKclsuTabsElement;
        const firstfocusableElement = this.element.querySelector(
            'a, kclsu-button, profile-card, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
        ) as HTMLKclsuButtonElement | HTMLProfileCardElement |  HTMLElement;
   
        if (nestedTabs) nestedTabs.focusFirstTab();
        else if(firstfocusableElement){
            if (firstfocusableElement.tagName === 'KCLSU-BUTTON'){
                const btn = firstfocusableElement as HTMLKclsuButtonElement;
                btn.addFocus();
            }
            else if(firstfocusableElement.tagName === 'PROFILE-CARD'){
                const card = firstfocusableElement as HTMLProfileCardElement;
                card.addFocus();
            } else firstfocusableElement.focus();

            this.hasKeyboardFocus = true;
        }        
    }

    @Listen('keydown')
    handleKeyDown(ev: KeyboardEvent){
        this.keysPressed[ev.key] = true;

      if (this.keysPressed['Shift'] && ev.key === 'ArrowUp'){
        if (this.hasKeyboardFocus){
            this.active = false;
            this.closeArea.emit(this.name);
        }
      }
    }

    @Listen('keyup')
    handleUp(ev: KeyboardEvent){
        delete this.keysPressed[ev.key];
    }
    
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

}