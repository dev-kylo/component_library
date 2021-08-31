import { Component, Prop, h, Element, Event, EventEmitter, State, Method } from '@stencil/core';

@Component({
  tag: 'profile-card',
  styleUrl: 'profile-card.css',
  shadow: true
})

export class ProfileCard {
  /** The title for the card - usually a full name */
  @Prop() name: string;
  /** A sub heading - usually a position or field title */
  @Prop() position: string;
  /** The URL link for the primary text link on the bottom left of the card*/
  @Prop() link: string;
  /** The ID string for click events, using Stencil's Emitter. Only applies to card's bottom right link- DEVELOPER USE */
  @Prop() emitid: string;
  /** A second URL link for the bottom right of the card */
  @Prop() secondlink: string;
  /** The text for the primary text link bottom left */
  @Prop() cta: string = 'Find Out More';
  /** The text for the secondary text link bottom right */
  @Prop() secondcta: string;
  /** A call back function to be supplied for the first (left hand side) call to action, as well as the clickable name  */
  @Prop() primaryfn: () => void;
  /** A call back function to be supplied for the second (right hand side) call to action*/
  @Prop() secondaryfn: () => void;
  /** The image URL */
  @Prop() image: string = 'https://res.cloudinary.com/kclsu-media/image/upload/f_auto,fl_any_format,g_center,q_100/v1581516201/website_uploads/KCLSU%20Brand/Bzcl1r6L_400x400_se7grm.jpg';
  /** Applies to lazy loading of images. Remove lazy loading */
  @Prop() nolazy: boolean = false;
  /** Specifiy which part of the image to focus on. Defaults to center */
  @Prop() imagefocus: 'center' | 'top' | 'bottom' | 'right' | 'left' | 'faces' = 'center'

  @State() imageloading: boolean = true;
  @State() imageclasses:any = ['fit', 'hide']
  
  @Element() host: HTMLElement;

  @Event()emitClick:EventEmitter;

  clickHandler(e: Event, cb: () => void){
      e.preventDefault();
      if (cb) cb();
      else if (this.emitid) this.emitClick.emit(this.emitid)
  }

  createNameButton(){
    if (this.link) 
      return <a target="_blank" href={this.link}><span class="name">{this.name}</span></a>
    
    else return <a role="button" tabindex="0" onClick={e => this.clickHandler(e, this.primaryfn)}><span class="name">{this.name}</span></a> 
  }

  createTextButton(type: 'primary' | 'secondary'){
    let link, text, callback;
    
    switch (type) {
      case 'primary':
        link = this.link;
        text = this.cta;
        callback = this.primaryfn;
      break;
      case 'secondary': 
        link = this.secondlink;
        text = this.secondcta;
        callback = this.secondaryfn;
      break;
    }

    if (!text) return '';
    if (link) 
      return <a class="link" target="_blank" href={link}>{text}</a>
    else return <a class="link" role="button" tabindex="0" onClick={e => this.clickHandler(e, callback)}>{text}</a> 
  }

  @Method()
  async addFocus(){
    const firstLink = this.host.shadowRoot.querySelector('a');
    if (firstLink) firstLink.focus();
  }
  
  render() {


    let nameLink = this.createNameButton();
    let primarybtn = this.createTextButton('primary');
    let secondarybtn = this.createTextButton('secondary');


    return (
      <div class="profile-card">
        <div class="image">
          <lazy-image 
            nolazy={this.nolazy} 
            animatein 
            image={this.image}
            mobile="80"
            desktop="12"
            focusarea={this.imagefocus}
            customtransform="g_face"
          ></lazy-image>
        </div>
        <div class="label">
          {nameLink}
          <span class="position">{this.position}</span>
          <flex-container alignx='space-between' wrap>
            {primarybtn}
            {secondarybtn}
          </flex-container>
        </div>
      </div>
    );
  }
}
