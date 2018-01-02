import { Component,ViewChild } from '@angular/core';
import { NavController, Slides, ModalController, Events, AlertController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';

import { AccountProvider } from '../../providers/account/account';

import { DiaryProvider } from '../../providers/diary/diary';

import { EditProfileModal } from '../../modals/edit-profile/edit-profile';

import { DatePickerDirective } from 'ion-datepicker';

import { Camera, CameraOptions } from '@ionic-native/camera';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

import {AppSettings} from '../../app/app.settings';
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
    @ViewChild(DatePickerDirective) public datepicker: DatePickerDirective;
    
    
    public account: any;
    public profile: any;
    public properties: any;
    public activity: any;
    public session: string;
    
    constructor(public navCtrl: NavController, public modalCtrl: ModalController, public storage: Storage, private accountProvider: AccountProvider, public events: Events,private alertCtrl: AlertController, private diaryProvider: DiaryProvider, private camera: Camera,private transfer: FileTransfer, private file: File, private toastCtrl: ToastController) {
        this.properties = {activeTab: "profile", activityPage:1};
        this.account = {};
        this.profile = {};
        this.activity = {};
        
        this.storage.get("account").then((data) => {
            this.account = data;
            this.getProfile();
            this.accountProvider.getUserActivity(this.account.id, this.properties.activityPage).then((data) => {
                console.log(data);
                this.activity = data;
            })
        }); 
        
        this.storage.get("session").then((session) => { 
            this.session = session;
        })
        
        
             
       
    }
    
    
    public getProfile(){
        this.storage.get("profile" + this.account.id).then((data) => { //preload
            if (data){
                this.profile = data;
            }
        });
        this.accountProvider.getProfile(this.account.id).then((data) => {
            this.profile = data;
            console.log(data);
        })
    }
    
    
    public getMoreActivity(infiniteScroll){

        if (!this.activity.canloadmore){
            infiniteScroll.complete();
            return;
        }
        
        this.properties.activityPage = this.properties.activityPage + 1;
        
        this.accountProvider.getUserActivity(this.account.id, this.properties.activityPage).then((data) => {
            
            for (let item of data["activity"]){
                this.activity.activity.push(item);
            }
            
            this.activity.canloadmore = data["canloadmore"];    
                    
            infiniteScroll.complete();
        })
        .catch((e) => {
            infiniteScroll.complete();
        })
    }    
    

    public openEditProfile(){
        let modal = this.modalCtrl.create(EditProfileModal, {profile:this.profile}); 
        modal.onDidDismiss(profile => {
            if (profile){
                this.profile = profile;
                profile.dp = null;
                this.accountProvider.updateProfile(profile);
            }
        });
        modal.present();
    }   
    
     
    public formatDate(date){
        return moment(date).format('MMMM Do YYYY');
    }

    public copyToDate(date,workout){
        
        console.log(date);
        console.log(workout);
        
        let copy = {
            exerciseid: workout.exerciseid,
            userid: this.account.id,
            type:"sets",
            date: moment(date).format('YYYY-MM-DD'),
            assigneddate: moment(workout.assigneddate).format('YYYY-MM-DD')
        }
       
                
        this.diaryProvider.copyWorkout(copy).then((data) => {

            let alert = this.alertCtrl.create({
                title: workout.sets + " sets copied",
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

    public viewDetails(activity){
        

        let alert = this.alertCtrl.create({
            title: activity.name,
            subTitle: this.formatDate(activity.assigneddate),
            message: activity.sets + " sets of " + activity.reps + " with " + activity.weight + this.account.units,
            buttons: [
                {
                    text: 'Dismiss',
                    role: 'cancel'
                }
            ]
        });
        alert.present();        
    }  
    
    public changeAvatar(){
        let cameraOptions = {
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            destinationType: this.camera.DestinationType.FILE_URI,  
            encodingType: this.camera.EncodingType.JPEG,    
            quality: 25
        }

        this.camera.getPicture(cameraOptions)
            .then((image) => {

                const fileTransfer: FileTransferObject = this.transfer.create();                
                
                let options: FileUploadOptions = {
                    fileKey:"fileToUpload",
                    fileName: this.account.username,
                    params: {key: AppSettings.apiKey, session: this.session, controller:"edit", action:"uploaddp", userid:this.account.id},
                    mimeType : "image/jpeg"
                }
                
                let toast = this.toastCtrl.create({
                    message: 'Your image is being uploaded...',
                    duration: 3000,
                    position: 'bottom'
                });

                toast.present();                
                
                fileTransfer.upload(image, encodeURI(AppSettings.apiUrl), options).then((data) => {
                    var response = JSON.parse(data.response);
                    if (response.success === true){
                        this.profile.dp = response.data;
                        this.account.dp = AppSettings.apiUrl.replace("index.php", "") + this.profile.dp;
                    } 
                    else{
                        let alert = this.alertCtrl.create({
                            title: "Error",
                            subTitle: "There was a problem uploading your image",
                            message: JSON.stringify(response),
                            buttons: [
                                {
                                    text: 'Dismiss',
                                    role: 'cancel'
                                }
                            ]
                        });
                        alert.present();                         
                    }                      
                }, (err) => {
                    let alert = this.alertCtrl.create({
                        title: "Error",
                        subTitle: "There was a problem uploading your image",
                        message: err,
                        buttons: [
                            {
                                text: 'Dismiss',
                                role: 'cancel'
                            }
                        ]
                    });
                    alert.present();                    
                })
      
                
            }, 
            err => console.log(err));   
    }     
    
    
}
