import { Component, h, State, Element } from '@stencil/core';


@Component({
    tag: 'cloudinary-app',
    styleUrl: 'cloudinary-app.css'
})

export class CloudinaryApp {

    @State() image;
    @Element() host: HTMLElement;

    submitImage(e){
        e.preventDefault();
        let selectedFile = e.target.querySelector('#file').files[0];
        console.log(selectedFile);
        let data = {'preset': 'Page_Banner', imageRef: selectedFile.name};
        let payload: any = {
            method: 'POST', 
            credentials: 'same-origin', 
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
    };
        fetch('http://localhost:3000/upload_image', payload)
            .then(res => res.json())
            .then(res => {
                console.log(res)
                this.image = res.image;
                })
            .catch(er => console.log(er))
    }
    
    render() {
        let img = !this.image? '' : <img src={this.image}></img>
        return (
            <div class="filesubmit">
                <form onSubmit={(e) => this.submitImage(e)}> 
                    <input type="file" id="file" />
                    <button>Submit</button>
                </form>
                <div class='image'>
                    {img}
                </div>

            </div>
        );
    }
}
