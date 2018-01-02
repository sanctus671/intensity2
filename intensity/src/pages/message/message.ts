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
    public message:String;
    public properties:any;
    public account:any;
    public pingInterval: any;

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
        
        this.message = "";
        

        this.getMessages();
        
        this.pingInterval = setInterval(() => {
            this.pingMessages();
        },5000);
        
        
        
    }
    
    
    ionViewWillLeave() {
      console.log("deleting interval");
      clearInterval(this.pingInterval);
    } 
    
        
    private getMessages(){
        this.properties.loading = true;
        this.messageProvider.getMessages(this.profile.userid).then((data: Array<any>) => {
            this.properties.loading = false;
            this.messages = data;
            this.calculateMessages();
            console.log(this.messages);
            setTimeout(()=>{this.content.scrollToBottom();},200);
        }).catch(() => {
            this.properties.loading = false;
        })        
    }
    
    
    private pingMessages(){
        if (this.properties.loading){return;}
        this.messageProvider.getMessages(this.profile.userid).then((data: Array<any>) => {        
            if (data.length > this.messages.length){
                this.messages = data;
                this.calculateMessages();
                setTimeout(()=>{this.content.scrollToBottom();},200);
            }
        }).catch(() => {});
    }
    
   
    
    private calculateMessages(){
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
    }
    
    public openProfile(){
        if (this.properties.fromProfile){
            this.navCtrl.pop();
        }
        else{
            this.navCtrl.push(FriendProfilePage, {friend: this.profile, added:true, fromMessage:true});
        }
    }
    
    public sendMessage(){
        
        if (!this.message){return;}
        
        let message = {id:null, message: this.message, created: new Date(), userid: this.account.id, friendid:this.profile.userid};
        
        console.log(message);
        this.messages.push(message);
        
        this.message = "";
        
        this.calculateMessages();
        
        setTimeout(()=>{this.content.scrollToBottom();},200);
        
        this.messageProvider.createMessages(message.message, this.profile.userid).then((data) => {
            console.log(data);
            message.id = data["id"];
        }).catch(() => {});
    }
    
    public getMessageTime(date){
        return moment(date).fromNow();
    }   

}
