import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { DiaryPage } from '../pages/diary/diary';
import { FriendsPage } from '../pages/friends/friends';
import { MessagesPage } from '../pages/messages/messages';
import { LeaderboardPage } from '../pages/leaderboard/leaderboard';
import { PremiumPage } from '../pages/premium/premium';
import { ProfilePage } from '../pages/profile/profile';
import { ProgramsPage } from '../pages/programs/programs';
import { RecordsPage } from '../pages/records/records';
import { StatsPage } from '../pages/stats/stats';
import { SettingsPage } from '../pages/settings/settings';

import {LoginModal} from '../modals/login/login';
import {AppSettings} from './app.settings';
import * as moment from 'moment';
import { AccountProvider } from '../providers/account/account';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = MessagesPage;
    
    premiumPage: any;
    profilePage: any;

    pages: Array<{title: string, component: any, icon: string}>;

    account: any;

    constructor(public platform: Platform, public statusBar: StatusBar, public modalCtrl: ModalController, public splashScreen: SplashScreen, private accountProvider: AccountProvider, public events: Events, public storage: Storage) {
        this.initializeApp();

        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Diary', component: DiaryPage, icon:"bookmarks" },
            { title: 'Records', component: RecordsPage, icon:"trophy" },
            { title: 'Stats', component: StatsPage, icon:"stats" },
            { title: 'Leaderboard', component: LeaderboardPage, icon:"ribbon" },
            { title: 'Friends', component: FriendsPage, icon:"people" },
            { title: 'Messages', component: MessagesPage, icon:"chatbubbles" },
            { title: 'Programs', component: ProgramsPage, icon:"calendar" },
            { title: 'Settings', component: SettingsPage, icon:"settings" }
        ];
        
        this.account = {username:"John Doe", dp: "http://api.intensityapp.com/uploads/default.png"};

        this.storage.get('session').then((session) => {
            console.log(session);
            if (!session){
                this.openLogin();
            }
            else{
                this.getAccount();
            }


        }); 
        
        
        this.premiumPage = {title: 'Premium', component: PremiumPage};
        this.profilePage = {title: 'Profile', component: ProfilePage};

    }
  
    openLogin(){
        let modal = this.modalCtrl.create(LoginModal); 
        modal.onDidDismiss(data => {
            if (data){
                this.events.publish('session:retreived');
                this.getAccount();
            }
        })
        modal.present();      
    }
  
    getAccount(){
        this.accountProvider.getAccount().then((account) => {
            this.account = account;
            if (this.account.last_workout){
                this.account.last_workout_formatted = moment(this.account.last_workout).add(1, 'd').fromNow();
            }
            else{
                this.account.last_workout = "never"
            }
            this.events.publish('user:retreived');

        });      
    }
    

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }
}
