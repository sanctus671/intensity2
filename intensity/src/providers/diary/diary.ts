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
export class DiaryProvider {

    constructor(public http: HttpClient, public storage: Storage) {

    }
  
  
  public getWorkout(date){
        return new Promise((resolve, reject) => {
            
            this.storage.get("session").then((session) => {            

                let data = {key: AppSettings.apiKey, session: session, controller:"view", action:"selectresults", assigneddate:date, v2:true};

                this.http.post(AppSettings.apiUrl, data).subscribe((res) => {

                    if (res["success"] === true){

                        this.storage.get("workouts").then((data) => { 
                            let workouts = data ? data : {};
                            workouts[date] = res["data"];
                            this.storage.set("workouts", workouts);
                        });

                        resolve(res["data"]);
                    }
                    else{reject(res);}                        

                },(e) => {

                    this.storage.get("workouts").then((data) => { //offline
                        if (data && (date in data)){
                            resolve(data[date]);
                            return;
                        }
                        reject(e);

                    });            



                });   
            })       
        })      
    }
    
    
    
  public getHistory(page,date,exerciseId){
        return new Promise((resolve, reject) => {
            
            this.storage.get("session").then((session) => {            

                let data = {key: AppSettings.apiKey, session: session, controller:"view", action:"gethistory", exerciseid:exerciseId, assigneddate:date, page:page, limit:50};

                this.http.post(AppSettings.apiUrl, data).subscribe((res) => {

                    if (res["success"] === true){

                        this.storage.set("history" + exerciseId + date + page, data["data"]);

                        resolve(res["data"]);
                    }
                    else{reject(res);}                        

                },(e) => {
                    
                
                    this.storage.get("history" + exerciseId + date + page).then((data) => { //offline
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
    
    public getStats(options){
        return new Promise((resolve, reject) => {
            
            this.storage.get("session").then((session) => {            

                let data = {key: AppSettings.apiKey, session: session, controller:"view", action:"getdata"};
                
                Object.assign(data, options);
                
                if (options["timeframe"] &&  options["timeframe"] === "1 Week"){
                    data["accumulation"] = "Daily"; 
                }
                
                this.http.post(AppSettings.apiUrl, data).subscribe((res) => {

                    if (res["success"] === true){
                        
                        var key = "";
                        for (var index in options){
                            key = key + index;
                        }
                        
                        this.storage.set("stats" + key, data["data"]);

                        resolve(res["data"]);
                    }
                    else{reject(res);}                        

                },(e) => {
                    
                    var key = "";
                    for (var index in options){
                        key = key + index;
                    }    
                                
                    this.storage.get("stats" + key).then((data) => { //offline
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
    
    
    public getRecords(exerciseId){
        return new Promise((resolve, reject) => {
            
            this.storage.get("session").then((session) => {            

                let data = {key: AppSettings.apiKey, session: session, controller:"view", action:"getrecords", exerciseid:exerciseId};

                this.http.post(AppSettings.apiUrl, data).subscribe((res) => {

                    if (res["success"] === true){

                        this.storage.set("records" + exerciseId, data["data"]);

                        resolve(res["data"]);
                    }
                    else{reject(res);}                        

                },(e) => {
                    
                
                    this.storage.get("records" + exerciseId).then((data) => { //offline
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
    
    
  public getWorkoutDates(){
        return new Promise((resolve, reject) => {
            
            this.storage.get("session").then((session) => {            

                let data = {key: AppSettings.apiKey, session: session, controller:"view", action:"getworkoutdates"};

                this.http.post(AppSettings.apiUrl, data).subscribe((res: {data: Array<{assigneddate:string}>, success:boolean}) => {
                    if (res["success"] === true){
                        resolve(res );
                    }
                    else{reject(res);}                        

                },(e) => {
                    

                        reject(e);

                    });            



                });         
        })      
    }      


    public addSet(date,exerciseId, exerciseName, set){
        return new Promise((resolve, reject) => {
            
            this.storage.get("session").then((session) => {            

                let requestData = {key: AppSettings.apiKey, session: session, controller:"create", action:"addresults", assigneddate:date, exerciseid:exerciseId, reps:set.reps, weight:set.weight, sets:set.sets, rpe:set.rpe, percentage:set.percentage};

                this.http.post(AppSettings.apiUrl, requestData).subscribe((res) => {
console.log(res);
                    if (res["success"] === true){

                       this.storage.get("workouts").then((data) => { 
                            let workouts = data ? data : {};
                            
                            let workout = [{exerciseid:exerciseId, name:exerciseName, sets:[set]}];
                            if (date in data){
                                workout = workouts[date];
                            }
                            else{
                                workouts[date] = workout;
                            }                           
                            
                            for (let workoutExercise of workout){
                                if (workoutExercise.exerciseid === exerciseId){
                                    workoutExercise.sets.push(res["data"]);
                                }
                            }

                            this.storage.set("workouts", workouts);
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

                        
                        
                       this.storage.get("workouts").then((data) => { 
                            let workouts = data ? data : {};
                            
                            let workout = [{exerciseid:exerciseId, name:exerciseName, sets:[set]}];
                            if (date in data){
                                workout = workouts[date];
                            }
                            else{
                                workouts[date] = workout;
                            }     
                                                   
                            set["requestId"] = requestId;
                            for (let workoutExercise of workout){
                                if (workoutExercise.exerciseid === exerciseId){
                                    workoutExercise.sets.push(set);
                                }
                            }

                            this.storage.set("workouts", workouts);
                        });                        
 
                                                  
                        reject(e);

                    });            



                });   
            })       
        })         
    }



    public editSet(date,exerciseId, set){
        return new Promise((resolve, reject) => {
            
            this.storage.get("session").then((session) => {            
                
                
                if (set.requestId){
                    this.storage.get("workouts").then((data) => { 
                         let workouts = data;
                         let workout = workouts[date]; //has to exist because this is an update to existing set


                        for (let workoutExercise of workout){
                            if (workoutExercise.exerciseid === exerciseId){
                                for (let existingSet of workoutExercise["sets"]){
                                    if (existingSet.requestId === set.requestId){
                                        Object.assign(existingSet, set); //not sure if this works
                                    }
                                    else if (set.massedit){
                                        existingSet.reps = set.reps; //not sure if this works
                                        existingSet.weight = set.weight; //not sure if this works
                                    }
                                }
                            }
                        }

                         this.storage.set("workouts", workouts);
                     });        
                     
                     
                    this.storage.get("failedRequests").then((data) => { 
                        let requests = data;

                        for (let request of requests){
                            if (request.requestId === set.requestId){
                                let newRequest = {key: AppSettings.apiKey, session: session, controller:"create", action:"addresults"};
                                Object.assign(newRequest, set);
                                request = newRequest; //not sure if this works
                            }
                        }

                        this.storage.set("failedRequests", requests);
                     });                                   
                    
                    return;
                }
                
                let requestData = {key: AppSettings.apiKey, session: session, controller:"edit", action:"changeresults"};
                
                Object.assign(requestData, set);
                
                this.http.post(AppSettings.apiUrl, requestData).subscribe((res) => {
console.log(res);
                    if (res["success"] === true){

                       this.storage.get("workouts").then((data) => { 
                            let workouts = data;
                            let workout = workouts[date]; //has to exist because this is an update to existing set
                          
                            
                            for (let workoutExercise of workout){
                                if (workoutExercise.exerciseid === exerciseId){
                                    for (let existingSet of workoutExercise["sets"]){
                                        if (existingSet.id === set.id){
                                            Object.assign(existingSet, set); //not sure if this works
                                        }
                                        else if (set.massedit){
                                            existingSet.reps = set.reps; //not sure if this works
                                            existingSet.weight = set.weight; //not sure if this works
                                        }
                                    }
                                }
                            }

                            this.storage.set("workouts", workouts);
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
                            let workouts = data;
                            let workout = workouts[date]; //has to exist because this is an update to existing set
                          

                            for (let workoutExercise of workout){
                                if (workoutExercise.exerciseid === exerciseId){
                                    for (let existingSet of workoutExercise["sets"]){
                                        if (existingSet.id === set.id){
                                            Object.assign(existingSet, set); //not sure if this works
                                        }
                                        else if (set.massedit){
                                            existingSet.reps = set.reps; //not sure if this works
                                            existingSet.weight = set.weight; //not sure if this works
                                        }
                                    }
                                }
                            }

                            this.storage.set("workouts", workouts);
                        });                       
 
                                                  
                        reject(e);

                    });            



                });   
            })       
        })         
    }





    public removeSet(date,exerciseId, set){
        return new Promise((resolve, reject) => {
            
            this.storage.get("session").then((session) => {            
                
                
                if (set.requestId){
                    this.storage.get("workouts").then((data) => { 
                         let workouts = data;
                         let workout = workouts[date]; //has to exist because this is an update to existing set


                        for (let workoutExercise of workout){
                            if (workoutExercise.exerciseid === exerciseId){
                                for (var index in workoutExercise["sets"]){
                                    let existingSet = workoutExercise["sets"][index];
                                    if (existingSet.id === set.id){
                                        workoutExercise["sets"].splice(index,1); //not sure if this works
                                    }
                                }
                            }
                        }

                         this.storage.set("workouts", workouts);
                     });        
                     
                     
                    this.storage.get("failedRequests").then((data) => { 
                        let requests = data;

                        for (var index in requests){
                            let request = requests[index];
                            if (request.requestId === set.requestId){
                                requests.splice(index,1); //not sure if this works
                            }
                        }

                        this.storage.set("failedRequests", requests);
                     });                                   
                    
                    return;
                }
                
                let requestData = {key: AppSettings.apiKey, session: session, controller:"edit", action:"removeresults", id:set.id};
                
                
                this.http.post(AppSettings.apiUrl, requestData).subscribe((res) => {
console.log(res);
                    if (res["success"] === true){

                       this.storage.get("workouts").then((data) => { 
                            let workouts = data;
                            let workout = workouts[date]; //has to exist because this is an update to existing set
                          
                            
                            for (let workoutExercise of workout){
                                if (workoutExercise.exerciseid === exerciseId){
                                    for (var index in workoutExercise["sets"]){
                                        let existingSet = workoutExercise["sets"][index];
                                        if (existingSet.id === set.id){
                                            workoutExercise["sets"].splice(index,1); //not sure if this works
                                        }
                                    }
                                }
                            }

                            this.storage.set("workouts", workouts);
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
                            let workouts = data;
                            let workout = workouts[date]; //has to exist because this is an update to existing set
                          

                            for (let workoutExercise of workout){
                                if (workoutExercise.exerciseid === exerciseId){
                                    for (var index in workoutExercise["sets"]){
                                        let existingSet = workoutExercise["sets"][index];
                                        if (existingSet.id === set.id){
                                            workoutExercise["sets"].splice(index,1); //not sure if this works
                                        }
                                    }
                                }
                            }

                            this.storage.set("workouts", workouts);
                        });                       
 
                                                  
                        reject(e);

                    });            



                });   
            })       
        })         
    }
    
    

    public removeExercise(date,exerciseId){
        return new Promise((resolve, reject) => {
            
            this.storage.get("session").then((session) => {            
                
 
                let requestData = {key: AppSettings.apiKey, session: session, controller:"edit", action:"removeresults", exerciseid:exerciseId, assigneddate:date};
                
                
                this.http.post(AppSettings.apiUrl, requestData).subscribe((res) => {
console.log(res);
                    if (res["success"] === true){

                       this.storage.get("workouts").then((data) => { 
                            let workouts = data;
                            let workout = workouts[date]; //has to exist because this is an update to existing set
                          

                            for (var index in workout){
                                let workoutExercise = workout[index];
                                if (workoutExercise.exerciseid === exerciseId){
                                    workout.splice(index,1);
                                }
                            }

                            this.storage.set("workouts", workouts);
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
                            let workouts = data;
                            let workout = workouts[date]; //has to exist because this is an update to existing set
                          
                            
                            for (var index in workout){
                                let workoutExercise = workout[index];
                                if (workoutExercise.exerciseid === exerciseId){
                                    workout.splice(index,1);
                                }
                            }

                            this.storage.set("workouts", workouts);
                        });                       
 
                                                  
                        reject(e);

                    });            



                });   
            })       
        })         
    }    

    public removeProgram(addId){
        return new Promise((resolve, reject) => {
            
            this.storage.get("session").then((session) => {            
                
 
                let requestData = {key: AppSettings.apiKey, session: session, controller:"edit", action:"removeresults", addid:addId};
                
                
                this.http.post(AppSettings.apiUrl, requestData).subscribe((res) => {
console.log(res);
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

    public reorderSets(date,exerciseId, sets){
        return new Promise((resolve, reject) => {
            
            this.storage.get("session").then((session) => {            
                
                
                let requestData = {key: AppSettings.apiKey, session: session, controller:"edit", action:"changeorder", sets:sets};

                
                this.http.post(AppSettings.apiUrl, requestData).subscribe((res) => {

                    if (res["success"] === true){

                       this.storage.get("workouts").then((data) => { 
                            let workouts = data;
                            let workout = workouts[date]; //has to exist because this is an update to existing set
                          
                            
                            let exercise = {};
                            for (let workoutExercise of workout){
                                if (workout.exerciseid === exerciseId){
                                    exercise = workoutExercise;
                                    exercise["sets"] = sets;
                                }
                            }

                            this.storage.set("workouts", workouts);
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
                            let workouts = data;
                            let workout = workouts[date]; //has to exist because this is an update to existing set
                          
                            
                            let exercise = {};
                            for (let workoutExercise of workout){
                                if (workout.exerciseid === exerciseId){
                                    exercise = workoutExercise;
                                    exercise["sets"] = sets;
                                }
                            }

                            this.storage.set("workouts", workouts);
                        });                       
 
                                                  
                        reject(e);

                    });            



                });   
            })       
        })         
    }

    public reorderExercises(date,sets){
        return new Promise((resolve, reject) => {
            
            this.storage.get("session").then((session) => {            
                
                
                let requestData = {key: AppSettings.apiKey, session: session, controller:"edit", action:"changeexerciseorder", sets:sets};

                
                this.http.post(AppSettings.apiUrl, requestData).subscribe((res) => {

                    if (res["success"] === true){          
                        
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

                                                  
                        reject(e);

                    });            



                });   
            })       
        })         
    }

    public copyWorkout(copyData){
        return new Promise((resolve, reject) => {
            
            this.storage.get("session").then((session) => {            
                
                
                let requestData = {key: AppSettings.apiKey, session: session, controller:"create", action:"copyworkout"};
                
                Object.assign(requestData, copyData);
                
                this.http.post(AppSettings.apiUrl, requestData).subscribe((res) => {

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



  public getMaxes(exerciseIds){
        return new Promise((resolve, reject) => {
            
            this.storage.get("session").then((session) => {            

                let data = {key: AppSettings.apiKey, session: session, controller:"view", action:"massgetmax", exerciseids:exerciseIds};

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
    
  public updateMaxes(maxes){
        return new Promise((resolve, reject) => {
            
            this.storage.get("session").then((session) => {            

                let data = {key: AppSettings.apiKey, session: session, controller:"create", action:"massaddstats", maxes:maxes};

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
    
    
    public getExport(userId){
        return new Promise((resolve, reject) => {
            
            this.storage.get("session").then((session) => {            

                let data = {key: AppSettings.apiKey, session: session, controller:"view", action:"getexport",userid:userId};

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
