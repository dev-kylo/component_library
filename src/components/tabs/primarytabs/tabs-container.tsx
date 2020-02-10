import { Component, h, Element, State, Listen, Prop } from '@stencil/core';


@Component({
  tag: 'tabs-container',
  styleUrl: 'tabs-container.css',
  shadow: true
})

export class TabsContainer {

  @Element() host: HTMLElement;

  @State() allTabsGroups: any[];

  @Prop() innertab : boolean = false;


  componentDidLoad() {
    let headersGroup;
    let contentGroup;
   (async ()=> {
    await customElements.whenDefined('tab-header');
    await customElements.whenDefined('tab-content');
    headersGroup = Array.from(this.host.children).filter(el => el.tagName === 'TAB-HEADER');
    contentGroup = Array.from(this.host.children).filter(el => el.tagName === 'TAB-CONTENT');
    this.allTabsGroups = headersGroup.map(headerEl => {
      const cont = contentGroup.find(contEl => {
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

  @Listen('selectTab')
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
