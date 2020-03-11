import { Component, h, State, Prop, Listen, Watch, Element } from '@stencil/core';
import { presets } from './assets/presets';


@Component({
    tag: 'cloudinary-app',
    styleUrl: 'cloudinary-app.css',
    // shadow: true
})

export class CloudinaryApp {

    timer;

    @Prop() public_id: string;

    @State() image;
    @State() loading: boolean;
    @State() selectedPreset: string;

    @Element() host: HTMLElement;

    componentDidLoad(){
        if (this.public_id) this.submitImage();
    }

    submitImage(adjustments = {}){
        console.log()
        let data:any = !this.selectedPreset? {} : {'preset': this.selectedPreset};
        if (Object.keys(adjustments).length > 0) data.edit = adjustments;
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
                this.setTimer();
                })
            .catch(er => {
                console.log(er);
            })
    }


    mapPresets(){
        return presets.map(node => {
            return <preset-card dimensions={node.dimensions} presetid={node.id} presetname={node.name}></preset-card>
        })
    }

    resetToOriginal(){
        console.log('resetToOriginal')
        this.selectedPreset = '';
        // this.submitImage();
    }

    setTimer(){
        let img:any= this.host.querySelector('img');
        console.log(img)
        let spinner = this.host.querySelector('loading-spinner');
        img.style.opacity= 0;
        spinner.show = true;
        this.timer = setTimeout(()=>{
            img.style.opacity = 1;
            spinner.show = false;
        }, 1000);
    }

    @Listen('selectPreset')
    onSelectedPreset(event: CustomEvent) {
        this.selectedPreset = event.detail;
    }

    @Listen('submitEdits')
    onSubmittedEdits(event:CustomEvent){
        console.log("listen triggered")
        console.log(event.detail)
        this.submitImage(event.detail)
    }

    @Listen('emitClick')
    onEmittedClick(event:CustomEvent){
        if(event.detail === 'showOriginal') this.resetToOriginal();
    }


    @Watch('selectedPreset') ResubmitImage(){
        console.log(this.selectedPreset);
        this.submitImage();
    }

    
    render() {
        console.log(this.selectedPreset)
        let img = !this.image? <div class='empty'></div> : <img src={this.image}></img>;
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
                        <div class='canvas'>
                            <loading-spinner show={false}></loading-spinner>
                            {img}
                        </div>
                        
                    <flex-container alignx='justify-content' wrap fillContainer>
                        <kclsu-button emitid='showOriginal' green small >Original</kclsu-button>
                        <kclsu-button download green small link={this.image}>Download</kclsu-button>
                        <preset-controls></preset-controls>
                    </flex-container>
                </div>
            </div>
        );
    }
}
