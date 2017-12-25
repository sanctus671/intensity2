import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AppSettings} from '../../app/app.settings';
import { Storage } from '@ionic/storage';

/*
  Generated class for the DiaryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MessageProvider {

    constructor(public http: HttpClient, public storage: Storage) {

    }
  
  public getConversations(){
        return new Promise((resolve, reject) => {
            
            this.storage.get("session").then((session) => {            

                let data = {key: AppSettings.apiKey, session: session, controller:"view", action:"getconversations"};

                this.http.post(AppSettings.apiUrl, data).subscribe((res) => {

                    if (res["success"] === true){

                        resolve(res["data"]);
                    }
                    else{reject(res);}                        

                },(e) => {

                        reject(e);


                });   
            })       
        })      
    }    
    
    
  public getMessages(userId){
        return new Promise((resolve, reject) => {
            
            this.storage.get("session").then((session) => {            

                let data = {key: AppSettings.apiKey, session: session, controller:"view", action:"getmessages", friendid:userId};

                this.http.post(AppSettings.apiUrl, data).subscribe((res) => {

                    if (res["success"] === true){

                        resolve(res["data"]);
                    }
                    else{reject(res);}                        

                },(e) => {

                        reject(e);


                });   
            })       
        })      
    }   
    
    
  public createMessages(message, userId){
        return new Promise((resolve, reject) => {
            
            this.storage.get("session").then((session) => {            

                let data = {key: AppSettings.apiKey, session: session, controller:"create", action:"savemessage", friendid:userId, message:message};

                this.http.post(AppSettings.apiUrl, data).subscribe((res) => {

                    if (res["success"] === true){

                        resolve(res["data"]);
                    }
                    else{reject(res);}                        

                },(e) => {

                        reject(e);


                });   
            })       
        })      
    }  
    
       

}
