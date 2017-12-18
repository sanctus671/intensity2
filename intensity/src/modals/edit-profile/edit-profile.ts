import { Component } from '@angular/core';
import { NavController, ModalController, Platform, NavParams, ViewController, ToastController, AlertController } from 'ionic-angular';

import { Storage } from '@ionic/storage';



@Component({
    selector: 'edit-profile',
    templateUrl: 'edit-profile.html'
})

export class EditProfileModal {

    public profile: any;
    
    constructor(public platform: Platform, public params: NavParams, public viewCtrl: ViewController, private toastCtrl: ToastController, public storage: Storage, private alertCtrl: AlertController) {
        this.profile = {};
        
        Object.assign(this.profile, this.params.data.profile);
        
        
        
    }
    
    public saveProfile(){
        this.viewCtrl.dismiss(this.profile);
    }

    public dismiss() {
        this.viewCtrl.dismiss();
    }
}



