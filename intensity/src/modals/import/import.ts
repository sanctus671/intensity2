import { Component } from '@angular/core';
import { NavController, ModalController, Platform, NavParams, ViewController, ToastController, AlertController, LoadingController } from 'ionic-angular';

import { ExerciseProvider } from '../../providers/exercise/exercise';
import { Storage } from '@ionic/storage';

import {ExerciseSearchPipe} from '../../pipes/exercise-search';

import { EmailComposer } from '@ionic-native/email-composer';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import {AppSettings} from '../../app/app.settings';


@Component({
    selector: 'import',
    templateUrl: 'import.html'
})

export class ImportModal {

    public import:any;
    public account:any;
    public session:string;
    
    constructor(public platform: Platform, public params: NavParams, public viewCtrl: ViewController, private toastCtrl: ToastController, private exerciseProvider: ExerciseProvider, public storage: Storage, private alertCtrl: AlertController, private emailComposer: EmailComposer, public loadingCtrl: LoadingController,private transfer: FileTransfer, private file: File) {
        this.import = {type:"fitnotes", file:"", fileLocation:""};
        
        this.storage.get("account").then((data) => {
            this.account = data;
        }); 
        
        this.storage.get("session").then((session) => { 
            this.session = session;
        });      
        
    }
    
    public selectFile(ev){
        let file = ev.target.files[0];
        var reader = new FileReader();
        reader.onload = (loadEvent) => {
            let ext = file.name.split(".").pop().toLowerCase();
            
            if (ext !== "csv"){
                let alert = this.alertCtrl.create({
                    title: 'Error',
                    message: "The choosen file is not a CSV file.",
                    buttons: [
                        {
                            text: 'Dismiss',
                            role: 'cancel',
                            handler: data => {

                            }
                        }
                    ]
                });
                alert.present();  
                return;              
            }
            
            this.import.fileLocation = loadEvent.target["result"];
        }
        reader.readAsDataURL(file);   
    }
    
    public openEmail(){
        let email = {
          to: ["support@intensityapp.com"],
          subject: 'Problem with importing',
          body: 'I am having problems importing from ' + this.import.type + '. Describe the problem you are having...',
          isHtml: true
        };        

        this.emailComposer.open(email);        
    }
    
    public openImport(){
        let alert = this.alertCtrl.create({
            title: 'Confirm',
            message: 'Are you sure you want to import this data? You can not undo this.',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: data => {
                      
                    }
                },
                {
                    text: 'Start Import',
                    handler: data => {
                        let loading = this.loadingCtrl.create({
                            content: 'Importing...'
                        });  
                        loading.present();      
                        
                        
                        const fileTransfer: FileTransferObject = this.transfer.create();                

                        let options: FileUploadOptions = {
                            fileKey:"fileToUpload",
                            fileName: this.account.username,
                            params: {key: AppSettings.apiKey, session: this.session, controller:"edit", action:"uploadimport", userid:this.account.id, type:this.import.type},
                            mimeType : "text/csv"
                        }

                        fileTransfer.upload(this.import.fileLocation, encodeURI(AppSettings.apiUrl), options).then((data) => {
                            var response = JSON.parse(data.response);
                            if (response.success === true){
                                this.showSuccess();
                            } 
                            else{
                                this.showError("Error: " + JSON.stringify(response));                        
                            }                      
                        }, (err) => { 
                            this.showError("Sorry, there was an error uploading your file. ");                   
                        });                        
                                       
                    }
                }
            ]
        });
        alert.present();         
    }
    
    private showSuccess(){
        let alert = this.alertCtrl.create({
            title: 'Success',
            message: 'Your data has been imported.',
            buttons: [
                {
                    text: 'Dismiss',
                    role: 'cancel',
                    handler: data => {
                      
                    }
                }
            ]
        });
        alert.present();         
    }
    
    private showError(error){
        let alert = this.alertCtrl.create({
            title: 'Error',
            message: error,
            buttons: [
                {
                    text: 'Dismiss',
                    role: 'cancel',
                    handler: data => {
                      
                    }
                }
            ]
        });
        alert.present();            
    }

    public dismiss() {
        this.viewCtrl.dismiss();
    }
}



