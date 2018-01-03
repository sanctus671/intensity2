import { Component,ViewChild } from '@angular/core';
import { NavController, ModalController, Platform, NavParams, ViewController, ToastController, AlertController,Content } from 'ionic-angular';

import { DiaryProvider } from '../../providers/diary/diary';
import { Storage } from '@ionic/storage';

import {ExerciseSearchPipe} from '../../pipes/exercise-search';
import * as moment from 'moment';

import {SelectExerciseModal} from '../../modals/select-exercise/select-exercise';

import {EditProgramExerciseModal} from '../../modals/edit-program-exercise/edit-program-exercise';

import { ProgramProvider } from '../../providers/program/program';

@Component({
    selector: 'edit-program',
    templateUrl: 'edit-program.html'
})

export class EditProgramModal {
    @ViewChild(Content) content: Content;
    public program: any;
    public account:any;
    public tabs: Array<any>;
    public properties: any;
    
    
    constructor(public platform: Platform, public params: NavParams, public viewCtrl: ViewController, private toastCtrl: ToastController, private diaryProvider: DiaryProvider, public storage: Storage, private alertCtrl: AlertController, public modalCtrl: ModalController, private programProvider: ProgramProvider) {
       
        this.properties = {activeTab:"Week 1", loading:true};
        
        this.storage.get("account").then((data) => {
            this.account = data;
        });         
        
   


        this.program = this.params.data.program;
        
        this.program.public = parseInt(this.program.public);
        
        console.log(this.program);
        this.programProvider.getProgram(this.program.id).then((data) =>  {
            console.log(data);
            this.properties.loading = false
            this.program = data;
            this.program.public = parseInt(this.program.public);
            this.program.workouts.sort(function(a, b){
                return a.day - b.day;
            }); 
            console.log(this.program);
            this.calculateTabs();
        })
        .catch(() => {
            this.properties.loading = false;
        })        
        
        
        this.tabs = [];
        
        this.calculateTabs();
        
    }
    

    private calculateTabs(){
        let tabsCount = Math.ceil(parseInt(this.program.duration) / 7);
        console.log(tabsCount);
        this.tabs = [];
        for (var x = 1; x <= tabsCount; x++ ){
            this.tabs.push("Week " + x)
        }
        console.log(this.tabs);
    }

    
    public isInTab(workout){
        let index = (this.tabs.indexOf(this.properties.activeTab)) + 1;
        let tab = Math.ceil(parseInt(workout.day) / 7);
        
        return index === tab;
        
    }  

