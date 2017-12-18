import { Component,ViewChild } from '@angular/core';
import { NavController, Slides, ModalController, Events, AlertController } from 'ionic-angular';

import { ExerciseProvider } from '../../providers/exercise/exercise';
import { Storage } from '@ionic/storage';

import {ExerciseSearchPipe} from '../../pipes/exercise-search';

import { RecordsModal } from '../../modals/records/records';

@Component({
  selector: 'page-records',
  templateUrl: 'records.html'
})
export class RecordsPage {

    public account: any;
    public properties: any;
    public exercises: Array<any>;
    
    constructor(public navCtrl: NavController, public modalCtrl: ModalController, public storage: Storage, private exerciseProvider: ExerciseProvider, public events: Events,private alertCtrl: AlertController) {
        this.properties = {userid:0, search:"", loading:true};
        this.exercises = [];
        
        this.storage.get("userid").then((data) => {
            this.properties.userid = data;
        });  

       this.getExercises();
        
          
       
    }
    
    
    public getExercises(){
        this.storage.get("recentexercises").then((exercises) => { //preload from local storage
            if (exercises && this.properties.loading){
                this.exercises = exercises;
            }
        })
                        
        this.exerciseProvider.getRecentExercises().then((data: Array<any>) => {
            this.properties.loading = false; 
            this.exercises = data;
        })
        .catch(() => {
            this.properties.loading = false; 
        });         
    }


    public viewRecords(exercise){
        let modal = this.modalCtrl.create(RecordsModal, {exercise: exercise }); 
        modal.present();        
    }
    
    
    public searchCancelled(){
        this.properties.search = '';
    }     

}
