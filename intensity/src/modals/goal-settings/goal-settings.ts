import { Component } from '@angular/core';
import { NavController, ModalController, Platform, NavParams, ViewController, ToastController, AlertController } from 'ionic-angular';

import { ExerciseProvider } from '../../providers/exercise/exercise';
import { Storage } from '@ionic/storage';

import {ExerciseSearchPipe} from '../../pipes/exercise-search';
import * as moment from 'moment';

import {SelectExerciseModal} from '../../modals/select-exercise/select-exercise';

import { AccountProvider } from '../../providers/account/account';

@Component({
    selector: 'goal-settings',
    templateUrl: 'goal-settings.html'
})

export class GoalSettingsModal {
    public account:any;
    
    constructor(public platform: Platform, public params: NavParams, public viewCtrl: ViewController, private toastCtrl: ToastController, private exerciseProvider: ExerciseProvider, public storage: Storage, private alertCtrl: AlertController, public modalCtrl: ModalController, private accountProvider: AccountProvider) {
        this.account = {goals:{}};
        
        
        this.storage.get("account").then((data) => {
            console.log(data);
            this.account = data;
            
            if (this.account.goals.custom_date_timeframe){
                this.account.goals.day = moment(this.account.goals.custom_date_timeframe).format("dddd").toLowerCase();
            }
            
        });         
        
    }
    
    public updateSettings(){
        this.storage.set("account",this.account);
        let formatted = {primarygoal:this.account.goals.primary, targetgoal:this.account.goals.target, targetcustomgoal:this.account.goals.custom_target, timeframegoal:this.account.goals.timeframe, timeframecustomgoal:this.account.goals.custom_timeframe, timeframecustomdategoal: this.account.goals.custom_date_timeframe, groupinggoal:this.account.goals.grouping};
        
        this.accountProvider.updateSettings(formatted,this.account.id);
    }
    
    public setTimeframeDay(){
        let date = moment().day(this.account.goals.day).format('YYYY-MM-DD');
        this.account.goals.custom_date_timeframe = date;
        this.updateSettings();
    }
    
    public openSelectExercise(target){
        let modal = this.modalCtrl.create(SelectExerciseModal); 
        modal.onDidDismiss(exercise => {
            if (exercise){
                target.exerciseid = exercise.id;
                target.name = exercise.name;
                this.updateTarget(target);
                
            }
        })
        modal.present();         
    }
    
    public createTarget(){
        let target = {id:null, exerciseid:"",name:"",target:""};
        this.account.goals.exercise_targets.push(target);
        this.storage.set("account", this.account);
        //create target
        this.accountProvider.addTarget(this.account.id).then((data:any) => {
            target.id = data.id;
        });
        
    }
    
    public deleteTarget(index, target){
        this.account.goals.exercise_targets.splice(index,1);
        this.storage.set("account", this.account);
        //delete target
        this.accountProvider.removeTarget(target,this.account.id);
        
    }
    
    public updateTarget(target){
        //update target
        this.storage.set("account", this.account);
        this.accountProvider.updateTarget(target,this.account.id);
    }
       

    public dismiss() {
        this.viewCtrl.dismiss();
    }
}



