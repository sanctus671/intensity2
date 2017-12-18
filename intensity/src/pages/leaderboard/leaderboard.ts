import { Component,ViewChild } from '@angular/core';
import { NavController, Slides, ModalController, Events, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';

import { LeaderboardProvider } from '../../providers/leaderboard/leaderboard';
import { ExerciseProvider } from '../../providers/exercise/exercise';
import { AccountProvider } from '../../providers/account/account';

import {AppSettings} from '../../app/app.settings';

import { SocialSharing } from '@ionic-native/social-sharing';

import {SelectExerciseModal} from '../../modals/select-exercise/select-exercise';

@Component({
  selector: 'page-leaderboard',
  templateUrl: 'leaderboard.html'
})
export class LeaderboardPage {

    public account: any;
    public exercise: any;
    public properties: any;
    public leaderboardProperties: any;
    public leaderboards: any;
    public reps: Array<number>;
    
    constructor(public navCtrl: NavController, public modalCtrl: ModalController, public storage: Storage, private accountProvider: AccountProvider, private leaderboardProvider: LeaderboardProvider, private exerciseProvider: ExerciseProvider, public events: Events,private alertCtrl: AlertController, private socialSharing: SocialSharing) {
        this.properties = {type:"maxes", reps:"1", limit:10, exerciseid:0};
        this.leaderboardProperties = {"0-1":{loading:true}}

        this.leaderboards = {};
        
        this.storage.get("account").then((data) => {
            this.account = data;
        });  
        
        this.reps = [];
        for (var x = 1; x < 31; x++){
            this.reps.push(x);
        }
        
        this.exercise = {name: ""};
        this.getLatestExercise();
              
       
    }

    public getLatestExercise(){
        this.storage.get("recentexercises").then((exercises) => { //preload from local storage
            if (exercises && exercises.length > 0){
                this.exercise = exercises[0];
                this.getLeaderboard(); 
            }
        })
                        
        this.exerciseProvider.getRecentExercises().then((exercises) => {
            if (!this.exercise.name){
                this.exercise = exercises[0];
                this.getLeaderboard();                
            }
        });
    }   
    
    public getLeaderboard(){
        console.log(this.properties);
        this.properties.exerciseid = this.exercise.exerciseid;
        
        
        let key = this.properties.exerciseid + "-" + this.properties.reps;
        
        if (key in this.leaderboards){return;}
        
        
        this.leaderboards[key] = [];
        this.leaderboardProperties[key] = {page:1, canloadmore:true, loading:true};

        this.preloadLeaderboard();
        
        let options = {};
        Object.assign(options,this.properties);
        Object.assign(options,this.leaderboardProperties[key]);        
        
        this.leaderboardProvider.getLeaderboard(options).then((data) => {
            this.leaderboards[key] = data["data"];
            this.leaderboardProperties[key].canloadmore = data["canloadmore"];
            this.leaderboardProperties[key].loading = false;
        })
        .catch(() => {
            this.leaderboards[key] = [];
            this.leaderboardProperties[key].canloadmore = false;
            this.leaderboardProperties[key].loading = false;            
        })
    }  
    
    public loadMoreLeaderboard(infiniteScroll){
        
        let key = this.properties.exerciseid + "-" + this.properties.reps;
        
        if (!this.leaderboardProperties[key].canloadmore){
            infiniteScroll.complete();
            return;
        }   
        
        
        
        this.leaderboardProperties[key].page = this.leaderboardProperties[key].page + 1;        
        
        console.log(this.properties.page);
        
        let options = {};
        Object.assign(options,this.properties);
        Object.assign(options,this.leaderboardProperties[key]);
        
        this.leaderboardProvider.getLeaderboard(options).then((data) => {
            console.log(data);
            for (let item of data["data"]){
                this.leaderboards[key].push(item);
            }
            this.leaderboardProperties[key].canloadmore = data["canloadmore"];
            infiniteScroll.complete();
        })
        .catch(() => {
            this.leaderboardProperties[key].canloadmore = false; 
            infiniteScroll.complete();          
        })                
    }
    
    public preloadLeaderboard(){
        
        let key = this.properties.exerciseid + "-" + this.properties.reps;
        
        if (this.leaderboardProperties[key].page !== 1){return;}
        
        
        
        this.storage.get("leaderboard" + this.properties.exerciseid + +this.properties.reps + this.leaderboardProperties[key].page + this.properties.limit).then((data) => {

            if (data){
                this.leaderboards[key] = data["data"];
                this.leaderboardProperties[key].loading = false;
            }
        })     
    }
    
    public getDp(dp){
        return AppSettings.apiUrl.replace("index.php", "") + dp;        
    }
    
    public formatDate(date){
        return moment(date).format('MMMM Do YYYY')
    }
    
    public toggleLike(item){
        item.liked = !item.liked;
        
        if (item.liked){
            item.likes.push({});
            this.leaderboardProvider.likeSet(item.id);
        }
        else{
            item.likes.pop();
            this.leaderboardProvider.unlikeSet(item.id);
        }
        
    }
    
    public share(set, rank){
        var name = set.display ? set.display : set.username;
        this.socialSharing
            .share(name + " tracked " + this.exercise.name + " for " + set.reps + " reps with " + set.weight + set.unit + ". They are ranked number " + rank + " on the Intensity leaderboard!", "Intensity leaderboard", null, "http://www.intensityapp.com/");         
    }
    
    public openChangeExercise(){
        let modal = this.modalCtrl.create(SelectExerciseModal); 
        modal.onDidDismiss(exercise => {
            if (exercise){
                this.exercise = exercise;
                console.log(exercise);
                this.getLeaderboard();
                
            }
        })
        modal.present();        
    }
    
    public viewDetails(item, rank){
        var name = item.display ? item.display : item.username;
        let alert = this.alertCtrl.create({
            title: rank + ". " + item.weight + item.unit,
            subTitle: "Made by " + name,
            message: "This record for " + this.exercise.name + " was performed on " + this.formatDate(item.assigneddate) + ". It was entered into their diary on " + this.formatDate(item.created),
            buttons: [
                {
                    text: 'Dismiss',
                    role: 'cancel'
                }
            ]
        });
        alert.present();         
    }

}
