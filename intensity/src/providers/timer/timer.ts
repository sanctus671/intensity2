import { Injectable } from '@angular/core';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { Observable } from 'rxjs/Rx';
import { NativeAudio } from '@ionic-native/native-audio';

@Injectable()    
export class TimerService {
    
    private timer: any;
    
    public stopwatch: number;
    public stopwatchProperties: any;
    
    public countdownTimer: number;
    public countdownTimerProperties: any;
    
    private stopwatchSubscription: any;
    private timerSubscription: any;

    constructor(private nativeAudio: NativeAudio) {
        this.stopwatch = 0;
        this.countdownTimer = 60000;
        this.countdownTimerProperties = {playSound:false,repeat:true, time:60000, started:false};
        this.stopwatchProperties = {started:false};
        this.timer = TimerObservable.create(0, 10);
        this.nativeAudio.preloadSimple('timerFinished', '../../assets/audio/timer.mp3');
    }

    
    startStopwatch(){
        this.stopwatchProperties.started = true;
        this.stopwatchSubscription = this.timer.subscribe(t => { 
            this.stopwatch += 10; 
        });       
         
    }
    
    stopStopwatch(){
        this.stopwatchProperties.started = false;
        this.stopwatchSubscription.unsubscribe();
    }
    
    resetStopwatch(){
        this.stopwatch = 0;
    }
    
    
    startTimer(){
        this.countdownTimerProperties.started = true;
        this.timerSubscription = this.timer.subscribe(t => { 
            this.countdownTimer -= 10;
            if (this.countdownTimer <= 0){
                if (this.countdownTimerProperties.playSound){
                    this.nativeAudio.play('timerFinished');
                }
                if (this.countdownTimerProperties.repeat){
                    this.resetTimer();
                }
                else{
                    this.stopTimer();
                }
            } 
        });         
    }
    
    stopTimer(){
        this.countdownTimerProperties.started = false;
        this.timerSubscription.unsubscribe();
    }
    
    resetTimer(){
        console.log(this.countdownTimerProperties);
        this.countdownTimer = this.countdownTimerProperties.time;
    }    
    
    setTimer(seconds:number){
        this.countdownTimer = seconds;
    }
    
    updateTimerOptions(options:any){
        Object.assign(this.countdownTimerProperties, options);
        console.log(this.countdownTimerProperties);
        this.resetTimer();
    }
}