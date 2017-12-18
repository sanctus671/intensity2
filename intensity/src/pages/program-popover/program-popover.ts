import { Component } from '@angular/core';
import { ViewController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';

import { ProgramProvider } from '../../providers/program/program';
import * as moment from 'moment';

@Component({
  template: `
    <ion-list>
      <button ion-item (click)="openProgramDetails()">View Details</button>
      <button ion-item (click)="shareProgram()">Share Program</button>
    </ion-list>
  `
})
export class ProgramPopover {
    
    public program: any;
    
    constructor(public viewCtrl: ViewController, public modalCtrl: ModalController, private alertCtrl: AlertController, private socialSharing: SocialSharing, public params: NavParams) {
        this.program = this.params.data.program;
        
        if (!this.program.workouts){
            this.program.workouts = [];
        }
    }

    close() {
        this.viewCtrl.dismiss();
    }

  
    public openProgramDetails(){
        let alert = this.alertCtrl.create({
            title:this.program.name,
            subTitle: "Created by " + (this.program.display ? this.program.display : this.program.username),
            message: "This program has <strong>" + this.program.workouts.length + " workouts</strong> and lasts a total of <strong>" + this.program.duration + " days</strong>. It has been added <strong>" + this.program.added + " times</strong> by other users.",
            buttons: [
                {
                    text: 'Dismiss',
                    role: 'cancel'
                }
            ]
        });
        alert.present();         
        this.close();
    }



  
    public shareProgram(){
        this.socialSharing
            .share("Check " + this.program.name + " on Intensity", "Workout Program", null, "http://programs.intensityapp.com/#/programs/" + this.program.id);       
        this.close();
    }  
    
}


@Component({
  template: `
    <ion-list>
      <button ion-item (click)="openWorkoutDetails()">View Details</button>
      <button ion-item ion-datepicker (ionChanged)="addWorkout($event)" [okText]="'Add To Diary'">Add Workout</button>
    </ion-list>
  `
})
export class ProgramWorkoutPopover {
    
    public workout: any;
    
    constructor(public viewCtrl: ViewController, public modalCtrl: ModalController, private alertCtrl: AlertController, private socialSharing: SocialSharing, public params: NavParams, private programProvider: ProgramProvider) {
        this.workout = this.params.data.workout;

    }

    close() {
        this.viewCtrl.dismiss();
    }

  
    public openWorkoutDetails(){
        let alert = this.alertCtrl.create({
            title:"Day " + this.workout.day,
            subTitle: this.workout.name,
            message: "Contains " + this.workout.exercises.length + " exercises.",
            buttons: [
                {
                    text: 'Dismiss',
                    role: 'cancel'
                }
            ]
        });
        alert.present();         
        this.close();
    }



  
    public addWorkout(date){
        let startDate = moment(date).format('YYYY-MM-DD');
        console.log(startDate);
        console.log(this.workout.workoutid);
        this.programProvider.addWorkout(this.workout.workoutid, startDate).then(() => {
            let alert = this.alertCtrl.create({
                title:"Workout added",
                subTitle: this.workout.name + " has been added to your diary",
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
        this.close();
    }  
    
}
