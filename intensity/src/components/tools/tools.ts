import { Directive, HostListener } from '@angular/core';
import { PopoverController } from 'ionic-angular';
import {PopoverPage} from '../tools/popover';

@Directive({
    selector: '[tools]'
})
export class ToolsDirective {
    

    constructor(public popoverCtrl: PopoverController) {    }

    @HostListener('click', ['$event']) onClick(ev) {
        this.presentPopover(ev)
    }  
    
    
    public presentPopover(ev) {
        let popover = this.popoverCtrl.create(PopoverPage, {}, {cssClass: "tools-popover"});
        popover.present({
            ev: ev
        });

    }  

}

