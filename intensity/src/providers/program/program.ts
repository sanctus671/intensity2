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
export class ProgramProvider {

    constructor(public http: HttpClient, public storage: Storage) {

    }
  
  
  public getPrograms(){
        return new Promise((resolve, reject) => {
            
            this.storage.get("session").then((session) => {            

                let data = {key: AppSettings.apiKey, session: session, controller:"view", action:"getprograms"};

                this.http.post(AppSettings.apiUrl, data).subscribe((res) => {

                    if (res["success"] === true){

                        this.storage.set("programs", res["data"]);

                        resolve(res["data"]);
                    }
                    else{reject(res);}                        

                },(e) => {

                    this.storage.get("programs").then((data) => { //offline
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
    
  public getSuggestedPrograms(){
        return new Promise((resolve, reject) => {
            
            this.storage.get("session").then((session) => {            

                let data = {key: AppSettings.apiKey, session: session, controller:"view", action:"getsuggestedprograms"};

                this.http.post(AppSettings.apiUrl, data).subscribe((res) => {

                    if (res["success"] === true){

                        this.storage.set("suggestedprograms", res["data"]);

                        resolve(res["data"]);
                    }
                    else{reject(res);}                        

                },(e) => {

                    this.storage.get("suggestedprograms").then((data) => { //offline
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
    
    
    
  public getRecentPrograms(){
        return new Promise((resolve, reject) => {
            
            this.storage.get("session").then((session) => {            

                let data = {key: AppSettings.apiKey, session: session, controller:"view", action:"selectresults", type:"programs", limit:99};

                this.http.post(AppSettings.apiUrl, data).subscribe((res) => {

                    if (res["success"] === true){

                        this.storage.set("recentprograms", res["data"]);

                        resolve(res["data"]);
                    }
                    else{reject(res);}                        

                },(e) => {

                    this.storage.get("recentprograms").then((data) => { //offline
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
            

  public getCreatedPrograms(userId){
        return new Promise((resolve, reject) => {
            
            this.storage.get("session").then((session) => {            

                let data = {key: AppSettings.apiKey, session: session, controller:"view", action:"getprograms", userid:userId};

                this.http.post(AppSettings.apiUrl, data).subscribe((res) => {

                    if (res["success"] === true){

                        this.storage.set("createdprograms", res["data"]);

                        resolve(res["data"]);
                    }
                    else{reject(res);}                        

                },(e) => {

                    this.storage.get("createdprograms").then((data) => { //offline
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
    
    
  public getProgram(programId){
        return new Promise((resolve, reject) => {
            
            this.storage.get("session").then((session) => {            

                let data = {key: AppSettings.apiKey, session: session, controller:"view", action:"getprograms", id:programId};

                this.http.post(AppSettings.apiUrl, data).subscribe((res) => {

                    if (res["success"] === true && res["data"].length > 0){
                        
                        
                        this.storage.set("program" + programId, res["data"][0]);

                        resolve(res["data"][0]);
                    }
                    else{reject(res);}                        

                },(e) => {

                    this.storage.get("program" + programId).then((data) => { //offline
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
    
    
  public addProgram(details){
        return new Promise((resolve, reject) => {
            
            this.storage.get("session").then((session) => {            

                let data = {key: AppSettings.apiKey, session: session, controller:"create", action:"addresults"};
                
                Object.assign(data, details);

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
    
  public addWorkout(workoutId, date){
        return new Promise((resolve, reject) => {
            
            this.storage.get("session").then((session) => {            

                let data = {key: AppSettings.apiKey, session: session, controller:"create", action:"addresults", workoutid:workoutId, assigneddate:date};

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


