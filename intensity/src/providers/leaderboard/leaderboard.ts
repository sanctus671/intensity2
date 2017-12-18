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
export class LeaderboardProvider {

    constructor(public http: HttpClient, public storage: Storage) {

    }
  
  public getLeaderboard(options){
        return new Promise((resolve, reject) => {
            
            this.storage.get("session").then((session) => {            

                let data = {key: AppSettings.apiKey, session: session, controller:"view", action:"getleaderboard"};
                Object.assign(data,options);

                this.http.post(AppSettings.apiUrl, data).subscribe((res) => {

                    if (res["success"] === true){
                        
                        res["data"]["reps"] = data["reps"];
                        
                        this.storage.set("leaderboard" + data["exerciseid"] + data["reps"] + data["page"] + data["limit"], res["data"]);

                        resolve(res["data"]);
                    }
                    else{reject(res);}                        

                },(e) => {

                    this.storage.get("leaderboard" + data["exerciseid"] + data["reps"] + data["page"] + data["limit"]).then((data) => { //offline
                        if (data){
                            resolve(data);
                            return;
                        }
                        reject(e);

                    });            



                });   
            })       
        })      
    }
    
    
  public likeSet(id){
        return new Promise((resolve, reject) => {
            
            this.storage.get("session").then((session) => {            

                let data = {key: AppSettings.apiKey, session: session, controller:"create", action:"likeset", id:id};

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
    
    
  public unlikeSet(id){
        return new Promise((resolve, reject) => {
            
            this.storage.get("session").then((session) => {            

                let data = {key: AppSettings.apiKey, session: session, controller:"edit", action:"unlikeset", id:id};

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
