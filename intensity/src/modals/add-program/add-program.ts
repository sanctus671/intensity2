import { Component } from '@angular/core';
import { NavController, ModalController, Platform, NavParams, ViewController, ToastController, AlertController } from 'ionic-angular';

import { DiaryProvider } from '../../providers/diary/diary';
import { Storage } from '@ionic/storage';

import {ExerciseSearchPipe} from '../../pipes/exercise-search';
import * as moment from 'moment';

@Component({
    selector: 'add-program',
    templateUrl: 'add-program.html'
})

export class AddProgramModal {
    
    public program: any;
    public startDate: Date;
    public maxes: any;
    public exercises:Array<any>;
    public maxCount:number;
    public options: any;
    public calculator: any;
    public account: any;
    
    constructor(public platform: Platform, public params: NavParams, public viewCtrl: ViewController, private toastCtrl: ToastController, private diaryProvider: DiaryProvider, public storage: Storage, private alertCtrl: AlertController) {
       
        this.storage.get("account").then((data) => {
            this.account = data;
        });         
        
        this.calculator = {reps:"", weight:""}
        
        this.program = params.data.program;
        
        this.startDate = new Date();
        
        this.options = {progressiontype:"", progressionamount: "", progressiontimeframe: "", progressioncycles: "", progressionexercises:{}};
        
        this.getMaxes();
        
        
    }
    
    
    
    private getMaxes(){
        this.maxes = {};
        this.exercises = [];
        this.maxCount = 0;
        for (let workout of this.program.workouts){
            for (let exercise of workout.exercises){
                if (!this.maxes[exercise.exerciseid]){
                    this.maxes[exercise.exerciseid] = exercise
                    this.maxes[exercise.exerciseid]["max"] = "";
                    this.exercises.push(exercise.exerciseid);
                }
                if (!this.options.progressionexercises[exercise.exerciseid]){
                    this.options.progressionexercises[exercise.exerciseid] = "";
                }
            }
        }
        this.diaryProvider.getMaxes(this.exercises).then((data: Array<any>) => {
            for (let exercise of data){
                
                if (exercise["onerm"] && exercise["onerm"] > 0){
                    this.maxes[exercise.exerciseid]["max"] = exercise["onerm"];
                    this.maxCount = this.maxCount + 1;
                }
            }
            console.log(this.maxes);
        })
    }
    
    public calculateMaxes(){
        this.maxCount = 0;
        console.log(this.maxes);
        for (var index in this.maxes){
            let exercise = this.maxes[index];
            console.log(exercise);
            if (exercise["max"] && exercise["max"] > 0){
                this.maxCount = this.maxCount + 1;
            }            
        }
        console.log(this.maxCount);
    }
    
    public selectDate(date){
        this.startDate = date;
    }
    
    public formatDate(date){
        return moment(date).format('MMMM Do YYYY');
    }
    
    public getEndDate(){
        return moment(this.startDate).add(this.program.duration, "days").format('MMMM Do YYYY');
    }
    
    public getMax(){
        let max = 0;
        if (this.calculator.reps < 10){max = Math.round((this.calculator.weight/(1.0278-0.0278*this.calculator.reps))*100) / 100;}
        else{max = Math.round((this.calculator.weight/0.75)*100) / 100;}                       
        return max;         
    }    
    
    public updateFrequency(){
        if (this.options.frequencySelect === "every"){
            this.options.progressiontimeframe = 1;
        }
        else if (this.options.frequencySelect === "everyother"){
            this.options.progressiontimeframe = 2;
        }
    }
    
    public addProgram(){
        this.options.programid = this.program.id;
        this.options.assigneddate = moment(this.startDate).format('YYYY-MM-DD');
        
        for (var index in this.options){
            if (!this.options[index]){
                this.options[index] = null;
            }
        }
        
        this.viewCtrl.dismiss({options: this.options, maxes: this.maxes});
    }
    

    public dismiss() {
        this.viewCtrl.dismiss();
    }
}



