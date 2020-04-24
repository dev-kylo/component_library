import { Component, h, Prop, State } from '@stencil/core';


@Component({
    tag: 'user-login',
    styleUrl: 'user-login.css',
    shadow: true
})
export class UserLogin {

    /** The name of the database area. For example: projectx */
    @Prop() database: string;
    
    @State() modalOpen: boolean = true;
    @State() token: string;
    @State() error: string;

    componentDidLoad(){
        this.checkAuthentication();
    }


    checkAuthentication(){
        const token = localStorage.getItem('kclsu_token');
        if (token){
            const expirationDate = new Date(localStorage.getItem('tokenExpireDate'));
            if (new Date() < expirationDate){
                this.token = token;
                this.modalOpen = false;
            }
            else {
                localStorage.removeItem('kclsu_token');
                localStorage.removeItem('tokenExpireDate')
            }
        }
    }

    logIn(e){
        e.preventDefault();
        let element = e.target;
        let email = element[0].value;
        let password = element[1].value;

        let url = 'https://kclsu-heroku.herokuapp.com/authenticate';

        let data = {
            package: {
                email: email,
                password: password,
                returnSecureToken: true
            },
            area: this.database
        }
        let payload: any = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(data)
    };
    fetch(url, payload)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        if (!data.idToken) this.error = data.error.message;
        else {

            const expirationDate:any = new Date(new Date().getTime() + data.expiresIn * 1000);
            localStorage.setItem('kclsu_token', data.idToken);
            localStorage.setItem('tokenExpireDate', expirationDate); 

            this.error = '';
            this.token = data.idToken;
            this.modalOpen = false;
        }
    })
    .catch(er => this.error = er) 
    }
    
    render() {
        return (
            <kclsu-modal show={this.modalOpen}>
                <form onSubmit={(e) => this.logIn(e)}>
                    <span class="title">Log in using details provided</span>
                    <div class="flex">
                        <label> Email</label>
                        <input type="email" value='' id="email" />
                    </div>
                    <div class="flex">
                        <label> Password</label>
                        <input type="password" value='' id="password" />
                    </div>
                    <button>Login</button>                 
                </form>
                <span class="error">{this.error? `${this.error} !`: ''}</span>
            </kclsu-modal>
        );
    }
}