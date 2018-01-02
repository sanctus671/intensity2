import { Component,ViewChild } from '@angular/core';
import { NavController, Slides, ModalController, Events, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';

import { AccountProvider } from '../../providers/account/account';

import { InAppPurchase } from '@ionic-native/in-app-purchase';

@Component({
  selector: 'page-premium',
  templateUrl: 'premium.html'
})
export class PremiumPage {

    public account: any;
    public product: any;

    
    constructor(public navCtrl: NavController, public modalCtrl: ModalController, public storage: Storage, private accountProvider: AccountProvider, public events: Events,private alertCtrl: AlertController, private iap: InAppPurchase) {

        
        this.storage.get("account").then((data) => {
            this.account = data;
        });        
       
        this.product = {price:4.99, title: "Premium", productId:"com.taylorhamling.intensity.premium"};
        
        this.iap
            .getProducts(['com.taylorhamling.intensity.premium'])
            .then((products) => {
                if (products.length > 0){
                    this.product = products[0];
                }
            })
            .catch((err) => {
                console.log(err);
            });          
        
        
    }
    
    
    public buyPremium(){

        this.iap
            .buy('com.taylorhamling.intensity.premium')
            .then((data)=> {
                this.account.premium = true;
                this.storage.set("account", this.account);
                this.navCtrl.popToRoot();
            })
            .catch((err)=> {
                alert(JSON.stringify(err));
                console.log(err);
            });        
    }
    
    

    public restorePremium(){
        this.iap.restorePurchases().then((products)=>{
            for (let product of products){
                if (product.productId === this.product.productId){
                    this.account.premium = true;
                    this.storage.set("account", this.account);                    
                    this.navCtrl.popToRoot();
                    return;
                }
            }
            
            
            const alert = this.alertCtrl.create({
                title: 'Error',
                subTitle: "Could not restore premium as we couldn't find it in your purchases.",
                buttons: ['OK']
            });
            alert.present();              
            
            
        })
        .catch(()=>{
            const alert = this.alertCtrl.create({
                title: 'Error',
                subTitle: "There was an error trying to restore your purchase.",
                buttons: ['OK']
            });
            alert.present();            
        })
    }    
    
    

    

}
