import { Component } from '@angular/core';
import { NavController, ModalController, Platform, NavParams, ViewController, ToastController, AlertController } from 'ionic-angular';


import { Storage } from '@ionic/storage';



@Component({
    selector: 'edit-set',
    templateUrl: 'edit-set.html'
})

export class EditSetModal {

    public set: any;
    public exercise: any;
    public properties: any;
    constructor(public platform: Platform, public params: NavParams, public viewCtrl: ViewController, private toastCtrl: ToastController,public storage: Storage, private alertCtrl: AlertController) {

        this.set = {};
        Object.assign(this.set, this.params.data.set)
        this.set.rpeScaled = parseFloat(this.set.rpe) * 10;
        this.exercise = this.params.data.exercise;
        this.set.updateAll = false;
        
        
    }
    
    
    
    public changeRpe(amount){
        this.set.rpeScaled = this.set.rpeScaled + amount;
        if (this.set.rpeScaled < 60){
            this.set.rpeScaled = 60;
        }
        else if (this.set.rpeScaled > 100){
            this.set.rpeScaled = 100;
        }
    }
    
    
    private determinePercentage(){
        let percentages = {0:0,1:100,2:95,3:90,4:88,5:86,6:83,7:80,8:78,9:76,10:75,11:72,12:70,13:66,14:63,15:60};
        let repRounded = Math.floor(this.set.reps);
        this.set.percentage =  repRounded > 15 ? 50 : percentages[repRounded];;
    }    
    
    public saveSet(){
        this.set.rpe = this.set.rpeScaled / 10;
        this.viewCtrl.dismiss(this.set);
    }
    
    public openDelete(){
        let alert = this.alertCtrl.create({
            title:"Delete Set",
            message: "Are you sure you want to delete this set?",
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel'
                },
                {
                    text: 'Yes',
                    handler: data => {
                       this.viewCtrl.dismiss({deleted:true});
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



