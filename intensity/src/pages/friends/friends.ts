import { Component,ViewChild } from '@angular/core';
import { NavController, Slides, ModalController, Events, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';

import { AccountProvider } from '../../providers/account/account';

import { FriendsProvider } from '../../providers/friends/friends';
import { DiaryProvider } from '../../providers/diary/diary';

import {AppSettings} from '../../app/app.settings';

import { FriendProfilePage } from '../../pages/friend-profile/friend-profile';

import { AddFriendsModal } from '../../modals/add-friends/add-friends';

@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html'
})
export class FriendsPage {

    public account: any;
    public properties: any;
    public friends: any;
    public friendActivity: Array<any>;
    public friendRequests: Array<any>;
    public alphabet: Array<string>;

    
    constructor(public navCtrl: NavController, public modalCtrl: ModalController, public storage: Storage, private accountProvider: AccountProvider, private friendsProvider: FriendsProvider, private diaryProvider: DiaryProvider, public events: Events,private alertCtrl: AlertController) {
        this.properties = {activeTab:"friends", activityPage:1, canloadmore:true, paused:false};
        this.account = {};
        
        this.storage.get("account").then((data) => {
            this.account = data;
            this.getFriends();
        });  
        
        this.alphabet = [];  
        this.friends = {};   
        this.friendActivity = [];
        this.friendRequests = [];     
       
    }
    
    ionViewWillEnter(){
        if (this.properties.paused){
            this.properties.paused = false;
            this.getFriends();
        }
    }
    
    ionViewWillLeave(){
        this.properties.paused = true;
    }    

    private getFriends(){
        this.storage.get("profile" + this.account.id).then((data) => { //preload
            if (data){
                console.log(data);
                let friends = data["acceptedfriends"];
                this.friends = this.sortByAlpha(friends);
                this.friendActivity = data["friendactivity"];
                this.friendRequests = data["requests"];
            }
        });
        this.accountProvider.getProfile(this.account.id).then((data) => {
            let friends = data["acceptedfriends"];
            this.friends = this.sortByAlpha(friends);
            this.friendActivity = data["friendactivity"];
            this.friendRequests = data["requests"];            
        })
        
    }
    
    private sortByAlpha(list){
        let alphaArray = {};
        this.alphabet = [];
        for (let item of list){
            var name = item["display"] ? item["display"] : item["username"];
            item["name"] = name;
            let start = name.charAt(0).toLowerCase();
            if (start in alphaArray){
                alphaArray[start].push(item);
            }
            else{
                alphaArray[start] = [item];
                this.alphabet.push(start);
            }
        }
        this.alphabet.sort();
        console.log(alphaArray);
        return alphaArray;
    }
    
    public getDp(dp){
        return AppSettings.apiUrl.replace("index.php", "") + dp;        
    }   
    
    public tabChanged(ev){
        if (this.properties.activeTab === "activity"){
            
        }
    } 
    
    public viewProfile(friend, added){
        this.navCtrl.push(FriendProfilePage, {friend: friend, added:added});
    }
    
    public getMoreActivity(infiniteScroll){
        if (!this.properties.canloadmore){
            infiniteScroll.complete();
            return;
        }
        
        this.properties.activityPage = this.properties.activityPage + 1;
        
        this.accountProvider.getUserActivity(null, this.properties.activityPage).then((data) => {
            
            for (let item of data["activity"]){
                this.friendActivity.push(item);
            }
            
            this.properties.canloadmore = data["canloadmore"];    
                    
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
            userid: workout.userid,
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
    
    public acceptFriend(friend, index){
        this.friendRequests.splice(index,1);
        
        this.friendsProvider.addFriend(friend.userid).then(() => {
            this.accountProvider.getAccount();
            this.getFriends();
            
        });    
    }
    
    public declineFriend(friend, index){
        this.friendRequests.splice(index,1);
        
        this.friendsProvider.removeFriend(friend.userid).then(() => {
            this.accountProvider.getAccount();
            this.getFriends();
        });         
    }
    
    public openAddFriends(){
        let modal = this.modalCtrl.create(AddFriendsModal); 
        modal.present();        
    }    

}
