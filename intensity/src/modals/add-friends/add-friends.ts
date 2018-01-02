import { Component } from '@angular/core';
import { NavController, ModalController, Platform, NavParams, ViewController, ToastController, AlertController } from 'ionic-angular';

import { FriendsProvider } from '../../providers/friends/friends';
import { AccountProvider } from '../../providers/account/account';
import { Storage } from '@ionic/storage';

import { SocialSharing } from '@ionic-native/social-sharing';

import {ExerciseSearchPipe} from '../../pipes/exercise-search';

import {AppSettings} from '../../app/app.settings';

import { FriendProfilePage } from '../../pages/friend-profile/friend-profile';

@Component({
    selector: 'add-friends',
    templateUrl: 'add-friends.html'
})

export class AddFriendsModal {
    public properties: any;
    public suggestedFriends: Array<any>;
    public friends: Array<any>;
    public account:any;
    
    
    constructor(public navCtrl: NavController,public platform: Platform, public params: NavParams, public viewCtrl: ViewController, private toastCtrl: ToastController, private friendsProvider: FriendsProvider, public storage: Storage, private alertCtrl: AlertController, private accountProvider: AccountProvider, private socialSharing: SocialSharing) {
        this.properties = {search:"", loading:false, paused:false}
        this.suggestedFriends = [];
        this.friends = [];
        this.account = {};
        
        this.storage.get("account").then((data) => {
            this.account = data;
        });         
        
        this.getSuggestedFriends();
        
    }
    
    ionViewWillEnter(){
        if (this.properties.paused){
            this.properties.paused = false;
            this.reloadFriends();
        }
    }
    
    ionViewWillLeave(){
        this.properties.paused = true;
    }    
    
    private reloadFriends(){
        this.friendsProvider.getSuggestedFriends(this.account.id).then((data: Array<any>) => {
            this.suggestedFriends = data;
        });   
        
        if (this.properties.search){
            this.searchFriends(this.properties.search);     
        }
    }
    
    
    private getSuggestedFriends(){
        this.properties.loading = true;
        this.friendsProvider.getSuggestedFriends(this.account.id).then((data: Array<any>) => {
            this.properties.loading = false;
            this.suggestedFriends = data;
          
            
        })
    }
    
    public searchFriends(search){
        this.friendsProvider.searchUsers(search).then((data: Array<any>) => {
            console.log(data);
            this.friends = data;
            for (let friend of this.friends){
                
                if (friend.friends.indexOf(friend.userid) > -1){ //friend.friends actually refer to the current users friends, not the friend
                    friend.added = true;
                }
                
                for (let request of this.account.requests){
                    if (request.userid === friend.userid){
                        friend.pending = true;
                        break;
                    }
                }             
                
                console.log(friend);
                
                
            }
            
        })
    }
    
    public getDp(dp){
        return AppSettings.apiUrl.replace("index.php", "") + dp;        
    }     
   
    public viewProfile(friend){
        this.navCtrl.push(FriendProfilePage, {friend: friend, added:false});
    }    
    
    public addFriend(ev, friend){
        console.log(ev);
        ev.stopPropagation();
        friend.adding = true;
        this.friendsProvider.addFriend(friend.userid).then(() => {
            this.accountProvider.getAccount();
            friend.added = true;
            friend.adding = false;
        });
        
    }
    
    public inviteFriends(){
        this.socialSharing
            .share("Check out Intensity, the workout tracking app", "Intensity", null, "http://www.intensityapp.com");              
    }
 

    public dismiss() {
        this.viewCtrl.dismiss();
    }
}



