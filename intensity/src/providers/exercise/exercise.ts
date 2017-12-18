import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AppSettings} from '../../app/app.settings';
import { Storage } from '@ionic/storage';

/*
  Generated class for the ExerciseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ExerciseProvider {

  constructor(public http: HttpClient, public storage: Storage) {
    console.log('Hello ExerciseProvider Provider');
  }


  public getExercises(){
        return new Promise((resolve, reject) => {
            this.storage.get("exercises").then((exercises) => {
                console.log(exercises);
                if (exercises){
                    resolve(exercises);  
                }
                else {
                    this.storage.get("session").then((session) => {            

                        let data = {key: AppSettings.apiKey, session: session, controller:"view", action:"getexercises"};

                        this.http.post(AppSettings.apiUrl, data).subscribe((res) => {

                            if (res["success"] === true){

                                this.storage.set("exercises", res["data"]);

                                resolve(res["data"]);
                            }
                            else{reject(res);}                        

                        },(e) => {

                            reject(e);      



                        });   
                    }) 
                }  
            })    
        })      
    }
    
    
    
  public getRecentExercises(){
      
        return new Promise((resolve, reject) => {

            this.storage.get("session").then((session) => {            

                let data = {key: AppSettings.apiKey, session: session, controller:"view", action:"selectresults", type:"exercises", limit:99};

                this.http.post(AppSettings.apiUrl, data).subscribe((res) => {

                    if (res["success"] === true){

                        this.storage.set("recentexercises", res["data"]);

                        resolve(res["data"]);
                    }
                    else{reject(res);}                        

                },(e) => {
                    this.storage.get("recentexercises").then((exercises) => {
                        console.log(exercises);
                        if (exercises){
                            resolve(exercises);  
                            return;
                        }
                        reject(e);      
                    })


                });   
            })    
        })    
    } 
    
    
    
    public getRecommendedExercises(){
        return [
            {name:"Squats",id:"2", type:"Squat", musclegroup:"Erector Spinae, Gluteus, Hamstrings, Quadriceps", userid: "5"},
            {name:"Front squats",id:"104", musclegroup: "Gluteus, Quadriceps", type: "Squat", userid: "5"},
            {name:"Bench press",id:"1", type:"Press", musclegroup:"Deltoids, Pectoralis, Triceps", userid: "5"},
            {name:"Incline bench press",id:"105", musclegroup: "Deltoids, Pectoralis, Triceps", type: "Press", userid: "5"},
            {name:"Overhead press",id:"10", type:"Press", musclegroup:"Deltoids, Pectoralis, Triceps", userid: "5"},
            {name:"Deadlifts",id:"6", type:"Deadlift", musclegroup:"Erector Spinae, Gluteus, Hamstrings", userid: "5"},
            {name:"Sumo Deadlift",id:"11", musclegroup: "Erector Spinae, Gluteus, Hamstrings", type: "Deadlift", userid: "5"},
            {name:"Glute ham raise",id:"90", musclegroup: "Gluteus, Hamstrings", type: "", userid: "5"},
            {name:"Pullups",id:"5", type:"Pull", musclegroup:"Latissimus Dorsi, Rhomboids, Biceps", userid: "5"},
            {id: "73", name: "Pulldowns", musclegroup: "Latissimus Dorsi, Rhomboids", type: "Pull", userid: "5"},
            {name:"Bent over rows",id:"111", type:"Pull", musclegroup:"Latissimus Dorsi, Rhomboids", userid: "5"},
            {name:"Dumbell Rows",id:"4", musclegroup: "Latissimus Dorsi, Rhomboids", type: "Pull", userid: "5"},
            {name:"Facepulls",id:"7", musclegroup: "Deltoids, Rhomboids, Trapezius", type: "Pull", userid: "5"},
            {name:"Barbells Curls",id:"3", musclegroup: "Biceps", type: "Isolation", userid: "6"},
            {name:"Weighted Planks",id:"8", musclegroup: "Rectus Abdominis", type: "", userid: "5"},
    
        ];
      
    }    
        
       
    public getExerciseData(exerciseId, date){
        return new Promise((resolve, reject) => {

            this.storage.get("session").then((session) => {            

                let data = {key: AppSettings.apiKey, session: session, controller:"view", action:"getexercisedata", exerciseid:exerciseId, assigneddate:date};

                this.http.post(AppSettings.apiUrl, data).subscribe((res) => {

                    if (res["success"] === true){

                        this.storage.set("exercisedata" + exerciseId + date, res["data"]);

                        resolve(res["data"]);
                    }
                    else{reject(res);}                        

                },(e) => {
                    
                    
                    this.storage.get("exercisedata" + exerciseId + date).then((data) => {
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
    
    
    
    public createExercise(exerciseName){
        return new Promise((resolve, reject) => {

            this.storage.get("session").then((session) => {            

                let data = {key: AppSettings.apiKey, session: session, controller:"create", action:"createexercise", name:exerciseName};

                this.http.post(AppSettings.apiUrl, data).subscribe((res) => {

                    if (res["success"] === true){
                        
                        let exercise = res["data"][0];
                        exercise.exerciseid = exercise.id; 
                        
                        this.storage.get("exercises").then((exercises) => {
                               
                            exercises.push(exercise);
                            this.storage.set("exercises", exercises);
                        });

                        resolve(exercise);
                    }
                    else{reject(res);}                        

                },(e) => {

                    reject(e);

                });   
            }) 
        
        })
    }    
    
    
    public editExercise(exercise){
        return new Promise((resolve, reject) => {

            this.storage.get("session").then((session) => {            

                let data = {key: AppSettings.apiKey, session: session, controller:"edit", action:"updateexercise", id:exercise.exerciseid ? exercise.exerciseid : exercise.id, name:exercise.name, type:exercise.type, musclegroup:exercise.musclegroup};

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
    
    
    public deleteExercise(exercise){
        return new Promise((resolve, reject) => {

            this.storage.get("session").then((session) => {  
                let data = {key: AppSettings.apiKey, session: session, controller:"edit", action:"deleteexercise", id:exercise.exerciseid ? exercise.exerciseid : exercise.id};

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
