import { Component,ViewChild } from '@angular/core';
import { NavController, ModalController, Platform, NavParams, ViewController, ToastController, AlertController,Content } from 'ionic-angular';

import { DiaryProvider } from '../../providers/diary/diary';
import { Storage } from '@ionic/storage';


@Component({
    selector: 'edit-program-exercise',
    templateUrl: 'edit-program-exercise.html'
})

export class EditProgramExerciseModal {
    public exercise: any;

    
    constructor(public platform: Platform, public params: NavParams, public viewCtrl: ViewController, private toastCtrl: ToastController, private diaryProvider: DiaryProvider, public storage: Storage, private alertCtrl: AlertController, public modalCtrl: ModalController) {
       
        this.exercise = {};
        
        Object.assign(this.exercise, params.data.exercise)
        this.exercise.rpeScaled = this.exercise.rpe ? parseFloat(this.exercise.rpe) * 10 : 80;        
        
    }
    
    
    public changeRpe(amount){
        this.exercise.rpeScaled = this.exercise.rpeScaled + amount;
        if (this.exercise.rpeScaled < 60){
            this.exercise.rpeScaled = 60;
        }
        else if (this.exercise.rpeScaled > 100){
            this.exercise.rpeScaled = 100;
        }
    }
    
    
    private determinePercentage(){
        let percentages = {0:0,1:100,2:95,3:90,4:88,5:86,6:83,7:80,8:78,9:76,10:75,11:72,12:70,13:66,14:63,15:60};
        let repRounded = Math.floor(this.exercise.reps);
        this.exercise.percentage =  repRounded > 15 ? 50 : percentages[repRounded];;
    }     
    

    public save() {
        
        this.exercise.rpe = this.exercise.rpeScaled / 10;
        this.viewCtrl.dismiss(this.exercise);
    }        

    public dismiss() {
        this.viewCtrl.dismiss();
    }
}



