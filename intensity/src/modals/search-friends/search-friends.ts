import { Component } from '@angular/core';
import { NavController, ModalController, Platform, NavParams, ViewController, ToastController, AlertController } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import {ExerciseSearchPipe} from '../../pipes/exercise-search';
import { AccountProvider } from '../../providers/account/account';

import {AppSettings} from '../../app/app.settings';

@Component({
    selector: 'search-friends',
    templateUrl: 'search-friends.html'
})

export class SearchFriendsModal {
    
    public friends: any;
    public properties: any;
    public account: any;
    
    constructor(public platform: Platform, public params: NavParams, public viewCtrl: ViewController, private toastCtrl: ToastController, public storage: Storage, private alertCtrl: AlertController, private accountProvider: AccountProvider) {
        this.properties = {search:""};
        
        this.friends = [];
        
        
        this.storage.get("account").then((data) => {
            this.account = data;
            this.getFriends();
        });  
  
       
    }

    private getFriends(){
        this.storage.get("profile" + this.account.id).then((data) => { //preload
            if (data){
                console.log(data);
                this.friends = data["acceptedfriends"];
            }
        });
        this.accountProvider.getProfile(this.account.id).then((data) => {
            this.friends = data["acceptedfriends"];            
        })
        
    }
    
    public getDp(dp){
        return AppSettings.apiUrl.replace("index.php", "") + dp;        
    }
    
    public searchCancelled(){
        this.properties.search = '';
    } 
    

    
    public selectFriend(userid){

        this.viewCtrl.dismiss(userid);
    }
    
       

    public dismiss() {
        this.viewCtrl.dismiss();
    }
}



