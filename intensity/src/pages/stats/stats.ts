import { Component,ViewChild } from '@angular/core';
import { NavController, Slides, ModalController, Events, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';

import { AccountProvider } from '../../providers/account/account';

import { ChartProvider } from '../../providers/chart/chart';

import { DiaryProvider } from '../../providers/diary/diary';

import { ExerciseProvider } from '../../providers/exercise/exercise';

import { ChangeExerciseModal } from '../../modals/change-exercise/change-exercise';

import { Chart } from 'angular-highcharts';

@Component({
  selector: 'page-stats',
  templateUrl: 'stats.html'
})
export class StatsPage {
    
    public properties: any;
    public account: any;
    public stats: any;
    public recentExercises: any;
    public exercise;
    
    constructor(public navCtrl: NavController, public modalCtrl: ModalController, public storage: Storage, private accountProvider: AccountProvider, public events: Events,private alertCtrl: AlertController, private chartProvider: ChartProvider, private diaryProvider: DiaryProvider, private exerciseProvider: ExerciseProvider) {

        this.properties = {activeTab: "all"};
        this.account = {last_workout: "", last_workout_formatted: ""};
        
        this.storage.get("account").then((data) => {
            this.account = data;
        });      
        
        this.exercise = {name: "", isMusclegroup:false,isType:false};
        
        this.stats = {
            chart : new Chart(this.chartProvider.getLineConfig()),
            heatmap: new Chart(this.chartProvider.getHeatmapConfig()),
            piechart1: new Chart(this.chartProvider.getPieConfig()),
            piechart2: new Chart(this.chartProvider.getPieConfig()),
            general: {heatmap:[],heatmap_date:"", current_streak:0,current_streak_date:"", best_streak:{start:null,end:null,streak:0},musclegroup:{breakdown:[],most_tracked:{},least_tracked:{}},exercise_type:{breakdown:[],most_tracked:{},least_tracked:{}}},
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
        
        this.getGeneralStats();
        this.getLatestExercise();
       
    }
    
    public getGeneralStats(){
        this.diaryProvider.getStats({type:"generaluserdata"}).then((data) => {
            console.log(data);
            this.stats.general = data;
            
            console.log(this.stats);
            
            if (this.stats.general.current_streak){
                this.stats.general.current_streak_date = moment().subtract(this.stats.general.current_streak*7).format("MMMM Do YYYY");
            }
            if (this.stats.general.heatmap.length > 0){
                this.stats.general.heatmap_date = this.formatDate(this.stats.general.heatmap[this.stats.general.heatmap.length - 1].assigneddate);
            }
            
            
            
            this.stats.heatmap.ref.update({xAxis: {
                type: 'datetime',
                min: new Date(this.stats.general.heatmap[this.stats.general.heatmap.length - 1].assigneddate).getTime(),
                max: new Date(this.stats.general.heatmap[0].assigneddate).getTime(), 
                labels: {
                    format: '{value:%b}',
                    step:1
                },
                showLastLabel: false,
                tickLength: 4                
            }},true);
  
            this.stats.heatmap.removeSerie(0); 

            this.stats.heatmap.addSerie({
                name: 'Session workload',
                borderWidth: 0,
                colsize: 24 * 36e5 *7 , // one day
                borderColor:'#de4223',
                data: this.formatHeatmapStats(this.stats.general.heatmap),
                dataLabels: {
                    enabled: false,
                    color: 'black',
                    style: {
                        textShadow: 'none'
                    }
                }
            });
            
            this.stats.piechart1.removeSerie(0); 
            this.stats.piechart1.addSerie({
                name: 'Percentage of total volume',
                colorByPoint: true,
                borderWidth: 0,
                data: this.formatPiechartStats(this.stats.general.musclegroup.breakdown)
            })
            
            
            this.stats.piechart2.removeSerie(0); 
            this.stats.piechart2.addSerie({
                name: 'Percentage of total volume',
                colorByPoint: true,
                borderWidth: 0,
                data: this.formatPiechartStats(this.stats.general.exercise_type.breakdown)
            })            
            
            
        });
    }
    
    private formatHeatmapStats(data){
        let formatted = [];
        for (var index in data){
            var stat = data[index];
            var date = new Date(stat.assigneddate);
            formatted.push([date.getTime(), parseInt(stat.current_day), parseInt(stat.volume)]);
        }

        return formatted.sort(function(a, b){
            return a[0] - b[0];
        });        
    }
    
    private formatPiechartStats(data){
        let formatted = [];    
        for (var index in data){
            var stat = data[index];
            formatted.push({name:index,y:stat});
        }
        return formatted;       
    }    
    
    
    public getLatestExercise(){
        this.storage.get("recentexercises").then((exercises) => { //preload from local storage
            if (exercises && exercises.length > 0){
                this.recentExercises = exercises;
                this.exercise = exercises[0];
                this.getStats();
            }
        })
                        
        this.exerciseProvider.getRecentExercises().then((exercises) => {
            this.recentExercises = exercises;
            if (!this.exercise.name){
                this.exercise = exercises[0];
                this.getStats();                
            }
        });
    }   
    
    public openChangeExercise(){
        let modal = this.modalCtrl.create(ChangeExerciseModal, {exercises:this.recentExercises}); 
        modal.onDidDismiss(exercise => {
            if (exercise){
                
                this.exercise.isMusclegroup = false;
                this.exercise.isType = false; 
                               
                if (exercise.selectedMusclegroup){
                    this.exercise.isMusclegroup = true;
                    this.exercise.name = exercise.selectedMusclegroup;
                }
                else if (exercise.selectedType){
                    this.exercise.isType = true;
                    this.exercise.name = exercise.selectedType;
                }
                else{
                    this.exercise = exercise;
                }
                this.getStats();
            }
        })
        modal.present();        
    }  

    public getStats(){
        if (this.stats.firstLoad){
            this.stats.firstLoad = false;
            
        }
        
        let requestData = {accumulation:"Weekly", timeframe:this.stats.timeframe, metric:this.stats.metric};
        
        if (this.exercise.isMusclegroup){
            requestData["musclegroup"] = this.exercise.name;
        }
        else if (this.exercise.isType){
            requestData["type"] = this.exercise.name;
        }
        else{
            requestData["name"] = this.exercise.name;
        }
        
        this.diaryProvider.getStats(requestData).then((data) => {

            
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
            this.stats.units = " (" + this.account.units + ")";
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
    
    
    public formatDate(date){
        return moment(date).format("MMMM Do YYYY");
    }

    
    
    
    

}
