import { Component, h, State, Prop, Listen, Watch, Element, Method } from '@stencil/core';
import { presets } from './assets/presets';


@Component({
    tag: 'cloudinary-app',
    styleUrl: 'cloudinary-app.css',
    // shadow: true
})

export class CloudinaryApp {

    timer;

    /** The Cloudinary image id - provided using the browser-side upload script, or using the the node server function */
    @Prop() public_id: string;

    @State() image;
    @State() loading: boolean;
    @State() selectedPreset: string;

    @Element() host: HTMLElement;

    componentDidLoad(){
        if (this.public_id) this.submitImage();
    }

    submitImage(adjustments = {}){
        let original = {
            transformations: {
                preset: '', 
                },
            publicId: this.public_id
            };

        let data:any = !this.selectedPreset? original : {transformations: {
                                                            preset: this.selectedPreset, 
                                                            },
                                                        publicId: this.public_id};
        
        if (Object.keys(adjustments).length > 0) data.transformations.edit = adjustments;

        let payload: any = {
            method: 'POST', 
            credentials: 'same-origin', 
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(data)
        };


    let url = `https://kclsu-heroku.herokuapp.com/transform`;

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
        this.selectedPreset = '';
    }

    setTimer(){
        let img:any= this.host.querySelector('img');
        let spinner = this.host.querySelector('loading-spinner');
        if(img){
            img.style.opacity= 0;
            spinner.show = true;
            this.timer = setTimeout(()=>{
                img.style.opacity = 1;
                spinner.show = false;
            }, 2500);
        }
    }

    @Listen('selectPreset')
    onSelectedPreset(event: CustomEvent) {
        this.selectedPreset = event.detail;
    }

    @Listen('submitEdits')
    onSubmittedEdits(event:CustomEvent){
        this.submitImage(event.detail)
    }

    @Listen('emitClick')
    onEmittedClick(event:CustomEvent){
        if(event.detail === 'showOriginal') this.resetToOriginal();
    }


    @Watch('selectedPreset') ResubmitImage(){
        this.submitImage();
    }

    @Watch('public_id') imageUploaded(){
        this.submitImage();
    }

    disconnectedCallback(){
        clearTimeout(this.timer);
    }


    render() {
        let img = !this.image? <div class='empty'> <span class="drag">Drag and Drop your image here... </span><div class="upload"><slot></slot></div></div> : <img src={this.image}></img>;
        let controls = ([
                        <flex-container alignx='justify-content' wrap fillcontainer>
                            <kclsu-button newtab emitid='showOriginal' small >Original</kclsu-button>
                            <kclsu-button newtab download small link={this.image}>Download</kclsu-button>
                            <preset-controls></preset-controls>
                        </flex-container>]);

        return (
            <div class="app">
                <div class="presets">
                    <div class="instructions">
                        <h2>KCLSU Cloudinary App</h2>
                        <p>Upload your image<br></br> Select your preset<br></br><em>'Right Click Save As'</em> to download.</p>
                    </div>
                    {!this.image? '' : this.mapPresets()}
                </div>
                <div class='image'>
                    <div class='canvas'>
                        <loading-spinner show={false}></loading-spinner>
                        {img}
                    </div>
                    {!this.image? '' : controls}
                </div>
            </div>
        );
    }
}
