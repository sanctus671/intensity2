import { Component } from '@angular/core';
import { NavController, ModalController, Platform, NavParams, ViewController, ToastController, AlertController } from 'ionic-angular';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { Observable } from 'rxjs/Rx';

import {TimerService} from '../../providers/timer/timer';

@Component({
    selector: 'timer',
    templateUrl: 'timer.html'
})



export class TimerModal {
    public properties: any;
    public timerOptions: any;
    
    constructor(public viewCtrl: ViewController, private timerService:TimerService) {
        this.properties = {activeTab:"stopwatch",stopwatchStarted:false,timerStarted:false, stopwatchInitialStart:true,timerInitialStart:true};
        this.timerOptions = {time:60000, timeRaw: "1970-01-01T00:01:00.000Z", playSound:false, repeat:false};
    }

    
    public getStopwatchTime(){
        
        return this.formatTime(this.timerService.stopwatch);

    }
    
    public startStopwatch(){
        this.properties.stopwatchStarted = true
        this.properties.stopwatchInitialStart = false;
        this.timerService.startStopwatch();
    }    
        
    public stopStopwatch(){
        this.properties.stopwatchStarted = false;
        this.timerService.stopStopwatch();
    }    
    
    public toggleStopwatch(){
        if (this.properties.stopwatchStarted){
            this.stopStopwatch();
        }
        else{
            this.startStopwatch();
        }
    }
        
    public resetStopwatch(){
        this.timerService.resetStopwatch();
    }
    
    public stopwatchNotZero(){
        return this.timerService.stopwatch > 0;
    }
    
    public getTimerTime(){
        this.properties.timerStarted = this.timerService.countdownTimerProperties.started;
        return this.formatTime(this.timerService.countdownTimer);
    }
    
    public startTimer(){
        this.properties.timerStarted = true;
        this.properties.timerInitialStart = false;
        this.timerService.startTimer();
    }    
        
    public stopTimer(){
        this.properties.timerStarted = false;
        this.timerService.stopTimer();
    }    
    
    public toggleTimer(){
        if (this.properties.timerStarted){
            this.stopTimer();
        }
        else{
            this.startTimer();
        }        
    }
        
    public resetTimer(){
        this.timerService.resetTimer();
    }   
    
    public updateTimerProperties(){
        let date = new Date(this.timerOptions.timeRaw);
        this.timerOptions.time = ((date.getMinutes() * 60) + date.getSeconds())*1000;
        
        this.timerService.updateTimerOptions(this.timerOptions);
    }
    
    private formatTime(time){
        if (time > 59999){
            let total = time/60000;
            let m = Math.floor(total);
            let s = Math.floor(((total - m) * 60));
            return m + ":" + ((s < 10 ? '0' : '') + s);
        }
        
        let total = time/1000;
        let s = Math.floor(total);
        let ms = Math.floor(((total - s)*100));
 
        return ((s < 10 ? '0' : '') + s) + ":" + ((ms < 10 ? '0' : '') + ms);        
    } 

    dismiss() {
        this.viewCtrl.dismiss();
    }
}