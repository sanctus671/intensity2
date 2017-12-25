import { Component,ViewChild } from '@angular/core';
import { NavController, Slides, ModalController, Events, AlertController, NavParams,Content } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';

import { AccountProvider } from '../../providers/account/account';

import { FriendsProvider } from '../../providers/friends/friends';
import { DiaryProvider } from '../../providers/diary/diary';

import { MessageProvider } from '../../providers/message/message';

import {AppSettings} from '../../app/app.settings';

import { FriendProfilePage } from '../../pages/friend-profile/friend-profile';


@Component({
  selector: 'page-message',
  templateUrl: 'message.html'
})
export class MessagePage {
    @ViewChild(Content) content: Content;
    
    public profile: any;
    public messages:Array<any>;
    public message:any;
    public properties:any;
    public account:any;

    constructor(public navCtrl: NavController, public params: NavParams, public modalCtrl: ModalController, public storage: Storage, private accountProvider: AccountProvider, private friendsProvider: FriendsProvider, private diaryProvider: DiaryProvider, public events: Events,private alertCtrl: AlertController, private messageProvider: MessageProvider) {
        this.properties = {loading:false, fromProfile:false};
        
        if (this.params.data.fromProfile){
            this.properties.fromProfile = true;
        }
        
        this.profile = this.params.data.profile;
        
        this.profile.dpFull = AppSettings.apiUrl.replace("index.php", "") + this.profile.dp;
        
        console.log(this.profile);
        
        this.account = {};

        this.storage.get("account").then((data) => {
            this.account = data;
        });            
       
        this.messages = [];
        
        this.message = {};
        

        this.getMessages();
        
    }
    
    private getMessages(){
        this.properties.loading = true;
        this.messageProvider.getMessages(this.profile.userid).then((data: Array<any>) => {
            this.properties.loading = false;
            this.messages = data;
            for (var index in this.messages){
                
                //check message before is befrom same user
                //check message after is from same user
                
                let indexInt = parseInt(index);
                
                let message = this.messages[indexInt];
                let previousMessage = this.messages[indexInt - 1];
                let nextMessage = this.messages[indexInt + 1];
                
                
                let isBefore = false;
                let isAfter = false;
                
                if (previousMessage && message.userid === previousMessage.userid){
                    isAfter = true;
                }
                
                if (nextMessage && message.userid === nextMessage.userid){
                    isBefore = true;
                }

                message.isBefore = isBefore;
                message.isAfter = isAfter;
                
                
            }
            console.log(this.messages);
            setTimeout(()=>{this.content.scrollToBottom();},200);
        }).catch(() => {
            this.properties.loading = false;
        })        
    }
    
    
    public openProfile(){
        if (this.properties.fromProfile){
            this.navCtrl.pop();
        }
        else{
            this.navCtrl.push(FriendProfilePage, {friend: this.profile, added:true});
        }
    }

}
