import { Component, h, Element, State, Listen, Prop } from '@stencil/core';
@Component({
  tag: 'inner-tabs-container',
  styleUrl: 'inner-tabs-container.css',
  shadow: true
})

export class InnerTabsContainer {

  @Element() host: HTMLElement;

  @State() headersGroup;
  @State() contentGroup;
  @State() allTabsGroups: any[];
  @State() activetab : boolean;

  @Prop() innertab : boolean = false;


  componentDidLoad() {
   (async ()=> {
    await customElements.whenDefined('inner-tab-header');
    await customElements.whenDefined('inner-tab-content');
    this.headersGroup = Array.from(this.host.children).filter(el => el.tagName === 'INNER-TAB-HEADER');
    this.contentGroup = Array.from(this.host.children).filter(el => el.tagName === 'INNER-TAB-CONTENT');
    this.allTabsGroups = this.headersGroup.map(headerEl => {
      const cont = this.contentGroup.find(contEl => {
        return headerEl.name === contEl.name;
      })

    return {
      header: headerEl,
      content: cont
    }
    })
   })()
  }
  
  render() {
    return (
    <div class="kclsu-tabs">
      <div class="kclsu-tab-headers">
        <slot name="tab-headers"></slot>
      </div>
      <div class="kclsu-tab-content">
        <slot name="tab-content"></slot>
      </div>
    </div>
    );
  }

  @Listen('selectInnerTab')
  onSelectedTab(event: CustomEvent) {
    this.selectGroup(event.detail);

  }




 
  selectGroup(name){

    this.allTabsGroups.forEach(tabgroup => {
      
    if (tabgroup.header.name === name){
        tabgroup.header.active = true;
        tabgroup.content.active = true;
      }

      else {
        tabgroup.header.active = false;
        tabgroup.content.active = false;
      }
      
    })
  }


}
