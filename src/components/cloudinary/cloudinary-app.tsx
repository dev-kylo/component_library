import { Component, h, State, Prop } from '@stencil/core';


@Component({
    tag: 'cloudinary-app',
    styleUrl: 'cloudinary-app.css',
    shadow: true
})

export class CloudinaryApp {

    @Prop() public_id: string;

    @State() image;

    componentDidLoad(){
        if (this.public_id) this.submitImage();
    }

    submitImage(){
        let data = {'preset': 'Page_Banner'};
        let payload: any = {
            method: 'POST', 
            credentials: 'same-origin', 
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(data)
    };

    // if (data){
    //     // payload.method = 'POST';
    //     payload.body = JSON.stringify(data)
    // }

    let url = `http://localhost:3000/transform/${this.public_id}`;
    console.log(url)

        fetch(url, payload)
            .then(res => res.text())
            .then(img => {
                this.image = img;
                })
            .catch(er => console.log(er))
    }
    
    render() {
        let img = !this.image? '' : <img src={this.image}></img>
        return (
            <div class="app">
                <div class="presets">
                    <label-card cardtitle='Home Page Banner' text='Select this for Home Page Banners' buttonLink='/' buttonTitle='Select'></label-card>
                    <label-card cardtitle='Page Banner' text='Select this for Page Banners' buttonLink='/' buttonTitle='Select'></label-card>
                    <label-card cardtitle='Event Cards' text='Select this for Event Cards'  buttonLink='/' buttonTitle='Select'></label-card>
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
