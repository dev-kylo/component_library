import { Component, h, Prop, State, Element, Listen } from '@stencil/core';
import { LoginPackage, firebaseResponse } from './models';
import { makeRequest } from '../../../utils/utils';

@Component({
    tag: 'user-login',
    styleUrl: 'user-login.css',
    shadow: true
})

export class UserLogin {

    /** The name of the database area. For example: projectx */
    @Prop() database: string;

    //Modal visibility
    @State() modalOpen: boolean = true;
    //The firebase token, which will be retrieved from server
    @State() token: string;
    @State() error: string;
    @State() loading: boolean = false;
    @Element() host: HTMLElement;

    componentDidLoad(){
        this.checkAuthentication();
    }

    private checkAuthentication(){
        const token = localStorage.getItem('kclsu_token');
        if (token){
            const expirationDate:Date = new Date(localStorage.getItem('tokenExpireDate'));
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

    private logIn(){
        this.loading=true;

        const email = (this.host.shadowRoot.getElementById('email') as HTMLInputElement).value;
        const username = (this.host.shadowRoot.getElementById('email') as HTMLInputElement).value;

        console.log(email + ' ' + username)
        const url = 'https://kclsu-heroku.herokuapp.com/authenticate';
        const data:LoginPackage = new LoginPackage(email, username, this.database);


        makeRequest<firebaseResponse>(url, 'POST', data)
        .then(data => {
            this.loading=false;

            if (!data.idToken) this.error = data.error.message;
            else {

                const expirationDate:any = new Date(new Date().getTime() + +data.expiresIn * 1000);
                localStorage.setItem('kclsu_token', data.idToken);
                localStorage.setItem('tokenExpireDate', expirationDate); 

                this.error = '';
                this.token = data.idToken;
                this.modalOpen = false;
            }
        })
        .catch(er => {
            this.loading= false;
            this.error = er;
        }) 
    }

    @Listen('emitClick') buttonClick(e:Event){
        e.preventDefault();
        this.logIn();
    }
    
    render() {
        return (
            <kclsu-modal show={this.modalOpen}>
                <form>
                    <span class="title">Log in using details provided</span>
                    <div class="flex">
                        <label> Email</label>
                        <input type="email" value='' id="email" />
                    </div>
                    <div class="flex">
                        <label> Password</label>
                        <input type="password" value='' id="password" />
                    </div>
                    <kclsu-button center emitid="userlogin">Login</kclsu-button>             
                </form>
                <div style={{"position": "relative"}}><loading-spinner show={this.loading}></loading-spinner></div>
                <span class="error">{this.error? `${this.error} !`: ''}</span>
            </kclsu-modal>
        );
    }
}