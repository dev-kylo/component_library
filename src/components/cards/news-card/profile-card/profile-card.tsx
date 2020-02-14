import { Component, Prop, h, Element } from '@stencil/core';

@Component({
  tag: 'profile-card',
  styleUrl: 'profile-card.css',
  shadow: true
})

export class ProfileCard{

  @Prop() name: string;
  @Prop() position: string;
  @Prop() link: string;
  @Prop() secondlink: string;
  @Prop() cta: string;
  @Prop() secondcta: string;
  @Prop() image: string = 'https://res.cloudinary.com/kclsu-media/image/upload/f_auto,fl_any_format,g_center,q_100/v1581516201/website_uploads/KCLSU%20Brand/Bzcl1r6L_400x400_se7grm.jpg';

  @Element() host: HTMLElement;
  
  render() {

    let imagebg;
    if (this.image){ imagebg = {
      'bacground-image': `url('https://res.cloudinary.com/kclsu-media/image/upload/f_auto,fl_any_format,g_center,q_100/v1581516201/website_uploads/KCLSU%20Brand/Bzcl1r6L_400x400_se7grm.jpg')`,
      'background-image': `url(${this.image})`
    }};
    
    let firstlink = !this.link ? '' :  <a class="link" href={this.link? this.link : ''}>{this.cta? this.cta : 'Find out more'}</a>
    let secondlink = !this.secondlink? '' : <a class="link" href={this.secondlink}>{this.secondcta}</a>

    return (
      <div class="profile-card">
          <div class="image"style={imagebg}></div>
          <div class="label">
          <a href={this.link? this.link : ''}><span class="name">{this.name}</span></a>
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
