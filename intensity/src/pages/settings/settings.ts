import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ModalController,Platform, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AccountProvider } from '../../providers/account/account';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { DiaryProvider } from '../../providers/diary/diary';

import { EmailComposer } from '@ionic-native/email-composer';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { ImportModal } from '../../modals/import/import';
import { GoalSettingsModal } from '../../modals/goal-settings/goal-settings';

import { PremiumPage } from '../../pages/premium/premium';
/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-settings',
    templateUrl: 'settings.html',
})
export class SettingsPage {
    
    public account:any;
    public properties:any;
    public units: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, private accountProvider: AccountProvider, public events: Events, private emailComposer: EmailComposer, private iab: InAppBrowser, public modalCtrl: ModalController, public plt: Platform, private authProvider: AuthenticationProvider, private alertCtrl: AlertController, private diaryProvider: DiaryProvider) {
        this.account = {theme:"light"};
        this.units = {};
        this.properties = {exportLoading:false};
        
        this.storage.get("account").then((data) => {
            console.log(data);
            this.account = data;
            this.units = {units: this.account.units, distanceunits: this.account.distanceunits};
        });   
        
        this.storage.get("theme").then((data) => {
            if (data){
                this.account.theme = data;
            }
        });              

    }
    
    public updateSettings(){
        this.storage.set("account",this.account);
        this.accountProvider.updateSettings(this.account, this.account.id);
    }
    
    public updateTheme(){
        this.events.publish('theme:updated', this.account.theme);
        this.storage.set("theme",this.account.theme);
    }
    
    public openChangeUnits(){
        let alert = this.alertCtrl.create({
            title: 'Change Units',
            subTitle: 'Choose how to handle your existing data',
            inputs: [
                {
                    name: 'applytoall',
                    label: 'Updating Existing Sets',
                    type: 'checkbox'
                },            
                {
                    name: 'applyconvert',
                    label: 'Convert Weights',
                    type: 'checkbox'
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: data => {
                      
                    }
                },
                {
                    text: 'Change',
                    handler: data => {
                        console.log(data);
                        this.account.units = this.units.units;
                        this.storage.set("account",this.account);
                        this.accountProvider.updateSettings({units:this.account.units, applytoall:data.applytoall, applyconvert:data.applyconvert}, this.account.id);
                    }
                }
            ]
        });
        alert.present();        
    }
    
    public openChangeDistanceUnits(){
        let alert = this.alertCtrl.create({
            title: 'Change Distance Units',
            subTitle: 'Choose how to handle your existing data',
            inputs: [
                {
                    name: 'applytoall',
                    label: 'Updating Existing Sets',
                    type: 'checkbox'
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: data => {
                      console.log('Cancel clicked');
                      
                    }
                },
                {
                    text: 'Change',
                    handler: data => {
                        console.log(data);
                        this.account.distanceunits = this.units.distanceunits;
                        this.storage.set("account",this.account);
                        this.accountProvider.updateSettings({distanceunits:this.account.distanceunits, applytoall:data.applytoall}, this.account.id);
                    }
                }
            ]
        });
        alert.present();         
    }
    
    public openGoalSettings(){
        let modal = this.modalCtrl.create(GoalSettingsModal); 
        modal.onDidDismiss(imported => {
            if (imported){
                
            }
        });
        modal.present();         
    }
    
    public openImport(){
        let modal = this.modalCtrl.create(ImportModal); 
        modal.onDidDismiss(imported => {
            if (imported){
                
            }
        });
        modal.present();        
    }
    
    public exportData(){
        this.properties.exportLoading = true;
        this.diaryProvider.getExport(this.account.id).then((data) => {
            console.log(data);
            this.properties.exportLoading = false;
            window.open("http://api.intensityapp.com/" + data, '_system');
        }).catch(() => {
            this.properties.exportLoading = false;
        })        
    }

    public openRate(){
        if (this.plt.is("ios")){
            window.open("https://itunes.apple.com/WebObjects/MZStore.woa/wa/viewSoftware?id=1047407323&mt=8", '_system');
        }
        else if (this.plt.is("windows")){
            window.open("https://www.microsoft.com/en-gb/store/apps/intensity/9nblggh5ffjc", '_system');
        }
        else{
            window.open("https://play.google.com/store/apps/details?id=com.taylorhamling.intensity", '_system');
        }
        
    }
    public openFollow(){
        window.open("https://www.facebook.com/intensityapp", '_system');
    }
    
    public openEmail(){
        let email = {
          to: ["support@intensityapp.com"],
          subject: 'Subject for your support query',
          body: 'Provide details about the support you require.',
          isHtml: true
        };        

        this.emailComposer.open(email);
    }
    
    public upgrade(){
        this.navCtrl.push(PremiumPage);
    }

    
    public openChangePassword(){
        let alert = this.alertCtrl.create({
            title: 'Change Password',
            inputs: [
                {
                    name: 'currentPassword',
                    placeholder: 'Current Password',
                    type: 'password'
                },            
                {
                    name: 'password',
                    placeholder: 'Password',
                    type: 'password'
                },
                {
                    name: 'confirmPassword',
                    placeholder: 'Confirm Password',
                    type: 'password'
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: data => {
                      console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Change',
                    handler: data => {
                        if (data.currentPassword && data.password && (data.password === data.confirmPassword)) {
                            console.log(data);
                            this.authProvider.changePassword(data.currentPassword, data.password, this.account.id).then(() => {
                                let alert = this.alertCtrl.create({
                                    title: 'Success',
                                    message: 'Your password has been updated',
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
                            }).catch(() => {
                                let alert = this.alertCtrl.create({
                                    title: 'Error',
                                    message: 'The current password you entered is invalid',
                                    buttons: [
                                        {
                                            text: 'Cancel',
                                            role: 'cancel',
                                            handler: data => {
                                            }
                                        },
                                         {
                                            text: 'Try Again',
                                            handler: data => {
                                                setTimeout(() => {this.openChangePassword()},200);
                                            }
                                        }                               
                                    ]           
                                }); 
                                alert.present();                                 
                            })
                        }
                        else{
                            let alert = this.alertCtrl.create({
                                title: 'Error',
                                message: 'Passwords do not match',
                                buttons: [
                                    {
                                        text: 'Cancel',
                                        role: 'cancel',
                                        handler: data => {
                                        }
                                    },
                                     {
                                        text: 'Try Again',
                                        handler: data => {
                                            setTimeout(() => {this.openChangePassword()},200);
                                        }
                                    }                               
                                ]            
                            });
                            setTimeout(() => {alert.present()}, 200);  
                        } 
                    }
                }
            ]
        });
        alert.present();        
    }
    
    public logout(){
        this.authProvider.logout();
        this.events.publish('user:logout');          
    }
}
