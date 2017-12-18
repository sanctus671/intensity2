import { Component } from '@angular/core';
import { NavController, ModalController, Platform, NavParams, ViewController, ToastController, AlertController } from 'ionic-angular';
import { DiaryProvider } from '../../providers/diary/diary';

import { Storage } from '@ionic/storage';

import * as moment from 'moment';

@Component({
    selector: 'records',
    templateUrl: 'records.html'
})

export class RecordsModal {
    
    public exercise: any; 
    public properties: any;
    public fullRecords: any;
    public account: any;
    
    constructor(public platform: Platform, public params: NavParams, public viewCtrl: ViewController, private toastCtrl: ToastController,public storage: Storage, private alertCtrl: AlertController, private diaryProvider: DiaryProvider) {
        this.properties = {activeTab:"volume", loading:false};

        this.storage.get("account").then((data) => {
            this.account = data;
        });        
        
                
        this.exercise = this.params.data.exercise;
        
        this.fullRecords = {amrap:[],backoffs:[], overall:[], amrapIndex:0, backoffsIndex:0, overallIndex:0};
        
        this.loadRecords();
    }

   
    public loadRecords(){
        this.properties.loading = true;
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



