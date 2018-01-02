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
       
        this.exercise = params.data.exercise;
        
    }

    public save() {
        this.viewCtrl.dismiss(this.exercise);
    }        

    public dismiss() {
        this.viewCtrl.dismiss();
    }
}



