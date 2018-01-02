import { Component,ViewChild } from '@angular/core';
import { NavController, Slides, ModalController, Events, AlertController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';

import { DiaryProvider } from '../../providers/diary/diary';
import { AccountProvider } from '../../providers/account/account';
import { ExerciseProvider } from '../../providers/exercise/exercise';

import { FriendsProvider } from '../../providers/friends/friends';

import { DatePickerDirective } from 'ion-datepicker';


import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
  selector: 'page-friend-diary',
  templateUrl: 'friend-diary.html'
})
export class FriendDiaryPage {
    @ViewChild(Slides) slides: Slides;
    @ViewChild(DatePickerDirective) public datepicker: DatePickerDirective;
    
    public selectedDate : Date;
    public account: any;
    public currentWorkout: any;
    public workouts: Array<{loading: boolean, retreived: boolean, workouts: any}>;
    public workoutLoading: any;
    public workoutSlides: any;
    public selectedExercise: any;
    public friend: any;
    public copyWorkoutOnly:boolean;
    
    constructor(public navCtrl: NavController, public params: NavParams, public modalCtrl: ModalController, public storage: Storage, private diaryProvider: DiaryProvider, private accountProvider: AccountProvider, public events: Events, public exerciseProvider: ExerciseProvider, private alertCtrl: AlertController, private socialSharing: SocialSharing, private friendsProvider: FriendsProvider) {
        
        
        this.friend = this.params.data.friend;
        this.friend.friendid = this.friend.friendid ? this.friend.friendid : this.friend.userid;
        this.friend.userid = this.friend.friendid;
        
                
        this.selectedDate = new Date();


        this.setupSlides(); 
        
        this.copyWorkoutOnly = false;
        
        this.storage.get("account").then((data) => {
            this.account = data;
        });        
         
    }
    
    public setupSlides(){
        return new Promise((resolve, reject) => {
            this.workoutSlides = [this.selectedDate];
            this.workouts = [{loading:true, retreived:false, workouts: []}];
            
            for (let i = 1; i < 8; i++){
                let newDate = this.calculateDate(this.selectedDate, -i);
                this.workoutSlides.unshift(newDate);
                this.workouts.unshift({loading:true, retreived:false, workouts: []});

                let newDate2 = this.calculateDate(this.selectedDate, i);
                console.log(newDate2);
                this.workoutSlides.push(newDate2);    
                this.workouts.push({loading:true, retreived:false, workouts: []});   
            }
            resolve();
        })        
    }
    

    public getWorkout(workout) {
        
        if (workout.retreived){
            return;
        }
        else{
            workout.loading = true;
            let formattedDate = moment(this.selectedDate).format('YYYY-MM-DD');
            this.friendsProvider.getWorkout(formattedDate, this.friend.friendid).then((data) => {
                console.log(data);
                workout.workouts = data;
                workout.loading = false;
                workout.retreived = true;                              
            })
            .catch(()=>{
                workout.loading = false;
                workout.retreived = false;
            });
        }      
        
    }  
    

    
    private calculateDate(date, change){
        return ( d => new Date(d.setDate(d.getDate() + change)) )(new Date(date))
    }
    
    
    public getSelectedDate(){
        return moment(this.selectedDate).calendar(null, {
            sameDay: '[Today]',
            nextDay: '[Tomorrow]',
            nextWeek: 'dddd',
            lastDay: '[Yesterday]',
            lastWeek: '[Last] dddd',
            sameElse: 'dddd, MMMM Do YYYY'
        });
    }
    
    public getSelectedDateKey(){
        return moment(this.selectedDate).format('YYYY-MM-DD');
    }
    
    
    public changeDay(direction){
        this.selectedDate = this.calculateDate(this.selectedDate, direction);
        this.getWorkout(this.workouts[this.slides.getActiveIndex()]);
        
        if (direction > 0){
            this.slides.slideNext();
        }
        else{
            this.slides.slidePrev();
        }
    }
    
    public changeDate(date){
        console.log(date);
        this.selectedDate = date;
        this.setupSlides().then(() => {
            this.slides.slideTo(7, 0, false);    
            this.getWorkout(this.workouts[7]);
            console.log(this.workouts[7])

        });
        
        
    }
    
