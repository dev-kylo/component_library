import { Component, h, Prop } from '@stencil/core';




@Component({
    tag: 'full-bio',
    styleUrl: 'full-bio.css',
    shadow: true
})
export class FullBio {

    @Prop() data:any;
    
    render() {

    let facebook = !this.data.facebook? '' : <kclsu-button small link={this.data.facebook}>Facebook</kclsu-button>;
    let instagram = !this.data.instagram? '' : <kclsu-button small link={this.data.instagram}>Instagram</kclsu-button>;
    let twitter = !this.data.twitter? '' : <kclsu-button small link={this.data.twitter}>Facebook</kclsu-button>;
    let website = !this.data.website? '' : <kclsu-button small link={this.data.website}>Website</kclsu-button>;

        return (
            <div>
                <h3>{this.data.name}</h3>
                <p>{this.data.description}</p>
                <flex-container alignx="center" wrap>
                    {facebook}
                    {twitter}
                    {instagram}
                    {website}
                </flex-container>
            </div>
        );
    }
}