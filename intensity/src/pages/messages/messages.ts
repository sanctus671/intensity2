import { Component,ViewChild } from '@angular/core';
import { NavController, Slides, ModalController, Events, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';

import { AccountProvider } from '../../providers/account/account';

import { FriendsProvider } from '../../providers/friends/friends';
import { DiaryProvider } from '../../providers/diary/diary';

import {AppSettings} from '../../app/app.settings';

@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html'
})
export class MessagesPage {

    
    constructor(public navCtrl: NavController, public modalCtrl: ModalController, public storage: Storage, private accountProvider: AccountProvider, private friendsProvider: FriendsProvider, private diaryProvider: DiaryProvider, public events: Events,private alertCtrl: AlertController) {
    
       
    }


}
