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
export class BodyweightProvider {

    constructor(public http: HttpClient, public storage: Storage) {

    }
  
  
  public getBodyweights(){
        return new Promise((resolve, reject) => {
            
            this.storage.get("session").then((session) => {            

                let data = {key: AppSettings.apiKey, session: session, controller:"view", action:"getbodyweights"};

                this.http.post(AppSettings.apiUrl, data).subscribe((res) => {

                    if (res["success"] === true){

                        this.storage.set("bodyweights", res["data"]);

                        resolve(res["data"]);
                    }
                    else{reject(res);}                        

                },(e) => {

                    this.storage.get("bodyweights").then((data) => { //offline
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
    



    public addBodyweight(weight){
        return new Promise((resolve, reject) => {
            
            this.storage.get("session").then((session) => {            

                let requestData = {key: AppSettings.apiKey, session: session, controller:"create", action:"savebodyweight", weight:weight};

                this.http.post(AppSettings.apiUrl, requestData).subscribe((res) => {

                    if (res["success"] === true){

                       this.storage.get("bodyweights").then((data) => { 
                            let bodyweights = data ? data : {};
                            
                            bodyweights.push(res["data"]);

                            this.storage.set("bodyweights", bodyweights);
                        });
                        
                        
                        resolve(res["data"]);
                    }
                    else{reject(res);}                        

                },(e) => {
                    
                
                    this.storage.get("failedRequests").then((data) => { //offline
                        let requests = data ? data : [];
                        let requestId = requests.length > 0 ? requests[requests.length - 1].id + 1 : 1;
                        requestData["id"] = requestId;
                        requests.push(requestData);
                        this.storage.set("failedRequests", requests);  

                        
                        
                       this.storage.get("bodyweights").then((data) => { 
                            let bodyweights = data ? data : {};
                            
                            bodyweights.push({weight:weight, created:new Date(), requestId: requestId})

                            this.storage.set("workouts", bodyweights);
                        });                        
 
                                                  
                        reject(e);

                    });            



                });   
            })       
        })         
    }




    public removeBodyweight(bodyweight){
        return new Promise((resolve, reject) => {
            
            this.storage.get("session").then((session) => {            
                
                
                if (bodyweight.requestId){
                    this.storage.get("workouts").then((data) => { 
                         let bodyweights = data;


                        for (var index in bodyweights){
                            if (bodyweights[index].requestId === bodyweight.requestId){
                                bodyweights.splice(index,1);
                                break;
                            }
                        }

                        this.storage.set("bodyweights", bodyweights);
                     });        
                     
                     
                    this.storage.get("failedRequests").then((data) => { 
                        let requests = data;

                        for (var index in requests){
                            let request = requests[index];
                            if (request.requestId === bodyweight.requestId){
                                requests.splice(index,1); //not sure if this works
                            }
                        }

                        this.storage.set("failedRequests", requests);
                     });                                   
                    
                    return;
                }
                
                let requestData = {key: AppSettings.apiKey, session: session, controller:"edit", action:"removebodyweight", id:bodyweight.id};
                
                
                this.http.post(AppSettings.apiUrl, requestData).subscribe((res) => {

                    if (res["success"] === true){

                       this.storage.get("bodyweights").then((data) => { 
                            let bodyweights = data;


                           for (var index in bodyweights){
                               if (bodyweights[index].id === bodyweight.id){
                                   bodyweights.splice(index,1);
                                   break;
                               }
                           }

                           this.storage.set("bodyweights", bodyweights);
                        });
                        
                        
                        resolve(res["data"]);
                    }
                    else{reject(res);}                        

                },(e) => {
                    
                
                    this.storage.get("failedRequests").then((data) => { //offline
                        let requests = data ? data : [];
                        let requestId = requests.length > 0 ? requests[requests.length - 1].id + 1: 1;
                        requestData["id"] = requestId;
                        requests.push(requestData);
                        this.storage.set("failedRequests", requests);  

                        
                        
                       this.storage.get("workouts").then((data) => { 
                            let bodyweights = data;
                            
                           for (var index in bodyweights){
                               if (bodyweights[index].id === bodyweight.id){
                                   bodyweights.splice(index,1);
                                   break;
                               }
                           }

                            this.storage.set("workouts", bodyweights);
                        });                       
 
                                                  
                        reject(e);

                    });            



                });   
            })       
        })         
    }
    
    

}
