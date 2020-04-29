import { Component, h, Prop} from '@stencil/core';


@Component({
    tag: 'profile-logo-card',
    styleUrl: 'profile-logo-card.css',
    shadow: true
})
export class ProfileLogoCard {
    /**The text title of the card */
    @Prop() cardtitle!: string;
    /** The URL link for the the card*/
    @Prop() link: string;
    /** The background image URL  */
    @Prop() image: string = 'https://res.cloudinary.com/kclsu-media/image/upload/f_auto,fl_any_format,g_center,q_100/v1581516201/website_uploads/KCLSU%20Brand/Bzcl1r6L_400x400_se7grm.jpg';
    /** The logo image URL 150x150px */
    @Prop() logo: string;
    /** OPTIONAL - if you are using a transparent text icon and need to set a background colour */
    @Prop() logocolour: string;

    render() {
        const bg = {
            "background-image": `url(${this.logo})`,
            "background-color": this.logocolour? this.logocolour : 'white'
        }

        return (
            <a target="_blank" href={this.link}>
                <div class="profile-card">
                    <div class="background">
                        <lazy-image image={this.image}></lazy-image>
                    </div>
                    <div class="logoContainer" style={bg}>
                        </div>
                    <div class="label">
                        <span class="name">{this.cardtitle}</span>
                    </div>
                </div>
            </a>
        );
    }
}