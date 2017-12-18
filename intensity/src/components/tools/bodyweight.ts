import { Component } from '@angular/core';
import { NavController, ModalController, Platform, NavParams, ViewController, ToastController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';
import { Chart } from 'angular-highcharts';

import { BodyweightProvider } from '../../providers/bodyweight/bodyweight';
import { ChartProvider } from '../../providers/chart/chart';

@Component({
    selector: 'bodyweight',
    templateUrl: 'bodyweight.html'
})

export class BodyweightModal {
    public bodyweights: Array<any>;
    public account:any;
    public bodyweightChart: any;
    public bodyweight: any;
    
    constructor(public viewCtrl: ViewController, public storage: Storage, private chartProvider: ChartProvider, private bodyweightProvider: BodyweightProvider, private alertCtrl: AlertController) {
        
        let config = this.chartProvider.getLineConfig();
        config.yAxis.min = null;
        
        this.bodyweightChart = new Chart(config);
        
        this.bodyweights = [];
        
        this.bodyweightProvider.getBodyweights().then((data: Array<any>) => {
            console.log(data);
            this.bodyweights = data.sort(function(a,b){
                        var aDate = new Date(a.created); var bDate = new Date(b.created);
                        if (aDate > bDate){return -1;}
                        else if (aDate < bDate){return 1;}
                        else{return 0;}               
                    });
            
            this.bodyweightChart.removeSerie(0);
            this.bodyweightChart.addSerie({
                data: this.formatStats(data),
                name: "Weight (" + this.account.units + ")",
                color: '#de4223',
                showInLegend: false                
            })            
        })
        
        this.bodyweight = {weight:""};
        
        this.storage.get("account").then((data) => {
            this.account = data;
        });          
        
    }
    
    
    private formatStats(data){
        let formatted = [];
        for (var index in data){
            var stat = data[index];
            var date = new Date(stat.created);
            formatted.push([date.getTime(), parseFloat(stat.weight)]);
        }
        return formatted.sort(function(a, b){
            return a[0] - b[0];
        });        
    }
    
    
    
    public formatDate(date){
        return moment(date).format('MMMM Do YYYY');
    }
    
    public addBodyweight(){
        let bodyweight = {id:false, created: new Date(), weight: this.bodyweight.weight};
        this.bodyweights.unshift(bodyweight);
        console.log(this.bodyweightChart);
        this.bodyweightChart.addPoint([bodyweight.created.getTime(), parseFloat(bodyweight.weight)]);
        
        this.bodyweightProvider.addBodyweight(bodyweight.weight).then((data) => {
            bodyweight.id = data["id"];
        })
        
    }
    
    
    public removeBodyweight(bodyweight, index){
        let alert = this.alertCtrl.create({
            title:"Delete Entry",
            message: "Are you sure you want to delete this entry?",
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel'
                },
                {
                    text: 'Yes',
                    handler: data => {
                        let chartIndex = (this.bodyweights.length - 1) - index;
                        this.bodyweights.splice(index,1);
                        this.bodyweightChart.removePoint(chartIndex);   
                                             
                        if (bodyweight.id || bodyweight.requestId){
                            this.bodyweightProvider.removeBodyweight(bodyweight);
                        }
                   }
                }
            ]
        });
        alert.present();           
    }
    
    
    dismiss() {
        this.viewCtrl.dismiss();
    }
}