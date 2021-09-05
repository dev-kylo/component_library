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
    /** The logo image URL - at least 150x150px, must be a square image.*/
    @Prop() logo: string;
    /** OPTIONAL - if you are using a transparent text icon and need to set a background colour */
    @Prop() logocolour: string;
    /** Specify which part of the image you want to focus - top, bottom, right, left, center */
    @Prop() imagefocus: string

    render() {
        const bg = {
            "background-color": this.logocolour? this.logocolour : 'white'
        }


        return (
            <a target="_blank" href={this.link}>
                <div class="profile-card">
                    <div class="background">
                        <lazy-image  mobile="90" desktop="20" minwidth="350" animatein focusarea={this.imagefocus} image={this.image}></lazy-image>
                    </div>
                    <div class="logoContainer" style={bg}>
                        {this.logo && <lazy-image mobile="10" desktop="30" minwidth="100" animatein image={this.logo}></lazy-image>}
                    </div>
                    <div class="label">
                        <span class="name">{this.cardtitle}</span>
                    </div>
                </div>
            </a>
        );
    }
}