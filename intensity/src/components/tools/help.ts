import { Component } from '@angular/core';
import { NavController, ModalController, Platform, NavParams, ViewController, ToastController, AlertController } from 'ionic-angular';


@Component({
    selector: 'help',
    templateUrl: 'help.html'
})

export class HelpModal {
    constructor(public viewCtrl: ViewController) {}

    dismiss() {
        this.viewCtrl.dismiss();
    }
}