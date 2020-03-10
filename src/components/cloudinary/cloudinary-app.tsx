import { Component, h, State, Prop, Listen } from '@stencil/core';
import { presets } from './assets/presets';


@Component({
    tag: 'cloudinary-app',
    styleUrl: 'cloudinary-app.css',
    shadow: true
})

export class CloudinaryApp {

    @Prop() public_id: string;

    @State() image;
    @State() selectedPreset: string;

    componentDidLoad(){
        if (this.public_id) this.submitImage();
    }

    componentDidUpdate(){
        this.submitImage(); 
    }

    submitImage(){
        let data = !this.selectedPreset? {} : {'preset': this.selectedPreset};
        let payload: any = {
            method: 'POST', 
            credentials: 'same-origin', 
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(data)
    };


    let url = `http://localhost:3000/transform/${this.public_id}`;
    console.log(url)

        fetch(url, payload)
            .then(res => res.text())
            .then(img => {
                this.image = img;
                })
            .catch(er => console.log(er))
    }


    mapPresets(){
        return presets.map(node => {
            return <preset-card dimensions={node.dimensions} presetid={node.id} presetname={node.name}></preset-card>
        })
    }

    @Listen('selectPreset')
    onSelectedPreset(event: CustomEvent) {
        console.log(event.detail)
        this.selectedPreset = event.detail;
    }
    
    render() {
        let img = !this.image? <div class='empty'></div> : <img src={this.image}></img>
        return (
            <div class="app">
                <div class="presets">
                    <div class="instructions">
                        <p>Upload your image, select your preset and 'Right Click Save As' to download.</p>
                    </div>
                    <div class="upload"><slot></slot></div>
                    {!this.image? '' : this.mapPresets()}
                </div>
                <div class='image'>
                    {img}
                    <flex-container alignx='justify-content' fillContainer>
                        <kclsu-button green small link={this.image}>View full image</kclsu-button>
                        <kclsu-button green small link={this.image}>View original image</kclsu-button>
                        <kclsu-button download green small link={this.image}>Download</kclsu-button>
                    </flex-container>
                </div>
            </div>
        );
    }
}
