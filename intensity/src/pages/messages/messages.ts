import { Component,ViewChild } from '@angular/core';
import { NavController, Slides, ModalController, Events, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';

import { AccountProvider } from '../../providers/account/account';

import { FriendsProvider } from '../../providers/friends/friends';
import { MessageProvider } from '../../providers/message/message';

import { MessagePage } from '../../pages/message/message';

import { SearchFriendsModal } from '../../modals/search-friends/search-friends';

import {AppSettings} from '../../app/app.settings';

@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html'
})
export class MessagesPage {
    
    public messages: Array<any>;
    public account: any;
    public properties: any;
    
    constructor(public navCtrl: NavController, public modalCtrl: ModalController, public storage: Storage, private accountProvider: AccountProvider, private friendsProvider: FriendsProvider, private messageProvider: MessageProvider, public events: Events,private alertCtrl: AlertController) {
        this.properties = {loading:false};
        
        
        this.messages = [];
        
        this.account = {};

        this.storage.get("account").then((data) => {
            this.account = data;
        });                 
        
        this.getMessages();
       
    }
    
    private getMessages(){
        this.properties.loading = true;
        this.messageProvider.getConversations().then((data: Array<any>) => {
            this.properties.loading = false;
            console.log(data);
            this.messages = data;
        })        
    }
    
    
    public getDp(dp){
        return AppSettings.apiUrl.replace("index.php", "") + dp;        
    }
    
    public getMessageTime(date){
        return moment(date).fromNow();
    }
    
    public openNewMessage(){
        let modal = this.modalCtrl.create(SearchFriendsModal); 
        modal.present();        
    }
    
        
    public goToMessage(profile){
        this.navCtrl.push(MessagePage, {profile:profile});
    }
    
    

}
