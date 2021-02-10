import { Component, h, Prop, State, Element, Listen } from '@stencil/core';
import { LoginPackage, firebaseResponse } from './models';
import { makeRequest } from '../../../utils/utils';
import { isEmail, isRequired, validate } from '../../../decorators/validation/config';

@Component({
    tag: 'user-login',
    styleUrl: 'user-login.css',
    shadow: true
})

export class UserLogin {

    @isEmail 
    protected email: string;
    @isRequired
    protected password: string;

    /** The name of the database area. For example: projectx */
    @Prop() database!: string;
    /** Provide a custom callback.*/
    @Prop() callbackFn: (token: string) => void;
    
    
    //Modal visibility
    @State() modalOpen: boolean = true;
    //The firebase token, which will be retrieved from server
    @State() token: string;
    @State() error: string;
    @State() inputerrors: any = {};
    @State() loading: boolean = false;
    @Element() host: HTMLElement;

    componentDidLoad(){
        this.checkAuthentication();//See if a user token is stored in local storage
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
    
    @Listen('emitClick') buttonClick(e:Event){
        e.preventDefault();
        this.clearErrors();
        this.email = (this.host.shadowRoot.getElementById('email') as HTMLInputElement).value;
        this.password = (this.host.shadowRoot.getElementById('password') as HTMLInputElement).value;
        if(!this.validateInputs()) return; // check all inputs are valid before making request
        else this.logIn();
    }

    private logIn(){

        this.loading=true; //show loading spinner
        const data:LoginPackage = new LoginPackage(this.email, this.password, this.database);

        makeRequest<firebaseResponse>('https://kclsu-heroku.herokuapp.com/authenticate', 'POST', data)
        .then(data => {
            this.loading=false;

            if (!data.idToken) throw new Error(data.error.message)
            else {
                const expirationDate:any = new Date(new Date().getTime() + +data.expiresIn * 1000);
                localStorage.setItem('kclsu_token', data.idToken);
                localStorage.setItem('tokenExpireDate', expirationDate); 
                this.token = data.idToken;
                this.modalOpen = false;
                //If a callback arg was supplied, invoke the callback
                if (this.callbackFn) this.callbackFn(data.idToken);
            }
        })
        .catch(er => {
            this.loading= false;
            this.error = er;
        }) 
    }

    validateInputs(){
        const validation = validate(this);
        if(validation.hasErrors) {
            this.inputerrors = validation.errors;
            this.loading= false;
            return false;
        } else return true;
    }

    clearErrors(){
        this.inputerrors = {};
        this.error = '';
    }
    
    render() {
        let emailError = null, passwordError = null;
        //If error object contains these fields, render a span element to show error.
        if (this.inputerrors.hasOwnProperty('email')) emailError = <span class="error">{this.inputerrors.email.join(' ')}</span> 
        if (this.inputerrors.hasOwnProperty('password')) passwordError = <span class="error">{this.inputerrors.password.join(' ')}</span> 
        
        return (
            <kclsu-modal show={this.modalOpen}>
                <form>
                    <span class="title">Login with details provided</span>
                    <div class="inputfield">
                        <label> Email</label>
                        <input type="email" value='' id="email" />
                        {emailError}
                    </div>
                    <div class="inputfield">
                        <label> Password</label>
                        <input type="password" value='' id="password" />
                        {passwordError}
                    </div>
                    <kclsu-button center emitid="userlogin">Login</kclsu-button>  
                    <div style={{"position": "relative"}}><loading-spinner show={this.loading}></loading-spinner></div>
                    <span class="error">{this.error? `${this.error} !`: ''}</span>           
                </form>
            </kclsu-modal>
        );
    }
}