    public addWeek(){
        this.program.duration += 7;
        this.calculateTabs();
    } 
     
    
    public openWeekOptions(week, index){
        let alertObj = {
              title: week,
              cssClass: "button-only-alert",
              buttons: [        
                {
                  text: 'Copy',
                  handler: data => {

                    this.addWeek();
                    let newWeekStartDay = (this.tabs.length * 7) - 7;
                    console.log(newWeekStartDay);
                      
                    let copyWeekStartDay = (parseInt(index) * 7) + 1;
                    let copyWeekEndDay = copyWeekStartDay + 6;
                    
                    for (let workout of this.program.workouts){
                        if (workout.day >= copyWeekStartDay && workout.day <= copyWeekEndDay){
                            let copy = Object.assign({}, workout);
                            copy.day += newWeekStartDay;
                            copy.name = "Day " + copy.day;
                            this.program.workouts.push(copy);
                        }
                    }
                    
                },
                cssClass: "copy-button"
              },          
              {
                text: 'Move',
                handler: data => {
                    let week = parseInt(index) + 1;
                    let alertObj = {
                        title: "Move Week " + week,
                        message:"Enter where you want this week to move to. Other weeks will adjust automatically.",
                        buttons: [        
                          {
                            text: 'Cancel',
                            role: 'cancel'
                          },          
                          {
                            text: 'Move',
                            handler: data => {
                                let moveToWeek = parseInt(data.week);
                                
                                if (moveToWeek === week){ //dont need to move
                                    return;
                                }
                                
                                if (moveToWeek > (this.tabs.length)){
                                    while(moveToWeek > (this.tabs.length)){
                                        this.addWeek();
                                        console.log(this.tabs);
                                    }
                                }
                                
                                
                                let daysChange = (moveToWeek - week) * 7;

                                let moveWeekStartDay = (parseInt(index) * 7) + 1;
                                let moveWeekEndDay = moveWeekStartDay + 6;

                                let newWeekStartDay = moveWeekStartDay + daysChange;
                                let newWeekEndDay = moveWeekEndDay + daysChange;


                                for (let workout of this.program.workouts){
                                    if (workout.day >= moveWeekStartDay && workout.day <= moveWeekEndDay){
                                        workout.day += daysChange;
                                    }
                                    else if (daysChange > 0 && (workout.day >= moveWeekStartDay && workout.day <= newWeekEndDay)){
                                        workout.day -=7;
                                    }
                                    else if (daysChange < 0 && (workout.day >= newWeekStartDay && workout.day <= moveWeekEndDay)){
                                        workout.day +=7;
                                    }
                                }                                
                                
                                
                                
                                
                            }
                          }
                        ],
                        inputs:[{name:"week", placeholder:"Week", type:"number", value: "" + week}]
                    };


                    let alert = this.alertCtrl.create(alertObj);
                    setTimeout(() => { //timeout to remove glitchy popup show while other is closing
                        alert.present(); 
                    },200);                     
                },
                cssClass: "reorder-button"
              },
              {
                text: 'Remove',
                handler: data => {
                    console.log(week);
                    let alert = this.alertCtrl.create({
                        title:"Remove " + week,
                        message: "Are you sure you want to remove this week? This will delete all workouts that belong to this week.",
                        buttons: [
                            {
                                text: 'Cancel',
                                role: 'cancel'
                            },
                            {
                                text: 'Yes',
                                handler: data => {   
                                    
                                    //TODO: there is a bug here
                                    
                                    //delete all workouts within range of deleted week
                                    //subtract 7 from all workouts that follow deleted week
                                    let weekStartDay = (parseInt(index) * 7) + 1;
                                    let weekEndDay = weekStartDay + 6;     
                                    
                                    for (let x = this.program.workouts.length - 1; x >= 0; x--){
                                        let workout = this.program.workouts[0];
                                        if (workout.day >= weekStartDay && workout.day <= weekEndDay){
                                            this.program.workouts.splice(x,1);
                                        }
                                        else if (workout.day > weekEndDay){
                                            workout.day -= 7;
                                        }
                                    }    
                                    
                                    
                                    this.program.duration -= 7;
                                    
                                    if (this.program.duration < 7){ //dont have an empty program
                                        this.program.duration = 7;
                                        this.program.workouts = [{day:1, name:"Day 1", exercises:[]}];
                                    }
                                    
                                    
                                    this.calculateTabs(); 
                                    
                                    
                                    console.log(this.program);                                                                                                        
                                 }
                             
                               
                            }
                        ]
                    });
                    setTimeout(() => { //timeout to remove glitchy popup show while other is closing
                        alert.present(); 
                    },200);                      
                    
                },
                cssClass: "remove-button"
              }
            ]
        };
 
        
        let alert = this.alertCtrl.create(alertObj);
        alert.present();        
    }
    
    public addWorkout(){
        
        let weekIndex = this.tabs.indexOf(this.properties.activeTab);
        let weekStartDay = (weekIndex * 7) + 1;
        let weekEndDay = weekStartDay + 6;        

        let newDay = weekStartDay;
        
        for (let workout of this.program.workouts){
            if (workout.day >= weekStartDay && workout.day <= weekEndDay){
                newDay = workout.day + 1;
            }
        }        
        
        if (newDay > weekEndDay){
            newDay = weekEndDay;
        }        
        
        this.program.workouts.push({name:"Day " + newDay, day:newDay, exercises:[]});
        setTimeout(()=>{this.content.scrollToBottom();},200);
    }   


    
    public copyWorkout(workout){
        let alertObj = {
            title: "Copy " + workout.name,
            message:"Select the workouts you want to copy to.",
            buttons: [        
              {
                text: 'Cancel',
                role: 'cancel'
              },          
              {
                text: 'Copy',
                handler: data => {
                    let exerciseCount = workout.exercises.length;
                    for (let workoutIndex of data){
                        for (let x = 0; x < exerciseCount; x++){
                            let exercise = workout.exercises[x];
                            let copy = Object.assign({}, exercise);
                            this.program.workouts[workoutIndex].exercises.push(copy);
                        }
                    }
                }
              }
            ],
            inputs:[]
        };

        let inputs = [];

        for (var index in this.program.workouts){
            let workout = this.program.workouts[index];
            inputs.push({name:"workout-" + index, label:workout.name, value:index, type:"checkbox"});
        }
        
        alertObj.inputs = inputs;
        
        let alert = this.alertCtrl.create(alertObj);
        alert.present();         
    } 
    