    public workoutChanged(){
        this.selectedDate = this.workoutSlides[this.slides.getActiveIndex()];
        this.getWorkout(this.workouts[this.slides.getActiveIndex()]);
        
        if (this.slides.isBeginning()){
            for (let i = 1; i < 8; i++){
                let newDate = this.calculateDate(this.selectedDate, -i);
                this.workoutSlides.unshift(newDate);
                this.workouts.unshift({loading:true, retreived:false, workouts: []});
            } 
            this.slides.slideTo(7, 0, false);          
        }        
        
        else if (this.slides.isEnd()){

            for (let i = 1; i < 8; i++){
                let newDate = this.calculateDate(this.selectedDate, i);
                this.workoutSlides.push(newDate);
                this.workouts.push({loading:true, retreived:false, workouts: []});

            }             
            
        }

    }

    
    public selectExercise(exercise){
        console.log(exercise);
        let setString = "";
        for (let set of exercise.sets){
            setString = setString + "<div class='histroy-set'>" + set['reps'] + " reps, " + set['weight'] + this.account.units + ", " + set['percentage'] + "%, " + set['rpe'] + "RPE</div>"
        }
        
        let progressPecentage = Math.round((exercise.goals.progress / exercise.goals.goal)*100);
        
        let alert = this.alertCtrl.create({
            title: exercise.name,
            subTitle: progressPecentage + "% complete",
            message: setString,
            buttons: [
                {
                    text: 'Dismiss',
                    role: 'cancel'
                },
                {
                    text: 'Copy',
                    handler: data => {
                        this.datepicker.open();
                   }
                }
            ]
        });
        alert.present();  
    }    
    
    public showOptions(exercise, index){
        let alertObj = {
            title: exercise.name,
            cssClass: "button-only-alert",
            buttons: [
              {
                text: 'Share',
                handler: data => {
                    console.log('remove clicked');
                var name = this.friend.display ? this.friend.display : this.friend.username;
                var setText = name + " tracked " + exercise.name + " on Intensity. This is their sets: " ;
                for (let set of exercise.sets){
                    setText = setText + set.reps + " reps with " + set.weight + set.unit + " (" + set.percentage + "%, " + set.rpe + "rpe), ";
                }
                setText = setText.replace(/^[,\s]+|[,\s]+$/g, '');
                this.socialSharing
                    .share(setText, name + "'s workout on Intensity", null, "http://www.intensityapp.com/") // Share via native share sheet
                    .then((result) => {
                      // Success!
                    }, function(err) {
                      // An error occured. Show a message to the user
                    });                      
                    
                },
                cssClass: "share-button"
              },          
              {
                text: 'Copy',
                handler: data => {
                    console.log('remove clicked');
                    this.selectedExercise = exercise;
                    this.datepicker.open();
                },
                cssClass: "copy-button"
              },
            ]
        };

        
        let alert = this.alertCtrl.create(alertObj);
        alert.present();
    } 

    public copyWorkout(date){
        if (!this.selectedExercise){
            this.doCopy("workout",date);
            return;
        }
        let data = {
            title: "What sets do you want to copy?",
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel'
                },
                {
                    text: 'Copy',
                    handler: data => {
                        
                        this.doCopy(data,date);
                        

                       
                   }
                }
            ],
            inputs: [
                {type: 'radio', label: "Selected Exercise", value: "sets", checked:true},
                {type: 'radio', label: "Entire Workout", value: "workout", checked:false}
            ]
        }

        let alert = this.alertCtrl.create(data);
        setTimeout(() => { //timeout to remove glitchy popup show while other is closing
            alert.present(); 
        },200);          
    }   
   

    private doCopy(copyType,date){
        let copy = {
            exerciseid: copyType === "sets" ? this.selectedExercise.exerciseid : null,
            userid: this.friend.userid,
            type:copyType,
            date: moment(date).format('YYYY-MM-DD'),
            assigneddate: moment(this.selectedDate).format('YYYY-MM-DD')
        }


        this.diaryProvider.copyWorkout(copy).then(() => {


            this.events.publish('workout:copied', {date:copy.date});

            let sets = 0;
            if (copyType === "sets"){
                sets = this.selectedExercise.sets.length;
            }
            else{
                let workout = this.workouts[this.slides.getActiveIndex()];
                for (let exercise of workout.workouts){
                    sets = sets + exercise.sets.length;
                }
            }


            let alert = this.alertCtrl.create({
                title: sets + " sets copied",
                subTitle: "To " + moment(date).format('MMMM Do YYYY'),
                buttons: [
                    {
                        text: 'OK',
                        role: 'cancel'
                    }
                ]
            });
            alert.present();              
        })    
    }    

}
