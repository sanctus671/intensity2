import { Component,ViewChild } from '@angular/core';
import { NavController, Slides, ModalController, Events, AlertController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';

import { AccountProvider } from '../../providers/account/account';

import { FriendsProvider } from '../../providers/friends/friends';

import { DiaryProvider } from '../../providers/diary/diary';

import {AppSettings} from '../../app/app.settings';

import { FriendDiaryPage } from '../../pages/friend-diary/friend-diary';

import { MessagePage } from '../../pages/message/message';

@Component({
  selector: 'page-friend-profile',
  templateUrl: 'friend-profile.html'
})
export class FriendProfilePage {

    public account: any;
    public profile: any;
    public friendProfile: any;
    public properties: any;
    public activity: any;
    public added: boolean;
    
    constructor(public navCtrl: NavController, public params: NavParams, public modalCtrl: ModalController, public storage: Storage, private accountProvider: AccountProvider, public events: Events,private alertCtrl: AlertController, private friendsProvider: FriendsProvider, private diaryProvider: DiaryProvider) {
        this.properties = {activeTab: "profile", activityPage:1, fromMessage:false};
        
        this.friendProfile = this.params.data.friend;
        this.friendProfile.friendid = this.friendProfile.friendid ? this.friendProfile.friendid : this.friendProfile.userid;
        
        this.properties.fromMessage = this.params.data.fromMessage;
        
        this.friendProfile.userid = this.friendProfile.friendid;
        console.log(this.friendProfile);
        
        this.friendProfile.dpFull = AppSettings.apiUrl.replace("index.php", "") + this.friendProfile.dp;
        console.log(this.friendProfile);
        this.added = this.params.data.added;
        
        this.account = {};
        this.profile = {};
        this.activity = {};
        
        this.getProfile();
        
        this.accountProvider.getUserActivity(this.friendProfile.friendid, this.properties.activityPage).then((data) => {
            console.log(data);
            this.activity = data;
        }) 
        
        this.storage.get("account").then((data) => {
            this.account = data;
        });        
             
       
    }
    
    
    public getProfile(){
        this.storage.get("profile" + this.friendProfile.friendid).then((data) => { //preload
            if (data){
                this.profile = data;
            }
        });
        this.accountProvider.getProfile(this.friendProfile.friendid).then((data) => {
            this.profile = data;
            console.log(data);
        })
    }
    
    
    public getMoreActivity(infiniteScroll){

        if (!this.activity.canloadmore){
            infiniteScroll.complete();
            return;
        }
        
        this.properties.activityPage = this.properties.activityPage + 1;
        
        this.accountProvider.getUserActivity(this.friendProfile.friendid, this.properties.activityPage).then((data) => {
            
            for (let item of data["activity"]){
                this.activity.activity.push(item);
            }
            
            this.activity.canloadmore = data["canloadmore"];    
                    
            infiniteScroll.complete();
        })
        .catch((e) => {
            infiniteScroll.complete();
        })
    }    
    

     
    public formatDate(date){
        return moment(date).format('MMMM Do YYYY');
    }

    public copyToDate(date,workout){
        
        console.log(date);
        console.log(workout);
        
        let copy = {
            exerciseid: workout.exerciseid,
            userid: this.friendProfile.friendid,
            type:"sets",
            date: moment(date).format('YYYY-MM-DD'),
            assigneddate: moment(workout.assigneddate).format('YYYY-MM-DD')
        }
       
                
        this.diaryProvider.copyWorkout(copy).then((data) => {

            let alert = this.alertCtrl.create({
                title: workout.sets + " sets copied",
                subTitle: "To " + this.formatDate(date),
                buttons: [
                    {
                        text: 'OK',
                        role: 'cancel'
                    }
                ]
            });
            alert.present();              
        })
        console.log(copy);
    }

    public viewDetails(activity){
        

        let alert = this.alertCtrl.create({
            title: activity.name,
            subTitle: this.formatDate(activity.assigneddate),
            message: activity.sets + " sets of " + activity.reps + " with " + activity.weight + this.account.units,
            buttons: [
                {
                    text: 'Dismiss',
                    role: 'cancel'
                }
            ]
        });
        alert.present();        
    }  
    
    public addFriend(){
        let alert = this.alertCtrl.create({
            title: "Add User",
            message: "Are you sure you want to add this user?",
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel'
                },
                {                    
                    text: 'Yes',
                    handler: data => {
                        this.added = true;
                        this.friendsProvider.addFriend(this.friendProfile.userid);
                        console.log('Cancel clicked');
                    }}                
            ]
        });
        alert.present();         
    }
    
    public removeFriend(){
        let alert = this.alertCtrl.create({
            title: "Delete Friend",
            message: "Are you sure you want to delete this friend?",
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel'
                },
                {                    
                    text: 'Yes',
                    handler: data => {
                        this.added = false;
                        this.friendsProvider.removeFriend(this.friendProfile.userid);
                        console.log('Cancel clicked');
                    }}                
            ]
        });
        alert.present();         
    }
    
    public openDiary(){
        this.navCtrl.push(FriendDiaryPage, {friend: this.friendProfile});
    }
    
    public sendMessage(){
        if (this.properties.fromMessage){
            this.navCtrl.pop();
        }
        else{
            this.navCtrl.push(MessagePage, {profile: this.friendProfile, fromProfile:true});
        }
    }

}
