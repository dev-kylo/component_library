import { Component, Prop, h, Element, Event, EventEmitter, State } from '@stencil/core';

@Component({
  tag: 'profile-card',
  styleUrl: 'profile-card.css',
  shadow: true
})

export class ProfileCard{
  /** The title for the card - usually a full name */
  @Prop() name: string;
  /** A sub heading - usually a position or field title */
  @Prop() position: string;
  /** The URL link for the primary text link on the bottom left of the card*/
  @Prop() link: string;
  /** The ID string for click events. Only applies to card's bottom right link- DEVELOPER USE */
  @Prop() emitid: string;
  /** A second URL link for the bottom right of the card */
  @Prop() secondlink: string;
  /** The text for the primary text link bottom left */
  @Prop() cta: string = 'Find Out More';
  /** The text for the secondary text link bottom right */
  @Prop() secondcta: string;
  /** The image URL */
  @Prop() image: string = 'https://res.cloudinary.com/kclsu-media/image/upload/f_auto,fl_any_format,g_center,q_100/v1581516201/website_uploads/KCLSU%20Brand/Bzcl1r6L_400x400_se7grm.jpg';

  @State() imageloading: boolean = true;
  @State() imageclasses:any = ['fit', 'hide']
  
  @Element() host: HTMLElement;

  @Event()emitClick:EventEmitter;

  clickHandler(e){
      e.preventDefault();
      this.emitClick.emit(this.emitid)
  }
  
  render() {
        
    let nameLink = !this.link ? <a onClick={e => this.clickHandler(e)}><span class="name">{this.name}</span></a> :  <a target="_blank" href={this.link? this.link : ''}><span class="name">{this.name}</span></a>
    let firstlink = !this.link ? <a class="link"  onClick={e => this.clickHandler(e)}>{this.cta}</a> :  <a class="link" target="_blank" href={this.link? this.link : ''}>{this.cta}</a>
    let secondlink = !this.secondlink? '' : <a class="link" target="_blank" href={this.secondlink}>{this.secondcta}</a>

    return (
      <div class="profile-card">
        <div class="image">
          <lazy-image thumbnail animatein image={this.image}></lazy-image>
        </div>
        <div class="label">
          {nameLink}
          <span class="position">{this.position}</span>
          <flex-container alignx='space-between' wrap>
            {firstlink}
            {secondlink}
          </flex-container>
        </div>
      </div>
    );
  }
}
