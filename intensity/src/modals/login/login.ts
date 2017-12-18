import { Component } from '@angular/core';
import { NavController, ModalController, Platform, NavParams, ViewController, ToastController } from 'ionic-angular';

import { AuthenticationProvider } from '../../providers/authentication/authentication';

@Component({
    selector: 'login',
    templateUrl: 'login.html'
})

export class LoginModal {
    public user: any;
    public errors: any;
    public properties: any;
    
    constructor(public platform: Platform, public params: NavParams, public viewCtrl: ViewController, private auth: AuthenticationProvider, private toastCtrl: ToastController) {
        this.user = {
            email: "",
            password: "",
            errors: {}
        }
        this.properties = {loading:false,activeForm:"login"};
        this.errors = {};
    }
    
    
    public facebookLogin(){
        this.errors = {};
        this.auth.loginFb().then(function(){
            this.user = {};
            this.viewCtrl.dismiss(true);            
        })
        .catch((e) => {
            this.errors.facebookLogin = e;
        })
        

    }    
    
    public login(){
        this.errors = {};
        this.properties.loading = true;
        this.auth.login(this.user.email, this.user.password).then(()=>{
            this.user = {};
            this.properties.loading = false;
            console.log("here)");
        
            this.viewCtrl.dismiss(true);            
        })
        .catch((e) => {
            this.properties.loading = false;
            this.errors.login = e;
        })
    }
    
    public register(){
        this.errors = {};        
        if (this.user.password !== this.user.repeatPassword){
            this.errors.register = "Password do not match";
            return;
        }
        
        this.properties.loading = true;
        this.auth.register(this.user.email, this.user.password).then(() => {
            //this.user = {};
            //loading is turned off in login
            this.login();
        })
        .catch((e) => {
            this.properties.loading = false;
            this.errors.register = e;
        })
        
        
    }   
    
    public resetPassword(){
        this.errors = {};
        this.properties.loading = true;
        this.auth.resetPassword(this.user.email).then(()=>{
            this.properties.loading = false;
            let toast = this.toastCtrl.create({
                message: 'An email to reset your password has been sent.',
                duration: 3000
            });    
            toast.present();
            this.user = {};        
        })
        .catch((e) => {
            this.properties.loading = false;
            this.errors.reset = e;
        });

    }      


    public dismiss() {
        //create dummy user
        this.viewCtrl.dismiss();
    }
}
