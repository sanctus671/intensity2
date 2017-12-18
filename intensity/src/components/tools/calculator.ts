import { Component } from '@angular/core';
import { NavController, ModalController, Platform, NavParams, ViewController, ToastController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
    selector: 'calculator',
    templateUrl: 'calculator.html'
})

export class CalculatorModal {
    public properties: any;
    public fields: any;
    public account:any;
    
    constructor(public viewCtrl: ViewController, public storage: Storage) {
        this.properties = {activeTab: "1rm"};
        this.fields = {reps:"", weight:"", bodyweight:"", gender: "", barweight:"", fullweight:"", units:"", kgplates: [20,15,10,5,2.5,1.25], lbsplates: [45,35,25,10,5,2.5]};
        
        this.storage.get("account").then((data) => {
            this.account = data;
            this.fields.units = this.account.units;
        });          
        
    }
    
    public getMax(){
        let max = 0;
        if (this.fields.reps < 10){max = Math.round((this.fields.weight/(1.0278-0.0278*this.fields.reps))*100) / 100;}
        else{max = Math.round((this.fields.weight/0.75)*100) / 100;}                       
        return max;         
    }
    
    public getWilks(){
        let wilks = 0;

        if (this.fields.gender === "Female"){
          var a =   594.31747775582, b = -27.23842536447, c = 0.82112226871, d = -0.00930733913, e = 0.00004731582, f = -0.00000009054;
        }
        else{
          var a =   -216.0475144, b = 16.2606339, c = -0.002388645, d = -0.00113732, e = 7.01863E-06, f = -1.291E-08; 
        }
        var wilksCe = 500 / (a + (b*this.fields.bodyweight) + (c*(Math.pow(this.fields.bodyweight,2))) + (d*(Math.pow(this.fields.bodyweight,3))) + (e*(Math.pow(this.fields.bodyweight,4))) + (f*(Math.pow(this.fields.bodyweight,5))));    

        wilks = Math.round(wilksCe*this.fields.weight*100)/100;
        
        return wilks;        
    }   
    
    public getPlates(){
        var weight = (this.fields.fullweight - this.fields.barweight) / 2;   
        var plates = [];
        if (this.fields.units === "kg"){
            plates = this.fields.kgplates;
        }
        else if (this.fields.units === "lbs"){
            plates = this.fields.lbsplates;
        }
        var i = 0,
            platecount = plates.map(function () { return 0; }); // returns an array and for each element of coins zero
        while (i < plates.length) {
            while (plates[i] <= weight) {
                weight -= plates[i];
                platecount[i]++;
            }
            i++;
        }
        var returnString = "";
        for (var index in platecount){
            if (platecount[index] > 0){
                var count = platecount[index];
                returnString = returnString + count + "x" + plates[index] + this.fields.units + ", ";
            }
        }
        return returnString;        
    } 
    
    dismiss() {
        this.viewCtrl.dismiss();
    }
}