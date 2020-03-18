import { Component, Prop, h, Element, Event, EventEmitter, State } from '@stencil/core';

@Component({
  tag: 'profile-card',
  styleUrl: 'profile-card.css',
  shadow: true
})

export class ProfileCard{

  @Prop() name: string;
  @Prop() position: string;
  @Prop() link: string;
  @Prop() emitid: string;
  @Prop() secondlink: string;
  @Prop() cta: string = 'Find Out More';
  @Prop() secondcta: string;
  @Prop() image: string = 'https://res.cloudinary.com/kclsu-media/image/upload/f_auto,fl_any_format,g_center,q_100/v1581516201/website_uploads/KCLSU%20Brand/Bzcl1r6L_400x400_se7grm.jpg';

  @State() imageloading: boolean = true;
  @State() imageclasses:any = ['fit', 'hide']
  
  @Element() host: HTMLElement;

  @Event()emitClick:EventEmitter;

  clickHandler(e){
      e.preventDefault();
      this.emitClick.emit(this.emitid)
  }

  imageLoaded(){
    this.imageloading = false;
    this.imageclasses = ['fit', 'show', 'scale-in-center'];
  }

  
  render() {

    
    let nameLink = !this.link ? <a class="link" onClick={e => this.clickHandler(e)}><span class="name">{this.name}</span></a> :  <a class="link" target="_blank" href={this.link? this.link : ''}><span class="name">{this.name}</span></a>
    let firstlink = !this.link ? <a class="link" onClick={e => this.clickHandler(e)}>{this.cta}</a> :  <a class="link" target="_blank" href={this.link? this.link : ''}>{this.cta}</a>
    let secondlink = !this.secondlink? '' : <a class="link" target="_blank" href={this.secondlink}>{this.secondcta}</a>

    return (
      <div class="profile-card">
        <div class="image">
          <loading-spinner show={this.imageloading}></loading-spinner>
          <img onLoad={() => this.imageLoaded()} class={this.imageclasses.join(' ')} src={this.image}></img>
        </div>
        <div class="label">
          {nameLink}
          <span class="position">{this.position}</span>
          <flex-container alignx='space-between'>
            {firstlink}
            {secondlink}
          </flex-container>
        </div>
      </div>
    );
  }
}
