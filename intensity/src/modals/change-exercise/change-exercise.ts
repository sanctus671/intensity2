import { Component } from '@angular/core';
import { NavController, ModalController, Platform, NavParams, ViewController, ToastController, AlertController } from 'ionic-angular';

import { ExerciseProvider } from '../../providers/exercise/exercise';
import { Storage } from '@ionic/storage';

import {ExerciseSearchPipe} from '../../pipes/exercise-search';


@Component({
    selector: 'change-exercise',
    templateUrl: 'change-exercise.html'
})

export class ChangeExerciseModal {

    public recentExercises:any;
    public properties: any;
    public loading:any;
    public musclegroups: any;
    public exerciseTypes: any;
    
    constructor(public platform: Platform, public params: NavParams, public viewCtrl: ViewController, private toastCtrl: ToastController, private exerciseProvider: ExerciseProvider, public storage: Storage, private alertCtrl: AlertController) {
        this.properties = {userid:0, search:"", activeTab: "exercises"};
        this.loading = {recent:false};

        this.recentExercises = this.params.data.exercises;
        this.musclegroups = ["Rectus Abdominis", "Biceps", "Deltoids", "Erector Spinae", "Gastrocnemius", "Soleus","Gluteus","Hamstrings","Latissimus Dorsi","Rhomboids","Obliques","Pectoralis","Quadriceps","Trapezius","Triceps","Forearms"];
        this.exerciseTypes = ["Squat", "Press", "Deadlift", "Pull", "Isolation"];
        
        
        if (!this.recentExercises){
            this.getRecentExercises();
        }
        
        
        this.storage.get("userid").then((data) => {
            this.properties.userid = data;
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
                        this.selectExercise(exercise);
                   }
                }
            ]
        });
        alert.present();
     
          
    }   
    


    
    public selectExercise(exercise){
        if (exercise.exerciseid){exercise.id = exercise.exerciseid} //for recent exercises
        this.viewCtrl.dismiss(exercise);
    }
    
    public selectExerciseType(type){
        this.viewCtrl.dismiss({selectedType:type});
    }
    
    public selectMusclegroup(musclegroup){
        this.viewCtrl.dismiss({selectedMusclegroup:musclegroup});
    }
    
       

    public dismiss() {
        this.viewCtrl.dismiss();
    }
}



