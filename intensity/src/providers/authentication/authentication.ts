import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import {AppSettings} from '../../app/app.settings';
import { Storage } from '@ionic/storage';

/*
  Generated class for the AuthenticationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthenticationProvider {

  constructor(public http: HttpClient,  private fb: Facebook, public storage: Storage) {
    console.log('Hello AuthenticationProvider Provider');
  }
  
  
  
    public loginFb(){
      
      
        return new Promise((resolve, reject) => {
          
            this.fb.login(['public_profile', 'user_friends', 'email']) //login to FB
                .then((res: FacebookLoginResponse) => {

                    var user_id = res.authResponse.userID; //get FB UID     

                    this.fb.api(user_id + '/?fields=id,email,name', ["email"])    //get extra fields
                    .then((res) => {
                        let profile = res;
                        let data = {key:AppSettings.apiKey,session:null, controller:"authentication", action:"loginfb", id:profile.id,name:profile.name,email:profile.email};

                        this.http.post(AppSettings.apiUrl, data).subscribe((res) => { //authenticate with intensity

                            if (res["success"] === true){

                                this.storage.set("session", res["data"]["sessionid"]);
                                resolve();
                            }
                            else{reject(res);}                        

                        },(e) => {
                            reject(e);
                        });

                    })
                    .catch(e => {
                        reject(e);
                    })

                })
                .catch(e => {
                    console.log('Error logging into Facebook', e);
                    reject(e);
                });             

        });
    }
  
  
  
    public login(email,password){
        return new Promise((resolve, reject) => {
              let data = {key:AppSettings.apiKey,session:null, controller:"authentication", action:"login", username:email,password:password};

              this.http.post(AppSettings.apiUrl, data).subscribe((res) => {

                  if (res["success"] === true){

                      this.storage.set("session", res["data"]["sessionid"]);
                      resolve();
                  }
                  else{reject(res["errormsg"]);}                        

              },(e) => {
                  reject(e);
              });          
        })
    }
  
  
  
  public register(email,password){
        return new Promise((resolve, reject) => {
              let data = {key:AppSettings.apiKey,session:null, controller:"create", action:"createuser", username:email,password:password};

              this.http.post(AppSettings.apiUrl, data).subscribe((res) => {

                  if (res["success"] === true){
                      this.login(email, password).then(() => {
                          resolve();
                      })
                      
                  }
                  else{reject(res);}                        

              },(e) => {
                  reject(e);
              });          
        })      
  }
  
  
  
  public resetPassword(email){
        return new Promise((resolve, reject) => {
              let data = {key:AppSettings.apiKey,session:null, controller:"edit", action:"resetpassword", email:email};

              this.http.post(AppSettings.apiUrl, data).subscribe((res) => {

                  if (res["success"] === true){
                          resolve();                     
                  }
                  else{reject(res);}                        

              },(e) => {
                  reject(e);
              });          
        })       
  }
  
  public logout(){
      this.storage.clear();
  }

}
