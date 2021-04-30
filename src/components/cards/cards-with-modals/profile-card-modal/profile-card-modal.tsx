import { Component, Prop, h, State } from '@stencil/core';

@Component({
  tag: 'profile-card-modal',
  shadow: true
})

export class ProfileCardModal {
  /** The title for the card - usually a full name */
  @Prop() name: string;
  /** A sub heading - usually a position or field title */
  @Prop() position: string;
  /** The URL link for the primary text link on the bottom left of the card*/
  @Prop() link: string;
  /** A second URL link for the bottom right of the card */
  @Prop() secondlink: string;
  /** The text for the primary text link bottom left */
  @Prop() cta: string = 'Find Out More';
  /** The text for the secondary text link bottom right */
  @Prop() secondcta: string;
  /** The image URL */
  @Prop() image: string;

  @State() modalvisible: boolean = false;

  showModal(){
    this.modalvisible = true;
  }

  exitModal(){
    this.modalvisible = false;
  }

  render() {
    return (
        [<profile-card
            name={this.name}
            position={this.position}
            link={this.link}
            secondlink={this.secondlink}
            cta={this.cta}
            secondcta={this.secondcta}
            image={this.image}
            primaryfn={this.showModal.bind(this)}
            secondaryfn={this.showModal.bind(this)}
        >
        </profile-card>,
        <kclsu-modal show={this.modalvisible} exitfn={this.exitModal.bind(this)} autoexit>
            <slot></slot>
        </kclsu-modal>]
    );
  }
}
