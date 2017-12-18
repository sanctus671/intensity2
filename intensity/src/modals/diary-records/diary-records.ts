import { Component } from '@angular/core';
import { NavController, ModalController, Platform, NavParams, ViewController, ToastController, AlertController } from 'ionic-angular';
import { DiaryProvider } from '../../providers/diary/diary';

import { Storage } from '@ionic/storage';

import * as moment from 'moment';

@Component({
    selector: 'diary-records',
    templateUrl: 'diary-records.html'
})

export class DiaryRecordsModal {
    
    public exercise: any; 
    public properties: any;
    public fullRecords: any;
    public localRecords: any;
    
    constructor(public platform: Platform, public params: NavParams, public viewCtrl: ViewController, private toastCtrl: ToastController,public storage: Storage, private alertCtrl: AlertController, private diaryProvider: DiaryProvider) {
        this.properties = {activeTab:"today", loading:false, loaded:false};
        
        this.exercise = this.params.data.exercise;
        
        this.fullRecords = {amrap:[],backoffs:[], overall:[], amrapIndex:0, backoffsIndex:0, overallIndex:0};
        
        this.calculateRecords();
    }
    
    public calculateRecords(){
        console.log(this.exercise);
        this.localRecords = {
            maxReps: 0,
            maxWeight: 0,
            currentVolume: 0,
            estimatedMax: 0
        };
        
        for (let set of this.exercise.sets){
            if (set.reps > this.localRecords.maxReps){
                this.localRecords.maxReps = set.reps; 
            }
            if (set.weight > this.localRecords.maxWeight && parseFloat(this.exercise.records.overall.rep) === set.reps){
                this.localRecords.maxWeight = set.weight;
            }
            
            let estimatedMax = this.calculate1RM(set.reps, set.weight);
            if (estimatedMax > this.localRecords.estimatedMax){
                this.localRecords.estimatedMax  = estimatedMax;
            }
            
            this.localRecords.currentVolume = this.localRecords.currentVolume + (set.weight * set.reps);
        }
        
    }
    
    public calculate1RM(reps, weight){
        let max = 0;
        if (reps < 10){max = Math.round((weight/(1.0278-0.0278*reps))*100) / 100;}
        else{max = Math.round((weight/0.75)*100) / 100;}                        
        return max;        
    }    
    
    public tabChanged(ev){
        //get full records
        if (!this.properties.loaded){
            this.properties.loading = true;
            this.properties.loaded = true;
            this.diaryProvider.getRecords(this.exercise.exerciseid).then((data) => {
                console.log(data);
                this.fullRecords.amrap = data["amrap"];
                this.fullRecords.overall = data["overall"];
                this.fullRecords.backoffs = data["backoffs"];
                this.fullRecords.amrapIndex = this.generateRandomIndex(this.fullRecords.amrap.length -1);
                this.fullRecords.overallIndex = this.generateRandomIndex(this.fullRecords.overall.length -1);
                this.fullRecords.backoffsIndex = this.generateRandomIndex(this.fullRecords.backoffs.length -1);
                this.properties.loading = false;
            }).catch((e) => {
                this.properties.loading = false;
            })
        }
    }
    
    private generateRandomIndex(max){
        let min = 0;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    public viewRecord(record){
        
        let randomDescriptors = ["glorious", "gainful", "powerful", "fantastic", "tremdious", "sickening"];
        
        let alert = this.alertCtrl.create({
            title:moment(record.assigneddate).format('MMMM Do YYYY'),
            message: "Your acheived this record on this date. It was a " + randomDescriptors[this.generateRandomIndex(5)] + " " + moment(record.assigneddate).format('dddd') + ".",
            buttons: [
                {
                    text: 'Dismiss',
                    role: 'cancel'
                },
                {
                    text: 'Go to date',
                    handler: data => {
                       
                   }
                }
            ]
        });
        alert.present();        
    }     

    public dismiss() {
        this.viewCtrl.dismiss();
    }
}



