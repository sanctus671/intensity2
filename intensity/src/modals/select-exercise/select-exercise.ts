import { Component } from '@angular/core';
import { NavController, ModalController, Platform, NavParams, ViewController, ToastController, AlertController } from 'ionic-angular';

import { ExerciseProvider } from '../../providers/exercise/exercise';
import { Storage } from '@ionic/storage';

import {ExerciseSearchPipe} from '../../pipes/exercise-search';


@Component({
    selector: 'select-exercise',
    templateUrl: 'select-exercise.html'
})

export class SelectExerciseModal {
    
    public exercises:any;
    public recentExercises:any;
    public searchExercises:any;
    public properties: any;
    public loading:any;
    
    constructor(public platform: Platform, public params: NavParams, public viewCtrl: ViewController, private toastCtrl: ToastController, private exerciseProvider: ExerciseProvider, public storage: Storage, private alertCtrl: AlertController) {
        this.properties = {activeTab:"recent", userid:0, search:"", allCount:100};
        this.loading = {all:false,recent:false,search:false};
        
        this.exercises = [];
        this.recentExercises = [];
        this.searchExercises = [];
        this.getExercises();
        this.getRecentExercises();
        
        
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
                    text: 'Select',
                    handler: data => {
                        this.addExercise(exercise);
                   }
                }
            ]
        });
        alert.present();
     
          
    }   

    
    public addExercise(exercise){
        if (exercise.exerciseid){exercise.id = exercise.exerciseid} //for recent exercises
        
        exercise.exerciseid = exercise.id;
        
        this.viewCtrl.dismiss(exercise);
    }
    
       

    public dismiss() {
        this.viewCtrl.dismiss();
    }
}



