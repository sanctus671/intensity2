import { Component } from '@angular/core';
import { NavController, ModalController, Platform, NavParams, ViewController, ToastController, AlertController } from 'ionic-angular';

import { ExerciseProvider } from '../../providers/exercise/exercise';
import { Storage } from '@ionic/storage';

import {ExerciseSearchPipe} from '../../pipes/exercise-search';


@Component({
    selector: 'add-friends',
    templateUrl: 'add-friends.html'
})

export class AddFriendsModal {
    public properties: any;
    
    constructor(public platform: Platform, public params: NavParams, public viewCtrl: ViewController, private toastCtrl: ToastController, private exerciseProvider: ExerciseProvider, public storage: Storage, private alertCtrl: AlertController) {
        this.properties = {search:""}
        
    }
   

    public dismiss() {
        this.viewCtrl.dismiss();
    }
}



