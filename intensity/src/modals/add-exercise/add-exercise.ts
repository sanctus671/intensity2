import { Component } from '@angular/core';
import { NavController, ModalController, Platform, NavParams, ViewController, ToastController, AlertController } from 'ionic-angular';

import { ExerciseProvider } from '../../providers/exercise/exercise';
import { Storage } from '@ionic/storage';

import {ExerciseSearchPipe} from '../../pipes/exercise-search';


@Component({
    selector: 'add-exercise',
    templateUrl: 'add-exercise.html'
})

export class AddExerciseModal {
    
    public exercises:any;
    public recentExercises:any;
    public recommendedExercises:any;
    public searchExercises:any;
    public properties: any;
    public loading:any;
    
    constructor(public platform: Platform, public params: NavParams, public viewCtrl: ViewController, private toastCtrl: ToastController, private exerciseProvider: ExerciseProvider, public storage: Storage, private alertCtrl: AlertController) {
        this.properties = {activeTab:"recommended", userid:0, search:"", allCount:100};
        this.loading = {all:false,recent:false,search:false};
        
        this.exercises = [];
        this.recentExercises = [];
        this.recommendedExercises = [];
        this.searchExercises = [];
        this.getExercises();
        this.getRecentExercises();
        this.getRecommendedExercises();
        
        
        this.storage.get("userid").then((data) => {
            this.properties.userid = data;
        });        
        
        
    }
    
    
    public getExercises(){
        this.loading.all = true;

                            
        this.exerciseProvider.getExercises().then((data) => {
            this.exercises = data;
            this.loading.all = false;
            console.log(this.exercises);
        });
    }
    
    public checkOwnership(userid){
        return this.properties.userid === parseInt(userid);
    }
    
    
    public getRecentExercises(){
        this.loading.recent = true;    
        
        this.storage.get("recentexercises").then((exercises) => { //preload from local storage
            if (exercises && this.loading.recent){
                this.recentExercises = exercises;
                if (this.recentExercises.length > 0){
                    this.properties.activeTab = "recent";
                }
            }
        })
                        
        this.exerciseProvider.getRecentExercises().then((data) => {
            this.loading.recent = false; 
            this.recentExercises = data;
            if (this.recentExercises.length > 0){
                this.properties.activeTab = "recent";
            }
        });
    }   
    
    
    
    public getRecommendedExercises(){      
        this.recommendedExercises = this.exerciseProvider.getRecommendedExercises();
    }     
    
    
    public searchStarted(){
        this.properties.activeTab = 'all';
    }
    
    public searchCancelled(){
        this.properties.search = '';
    } 
    

    public openViewDetails(ev, exercise){
        ev.preventDefault();
        ev.stopPropagation();      

        let alert = this.alertCtrl.create({
            title: exercise.name,
            message: "<strong>Musclegroups:</strong> " + exercise.musclegroup + "<br><strong>Exercise Types:</strong> "  + exercise.type,
            buttons: [
                {
                    text: 'Dismiss',
                    role: 'cancel'
                },
                {
                    text: 'Add',
                    handler: data => {
                        this.addExercise(exercise);
                   }
                }
            ]
        });
        alert.present();
     
          
    }   
    
    public createExercise(exerciseName){
        this.exerciseProvider.createExercise(exerciseName).then((exercise) => { 
            this.storage.remove("exercises");   
            this.getExercises();                    
            this.addExercise(exercise); 
        })
        .catch(() => {
            let alert = this.alertCtrl.create({
                title: "Exercise Exists",
                message: "This exercise already exists in the exercise database.",
                buttons: [
                    {
                        text: 'OK',
                        role: 'cancel'
                    }
                ]
            });
            alert.present();            
        })
    }
    
    
    public openEditExercise(ev, exercise){
        ev.preventDefault();
        ev.stopPropagation();
        
        let alert = this.alertCtrl.create({
            title: exercise.name,
            inputs: [
                {
                    name: 'name',
                    placeholder: 'Name',
                    type: "text",
                    value:exercise.name
                },
                {
                    name: 'type',
                    placeholder: 'Exercise Types',
                    type: 'text',
                    value: exercise.type
                },
                {
                    name: 'musclegroup',
                    placeholder: 'Musclegroups',
                    type: 'text',
                    value: exercise.musclegroup
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel'
                },
                {
                    text: 'Save',
                    handler: data => {
                        Object.assign(exercise,data);
                        this.exerciseProvider.editExercise(exercise).then(() => {
                            this.storage.remove("exercises");
                            this.getExercises();
                            this.exerciseProvider.getRecentExercises().then((data) => {
                                this.recentExercises = data;
                            });                                                      
                        });
                   }
                }
            ]
        });
        alert.present();        
        
    }
    
    public openDeleteExercise(ev,exercise, index){
        
        ev.preventDefault();
        ev.stopPropagation();        
        
        let alert = this.alertCtrl.create({
            title: 'Confirm Deletion',
            message: 'Are you sure you want to remove ' + exercise.name + ' from the exercise database?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel'
                },
                {
                    text: 'Yes',
                    handler: () => {
                        if (this.properties.activeTab === "recommended"){
                            this.recommendedExercises.splice(index,1);
                        }
                        else if (this.properties.activeTab === "recent"){
                            this.recentExercises.splice(index,1);
                        }
                        else if (this.properties.activeTab === "all"){
                            this.exercises.splice(index,1)
                        }
                        
                        this.properties.search = "";
                        this.exerciseProvider.deleteExercise(exercise).then(() => {
                            this.storage.remove("exercises");
                            this.getExercises();
                            this.exerciseProvider.getRecentExercises().then((data) => {
                                this.recentExercises = data;
                            });                         
                        });
                    }
                }
            ]
        });
        alert.present();        
    }
    
    public addExercise(exercise){
        if (exercise.exerciseid){exercise.id = exercise.exerciseid} //for recent exercises
        this.viewCtrl.dismiss(exercise);
    }
    
       

    public dismiss() {
        this.viewCtrl.dismiss();
    }
}



