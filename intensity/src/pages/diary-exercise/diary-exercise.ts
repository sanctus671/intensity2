import { Component,ViewChild } from '@angular/core';
import { NavController, ModalController, Events, NavParams, Content, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';

import { DiaryProvider } from '../../providers/diary/diary';
import { AccountProvider } from '../../providers/account/account';
import { ChartProvider } from '../../providers/chart/chart';

import { Chart } from 'angular-highcharts';

import {RoundProgressModule} from 'angular-svg-round-progressbar';

import { EditSetModal } from '../../modals/edit-set/edit-set';
import { DiaryRecordsModal } from '../../modals/diary-records/diary-records';
import { SettingsPage } from '../../pages/settings/settings';

import { DatePickerDirective } from 'ion-datepicker';

@Component({
  selector: 'page-diary-exercise',
  templateUrl: 'diary-exercise.html',
  
})
export class DiaryExercisePage {
    @ViewChild(Content) content: Content;
    @ViewChild(DatePickerDirective) public datepicker: DatePickerDirective;
    
    public exercise: any;
    public account:any;
    public properties:any;
    public selectedDate : Date;
    public stats : any;
    
    constructor(public navCtrl: NavController, public modalCtrl: ModalController, public storage: Storage, private diaryProvider: DiaryProvider, public events: Events, public params: NavParams, private alertCtrl: AlertController, private chartProvider: ChartProvider) {
        console.log(this.params);
        
        this.properties = {activeTab:"diary", reorder:false};
        this.selectedDate = this.params.data.date;
        this.exercise = this.params.data.exercise;
        
        this.convertNumbers();
        
        this.exercise.reps = this.exercise.sets.length > 0 ? this.exercise.sets[this.exercise.sets.length -1]["reps"] : (this.exercise.reps > 0 ? this.exercise.reps : "");
        this.exercise.weight = this.exercise.sets.length > 0 ? this.exercise.sets[this.exercise.sets.length - 1]["weight"] : (this.exercise.weight > 0 ? this.exercise.weight : ""); 

        this.storage.get("account").then((data) => {
            this.account = data;
            if (data && !this.exercise.unit){
                this.exercise.unit = data.units;
            }
        });         
        
        this.stats = {
            chart : new Chart(this.chartProvider.getLineConfig()),
            metric : "volume",
            timeframe: "forever",
            units : "",
            firstLoad:true,
            extra: {
                best:{},
                worst:{},
                average:{},
                growth:{},
                units: ""
            },
            availableMetrics: ["volume", "rpe", "intensity", "weight", "volume/wilks", "best weight"]
        }        
                
    }
    
    public tabChanged(ev){
        console.log(this.properties.activeTab);
        if (this.properties.activeTab === "stats"){
            this.getStats();
        }
    }
        

    public toggleSet(ev,set){
        ev.stopPropagation();
        ev.preventDefault();    
        
        set.completed = !set.completed;
        
        
        if (set.completed){
            this.exercise.goals.progress = this.exercise.goals.progress + this.getProgressAmount(set);
        }
        else{
            this.exercise.goals.progress = this.exercise.goals.progress - this.getProgressAmount(set);
        }
        
        this.diaryProvider.editSet(moment(this.selectedDate).format('YYYY-MM-DD'), this.exercise.exerciseid, set).then((data) =>{
            this.exercise.goals = data["goals"];
            this.exercise.records = data["records"];
            this.exercise.cailbrating = data["calibrating"];
            this.exercise.history = data["history"];
        })
            
    }
    
    
    public addSet(){
        
        let set = {
            id:0,
            reps:this.exercise.reps ? this.exercise.reps : 0, 
            weight:this.exercise.weight ? this.exercise.weight : 0, 
            percentage: this.determinePercentage(this.exercise.reps),
            rpe:8,
            unit:this.exercise.unit,
            sets: this.exercise.sets.length > 0 ? parseInt(this.exercise.sets[this.exercise.sets.length - 1].sets) + 1 : 1,
            completed: this.account.autocomplete};
        
        this.exercise.sets.push(set);
        if (this.properties.activeTab === "diary" && this.content){
            setTimeout(()=>{this.content.scrollToBottom();},200);
        }
        
        if (this.account.autocomplete){
            this.exercise.goals.progress = this.exercise.goals.progress + this.getProgressAmount(set);
        }
        
        console.log(this.exercise);
        this.diaryProvider.addSet(moment(this.selectedDate).format('YYYY-MM-DD'), this.exercise.exerciseid, this.exercise.name, set).then((data) => {
            console.log(data);
            set.id = data["id"];
            this.exercise.goals = data["goals"];
            this.exercise.records = data["records"];
            this.exercise.cailbrating = data["calibrating"];
            this.exercise.history = data["history"];
        });
        
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
    
    private determinePercentage(reps){
        let percentages = {0:0,1:100,2:95,3:90,4:88,5:86,6:83,7:80,8:78,9:76,10:75,11:72,12:70,13:66,14:63,15:60};
        let repRounded = Math.floor(reps);
        return repRounded > 15 ? 50 : percentages[repRounded];;
    }
    
    private convertNumbers(){
        for (let set of this.exercise.sets){
            set.id = parseInt(set.id);
            set.weight = parseFloat(set.weight);
            set.reps = parseFloat(set.reps);
            set.sets = parseInt(set.sets);
            set.rpe = parseFloat(set.rpe);
            set.percentage = parseFloat(set.percentage);
            set.completed = !set.completed || set.completed === "0" ? false : true;
            
        }
    }
    

    public reorderItems(indexes){
        this.properties.reorder = false;
        let element = this.exercise.sets[indexes.from];
        this.exercise.sets.splice(indexes.from, 1);
        this.exercise.sets.splice(indexes.to, 0, element);
        
        
        let set = 1;
        for (var index in this.exercise.sets){
            this.exercise.sets[index]["sets"] = set;
            set = set + 1;
        }
        
        this.diaryProvider.reorderSets(moment(this.selectedDate).format('YYYY-MM-DD'), this.exercise.exerciseid, this.exercise.sets);
        
    }  
    
    public openSet(set, index){
        console.log(set);
        let modal = this.modalCtrl.create(EditSetModal, {set:set, exercise:this.exercise}); 
        modal.onDidDismiss(updatedSet => {
            if (updatedSet && updatedSet.deleted){
                this.exercise.sets.splice(index, 1);
                
                if (set.completed){
                    this.exercise.goals.progress = this.exercise.goals.progress - this.getProgressAmount(set);
                }
                
                this.diaryProvider.removeSet(moment(this.selectedDate).format('YYYY-MM-DD'), this.exercise.exerciseid, set).then((data) => {
                    this.exercise.goals = data["goals"];
                    this.exercise.records = data["records"];
                    this.exercise.cailbrating = data["calibrating"];
                    this.exercise.history = data["history"];                    
                })
            }
            
            else if (updatedSet){


 
                let newAmount = this.getProgressAmount(updatedSet);                 
                if (set.completed){
                    let oldAmount = this.getProgressAmount(set);     
                    this.exercise.goals.progress = this.exercise.goals.progress + (newAmount - oldAmount);
                }                
                
                Object.assign(set, updatedSet);
                
                
                if (updatedSet.updateAll){
                    updatedSet.massedit = true;
                    set.updateAll = false;
                    for (let exerciseSet of this.exercise.sets){
                        
                        if (exerciseSet.completed){
                            let oldAmount = this.getProgressAmount(exerciseSet);                 
                            this.exercise.goals.progress = this.exercise.goals.progress + (newAmount - oldAmount);   
                        }                     
                        
                        exerciseSet.reps = set.reps;
                        exerciseSet.weight = set.weight;
                    }
                }
                
                this.diaryProvider.editSet(moment(this.selectedDate).format('YYYY-MM-DD'), this.exercise.exerciseid, updatedSet).then((data) =>{
                    this.exercise.goals = data["goals"];
                    this.exercise.records = data["records"];
                    this.exercise.cailbrating = data["calibrating"];
                    this.exercise.history = data["history"];
                })                 
                console.log(set);
            }
        })
        modal.present();
    }  
    
    public openGoalDetails(){
        console.log(this.account);
        let progressPecentage = Math.round((this.exercise.goals.progress / this.exercise.goals.goal)*100);
        let remaining = this.exercise.goals.goal - this.exercise.goals.progress;
        let remainingPercentage = Math.round((remaining / this.exercise.goals.goal) * 100)
        var goalDescription = "<br>Your goal is currently set as <strong>" + this.account.goals.target + "</strong> <strong>" + this.account.goals.primary + "</strong> grouped by <strong>" + this.account.goals.grouping + "</strong>. Your timeframe is a <strong>" + this.account.goals.timeframe + "</strong>. You can change this in your settings.<br>";
        
        let alert = this.alertCtrl.create({
            title:progressPecentage + "% complete",
            subTitle: remaining + this.exercise.unit + " (" + remainingPercentage + "%) to go",
            message: goalDescription,
            buttons: [
                {
                    text: 'Dismiss',
                    role: 'cancel'
                },
                {
                    text: 'Settings',
                    handler: data => {
                       this.navCtrl.push(SettingsPage);
                   }
                }
            ]
        });
        alert.present();        
    }    
    
    public openRecords(){
        let modal = this.modalCtrl.create(DiaryRecordsModal, {exercise: this.exercise }); 
        modal.present();
    }    
    
    public getDay(date){
        return moment(date).format('dddd');
    }
    
    public formatDate(date){
        return moment(date).format('MMMM Do YYYY');
    }
    
    public getAverageReps(sets){
        let average = 0;
        for (let set of sets){
            average = average + parseFloat(set.reps);
        }
        average = average / sets.length;
        return average;
    }
    
    public getAverageWeight(sets){
        let average = 0;
        for (let set of sets){
            average = average + parseFloat(set.weight);
        }
        average = average / sets.length;
        return average;        
    }
    
    public getUnits(sets){
        if (sets.length > 0){
            return sets[0].unit
        }
        return this.exercise.unit;
    }
    
    public loadMoreHistory(infiniteScroll){
        console.log("here");
        
        
            
        if (!this.exercise.historyPage){
            this.exercise.historyPage = 1;
        }
        else if (!this.exercise.canGetMoreHistory){
            infiniteScroll.complete();
            return;
        }
        
        this.exercise.historyPage = this.exercise.historyPage + 1;
        
        this.diaryProvider.getHistory(this.exercise.historyPage, moment(this.selectedDate).format('YYYY-MM-DD'), this.exercise.exerciseid).then((data) => {
            
            console.log(data);
            
            for (let item of data["history"]){
                this.exercise.history.push(item);
            }
            this.exercise.canGetMoreHistory = data["canloadmore"];
         
            infiniteScroll.complete();
            console.log(this.exercise);
        })
        .catch((e) => {
            infiniteScroll.complete();
        })

    }
    
    public copyToDate(date,workout){
        
        console.log(date);
        console.log(workout);
        
        let copy = {
            exerciseid: this.exercise.exerciseid,
            userid: this.account.id,
            type:"sets",
            date: moment(date).format('YYYY-MM-DD'),
            assigneddate: moment(workout.assigneddate).format('YYYY-MM-DD')
        }

        if (copy.date === moment(this.selectedDate).format('YYYY-MM-DD')){
            for (let set of workout.sets){
                set.id = null;
                this.exercise.sets.push(set);
                
                if (this.account.autocomplete){
                    this.exercise.goals.progress = this.exercise.goals.progress + this.getProgressAmount(set);
                }                
            }
        }        
                
        this.diaryProvider.copyWorkout(copy).then((data) => {
            
            this.events.publish('workout:copied',{date:copy.date});
            
            let alert = this.alertCtrl.create({
                title: workout.sets.length + " sets copied",
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
    
    
    public openWorkout(workout, index){
        
        let setString = "";
        for (let set of workout.sets){
            setString = setString + "<div class='histroy-set'>" + set['reps'] + " reps, " + set['weight'] + this.account.units + ", " + set['percentage'] + "%, " + set['rpe'] + "RPE</div>"
        }
        
        let alert = this.alertCtrl.create({
            title: this.getDay(workout.assigneddate),
            subTitle: this.formatDate(workout.assigneddate),
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

    
    public getStats(){
        if (this.stats.firstLoad){
            this.stats.firstLoad = false;
            
        }

        this.diaryProvider.getStats({accumulation:"Weekly", timeframe:this.stats.timeframe, metric:this.stats.metric, name:this.exercise.name}).then((data) => {

            
            this.setStatsUnits();            
            
            console.log(this.stats.units);
            
            this.stats.chart.removeSerie(0);
            
            this.stats.chart.addSerie({
                data: this.formatStats(data),
                name: this.stats.metric + this.stats.units,
                color: '#de4223',
                showInLegend: false                
            })
           
            
            this.setExtraStats(data);    
        }).catch(() => {
        
            this.setStatsUnits();
        
            this.stats.chart.removeSerie(0);
            this.stats.chart.addSerie({
                data: [],
                name: this.stats.metric + this.stats.units,
                color: '#de4223',
                showInLegend: false                
            })            
        })       
    }
    
    private setStatsUnits(){
        this.stats.units = "";
        if (this.stats.metric.indexOf("volume") > -1 || this.stats.metric.indexOf("weight") > -1){
            this.stats.units = " (" + this.exercise.unit + ")";
        }
        else if (this.stats.metric.indexOf("intensity") > -1){
            this.stats.units = " (%)";
        }         
    }
    
    private setExtraStats(data){
        this.stats.extra = {
            best:{data:0,date:null},
            worst: {data:10000000, date:null},
            average: {data:0,fromDate:null,toDate:null},
            growth: {data:0,percentage:null},
            units: this.stats.units.replace(/[()]/g, '').trim()
        }
        
        for (let stat of data){
            if (stat.y > this.stats.extra.best.data){
                this.stats.extra.best.data = stat.y;
                this.stats.extra.best.date = moment(stat.x).format("MMMM Do YYYY");
                
            }
            if (stat.y < this.stats.extra.worst.data){
                this.stats.extra.worst.data = stat.y;
                this.stats.extra.worst.date = moment(stat.x).format("MMMM Do YYYY");
            }            
            
            this.stats.extra.average.data = this.stats.extra.average.data + stat.y;
            
        }
        
        this.stats.extra.average.data  = this.stats.extra.average.data / data.length;
        this.stats.extra.average.fromDate = data[data.length - 1].x;
        this.stats.extra.average.toDate = data[0].x;
        
        this.stats.extra.growth.data = (this.stats.extra.best.data - this.stats.extra.worst.data) / data.length;
        this.stats.extra.growth.percentage = this.stats.extra.growth.data * 100;
        
    }
    
    private formatStats(data){
        let formatted = [];
        for (let stat of data){
            var date = new Date(stat.x);
            formatted.push([date.getTime(), stat.y]);
        }
        return formatted.sort(function(a, b){
            return a[0] - b[0];
        });        
    }
    
    
    public changeStatsTimeframe(timeframe){
        this.stats.timeframe = timeframe;
        this.getStats();
    }
    
    public openChangeMetric(){
        let data = {
            title: "Change Metric",
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel'
                },
                {
                    text: 'OK',
                    handler: data => {
                       console.log(data);
                       this.stats.metric = data;
                       this.getStats();
                   }
                }
            ],
            inputs: []
        }
        
        for (let metric of this.stats.availableMetrics){
            data.inputs.push({type: 'radio', label: metric, value: metric, checked:metric === this.stats.metric})
        }
        
        let alert = this.alertCtrl.create(data);
        alert.present();        
    }
    
}
