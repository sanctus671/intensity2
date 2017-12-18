import { Component,ViewChild } from '@angular/core';
import { NavController, Slides, ModalController, Events, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';

import { DiaryProvider } from '../../providers/diary/diary';
import { AccountProvider } from '../../providers/account/account';
import { ExerciseProvider } from '../../providers/exercise/exercise';
import { DiaryExercisePage } from '../../pages/diary-exercise/diary-exercise';

import { DatePickerDirective } from 'ion-datepicker';

import {AddExerciseModal} from '../../modals/add-exercise/add-exercise';

import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
  selector: 'page-diary',
  templateUrl: 'diary.html'
})
export class DiaryPage {
    @ViewChild(Slides) slides: Slides;
    @ViewChild(DatePickerDirective) public datepicker: DatePickerDirective;
    
    public selectedDate : Date;
    public reorderActive: boolean;
    public markedWorkoutDates:any;
    public account: any;
    public currentWorkout: any;
    public workouts: Array<{loading: boolean, retreived: boolean, workouts: any}>;
    public workoutLoading: any;
    public workoutSlides: any;
    public selectedExercise: any;
    
    constructor(public navCtrl: NavController, public modalCtrl: ModalController, public storage: Storage, private diaryProvider: DiaryProvider, private accountProvider: AccountProvider, public events: Events, public exerciseProvider: ExerciseProvider, private alertCtrl: AlertController, private socialSharing: SocialSharing) {
        
        
        this.selectedDate = new Date();
        
        this.reorderActive = false;
        
        this.markedWorkoutDates = [];


        this.setupSlides();

        this.events.subscribe('session:retreived', () => {
            
            if (this.workouts.length > 1 && !this.workouts[7].retreived) {
                this.getWorkout(this.workouts[7]);
            }
        }); 
        
        this.events.subscribe('workout:copied', (data) => {
            
            for (let workout of this.workouts){
                workout.retreived = false;
            }
                
            this.getWorkout(this.workouts[this.slides.getActiveIndex()]);
            
        });         
        
        
        this.storage.get("account").then((data) => {
            this.account = data;
        });        
        
        
        this.setMarkedDates();          
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
            this.diaryProvider.getWorkout(formattedDate).then((data) => {
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
    
    public updateExercise(exercise){
            let formattedDate = moment(this.selectedDate).format('YYYY-MM-DD');
            this.diaryProvider.getWorkout(formattedDate).then((data) => {
                for (let workoutExercise of <Array<{}>> data){
                    if (exercise["exerciseid"] === workoutExercise["exerciseid"]){
                        exercise["sets"] = workoutExercise["sets"];
                    }
                }
            });        
    }
    
    public setMarkedDates(){
        this.markedWorkoutDates = [];
        this.diaryProvider.getWorkoutDates().then((dates) => {
            let workoutDates = dates["data"];
            for (let date of workoutDates){
                let workoutDate = new Date(date["assigneddate"]);
                this.markedWorkoutDates.push(workoutDate);
            }
            console.log(this.markedWorkoutDates);
        })
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
        this.reorderActive = false;
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
        this.reorderActive = false;
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
    
    public openAddDiaryModal() {
        let modal = this.modalCtrl.create(AddExerciseModal); 
        modal.onDidDismiss(exercise => {
            if (exercise){
                console.log(exercise);
                let workout = this.workouts[this.slides.getActiveIndex()];
                for (let workoutExercise of workout.workouts){
                    if (workoutExercise.name === exercise.name){
                        //already added, just open it
                        this.selectExercise(workoutExercise);
                        return;
                    }
                    
                }
                let workoutExercise = {name:exercise.name, exerciseid:exercise.id, calibrating:false,addid:null,goals:{goal:1,progress:0},history:[],records:{},sets:[], reps:"",weight:"", unit:false};
                workout.workouts.push(workoutExercise);
                
                let formattedDate = moment(this.selectedDate).format('YYYY-MM-DD');
                this.exerciseProvider.getExerciseData(exercise.id, formattedDate).then((data) => {
                    console.log(data);
                    workoutExercise.calibrating = data["history"] && data["history"].length < 1 ? true : false;
                    workoutExercise.goals = data["goals"];
                    workoutExercise.history = data["history"];
                    workoutExercise.records = data["records"];
                    if (data["reps"] > 0)workoutExercise.reps = data["reps"];
                    if (data["weight"] > 0)workoutExercise.weight = data["weight"];
                    workoutExercise.unit = data["unit"];


                })
                
                this.selectExercise(workoutExercise);
                
                
                console.log(workout);
            }
        })
        modal.present();
    }  
    
    public addSet(ev,exercise){
        ev.stopPropagation();
        ev.preventDefault();  
        
        
        let reps = exercise.sets.length > 0 ? exercise.sets[exercise.sets.length -1]["reps"] : (exercise.reps > 0 ? exercise.reps : "");
        let weight = exercise.sets.length > 0 ? exercise.sets[exercise.sets.length - 1]["weight"] : (exercise.weight > 0 ? exercise.weight : ""); 


        let prompt = this.alertCtrl.create({
            title: 'Add Set',
            inputs: [
                {
                    name: 'reps',
                    placeholder: 'Reps',
                    type:"number",
                    value: reps
                },
                {
                    name: 'weight',
                    placeholder: 'Weight',
                    type: "number",
                    value: weight
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Add',
                    handler: data => {
                        console.log('Saved clicked');
 
                        let set = {
                            id:0,
                            reps:data.reps ? data.reps : 0, 
                            weight:data.weight ? data.weight : 0, 
                            percentage: this.determinePercentage(data.reps),
                            rpe:8,
                            unit:exercise.unit ? exercise.unit : this.account.units,
                            sets: exercise.sets.length > 0 ? parseInt(exercise.sets[exercise.sets.length - 1].sets) + 1 : 1,
                            completed: this.account.autocomplete};

                        exercise.sets.push(set);


                        if (this.account.autocomplete){
                            exercise.goals.progress = exercise.goals.progress + this.getProgressAmount(set);
                        }

                        this.diaryProvider.addSet(moment(this.selectedDate).format('YYYY-MM-DD'), exercise.exerciseid, exercise.name, set).then((res) => {
                            console.log(res);
                            set.id = res["id"];
                            exercise.goals = res["goals"];
                            exercise.records = res["records"];
                            exercise.cailbrating = res["calibrating"];
                            exercise.history = res["history"];
                        });                            
                            
                                      
                    }
                }
            ]
        });
        prompt.present();
             
                
        console.log(exercise);      
    }
    

    private determinePercentage(reps){
        let percentages = {0:0,1:100,2:95,3:90,4:88,5:86,6:83,7:80,8:78,9:76,10:75,11:72,12:70,13:66,14:63,15:60};
        let repRounded = Math.floor(reps);
        return repRounded > 15 ? 50 : percentages[repRounded];;
    }    
    
    private getProgressAmount(set){
        if (this.account.goals.primary === "volume"){
            return set.reps * set.weight;
        }
        else if (this.account.goals.primary === "reps"){
            return parseFloat(set.reps);
        }
        else if (this.account.goals.primary === "weight"){
            return parseFloat(set.weight)
        }
        return 0;
    }    
    
    public toggleSet(ev,set, exercise){
        ev.stopPropagation();
        ev.preventDefault();    
        
        set.completed = !set.completed || set.completed === "0" ? false : true;
        
        set.completed = !set.completed;
        
        
        if (set.completed){
            exercise.goals.progress = exercise.goals.progress + this.getProgressAmount(set);
        }
        else{
            exercise.goals.progress = exercise.goals.progress - this.getProgressAmount(set);
        }
        
        this.diaryProvider.editSet(moment(this.selectedDate).format('YYYY-MM-DD'), exercise.exerciseid, set).then((data) =>{
            exercise.goals = data["goals"];
            exercise.records = data["records"];
            exercise.cailbrating = data["calibrating"];
            exercise.history = data["history"];
        })        
        
            
    }
    
    public selectExercise(exercise){
        this.navCtrl.push(DiaryExercisePage, {exercise: exercise, date: this.selectedDate});
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
                var setText = "I tracked " + exercise.name + " on Intensity. These are my sets: " ;
                for (let set of exercise.sets){
                    setText = setText + set.reps + " reps with " + set.weight + set.unit + " (" + set.percentage + "%, " + set.rpe + "rpe), ";
                }
                setText = setText.replace(/^[,\s]+|[,\s]+$/g, '');
                this.socialSharing
                    .share(setText, "My workout on Intensity", null, "http://www.intensityapp.com/") // Share via native share sheet
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
              {
                text: 'Reorder',
                handler: data => {
                    console.log('remove clicked');
                    this.reorderActive = true;
                },
                cssClass: "reorder-button"
              },
              {
                text: 'Remove',
                handler: data => {
                    console.log(exercise);
                    let alert = this.alertCtrl.create({
                        title:"Remove Exercise",
                        message: "Are you sure you want to remove this exercise? This will delete all sets from the current workout for this exercise.",
                        buttons: [
                            {
                                text: 'Cancel',
                                role: 'cancel'
                            },
                            {
                                text: 'Yes',
                                handler: data => {
                                    let workout = this.workouts[this.slides.getActiveIndex()];
                                    workout.workouts.splice(index,1);
                                    this.diaryProvider.removeExercise(moment(this.selectedDate).format('YYYY-MM-DD'),exercise.exerciseid);   
                                 }
                               
                            }
                        ]
                    });
                    setTimeout(() => { //timeout to remove glitchy popup show while other is closing
                        alert.present(); 
                    },200);                      
                    
                },
                cssClass: "remove-button"
              }
            ]
        };
        
        
        if (exercise.addid){
            alertObj.buttons.push(
              {
                text: 'Remove Program',
                handler: data => {
                    let alert = this.alertCtrl.create({
                        title:"Remove Program",
                        message: "Are you sure you want to remove this program? This will delete all workouts from this added program.",
                        buttons: [
                            {
                                text: 'Cancel',
                                role: 'cancel'
                            },
                            {
                                text: 'Yes',
                                handler: data => {
                                    let workout = this.workouts[this.slides.getActiveIndex()];
                                    for (var i = workout.workouts.length -1; i >= 0; i--){
                                        if (workout.workouts[i].addid === exercise.addid){
                                            workout.workouts.splice(i,1);
                                        }
                                    }
                                    
                                    for (let workout of this.workouts){
                                        workout.retreived = false;
                                    }
                                    
                                    this.diaryProvider.removeProgram(exercise.addid);   
                                 }
                               
                            }
                        ]
                    });
                    setTimeout(() => { //timeout to remove glitchy popup show while other is closing
                        alert.present(); 
                    },200); 
                },
                cssClass: "remove-program-button"
              })
        }
        
        let alert = this.alertCtrl.create(alertObj);
        alert.present();
    } 
    
    public copyWorkout(date){
        console.log(date);
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
                        
                        
                        
                        let copy = {
                            exerciseid: data === "sets" ? this.selectedExercise.exerciseid : null,
                            userid: this.account.id,
                            type:data,
                            date: moment(date).format('YYYY-MM-DD'),
                            assigneddate: moment(this.selectedDate).format('YYYY-MM-DD')
                        }
                        

                        this.diaryProvider.copyWorkout(copy).then(() => {
                            
                            
                            this.events.publish('workout:copied', {date:copy.date});
                            
                            let sets = 0;
                            if (data === "sets"){
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
    
    
    public reorderItems(indexes){
        let workout = this.workouts[this.slides.getActiveIndex()];
        let element = workout.workouts[indexes.from];
        workout.workouts.splice(indexes.from, 1);
        workout.workouts.splice(indexes.to, 0, element);
        
        let sets = [];
        let order = 1;
        for (let exercise of workout.workouts){
            for (var index in exercise.sets){
                exercise.sets[index]["exerciseorder"] = order;
                sets.push({id: exercise.sets[index].id, exerciseorder: order});
            }
            order = order + 1;
        }
        
        console.log(sets);
        
        this.diaryProvider.reorderExercises(moment(this.selectedDate).format('YYYY-MM-DD'), sets);
        
    }     
    

}
