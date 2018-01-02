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
export class AccountProvider {

  constructor(public http: HttpClient,  private fb: Facebook, public storage: Storage) {
    console.log('Hello AuthenticationProvider Provider');
  }
    
  
  
    public getAccount(){
        return new Promise((resolve, reject) => {
            console.log("dads");
            this.storage.get("session").then((session) => {            
                if (session){
                    let data = {key: AppSettings.apiKey, session: session, controller:"view", action:"getuser", sessionid: session};

                    this.http.post(AppSettings.apiUrl, data).subscribe((res) => {
    console.log(res);
                        if (res["success"] === true){

                            let user = res["data"];
                            user["dp"] = AppSettings.apiUrl.replace("index.php", "") + user["dp"];
                            console.log(user);
                            this.storage.set("account", user);
                            this.storage.set("userid", parseInt(user.id));
                            resolve(user);

                        }
                        else{reject(res);}                        

                    },(e) => {

                        this.storage.get("account").then((account) => { //offline
                            if (account){
                                resolve(account);
                                return;
                            }
                            reject(e);

                        });            



                    });   
                }
                else{
                    console.log("here");
                    reject();
                }
            })       
        })        
    }



    public getProfile(userId){
        return new Promise((resolve, reject) => {
            console.log("dads");
            this.storage.get("session").then((session) => {            
                if (session){
                    let data = {key: AppSettings.apiKey, session: session, controller:"view", action:"getusers", id:userId};

                    this.http.post(AppSettings.apiUrl, data).subscribe((res) => {
    console.log(res);
                        if (res["success"] === true){

                            let user = res["data"];
                            user["dp"] = AppSettings.apiUrl.replace("index.php", "") + user["dp"];
                            this.storage.set("profile" + userId, user);
                            resolve(user);

                        }
                        else{reject(res);}                        

                    },(e) => {

                        this.storage.get("profile" + userId).then((profile) => { //offline
                            if (profile){
                                resolve(profile);
                                return;
                            }
                            reject(e);

                        });            



                    });   
                }
                else{
                    console.log("here");
                    reject();
                }
            })       
        })        
    }
    
    
    public updateProfile(profile){
        return new Promise((resolve, reject) => {
            console.log("dads");
            this.storage.get("session").then((session) => {            
                if (session){
                    
                    this.storage.set("profile" + profile.userid, profile);
                    
                    
                    let requestData = {key: AppSettings.apiKey, session: session, controller:"edit", action:"updateprofile"};
                    
                    Object.assign(requestData, profile);

                    this.http.post(AppSettings.apiUrl, requestData).subscribe((res) => {

                        if (res["success"] === true){
                            resolve(res["data"]);

                        }
                        else{reject(res);}                        

                    },(e) => {

                   this.storage.get("failedRequests").then((data) => { 
                        let requests = data ? data : [];
                        let requestId = requests.length > 0 ? requests[requests.length - 1].id + 1 : 1;
                        requestData["id"] = requestId;
                        requests.push(requestData);
                        this.storage.set("failedRequests", requests);  
                     });  
                                                      
                     reject(e);

                    });   
                }
                else{
                    console.log("here");
                    reject();
                }
            })       
        })        
    }    
    


    public getUserActivity(userId, page){
        return new Promise((resolve, reject) => {
            console.log("dads");
            this.storage.get("session").then((session) => {            
                if (session){
                    let data = {key: AppSettings.apiKey, session: session, controller:"view", action:"getactivity", userid:userId, page:page, limit:10};

                    this.http.post(AppSettings.apiUrl, data).subscribe((res) => {

                        if (res["success"] === true){

                            resolve(res["data"]);

                        }
                        else{reject(res);}                        

                    },(e) => {

                        reject(e);

                    });   
                }
                else{
                    console.log("here");
                    reject();
                }
            })       
        })        
    }




    public updateSettings(settings, userId){
        return new Promise((resolve, reject) => {
            this.storage.get("session").then((session) => {            
                if (session){
                    let data = {key: AppSettings.apiKey, session: session, controller:"edit", action:"updatesettings", userid:userId};
                    Object.assign(data,settings);    


                    this.http.post(AppSettings.apiUrl, data).subscribe((res) => {

                        if (res["success"] === true){

                            resolve(res["data"]);

                        }
                        else{reject(res);}                        

                    },(e) => {

                        reject(e);

                    });   
                }
                else{
                    reject();
                }
            })       
        })        
    }
    
    
    
    public addTarget(userId){
        return new Promise((resolve, reject) => {
            this.storage.get("session").then((session) => {            
                if (session){
                    let data = {key: AppSettings.apiKey, session: session, controller:"create", action:"addtarget", userid:userId};

                    this.http.post(AppSettings.apiUrl, data).subscribe((res) => {

                        if (res["success"] === true){

                            resolve(res["data"]);

                        }
                        else{reject(res);}                        

                    },(e) => {

                        reject(e);

                    });   
                }
                else{
                    reject();
                }
            })       
        })        
    }    
    
    public updateTarget(target, userId){
        return new Promise((resolve, reject) => {
            this.storage.get("session").then((session) => {            
                if (session){
                    let data = {key: AppSettings.apiKey, session: session, controller:"edit", action:"updatetarget", userid:userId, id:target.id, exerciseid:target.exerciseid, target:target.target};

                    this.http.post(AppSettings.apiUrl, data).subscribe((res) => {

                        if (res["success"] === true){

                            resolve(res["data"]);

                        }
                        else{reject(res);}                        

                    },(e) => {

                        reject(e);

                    });   
                }
                else{
                    reject();
                }
            })       
        })        
    }
    
    
    public removeTarget(target, userId){
        return new Promise((resolve, reject) => {
            this.storage.get("session").then((session) => {            
                if (session){
                    let data = {key: AppSettings.apiKey, session: session, controller:"edit", action:"deletetarget", userid:userId, id:target.id};

                    this.http.post(AppSettings.apiUrl, data).subscribe((res) => {

                        if (res["success"] === true){

                            resolve(res["data"]);

                        }
                        else{reject(res);}                        

                    },(e) => {

                        reject(e);

                    });   
                }
                else{
                    reject();
                }
            })       
        })        
    }        
}
