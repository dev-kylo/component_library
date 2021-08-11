import { Component, h, Element, State, Listen, Prop } from '@stencil/core';

type TabGrouping = {
  header: HTMLInnerTabHeaderElement;
  content: HTMLInnerTabContentElement;
}


@Component({
  tag: 'inner-tabs-container',
  styleUrl: 'inner-tabs-container.css',
  shadow: true
})
export class InnerTabsContainer {

  @Element() host: HTMLElement;

  @State() headersGroup;
  @State() contentGroup;
  @State() allTabsGroups: TabGrouping[];
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
    <div role="presentation" class="kclsu-tabs">
      <ul role="tablist" class="kclsu-tab-headers">
        <slot name="tab-headers"></slot>
      </ul>
      <div role="presentation" class="kclsu-tab-content">
        <slot name="tab-content"></slot>
      </div>
    </div>
    );
  }

  @Listen('selectInnerTab')
  onSelectedTab(event: CustomEvent) {
    this.selectGroup(event.detail, null);
  }

  @Listen('selectTabByIndex')
  onSelectedTabByIndex(event: CustomEvent) {
    this.selectGroup(null, event.detail);
  }

  selectTabByClick(tabgroup: TabGrouping, name: string){
    if (tabgroup.header.name === name){
      tabgroup.header.active = true;
      tabgroup.content.active = true;
    }
  }

  selectByKeyboard(tabgroup: TabGrouping, currentIndex: number, newIndex: number){
    if (currentIndex === newIndex){
      tabgroup.header.active = true;
      tabgroup.content.active = true;
    }
  }
 
  selectGroup(name, newIndex){

    this.allTabsGroups.forEach((tabgroup, i) => {

      tabgroup.header.index = i;
      
      if (tabgroup.header.name === name){
        tabgroup.header.active = true;
        tabgroup.content.active = true;
      }

    else if ( i === newIndex){
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
