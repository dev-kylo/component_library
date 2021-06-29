import { Component, h, Element, State, Listen, Prop, Method } from '@stencil/core';
import { TabGrouping, Variants } from './tabtypes';


@Component({
  tag: 'kclsu-tabs',
  styleUrl: 'kclsu-tabs.scss',
  shadow: true
})



export class KclsuTabs {

  @Element() host: HTMLElement;

  @State() allTabsGroups: TabGrouping[];

  @Prop() variant : Variants = 'primary';


  componentDidLoad() {
    let headersGroup;
    let contentGroup;
    (async () => {
      await customElements.whenDefined('tab-title');
      await customElements.whenDefined('tab-area');

      headersGroup = Array.from(this.host.children).filter(el => el.tagName === 'TAB-TITLE');
      contentGroup = Array.from(this.host.children).filter(el => el.tagName === 'TAB-AREA');

      let headersObject = {}, contentObject = {};
      for (let i = 0; i < headersGroup.length; i++){
        headersObject[headersGroup[i].name] = headersGroup[i];
        contentObject[contentGroup[i].name] = contentGroup[i];
      }
      
      console.log(headersObject)
      console.log(contentObject)

      // console.log({headersGroup})
      // console.log({contentGroup})

      this.allTabsGroups = headersGroup.map(headerEl => {
        const cont = contentGroup.find(contEl => {
          return headerEl.name === contEl.name;
        })


        return {
          header: headerEl,
          content: cont
        }
      });

      this.allTabsGroups.forEach((group: TabGrouping) => {
        group.header.variant =  this.variant;
    })
    })()
  }


  confirmCurrentTab(name: string){
    return this.allTabsGroups.find(group => group.header.name === name);
  }

  @Listen('selectFocussableElement')
  onSelectFocussableElement(evt: CustomEvent<string>){
     this.selectGroup(evt.detail, true)
  }

  @Listen('selectTabName')
  onSelectedTab(event: CustomEvent) {
    this.selectGroup(event.detail);
  }


  @Listen('keydown')
  handleKeyDown(ev: KeyboardEvent){
    if (ev.key === 'Escape'){ 
     this.unSelectAllTabs();
    }
  }

  private toggleActiveTab(tabgroup: TabGrouping, active: boolean){
    tabgroup.header.active = active;
    tabgroup.content.active = active ;
  }


  private selectGroup(name: string, withFocus = false){

    if (this.confirmCurrentTab(name)){
      this.allTabsGroups.forEach((tabgroup: TabGrouping) => {
          
        if (tabgroup.header.name === name){
            this.toggleActiveTab(tabgroup, true);
            if (withFocus){
              tabgroup.content.findFocus();
            }
        } else this.toggleActiveTab(tabgroup, false)
          
        })
    }
  }

  private unSelectAllTabs(): void{
    this.allTabsGroups.forEach((tabgroup: TabGrouping) => {
      tabgroup.header.active = false;
      tabgroup.content.active = false;
    });
  }

  @Method()
  focusFirstTab(){
    const firsTabTitle = this.allTabsGroups[0].header as HTMLTabTitleElement;
    console.log(firsTabTitle)
    firsTabTitle.addFocus();
  }

  render() {
    const containerClasses = `kclsu-tabs kclsu-tabs-${this.variant}`;
    const titleClasses = `kclsu-tabs-${this.variant}-titles`
    return (
      <div role="presentation" class={containerClasses}>
        <ul role="tablist" class={titleClasses}>
          <slot name="tab-headers"></slot>
        </ul>
        <div role="presentation">
          <slot name="tab-content"></slot>
        </div>
      </div>
    );
  }

}

