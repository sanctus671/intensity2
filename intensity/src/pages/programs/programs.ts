import { Component,ViewChild } from '@angular/core';
import { NavController, Slides, ModalController, Events, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';

import { AccountProvider } from '../../providers/account/account';

import { ProgramProvider } from '../../providers/program/program';

import { ProgramPage } from '../../pages/program/program';

import { CreateProgramModal } from '../../modals/create-program/create-program';

import { EditProgramModal } from '../../modals/edit-program/edit-program';

@Component({
  selector: 'page-programs',
  templateUrl: 'programs.html'
})
export class ProgramsPage {

    public account: any;
    public properties: any;
    public programs: any;
    public createdPrograms: any;
    public recentPrograms: any;
    public loading: any;

    
    constructor(public navCtrl: NavController, public modalCtrl: ModalController, public storage: Storage, private accountProvider: AccountProvider, private programProvider: ProgramProvider, public events: Events,private alertCtrl: AlertController) {
        this.properties = {activeTab: "popular", search:""};
        this.loading = {all:false,recent:false,created:false};
        
        this.storage.get("account").then((data) => {
            this.account = data;
            this.getCreatedPrograms();
        }); 
        
          
        
        this.getPrograms();
        this.getRecentPrograms();   
        
        this.events.subscribe('programs:modified', () => {
            this.getCreatedPrograms();
            this.getRecentPrograms();
            this.getPrograms();
        });           
       
    }
    
    
    
    public getPrograms(){
        this.loading.all = true;
        this.programProvider.getPrograms().then((data) => {
            this.loading.all = false;
            this.programs = data;
        })          
    }
    
    public getCreatedPrograms(){
        this.loading.created = true;
        this.programProvider.getCreatedPrograms(this.account.id).then((data) => {
            this.loading.created = false;
            this.createdPrograms = data;
        })           
    }
    
    public getRecentPrograms(){
        this.loading.recent = true;
        this.programProvider.getRecentPrograms().then((data) => {
            this.loading.recent = false;
            this.recentPrograms = data;
        })          
    }


    public checkOwnership(userid){
        return this.account.id === userid;
    }
    
    public searchStarted(){
        this.properties.activeTab = "all";
        document.getElementById("program-segments").scrollLeft += document.getElementById("program-segments").offsetWidth;
    }
    
    public openProgram(program){
        this.navCtrl.push(ProgramPage, {program: program});
    }

    public openCreateProgram(){
        let modal = this.modalCtrl.create(CreateProgramModal); 
        
        modal.onDidDismiss(program => {
            if (program){
                let alert = this.alertCtrl.create({
                    title:"Program created",
                    subTitle: "Your program has been added to the database.",
                    buttons: [
                        {
                            text: 'Dismiss',
                            role: 'cancel'
                        }                                
                    ]
                });
                alert.present(); 
                this.storage.set("previousProgram", program); 
                this.programProvider.createProgram(program).then(() => {
                    this.getCreatedPrograms();    
                });
                console.log(program);
            }
        })        
        
        modal.present();          
    }
    
    public openEditProgram(ev, program){
        ev.stopPropagation();
        ev.preventDefault();         
        let modal = this.modalCtrl.create(EditProgramModal, {program:program}); 
        modal.onDidDismiss(data => {
            if (data){
                let alert = this.alertCtrl.create({
                    title:"Program update",
                    subTitle: "Your program has successfully modified.",
                    buttons: [
                        {
                            text: 'Dismiss',
                            role: 'cancel'
                        }                                
                    ]
                });
                alert.present();    
                this.programProvider.updateProgram(data).then(() => {
                    this.events.publish('programs:modified');  
                })
                   
            }                
        });       
        
        modal.present();          
    }   
    
    
    public openDeleteProgram(ev, program, index){
        ev.stopPropagation();
        ev.preventDefault();         
        let alert = this.alertCtrl.create({
            title:"Confirm",
            subTitle: "Are you sure you want to remove this program?",
            buttons: [
                {
                    text: 'Dismiss',
                    role: 'cancel'
                },                
                {
                    text: 'Yes',
                    handler: () => {
                        this.programProvider.deleteProgram(program.id).then(() => {
                            this.events.publish('programs:modified');
                        });
                        
                    }
                }                                 
            ]
        });
        alert.present();                        
         
    }     

}
