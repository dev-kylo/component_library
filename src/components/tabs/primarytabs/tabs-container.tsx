import { Component, h, Element, State, Listen, Prop } from '@stencil/core';

//IN TABLET + SMALLER
//THE TAB HEADINGS LIVE IN A DROPDOWN CONTAINER. ABSOLUTE POSITIONED
//CONTAINER CAN BE OPEN OR CLOSED
//IF OPEN, TAB HEADINGS DISPLAY
//IF CLOSED, THERE IS A BEIGE BAR, WITH NAME THAT IS SELECTED, AND RIGHT ARROW
//IF NOTHING IS CURRENTLY SELECTED, SHOW OPTIONS...
//ONLY APPLIES TO INNER TABS
//IF OPTION IS CLICKED, THEN CONTENT BENEATH ALL_HEADERS DISPLAYS AS PER USUAL
// ALL_HEADERS ANIMATES HEIGHT UPWARDS
// NAME OF SELECTED APPEARS IN BEIGE BAR, AND RIGHT ARROW POINTS RIGHT
//CONTENT MOVES UP AS ALL_HEADERS HEIGHT REDUCES
//IF BEIGE BAR CLICKED, ARROW POINTS DOWN, AND ALL_HEADERS HEIGHT INCREASES AND ANIMATES


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

  @Listen('selectTab')
  onSelectedTab(event: CustomEvent) {
    this.selectGroup(event.detail, null);
  }

  @Listen('selectTabByIndex')
  onSelectedTabByIndex(event: CustomEvent) {
    this.selectGroup(null, event.detail);
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

