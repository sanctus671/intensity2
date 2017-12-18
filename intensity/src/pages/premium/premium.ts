import { Component,ViewChild } from '@angular/core';
import { NavController, Slides, ModalController, Events, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';

import { AccountProvider } from '../../providers/account/account';

@Component({
  selector: 'page-premium',
  templateUrl: 'premium.html'
})
export class PremiumPage {

    public account: any;

    
    constructor(public navCtrl: NavController, public modalCtrl: ModalController, public storage: Storage, private accountProvider: AccountProvider, public events: Events,private alertCtrl: AlertController) {

        
        this.storage.get("account").then((data) => {
            this.account = data;
        });        
       
    }

    

}
