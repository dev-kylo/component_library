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
  @Prop() cta: string = 'My manifesto';
  @Prop() image: string;

  @Element() host: HTMLElement;

  // componentDidLoad() {
  //   console.log(this.host)
  //   this.host.querySelector('.image').setAttribute('background-image', this.image);
  // }
  

  render() {

    let imagebg;
    if (this.image) imagebg = {
      'background-image': `url(${this.image})`
    };

    return (
      <div class="profile-card">
          <div class="image" style={imagebg}></div>
          <div class="label">
          <a href={this.link? this.link : ''}><span class="name">{this.name}</span></a>
            <span class="position">{this.position}</span>
            <a class="link" href={this.link? this.link : ''}>{this.cta? this.cta : ''}</a>
          </div>
      </div>
    );
  }
}