    public moveWorkout(workout){
        console.log("move");
        
        //TODO: kind of words but there is a bug
        let alertObj = {
            title: "Move " + workout.name,
            message:"Enter what day you want to move this workout to.",
            buttons: [        
              {
                text: 'Cancel',
                role: 'cancel'
              },          
              {
                text: 'Move',
                handler: data => {
                    if (data.day && data.name){
                        console.log(data);
                        workout.day = data.day;
                        workout.name = data.name;

                        if (workout.day > this.program.duration){
                            let newDuration = ((workout.day % 7) + 1) * 7;
                            this.program.duration = newDuration;

                            this.calculateTabs();
                        }
                    }
                    
                }
              }
            ],
            inputs:[{name:"name", placeholder:"Workout Name", type:"text", value: workout.name}, {name:"day", placeholder:"Day", type:"number", value: workout.day}]
        };


        let alert = this.alertCtrl.create(alertObj);
        alert.present();          
    }
    
    
    
    public editWorkout(workout){
        console.log("edit");
        let alertObj = {
            title: "Edit Workout Name",
            buttons: [        
              {
                text: 'Cancel',
                role: 'cancel'
              },          
              {
                text: 'Update',
                handler: data => {
                    if (data.name){
                        workout.name = data.name;
                    }
                }
              }
            ],
            inputs:[{name:"name", placeholder:"Workout Name", type:"text", value: workout.name}]
        };


        let alert = this.alertCtrl.create(alertObj);
        alert.present();        
    }
    
    public deleteWorkout(index,workout){
        console.log("remove workout");
        let alert = this.alertCtrl.create({
            title:"Remove " + workout.name,
            message: "Are you sure you want to remove this workout? This will delete all exercises that belong to this workout.",
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel'
                },
                {
                    text: 'Yes',
                    handler: data => {   
                        this.program.workouts.splice(index,1);
                     }

                }
            ]
        });
        alert.present();         
    }    
    
    public addExercise(workout){
        let modal = this.modalCtrl.create(SelectExerciseModal); 
        modal.onDidDismiss(exercise => {
            if (exercise){
                workout.exercises.push(exercise);
            }
        })
        modal.present();          
    }
    
    public copyExercise(ev, exercise, workout){        
        ev.stopPropagation();
        ev.preventDefault();  
        console.log("copy");
        
        let alertObj = {
            title: "Copy " + exercise.name,
            message:"Select the workouts you want to copy to.",
            buttons: [        
              {
                text: 'Cancel',
                role: 'cancel'
              },          
              {
                text: 'Copy',
                handler: data => {
                    for (let workoutIndex of data){                           
                        let copy = Object.assign({}, exercise);
                        this.program.workouts[workoutIndex].exercises.push(copy);                  
                    }
                }
              }
            ],
            inputs:[]
        };

        let inputs = [];

        for (var index in this.program.workouts){
            let workout = this.program.workouts[index];
            inputs.push({name:"workout-" + index, label:workout.name, value:index, type:"checkbox"});
        }
        
        alertObj.inputs = inputs;
        
        let alert = this.alertCtrl.create(alertObj);
        alert.present();         
        
        
    }
    
    public editExercise(ev, exercise){        
        ev.stopPropagation();
        ev.preventDefault(); 
        let modal = this.modalCtrl.create(EditProgramExerciseModal, {exercise:exercise}); 
        modal.onDidDismiss(updatedExercise => {
            if (updatedExercise){
                Object.assign(exercise,updatedExercise);
            }
        })
        modal.present();          
        console.log("edit");
    }
    
    public deleteExercise(ev, index, workout){        
        ev.stopPropagation();
        ev.preventDefault();  
        console.log("delete");
        workout.exercises.splice(index,1);
    }
    
    public reorderItems(indexes, workout){
        let element = workout.exercises[indexes.from];
        workout.exercises.splice(indexes.from, 1);
        workout.exercises.splice(indexes.to, 0, element);

    }   
    
    

    public update() {
        this.viewCtrl.dismiss(this.program);
    }


    public dismiss() {
        
        let alertObj = {
            title: "Wait!",
            message:"By leaving, you will lose your current changes.",
            buttons: [        
              {
                text: 'Cancel',
                role: 'cancel'
              },          
              {
                text: 'Continue',
                handler: data => {
                    this.viewCtrl.dismiss();
                }
              }
            ]
        };
        let alert = this.alertCtrl.create(alertObj);
        alert.present();         
        
    }
}



