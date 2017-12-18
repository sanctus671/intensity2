import { Component } from '@angular/core';
import { ViewController, ModalController } from 'ionic-angular';

import {TimerModal} from '../../components/tools/timer';
import {CalculatorModal} from '../../components/tools/calculator';
import {BodyweightModal} from '../../components/tools/bodyweight';
import {HelpModal} from '../../components/tools/help';

@Component({
    selector: 'tools-popover',
    templateUrl: 'popover.html'
})


export class PopoverPage {
    constructor(public viewCtrl: ViewController, public modalCtrl: ModalController) {}
    
    
    public openTimer(){
        let modal = this.modalCtrl.create(TimerModal); 
        modal.present();
        this.close();
        
    }

    public openCalculator(){
        let modal = this.modalCtrl.create(CalculatorModal); 
        modal.present();
        this.close();
    }
    
    public openBodyweight(){
        let modal = this.modalCtrl.create(BodyweightModal); 
        modal.present();
        this.close();
    }    
    
    public openHelp(){
        let modal = this.modalCtrl.create(HelpModal); 
        modal.present();
        this.close();
    }            

    close() {
        this.viewCtrl.dismiss();
    }
}