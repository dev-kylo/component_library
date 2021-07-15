import { Component, h, Element, State, Listen, Prop, Method } from '@stencil/core';
import { TabArea, TabTitle, Variants} from './tabtypes';


@Component({
  tag: 'kclsu-tabs',
  styleUrl: 'kclsu-tabs.scss',
  shadow: true
})



export class KclsuTabs {

  @Element() host: HTMLElement;

  @State() allTabsTitles: TabTitle;
  @State() allTabsAreas: TabArea;
  @Prop() variant : Variants = 'primary';
  
  firstTab: string;

  componentDidLoad() {

    (async () => {

      await customElements.whenDefined('tab-title');
      await customElements.whenDefined('tab-area');

      const headersGroup = Array.from(this.host.children).filter(el => el.tagName === 'TAB-TITLE') as HTMLTabTitleElement[];
      const contentGroup = Array.from(this.host.children).filter(el => el.tagName === 'TAB-AREA') as HTMLTabAreaElement[];
      
      this.firstTab = headersGroup[0].name;

      let headersObject = {}, contentObject = {};
      for (let i = 0; i < headersGroup.length; i++){
        
        //Assign styling variant
        headersGroup[i].variant = this.variant;

        //Add to state
        headersObject[headersGroup[i].name] = headersGroup[i];
        contentObject[contentGroup[i].name] = contentGroup[i];
      }

      this.allTabsAreas = contentObject;
      this.allTabsTitles = headersObject;
      
    })()
  }


  confirmExistingTab(name: string){
    return !!this.allTabsTitles[name] && !!this.allTabsAreas[name]
  }

  @Listen('selectFocussableElement')
  onSelectFocussableElement(evt: CustomEvent<string>){
     this.selectGroup(evt.detail, true)
  }

  @Listen('selectTabName')
  onSelectedTab(event: CustomEvent) {
    this.selectGroup(event.detail);
  }

  @Listen('closeArea')
  onCloseArea(event: CustomEvent){
    const tabName = event.detail;
    if (this.confirmExistingTab(tabName)){
      this.allTabsTitles[tabName].addFocus();
    }
  }


  @Listen('keydown')
  handleKeyDown(ev: KeyboardEvent){
    if (ev.key === 'Escape'){ 
     this.unSelectAllTabs();
    }
  }

  private toggleActiveTab(name: string, active: boolean){
    this.allTabsTitles[name].active = active;
    this.allTabsAreas[name].active = active ;
  }


  private selectGroup(name: string, withFocus = false){

    if (this.confirmExistingTab(name)){
      for (const key in this.allTabsTitles){
        if (key === name){
          this.toggleActiveTab(name, true);
          if (withFocus){
            this.allTabsAreas[key].findFocus();
          }
        }
        else this.toggleActiveTab(key, false);
      }
    }
  }

  private unSelectAllTabs(): void{
    for (const key in this.allTabsTitles){
      this.toggleActiveTab(key, false)
    }
  }

  @Method()
  async focusFirstTab(){
    this.allTabsTitles[this.firstTab].addFocus();
  }

  render() {
    const containerClasses = `kclsu-tabs kclsu-tabs-${this.variant}`;
    const titleClasses = `kclsu-tabs-${this.variant}-titles`;

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

