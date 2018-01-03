import { Component,ViewChild } from '@angular/core';
import { NavController, Slides, ModalController, Events, AlertController, NavParams, PopoverController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';

import { AccountProvider } from '../../providers/account/account';

import { ProgramProvider } from '../../providers/program/program';

import {ProgramPopover, ProgramWorkoutPopover} from '../program-popover/program-popover';

import { DatePickerDirective } from 'ion-datepicker';
import { AddProgramModal } from '../../modals/add-program/add-program';

import { CreateProgramModal } from '../../modals/create-program/create-program';
import { DiaryProvider } from '../../providers/diary/diary';

@Component({
  selector: 'page-program',
  templateUrl: 'program.html'
})
export class ProgramPage {

    public account: any;
    public program: any;
    public tabs: Array<string>;
    public properties: any;

    
    constructor(public navCtrl: NavController, public params: NavParams, public modalCtrl: ModalController, public storage: Storage, private accountProvider: AccountProvider, public events: Events,private alertCtrl: AlertController, private programProvider: ProgramProvider, public popoverCtrl: PopoverController, private diaryProvider: DiaryProvider) {
        this.properties = {activeTab:"Week 1", loading:true}
        
        this.program = this.params.data.program;
        
        this.tabs = ["Week 1"];
        
        this.storage.get("account").then((data) => {
            this.account = data;
        });        
        
        this.programProvider.getProgram(this.program.id).then((data) =>  {
            console.log(data);
            this.properties.loading = false
            this.program = data;
            this.program.workouts.sort(function(a, b){
                return a.day - b.day;
            }); 
            this.calculateTabs();
        })
        .catch(() => {
            this.properties.loading = false;
        })
       
    }
    
    private calculateTabs(){
        let tabsCount = Math.ceil(parseInt(this.program.duration) / 7);
        console.log(tabsCount);
        if (tabsCount > 1){
            this.tabs = [];
            for (var x = 1; x <= tabsCount; x++ ){
                this.tabs.push("Week " + x)
            }
        }
        console.log(this.tabs);
    }

    
    public isInTab(workout){
        let index = (this.tabs.indexOf(this.properties.activeTab)) + 1;
        let tab = Math.ceil(parseInt(workout.day) / 7);
        
        return index === tab;
        
    }
    
    public openExercise(exercise, workout){
        let message = "";
        
        let reps = exercise.reps ? "Reps: " + exercise.reps + "<br>" : "";
        let sets = exercise.sets ? "Sets: " + exercise.sets + "<br>" : "";
        let weight = exercise.weight && exercise.weight > 0 ? "Weight: " + exercise.weight + "<br>" : "";
        let percentage = exercise.percentage && exercise.percentage > 0 ? "Percentage: " + exercise.percentage + "<br>" : "";
        let rpe = exercise.rpe && exercise.rpe > 0 ? "RPE: " + exercise.rpe + "<br>" : "";
        let notes = exercise.notes ? "Notes: " + exercise.notes : "";
        
        message = reps + sets + weight + percentage + rpe + notes;
        message = message.replace(/^\s*<br\s*\/?>|<br\s*\/?>\s*$/g,'');
        
        console.log(exercise);
        
        let alert = this.alertCtrl.create({
            title:exercise.name,
            subTitle: workout.name,
            message: message,
            buttons: [
                {
                    text: 'Dismiss',
                    role: 'cancel'
                }                               
            ]
        });
        alert.present();           
    }
    
    public openProgramPopover(ev){
        let popover = this.popoverCtrl.create(ProgramPopover, {program: this.program}, {cssClass: "tools-popover"});
        popover.present({
          ev: ev
        });        
    }
    
    public openWorkoutPopover(ev, workout){
        let popover = this.popoverCtrl.create(ProgramWorkoutPopover, {workout: workout}, {cssClass: "tools-popover"});
        popover.present({
          ev: ev
        });        
    }  
    
    public openAddProgram(){
        let modal = this.modalCtrl.create(AddProgramModal, {program:this.program}); 
        modal.onDidDismiss(data => {
            if (data){
                let maxes = data.maxes;
                let details = data.options;
                this.diaryProvider.updateMaxes(maxes).then(() => {
                    this.programProvider.addProgram(details).then(() => {
                        console.log("gere");
                        let alert = this.alertCtrl.create({
                            title:"Program added",
                            subTitle: this.program.name + " has been added to your diary",
                            buttons: [
                                {
                                    text: 'Dismiss',
                                    role: 'cancel'
                                },
                                {
                                    text: 'Go To Diary',
                                    handler: data => {
                                        console.log('clicked');
                                    },
                                }                                
                            ]
                        });
                        alert.present();                         
                    })
                })
                console.log(data);
                
            }
        });
        modal.present();        
    } 
    
    public customizeProgram(){
        let name = this.account.display ? this.account.display : this.account.username;
        
        let customizedProgram = this.deepCopy(this.program);
        customizedProgram.name = name + "'s " + this.program.name;
        customizedProgram.public = false;
        
        let modal = this.modalCtrl.create(CreateProgramModal, {program:customizedProgram}); 
        
        
        
        
        modal.onDidDismiss(program => {
            if (program){
                this.navCtrl.pop(); 
                let alert = this.alertCtrl.create({
                    title:"Program created",
                    subTitle: "Your customized version of " + this.program.name + " program has been added to the database.",
                    buttons: [
                        {
                            text: 'Dismiss',
                            role: 'cancel'
                        }                                
                    ]
                });
                alert.present();  
                console.log("here");              
                this.storage.set("previousProgram", program);
                
                this.programProvider.createProgram(program).then(() => {
                    this.events.publish('programs:modified');
                })
                
                
                console.log(program);
            }
        })        
        
        modal.present();   
        
              
    }
    
    
    private deepCopy(oldObj: any) {
        var newObj = oldObj;
        if (oldObj && typeof oldObj === "object") {
            newObj = Object.prototype.toString.call(oldObj) === "[object Array]" ? [] : {};
            for (var i in oldObj) {
                newObj[i] = this.deepCopy(oldObj[i]);
            }
        }
        return newObj;
    }      

}
