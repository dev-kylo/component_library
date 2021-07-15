import { Component, h, Prop, Event, EventEmitter, Watch, Listen, Element, Method} from '@stencil/core';
import { Variants } from '../tabtypes';


@Component({
    tag: 'tab-title',
    styleUrl: 'tab-title.scss',
    shadow: true
})
export class TabTitle {

    /** Is the tab title active, and corresponding tab area visible */
    @Prop() active: boolean = false;
    /** A unique name, matching the name of the tab area component */
    @Prop() name: string;
    //Do not set directly - handed down from parent. Set in the kclsu-tabs component
    @Prop() variant: Variants = 'primary';
    

    @Element() element: HTMLElement;

    @Event()
    selectTabName: EventEmitter;

    @Event()
    selectFocussableElement: EventEmitter;

    componentDidLoad(){
        this.element.slot = 'tab-headers';
        if (this.active) {
            let link = this.element.querySelector('a');
            if(link) link.focus();
        };
    }


    @Watch('active') 
    onActiveChanged(newValue: boolean) {
      this.active = newValue;
    }


    @Listen('keydown')
    handleKeyDown(ev: KeyboardEvent){
      if (ev.key === 'Enter'){
        this.selectFocussableElement.emit(this.name);
      }
    }

    @Listen('click')
    handleClick(e: MouseEvent){
        e.preventDefault();
        this.selectTabName.emit(this.name);
    }
    
    @Method()
    async addFocus(){
        console.log('add Focus')
        const el = this.element.shadowRoot.querySelector('a') as HTMLElement;
        el.focus();
    }

    select(){
        this.active = true;
    }

    unselect(){
        this.active = false;
    }

    defineClasses(){
        const ar = ['tab-title', `tab-title-${this.variant}`]
        if (this.active) ar.push('tab-title-active');
        return ar;
      }

    render() {
        const classes = this.defineClasses().join(' ');

        let name = this.name.replace(/\s+/g, '');
        const href = `#`;
        const id = `tab_${name}`;

        if (this.active){
            return (
                <li role="presentation" class={classes} >
                    <a href={href} id={id} aria-controls={name} aria-selected="true" role="tab" ><slot></slot></a>
                </li>
            );
        }
        else {
            return (
                <li role="presentation" class={classes} >
                    <a href={href} id={id} aria-controls={name} role="tab" ><slot></slot></a>
                </li>
            );
        }

    }
}