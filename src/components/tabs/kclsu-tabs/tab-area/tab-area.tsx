import { Component, h, Element, Prop, State, Watch, Method} from '@stencil/core';

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

    componentDidLoad(){
        this.element.slot = 'tab-content';
    }

    @Watch('active') 
    onActiveChanged(newValue: boolean) {
      this.isSelected = newValue;
    }

    @Method()
    findFocus(){
        const nestedTabs = this.element.querySelector('kclsu-tabs') as HTMLKclsuTabsElement;
        const firstfocusableElement = this.element.querySelector(
            'a, kclsu-button, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
        ) as HTMLElement;
        
        
        //const firstChild = this.element.firstElementChild as HTMLElement;

        // console.log(' --  nested tabs component inside?  ' + !!nestedTabs + ' --');
        // console.log(' -- focussable element inside?  ' + !!firstfocusableElement+ ' --');
        //console.log({nestedTabs, firstfocusableElement, firstChild});
        console.log({nestedTab: nestedTabs, firstfocusableElName: firstfocusableElement});
        // console.log('--- first child is ----')
        // console.log(firstChild)
        if (nestedTabs) nestedTabs.focusFirstTab();
        else if(firstfocusableElement){
            if (firstfocusableElement.tagName === 'KCLSU-BUTTON'){
                const btn = firstfocusableElement as HTMLKclsuButtonElement;
                btn.addFocus();
            } else firstfocusableElement.focus();
        }        
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