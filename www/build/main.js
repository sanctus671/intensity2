webpackJsonp([0],{

/***/ 12:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppSettings; });
var AppSettings = (function () {
    function AppSettings() {
    }
    AppSettings.apiUrl = 'http://api.intensityapp.com/index.php';
    AppSettings.apiKey = 'd22c3cf2949cd85a21ddcf725f71dcef';
    return AppSettings;
}());

//# sourceMappingURL=app.settings.js.map

/***/ }),

/***/ 131:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_account_account__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_authentication_authentication__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_diary_diary__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_email_composer__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_in_app_browser__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__modals_import_import__ = __webpack_require__(364);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__modals_goal_settings_goal_settings__ = __webpack_require__(365);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_premium_premium__ = __webpack_require__(72);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SettingsPage = (function () {
    function SettingsPage(navCtrl, navParams, storage, accountProvider, events, emailComposer, iab, modalCtrl, plt, authProvider, alertCtrl, diaryProvider) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.accountProvider = accountProvider;
        this.events = events;
        this.emailComposer = emailComposer;
        this.iab = iab;
        this.modalCtrl = modalCtrl;
        this.plt = plt;
        this.authProvider = authProvider;
        this.alertCtrl = alertCtrl;
        this.diaryProvider = diaryProvider;
        this.account = { theme: "light" };
        this.units = {};
        this.properties = { exportLoading: false };
        this.storage.get("account").then(function (data) {
            _this.account = data;
            _this.units = { units: _this.account.units, distanceunits: _this.account.distanceunits };
        });
        this.storage.get("theme").then(function (data) {
            if (data) {
                _this.account.theme = data;
            }
        });
        this.events.subscribe("premium:purchased", function () {
            _this.account.premium = true;
        });
    }
    SettingsPage.prototype.updateSettings = function () {
        this.storage.set("account", this.account);
        this.events.publish("settings:updated", this.account);
        this.accountProvider.updateSettings({ autocomplete: this.account.autocomplete, leaderboard: this.account.leaderboard }, this.account.id);
    };
    SettingsPage.prototype.updateTheme = function () {
        if (!this.account.premium && this.account.theme === "dark") {
            this.account.theme = "light";
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_10__pages_premium_premium__["a" /* PremiumPage */]);
            return;
        }
        this.events.publish('theme:updated', this.account.theme);
        this.storage.set("theme", this.account.theme);
    };
    SettingsPage.prototype.openChangeUnits = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Change Units',
            subTitle: 'Choose how to handle your existing data',
            inputs: [
                {
                    name: 'applytoall',
                    label: 'Updating Existing Sets',
                    type: 'checkbox',
                    value: 'applytoall'
                },
                {
                    name: 'applyconvert',
                    label: 'Convert Weights',
                    type: 'checkbox',
                    value: 'applyconvert'
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function (data) {
                    }
                },
                {
                    text: 'Change',
                    handler: function (data) {
                        _this.account.units = _this.units.units;
                        _this.storage.set("account", _this.account);
                        var applytoall = data.indexOf('applytoall') > -1;
                        var applyconvert = data.indexOf('applyconvert') > -1;
                        _this.accountProvider.updateSettings({ units: _this.account.units, applytoall: applytoall, applyconvert: applyconvert }, _this.account.id).then(function () {
                            if (applytoall || applyconvert) {
                                _this.events.publish("goals:updated", _this.account);
                            }
                        });
                        ;
                    }
                }
            ]
        });
        alert.present();
    };
    SettingsPage.prototype.openChangeDistanceUnits = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
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
                    handler: function (data) {
                    }
                },
                {
                    text: 'Change',
                    handler: function (data) {
                        _this.account.distanceunits = _this.units.distanceunits;
                        _this.storage.set("account", _this.account);
                        var applytoall = data.indexOf('applytoall') > -1;
                        _this.accountProvider.updateSettings({ distanceunits: _this.account.distanceunits, applytoall: applytoall }, _this.account.id).then(function () {
                            if (applytoall) {
                                _this.events.publish("goals:updated", _this.account);
                            }
                        });
                    }
                }
            ]
        });
        alert.present();
    };
    SettingsPage.prototype.openGoalSettings = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_9__modals_goal_settings_goal_settings__["a" /* GoalSettingsModal */]);
        modal.onDidDismiss(function (imported) {
            if (imported) {
            }
        });
        modal.present();
    };
    SettingsPage.prototype.openImport = function () {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_8__modals_import_import__["a" /* ImportModal */]);
        modal.onDidDismiss(function (imported) {
            if (imported) {
                _this.events.publish("goals:updated", _this.account);
            }
        });
        modal.present();
    };
    SettingsPage.prototype.exportData = function () {
        var _this = this;
        this.properties.exportLoading = true;
        this.diaryProvider.getExport(this.account.id).then(function (data) {
            _this.properties.exportLoading = false;
            window.open("http://api.intensityapp.com/" + data, '_system');
        }).catch(function () {
            _this.properties.exportLoading = false;
        });
    };
    SettingsPage.prototype.openRate = function () {
        if (this.plt.is("ios")) {
            window.open("https://itunes.apple.com/WebObjects/MZStore.woa/wa/viewSoftware?id=1047407323&mt=8", '_system');
        }
        else if (this.plt.is("windows")) {
            window.open("https://www.microsoft.com/en-gb/store/apps/intensity/9nblggh5ffjc", '_system');
        }
        else {
            window.open("https://play.google.com/store/apps/details?id=com.taylorhamling.intensity", '_system');
        }
    };
    SettingsPage.prototype.openFollow = function () {
        window.open("https://www.facebook.com/intensityapp", '_system');
    };
    SettingsPage.prototype.openEmail = function () {
        var email = {
            to: ["support@intensityapp.com"],
            subject: 'Subject for your support query',
            body: 'Provide details about the support you require.',
            isHtml: true
        };
        this.emailComposer.open(email);
    };
    SettingsPage.prototype.upgrade = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_10__pages_premium_premium__["a" /* PremiumPage */]);
    };
    SettingsPage.prototype.openChangePassword = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
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
                    handler: function (data) {
                    }
                },
                {
                    text: 'Change',
                    handler: function (data) {
                        if (data.currentPassword && data.password && (data.password === data.confirmPassword)) {
                            _this.authProvider.changePassword(data.currentPassword, data.password, _this.account.id).then(function () {
                                var alert = _this.alertCtrl.create({
                                    title: 'Success',
                                    message: 'Your password has been updated',
                                    buttons: [
                                        {
                                            text: 'Dismiss',
                                            role: 'cancel',
                                            handler: function (data) {
                                            }
                                        }
                                    ]
                                });
                                alert.present();
                            }).catch(function () {
                                var alert = _this.alertCtrl.create({
                                    title: 'Error',
                                    message: 'The current password you entered is invalid',
                                    buttons: [
                                        {
                                            text: 'Cancel',
                                            role: 'cancel',
                                            handler: function (data) {
                                            }
                                        },
                                        {
                                            text: 'Try Again',
                                            handler: function (data) {
                                                setTimeout(function () { _this.openChangePassword(); }, 200);
                                            }
                                        }
                                    ]
                                });
                                alert.present();
                            });
                        }
                        else {
                            var alert_1 = _this.alertCtrl.create({
                                title: 'Error',
                                message: 'Passwords do not match',
                                buttons: [
                                    {
                                        text: 'Cancel',
                                        role: 'cancel',
                                        handler: function (data) {
                                        }
                                    },
                                    {
                                        text: 'Try Again',
                                        handler: function (data) {
                                            setTimeout(function () { _this.openChangePassword(); }, 200);
                                        }
                                    }
                                ]
                            });
                            setTimeout(function () { alert_1.present(); }, 200);
                        }
                    }
                }
            ]
        });
        alert.present();
    };
    SettingsPage.prototype.logout = function () {
        this.authProvider.logout();
        this.events.publish('user:logout');
    };
    SettingsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-settings',template:/*ion-inline-start:"D:\Taylor\Documents\Websites\intensity2\src\pages\settings\settings.html"*/`<ion-header>\n    <ion-navbar color="primary">\n        <button ion-button menuToggle>\n            <ion-icon name="menu"></ion-icon>\n        </button>\n        <ion-title>Settings</ion-title>\n\n        <ion-buttons end>\n            <button ion-button icon-only tools tappable>\n                <ion-icon name="more" ></ion-icon>\n            </button>\n        </ion-buttons>    \n        \n      \n    \n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n    \n<ion-list class="settings-list">\n    \n    <ion-list-header>\n        <h2>Diary Settings</h2>\n    </ion-list-header> \n    \n        <button ion-item detail-none (click)="openGoalSettings()">\n            Goal Settings\n            <ion-icon ios="ios-arrow-forward" md="ios-arrow-forward" item-end></ion-icon>\n        </button>\n    \n    <ion-item>\n        <ion-label>Default Units</ion-label>\n        <ion-select [(ngModel)]="units.units" (ionChange)="openChangeUnits()">\n            <ion-option value="kg">kg</ion-option>\n            <ion-option value="lbs">lbs</ion-option>\n        </ion-select>\n    </ion-item>\n    \n    <ion-item>\n        <ion-label>Default Distance Units</ion-label>\n        <ion-select [(ngModel)]="units.distanceunits" (ionChange)="openChangeDistanceUnits()">\n            <ion-option value="cm">cm</ion-option>\n            <ion-option value="inches">inches</ion-option>\n            <ion-option value="ft">ft</ion-option>\n            <ion-option value="m">m</ion-option>\n            <ion-option value="km">km</ion-option>\n            <ion-option value="miles">miles</ion-option>\n        </ion-select>\n    </ion-item>   \n    \n    <ion-item>\n        <ion-label>Theme</ion-label>\n        <ion-select [(ngModel)]="account.theme" (ionChange)="updateTheme()">\n            <ion-option value="light">Light</ion-option>\n            <ion-option value="dark">Dark (Energy Efficient)</ion-option>\n        </ion-select>\n    </ion-item>     \n    \n    <ion-item>\n        <ion-label>Autocomplete Sets</ion-label>\n        <ion-checkbox color="primary" [(ngModel)]="account.autocomplete" (ionChange)="updateSettings()"></ion-checkbox>\n    </ion-item>    \n \n    <ion-item>\n        <ion-label>Show On Leaderboard</ion-label>\n        <ion-checkbox color="primary" [(ngModel)]="account.leaderboard" (ionChange)="updateSettings()"></ion-checkbox>\n    </ion-item> \n    \n    \n    \n    \n    <ion-list-header>\n        <h2>Data</h2>\n    </ion-list-header>    \n    \n\n    <button ion-item detail-none (click)="openImport()">\n        <ion-icon name="cloud-upload" item-start></ion-icon>\n        Import Data\n        <ion-icon ios="ios-arrow-forward" md="ios-arrow-forward" item-end></ion-icon>\n    </button>   \n    \n    <ion-item>\n        <ion-icon name="download" item-start></ion-icon>\n        Export Data\n        <button ion-button outline item-end (click)="exportData()" [disabled]="properties.exportLoading">\n            <ion-spinner class="add-friend-loading" *ngIf="properties.exportLoading"></ion-spinner>\n            Download\n        </button>\n    </ion-item>  \n    \n    \n    <ion-list-header>\n        <h2>Support</h2>\n    </ion-list-header>  \n    \n <ion-item>\n    <ion-icon name="heart" item-start></ion-icon>\n    Rate The App\n    <button ion-button outline item-end (click)="openRate()">Rate</button>\n  </ion-item>    \n    \n    \n <ion-item>\n    <ion-icon name="logo-facebook" item-start></ion-icon>\n    Follow Us\n    <button ion-button outline item-end (click)="openFollow()">Follow</button>\n  </ion-item>   \n    \n    \n <ion-item>\n    <ion-icon name="mail" item-start></ion-icon>\n    Contact Support\n    <button ion-button outline item-end (click)="openEmail()">Email</button>\n  </ion-item>     \n    \n    \n    <ion-list-header>\n        <h2>Account Settings</h2>\n    </ion-list-header>      \n    \n\n\n    <button ion-item detail-none (click)="openChangePassword()">\n            <ion-icon name="unlock" item-start></ion-icon>\n        Change Password\n        <ion-icon ios="ios-arrow-forward" md="ios-arrow-forward" item-end></ion-icon>\n    </button>  \n    \n    <ion-item>\n       <ion-icon name="trophy" item-start></ion-icon>\n       Premium\n       <button ion-button outline item-end (click)="upgrade()" *ngIf="!account.premium">Upgrade</button>\n       <button ion-button outline item-end disabled *ngIf="account.premium">Purchased</button>\n     </ion-item>     \n\n\n    <button ion-item detail-none (click)="logout()">\n            <ion-icon name="lock" item-start></ion-icon>\n        Logout\n    </button> \n\n     \n</ion-list>    \n \n</ion-content>`/*ion-inline-end:"D:\Taylor\Documents\Websites\intensity2\src\pages\settings\settings.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_3__providers_account_account__["a" /* AccountProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_email_composer__["a" /* EmailComposer */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_in_app_browser__["a" /* InAppBrowser */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */], __WEBPACK_IMPORTED_MODULE_4__providers_authentication_authentication__["a" /* AuthenticationProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_5__providers_diary_diary__["a" /* DiaryProvider */]])
    ], SettingsPage);
    return SettingsPage;
}());

//# sourceMappingURL=settings.js.map

/***/ }),

/***/ 132:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessagePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_account_account__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_friends_friends__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_diary_diary__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_message_message__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_app_settings__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_friend_profile_friend_profile__ = __webpack_require__(73);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var MessagePage = (function () {
    function MessagePage(navCtrl, params, modalCtrl, storage, accountProvider, friendsProvider, diaryProvider, events, alertCtrl, messageProvider) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.params = params;
        this.modalCtrl = modalCtrl;
        this.storage = storage;
        this.accountProvider = accountProvider;
        this.friendsProvider = friendsProvider;
        this.diaryProvider = diaryProvider;
        this.events = events;
        this.alertCtrl = alertCtrl;
        this.messageProvider = messageProvider;
        this.properties = { loading: false, fromProfile: false };
        if (this.params.data.fromProfile) {
            this.properties.fromProfile = true;
        }
        this.profile = this.params.data.profile;
        this.profile.dpFull = __WEBPACK_IMPORTED_MODULE_8__app_app_settings__["a" /* AppSettings */].apiUrl.replace("index.php", "") + this.profile.dp;
        this.account = {};
        this.storage.get("account").then(function (data) {
            _this.account = data;
        });
        this.messages = [];
        this.message = "";
        this.getMessages();
        this.pingInterval = setInterval(function () {
            _this.pingMessages();
        }, 5000);
    }
    MessagePage.prototype.ionViewWillLeave = function () {
        clearInterval(this.pingInterval);
    };
    MessagePage.prototype.getMessages = function () {
        var _this = this;
        this.properties.loading = true;
        this.messageProvider.getMessages(this.profile.userid).then(function (data) {
            _this.properties.loading = false;
            _this.messages = data;
            _this.calculateMessages();
            setTimeout(function () { _this.content.scrollToBottom(); }, 200);
        }).catch(function () {
            _this.properties.loading = false;
        });
    };
    MessagePage.prototype.pingMessages = function () {
        var _this = this;
        if (this.properties.loading) {
            return;
        }
        this.messageProvider.getMessages(this.profile.userid).then(function (data) {
            if (data.length > _this.messages.length) {
                _this.messages = data;
                _this.calculateMessages();
                setTimeout(function () { _this.content.scrollToBottom(); }, 200);
            }
        }).catch(function () { });
    };
    MessagePage.prototype.calculateMessages = function () {
        for (var index in this.messages) {
            //check message before is befrom same user
            //check message after is from same user
            var indexInt = parseInt(index);
            var message = this.messages[indexInt];
            var previousMessage = this.messages[indexInt - 1];
            var nextMessage = this.messages[indexInt + 1];
            var isBefore = false;
            var isAfter = false;
            if (previousMessage && message.userid === previousMessage.userid) {
                isAfter = true;
            }
            if (nextMessage && message.userid === nextMessage.userid) {
                isBefore = true;
            }
            message.isBefore = isBefore;
            message.isAfter = isAfter;
        }
    };
    MessagePage.prototype.openProfile = function () {
        if (this.properties.fromProfile) {
            this.navCtrl.pop();
        }
        else {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_9__pages_friend_profile_friend_profile__["a" /* FriendProfilePage */], { friend: this.profile, added: true, fromMessage: true });
        }
    };
    MessagePage.prototype.sendMessage = function () {
        var _this = this;
        if (!this.message) {
            return;
        }
        var message = { id: null, message: this.message, created: new Date(), userid: this.account.id, friendid: this.profile.userid };
        this.messages.push(message);
        this.message = "";
        this.calculateMessages();
        setTimeout(function () { _this.content.scrollToBottom(); }, 200);
        this.messageProvider.createMessages(message.message, this.profile.userid).then(function (data) {
            message.id = data["id"];
        }).catch(function () { });
    };
    MessagePage.prototype.getMessageTime = function (date) {
        return __WEBPACK_IMPORTED_MODULE_3_moment__(date).fromNow();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Content */])
    ], MessagePage.prototype, "content", void 0);
    MessagePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-message',template:/*ion-inline-start:"D:\Taylor\Documents\Websites\intensity2\src\pages\message\message.html"*/`<ion-header>\n    <ion-navbar color="primary">\n        <button ion-button menuToggle>\n            <ion-icon name="menu"></ion-icon>\n        </button>\n        <ion-title>{{profile.display ? profile.display : profile.username}}</ion-title>\n\n        <ion-buttons end>\n            <button ion-button icon-only (click)="openProfile()">\n                <ion-icon name="person" ></ion-icon>\n            </button>\n        </ion-buttons>    \n        \n      \n    \n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n    \n    <div class="diary-loading" *ngIf="properties.loading">\n        <ion-spinner></ion-spinner>\n    </div>    \n    \n    \n    <ion-list class="message-list" *ngIf="!properties.loading">\n        <ion-item class="message" *ngFor="let message of messages" (click)="message.showTime = !message.showTime" [ngClass]="{\'to-message\':message.userid === account.id, \'from-message\':message.userid !== account.id, \'before\' : message.isBefore, \'after\' : message.isAfter, \'show-time\': message.showTime}" >\n            \n            <ion-avatar item-start *ngIf="message.userid !== account.id">\n                <img [src]="profile.dpFull" onerror="this.style.display=\'none\'">\n            </ion-avatar>              \n            <ion-note *ngIf="message.showTime">{{getMessageTime(message.created)}}</ion-note>\n            <p>{{message.message}}</p>\n        </ion-item>\n        \n        \n    </ion-list>\n    \n    \n \n</ion-content>\n\n\n\n<ion-footer class="diary-footer message-footer">\n        <form name="diary-exercise-form" (ngSubmit)="sendMessage()">\n            \n            <ion-input name="message" type="text" placeholder="Aa" [(ngModel)]="message"></ion-input>\n            <div class="button-container">\n                <button ion-button icon-only clear type="submit">\n                    <ion-icon name="send" ></ion-icon>\n                </button>\n            </div>\n        </form>\n</ion-footer>`/*ion-inline-end:"D:\Taylor\Documents\Websites\intensity2\src\pages\message\message.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_4__providers_account_account__["a" /* AccountProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_friends_friends__["a" /* FriendsProvider */], __WEBPACK_IMPORTED_MODULE_6__providers_diary_diary__["a" /* DiaryProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_7__providers_message_message__["a" /* MessageProvider */]])
    ], MessagePage);
    return MessagePage;
}());

//# sourceMappingURL=message.js.map

/***/ }),

/***/ 133:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessageProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_settings__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(4);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/*
  Generated class for the DiaryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var MessageProvider = (function () {
    function MessageProvider(http, storage, events) {
        this.http = http;
        this.storage = storage;
        this.events = events;
    }
    MessageProvider.prototype.getConversations = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("session").then(function (session) {
                var data = { key: __WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiKey, session: session, controller: "view", action: "getconversations" };
                _this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl, data).subscribe(function (res) {
                    if (res["success"] === true) {
                        resolve(res["data"]);
                    }
                    else {
                        reject(res);
                    }
                }, function (e) {
                    _this.events.publish("app:heartbeat");
                    reject(e);
                });
            });
        });
    };
    MessageProvider.prototype.getMessages = function (userId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("session").then(function (session) {
                var data = { key: __WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiKey, session: session, controller: "view", action: "getmessages", friendid: userId };
                _this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl, data).subscribe(function (res) {
                    if (res["success"] === true) {
                        resolve(res["data"]);
                    }
                    else {
                        reject(res);
                    }
                }, function (e) {
                    _this.events.publish("app:heartbeat");
                    reject(e);
                });
            });
        });
    };
    MessageProvider.prototype.createMessages = function (message, userId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("session").then(function (session) {
                var data = { key: __WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiKey, session: session, controller: "create", action: "savemessage", friendid: userId, message: message };
                _this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl, data).subscribe(function (res) {
                    if (res["success"] === true) {
                        resolve(res["data"]);
                    }
                    else {
                        reject(res);
                    }
                }, function (e) {
                    _this.events.publish("app:heartbeat");
                    reject(e);
                });
            });
        });
    };
    MessageProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["d" /* Events */]])
    ], MessageProvider);
    return MessageProvider;
}());

//# sourceMappingURL=message.js.map

/***/ }),

/***/ 134:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateProgramModal; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_diary_diary__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modals_select_exercise_select_exercise__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modals_edit_program_exercise_edit_program_exercise__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_premium_premium__ = __webpack_require__(72);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var CreateProgramModal = (function () {
    function CreateProgramModal(navCtrl, platform, params, viewCtrl, toastCtrl, diaryProvider, storage, alertCtrl, modalCtrl, events) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.params = params;
        this.viewCtrl = viewCtrl;
        this.toastCtrl = toastCtrl;
        this.diaryProvider = diaryProvider;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.events = events;
        this.properties = { activeTab: "Week 1" };
        this.account = {};
        this.storage.get("account").then(function (data) {
            _this.account = data;
        });
        this.storage.get("previousProgram").then(function (data) {
            if (data) {
                _this.previousProgram = data;
            }
        });
        this.program = { name: "", description: "", public: false, duration: 7, workouts: [{ day: 1, name: "Day 1", added: true, exercises: [] }] };
        if (this.params.data.program) {
            this.program = this.params.data.program;
        }
        this.tabs = [];
        this.calculateTabs();
        this.events.subscribe("premium:purchased", function () {
            _this.account.premium = true;
        });
    }
    CreateProgramModal.prototype.calculateTabs = function () {
        var tabsCount = Math.ceil(parseInt(this.program.duration) / 7);
        this.tabs = [];
        for (var x = 1; x <= tabsCount; x++) {
            this.tabs.push("Week " + x);
        }
    };
    CreateProgramModal.prototype.isInTab = function (workout) {
        var index = (this.tabs.indexOf(this.properties.activeTab)) + 1;
        var tab = Math.ceil(parseInt(workout.day) / 7);
        return index === tab;
    };
    CreateProgramModal.prototype.restoreProgram = function () {
        var _this = this;
        var alertObj = {
            title: "Confirm",
            message: "Restoring this program will overwrite your existing program.",
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel'
                },
                {
                    text: 'Restore',
                    handler: function (data) {
                        _this.properties.activeTab = "Week 1";
                        _this.program = {};
                        _this.program = _this.deepCopy(_this.previousProgram);
                        _this.calculateTabs();
                    }
                }
            ]
        };
        var alert = this.alertCtrl.create(alertObj);
        alert.present();
    };
    CreateProgramModal.prototype.deepCopy = function (oldObj) {
        var newObj = oldObj;
        if (oldObj && typeof oldObj === "object") {
            newObj = Object.prototype.toString.call(oldObj) === "[object Array]" ? [] : {};
            for (var i in oldObj) {
                newObj[i] = this.deepCopy(oldObj[i]);
            }
        }
        return newObj;
    };
    CreateProgramModal.prototype.addWeek = function () {
        this.program.duration = parseInt(this.program.duration) + 7;
        this.calculateTabs();
    };
    CreateProgramModal.prototype.openWeekOptions = function (week, index) {
        var _this = this;
        var alertObj = {
            title: week,
            cssClass: "button-only-alert",
            buttons: [
                {
                    text: 'Copy',
                    handler: function (data) {
                        _this.addWeek();
                        var newWeekStartDay = (_this.tabs.length * 7) - 7;
                        var copyWeekStartDay = (parseInt(index) * 7) + 1;
                        var copyWeekEndDay = copyWeekStartDay + 6;
                        for (var _i = 0, _a = _this.program.workouts; _i < _a.length; _i++) {
                            var workout = _a[_i];
                            if (workout.day >= copyWeekStartDay && workout.day <= copyWeekEndDay) {
                                var copy = Object.assign({}, workout);
                                copy.day += newWeekStartDay;
                                copy.name = "Day " + copy.day;
                                _this.program.workouts.push(copy);
                            }
                        }
                    },
                    cssClass: "copy-button"
                },
                {
                    text: 'Move',
                    handler: function (data) {
                        var week = parseInt(index) + 1;
                        var alertObj = {
                            title: "Move Week " + week,
                            message: "Enter where you want this week to move to. Other weeks will adjust automatically.",
                            buttons: [
                                {
                                    text: 'Cancel',
                                    role: 'cancel'
                                },
                                {
                                    text: 'Move',
                                    handler: function (data) {
                                        var moveToWeek = parseInt(data.week);
                                        if (moveToWeek === week) {
                                            return;
                                        }
                                        if (moveToWeek > (_this.tabs.length)) {
                                            while (moveToWeek > (_this.tabs.length)) {
                                                _this.addWeek();
                                            }
                                        }
                                        var daysChange = (moveToWeek - week) * 7;
                                        var moveWeekStartDay = (parseInt(index) * 7) + 1;
                                        var moveWeekEndDay = moveWeekStartDay + 6;
                                        var newWeekStartDay = moveWeekStartDay + daysChange;
                                        var newWeekEndDay = moveWeekEndDay + daysChange;
                                        for (var _i = 0, _a = _this.program.workouts; _i < _a.length; _i++) {
                                            var workout = _a[_i];
                                            if (workout.day >= moveWeekStartDay && workout.day <= moveWeekEndDay) {
                                                workout.day += daysChange;
                                            }
                                            else if (daysChange > 0 && (workout.day >= moveWeekStartDay && workout.day <= newWeekEndDay)) {
                                                workout.day -= 7;
                                            }
                                            else if (daysChange < 0 && (workout.day >= newWeekStartDay && workout.day <= moveWeekEndDay)) {
                                                workout.day += 7;
                                            }
                                        }
                                    }
                                }
                            ],
                            inputs: [{ name: "week", placeholder: "Week", type: "number", value: "" + week }]
                        };
                        var alert = _this.alertCtrl.create(alertObj);
                        setTimeout(function () {
                            alert.present();
                        }, 200);
                    },
                    cssClass: "reorder-button"
                },
                {
                    text: 'Remove',
                    handler: function (data) {
                        var alert = _this.alertCtrl.create({
                            title: "Remove " + week,
                            message: "Are you sure you want to remove this week? This will delete all workouts that belong to this week.",
                            buttons: [
                                {
                                    text: 'Cancel',
                                    role: 'cancel'
                                },
                                {
                                    text: 'Yes',
                                    handler: function (data) {
                                        //TODO: there is a bug here
                                        //delete all workouts within range of deleted week
                                        //subtract 7 from all workouts that follow deleted week
                                        var weekStartDay = (parseInt(index) * 7) + 1;
                                        var weekEndDay = weekStartDay + 6;
                                        for (var x = _this.program.workouts.length - 1; x >= 0; x--) {
                                            var workout = _this.program.workouts[0];
                                            if (workout.day >= weekStartDay && workout.day <= weekEndDay) {
                                                _this.program.workouts.splice(x, 1);
                                            }
                                            else if (workout.day > weekEndDay) {
                                                workout.day -= 7;
                                            }
                                        }
                                        _this.program.duration -= 7;
                                        if (_this.program.duration < 7) {
                                            _this.program.duration = 7;
                                            _this.program.workouts = [{ day: 1, name: "Day 1", exercises: [] }];
                                        }
                                        _this.calculateTabs();
                                    }
                                }
                            ]
                        });
                        setTimeout(function () {
                            alert.present();
                        }, 200);
                    },
                    cssClass: "remove-button"
                }
            ]
        };
        var alert = this.alertCtrl.create(alertObj);
        alert.present();
    };
    CreateProgramModal.prototype.addWorkout = function () {
        var _this = this;
        var weekIndex = this.tabs.indexOf(this.properties.activeTab);
        var weekStartDay = (weekIndex * 7) + 1;
        var weekEndDay = weekStartDay + 6;
        var newDay = weekStartDay;
        for (var _i = 0, _a = this.program.workouts; _i < _a.length; _i++) {
            var workout = _a[_i];
            if (workout.day >= weekStartDay && workout.day <= weekEndDay) {
                newDay = workout.day + 1;
            }
        }
        if (newDay > weekEndDay) {
            newDay = weekEndDay;
        }
        this.program.workouts.push({ name: "Day " + newDay, day: newDay, added: true, exercises: [] });
        setTimeout(function () { _this.content.scrollToBottom(); }, 200);
    };
    CreateProgramModal.prototype.copyWorkout = function (workout) {
        var _this = this;
        var alertObj = {
            title: "Copy " + workout.name,
            message: "Select the workouts you want to copy to.",
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel'
                },
                {
                    text: 'Copy',
                    handler: function (data) {
                        var exerciseCount = workout.exercises.length;
                        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                            var workoutIndex = data_1[_i];
                            for (var x = 0; x < exerciseCount; x++) {
                                var exercise = workout.exercises[x];
                                var copy = Object.assign({}, exercise);
                                _this.program.workouts[workoutIndex].exercises.push(copy);
                            }
                        }
                    }
                }
            ],
            inputs: []
        };
        var inputs = [];
        for (var index in this.program.workouts) {
            var workout_1 = this.program.workouts[index];
            inputs.push({ name: "workout-" + index, label: workout_1.name, value: index, type: "checkbox" });
        }
        alertObj.inputs = inputs;
        var alert = this.alertCtrl.create(alertObj);
        alert.present();
    };
    CreateProgramModal.prototype.moveWorkout = function (workout) {
        var _this = this;
        //TODO: kind of words but there is a bug
        var alertObj = {
            title: "Move " + workout.name,
            message: "Enter what day you want to move this workout to.",
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel'
                },
                {
                    text: 'Move',
                    handler: function (data) {
                        if (data.day && data.name) {
                            workout.day = data.day;
                            workout.name = data.name;
                            if (workout.day > _this.program.duration) {
                                var newDuration = ((workout.day % 7) + 1) * 7;
                                _this.program.duration = newDuration;
                                _this.calculateTabs();
                            }
                        }
                    }
                }
            ],
            inputs: [{ name: "name", placeholder: "Workout Name", type: "text", value: workout.name }, { name: "day", placeholder: "Day", type: "number", value: workout.day }]
        };
        var alert = this.alertCtrl.create(alertObj);
        alert.present();
    };
    CreateProgramModal.prototype.editWorkout = function (workout) {
        var alertObj = {
            title: "Edit Workout Name",
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel'
                },
                {
                    text: 'Update',
                    handler: function (data) {
                        if (data.name) {
                            workout.name = data.name;
                        }
                    }
                }
            ],
            inputs: [{ name: "name", placeholder: "Workout Name", type: "text", value: workout.name }]
        };
        var alert = this.alertCtrl.create(alertObj);
        alert.present();
    };
    CreateProgramModal.prototype.deleteWorkout = function (index, workout) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: "Remove " + workout.name,
            message: "Are you sure you want to remove this workout? This will delete all exercises that belong to this workout.",
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel'
                },
                {
                    text: 'Yes',
                    handler: function (data) {
                        _this.program.workouts.splice(index, 1);
                    }
                }
            ]
        });
        alert.present();
    };
    CreateProgramModal.prototype.addExercise = function (workout) {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__modals_select_exercise_select_exercise__["a" /* SelectExerciseModal */]);
        modal.onDidDismiss(function (exercise) {
            if (exercise) {
                workout.exercises.push(exercise);
            }
        });
        modal.present();
    };
    CreateProgramModal.prototype.copyExercise = function (ev, exercise, workout) {
        var _this = this;
        ev.stopPropagation();
        ev.preventDefault();
        var alertObj = {
            title: "Copy " + exercise.name,
            message: "Select the workouts you want to copy to.",
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel'
                },
                {
                    text: 'Copy',
                    handler: function (data) {
                        for (var _i = 0, data_2 = data; _i < data_2.length; _i++) {
                            var workoutIndex = data_2[_i];
                            var copy = Object.assign({}, exercise);
                            _this.program.workouts[workoutIndex].exercises.push(copy);
                        }
                    }
                }
            ],
            inputs: []
        };
        var inputs = [];
        for (var index in this.program.workouts) {
            var workout_2 = this.program.workouts[index];
            inputs.push({ name: "workout-" + index, label: workout_2.name, value: index, type: "checkbox" });
        }
        alertObj.inputs = inputs;
        var alert = this.alertCtrl.create(alertObj);
        alert.present();
    };
    CreateProgramModal.prototype.editExercise = function (ev, exercise) {
        ev.stopPropagation();
        ev.preventDefault();
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__modals_edit_program_exercise_edit_program_exercise__["a" /* EditProgramExerciseModal */], { exercise: exercise });
        modal.onDidDismiss(function (updatedExercise) {
            if (updatedExercise) {
                Object.assign(exercise, updatedExercise);
            }
        });
        modal.present();
    };
    CreateProgramModal.prototype.deleteExercise = function (ev, index, workout) {
        ev.stopPropagation();
        ev.preventDefault();
        workout.exercises.splice(index, 1);
    };
    CreateProgramModal.prototype.reorderItems = function (indexes, workout) {
        var element = workout.exercises[indexes.from];
        workout.exercises.splice(indexes.from, 1);
        workout.exercises.splice(indexes.to, 0, element);
    };
    CreateProgramModal.prototype.create = function () {
        if (!this.account.premium) {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__pages_premium_premium__["a" /* PremiumPage */]);
            return;
        }
        this.program.workouts.sort(function (a, b) {
            return a.day - b.day;
        });
        for (var _i = 0, _a = this.program.workouts; _i < _a.length; _i++) {
            var workout = _a[_i];
            workout.ordering = workout.day;
            for (var index in workout.exercise) {
                workout.exercise[index].ordering = index;
            }
        }
        this.viewCtrl.dismiss(this.program);
    };
    CreateProgramModal.prototype.dismiss = function () {
        var _this = this;
        var alertObj = {
            title: "Wait!",
            message: "By leaving, you will lose this current program.",
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel'
                },
                {
                    text: 'Continue',
                    handler: function (data) {
                        _this.viewCtrl.dismiss();
                    }
                }
            ]
        };
        var alert = this.alertCtrl.create(alertObj);
        alert.present();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Content */])
    ], CreateProgramModal.prototype, "content", void 0);
    CreateProgramModal = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'create-program',template:/*ion-inline-start:"D:\Taylor\Documents\Websites\intensity2\src\modals\create-program\create-program.html"*/`<ion-header>\n    <ion-toolbar color="primary">\n        <ion-title>\n            Create Program\n        </ion-title>\n        <ion-buttons start>\n            <button ion-button (click)="dismiss()">\n                <span ion-text showWhen="ios">Cancel</span>\n                <ion-icon name="md-close" showWhen="android, windows"></ion-icon>\n            </button>\n        </ion-buttons>\n    </ion-toolbar>\n</ion-header>\n\n\n\n<ion-content>\n    \n    <div class="restore-program" *ngIf="previousProgram" (click)="restoreProgram()">\n        <ion-icon name="refresh"></ion-icon>\n        Restore previously created program ({{previousProgram.workouts.length}} workout<span *ngIf="previousProgram.workouts.length !== 1">s</span>)\n    </div>\n    \n\n    <ion-list class="edit-profile program-info">    \n        <ion-item>\n            <ion-label floating>Program Name</ion-label>\n            <ion-input type="text" [(ngModel)]="program.name"></ion-input>\n        </ion-item>\n        \n       \n\n\n        <ion-item>\n            <ion-label floating>Description</ion-label>\n            <ion-textarea [(ngModel)]="program.description" autosize></ion-textarea>\n        </ion-item>  \n\n        <ion-item>\n            <ion-label>Public</ion-label>\n            <ion-checkbox color="primary" [(ngModel)]="program.public"></ion-checkbox>\n        </ion-item>         \n        \n        \n    </ion-list>\n    \n    \n    <div class="workout-tabs">\n        <button ion-button small (click)="properties.activeTab = tab" (press)="openWeekOptions(tab, i)" [outline]="properties.activeTab !== tab" *ngFor="let tab of tabs;let i = index">{{tab}}</button>\n        <button ion-button small clear icon-start (click)="addWeek()">\n            <ion-icon name="add"></ion-icon>\n            Add Week\n        </button>\n    </div>   \n    \n    \n        <div class="program-workouts">\n\n            <div *ngFor="let workout of program.workouts; let workoutIndex = index" class="workout-list">\n                \n                <ion-list *ngIf="isInTab(workout)">\n                    <ion-list-header>\n                        <span (click)="workout.hide = !workout.hide">{{workout.name}}</span>\n                        <ion-icon name="git-compare" item-end (click)="moveWorkout(workout)"></ion-icon>\n                        <ion-icon name="copy" item-end (click)="copyWorkout(workout)"></ion-icon>\n                        <ion-icon name="create" item-end (click)="editWorkout(workout)"></ion-icon>\n                        <ion-icon name="trash" item-end (click)="deleteWorkout(workoutIndex, workout)"></ion-icon>\n                    </ion-list-header>\n                    \n                    \n                    <ion-item-group reorder="true" (ionItemReorder)="reorderItems($event, workout)" *ngIf="!workout.hide" class="diary-sets">\n                        \n                        \n                        <ion-item *ngFor="let exercise of workout.exercises; let i = index" (click)="editExercise($event, exercise)">\n                            <h2>{{exercise.name}}</h2>\n                            <p>{{exercise.sets ? exercise.sets : 0}} set<span *ngIf="exercise.sets !== \'1\'">s</span> of {{exercise.reps ? exercise.reps : 0}} rep<span *ngIf="exercise.reps !== \'1\'">s</span><span *ngIf="exercise.percentage && exercise.percentage > 0">, {{exercise.percentage}}%</span><span *ngIf="exercise.rpe && exercise.rpe > 0">, @{{exercise.rpe}}RPE</span></p>\n                            <div class="program-exercise-actions">\n                                <ion-icon name="copy" (click)="copyExercise($event, exercise,workout)"></ion-icon>\n                                <ion-icon name="create" (click)="editExercise($event, exercise)"></ion-icon>\n                                <ion-icon name="trash" (click)="deleteExercise($event, i,workout)"></ion-icon>\n                            </div>\n                        </ion-item>\n                        \n                    </ion-item-group>\n                    \n                    <button class="program-add-exercise" ion-button small clear icon-start (click)="addExercise(workout)" *ngIf="!workout.hide">\n                        <ion-icon name="add"></ion-icon>\n                        Add Exercise\n                    </button>  \n                    \n                </ion-list>\n              \n            </div>\n\n        </div>    \n    \n    \n    <div class="add-program-workout" (click)="addWorkout()">\n        <ion-icon name="add"></ion-icon> Add Workout\n    </div>\n    \n</ion-content>\n\n<ion-footer class="add-program-footer premium-footer">\n    <button ion-button (click)="create()"><img src="assets/imgs/crown.png" *ngIf="!account.premium" /> Create Program</button>\n</ion-footer>`/*ion-inline-end:"D:\Taylor\Documents\Websites\intensity2\src\modals\create-program\create-program.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ToastController */], __WEBPACK_IMPORTED_MODULE_2__providers_diary_diary__["a" /* DiaryProvider */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */]])
    ], CreateProgramModal);
    return CreateProgramModal;
}());

//# sourceMappingURL=create-program.js.map

/***/ }),

/***/ 135:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditProgramExerciseModal; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_diary_diary__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var EditProgramExerciseModal = (function () {
    function EditProgramExerciseModal(platform, params, viewCtrl, toastCtrl, diaryProvider, storage, alertCtrl, modalCtrl) {
        this.platform = platform;
        this.params = params;
        this.viewCtrl = viewCtrl;
        this.toastCtrl = toastCtrl;
        this.diaryProvider = diaryProvider;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.exercise = {};
        Object.assign(this.exercise, params.data.exercise);
        this.exercise.rpeScaled = this.exercise.rpe ? parseFloat(this.exercise.rpe) * 10 : 80;
    }
    EditProgramExerciseModal.prototype.changeRpe = function (amount) {
        this.exercise.rpeScaled = this.exercise.rpeScaled + amount;
        if (this.exercise.rpeScaled < 60) {
            this.exercise.rpeScaled = 60;
        }
        else if (this.exercise.rpeScaled > 100) {
            this.exercise.rpeScaled = 100;
        }
    };
    EditProgramExerciseModal.prototype.determinePercentage = function () {
        var percentages = { 0: 0, 1: 100, 2: 95, 3: 90, 4: 88, 5: 86, 6: 83, 7: 80, 8: 78, 9: 76, 10: 75, 11: 72, 12: 70, 13: 66, 14: 63, 15: 60 };
        var repRounded = Math.floor(this.exercise.reps);
        this.exercise.percentage = repRounded > 15 ? 50 : percentages[repRounded];
        ;
    };
    EditProgramExerciseModal.prototype.save = function () {
        this.exercise.rpe = this.exercise.rpeScaled / 10;
        this.viewCtrl.dismiss(this.exercise);
    };
    EditProgramExerciseModal.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    EditProgramExerciseModal = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'edit-program-exercise',template:/*ion-inline-start:"D:\Taylor\Documents\Websites\intensity2\src\modals\edit-program-exercise\edit-program-exercise.html"*/`<ion-header>\n    <ion-toolbar color="primary">\n        <ion-title>\n            Edit {{exercise.name}}\n        </ion-title>\n        <ion-buttons start>\n            <button icon-start ion-button (click)="save()" showWhen="android, windows">\n                <ion-icon name="md-checkmark"></ion-icon>\n                Save\n            </button>       \n         \n            \n            <button ion-button (click)="dismiss()">\n                <span ion-text showWhen="ios">Cancel</span>\n                <ion-icon name="md-close" showWhen="android, windows"></ion-icon>\n            </button>\n        </ion-buttons>\n        \n        <ion-buttons showWhen="ios" end>\n            <button ion-button (click)="save()">\n                <span ion-text>Save</span>\n            </button>                  \n        </ion-buttons>\n    </ion-toolbar>\n</ion-header>\n\n\n\n<ion-content>\n\n    \n<ion-list class="edit-set edit-program-set">\n\n    <ion-item>\n        <ion-label floating>Reps</ion-label>\n        <ion-input type="number" [(ngModel)]="exercise.reps"></ion-input>\n    </ion-item>\n\n    <ion-item>\n        <ion-label floating>Sets</ion-label>\n        <ion-input type="number" [(ngModel)]="exercise.sets"></ion-input>\n    </ion-item>    \n    \n\n    \n    <ion-item>\n        <ion-label floating>Weight</ion-label>\n        <ion-input type="number" [(ngModel)]="exercise.weight"></ion-input>\n    </ion-item>  \n\n    <p class="weight-explanation" *ngIf="exercise.weight">\n        It is recommended to avoid setting a specific weight, and instead use a percentage (intensity). The users max for that exercise will then be used to set the weights relative to their strength levels.\n    </p>    \n    \n    <ion-list-header class="rpe-header">\n        RPE\n        <ion-badge item-end>{{exercise.rpeScaled / 10}}</ion-badge>\n    </ion-list-header>    \n    <ion-item>\n        <ion-range [(ngModel)]="exercise.rpeScaled" min="60" max="100">\n            <ion-icon range-left name="remove" (click)="changeRpe(-5)"></ion-icon>\n            <ion-icon range-right name="add" (click)="changeRpe(5)"></ion-icon>\n        </ion-range>\n    </ion-item>    \n    \n    <ion-item>\n        <ion-label floating>Intensity (%)</ion-label>\n        <ion-input type="number" [(ngModel)]="exercise.percentage"></ion-input>\n        <button ion-button outline item-end (click)="determinePercentage()">Calculate</button>\n    </ion-item>\n    \n\n    <ion-item class="set-notes">\n        <ion-label floating>Notes</ion-label>\n        <ion-textarea [(ngModel)]="exercise.notes" autosize></ion-textarea>\n    </ion-item>    \n\n    \n</ion-list>\n           \n    \n    \n    \n</ion-content>\n`/*ion-inline-end:"D:\Taylor\Documents\Websites\intensity2\src\modals\edit-program-exercise\edit-program-exercise.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ToastController */], __WEBPACK_IMPORTED_MODULE_2__providers_diary_diary__["a" /* DiaryProvider */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */]])
    ], EditProgramExerciseModal);
    return EditProgramExerciseModal;
}());

//# sourceMappingURL=edit-program-exercise.js.map

/***/ }),

/***/ 136:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TimerService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_observable_TimerObservable__ = __webpack_require__(486);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_observable_TimerObservable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_observable_TimerObservable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_native_audio__ = __webpack_require__(390);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_local_notifications__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_background_mode__ = __webpack_require__(237);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var TimerService = (function () {
    function TimerService(nativeAudio, events, platform, localNotifications, backgroundMode) {
        var _this = this;
        this.nativeAudio = nativeAudio;
        this.events = events;
        this.platform = platform;
        this.localNotifications = localNotifications;
        this.backgroundMode = backgroundMode;
        this.stopwatch = 0;
        this.countdownTimer = 60000;
        this.countdownTimerProperties = { playSound: false, repeat: false, time: 60000, started: false, force: false };
        this.stopwatchProperties = { started: false };
        this.timer = __WEBPACK_IMPORTED_MODULE_1_rxjs_observable_TimerObservable__["TimerObservable"].create(0, 10);
        this.nativeAudio.preloadComplex('timerFinished', 'assets/audio/timer.mp3', 1, 1, 0);
        this.backgroundMode.setDefaults({ silent: true });
        platform.ready().then(function () {
            _this.platform.pause.subscribe(function () {
                if (_this.stopwatchProperties.started || _this.countdownTimerProperties.started) {
                    _this.localNotifications.schedule({
                        id: 1,
                        title: 'Timer is running',
                        text: 'Continue your session!',
                        ongoing: true
                    });
                    _this.pauseTimestamp = Math.floor(Date.now());
                    if (_this.countdownTimerProperties.started && _this.countdownTimerProperties.force) {
                        if (_this.countdownTimerProperties.repeat) {
                            for (var x = 0; x < 10; x++) {
                                _this.localNotifications.schedule({
                                    id: 2 + x,
                                    title: 'Timer has completed (will repeat)',
                                    text: 'Ran for ' + (_this.countdownTimerProperties.time / 1000) + " seconds",
                                    at: new Date(new Date().getTime() + (_this.countdownTimer + (_this.countdownTimerProperties.time * x)))
                                });
                            }
                        }
                        else {
                            _this.localNotifications.schedule({
                                id: 2,
                                title: 'Timer has completed',
                                text: 'Ran for ' + (_this.countdownTimerProperties.time / 1000) + " seconds",
                                at: new Date(new Date().getTime() + _this.countdownTimer)
                            });
                        }
                    }
                }
            });
            _this.platform.resume.subscribe(function () {
                _this.localNotifications.clearAll();
                if (_this.stopwatchProperties.started) {
                    _this.stopwatch += (Math.floor(Date.now()) - _this.pauseTimestamp);
                }
                if (_this.countdownTimerProperties.started) {
                    var newTime = _this.countdownTimer - (Math.floor(Date.now()) - _this.pauseTimestamp);
                    if (newTime < 0 && _this.countdownTimerProperties.repeat) {
                        _this.stopTimer();
                        var remainder = Math.abs(newTime) % _this.countdownTimerProperties.time;
                        _this.setTimer(remainder);
                        _this.startTimer();
                    }
                    else if (newTime < 0) {
                        _this.stopTimer();
                        _this.setTimer(0);
                    }
                    else {
                        _this.stopTimer();
                        _this.setTimer(newTime);
                        _this.startTimer();
                    }
                }
            });
        });
    }
    TimerService.prototype.startStopwatch = function () {
        var _this = this;
        this.stopwatchProperties.started = true;
        this.stopwatchSubscription = this.timer.subscribe(function (t) {
            _this.stopwatch += 10;
        });
        this.events.publish("stopwatch:started");
    };
    TimerService.prototype.stopStopwatch = function () {
        this.stopwatchProperties.started = false;
        this.stopwatchSubscription.unsubscribe();
        this.events.publish("stopwatch:stopped");
    };
    TimerService.prototype.resetStopwatch = function () {
        this.stopwatch = 0;
    };
    TimerService.prototype.startTimer = function () {
        var _this = this;
        this.countdownTimerProperties.started = true;
        this.backgroundMode.enable();
        if (this.countdownTimer <= 0) {
            this.resetTimer();
        }
        /*
        this.timerSubscription = setInterval(() => {
            this.countdownTimer -= 10;
            if (this.countdownTimer <= 0){
                if (this.countdownTimerProperties.playSound){
                    this.nativeAudio.play('timerFinished');
                }
                if (this.countdownTimerProperties.repeat){
                    this.resetTimer();
                }
                else{
                    this.stopTimer();
                }
            }
        },10)
        
        */
        this.timerSubscription = this.timer.subscribe(function (t) {
            _this.countdownTimer -= 10;
            if (_this.countdownTimer <= 0) {
                if (_this.countdownTimerProperties.playSound) {
                    _this.nativeAudio.play('timerFinished');
                }
                if (_this.countdownTimerProperties.repeat) {
                    _this.resetTimer();
                }
                else {
                    _this.stopTimer();
                }
            }
        });
        this.events.publish("timer:started");
    };
    TimerService.prototype.stopTimer = function () {
        this.countdownTimerProperties.started = false;
        this.backgroundMode.disable();
        //clearInterval(this.timerSubscription);
        this.timerSubscription.unsubscribe();
        this.events.publish("timer:stopped");
    };
    TimerService.prototype.resetTimer = function () {
        this.countdownTimer = this.countdownTimerProperties.time;
    };
    TimerService.prototype.setTimer = function (seconds) {
        this.countdownTimer = seconds;
    };
    TimerService.prototype.updateTimerOptions = function (options) {
        Object.assign(this.countdownTimerProperties, options);
        this.resetTimer();
    };
    TimerService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__ionic_native_native_audio__["a" /* NativeAudio */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["m" /* Platform */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_local_notifications__["a" /* LocalNotifications */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_background_mode__["a" /* BackgroundMode */]])
    ], TimerService);
    return TimerService;
}());

//# sourceMappingURL=timer.js.map

/***/ }),

/***/ 14:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AccountProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_facebook__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_settings__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(4);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/*
  Generated class for the AuthenticationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var AccountProvider = (function () {
    function AccountProvider(http, fb, storage, events) {
        this.http = http;
        this.fb = fb;
        this.storage = storage;
        this.events = events;
    }
    AccountProvider.prototype.getAccount = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("session").then(function (session) {
                if (session) {
                    var data = { key: __WEBPACK_IMPORTED_MODULE_3__app_app_settings__["a" /* AppSettings */].apiKey, session: session, controller: "view", action: "getuser", sessionid: session };
                    _this.http.post(__WEBPACK_IMPORTED_MODULE_3__app_app_settings__["a" /* AppSettings */].apiUrl, data).subscribe(function (res) {
                        if (res["success"] === true) {
                            var user = res["data"];
                            user["dp"] = __WEBPACK_IMPORTED_MODULE_3__app_app_settings__["a" /* AppSettings */].apiUrl.replace("index.php", "") + user["dp"];
                            _this.storage.set("account", user);
                            _this.storage.set("userid", parseInt(user.id));
                            resolve(user);
                        }
                        else {
                            reject(res);
                        }
                    }, function (e) {
                        _this.events.publish("app:heartbeat");
                        _this.storage.get("account").then(function (account) {
                            if (account) {
                                resolve(account);
                                return;
                            }
                            reject(e);
                        });
                    });
                }
                else {
                    reject();
                }
            });
        });
    };
    AccountProvider.prototype.getProfile = function (userId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("session").then(function (session) {
                if (session) {
                    var data = { key: __WEBPACK_IMPORTED_MODULE_3__app_app_settings__["a" /* AppSettings */].apiKey, session: session, controller: "view", action: "getusers", id: userId };
                    _this.http.post(__WEBPACK_IMPORTED_MODULE_3__app_app_settings__["a" /* AppSettings */].apiUrl, data).subscribe(function (res) {
                        if (res["success"] === true) {
                            var user = res["data"];
                            user["dp"] = __WEBPACK_IMPORTED_MODULE_3__app_app_settings__["a" /* AppSettings */].apiUrl.replace("index.php", "") + user["dp"];
                            _this.storage.set("profile" + userId, user);
                            resolve(user);
                        }
                        else {
                            reject(res);
                        }
                    }, function (e) {
                        _this.events.publish("app:heartbeat");
                        _this.storage.get("profile" + userId).then(function (profile) {
                            if (profile) {
                                resolve(profile);
                                return;
                            }
                            reject(e);
                        });
                    });
                }
                else {
                    reject();
                }
            });
        });
    };
    AccountProvider.prototype.updateProfile = function (profile) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("session").then(function (session) {
                if (session) {
                    _this.storage.set("profile" + profile.userid, profile);
                    var requestData_1 = { key: __WEBPACK_IMPORTED_MODULE_3__app_app_settings__["a" /* AppSettings */].apiKey, session: session, controller: "edit", action: "updateprofile" };
                    Object.assign(requestData_1, profile);
                    _this.http.post(__WEBPACK_IMPORTED_MODULE_3__app_app_settings__["a" /* AppSettings */].apiUrl, requestData_1).subscribe(function (res) {
                        if (res["success"] === true) {
                            resolve(res["data"]);
                        }
                        else {
                            reject(res);
                        }
                    }, function (e) {
                        _this.events.publish("app:heartbeat");
                        _this.storage.get("failedRequests").then(function (data) {
                            var requests = data ? data : [];
                            var requestId = requests.length > 0 ? requests[requests.length - 1].id + 1 : 1;
                            requestData_1["id"] = requestId;
                            requests.push(requestData_1);
                            _this.storage.set("failedRequests", requests);
                        });
                        reject(e);
                    });
                }
                else {
                    reject();
                }
            });
        });
    };
    AccountProvider.prototype.getUserActivity = function (userId, page) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("session").then(function (session) {
                if (session) {
                    var data = { key: __WEBPACK_IMPORTED_MODULE_3__app_app_settings__["a" /* AppSettings */].apiKey, session: session, controller: "view", action: "getactivity", userid: userId, page: page, limit: 10 };
                    _this.http.post(__WEBPACK_IMPORTED_MODULE_3__app_app_settings__["a" /* AppSettings */].apiUrl, data).subscribe(function (res) {
                        if (res["success"] === true) {
                            resolve(res["data"]);
                        }
                        else {
                            reject(res);
                        }
                    }, function (e) {
                        _this.events.publish("app:heartbeat");
                        reject(e);
                    });
                }
                else {
                    reject();
                }
            });
        });
    };
    AccountProvider.prototype.updateSettings = function (settings, userId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("session").then(function (session) {
                if (session) {
                    var data = { key: __WEBPACK_IMPORTED_MODULE_3__app_app_settings__["a" /* AppSettings */].apiKey, session: session, controller: "edit", action: "updatesettings", userid: userId };
                    Object.assign(data, settings);
                    _this.http.post(__WEBPACK_IMPORTED_MODULE_3__app_app_settings__["a" /* AppSettings */].apiUrl, data).subscribe(function (res) {
                        if (res["success"] === true) {
                            resolve(res["data"]);
                        }
                        else {
                            reject(res);
                        }
                    }, function (e) {
                        _this.events.publish("app:heartbeat");
                        reject(e);
                    });
                }
                else {
                    reject();
                }
            });
        });
    };
    AccountProvider.prototype.addTarget = function (userId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("session").then(function (session) {
                if (session) {
                    var data = { key: __WEBPACK_IMPORTED_MODULE_3__app_app_settings__["a" /* AppSettings */].apiKey, session: session, controller: "create", action: "addtarget", userid: userId };
                    _this.http.post(__WEBPACK_IMPORTED_MODULE_3__app_app_settings__["a" /* AppSettings */].apiUrl, data).subscribe(function (res) {
                        if (res["success"] === true) {
                            resolve(res["data"]);
                        }
                        else {
                            reject(res);
                        }
                    }, function (e) {
                        _this.events.publish("app:heartbeat");
                        reject(e);
                    });
                }
                else {
                    reject();
                }
            });
        });
    };
    AccountProvider.prototype.updateTarget = function (target, userId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("session").then(function (session) {
                if (session) {
                    var data = { key: __WEBPACK_IMPORTED_MODULE_3__app_app_settings__["a" /* AppSettings */].apiKey, session: session, controller: "edit", action: "updatetarget", userid: userId, id: target.id, exerciseid: target.exerciseid, target: target.target };
                    _this.http.post(__WEBPACK_IMPORTED_MODULE_3__app_app_settings__["a" /* AppSettings */].apiUrl, data).subscribe(function (res) {
                        if (res["success"] === true) {
                            resolve(res["data"]);
                        }
                        else {
                            reject(res);
                        }
                    }, function (e) {
                        _this.events.publish("app:heartbeat");
                        reject(e);
                    });
                }
                else {
                    reject();
                }
            });
        });
    };
    AccountProvider.prototype.removeTarget = function (target, userId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("session").then(function (session) {
                if (session) {
                    var data = { key: __WEBPACK_IMPORTED_MODULE_3__app_app_settings__["a" /* AppSettings */].apiKey, session: session, controller: "edit", action: "deletetarget", userid: userId, id: target.id };
                    _this.http.post(__WEBPACK_IMPORTED_MODULE_3__app_app_settings__["a" /* AppSettings */].apiUrl, data).subscribe(function (res) {
                        if (res["success"] === true) {
                            resolve(res["data"]);
                        }
                        else {
                            reject(res);
                        }
                    }, function (e) {
                        _this.events.publish("app:heartbeat");
                        reject(e);
                    });
                }
                else {
                    reject();
                }
            });
        });
    };
    AccountProvider.prototype.getResets = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("session").then(function (session) {
                if (session) {
                    var data = { key: __WEBPACK_IMPORTED_MODULE_3__app_app_settings__["a" /* AppSettings */].apiKey, session: session, controller: "view", action: "getresets" };
                    _this.http.post(__WEBPACK_IMPORTED_MODULE_3__app_app_settings__["a" /* AppSettings */].apiUrl, data).subscribe(function (res) {
                        if (res["success"] === true) {
                            resolve(res["data"]);
                        }
                        else {
                            reject(res);
                        }
                    }, function (e) {
                        _this.events.publish("app:heartbeat");
                        reject(e);
                    });
                }
                else {
                    reject();
                }
            });
        });
    };
    AccountProvider.prototype.addReset = function (userId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("session").then(function (session) {
                if (session) {
                    var data = { key: __WEBPACK_IMPORTED_MODULE_3__app_app_settings__["a" /* AppSettings */].apiKey, session: session, controller: "create", action: "addreset", userid: userId };
                    _this.http.post(__WEBPACK_IMPORTED_MODULE_3__app_app_settings__["a" /* AppSettings */].apiUrl, data).subscribe(function (res) {
                        if (res["success"] === true) {
                            resolve(res["data"]);
                        }
                        else {
                            reject(res);
                        }
                    }, function (e) {
                        _this.events.publish("app:heartbeat");
                        reject(e);
                    });
                }
                else {
                    reject();
                }
            });
        });
    };
    AccountProvider.prototype.updateReset = function (reset, userId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("session").then(function (session) {
                if (session) {
                    var data = { key: __WEBPACK_IMPORTED_MODULE_3__app_app_settings__["a" /* AppSettings */].apiKey, session: session, controller: "edit", action: "updatereset", userid: userId, id: reset.id, exerciseid: reset.exerciseid, resetdate: reset.resetdate };
                    _this.http.post(__WEBPACK_IMPORTED_MODULE_3__app_app_settings__["a" /* AppSettings */].apiUrl, data).subscribe(function (res) {
                        if (res["success"] === true) {
                            resolve(res["data"]);
                        }
                        else {
                            reject(res);
                        }
                    }, function (e) {
                        _this.events.publish("app:heartbeat");
                        reject(e);
                    });
                }
                else {
                    reject();
                }
            });
        });
    };
    AccountProvider.prototype.removeReset = function (reset, userId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("session").then(function (session) {
                if (session) {
                    var data = { key: __WEBPACK_IMPORTED_MODULE_3__app_app_settings__["a" /* AppSettings */].apiKey, session: session, controller: "edit", action: "deletereset", userid: userId, id: reset.id };
                    _this.http.post(__WEBPACK_IMPORTED_MODULE_3__app_app_settings__["a" /* AppSettings */].apiUrl, data).subscribe(function (res) {
                        if (res["success"] === true) {
                            resolve(res["data"]);
                        }
                        else {
                            reject(res);
                        }
                    }, function (e) {
                        _this.events.publish("app:heartbeat");
                        reject(e);
                    });
                }
                else {
                    reject();
                }
            });
        });
    };
    AccountProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_facebook__["a" /* Facebook */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["d" /* Events */]])
    ], AccountProvider);
    return AccountProvider;
}());

//# sourceMappingURL=account.js.map

/***/ }),

/***/ 15:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DiaryProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_settings__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(4);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/*
  Generated class for the DiaryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var DiaryProvider = (function () {
    function DiaryProvider(http, storage, events) {
        this.http = http;
        this.storage = storage;
        this.events = events;
    }
    DiaryProvider.prototype.sendPush = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("session").then(function (session) {
                var data = { key: __WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiKey, session: session, controller: "view", action: "testpush" };
                _this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl, data).subscribe(function (res) {
                    resolve(res);
                }, function (e) {
                    _this.events.publish("app:heartbeat");
                    reject(e);
                });
            });
        });
    };
    DiaryProvider.prototype.getWorkout = function (date) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("session").then(function (session) {
                var data = { key: __WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiKey, session: session, controller: "view", action: "selectresults", assigneddate: date, v2: true };
                _this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl, data).subscribe(function (res) {
                    if (res["success"] === true) {
                        _this.storage.get("workouts").then(function (data) {
                            var workouts = data ? data : {};
                            workouts[date] = res["data"];
                            _this.storage.set("workouts", workouts);
                        });
                        resolve(res["data"]);
                    }
                    else {
                        reject(res);
                    }
                }, function (e) {
                    _this.events.publish("app:heartbeat");
                    _this.storage.get("workouts").then(function (data) {
                        if (data && (date in data)) {
                            resolve(data[date]);
                            return;
                        }
                        reject(e);
                    });
                });
            });
        });
    };
    DiaryProvider.prototype.getHistory = function (page, date, exerciseId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("session").then(function (session) {
                var data = { key: __WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiKey, session: session, controller: "view", action: "gethistory", exerciseid: exerciseId, assigneddate: date, page: page, limit: 50 };
                _this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl, data).subscribe(function (res) {
                    if (res["success"] === true) {
                        _this.storage.set("history" + exerciseId + date + page, data["data"]);
                        resolve(res["data"]);
                    }
                    else {
                        reject(res);
                    }
                }, function (e) {
                    _this.events.publish("app:heartbeat");
                    _this.storage.get("history" + exerciseId + date + page).then(function (data) {
                        if (data) {
                            resolve(data);
                            return;
                        }
                        reject(e);
                    });
                });
            });
        });
    };
    DiaryProvider.prototype.getStats = function (options) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("session").then(function (session) {
                var data = { key: __WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiKey, session: session, controller: "view", action: "getdata" };
                Object.assign(data, options);
                if (options["timeframe"] && options["timeframe"] === "1 Week") {
                    data["accumulation"] = "Daily";
                }
                _this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl, data).subscribe(function (res) {
                    if (res["success"] === true) {
                        var key = "";
                        for (var index in options) {
                            key = key + index;
                        }
                        _this.storage.set("stats" + key, data["data"]);
                        resolve(res["data"]);
                    }
                    else {
                        reject(res);
                    }
                }, function (e) {
                    _this.events.publish("app:heartbeat");
                    var key = "";
                    for (var index in options) {
                        key = key + index;
                    }
                    _this.storage.get("stats" + key).then(function (data) {
                        if (data) {
                            resolve(data);
                            return;
                        }
                        reject(e);
                    });
                });
            });
        });
    };
    DiaryProvider.prototype.getRecords = function (exerciseId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("session").then(function (session) {
                var data = { key: __WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiKey, session: session, controller: "view", action: "getrecords", exerciseid: exerciseId };
                _this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl, data).subscribe(function (res) {
                    if (res["success"] === true) {
                        _this.storage.set("records" + exerciseId, data["data"]);
                        resolve(res["data"]);
                    }
                    else {
                        reject(res);
                    }
                }, function (e) {
                    _this.events.publish("app:heartbeat");
                    _this.storage.get("records" + exerciseId).then(function (data) {
                        if (data) {
                            resolve(data);
                            return;
                        }
                        reject(e);
                    });
                });
            });
        });
    };
    DiaryProvider.prototype.getWorkoutDates = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("session").then(function (session) {
                var data = { key: __WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiKey, session: session, controller: "view", action: "getworkoutdates" };
                _this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl, data).subscribe(function (res) {
                    if (res["success"] === true) {
                        resolve(res);
                    }
                    else {
                        reject(res);
                    }
                }, function (e) {
                    _this.events.publish("app:heartbeat");
                    reject(e);
                });
            });
        });
    };
    DiaryProvider.prototype.addSet = function (date, exerciseId, exercise, set) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("session").then(function (session) {
                var requestData = { key: __WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiKey, session: session, controller: "create", action: "addresults", assigneddate: date, exerciseid: exerciseId, reps: set.reps, weight: set.weight, sets: set.sets, rpe: set.rpe, percentage: set.percentage };
                _this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl, requestData).subscribe(function (res) {
                    if (res["success"] === true) {
                        _this.storage.get("workouts").then(function (data) {
                            var workouts = data ? data : {};
                            var exerciseItem = { addid: null, calibrating: false, goals: exercise.goals, history: exercise.history, records: exercise.records, exerciseid: exerciseId, name: exercise.name, sets: [set] };
                            var workout = [exerciseItem];
                            if (date in data) {
                                workout = workouts[date];
                                var exerciseExists = false;
                                for (var _i = 0, workout_1 = workout; _i < workout_1.length; _i++) {
                                    var workoutExercise = workout_1[_i];
                                    if (workoutExercise.exerciseid === exerciseId) {
                                        exerciseExists = true;
                                        workoutExercise.goals = exercise.goals;
                                        workoutExercise.records = exercise.records;
                                        workoutExercise.sets.push(set);
                                    }
                                }
                                if (!exerciseExists) {
                                    workout.push(exerciseItem);
                                }
                            }
                            else {
                                workouts[date] = workout;
                            }
                            _this.storage.set("workouts", workouts);
                        });
                        resolve(res["data"]);
                    }
                    else {
                        reject(res);
                    }
                }, function (e) {
                    _this.events.publish("app:heartbeat");
                    _this.storage.get("failedRequests").then(function (data) {
                        var requests = data ? data : [];
                        var requestId = requests.length > 0 ? requests[requests.length - 1].id + 1 : 1;
                        requestData["requestId"] = requestId;
                        requests.push(requestData);
                        _this.storage.set("failedRequests", requests);
                        _this.storage.get("workouts").then(function (data) {
                            var workouts = data ? data : {};
                            set["requestId"] = requestId;
                            var exerciseItem = { addid: null, calibrating: false, goals: exercise.goals, history: exercise.history, records: exercise.records, exerciseid: exerciseId, name: exercise.name, sets: [set] };
                            var workout = [exerciseItem];
                            if (date in data) {
                                workout = workouts[date];
                                var exerciseExists = false;
                                for (var _i = 0, workout_2 = workout; _i < workout_2.length; _i++) {
                                    var workoutExercise = workout_2[_i];
                                    if (workoutExercise.exerciseid === exerciseId) {
                                        exerciseExists = true;
                                        workoutExercise.goals = exercise.goals;
                                        workoutExercise.records = exercise.records;
                                        workoutExercise.sets.push(set);
                                    }
                                }
                                if (!exerciseExists) {
                                    workout.push(exerciseItem);
                                }
                            }
                            else {
                                workouts[date] = workout;
                            }
                            _this.storage.set("workouts", workouts);
                        });
                        reject(e);
                    });
                });
            });
        });
    };
    DiaryProvider.prototype.editSet = function (date, exerciseId, set) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("session").then(function (session) {
                if (set.requestId) {
                    _this.storage.get("workouts").then(function (data) {
                        var workouts = data;
                        var workout = workouts[date]; //has to exist because this is an update to existing set
                        for (var _i = 0, workout_3 = workout; _i < workout_3.length; _i++) {
                            var workoutExercise = workout_3[_i];
                            if (workoutExercise.exerciseid === exerciseId) {
                                for (var _a = 0, _b = workoutExercise["sets"]; _a < _b.length; _a++) {
                                    var existingSet = _b[_a];
                                    if (existingSet.requestId === set.requestId) {
                                        Object.assign(existingSet, set); //not sure if this works
                                    }
                                    else if (set.massedit) {
                                        existingSet.reps = set.reps; //not sure if this works
                                        existingSet.weight = set.weight; //not sure if this works
                                    }
                                }
                            }
                        }
                        _this.storage.set("workouts", workouts);
                    });
                    _this.storage.get("failedRequests").then(function (data) {
                        var requests = data;
                        for (var _i = 0, requests_1 = requests; _i < requests_1.length; _i++) {
                            var request = requests_1[_i];
                            if (request.requestId === set.requestId) {
                                var newRequest = { key: __WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiKey, session: session, controller: "create", action: "addresults" };
                                Object.assign(newRequest, set);
                                request = newRequest; //not sure if this works
                            }
                        }
                        _this.storage.set("failedRequests", requests);
                    });
                    return;
                }
                var requestData = { key: __WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiKey, session: session, controller: "edit", action: "changeresults" };
                Object.assign(requestData, set);
                _this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl, requestData).subscribe(function (res) {
                    if (res["success"] === true) {
                        _this.storage.get("workouts").then(function (data) {
                            var workouts = data;
                            var workout = workouts[date]; //has to exist because this is an update to existing set
                            for (var _i = 0, workout_4 = workout; _i < workout_4.length; _i++) {
                                var workoutExercise = workout_4[_i];
                                if (workoutExercise.exerciseid === exerciseId) {
                                    for (var _a = 0, _b = workoutExercise["sets"]; _a < _b.length; _a++) {
                                        var existingSet = _b[_a];
                                        if (existingSet.id === set.id) {
                                            Object.assign(existingSet, set); //not sure if this works
                                        }
                                        else if (set.massedit) {
                                            existingSet.reps = set.reps; //not sure if this works
                                            existingSet.weight = set.weight; //not sure if this works
                                        }
                                    }
                                }
                            }
                            _this.storage.set("workouts", workouts);
                        });
                        resolve(res["data"]);
                    }
                    else {
                        reject(res);
                    }
                }, function (e) {
                    _this.events.publish("app:heartbeat");
                    _this.storage.get("failedRequests").then(function (data) {
                        var requests = data ? data : [];
                        var requestId = requests.length > 0 ? requests[requests.length - 1].id + 1 : 1;
                        requestData["requestId"] = requestId;
                        requests.push(requestData);
                        _this.storage.set("failedRequests", requests);
                        _this.storage.get("workouts").then(function (data) {
                            var workouts = data;
                            var workout = workouts[date]; //has to exist because this is an update to existing set
                            for (var _i = 0, workout_5 = workout; _i < workout_5.length; _i++) {
                                var workoutExercise = workout_5[_i];
                                if (workoutExercise.exerciseid === exerciseId) {
                                    for (var _a = 0, _b = workoutExercise["sets"]; _a < _b.length; _a++) {
                                        var existingSet = _b[_a];
                                        if (existingSet.id === set.id) {
                                            Object.assign(existingSet, set); //not sure if this works
                                        }
                                        else if (set.massedit) {
                                            existingSet.reps = set.reps; //not sure if this works
                                            existingSet.weight = set.weight; //not sure if this works
                                        }
                                    }
                                }
                            }
                            _this.storage.set("workouts", workouts);
                        });
                        reject(e);
                    });
                });
            });
        });
    };
    DiaryProvider.prototype.removeSet = function (date, exerciseId, set) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("session").then(function (session) {
                if (set.requestId) {
                    _this.storage.get("workouts").then(function (data) {
                        var workouts = data;
                        var workout = workouts[date]; //has to exist because this is an update to existing set
                        for (var _i = 0, workout_6 = workout; _i < workout_6.length; _i++) {
                            var workoutExercise = workout_6[_i];
                            if (workoutExercise.exerciseid === exerciseId) {
                                for (var index in workoutExercise["sets"]) {
                                    var existingSet = workoutExercise["sets"][index];
                                    if (existingSet.id === set.id) {
                                        workoutExercise["sets"].splice(index, 1); //not sure if this works
                                    }
                                }
                            }
                        }
                        _this.storage.set("workouts", workouts);
                    });
                    _this.storage.get("failedRequests").then(function (data) {
                        var requests = data;
                        for (var index in requests) {
                            var request = requests[index];
                            if (request.requestId === set.requestId) {
                                requests.splice(index, 1); //not sure if this works
                            }
                        }
                        _this.storage.set("failedRequests", requests);
                    });
                    return;
                }
                var requestData = { key: __WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiKey, session: session, controller: "edit", action: "removeresults", id: set.id };
                _this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl, requestData).subscribe(function (res) {
                    if (res["success"] === true) {
                        _this.storage.get("workouts").then(function (data) {
                            var workouts = data;
                            var workout = workouts[date]; //has to exist because this is an update to existing set
                            for (var _i = 0, workout_7 = workout; _i < workout_7.length; _i++) {
                                var workoutExercise = workout_7[_i];
                                if (workoutExercise.exerciseid === exerciseId) {
                                    for (var index in workoutExercise["sets"]) {
                                        var existingSet = workoutExercise["sets"][index];
                                        if (existingSet.id === set.id) {
                                            workoutExercise["sets"].splice(index, 1); //not sure if this works
                                        }
                                    }
                                }
                            }
                            _this.storage.set("workouts", workouts);
                        });
                        resolve(res["data"]);
                    }
                    else {
                        reject(res);
                    }
                }, function (e) {
                    _this.events.publish("app:heartbeat");
                    _this.storage.get("failedRequests").then(function (data) {
                        var requests = data ? data : [];
                        var requestId = requests.length > 0 ? requests[requests.length - 1].id + 1 : 1;
                        requestData["requestId"] = requestId;
                        requests.push(requestData);
                        _this.storage.set("failedRequests", requests);
                        _this.storage.get("workouts").then(function (data) {
                            var workouts = data;
                            var workout = workouts[date]; //has to exist because this is an update to existing set
                            for (var _i = 0, workout_8 = workout; _i < workout_8.length; _i++) {
                                var workoutExercise = workout_8[_i];
                                if (workoutExercise.exerciseid === exerciseId) {
                                    for (var index in workoutExercise["sets"]) {
                                        var existingSet = workoutExercise["sets"][index];
                                        if (existingSet.id === set.id) {
                                            workoutExercise["sets"].splice(index, 1); //not sure if this works
                                        }
                                    }
                                }
                            }
                            _this.storage.set("workouts", workouts);
                        });
                        reject(e);
                    });
                });
            });
        });
    };
    DiaryProvider.prototype.removeExercise = function (date, exerciseId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("session").then(function (session) {
                var requestData = { key: __WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiKey, session: session, controller: "edit", action: "removeresults", exerciseid: exerciseId, assigneddate: date };
                _this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl, requestData).subscribe(function (res) {
                    if (res["success"] === true) {
                        _this.storage.get("workouts").then(function (data) {
                            var workouts = data;
                            var workout = workouts[date]; //has to exist because this is an update to existing set
                            for (var index in workout) {
                                var workoutExercise = workout[index];
                                if (workoutExercise.exerciseid === exerciseId) {
                                    workout.splice(index, 1);
                                }
                            }
                            _this.storage.set("workouts", workouts);
                        });
                        resolve(res["data"]);
                    }
                    else {
                        reject(res);
                    }
                }, function (e) {
                    _this.events.publish("app:heartbeat");
                    _this.storage.get("failedRequests").then(function (data) {
                        var requests = data ? data : [];
                        var requestId = requests.length > 0 ? requests[requests.length - 1].id + 1 : 1;
                        requestData["requestId"] = requestId;
                        requests.push(requestData);
                        _this.storage.set("failedRequests", requests);
                        _this.storage.get("workouts").then(function (data) {
                            var workouts = data;
                            var workout = workouts[date]; //has to exist because this is an update to existing set
                            for (var index in workout) {
                                var workoutExercise = workout[index];
                                if (workoutExercise.exerciseid === exerciseId) {
                                    workout.splice(index, 1);
                                }
                            }
                            _this.storage.set("workouts", workouts);
                        });
                        reject(e);
                    });
                });
            });
        });
    };
    DiaryProvider.prototype.removeProgram = function (addId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("session").then(function (session) {
                var requestData = { key: __WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiKey, session: session, controller: "edit", action: "removeresults", addid: addId };
                _this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl, requestData).subscribe(function (res) {
                    if (res["success"] === true) {
                        resolve(res["data"]);
                    }
                    else {
                        reject(res);
                    }
                }, function (e) {
                    _this.events.publish("app:heartbeat");
                    reject(e);
                });
            });
        });
    };
    DiaryProvider.prototype.reorderSets = function (date, exerciseId, sets) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("session").then(function (session) {
                var requestData = { key: __WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiKey, session: session, controller: "edit", action: "changeorder", sets: sets };
                _this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl, requestData).subscribe(function (res) {
                    if (res["success"] === true) {
                        _this.storage.get("workouts").then(function (data) {
                            var workouts = data;
                            var workout = workouts[date]; //has to exist because this is an update to existing set
                            var exercise = {};
                            for (var _i = 0, workout_9 = workout; _i < workout_9.length; _i++) {
                                var workoutExercise = workout_9[_i];
                                if (workout.exerciseid === exerciseId) {
                                    exercise = workoutExercise;
                                    exercise["sets"] = sets;
                                }
                            }
                            _this.storage.set("workouts", workouts);
                        });
                        resolve(res["data"]);
                    }
                    else {
                        reject(res);
                    }
                }, function (e) {
                    _this.events.publish("app:heartbeat");
                    _this.storage.get("failedRequests").then(function (data) {
                        var requests = data ? data : [];
                        var requestId = requests.length > 0 ? requests[requests.length - 1].id + 1 : 1;
                        requestData["requestId"] = requestId;
                        requests.push(requestData);
                        _this.storage.set("failedRequests", requests);
                        _this.storage.get("workouts").then(function (data) {
                            var workouts = data;
                            var workout = workouts[date]; //has to exist because this is an update to existing set
                            var exercise = {};
                            for (var _i = 0, workout_10 = workout; _i < workout_10.length; _i++) {
                                var workoutExercise = workout_10[_i];
                                if (workout.exerciseid === exerciseId) {
                                    exercise = workoutExercise;
                                    exercise["sets"] = sets;
                                }
                            }
                            _this.storage.set("workouts", workouts);
                        });
                        reject(e);
                    });
                });
            });
        });
    };
    DiaryProvider.prototype.reorderExercises = function (date, sets) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("session").then(function (session) {
                var requestData = { key: __WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiKey, session: session, controller: "edit", action: "changeexerciseorder", sets: sets };
                _this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl, requestData).subscribe(function (res) {
                    if (res["success"] === true) {
                        resolve(res["data"]);
                    }
                    else {
                        reject(res);
                    }
                }, function (e) {
                    _this.events.publish("app:heartbeat");
                    _this.storage.get("failedRequests").then(function (data) {
                        var requests = data ? data : [];
                        var requestId = requests.length > 0 ? requests[requests.length - 1].id + 1 : 1;
                        requestData["requestId"] = requestId;
                        requests.push(requestData);
                        _this.storage.set("failedRequests", requests);
                        reject(e);
                    });
                });
            });
        });
    };
    DiaryProvider.prototype.copyWorkout = function (copyData) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("session").then(function (session) {
                var requestData = { key: __WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiKey, session: session, controller: "create", action: "copyworkout" };
                Object.assign(requestData, copyData);
                _this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl, requestData).subscribe(function (res) {
                    if (res["success"] === true) {
                        resolve(res["data"]);
                    }
                    else {
                        reject(res);
                    }
                }, function (e) {
                    _this.events.publish("app:heartbeat");
                    reject(e);
                });
            });
        });
    };
    DiaryProvider.prototype.getMaxes = function (exerciseIds) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("session").then(function (session) {
                var data = { key: __WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiKey, session: session, controller: "view", action: "massgetmax", exerciseids: exerciseIds };
                _this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl, data).subscribe(function (res) {
                    if (res["success"] === true) {
                        resolve(res["data"]);
                    }
                    else {
                        reject(res);
                    }
                }, function (e) {
                    _this.events.publish("app:heartbeat");
                    reject(e);
                });
            });
        });
    };
    DiaryProvider.prototype.updateMaxes = function (maxes) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("session").then(function (session) {
                var data = { key: __WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiKey, session: session, controller: "create", action: "massaddstats", maxes: maxes };
                _this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl, data).subscribe(function (res) {
                    if (res["success"] === true) {
                        resolve(res["data"]);
                    }
                    else {
                        reject(res);
                    }
                }, function (e) {
                    _this.events.publish("app:heartbeat");
                    reject(e);
                });
            });
        });
    };
    DiaryProvider.prototype.getExport = function (userId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("session").then(function (session) {
                var data = { key: __WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiKey, session: session, controller: "view", action: "getexport", userid: userId };
                _this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl, data).subscribe(function (res) {
                    if (res["success"] === true) {
                        resolve(res["data"]);
                    }
                    else {
                        reject(res);
                    }
                }, function (e) {
                    _this.events.publish("app:heartbeat");
                    reject(e);
                });
            });
        });
    };
    DiaryProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["d" /* Events */]])
    ], DiaryProvider);
    return DiaryProvider;
}());

//# sourceMappingURL=diary.js.map

/***/ }),

/***/ 150:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 150;

/***/ }),

/***/ 192:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 192;

/***/ }),

/***/ 22:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ExerciseProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_settings__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(4);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/*
  Generated class for the ExerciseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var ExerciseProvider = (function () {
    function ExerciseProvider(http, storage, events) {
        this.http = http;
        this.storage = storage;
        this.events = events;
    }
    ExerciseProvider.prototype.getExercises = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("exercises").then(function (exercises) {
                if (exercises) {
                    resolve(exercises);
                }
                else {
                    _this.storage.get("session").then(function (session) {
                        var data = { key: __WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiKey, session: session, controller: "view", action: "getexercises" };
                        _this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl, data).subscribe(function (res) {
                            if (res["success"] === true) {
                                _this.storage.set("exercises", res["data"]);
                                resolve(res["data"]);
                            }
                            else {
                                reject(res);
                            }
                        }, function (e) {
                            _this.events.publish("app:heartbeat");
                            reject(e);
                        });
                    });
                }
            });
        });
    };
    ExerciseProvider.prototype.getRecentExercises = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("session").then(function (session) {
                var data = { key: __WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiKey, session: session, controller: "view", action: "selectresults", type: "exercises", limit: 99 };
                _this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl, data).subscribe(function (res) {
                    if (res["success"] === true) {
                        _this.storage.set("recentexercises", res["data"]);
                        resolve(res["data"]);
                    }
                    else {
                        reject(res);
                    }
                }, function (e) {
                    _this.events.publish("app:heartbeat");
                    _this.storage.get("recentexercises").then(function (exercises) {
                        if (exercises) {
                            resolve(exercises);
                            return;
                        }
                        reject(e);
                    });
                });
            });
        });
    };
    ExerciseProvider.prototype.getRecommendedExercises = function () {
        return [
            { name: "Squats", id: "2", type: "Squat", musclegroup: "Erector Spinae, Gluteus, Hamstrings, Quadriceps", userid: "5" },
            { name: "Front squats", id: "104", musclegroup: "Gluteus, Quadriceps", type: "Squat", userid: "5" },
            { name: "Bench press", id: "1", type: "Press", musclegroup: "Deltoids, Pectoralis, Triceps", userid: "5" },
            { name: "Incline bench press", id: "105", musclegroup: "Deltoids, Pectoralis, Triceps", type: "Press", userid: "5" },
            { name: "Overhead press", id: "10", type: "Press", musclegroup: "Deltoids, Pectoralis, Triceps", userid: "5" },
            { name: "Deadlifts", id: "6", type: "Deadlift", musclegroup: "Erector Spinae, Gluteus, Hamstrings", userid: "5" },
            { name: "Sumo Deadlift", id: "11", musclegroup: "Erector Spinae, Gluteus, Hamstrings", type: "Deadlift", userid: "5" },
            { name: "Glute ham raise", id: "90", musclegroup: "Gluteus, Hamstrings", type: "", userid: "5" },
            { name: "Pullups", id: "5", type: "Pull", musclegroup: "Latissimus Dorsi, Rhomboids, Biceps", userid: "5" },
            { id: "73", name: "Pulldowns", musclegroup: "Latissimus Dorsi, Rhomboids", type: "Pull", userid: "5" },
            { name: "Bent over rows", id: "111", type: "Pull", musclegroup: "Latissimus Dorsi, Rhomboids", userid: "5" },
            { name: "Dumbell Rows", id: "4", musclegroup: "Latissimus Dorsi, Rhomboids", type: "Pull", userid: "5" },
            { name: "Facepulls", id: "7", musclegroup: "Deltoids, Rhomboids, Trapezius", type: "Pull", userid: "5" },
            { name: "Barbells Curls", id: "3", musclegroup: "Biceps", type: "Isolation", userid: "6" },
            { name: "Weighted Planks", id: "8", musclegroup: "Rectus Abdominis", type: "", userid: "5" },
        ];
    };
    ExerciseProvider.prototype.getExerciseData = function (exerciseId, date) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("session").then(function (session) {
                var data = { key: __WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiKey, session: session, controller: "view", action: "getexercisedata", exerciseid: exerciseId, assigneddate: date };
                _this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl, data).subscribe(function (res) {
                    if (res["success"] === true) {
                        _this.storage.set("exercisedata" + exerciseId + date, res["data"]);
                        resolve(res["data"]);
                    }
                    else {
                        reject(res);
                    }
                }, function (e) {
                    _this.events.publish("app:heartbeat");
                    _this.storage.get("exercisedata" + exerciseId + date).then(function (data) {
                        if (data) {
                            resolve(data);
                            return;
                        }
                        reject(e);
                    });
                });
            });
        });
    };
    ExerciseProvider.prototype.createExercise = function (exerciseName) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("session").then(function (session) {
                var data = { key: __WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiKey, session: session, controller: "create", action: "createexercise", name: exerciseName };
                _this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl, data).subscribe(function (res) {
                    if (res["success"] === true) {
                        var exercise_1 = res["data"][0];
                        exercise_1.exerciseid = exercise_1.id;
                        _this.storage.get("exercises").then(function (exercises) {
                            exercises.push(exercise_1);
                            _this.storage.set("exercises", exercises);
                        });
                        resolve(exercise_1);
                    }
                    else {
                        reject(res);
                    }
                }, function (e) {
                    _this.events.publish("app:heartbeat");
                    reject(e);
                });
            });
        });
    };
    ExerciseProvider.prototype.editExercise = function (exercise) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("session").then(function (session) {
                var data = { key: __WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiKey, session: session, controller: "edit", action: "updateexercise", id: exercise.exerciseid ? exercise.exerciseid : exercise.id, name: exercise.name, type: exercise.type, musclegroup: exercise.musclegroup };
                _this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl, data).subscribe(function (res) {
                    if (res["success"] === true) {
                        resolve(res["data"]);
                    }
                    else {
                        reject(res);
                    }
                }, function (e) {
                    _this.events.publish("app:heartbeat");
                    reject(e);
                });
            });
        });
    };
    ExerciseProvider.prototype.deleteExercise = function (exercise) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("session").then(function (session) {
                var data = { key: __WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiKey, session: session, controller: "edit", action: "deleteexercise", id: exercise.exerciseid ? exercise.exerciseid : exercise.id };
                _this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl, data).subscribe(function (res) {
                    if (res["success"] === true) {
                        resolve(res["data"]);
                    }
                    else {
                        reject(res);
                    }
                }, function (e) {
                    _this.events.publish("app:heartbeat");
                    reject(e);
                });
            });
        });
    };
    ExerciseProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["d" /* Events */]])
    ], ExerciseProvider);
    return ExerciseProvider;
}());

//# sourceMappingURL=exercise.js.map

/***/ }),

/***/ 361:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DiaryExercisePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_diary_diary__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_chart_chart__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angular_highcharts__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__modals_edit_set_edit_set__ = __webpack_require__(362);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__modals_diary_records_diary_records__ = __webpack_require__(363);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_settings_settings__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_ion_datepicker__ = __webpack_require__(52);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var DiaryExercisePage = (function () {
    function DiaryExercisePage(navCtrl, modalCtrl, storage, diaryProvider, events, params, alertCtrl, chartProvider) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.storage = storage;
        this.diaryProvider = diaryProvider;
        this.events = events;
        this.params = params;
        this.alertCtrl = alertCtrl;
        this.chartProvider = chartProvider;
        this.properties = { activeTab: "diary", reorder: false, color: '#d44735', settingGoals: false, lastLoaded: false };
        this.selectedDate = this.params.data.date;
        this.exercise = this.params.data.exercise;
        this.account = { goals: {}, units: "kg" };
        this.selectedWorkout = false;
        if (this.exercise.calibrating) {
            this.properties.color = "#d47835";
        }
        this.convertNumbers();
        this.exercise.reps = this.exercise.sets.length > 0 ? this.exercise.sets[this.exercise.sets.length - 1]["reps"] : (this.exercise.reps > 0 ? this.exercise.reps : "");
        this.exercise.weight = this.exercise.sets.length > 0 ? this.exercise.sets[this.exercise.sets.length - 1]["weight"] : (this.exercise.weight > 0 ? this.exercise.weight : "");
        this.storage.get("account").then(function (data) {
            _this.account = data;
            if (data && !_this.exercise.unit) {
                _this.exercise.unit = data.units;
            }
        });
        this.stats = {
            chart: new __WEBPACK_IMPORTED_MODULE_6_angular_highcharts__["a" /* Chart */](this.chartProvider.getLineConfig()),
            metric: "volume",
            timeframe: "forever",
            units: "",
            firstLoad: true,
            extra: {
                best: {},
                worst: {},
                average: {},
                growth: {},
                units: ""
            },
            availableMetrics: ["volume", "rpe", "intensity", "weight", "volume/wilks", "best weight"]
        };
    }
    DiaryExercisePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this._updateSettingsHandler = function (data) {
            _this.account = data;
            if (data && !_this.exercise.unit) {
                _this.exercise.unit = data.units;
            }
        };
        this.events.subscribe('settings:updated', this._updateSettingsHandler);
    };
    DiaryExercisePage.prototype.ionViewWillUnload = function () {
        this.events.unsubscribe('settings:updated', this._updateSettingsHandler);
    };
    DiaryExercisePage.prototype.tabChanged = function (ev) {
        if (this.properties.activeTab === "stats") {
            this.getStats();
        }
    };
    DiaryExercisePage.prototype.updateGoals = function (requestCount, goals, delay) {
        var _this = this;
        if (requestCount >= this.properties.lastLoaded) {
            setTimeout(function () {
                if (requestCount >= _this.properties.lastLoaded) {
                    _this.exercise.goals = goals;
                }
            }, delay);
        }
    };
    DiaryExercisePage.prototype.toggleSet = function (ev, set) {
        var _this = this;
        ev.stopPropagation();
        ev.preventDefault();
        set.completed = !set.completed;
        if (set.completed) {
            this.exercise.goals.progress = this.exercise.goals.progress + this.getProgressAmount(set);
        }
        else {
            this.exercise.goals.progress = this.exercise.goals.progress - this.getProgressAmount(set);
        }
        var requestCount = this.properties.lastLoaded + 1;
        this.properties.lastLoaded = requestCount;
        this.diaryProvider.editSet(__WEBPACK_IMPORTED_MODULE_3_moment__(this.selectedDate).format('YYYY-MM-DD'), this.exercise.exerciseid, set).then(function (data) {
            _this.updateGoals(requestCount, data["goals"], 1000);
            _this.exercise.records = data["records"];
            _this.exercise.cailbrating = data["calibrating"];
            _this.exercise.history = data["history"];
        }).catch(function () {
        });
    };
    DiaryExercisePage.prototype.addSet = function () {
        var _this = this;
        var set = {
            id: 0,
            reps: this.exercise.reps ? this.exercise.reps : 0,
            weight: this.exercise.weight ? this.exercise.weight : 0,
            percentage: this.determinePercentage(this.exercise.reps),
            rpe: 8,
            unit: this.exercise.unit,
            sets: this.exercise.sets.length > 0 ? parseInt(this.exercise.sets[this.exercise.sets.length - 1].sets) + 1 : 1,
            completed: this.account.autocomplete
        };
        this.exercise.sets.push(set);
        if (this.properties.activeTab === "diary" && this.content) {
            setTimeout(function () { _this.content.scrollToBottom(); }, 200);
        }
        if (this.account.autocomplete) {
            this.exercise.goals.progress = this.exercise.goals.progress + this.getProgressAmount(set);
        }
        this.events.publish("workout:added", { date: this.selectedDate });
        var requestCount = this.properties.lastLoaded + 1;
        this.properties.lastLoaded = requestCount;
        this.diaryProvider.addSet(__WEBPACK_IMPORTED_MODULE_3_moment__(this.selectedDate).format('YYYY-MM-DD'), this.exercise.exerciseid, this.exercise, set).then(function (data) {
            set.id = data["id"];
            console.log(requestCount + "request Completed");
            _this.updateGoals(requestCount, data["goals"], 1000);
            _this.exercise.records = data["records"];
            _this.exercise.cailbrating = data["calibrating"];
            _this.exercise.history = data["history"];
            if (_this.properties.activeTab === 'stats') {
                _this.getStats();
            }
        });
    };
    DiaryExercisePage.prototype.getProgressAmount = function (set) {
        if (this.account.goals.primary === "volume") {
            return set.reps * set.weight;
        }
        else if (this.account.goals.primary === "reps") {
            return parseFloat(set.reps);
        }
        else if (this.account.goals.primary === "weight") {
            return parseFloat(set.weight);
        }
        return 0;
    };
    DiaryExercisePage.prototype.determinePercentage = function (reps) {
        var percentages = { 0: 0, 1: 100, 2: 95, 3: 90, 4: 88, 5: 86, 6: 83, 7: 80, 8: 78, 9: 76, 10: 75, 11: 72, 12: 70, 13: 66, 14: 63, 15: 60 };
        var repRounded = Math.floor(reps);
        return repRounded > 15 ? 50 : percentages[repRounded];
        ;
    };
    DiaryExercisePage.prototype.convertNumbers = function () {
        for (var _i = 0, _a = this.exercise.sets; _i < _a.length; _i++) {
            var set = _a[_i];
            set.id = parseInt(set.id);
            set.weight = parseFloat(set.weight);
            set.reps = parseFloat(set.reps);
            set.sets = parseInt(set.sets);
            set.rpe = parseFloat(set.rpe);
            set.percentage = parseFloat(set.percentage);
            set.completed = !set.completed || set.completed === "0" ? false : true;
        }
    };
    DiaryExercisePage.prototype.reorderItems = function (indexes) {
        this.properties.reorder = false;
        var element = this.exercise.sets[indexes.from];
        this.exercise.sets.splice(indexes.from, 1);
        this.exercise.sets.splice(indexes.to, 0, element);
        var set = 1;
        for (var index in this.exercise.sets) {
            this.exercise.sets[index]["sets"] = set;
            set = set + 1;
        }
        this.diaryProvider.reorderSets(__WEBPACK_IMPORTED_MODULE_3_moment__(this.selectedDate).format('YYYY-MM-DD'), this.exercise.exerciseid, this.exercise.sets);
    };
    DiaryExercisePage.prototype.openSet = function (set, index) {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_7__modals_edit_set_edit_set__["a" /* EditSetModal */], { set: set, exercise: this.exercise });
        modal.onDidDismiss(function (updatedSet) {
            if (updatedSet && updatedSet.deleted) {
                _this.exercise.sets.splice(index, 1);
                if (set.completed) {
                    _this.exercise.goals.progress = _this.exercise.goals.progress - _this.getProgressAmount(set);
                }
                var requestCount_1 = _this.properties.lastLoaded + 1;
                _this.properties.lastLoaded = requestCount_1;
                _this.diaryProvider.removeSet(__WEBPACK_IMPORTED_MODULE_3_moment__(_this.selectedDate).format('YYYY-MM-DD'), _this.exercise.exerciseid, set).then(function (data) {
                    _this.updateGoals(requestCount_1, data["goals"], 0);
                    _this.exercise.records = data["records"];
                    _this.exercise.cailbrating = data["calibrating"];
                    _this.exercise.history = data["history"];
                });
            }
            else if (updatedSet) {
                var newAmount = _this.getProgressAmount(updatedSet);
                if (set.completed) {
                    var oldAmount = _this.getProgressAmount(set);
                    _this.exercise.goals.progress = _this.exercise.goals.progress + (newAmount - oldAmount);
                }
                Object.assign(set, updatedSet);
                if (updatedSet.updateAll) {
                    updatedSet.massedit = true;
                    set.updateAll = false;
                    for (var _i = 0, _a = _this.exercise.sets; _i < _a.length; _i++) {
                        var exerciseSet = _a[_i];
                        if (exerciseSet.completed) {
                            var oldAmount = _this.getProgressAmount(exerciseSet);
                            _this.exercise.goals.progress = _this.exercise.goals.progress + (newAmount - oldAmount);
                        }
                        exerciseSet.reps = set.reps;
                        exerciseSet.weight = set.weight;
                    }
                }
                var requestCount_2 = _this.properties.lastLoaded + 1;
                _this.properties.lastLoaded = requestCount_2;
                _this.diaryProvider.editSet(__WEBPACK_IMPORTED_MODULE_3_moment__(_this.selectedDate).format('YYYY-MM-DD'), _this.exercise.exerciseid, updatedSet).then(function (data) {
                    _this.updateGoals(requestCount_2, data["goals"], 0);
                    _this.exercise.records = data["records"];
                    _this.exercise.cailbrating = data["calibrating"];
                    _this.exercise.history = data["history"];
                });
            }
        });
        modal.present();
    };
    DiaryExercisePage.prototype.openGoalDetails = function () {
        var _this = this;
        if (this.exercise.calibrating) {
            var alert_1 = this.alertCtrl.create({
                title: "Calibrating",
                subTitle: "This is the first time you have tracked this exercise. Intensity needs to gather more data to be able to push you to reach your goals.",
                message: goalDescription,
                buttons: [
                    {
                        text: 'Dismiss',
                        role: 'cancel'
                    }
                ]
            });
            alert_1.present();
            return;
        }
        var progressPecentage = Math.round((this.exercise.goals.progress / this.exercise.goals.goal) * 100);
        var remaining = this.exercise.goals.goal - this.exercise.goals.progress;
        var remainingPercentage = Math.round((remaining / this.exercise.goals.goal) * 100);
        var goalDescription = "<br>Your goal is currently set as <strong>" + this.account.goals.target + "</strong> <strong>" + this.account.goals.primary + "</strong> grouped by <strong>" + this.account.goals.grouping + "</strong>. Your timeframe is a <strong>" + this.account.goals.timeframe + "</strong>. You can change this in your settings.<br>";
        var alert = this.alertCtrl.create({
            title: progressPecentage + "% complete",
            subTitle: remaining + this.exercise.unit + " (" + remainingPercentage + "%) to go",
            message: goalDescription,
            buttons: [
                {
                    text: 'Dismiss',
                    role: 'cancel'
                },
                {
                    text: 'Settings',
                    handler: function (data) {
                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_9__pages_settings_settings__["a" /* SettingsPage */]);
                    }
                }
            ]
        });
        alert.present();
    };
    DiaryExercisePage.prototype.openRecords = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_8__modals_diary_records_diary_records__["a" /* DiaryRecordsModal */], { exercise: this.exercise });
        modal.present();
    };
    DiaryExercisePage.prototype.getDay = function (date) {
        return __WEBPACK_IMPORTED_MODULE_3_moment__(date).format('dddd');
    };
    DiaryExercisePage.prototype.formatDate = function (date) {
        return __WEBPACK_IMPORTED_MODULE_3_moment__(date).format('MMMM Do YYYY');
    };
    DiaryExercisePage.prototype.getAverageReps = function (sets) {
        var average = 0;
        for (var _i = 0, sets_1 = sets; _i < sets_1.length; _i++) {
            var set = sets_1[_i];
            average = average + parseFloat(set.reps);
        }
        average = average / sets.length;
        return average;
    };
    DiaryExercisePage.prototype.getAverageWeight = function (sets) {
        var average = 0;
        for (var _i = 0, sets_2 = sets; _i < sets_2.length; _i++) {
            var set = sets_2[_i];
            average = average + parseFloat(set.weight);
        }
        average = average / sets.length;
        return average;
    };
    DiaryExercisePage.prototype.getUnits = function (sets) {
        if (sets.length > 0) {
            return sets[0].unit;
        }
        return this.exercise.unit;
    };
    DiaryExercisePage.prototype.loadMoreHistory = function (infiniteScroll) {
        var _this = this;
        if (!this.exercise.historyPage) {
            this.exercise.historyPage = 1;
        }
        else if (!this.exercise.canGetMoreHistory) {
            infiniteScroll.complete();
            return;
        }
        this.exercise.historyPage = this.exercise.historyPage + 1;
        this.diaryProvider.getHistory(this.exercise.historyPage, __WEBPACK_IMPORTED_MODULE_3_moment__(this.selectedDate).format('YYYY-MM-DD'), this.exercise.exerciseid).then(function (data) {
            for (var _i = 0, _a = data["history"]; _i < _a.length; _i++) {
                var item = _a[_i];
                _this.exercise.history.push(item);
            }
            _this.exercise.canGetMoreHistory = data["canloadmore"];
            infiniteScroll.complete();
        })
            .catch(function (e) {
            infiniteScroll.complete();
        });
    };
    DiaryExercisePage.prototype.copyToDate = function (date, workout) {
        var _this = this;
        if (this.selectedWorkout) {
            //for when alert box is opened instead of clicking on icon
            Object.assign(workout, this.selectedWorkout);
            this.selectedWorkout = false;
        }
        var copy = {
            exerciseid: this.exercise.exerciseid,
            userid: this.account.id,
            type: "sets",
            date: __WEBPACK_IMPORTED_MODULE_3_moment__(date).format('YYYY-MM-DD'),
            assigneddate: __WEBPACK_IMPORTED_MODULE_3_moment__(workout.assigneddate).format('YYYY-MM-DD')
        };
        if (copy.date === __WEBPACK_IMPORTED_MODULE_3_moment__(this.selectedDate).format('YYYY-MM-DD')) {
            for (var _i = 0, _a = workout.sets; _i < _a.length; _i++) {
                var set = _a[_i];
                set.id = null;
                this.exercise.sets.push(set);
                if (this.account.autocomplete) {
                    this.exercise.goals.progress = this.exercise.goals.progress + this.getProgressAmount(set);
                }
            }
        }
        this.diaryProvider.copyWorkout(copy).then(function (data) {
            _this.events.publish('workout:copied', { date: copy.date });
            var alert = _this.alertCtrl.create({
                title: workout.sets.length + " sets copied",
                subTitle: "To " + _this.formatDate(date),
                buttons: [
                    {
                        text: 'OK',
                        role: 'cancel'
                    }
                ]
            });
            alert.present();
        });
    };
    DiaryExercisePage.prototype.openWorkout = function (workout, index) {
        var _this = this;
        var setString = "";
        for (var _i = 0, _a = workout.sets; _i < _a.length; _i++) {
            var set = _a[_i];
            setString = setString + "<div class='histroy-set'>" + set['reps'] + " reps, " + set['weight'] + this.account.units + ", " + set['percentage'] + "%, " + set['rpe'] + "RPE</div>";
        }
        var alert = this.alertCtrl.create({
            title: this.getDay(workout.assigneddate),
            subTitle: this.formatDate(workout.assigneddate),
            message: setString,
            buttons: [
                {
                    text: 'Dismiss',
                    role: 'cancel'
                },
                {
                    text: 'Copy',
                    handler: function (data) {
                        _this.selectedWorkout = workout;
                        _this.datepicker.open();
                    }
                }
            ]
        });
        alert.present();
    };
    DiaryExercisePage.prototype.getStats = function () {
        var _this = this;
        if (this.stats.firstLoad) {
            this.stats.firstLoad = false;
        }
        this.diaryProvider.getStats({ accumulation: "Weekly", timeframe: this.stats.timeframe, metric: this.stats.metric, name: this.exercise.name }).then(function (data) {
            _this.setStatsUnits();
            _this.stats.chart.removeSerie(0);
            _this.stats.chart.addSerie({
                data: _this.formatStats(data),
                name: _this.stats.metric + _this.stats.units,
                color: '#de4223',
                showInLegend: false
            });
            _this.setExtraStats(data);
        }).catch(function () {
            _this.setStatsUnits();
            _this.stats.chart.removeSerie(0);
            _this.stats.chart.addSerie({
                data: [],
                name: _this.stats.metric + _this.stats.units,
                color: '#de4223',
                showInLegend: false
            });
        });
    };
    DiaryExercisePage.prototype.setStatsUnits = function () {
        this.stats.units = "";
        if (this.stats.metric.indexOf("volume") > -1 || this.stats.metric.indexOf("weight") > -1) {
            this.stats.units = " (" + this.exercise.unit + ")";
        }
        else if (this.stats.metric.indexOf("intensity") > -1) {
            this.stats.units = " (%)";
        }
    };
    DiaryExercisePage.prototype.setExtraStats = function (data) {
        this.stats.extra = {
            best: { data: 0, date: null },
            worst: { data: 10000000, date: null },
            average: { data: 0, fromDate: null, toDate: null },
            growth: { data: 0, percentage: null },
            units: this.stats.units.replace(/[()]/g, '').trim()
        };
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var stat = data_1[_i];
            if (stat.y > this.stats.extra.best.data) {
                this.stats.extra.best.data = stat.y;
                this.stats.extra.best.date = __WEBPACK_IMPORTED_MODULE_3_moment__(stat.x).format("MMMM Do YYYY");
            }
            if (stat.y < this.stats.extra.worst.data) {
                this.stats.extra.worst.data = stat.y;
                this.stats.extra.worst.date = __WEBPACK_IMPORTED_MODULE_3_moment__(stat.x).format("MMMM Do YYYY");
            }
            this.stats.extra.average.data = this.stats.extra.average.data + stat.y;
        }
        this.stats.extra.average.data = this.stats.extra.average.data / data.length;
        this.stats.extra.average.fromDate = data[data.length - 1].x;
        this.stats.extra.average.toDate = data[0].x;
        this.stats.extra.growth.data = (this.stats.extra.best.data - this.stats.extra.worst.data) / data.length;
        this.stats.extra.growth.percentage = this.stats.extra.growth.data * 100;
    };
    DiaryExercisePage.prototype.formatStats = function (data) {
        var formatted = [];
        for (var _i = 0, data_2 = data; _i < data_2.length; _i++) {
            var stat = data_2[_i];
            var date = new Date(stat.x);
            formatted.push([date.getTime(), stat.y]);
        }
        return formatted.sort(function (a, b) {
            return a[0] - b[0];
        });
    };
    DiaryExercisePage.prototype.changeStatsTimeframe = function (timeframe) {
        this.stats.timeframe = timeframe;
        this.getStats();
    };
    DiaryExercisePage.prototype.openChangeMetric = function () {
        var _this = this;
        var data = {
            title: "Change Metric",
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel'
                },
                {
                    text: 'OK',
                    handler: function (data) {
                        _this.stats.metric = data;
                        _this.getStats();
                    }
                }
            ],
            inputs: []
        };
        for (var _i = 0, _a = this.stats.availableMetrics; _i < _a.length; _i++) {
            var metric = _a[_i];
            data.inputs.push({ type: 'radio', label: metric, value: metric, checked: metric === this.stats.metric });
        }
        var alert = this.alertCtrl.create(data);
        alert.present();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Content */])
    ], DiaryExercisePage.prototype, "content", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_10_ion_datepicker__["a" /* DatePickerDirective */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_10_ion_datepicker__["a" /* DatePickerDirective */])
    ], DiaryExercisePage.prototype, "datepicker", void 0);
    DiaryExercisePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-diary-exercise',template:/*ion-inline-start:"D:\Taylor\Documents\Websites\intensity2\src\pages\diary-exercise\diary-exercise.html"*/`<ion-header>\n    <ion-navbar color="primary">\n        <button ion-button menuToggle>\n            <ion-icon name="menu"></ion-icon>\n        </button>\n        <ion-title>{{exercise.name}}</ion-title>\n\n        <ion-buttons end>\n            <button ion-button icon-only tools tappable>\n                <ion-icon name="more"></ion-icon>\n            </button>\n        </ion-buttons>    \n    \n    </ion-navbar>\n</ion-header>\n\n<ion-content class="diary-content">\n    \n    <ion-segment color="primary" [(ngModel)]="properties.activeTab" (ionChange)="tabChanged($event)">\n        <ion-segment-button value="diary">\n            Diary\n        </ion-segment-button>\n      <ion-segment-button value="history">\n            History\n      </ion-segment-button>\n      <ion-segment-button value="stats">\n            Stats\n      </ion-segment-button>        \n    </ion-segment>\n    \n    \n    <div *ngIf="properties.activeTab === \'diary\'">\n    \n        <div class="diary-progress-bar" (click)="openGoalDetails()" [hidden]="account.goals.primary === \'none\'">\n        <round-progress     \n            [current]="exercise.goals.progress"\n            [max]="exercise.goals.goal"\n            [color]="properties.color"\n            [background]="\'#eaeaea\'"\n            [radius]="115"\n            [stroke]="15"></round-progress>\n\n\n            <div class="progress-bar-inner">\n                <span></span>\n                <div class="text">\n                    {{exercise.goals.progress}}<p class="diary-exercise-unit" *ngIf="account.goals.primary !== \'reps\'">{{exercise.unit ? exercise.unit : account.units}}</p>\n                </div>\n            </div>    \n\n\n        </div>\n\n\n        <div class="diary-records">\n            <button ion-button clear icon-start color="primary" small (click)="openRecords()">\n                <ion-icon name="trophy"></ion-icon>\n                View Records\n            </button>\n        </div>\n\n\n\n\n        <ion-list class="diary-sets">\n\n            <ion-list-header class="diary-sets-header">\n\n                <span class="reps set-column">\n                    Reps\n                </span>\n\n                <span class="weight set-column">\n                    Weight\n                </span>        \n\n            </ion-list-header>\n\n\n            <ion-item-group reorder="true" (ionItemReorder)="reorderItems($event)">\n\n                <ion-item *ngFor="let set of exercise.sets; let i = index"  (click)="openSet(set, i)">\n                    <ion-icon [ngClass]="{\'completed\' : !(!set.completed || set.completed === \'0\')}" name=\'checkmark-circle\' (click)="toggleSet($event,set)"></ion-icon>\n                    <span class="reps set-column">{{set.reps}}</span>\n                    <span class="weight set-column">{{set.weight}}{{set.unit}}</span>     \n                    <ion-icon ios="ios-arrow-forward" md="ios-arrow-forward" item-end [ngClass]="{\'has-notes\' : set.notes || set.video}"></ion-icon>\n                </ion-item>\n\n            </ion-item-group>\n        </ion-list>\n\n    </div>\n    \n    \n    \n    <div *ngIf="properties.activeTab === \'history\'">\n        <ion-list class="history-sets">\n\n\n            <ion-item *ngFor="let workout of exercise.history;let lst = last;let fst = first"  (click)="openWorkout(workout, i)" [ngClass]="{\'first-item\':fst,\'last-item\':lst, \'light\':workout.sets.length <= 2, \'medium\':workout.sets.length > 2 && workout.sets.length < 6, \'heavy\':workout.sets.length > 5}">\n                <span class="history-date">\n                    <h3>{{getDay(workout.assigneddate)}}</h3>\n                    <p>{{formatDate(workout.assigneddate)}}</p>\n                </span>\n                <span class="history-details">\n                    <h3>{{workout.sets.length}} set<span *ngIf="workout.sets.length !== 1">s</span></h3>\n                    <p>{{getAverageReps(workout.sets) | number: \'1.0-0\'}} reps / {{getAverageWeight(workout.sets) | number: \'1.0-0\'}}{{getUnits(workout.sets)}}</p>\n                </span>                \n                <ion-icon tappable name="copy" item-end ion-datepicker (ionChanged)="copyToDate($event, workout)" [okText]="\'Copy To Date\'"></ion-icon>\n            </ion-item>  \n            \n        </ion-list>\n    \n        <ion-infinite-scroll (ionInfinite)="loadMoreHistory($event)">\n            <ion-infinite-scroll-content></ion-infinite-scroll-content>\n        </ion-infinite-scroll>  \n        \n    </div>\n    \n    <div class="stats-section" *ngIf="properties.activeTab === \'stats\'">\n        \n        \n        <div class="stats-timeframes">\n            <button ion-button small (click)="changeStatsTimeframe(\'forever\')" [outline]="stats.timeframe !== \'forever\'">Lifetime</button>\n            <button ion-button small (click)="changeStatsTimeframe(\'1 Year\')" [outline]="stats.timeframe !== \'1 Year\'">1 Year</button>\n            <button ion-button small (click)="changeStatsTimeframe(\'6 Months\')" [outline]="stats.timeframe !== \'6 Months\'">6 Months</button>\n            <button ion-button small (click)="changeStatsTimeframe(\'1 Month\')" [outline]="stats.timeframe !== \'1 Month\'">1 Month</button>\n            <button ion-button small (click)="changeStatsTimeframe(\'1 Week\')" [outline]="stats.timeframe !== \'1 Week\'">1 Week</button>\n        </div>\n        <div [chart]="stats.chart"></div>\n        <h3 class="stats-metric" (click)="openChangeMetric()">{{stats.metric}} <ion-icon name="create"></ion-icon></h3>\n        \n        <div class="extra-stats" *ngIf="stats.extra.best.data">\n        \n            <ion-card class="red-background">\n              <div class="card-subsubtitle">{{stats.extra.best.date}}</div>\n              <div class="card-title">{{stats.extra.best.data | number: \'1.0-0\'}}{{stats.units}}</div>\n              <div class="card-subtitle">Maximum</div>\n            </ion-card>  \n            \n            \n            <ion-card class="orange-background">\n              <div class="card-subsubtitle">{{stats.extra.worst.date}}</div>\n              <div class="card-title">{{stats.extra.worst.data | number: \'1.0-0\'}}{{stats.units}}</div>\n              <div class="card-subtitle">Minimum</div>\n            </ion-card>        \n        \n        </div>  \n\n\n        <div class="extra-stats" *ngIf="stats.extra.average.data">\n        \n            <ion-card class="yellow-background">\n              <div class="card-title">{{stats.extra.average.data | number: \'1.0-0\'}}{{stats.units}}</div>\n              <div class="card-subtitle">Average</div>\n            </ion-card>  \n            \n            \n            <ion-card class="darkorange-background">\n              <div class="card-title">{{stats.extra.growth.data | number: \'1.0-0\'}}{{stats.units}}</div>\n              <div class="card-subtitle">Growth</div>\n            </ion-card>        \n        \n        </div> \n\n        \n    </div>    \n    \n</ion-content>\n\n\n\n\n<ion-footer class="diary-footer">\n        <form name="diary-exercise-form" (ngSubmit)="addSet()">\n            \n            <ion-input name="reps" type="number" placeholder="Reps" [(ngModel)]="exercise.reps"></ion-input>\n            <ion-input name="weight" type="number" placeholder="Weight" [(ngModel)]="exercise.weight"></ion-input>\n            <div class="button-container">\n                <button type="submit" ion-button>Add</button>\n            </div>\n        </form>\n</ion-footer>\n`/*ion-inline-end:"D:\Taylor\Documents\Websites\intensity2\src\pages\diary-exercise\diary-exercise.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_4__providers_diary_diary__["a" /* DiaryProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_5__providers_chart_chart__["a" /* ChartProvider */]])
    ], DiaryExercisePage);
    return DiaryExercisePage;
}());

//# sourceMappingURL=diary-exercise.js.map

/***/ }),

/***/ 362:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditSetModal; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_in_app_browser__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_file_transfer__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_file__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_app_settings__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var EditSetModal = (function () {
    function EditSetModal(platform, params, viewCtrl, toastCtrl, storage, alertCtrl, iab, camera, transfer, file) {
        var _this = this;
        this.platform = platform;
        this.params = params;
        this.viewCtrl = viewCtrl;
        this.toastCtrl = toastCtrl;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.iab = iab;
        this.camera = camera;
        this.transfer = transfer;
        this.file = file;
        this.properties = {};
        this.set = {};
        Object.assign(this.set, this.params.data.set);
        this.set.rpeScaled = parseFloat(this.set.rpe) * 10;
        this.exercise = this.params.data.exercise;
        this.set.updateAll = false;
        this.storage.get("session").then(function (session) {
            _this.session = session;
        });
    }
    EditSetModal.prototype.changeRpe = function (amount) {
        this.set.rpeScaled = this.set.rpeScaled + amount;
        if (this.set.rpeScaled < 60) {
            this.set.rpeScaled = 60;
        }
        else if (this.set.rpeScaled > 100) {
            this.set.rpeScaled = 100;
        }
    };
    EditSetModal.prototype.determinePercentage = function () {
        var percentages = { 0: 0, 1: 100, 2: 95, 3: 90, 4: 88, 5: 86, 6: 83, 7: 80, 8: 78, 9: 76, 10: 75, 11: 72, 12: 70, 13: 66, 14: 63, 15: 60 };
        var repRounded = Math.floor(this.set.reps);
        this.set.percentage = repRounded > 15 ? 50 : percentages[repRounded];
        ;
    };
    EditSetModal.prototype.viewVideo = function () {
        window.open(this.set.video, '_system');
    };
    EditSetModal.prototype.uploadVideo = function () {
        var _this = this;
        var cameraOptions = {
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            destinationType: this.camera.DestinationType.FILE_URI,
            mediaType: this.camera.MediaType.VIDEO
        };
        this.camera.getPicture(cameraOptions)
            .then(function (image) {
            _this.properties.uploadingVideo = true;
            var fileTransfer = _this.transfer.create();
            var options = {
                fileKey: "fileToUpload",
                fileName: _this.exercise.name + _this.set.id,
                params: { key: __WEBPACK_IMPORTED_MODULE_7__app_app_settings__["a" /* AppSettings */].apiKey, session: _this.session, controller: "edit", action: "uploadvideo", id: _this.set.id },
                mimeType: "video/mp4"
            };
            fileTransfer.upload(image, encodeURI(__WEBPACK_IMPORTED_MODULE_7__app_app_settings__["a" /* AppSettings */].apiUrl), options).then(function (data) {
                var response = JSON.parse(data.response);
                if (response.success === true) {
                    _this.set.video = __WEBPACK_IMPORTED_MODULE_7__app_app_settings__["a" /* AppSettings */].apiUrl.replace("index.php", "") + response.data;
                }
                else {
                    var alert_1 = _this.alertCtrl.create({
                        title: "Error",
                        subTitle: "There was a problem uploading your video",
                        message: JSON.stringify(response),
                        buttons: [
                            {
                                text: 'Dismiss',
                                role: 'cancel'
                            }
                        ]
                    });
                    alert_1.present();
                }
                _this.properties.uploadingVideo = false;
            }, function (err) {
                var alert = _this.alertCtrl.create({
                    title: "Error",
                    subTitle: "There was a problem uploading your video",
                    message: JSON.stringify(err),
                    buttons: [
                        {
                            text: 'Dismiss',
                            role: 'cancel'
                        }
                    ]
                });
                alert.present();
                _this.properties.uploadingVideo = false;
            });
        }, function (err) {
            _this.properties.uploadingVideo = false;
            //console.log(err)
        });
    };
    EditSetModal.prototype.saveSet = function () {
        this.set.rpe = this.set.rpeScaled / 10;
        this.viewCtrl.dismiss(this.set);
    };
    EditSetModal.prototype.openDelete = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: "Delete Set",
            message: "Are you sure you want to delete this set?",
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel'
                },
                {
                    text: 'Yes',
                    handler: function (data) {
                        _this.viewCtrl.dismiss({ deleted: true });
                    }
                }
            ]
        });
        alert.present();
    };
    EditSetModal.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    EditSetModal = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'edit-set',template:/*ion-inline-start:"D:\Taylor\Documents\Websites\intensity2\src\modals\edit-set\edit-set.html"*/`<ion-header>\n    <ion-toolbar color="primary">\n        <ion-title>\n            Edit Set\n        </ion-title>\n        <ion-buttons start>\n            <button icon-start ion-button (click)="saveSet()" showWhen="android, windows">\n                <ion-icon name="md-checkmark"></ion-icon>\n                Save\n            </button>       \n            \n            <button icon-start ion-button (click)="openDelete()" showWhen="android, windows">\n                <ion-icon name="md-trash"></ion-icon>\n                Delete\n            </button>            \n            \n            <button ion-button (click)="dismiss()">\n                <span ion-text showWhen="ios">Cancel</span>\n                <ion-icon name="md-close" showWhen="android, windows"></ion-icon>\n            </button>\n        </ion-buttons>\n        \n        <ion-buttons showWhen="ios" end>\n            <button ion-button (click)="saveSet()">\n                <span ion-text>Save</span>\n            </button>      \n            <button ion-button (click)="openDelete()">\n                <span ion-text>Delete</span>\n            </button>              \n        </ion-buttons>\n        \n    </ion-toolbar>\n</ion-header>\n\n\n\n<ion-content>\n    \n<ion-list class="edit-set">\n\n    <ion-item>\n        <ion-label floating>Reps</ion-label>\n        <ion-input type="number" [(ngModel)]="set.reps"></ion-input>\n    </ion-item>\n\n    <ion-item>\n        <ion-label floating>Weight</ion-label>\n        <ion-input type="number" [(ngModel)]="set.weight"></ion-input>\n    </ion-item>\n    \n    <ion-item>\n        <ion-label>Update reps & weight for all sets</ion-label>\n        <ion-checkbox color="primary" [(ngModel)]="set.updateAll"></ion-checkbox>\n    </ion-item>    \n    \n    <ion-list-header class="rpe-header">\n        RPE\n        <ion-badge item-end>{{set.rpeScaled / 10}}</ion-badge>\n    </ion-list-header>    \n    <ion-item>\n        <ion-range [(ngModel)]="set.rpeScaled" min="60" max="100">\n            <ion-icon range-left name="remove" (click)="changeRpe(-5)"></ion-icon>\n            <ion-icon range-right name="add" (click)="changeRpe(5)"></ion-icon>\n        </ion-range>\n    </ion-item>    \n    \n    <ion-item>\n        <ion-label floating>Intensity (%)</ion-label>\n        <ion-input type="number" [(ngModel)]="set.percentage"></ion-input>\n        <button ion-button outline item-end (click)="determinePercentage()">Calculate</button>\n    </ion-item>\n    \n\n    <ion-item class="set-notes">\n        <ion-label floating>Notes</ion-label>\n        <ion-textarea [(ngModel)]="set.notes" autosize></ion-textarea>\n    </ion-item>    \n    \n    <ion-item>\n        <ion-label floating>Video</ion-label>\n        <ion-input type="text" [(ngModel)]="set.video"></ion-input>\n        <button ion-button outline item-end (click)="viewVideo()" *ngIf="set.video">View</button>\n        <button ion-button outline item-end (click)="uploadVideo()" [disabled]="properties.uploadingVideo">\n            <ion-spinner class="add-friend-loading" *ngIf="properties.uploadingVideo"></ion-spinner>\n            Upload\n        </button>\n    </ion-item>    \n    \n    <ion-list-header class="more-header" (click)="showMore = !showMore">\n        More Options\n        <ion-icon [name]="showMore ? \'md-arrow-dropup\' :\'md-arrow-dropdown\'" item-end></ion-icon>\n    </ion-list-header>    \n    \n    \n    <div class="more-set-options" *ngIf="showMore">\n        \n        <ion-item>\n            <ion-label floating>Rest Time (s)</ion-label>\n            <ion-input type="number" [(ngModel)]="set.rest"></ion-input>\n        </ion-item>\n\n        <ion-item>\n            <ion-label floating>Distance (m)</ion-label>\n            <ion-input type="number" [(ngModel)]="set.distance"></ion-input>\n        </ion-item>\n        \n        <ion-item>\n            <ion-label floating>Set Duration/Time (s)</ion-label>\n            <ion-input type="number" [(ngModel)]="set.time"></ion-input>\n        </ion-item>        \n\n        <ion-item>\n            <ion-label>Unit</ion-label>\n            <ion-select [(ngModel)]="set.unit">\n              <ion-option value="kg">kg</ion-option>\n              <ion-option value="lbs">lbs</ion-option>\n            </ion-select>\n        </ion-item>\n        \n        <ion-item>\n            <ion-label>Distance Unit</ion-label>\n            <ion-select [(ngModel)]="set.distanceunit">\n              <ion-option value="cm">cm</ion-option>\n              <ion-option value="inches">inches</ion-option>\n              <ion-option value="ft">ft</ion-option>\n              <ion-option value="m">m</ion-option>\n              <ion-option value="km">km</ion-option>\n              <ion-option value="miles">miles</ion-option>\n            </ion-select>\n        </ion-item>        \n        \n    </div>\n    \n</ion-list>\n       \n    \n</ion-content>`/*ion-inline-end:"D:\Taylor\Documents\Websites\intensity2\src\modals\edit-set\edit-set.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ToastController */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_in_app_browser__["a" /* InAppBrowser */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_file_transfer__["a" /* FileTransfer */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_file__["a" /* File */]])
    ], EditSetModal);
    return EditSetModal;
}());

//# sourceMappingURL=edit-set.js.map

/***/ }),

/***/ 363:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DiaryRecordsModal; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_diary_diary__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_diary_diary__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var DiaryRecordsModal = (function () {
    function DiaryRecordsModal(navCtrl, platform, params, viewCtrl, toastCtrl, storage, alertCtrl, diaryProvider) {
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.params = params;
        this.viewCtrl = viewCtrl;
        this.toastCtrl = toastCtrl;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.diaryProvider = diaryProvider;
        this.properties = { activeTab: "today", loading: false, loaded: false };
        this.exercise = this.params.data.exercise;
        this.fullRecords = { amrap: [], backoffs: [], overall: [], amrapIndex: 0, backoffsIndex: 0, overallIndex: 0 };
        this.calculateRecords();
    }
    DiaryRecordsModal.prototype.calculateRecords = function () {
        this.localRecords = {
            maxReps: 0,
            maxWeight: 0,
            currentVolume: 0,
            estimatedMax: 0
        };
        if (!this.exercise.records.overall) {
            this.exercise.records = {
                overall: { max: 0, rep: 0 },
                amrap: { reps: 0 },
                backoffs: { best: 0 }
            };
        }
        if (this.exercise.sets.length > 0 && parseInt(this.exercise.records.overall.rep) !== parseInt(this.exercise.sets[this.exercise.sets.length - 1].reps)) {
            this.exercise.records.overall.rep = this.exercise.sets[this.exercise.sets.length - 1].reps;
        }
        for (var _i = 0, _a = this.exercise.sets; _i < _a.length; _i++) {
            var set = _a[_i];
            if (set.reps > this.localRecords.maxReps) {
                this.localRecords.maxReps = set.reps;
            }
            if (parseFloat(set.weight) > this.localRecords.maxWeight && this.exercise.records.overall && parseFloat(this.exercise.records.overall.rep) === parseFloat(set.reps)) {
                this.localRecords.maxWeight = set.weight;
            }
            var estimatedMax = this.calculate1RM(set.reps, set.weight);
            if (estimatedMax > this.localRecords.estimatedMax) {
                this.localRecords.estimatedMax = estimatedMax;
            }
            this.localRecords.currentVolume = this.localRecords.currentVolume + (set.weight * set.reps);
        }
    };
    DiaryRecordsModal.prototype.calculate1RM = function (reps, weight) {
        var max = 0;
        if (reps < 10) {
            max = Math.round((weight / (1.0278 - 0.0278 * reps)) * 100) / 100;
        }
        else {
            max = Math.round((weight / 0.75) * 100) / 100;
        }
        return max;
    };
    DiaryRecordsModal.prototype.tabChanged = function (ev) {
        var _this = this;
        //get full records
        if (!this.properties.loaded) {
            this.properties.loading = true;
            this.properties.loaded = true;
            this.diaryProvider.getRecords(this.exercise.exerciseid).then(function (data) {
                _this.fullRecords.amrap = data["amrap"];
                _this.fullRecords.overall = data["overall"];
                _this.fullRecords.backoffs = data["backoffs"];
                _this.fullRecords.amrapIndex = _this.generateRandomIndex(_this.fullRecords.amrap.length - 1);
                _this.fullRecords.overallIndex = _this.generateRandomIndex(_this.fullRecords.overall.length - 1);
                _this.fullRecords.backoffsIndex = _this.generateRandomIndex(_this.fullRecords.backoffs.length - 1);
                _this.properties.loading = false;
            }).catch(function (e) {
                _this.properties.loading = false;
            });
        }
    };
    DiaryRecordsModal.prototype.generateRandomIndex = function (max) {
        var min = 0;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    DiaryRecordsModal.prototype.viewRecord = function (record) {
        var _this = this;
        var randomDescriptors = ["glorious", "gainful", "powerful", "fantastic", "tremdious", "sickening"];
        var alert = this.alertCtrl.create({
            title: __WEBPACK_IMPORTED_MODULE_5_moment__(record.assigneddate).format('MMMM Do YYYY'),
            message: "Your acheived this record on this date. It was a " + randomDescriptors[this.generateRandomIndex(5)] + " " + __WEBPACK_IMPORTED_MODULE_5_moment__(record.assigneddate).format('dddd') + ".",
            buttons: [
                {
                    text: 'Dismiss',
                    role: 'cancel'
                },
                {
                    text: 'Go to date',
                    handler: function (data) {
                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__pages_diary_diary__["a" /* DiaryPage */], { date: __WEBPACK_IMPORTED_MODULE_5_moment__(record.assigneddate).toDate() });
                    }
                }
            ]
        });
        alert.present();
    };
    DiaryRecordsModal.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    DiaryRecordsModal = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'diary-records',template:/*ion-inline-start:"D:\Taylor\Documents\Websites\intensity2\src\modals\diary-records\diary-records.html"*/`<ion-header>\n    <ion-toolbar color="primary">\n        <ion-title>\n            Records\n        </ion-title>\n        <ion-buttons start>\n            <button ion-button (click)="dismiss()">\n                <span ion-text showWhen="ios">Cancel</span>\n                <ion-icon name="md-close" showWhen="android, windows"></ion-icon>\n            </button>\n        </ion-buttons>\n    </ion-toolbar>\n</ion-header>\n\n\n\n<ion-content>\n    \n    <ion-segment color="primary" [(ngModel)]="properties.activeTab" (ionChange)="tabChanged($event)"> \n        <ion-segment-button value="today">\n            Today\n        </ion-segment-button>\n      <ion-segment-button value="volume">\n            Volume\n      </ion-segment-button>\n      <ion-segment-button value="weight">\n            Weight\n      </ion-segment-button>   \n      <ion-segment-button value="reps">\n            Reps\n      </ion-segment-button>      \n    </ion-segment>    \n    \n    <div *ngIf="properties.activeTab === \'today\'">\n        <div class="records-estimated-max">\n            <ion-icon name="trophy"></ion-icon>\n            <h2>{{this.localRecords.estimatedMax}}{{this.exercise.unit}}</h2>\n            <p>Estimated session max</p>\n        </div>\n        <ion-card class="orange-background records-card" >\n            <div class="bar-text">{{localRecords.maxReps}} rep<div class="unit" *ngIf="localRecords.maxReps !== 1">s</div><span> with {{exercise.records.amrap.weight}}{{exercise.unit}} / {{exercise.records.amrap.reps}} lifetime best</span></div>\n            <div class="records-bar">\n                <div class="current-bar" \n                     [ngStyle]="{\'width\': (localRecords.maxReps / exercise.records.amrap.reps) * 100 + \'%\'}"\n                     [ngClass]="{\'completed\' : localRecords.maxReps >= exercise.records.amrap.reps}"></div>\n            </div>\n        </ion-card>\n\n        <ion-card class="red-background records-card" >\n            <div class="bar-text">{{localRecords.maxWeight}}kg<span> {{exercise.records.overall.rep}} rep max / {{exercise.records.overall.max}}{{exercise.unit}} lifetime best</span></div>\n            <div class="records-bar">\n                <div class="current-bar" [ngStyle]="{\'width\': (localRecords.maxWeight / exercise.records.overall.max) * 100 + \'%\'}"\n                     [ngClass]="{\'completed\' : localRecords.maxWeight >= exercise.records.overall.max}"></div>\n            </div>\n        </ion-card>\n\n        <ion-card class="yellow-background records-card" >\n            <div class="bar-text">{{localRecords.currentVolume}}{{exercise.unit}} <span>volume / {{exercise.records.backoffs.best}}{{exercise.unit}} ({{exercise.records.overall.rep}} rep) lifetime best</span></div>\n            <div class="records-bar">\n                <div class="current-bar" [ngStyle]="{\'width\': (localRecords.currentVolume / exercise.records.backoffs.best) * 100 + \'%\'}"\n                     [ngClass]="{\'completed\' : localRecords.currentVolume >= exercise.records.backoffs.best}"></div>\n            </div>\n        </ion-card>\n    </div>\n \n    \n    <div *ngIf="properties.activeTab === \'volume\'">\n        <div class="diary-loading" *ngIf="properties.loading">\n            <ion-spinner></ion-spinner>\n        </div>     \n     \n        <div class="records-estimated-max yellow-background" *ngIf="fullRecords.backoffs.length > 0">\n            <ion-icon name="trophy"></ion-icon>\n            <h2>{{fullRecords.backoffs[fullRecords.backoffsIndex].best}}{{exercise.unit}}</h2>\n            <p>Volume for {{fullRecords.backoffs[fullRecords.backoffsIndex].reps}} rep sets</p>\n        </div>        \n        \n        <ion-list class="records-list">\n            <button ion-item *ngFor="let item of fullRecords.backoffs" (click)="viewRecord(item)">\n                Best volume for {{item.reps}} rep sets: {{item.best}}{{exercise.unit}}\n            </button>  \n        </ion-list>        \n        \n        \n        \n        \n    </div>\n    \n    <div *ngIf="properties.activeTab === \'weight\'">\n        <div class="diary-loading" *ngIf="properties.loading">\n            <ion-spinner></ion-spinner>\n        </div>  \n        \n        \n        <div class="records-estimated-max red-background" *ngIf="fullRecords.overall.length > 0">\n            <ion-icon name="trophy"></ion-icon>\n            <h2>{{fullRecords.overall[fullRecords.overallIndex].max}}{{exercise.unit}}</h2>\n            <p>{{fullRecords.overall[fullRecords.overallIndex].rep}} rep max</p>\n        </div>         \n        \n        <ion-list class="records-list">\n            <button ion-item *ngFor="let item of fullRecords.overall" (click)="viewRecord(item)" class="text-center">\n                {{item.rep}}RM: {{item.max}}{{exercise.unit}}\n            </button>  \n        </ion-list>          \n        \n        \n    </div>\n\n    <div *ngIf="properties.activeTab === \'reps\'">\n        <div class="diary-loading" *ngIf="properties.loading">\n            <ion-spinner></ion-spinner>\n        </div> \n        \n        <div class="records-estimated-max orange-background" *ngIf="fullRecords.amrap.length > 0">\n            <ion-icon name="trophy"></ion-icon>\n            <h2>{{fullRecords.amrap[fullRecords.amrapIndex].reps}} rep<span *ngIf="fullRecords.amrap[fullRecords.amrapIndex].reps > 1">s</span></h2>\n            <p>With {{fullRecords.amrap[fullRecords.amrapIndex].weight}}{{exercise.unit}}</p>\n        </div>  \n\n        \n        <ion-list class="records-list">\n            <button ion-item *ngFor="let item of fullRecords.amrap" (click)="viewRecord(item)">\n                Best reps with {{item.weight}}{{exercise.unit}}: {{item.reps}}@RPE{{item.rpe}}\n            </button>  \n        </ion-list>            \n        \n        \n    </div>    \n    \n</ion-content>`/*ion-inline-end:"D:\Taylor\Documents\Websites\intensity2\src\modals\diary-records\diary-records.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ToastController */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2__providers_diary_diary__["a" /* DiaryProvider */]])
    ], DiaryRecordsModal);
    return DiaryRecordsModal;
}());

//# sourceMappingURL=diary-records.js.map

/***/ }),

/***/ 364:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ImportModal; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_exercise_exercise__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_email_composer__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_file_transfer__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_file__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_app_settings__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var ImportModal = (function () {
    function ImportModal(platform, params, viewCtrl, toastCtrl, exerciseProvider, storage, alertCtrl, emailComposer, loadingCtrl, transfer, file) {
        var _this = this;
        this.platform = platform;
        this.params = params;
        this.viewCtrl = viewCtrl;
        this.toastCtrl = toastCtrl;
        this.exerciseProvider = exerciseProvider;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.emailComposer = emailComposer;
        this.loadingCtrl = loadingCtrl;
        this.transfer = transfer;
        this.file = file;
        this.import = { type: "fitnotes", file: "", fileLocation: "" };
        this.storage.get("account").then(function (data) {
            _this.account = data;
        });
        this.storage.get("session").then(function (session) {
            _this.session = session;
        });
    }
    ImportModal.prototype.selectFile = function (ev) {
        var _this = this;
        var file = ev.target.files[0];
        var reader = new FileReader();
        reader.onload = function (loadEvent) {
            var ext = file.name.split(".").pop().toLowerCase();
            if (ext !== "csv") {
                var alert_1 = _this.alertCtrl.create({
                    title: 'Error',
                    message: "The choosen file is not a CSV file.",
                    buttons: [
                        {
                            text: 'Dismiss',
                            role: 'cancel',
                            handler: function (data) {
                            }
                        }
                    ]
                });
                alert_1.present();
                return;
            }
            _this.import.fileLocation = loadEvent.target["result"];
        };
        reader.readAsDataURL(file);
    };
    ImportModal.prototype.openEmail = function () {
        var email = {
            to: ["support@intensityapp.com"],
            subject: 'Problem with importing',
            body: 'I am having problems importing from ' + this.import.type + '. Describe the problem you are having...',
            isHtml: true
        };
        this.emailComposer.open(email);
    };
    ImportModal.prototype.openImport = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Confirm',
            message: 'Are you sure you want to import this data? You can not undo this.',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function (data) {
                    }
                },
                {
                    text: 'Start Import',
                    handler: function (data) {
                        var loading = _this.loadingCtrl.create({
                            content: 'Importing...'
                        });
                        loading.present();
                        var fileTransfer = _this.transfer.create();
                        var options = {
                            fileKey: "fileToUpload",
                            fileName: _this.account.username,
                            params: { key: __WEBPACK_IMPORTED_MODULE_7__app_app_settings__["a" /* AppSettings */].apiKey, session: _this.session, controller: "edit", action: "uploadimport", userid: _this.account.id, type: _this.import.type },
                            mimeType: "text/csv"
                        };
                        fileTransfer.upload(_this.import.fileLocation, encodeURI(__WEBPACK_IMPORTED_MODULE_7__app_app_settings__["a" /* AppSettings */].apiUrl), options).then(function (data) {
                            loading.dismiss();
                            var response = JSON.parse(data.response);
                            if (response.success === true) {
                                _this.showSuccess();
                            }
                            else {
                                _this.showError("Error: " + JSON.stringify(response));
                            }
                        }, function (err) {
                            _this.showError("Sorry, there was an error uploading your file. ");
                        });
                    }
                }
            ]
        });
        alert.present();
    };
    ImportModal.prototype.showSuccess = function () {
        var alert = this.alertCtrl.create({
            title: 'Success',
            message: 'Your data has been imported.',
            buttons: [
                {
                    text: 'Dismiss',
                    role: 'cancel',
                    handler: function (data) {
                    }
                }
            ]
        });
        alert.present();
    };
    ImportModal.prototype.showError = function (error) {
        var alert = this.alertCtrl.create({
            title: 'Error',
            message: error,
            buttons: [
                {
                    text: 'Dismiss',
                    role: 'cancel',
                    handler: function (data) {
                    }
                }
            ]
        });
        alert.present();
    };
    ImportModal.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    ImportModal = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'import',template:/*ion-inline-start:"D:\Taylor\Documents\Websites\intensity2\src\modals\import\import.html"*/`<ion-header>\n    <ion-toolbar color="primary">\n        <ion-title>\n            Import Data\n        </ion-title>\n        <ion-buttons start>\n            <button ion-button (click)="dismiss()">\n                <span ion-text showWhen="ios">Cancel</span>\n                <ion-icon name="md-close" showWhen="android, windows"></ion-icon>\n            </button>\n        </ion-buttons>\n    </ion-toolbar>\n</ion-header>\n\n\n\n<ion-content>\n    \n\n    <ion-list>\n        <ion-item>\n            <ion-label>Import From</ion-label>\n            <ion-select [(ngModel)]="import.type">\n                <ion-option value="fitnotes">FitNotes</ion-option>\n                <ion-option value="strong">Strong</ion-option>\n                <ion-option value="stronglifts">Stronglifts 5x5</ion-option>\n                <ion-option value="fitocracy">Fitocracy</ion-option>\n                <ion-option value="intensity">Intensity</ion-option>\n                <ion-option value="custom">Custom</ion-option>\n            </ion-select>\n       </ion-item>\n        \n        \n        <ion-item>\n            <ion-icon name="document" item-start></ion-icon>\n            <label>CSV File</label>\n            <input type="file" (change)="selectFile($event)" id="file-input" name="file-input" style="opacity: 0">\n            <button ion-button outline item-end>Choose File</button>\n        </ion-item>        \n\n        \n        \n        <p class="import-explaination" *ngIf="import.type">\n            Make sure your file is in CSV format with the following columns in the correct order:\n            <span *ngIf="import.type === \'fitnotes\'">date, exercise, unit, weight, reps, sets, distance, distance unit, time</span>\n            <span *ngIf="import.type === \'strong\'">date, (not imported), exercise, sets, weight, unit, reps, distance, distance unit, time</span>\n            <span *ngIf="import.type === \'stronglifts\'">date, notes, repeated per exercise: exercise, unit, reps x 5</span>\n            <span *ngIf="import.type === \'fitocracy\'">exercise, date, (not imported), weight, (not imported), reps, (not imported), unit</span>\n            <span *ngIf="import.type === \'intensity\'">date, exercise, (not imported), reps, sets, weight, rpe, percentage, completed, notes</span>\n            <span *ngIf="import.type === \'custom\'">date (in dd/mm/yyyy format), exercise, reps, set, weight, rpe, percentage, completed (0 = no, 1 = yes), notes</span>\n        </p>\n        \n        <p class="import-explaination" *ngIf="import.type">\n            If the columns above do not match your exported file or if your import fails in any way, <a (click)="openEmail()">let us know</a>.\n        \n        </p>\n        \n        <div class="import-button" *ngIf="import.type && import.fileLocation">\n            <button ion-button item-end (click)="openImport()">Import</button>\n        </div>\n        \n        \n    </ion-list>\n    \n</ion-content>`/*ion-inline-end:"D:\Taylor\Documents\Websites\intensity2\src\modals\import\import.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ToastController */], __WEBPACK_IMPORTED_MODULE_2__providers_exercise_exercise__["a" /* ExerciseProvider */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_email_composer__["a" /* EmailComposer */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_file_transfer__["a" /* FileTransfer */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_file__["a" /* File */]])
    ], ImportModal);
    return ImportModal;
}());

//# sourceMappingURL=import.js.map

/***/ }),

/***/ 365:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GoalSettingsModal; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_exercise_exercise__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modals_select_exercise_select_exercise__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_account_account__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__modals_goal_resets_goal_resets__ = __webpack_require__(366);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var GoalSettingsModal = (function () {
    function GoalSettingsModal(platform, params, viewCtrl, toastCtrl, exerciseProvider, storage, alertCtrl, modalCtrl, accountProvider, events) {
        var _this = this;
        this.platform = platform;
        this.params = params;
        this.viewCtrl = viewCtrl;
        this.toastCtrl = toastCtrl;
        this.exerciseProvider = exerciseProvider;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.accountProvider = accountProvider;
        this.events = events;
        this.account = { goals: {} };
        this.storage.get("account").then(function (data) {
            _this.account = data;
            if (_this.account.goals.custom_date_timeframe) {
                _this.account.goals.day = __WEBPACK_IMPORTED_MODULE_4_moment__(_this.account.goals.custom_date_timeframe).format("dddd").toLowerCase();
            }
        });
    }
    GoalSettingsModal.prototype.updateSettings = function () {
        this.storage.set("account", this.account);
        this.events.publish("goals:updated", this.account);
        var formatted = { primarygoal: this.account.goals.primary, targetgoal: this.account.goals.target, targetcustomgoal: this.account.goals.custom_target, timeframegoal: this.account.goals.timeframe, timeframecustomgoal: this.account.goals.custom_timeframe, timeframecustomdategoal: this.account.goals.custom_date_timeframe, groupinggoal: this.account.goals.grouping };
        this.accountProvider.updateSettings(formatted, this.account.id);
    };
    GoalSettingsModal.prototype.setTimeframeDay = function () {
        var date = __WEBPACK_IMPORTED_MODULE_4_moment__().day(this.account.goals.day).format('YYYY-MM-DD');
        this.account.goals.custom_date_timeframe = date;
        this.updateSettings();
    };
    GoalSettingsModal.prototype.openSelectExercise = function (target) {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__modals_select_exercise_select_exercise__["a" /* SelectExerciseModal */]);
        modal.onDidDismiss(function (exercise) {
            if (exercise) {
                target.exerciseid = exercise.id;
                target.name = exercise.name;
                _this.updateTarget(target);
            }
        });
        modal.present();
    };
    GoalSettingsModal.prototype.openGoalResetsModal = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_7__modals_goal_resets_goal_resets__["a" /* GoalResetsModal */]);
        modal.onDidDismiss(function (data) { });
        modal.present();
    };
    GoalSettingsModal.prototype.createTarget = function () {
        var target = { id: null, exerciseid: "", name: "", target: "" };
        this.account.goals.exercise_targets.push(target);
        this.storage.set("account", this.account);
        this.events.publish("goals:updated", this.account);
        //create target
        this.accountProvider.addTarget(this.account.id).then(function (data) {
            target.id = data.id;
        });
    };
    GoalSettingsModal.prototype.deleteTarget = function (index, target) {
        this.account.goals.exercise_targets.splice(index, 1);
        this.storage.set("account", this.account);
        this.events.publish("goals:updated", this.account);
        //delete target
        this.accountProvider.removeTarget(target, this.account.id);
    };
    GoalSettingsModal.prototype.updateTarget = function (target) {
        //update target
        this.storage.set("account", this.account);
        this.events.publish("goals:updated", this.account);
        this.accountProvider.updateTarget(target, this.account.id);
    };
    GoalSettingsModal.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    GoalSettingsModal = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'goal-settings',template:/*ion-inline-start:"D:\Taylor\Documents\Websites\intensity2\src\modals\goal-settings\goal-settings.html"*/`<ion-header>\n    <ion-toolbar color="primary">\n        <ion-title>\n            Goal Settings\n        </ion-title>\n        <ion-buttons start>\n            <button ion-button (click)="dismiss()">\n                <span ion-text showWhen="ios">Cancel</span>\n                <ion-icon name="md-close" showWhen="android, windows"></ion-icon>\n            </button>\n        </ion-buttons>\n    </ion-toolbar>\n</ion-header>\n\n\n\n<ion-content>\n    \n    <ion-list class="settings-list goals-list">\n        <ion-item>\n           <ion-label>Primary Goal</ion-label>\n           <ion-select [(ngModel)]="account.goals.primary" (ionChange)="updateSettings()">\n               <ion-option value="volume">Volume</ion-option>\n               <ion-option value="reps">Reps</ion-option>\n               <ion-option value="weight">Weight</ion-option>\n               <ion-option value="none">None</ion-option>\n           </ion-select>\n       </ion-item>    \n        \n        <div class="goal-options" *ngIf="account.goals.primary !== \'none\'">\n        \n            <ion-item>\n               <ion-label>Target</ion-label>\n               <ion-select [(ngModel)]="account.goals.target" (ionChange)="updateSettings()">\n                   <ion-option value="alltime">All time best</ion-option>\n                   <ion-option value="custom">Custom</ion-option>\n                   <ion-option value="customexercise">Exercise specific targets</ion-option>\n                   <ion-option value="none">None</ion-option>\n               </ion-select>\n            </ion-item>         \n\n            <ion-item *ngIf="account.goals.target === \'custom\'">\n                <ion-label>Custom Target <span *ngIf="account.goals.primary === \'volume\' || account.goals.primary === \'weight\'">({{this.account.units}})</span></ion-label>\n                <ion-input type="number" [(ngModel)]="account.goals.custom_target"></ion-input>\n            </ion-item>   \n\n            <div class="exercise-targets" *ngIf="account.goals.target === \'customexercise\'">\n\n                <div class="exercise-target" *ngFor="let target of account.goals.exercise_targets; let i = index">\n                    <div class="target-exercise" (click)="openSelectExercise(target)">\n                        <span *ngIf="!target.exerciseid">Select Exercise</span>\n                        <span *ngIf="target.exerciseid">{{target.name}}</span>\n                    </div>  \n\n                    <ion-item>\n                        <ion-input type="number" placeholder="Target" [(ngModel)]="target.target" (ionChange)="updateTarget(target)"></ion-input>\n                    </ion-item> \n\n                    <ion-icon name="trash" (click)="deleteTarget(i, target)"></ion-icon> \n                </div>\n\n                <button ion-button small clear (click)="createTarget()">Add Target</button>\n\n            </div>\n\n            <ion-item>\n               <ion-label>Goal Timeframe</ion-label>\n               <ion-select [(ngModel)]="account.goals.timeframe" (ionChange)="updateSettings()">\n                   <ion-option value="workout">Per workout</ion-option>\n                   <ion-option value="week">Per week</ion-option>\n                   <ion-option value="month">Per month</ion-option>\n                   <ion-option value="custom">Specific number of days</ion-option>\n               </ion-select>\n            </ion-item>   \n\n            <div class="timeframe-options">\n                <ion-item *ngIf="account.goals.timeframe === \'custom\'">\n                    <ion-label>Timeframe (days)</ion-label>\n                    <ion-input type="number" [(ngModel)]="account.goals.custom_timeframe" (ionChange)="updateSettings()"></ion-input>\n                </ion-item> \n\n                <ion-item *ngIf="account.goals.timeframe === \'custom\'">\n                   <ion-label>Day To Count From</ion-label>\n                   <ion-select [(ngModel)]="account.goals.day" (ionChange)="setTimeframeDay()">\n                       <ion-option value="monday">Monday</ion-option>\n                       <ion-option value="tuesday">Tuesday</ion-option>\n                       <ion-option value="wednesday">Wednesday</ion-option>\n                       <ion-option value="thursday">Thursday</ion-option>\n                       <ion-option value="friday">Friday</ion-option>\n                       <ion-option value="saturday">Saturday</ion-option>\n                       <ion-option value="sunday">Sunday</ion-option>\n                   </ion-select>\n                </ion-item>   \n\n            </div>\n\n            <ion-item>\n               <ion-label>Group By</ion-label>\n               <ion-select [(ngModel)]="account.goals.grouping" (ionChange)="updateSettings()">\n                   <ion-option value="exercise">Exercise</ion-option>\n                   <ion-option value="exercisetype">Exercise type (e.g. squat)</ion-option>\n                   <ion-option value="musclegroup">Musclegroup (e.g. biceps)</ion-option>\n               </ion-select>\n            </ion-item> \n            \n            <button ion-item detail-none (click)="openGoalResetsModal()">\n                Create Reset Points\n                <ion-icon ios="ios-arrow-forward" md="ios-arrow-forward" item-end></ion-icon>\n            </button>            \n            \n            \n        </div>\n        \n    </ion-list>\n    \n\n    \n</ion-content>`/*ion-inline-end:"D:\Taylor\Documents\Websites\intensity2\src\modals\goal-settings\goal-settings.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ToastController */], __WEBPACK_IMPORTED_MODULE_2__providers_exercise_exercise__["a" /* ExerciseProvider */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */], __WEBPACK_IMPORTED_MODULE_6__providers_account_account__["a" /* AccountProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */]])
    ], GoalSettingsModal);
    return GoalSettingsModal;
}());

//# sourceMappingURL=goal-settings.js.map

/***/ }),

/***/ 366:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GoalResetsModal; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_exercise_exercise__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modals_select_exercise_select_exercise__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_account_account__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var GoalResetsModal = (function () {
    function GoalResetsModal(platform, params, viewCtrl, toastCtrl, exerciseProvider, storage, alertCtrl, modalCtrl, accountProvider, events) {
        var _this = this;
        this.platform = platform;
        this.params = params;
        this.viewCtrl = viewCtrl;
        this.toastCtrl = toastCtrl;
        this.exerciseProvider = exerciseProvider;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.accountProvider = accountProvider;
        this.events = events;
        this.resets = [];
        this.account = {};
        this.storage.get("account").then(function (data) {
            _this.account = data;
        });
        this.accountProvider.getResets().then(function (data) {
            _this.resets = data;
        });
    }
    GoalResetsModal.prototype.openSelectExercise = function (reset) {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__modals_select_exercise_select_exercise__["a" /* SelectExerciseModal */]);
        modal.onDidDismiss(function (exercise) {
            if (exercise) {
                reset.exerciseid = exercise.id;
                reset.name = exercise.name;
                _this.updateReset(reset);
            }
        });
        modal.present();
    };
    GoalResetsModal.prototype.createReset = function () {
        var reset = { id: null, exerciseid: "", name: "", resetdate: "" };
        this.resets.push(reset);
        this.events.publish("goals:updated", this.account);
        //create reset
        this.accountProvider.addReset(this.account.id).then(function (data) {
            reset.id = data.id;
        });
    };
    GoalResetsModal.prototype.deleteReset = function (index, reset) {
        this.resets.splice(index, 1);
        this.events.publish("goals:updated", this.account);
        //delete reset
        this.accountProvider.removeReset(reset, this.account.id);
    };
    GoalResetsModal.prototype.updateReset = function (reset) {
        //update reset
        this.events.publish("goals:updated", this.account);
        this.accountProvider.updateReset(reset, this.account.id);
    };
    GoalResetsModal.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    GoalResetsModal = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'goal-resets',template:/*ion-inline-start:"D:\Taylor\Documents\Websites\intensity2\src\modals\goal-resets\goal-resets.html"*/`<ion-header>\n    <ion-toolbar color="primary">\n        <ion-title>\n            Reset Points\n        </ion-title>\n        <ion-buttons start>\n            <button ion-button (click)="dismiss()">\n                <span ion-text showWhen="ios">Cancel</span>\n                <ion-icon name="md-close" showWhen="android, windows"></ion-icon>\n            </button>\n        </ion-buttons>\n    </ion-toolbar>\n</ion-header>\n\n\n\n<ion-content>\n    \n    <ion-list class="settings-list goals-list goal-reset-list">\n  \n        \n\n\n        <div class="exercise-target" *ngFor="let reset of resets; let i = index">\n            <div class="target-exercise" (click)="openSelectExercise(reset)">\n                <span *ngIf="!reset.exerciseid">Select Exercise</span>\n                <span *ngIf="reset.exerciseid">{{reset.name}}</span>\n            </div>  \n\n            <ion-item>\n                <ion-datetime displayFormat="D MMM YYYY" placeholder="Reset Date" [(ngModel)]="reset.resetdate" (ionChange)="updateReset(reset)"></ion-datetime>\n            </ion-item> \n\n            <ion-icon name="trash" (click)="deleteReset(i, reset)"></ion-icon> \n        </div>\n\n        <button ion-button small clear (click)="createReset()">Add Reset Point</button>\n\n\n        \n    </ion-list>\n    \n\n    \n</ion-content>`/*ion-inline-end:"D:\Taylor\Documents\Websites\intensity2\src\modals\goal-resets\goal-resets.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ToastController */], __WEBPACK_IMPORTED_MODULE_2__providers_exercise_exercise__["a" /* ExerciseProvider */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */], __WEBPACK_IMPORTED_MODULE_5__providers_account_account__["a" /* AccountProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */]])
    ], GoalResetsModal);
    return GoalResetsModal;
}());

//# sourceMappingURL=goal-resets.js.map

/***/ }),

/***/ 367:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddExerciseModal; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_exercise_exercise__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AddExerciseModal = (function () {
    function AddExerciseModal(platform, params, viewCtrl, toastCtrl, exerciseProvider, storage, alertCtrl, events) {
        var _this = this;
        this.platform = platform;
        this.params = params;
        this.viewCtrl = viewCtrl;
        this.toastCtrl = toastCtrl;
        this.exerciseProvider = exerciseProvider;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.events = events;
        this.properties = { activeTab: "recommended", userid: 0, search: "", allCount: 100 };
        this.loading = { all: false, recent: false, search: false };
        this.exercises = [];
        this.recentExercises = [];
        this.recommendedExercises = [];
        this.searchExercises = [];
        this.getExercises();
        this.getRecentExercises();
        this.getRecommendedExercises();
        this.storage.get("userid").then(function (data) {
            _this.properties.userid = data;
        });
        if (this.params.data.recentExercises) {
            this.recentExercises = this.params.data.recentExercises;
            this.properties.activeTab = "recent";
        }
    }
    AddExerciseModal.prototype.getExercises = function () {
        var _this = this;
        this.loading.all = true;
        this.exerciseProvider.getExercises().then(function (data) {
            _this.exercises = data;
            _this.loading.all = false;
        });
    };
    AddExerciseModal.prototype.checkOwnership = function (userid) {
        return this.properties.userid === parseInt(userid);
    };
    AddExerciseModal.prototype.getRecentExercises = function () {
        var _this = this;
        this.loading.recent = true;
        this.storage.get("recentexercises").then(function (exercises) {
            if (exercises && _this.loading.recent) {
                _this.recentExercises = exercises;
                if (_this.recentExercises.length > 0) {
                    _this.properties.activeTab = "recent";
                }
            }
        });
        this.exerciseProvider.getRecentExercises().then(function (data) {
            _this.loading.recent = false;
            _this.recentExercises = data;
            if (_this.recentExercises.length > 0) {
                _this.events.publish("recentexercises:retreived", data);
                _this.properties.activeTab = "recent";
            }
        });
    };
    AddExerciseModal.prototype.getRecommendedExercises = function () {
        this.recommendedExercises = this.exerciseProvider.getRecommendedExercises();
    };
    AddExerciseModal.prototype.searchStarted = function () {
        this.properties.activeTab = 'all';
    };
    AddExerciseModal.prototype.searchCancelled = function () {
        this.properties.search = '';
    };
    AddExerciseModal.prototype.openViewDetails = function (ev, exercise) {
        var _this = this;
        ev.preventDefault();
        ev.stopPropagation();
        var alert = this.alertCtrl.create({
            title: exercise.name,
            message: "<strong>Musclegroups:</strong> " + exercise.musclegroup + "<br><strong>Exercise Types:</strong> " + exercise.type,
            buttons: [
                {
                    text: 'Dismiss',
                    role: 'cancel'
                },
                {
                    text: 'Add',
                    handler: function (data) {
                        _this.addExercise(exercise);
                    }
                }
            ]
        });
        alert.present();
    };
    AddExerciseModal.prototype.createExercise = function (exerciseName) {
        var _this = this;
        this.exerciseProvider.createExercise(exerciseName).then(function (exercise) {
            _this.storage.remove("exercises");
            _this.getExercises();
            _this.addExercise(exercise);
        })
            .catch(function (e) {
            var alert = _this.alertCtrl.create({
                title: "Error",
                message: "This exercise already exists in the exercise database, or there was a connection error.",
                buttons: [
                    {
                        text: 'Dismiss',
                        role: 'cancel'
                    }
                ]
            });
            alert.present();
        });
    };
    AddExerciseModal.prototype.openEditExercise = function (ev, exercise) {
        var _this = this;
        ev.preventDefault();
        ev.stopPropagation();
        var alert = this.alertCtrl.create({
            title: exercise.name,
            inputs: [
                {
                    name: 'name',
                    placeholder: 'Name',
                    type: "text",
                    value: exercise.name
                },
                {
                    name: 'type',
                    placeholder: 'Exercise Types',
                    type: 'text',
                    value: exercise.type
                },
                {
                    name: 'musclegroup',
                    placeholder: 'Musclegroups',
                    type: 'text',
                    value: exercise.musclegroup
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel'
                },
                {
                    text: 'Save',
                    handler: function (data) {
                        Object.assign(exercise, data);
                        _this.exerciseProvider.editExercise(exercise).then(function () {
                            _this.storage.remove("exercises");
                            _this.getExercises();
                            _this.exerciseProvider.getRecentExercises().then(function (data) {
                                _this.recentExercises = data;
                            });
                        });
                    }
                }
            ]
        });
        alert.present();
    };
    AddExerciseModal.prototype.openDeleteExercise = function (ev, exercise, index) {
        var _this = this;
        ev.preventDefault();
        ev.stopPropagation();
        var alert = this.alertCtrl.create({
            title: 'Confirm Deletion',
            message: 'Are you sure you want to remove ' + exercise.name + ' from the exercise database?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel'
                },
                {
                    text: 'Yes',
                    handler: function () {
                        if (_this.properties.activeTab === "recommended") {
                            _this.recommendedExercises.splice(index, 1);
                        }
                        else if (_this.properties.activeTab === "recent") {
                            _this.recentExercises.splice(index, 1);
                        }
                        else if (_this.properties.activeTab === "all") {
                            _this.exercises.splice(index, 1);
                        }
                        _this.properties.search = "";
                        _this.exerciseProvider.deleteExercise(exercise).then(function () {
                            _this.storage.remove("exercises");
                            _this.getExercises();
                            _this.exerciseProvider.getRecentExercises().then(function (data) {
                                _this.recentExercises = data;
                            });
                        });
                    }
                }
            ]
        });
        alert.present();
    };
    AddExerciseModal.prototype.addExercise = function (exercise) {
        if (exercise.exerciseid) {
            exercise.id = exercise.exerciseid;
        } //for recent exercises
        this.viewCtrl.dismiss(exercise);
    };
    AddExerciseModal.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    AddExerciseModal = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'add-exercise',template:/*ion-inline-start:"D:\Taylor\Documents\Websites\intensity2\src\modals\add-exercise\add-exercise.html"*/`<ion-header>\n    <ion-toolbar color="primary">\n        <ion-title>\n            Add To Diary\n        </ion-title>\n        <ion-buttons start>\n            <button ion-button (click)="dismiss()">\n                <span ion-text showWhen="ios">Cancel</span>\n                <ion-icon name="md-close" showWhen="android, windows"></ion-icon>\n            </button>\n        </ion-buttons>\n    </ion-toolbar>\n</ion-header>\n\n\n\n<ion-content>\n    \n    \n    <ion-searchbar\n        [(ngModel)]="properties.search"\n        [showCancelButton]="shouldShowCancel"\n        (ionInput)="searchStarted()"\n        (ionCancel)="searchCancelled()"\n        placeholder="Search Exercises"\n        class="flat-search">\n    </ion-searchbar>   \n    \n    <ion-segment color="primary" [(ngModel)]="properties.activeTab">\n        <ion-segment-button value="recommended">\n            Recommended\n        </ion-segment-button>        \n        <ion-segment-button value="recent">\n            Recent\n        </ion-segment-button>\n        <ion-segment-button value="all">\n            All Exercises\n        </ion-segment-button> \n    </ion-segment>    \n    \n    <ion-list class="add-diary-list" *ngIf="properties.activeTab === \'recommended\'">\n        <button ion-item detail-none *ngFor="let exercise of recommendedExercises | exerciseSearch:properties.search; let i = index" (click)="addExercise(exercise)">\n            {{exercise.name}}\n            <ion-icon name=\'create\' item-end *ngIf="checkOwnership(exercise.userid)" (click)="openEditExercise($event, exercise)"></ion-icon>\n            <ion-icon name=\'trash\' item-end *ngIf="false" (click)="openDeleteExercise($event, exercise, i)"></ion-icon>\n            <ion-icon name=\'more\' item-end (click)="openViewDetails($event, exercise)"></ion-icon>\n        </button> \n    </ion-list>\n    \n    \n    <ion-list class="add-diary-list" *ngIf="properties.activeTab === \'recent\'">\n        <button ion-item detail-none *ngFor="let exercise of recentExercises | exerciseSearch:properties.search; let i = index" (click)="addExercise(exercise)">\n            {{exercise.name}}\n            <ion-icon name=\'create\' item-end *ngIf="checkOwnership(exercise.userid)" (click)="openEditExercise($event, exercise)"></ion-icon>\n            <ion-icon name=\'trash\' item-end *ngIf="checkOwnership(exercise.userid)" (click)="openDeleteExercise($event, exercise, i)"></ion-icon>\n            <ion-icon name=\'more\' item-end (click)="openViewDetails($event, exercise)"></ion-icon>\n        </button> \n    </ion-list>\n    \n\n    \n    \n    <ion-list class="add-diary-list" *ngIf="properties.activeTab === \'all\' && properties.search">\n        <button ion-item detail-none *ngFor="let exercise of exercises | exerciseSearch:properties.search | slice:0:30; let l = count; let i = index" (click)="addExercise(exercise)">\n            {{exercise.name}}\n            <ion-icon name=\'create\' item-end *ngIf="checkOwnership(exercise.userid)" (click)="openEditExercise($event, exercise)"></ion-icon>\n            <ion-icon name=\'trash\' item-end *ngIf="checkOwnership(exercise.userid)" (click)="openDeleteExercise($event, exercise, i)"></ion-icon>\n            <ion-icon name=\'more\' item-end (click)="openViewDetails($event, exercise)"></ion-icon>\n        </button> \n        <ion-item class="create-exercise" detail-none>\n            Can\'t find {{properties.search}}?<br> \n            <button type="submit" ion-button (click)="createExercise(properties.search)">Create It</button>\n        </ion-item>                \n    </ion-list>  \n    \n    \n    \n    <ion-list class="add-diary-list" *ngIf="properties.activeTab === \'all\' && !properties.search">\n        <button ion-item detail-none *ngFor="let exercise of exercises | slice:0:properties.allCount; let i = index" (click)="addExercise(exercise)">\n            {{exercise.name}}\n            <ion-icon name=\'create\' item-end *ngIf="checkOwnership(exercise.userid)" (click)="openEditExercise($event, exercise)"></ion-icon>\n            <ion-icon name=\'trash\' item-end *ngIf="checkOwnership(exercise.userid)" (click)="openDeleteExercise($event, exercise, i)"></ion-icon>\n            <ion-icon name=\'more\' item-end (click)="openViewDetails($event, exercise)"></ion-icon>\n        </button> \n        <button class="more-exercises" ion-item detail-none (click)="properties.allCount = properties.allCount + 100">\n                + {{exercises.length - properties.allCount}} more\n        </button>         \n    </ion-list>     \n    \n\n    \n</ion-content>`/*ion-inline-end:"D:\Taylor\Documents\Websites\intensity2\src\modals\add-exercise\add-exercise.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ToastController */], __WEBPACK_IMPORTED_MODULE_2__providers_exercise_exercise__["a" /* ExerciseProvider */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */]])
    ], AddExerciseModal);
    return AddExerciseModal;
}());

//# sourceMappingURL=add-exercise.js.map

/***/ }),

/***/ 368:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FriendsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_account_account__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_friends_friends__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_diary_diary__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_app_settings__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_friend_profile_friend_profile__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__modals_add_friends_add_friends__ = __webpack_require__(370);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var FriendsPage = (function () {
    function FriendsPage(navCtrl, modalCtrl, storage, accountProvider, friendsProvider, diaryProvider, events, alertCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.storage = storage;
        this.accountProvider = accountProvider;
        this.friendsProvider = friendsProvider;
        this.diaryProvider = diaryProvider;
        this.events = events;
        this.alertCtrl = alertCtrl;
        this.properties = { activeTab: "friends", activityPage: 1, canloadmore: true, paused: false, loading: true };
        this.account = {};
        this.storage.get("account").then(function (data) {
            _this.account = data;
            _this.getFriends();
        });
        this.alphabet = [];
        this.friends = {};
        this.friendActivity = [];
        this.friendRequests = [];
    }
    FriendsPage.prototype.ionViewWillEnter = function () {
        if (this.properties.paused) {
            this.properties.paused = false;
            this.getFriends();
        }
    };
    FriendsPage.prototype.ionViewWillLeave = function () {
        this.properties.paused = true;
    };
    FriendsPage.prototype.getFriends = function () {
        var _this = this;
        this.storage.get("profile" + this.account.id).then(function (data) {
            if (data) {
                var friends = data["acceptedfriends"];
                _this.friends = _this.sortByAlpha(friends);
                _this.friendActivity = data["friendactivity"];
                _this.friendRequests = data["requests"];
                _this.properties.loading = false;
            }
        });
        this.accountProvider.getProfile(this.account.id).then(function (data) {
            var friends = data["acceptedfriends"];
            _this.friends = _this.sortByAlpha(friends);
            _this.friendActivity = data["friendactivity"];
            _this.friendRequests = data["requests"];
            _this.properties.loading = false;
        }).catch(function () {
            _this.properties.loading = false;
        });
    };
    FriendsPage.prototype.sortByAlpha = function (list) {
        var alphaArray = {};
        this.alphabet = [];
        for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
            var item = list_1[_i];
            var name = item["display"] ? item["display"] : item["username"];
            item["name"] = name;
            var start = name.charAt(0).toLowerCase();
            if (start in alphaArray) {
                alphaArray[start].push(item);
            }
            else {
                alphaArray[start] = [item];
                this.alphabet.push(start);
            }
        }
        this.alphabet.sort();
        return alphaArray;
    };
    FriendsPage.prototype.getDp = function (dp) {
        return __WEBPACK_IMPORTED_MODULE_7__app_app_settings__["a" /* AppSettings */].apiUrl.replace("index.php", "") + dp;
    };
    FriendsPage.prototype.tabChanged = function (ev) {
        if (this.properties.activeTab === "activity") {
        }
    };
    FriendsPage.prototype.viewProfile = function (friend, added) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__pages_friend_profile_friend_profile__["a" /* FriendProfilePage */], { friend: friend, added: added });
    };
    FriendsPage.prototype.getMoreActivity = function (infiniteScroll) {
        var _this = this;
        if (!this.properties.canloadmore) {
            infiniteScroll.complete();
            return;
        }
        this.properties.activityPage = this.properties.activityPage + 1;
        this.accountProvider.getUserActivity(null, this.properties.activityPage).then(function (data) {
            for (var _i = 0, _a = data["activity"]; _i < _a.length; _i++) {
                var item = _a[_i];
                _this.friendActivity.push(item);
            }
            _this.properties.canloadmore = data["canloadmore"];
            infiniteScroll.complete();
        })
            .catch(function (e) {
            infiniteScroll.complete();
        });
    };
    FriendsPage.prototype.formatDate = function (date) {
        return __WEBPACK_IMPORTED_MODULE_3_moment__(date).format('MMMM Do YYYY');
    };
    FriendsPage.prototype.copyToDate = function (date, workout) {
        var _this = this;
        var copy = {
            exerciseid: workout.exerciseid,
            userid: workout.userid,
            type: "sets",
            date: __WEBPACK_IMPORTED_MODULE_3_moment__(date).format('YYYY-MM-DD'),
            assigneddate: __WEBPACK_IMPORTED_MODULE_3_moment__(workout.assigneddate).format('YYYY-MM-DD')
        };
        this.diaryProvider.copyWorkout(copy).then(function (data) {
            var alert = _this.alertCtrl.create({
                title: workout.sets + " sets copied",
                subTitle: "To " + _this.formatDate(date),
                buttons: [
                    {
                        text: 'OK',
                        role: 'cancel'
                    }
                ]
            });
            alert.present();
        });
    };
    FriendsPage.prototype.viewDetails = function (activity) {
        var alert = this.alertCtrl.create({
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
    };
    FriendsPage.prototype.acceptFriend = function (friend, index) {
        var _this = this;
        this.friendRequests.splice(index, 1);
        this.friendsProvider.addFriend(friend.userid).then(function () {
            _this.accountProvider.getAccount();
            _this.getFriends();
        });
    };
    FriendsPage.prototype.declineFriend = function (friend, index) {
        var _this = this;
        this.friendRequests.splice(index, 1);
        this.friendsProvider.removeFriend(friend.userid).then(function () {
            _this.accountProvider.getAccount();
            _this.getFriends();
        });
    };
    FriendsPage.prototype.openAddFriends = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_9__modals_add_friends_add_friends__["a" /* AddFriendsModal */]);
        modal.present();
    };
    FriendsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-friends',template:/*ion-inline-start:"D:\Taylor\Documents\Websites\intensity2\src\pages\friends\friends.html"*/`<ion-header>\n    <ion-navbar color="primary">\n        <button ion-button menuToggle>\n            <ion-icon name="menu"></ion-icon>\n        </button>\n        <ion-title>Friends</ion-title>\n\n        <ion-buttons end>\n            <button ion-button icon-only (click)="openAddFriends()">\n                <ion-icon name="person-add" ></ion-icon>\n            </button>\n        </ion-buttons>    \n        \n      \n    \n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n    \n    <ion-segment color="primary" [(ngModel)]="properties.activeTab" (ionChange)="tabChanged($event)">\n        <ion-segment-button value="friends">\n            Friends\n        </ion-segment-button>\n      <ion-segment-button value="activity">\n            Activity\n      </ion-segment-button>\n      <ion-segment-button value="requests">\n            Requests\n            <ion-badge *ngIf="friendRequests.length > 0">{{friendRequests.length}}</ion-badge>\n      </ion-segment-button>        \n    </ion-segment>    \n\n    <div class="diary-loading" *ngIf="properties.loading">\n        <ion-spinner></ion-spinner>\n    </div>    \n    \n    \n    <div *ngIf="properties.activeTab === \'friends\'">\n        \n        <div class="diary-empty empty-state" *ngIf="!properties.loading && alphabet.length < 1">\n            <ion-icon name=\'people\'></ion-icon>\n            No Friends\n        </div>         \n        \n        <ion-list class="friends-list">\n            <div *ngFor="let letter of alphabet">\n                <ion-list-header>\n                    {{letter}}\n                </ion-list-header>            \n                <ion-item *ngFor="let friend of friends[letter]" (click)="viewProfile(friend, true)">\n                    <ion-avatar item-start>\n                        <img [src]="getDp(friend.dp)" onerror="this.style.display=\'none\'">\n                    </ion-avatar>\n                    <h2>{{friend.name}}</h2>\n                    <p></p>\n\n                    <ion-icon ios="ios-arrow-forward" md="ios-arrow-forward" item-end></ion-icon>\n\n                </ion-item>  \n            </div>\n        </ion-list>\n    </div>\n    \n    \n    <div *ngIf="properties.activeTab === \'activity\'">\n        <ion-list class=\'activity\'>\n            <ion-item *ngFor="let activity of friendActivity;" (click)="viewDetails(activity)">\n                <ion-avatar item-start>\n                    <img [src]="getDp(activity.dp)" onerror="this.style.display=\'none\'">\n                </ion-avatar>                \n                <h2>{{formatDate(activity.assigneddate)}}</h2>\n                <p>{{activity.display ? activity.display : activity.username}} tracked {{activity.name}}</p>             \n                <ion-icon tappable name="copy" item-end ion-datepicker (ionChanged)="copyToDate($event, activity)" [okText]="\'Copy To Date\'"></ion-icon>\n            </ion-item>  \n            \n        </ion-list>\n    \n        <ion-infinite-scroll (ionInfinite)="getMoreActivity($event)">\n            <ion-infinite-scroll-content></ion-infinite-scroll-content>\n        </ion-infinite-scroll>         \n    </div>   \n    \n    \n    \n    <div *ngIf="properties.activeTab === \'requests\'">\n        <ion-list class="friends-list">           \n            <ion-item *ngFor="let request of friendRequests; let i = index" (click)="viewProfile(request, false)">\n                <ion-avatar item-start>\n                    <img [src]="getDp(request.dp)" onerror="this.style.display=\'none\'">\n                </ion-avatar>\n                <h2>{{request.display ? request.display : request.username}}</h2>\n                <p></p>\n                <button ion-button clear item-end (click)="declineFriend(request,i)">Decline</button>\n                <button ion-button clear item-end (click)="acceptFriend(request,i)">Accept</button>\n                \n            </ion-item>  \n        </ion-list>\n    </div>    \n    \n \n</ion-content>\n`/*ion-inline-end:"D:\Taylor\Documents\Websites\intensity2\src\pages\friends\friends.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_4__providers_account_account__["a" /* AccountProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_friends_friends__["a" /* FriendsProvider */], __WEBPACK_IMPORTED_MODULE_6__providers_diary_diary__["a" /* DiaryProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], FriendsPage);
    return FriendsPage;
}());

//# sourceMappingURL=friends.js.map

/***/ }),

/***/ 369:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FriendDiaryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_diary_diary__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_account_account__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_exercise_exercise__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_friends_friends__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ion_datepicker__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_social_sharing__ = __webpack_require__(44);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var FriendDiaryPage = (function () {
    function FriendDiaryPage(navCtrl, params, modalCtrl, storage, diaryProvider, accountProvider, events, exerciseProvider, alertCtrl, socialSharing, friendsProvider) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.params = params;
        this.modalCtrl = modalCtrl;
        this.storage = storage;
        this.diaryProvider = diaryProvider;
        this.accountProvider = accountProvider;
        this.events = events;
        this.exerciseProvider = exerciseProvider;
        this.alertCtrl = alertCtrl;
        this.socialSharing = socialSharing;
        this.friendsProvider = friendsProvider;
        this.friend = this.params.data.friend;
        this.profile = this.params.data.profile;
        console.log(this.friend);
        this.friend.friendid = this.friend.friendid ? this.friend.friendid : this.friend.userid;
        this.friend.userid = this.friend.friendid;
        this.selectedDate = new Date();
        this.setupSlides();
        this.copyWorkoutOnly = false;
        this.storage.get("account").then(function (data) {
            _this.account = data;
        });
        this.profile = {};
        this.getProfile();
    }
    FriendDiaryPage.prototype.getProfile = function () {
        var _this = this;
        this.storage.get("profile" + this.friend.friendid).then(function (data) {
            if (data) {
                _this.profile = data;
            }
        });
        this.accountProvider.getProfile(this.friend.friendid).then(function (data) {
            _this.profile = data;
        });
    };
    FriendDiaryPage.prototype.setupSlides = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.workoutSlides = [_this.selectedDate];
            _this.workouts = [{ loading: true, retreived: false, workouts: [] }];
            for (var i = 1; i < 8; i++) {
                var newDate = _this.calculateDate(_this.selectedDate, -i);
                _this.workoutSlides.unshift(newDate);
                _this.workouts.unshift({ loading: true, retreived: false, workouts: [] });
                var newDate2 = _this.calculateDate(_this.selectedDate, i);
                _this.workoutSlides.push(newDate2);
                _this.workouts.push({ loading: true, retreived: false, workouts: [] });
            }
            resolve();
        });
    };
    FriendDiaryPage.prototype.getWorkout = function (workout) {
        if (workout.retreived) {
            return;
        }
        else {
            workout.loading = true;
            var formattedDate = __WEBPACK_IMPORTED_MODULE_3_moment__(this.selectedDate).format('YYYY-MM-DD');
            this.friendsProvider.getWorkout(formattedDate, this.friend.friendid).then(function (data) {
                workout.workouts = data;
                workout.loading = false;
                workout.retreived = true;
            })
                .catch(function () {
                workout.loading = false;
                workout.retreived = false;
            });
        }
    };
    FriendDiaryPage.prototype.calculateDate = function (date, change) {
        return (function (d) { return new Date(d.setDate(d.getDate() + change)); })(new Date(date));
    };
    FriendDiaryPage.prototype.getSelectedDate = function () {
        return __WEBPACK_IMPORTED_MODULE_3_moment__(this.selectedDate).calendar(null, {
            sameDay: '[Today]',
            nextDay: '[Tomorrow]',
            nextWeek: 'dddd',
            lastDay: '[Yesterday]',
            lastWeek: '[Last] dddd',
            sameElse: 'dddd, MMMM Do YYYY'
        });
    };
    FriendDiaryPage.prototype.getSelectedDateKey = function () {
        return __WEBPACK_IMPORTED_MODULE_3_moment__(this.selectedDate).format('YYYY-MM-DD');
    };
    FriendDiaryPage.prototype.changeDay = function (direction) {
        this.selectedDate = this.calculateDate(this.selectedDate, direction);
        this.getWorkout(this.workouts[this.slides.getActiveIndex()]);
        if (direction > 0) {
            this.slides.slideNext();
        }
        else {
            this.slides.slidePrev();
        }
    };
    FriendDiaryPage.prototype.changeDate = function (date) {
        var _this = this;
        this.selectedDate = date;
        this.setupSlides().then(function () {
            _this.slides.slideTo(7, 0, false);
            _this.getWorkout(_this.workouts[7]);
        });
    };
    FriendDiaryPage.prototype.workoutChanged = function () {
        this.selectedDate = this.workoutSlides[this.slides.getActiveIndex()];
        this.getWorkout(this.workouts[this.slides.getActiveIndex()]);
        if (this.slides.isBeginning()) {
            for (var i = 1; i < 8; i++) {
                var newDate = this.calculateDate(this.selectedDate, -i);
                this.workoutSlides.unshift(newDate);
                this.workouts.unshift({ loading: true, retreived: false, workouts: [] });
            }
            this.slides.slideTo(7, 0, false);
        }
        else if (this.slides.isEnd()) {
            for (var i = 1; i < 8; i++) {
                var newDate = this.calculateDate(this.selectedDate, i);
                this.workoutSlides.push(newDate);
                this.workouts.push({ loading: true, retreived: false, workouts: [] });
            }
        }
    };
    FriendDiaryPage.prototype.selectExercise = function (exercise) {
        var _this = this;
        var setString = "";
        for (var _i = 0, _a = exercise.sets; _i < _a.length; _i++) {
            var set = _a[_i];
            setString = setString + "<div class='histroy-set'>" + set['reps'] + " reps, " + set['weight'] + this.profile.units + ", " + set['percentage'] + "%, " + set['rpe'] + "RPE</div>";
        }
        var progressPecentage = Math.round((exercise.goals.progress / exercise.goals.goal) * 100);
        var alert = this.alertCtrl.create({
            title: exercise.name,
            subTitle: progressPecentage + "% complete",
            message: setString,
            buttons: [
                {
                    text: 'Dismiss',
                    role: 'cancel'
                },
                {
                    text: 'Copy',
                    handler: function (data) {
                        _this.datepicker.open();
                    }
                }
            ]
        });
        alert.present();
    };
    FriendDiaryPage.prototype.showOptions = function (exercise, index) {
        var _this = this;
        var alertObj = {
            title: exercise.name,
            cssClass: "button-only-alert",
            buttons: [
                {
                    text: 'Share',
                    handler: function (data) {
                        var name = _this.friend.display ? _this.friend.display : _this.friend.username;
                        var setText = name + " tracked " + exercise.name + " on Intensity. This is their sets: ";
                        for (var _i = 0, _a = exercise.sets; _i < _a.length; _i++) {
                            var set = _a[_i];
                            setText = setText + set.reps + " reps with " + set.weight + set.unit + " (" + set.percentage + "%, " + set.rpe + "rpe), ";
                        }
                        setText = setText.replace(/^[,\s]+|[,\s]+$/g, '');
                        _this.socialSharing
                            .share(setText, name + "'s workout on Intensity", null, "http://www.intensityapp.com/") // Share via native share sheet
                            .then(function (result) {
                            // Success!
                        }, function (err) {
                            // An error occured. Show a message to the user
                        });
                    },
                    cssClass: "share-button"
                },
                {
                    text: 'Copy',
                    handler: function (data) {
                        _this.selectedExercise = exercise;
                        _this.datepicker.open();
                    },
                    cssClass: "copy-button"
                },
            ]
        };
        var alert = this.alertCtrl.create(alertObj);
        alert.present();
    };
    FriendDiaryPage.prototype.copyWorkout = function (date) {
        var _this = this;
        if (!this.selectedExercise) {
            this.doCopy("workout", date);
            return;
        }
        var data = {
            title: "What sets do you want to copy?",
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel'
                },
                {
                    text: 'Copy',
                    handler: function (data) {
                        _this.doCopy(data, date);
                    }
                }
            ],
            inputs: [
                { type: 'radio', label: "Selected Exercise", value: "sets", checked: true },
                { type: 'radio', label: "Entire Workout", value: "workout", checked: false }
            ]
        };
        var alert = this.alertCtrl.create(data);
        setTimeout(function () {
            alert.present();
        }, 200);
    };
    FriendDiaryPage.prototype.doCopy = function (copyType, date) {
        var _this = this;
        var copy = {
            exerciseid: copyType === "sets" ? this.selectedExercise.exerciseid : null,
            userid: this.friend.userid,
            type: copyType,
            date: __WEBPACK_IMPORTED_MODULE_3_moment__(date).format('YYYY-MM-DD'),
            assigneddate: __WEBPACK_IMPORTED_MODULE_3_moment__(this.selectedDate).format('YYYY-MM-DD')
        };
        this.diaryProvider.copyWorkout(copy).then(function () {
            _this.events.publish('workout:copied', { date: copy.date });
            var sets = 0;
            if (copyType === "sets") {
                sets = _this.selectedExercise.sets.length;
            }
            else {
                var workout = _this.workouts[_this.slides.getActiveIndex()];
                for (var _i = 0, _a = workout.workouts; _i < _a.length; _i++) {
                    var exercise = _a[_i];
                    sets = sets + exercise.sets.length;
                }
            }
            var alert = _this.alertCtrl.create({
                title: sets + " sets copied",
                subTitle: "To " + __WEBPACK_IMPORTED_MODULE_3_moment__(date).format('MMMM Do YYYY'),
                buttons: [
                    {
                        text: 'OK',
                        role: 'cancel'
                    }
                ]
            });
            alert.present();
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* Slides */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* Slides */])
    ], FriendDiaryPage.prototype, "slides", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_8_ion_datepicker__["a" /* DatePickerDirective */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_8_ion_datepicker__["a" /* DatePickerDirective */])
    ], FriendDiaryPage.prototype, "datepicker", void 0);
    FriendDiaryPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-friend-diary',template:/*ion-inline-start:"D:\Taylor\Documents\Websites\intensity2\src\pages\friend-diary\friend-diary.html"*/`<ion-header>\n    <ion-navbar color="primary">\n        <button ion-button menuToggle>\n            <ion-icon name="menu"></ion-icon>\n        </button>\n        <ion-title>Diary</ion-title>\n\n        <ion-buttons end>\n            <button ion-button icon-only ion-datepicker (ionChanged)="copyWorkout($event)" [okText]="\'Copy To Date\'">\n                <ion-icon name="copy" ></ion-icon>\n            </button>\n        </ion-buttons>    \n        \n      \n    \n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <div class="date-changer">\n        <ion-icon tappable ios="ios-arrow-back" md="ios-arrow-back" (click)="changeDay(-1)"></ion-icon>\n        <span tappable ion-datepicker (ionChanged)="changeDate($event)">{{getSelectedDate()}}</span>\n        <ion-icon tappable ios="ios-arrow-forward" md="ios-arrow-forward" (click)="changeDay(1)"></ion-icon>\n    </div>\n    \n    <ion-slides initialSlide="7" (ionSlideDidChange)="workoutChanged()">\n\n        <ion-slide style="background-color:#ececec;" *ngFor="let slide of workoutSlides; let i = index" >\n            \n            <div class="diary-loading" *ngIf="workouts[i].loading">\n                <ion-spinner></ion-spinner>\n            </div>\n                   \n            <div class="diary-empty" *ngIf="workouts[i].workouts.length < 1 && !workouts[i].loading">\n                <ion-icon name=\'bookmarks\'></ion-icon>\n                Diary Empty\n            </div>                   \n                   \n            <ion-list class=\'diary-exercise-list\' *ngIf="!workouts[i].loading">\n              <ion-item *ngFor="let exercise of workouts[i].workouts; let i = index" (click)="selectExercise(exercise)" (press)="showOptions(exercise,i)">\n                  <h2>{{exercise.name}}</h2>\n                  <p *ngIf="exercise.sets.length < 11">\n                      <ion-icon *ngFor="let set of exercise.sets" [ngClass]="{\'completed\' : !(!set.completed || set.completed === \'0\')}" name=\'checkmark-circle\'></ion-icon>\n                  </p>\n                  <p *ngIf="exercise.sets.length > 10">\n                      <span class="set-overflow">{{exercise.sets.length}}</span>\n                  </p>                  \n                  \n                  <div class="bar-progress" [ngStyle]="{\'width\': (exercise.goals.progress / exercise.goals.goal) * 100 + \'%\'}" [ngClass]="{\'calibrating\' : exercise.calibrating}"></div>\n                  <ion-icon ios="ios-arrow-forward" md="ios-arrow-forward" item-end ></ion-icon>\n              </ion-item>\n \n                \n                \n            </ion-list>            \n            \n            \n        </ion-slide>\n\n    </ion-slides>\n\n    \n</ion-content>\n`/*ion-inline-end:"D:\Taylor\Documents\Websites\intensity2\src\pages\friend-diary\friend-diary.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_4__providers_diary_diary__["a" /* DiaryProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_account_account__["a" /* AccountProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_6__providers_exercise_exercise__["a" /* ExerciseProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_9__ionic_native_social_sharing__["a" /* SocialSharing */], __WEBPACK_IMPORTED_MODULE_7__providers_friends_friends__["a" /* FriendsProvider */]])
    ], FriendDiaryPage);
    return FriendDiaryPage;
}());

//# sourceMappingURL=friend-diary.js.map

/***/ }),

/***/ 370:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddFriendsModal; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_friends_friends__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_account_account__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_social_sharing__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_app_settings__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_friend_profile_friend_profile__ = __webpack_require__(73);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var AddFriendsModal = (function () {
    function AddFriendsModal(navCtrl, platform, params, viewCtrl, toastCtrl, friendsProvider, storage, alertCtrl, accountProvider, socialSharing) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.params = params;
        this.viewCtrl = viewCtrl;
        this.toastCtrl = toastCtrl;
        this.friendsProvider = friendsProvider;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.accountProvider = accountProvider;
        this.socialSharing = socialSharing;
        this.properties = { search: "", loading: false, paused: false };
        this.suggestedFriends = [];
        this.friends = [];
        this.account = {};
        this.storage.get("account").then(function (data) {
            _this.account = data;
        });
        this.getSuggestedFriends();
    }
    AddFriendsModal.prototype.ionViewWillEnter = function () {
        if (this.properties.paused) {
            this.properties.paused = false;
            this.reloadFriends();
        }
    };
    AddFriendsModal.prototype.ionViewWillLeave = function () {
        this.properties.paused = true;
    };
    AddFriendsModal.prototype.reloadFriends = function () {
        var _this = this;
        this.friendsProvider.getSuggestedFriends(this.account.id).then(function (data) {
            _this.suggestedFriends = data;
        });
        if (this.properties.search) {
            this.searchFriends(this.properties.search);
        }
    };
    AddFriendsModal.prototype.getSuggestedFriends = function () {
        var _this = this;
        this.properties.loading = true;
        this.friendsProvider.getSuggestedFriends(this.account.id).then(function (data) {
            _this.properties.loading = false;
            _this.suggestedFriends = data;
        });
    };
    AddFriendsModal.prototype.searchFriends = function (search) {
        var _this = this;
        this.friendsProvider.searchUsers(search).then(function (data) {
            _this.friends = data;
            for (var _i = 0, _a = _this.friends; _i < _a.length; _i++) {
                var friend = _a[_i];
                if (friend.friends.indexOf(friend.userid) > -1) {
                    friend.added = true;
                }
                for (var _b = 0, _c = _this.account.requests; _b < _c.length; _b++) {
                    var request = _c[_b];
                    if (request.userid === friend.userid) {
                        friend.pending = true;
                        break;
                    }
                }
            }
        });
    };
    AddFriendsModal.prototype.getDp = function (dp) {
        return __WEBPACK_IMPORTED_MODULE_6__app_app_settings__["a" /* AppSettings */].apiUrl.replace("index.php", "") + dp;
    };
    AddFriendsModal.prototype.viewProfile = function (friend) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__pages_friend_profile_friend_profile__["a" /* FriendProfilePage */], { friend: friend, added: false });
    };
    AddFriendsModal.prototype.addFriend = function (ev, friend) {
        var _this = this;
        ev.stopPropagation();
        friend.adding = true;
        this.friendsProvider.addFriend(friend.userid).then(function () {
            _this.accountProvider.getAccount();
            friend.added = true;
            friend.adding = false;
        });
    };
    AddFriendsModal.prototype.inviteFriends = function () {
        this.socialSharing
            .share("Check out Intensity, the workout tracking app", "Intensity", null, "http://www.intensityapp.com");
    };
    AddFriendsModal.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    AddFriendsModal = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'add-friends',template:/*ion-inline-start:"D:\Taylor\Documents\Websites\intensity2\src\modals\add-friends\add-friends.html"*/`<ion-header>\n    <ion-toolbar color="primary">\n        <ion-title>\n            Add Friends\n        </ion-title>\n        \n       <ion-buttons start>\n            <button icon-start ion-button (click)="inviteFriends()" showWhen="android, windows">\n                <ion-icon name="md-share"></ion-icon>\n                Invite\n            </button>       \n           \n            \n            <button ion-button (click)="dismiss()">\n                <span ion-text showWhen="ios">Cancel</span>\n                <ion-icon name="md-close" showWhen="android, windows"></ion-icon>\n            </button>\n        </ion-buttons>\n        \n        <ion-buttons showWhen="ios" end>\n            <button ion-button (click)="inviteFriends()">\n                <span ion-text>Invite</span>\n            </button>             \n        </ion-buttons>        \n \n    </ion-toolbar>\n</ion-header>\n\n\n\n<ion-content>\n    \n    \n    <ion-searchbar\n        [(ngModel)]="properties.search"\n        [showCancelButton]="shouldShowCancel"\n        (ionInput)="searchFriends(properties.search)"\n        (ionCancel)="searchCancelled()"\n        placeholder="Search Users"\n        class="flat-search">\n    </ion-searchbar>   \n    \n\n   \n    <div class="diary-loading" *ngIf="properties.loading">\n        <ion-spinner></ion-spinner>\n    </div>    \n    \n    <ion-list class="friends-list" *ngIf="!properties.search">\n           \n            <ion-item *ngFor="let friend of suggestedFriends" (click)="viewProfile(friend, true)">\n                <ion-avatar item-start>\n                    <img [src]="getDp(friend.dp)">\n                </ion-avatar>\n                <h2>{{friend.display ? friend.display : friend.username}}</h2>\n                <p></p>\n\n                <button ion-button outline [disabled]="friend.adding || friend.added" item-end (click)="addFriend($event,friend)">\n                    <ion-spinner class="add-friend-loading" *ngIf="friend.adding"></ion-spinner>\n                    <span *ngIf="!friend.added">Add</span>\n                    <span *ngIf="friend.added">Added!</span>\n                </button>\n\n            </ion-item>  \n    </ion-list>\n    \n    <ion-list class="friends-list" *ngIf="properties.search">\n           \n            <ion-item *ngFor="let friend of friends" (click)="viewProfile(friend, true)">\n                <ion-avatar item-start>\n                    <img [src]="getDp(friend.dp)">\n                </ion-avatar>\n                <h2>{{friend.display ? friend.display : friend.username}}</h2>\n                <p></p>\n\n                <button ion-button outline [disabled]="(friend.adding || friend.added) && !friend.pending" item-end (click)="addFriend($event,friend)">\n                    <ion-spinner class="add-friend-loading" *ngIf="friend.adding"></ion-spinner>\n                    <span *ngIf="!friend.added && !friend.pending">Add</span>\n                    <span *ngIf="friend.added && !friend.pending">Added!</span>\n                    <span *ngIf="friend.pending">Accept</span>\n                </button>\n\n            </ion-item>  \n    </ion-list>    \n\n    \n</ion-content>`/*ion-inline-end:"D:\Taylor\Documents\Websites\intensity2\src\modals\add-friends\add-friends.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ToastController */], __WEBPACK_IMPORTED_MODULE_2__providers_friends_friends__["a" /* FriendsProvider */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_3__providers_account_account__["a" /* AccountProvider */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_social_sharing__["a" /* SocialSharing */]])
    ], AddFriendsModal);
    return AddFriendsModal;
}());

//# sourceMappingURL=add-friends.js.map

/***/ }),

/***/ 371:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessagesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_account_account__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_friends_friends__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_message_message__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_message_message__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__modals_search_friends_search_friends__ = __webpack_require__(372);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__app_app_settings__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var MessagesPage = (function () {
    function MessagesPage(navCtrl, modalCtrl, storage, accountProvider, friendsProvider, messageProvider, events, alertCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.storage = storage;
        this.accountProvider = accountProvider;
        this.friendsProvider = friendsProvider;
        this.messageProvider = messageProvider;
        this.events = events;
        this.alertCtrl = alertCtrl;
        this.properties = { loading: false };
        this.messages = [];
        this.account = {};
        this.storage.get("account").then(function (data) {
            _this.account = data;
        });
        this.getMessages(true);
    }
    MessagesPage.prototype.ionViewDidEnter = function () {
        if (this.properties.loading) {
            return;
        }
        this.getMessages(false);
    };
    MessagesPage.prototype.getMessages = function (showLoading) {
        var _this = this;
        this.properties.loading = showLoading && true;
        this.messageProvider.getConversations().then(function (data) {
            _this.properties.loading = false;
            _this.messages = data;
        }).catch(function () { _this.properties.loading = false; });
    };
    MessagesPage.prototype.getDp = function (dp) {
        return __WEBPACK_IMPORTED_MODULE_9__app_app_settings__["a" /* AppSettings */].apiUrl.replace("index.php", "") + dp;
    };
    MessagesPage.prototype.getMessageTime = function (date) {
        return __WEBPACK_IMPORTED_MODULE_3_moment__(date).fromNow();
    };
    MessagesPage.prototype.openNewMessage = function () {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_8__modals_search_friends_search_friends__["a" /* SearchFriendsModal */]);
        modal.onDidDismiss(function (friend) {
            if (friend) {
                friend.userid = friend.friendid;
                _this.goToMessage(friend);
            }
        });
        modal.present();
    };
    MessagesPage.prototype.goToMessage = function (profile) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__pages_message_message__["a" /* MessagePage */], { profile: profile });
    };
    MessagesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-messages',template:/*ion-inline-start:"D:\Taylor\Documents\Websites\intensity2\src\pages\messages\messages.html"*/`<ion-header>\n    <ion-navbar color="primary">\n        <button ion-button menuToggle>\n            <ion-icon name="menu"></ion-icon>\n        </button>\n        <ion-title>Messages</ion-title>\n\n        <ion-buttons end>\n            <button ion-button icon-only (click)="openNewMessage()">\n                <ion-icon name="create" ></ion-icon>\n            </button>\n        </ion-buttons>    \n        \n      \n    \n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n\n    <div class="diary-loading" *ngIf="properties.loading">\n        <ion-spinner></ion-spinner>\n    </div>\n    \n    <div class="diary-empty empty-state" *ngIf="!properties.loading && messages.length < 1">\n        <ion-icon name=\'chatbubbles\'></ion-icon>\n        No Messages\n    </div>\n\n    \n<ion-list class="messages-list" *ngIf="!properties.loading">\n<ion-item *ngFor="let message of messages" (click)="goToMessage(message.profile)" [ngClass]="{\'requires-reply\':message.userid !== account.id}">\n    <ion-avatar item-start>\n        <img [src]="getDp(message.profile.dp)" onerror="this.style.display=\'none\'">\n      </ion-avatar>\n    <ion-label>\n      \n      <h2>{{message.profile.display ? message.profile.display : message.profile.username}}</h2>\n      <p>{{message.message}}</p>\n      \n    </ion-label>\n    \n    <ion-note item-end>{{getMessageTime(message.created)}}</ion-note>\n\n</ion-item>\n</ion-list>\n    \n    \n    \n</ion-content>\n`/*ion-inline-end:"D:\Taylor\Documents\Websites\intensity2\src\pages\messages\messages.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_4__providers_account_account__["a" /* AccountProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_friends_friends__["a" /* FriendsProvider */], __WEBPACK_IMPORTED_MODULE_6__providers_message_message__["a" /* MessageProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], MessagesPage);
    return MessagesPage;
}());

//# sourceMappingURL=messages.js.map

/***/ }),

/***/ 372:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchFriendsModal; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_account_account__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_app_settings__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SearchFriendsModal = (function () {
    function SearchFriendsModal(platform, params, viewCtrl, toastCtrl, storage, alertCtrl, accountProvider) {
        var _this = this;
        this.platform = platform;
        this.params = params;
        this.viewCtrl = viewCtrl;
        this.toastCtrl = toastCtrl;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.accountProvider = accountProvider;
        this.properties = { search: "" };
        this.friends = [];
        this.storage.get("account").then(function (data) {
            _this.account = data;
            _this.getFriends();
        });
    }
    SearchFriendsModal.prototype.getFriends = function () {
        var _this = this;
        this.storage.get("profile" + this.account.id).then(function (data) {
            if (data) {
                _this.friends = data["acceptedfriends"];
            }
        });
        this.accountProvider.getProfile(this.account.id).then(function (data) {
            _this.friends = data["acceptedfriends"];
        });
    };
    SearchFriendsModal.prototype.getDp = function (dp) {
        return __WEBPACK_IMPORTED_MODULE_4__app_app_settings__["a" /* AppSettings */].apiUrl.replace("index.php", "") + dp;
    };
    SearchFriendsModal.prototype.searchCancelled = function () {
        this.properties.search = '';
    };
    SearchFriendsModal.prototype.selectFriend = function (userid) {
        this.viewCtrl.dismiss(userid);
    };
    SearchFriendsModal.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    SearchFriendsModal = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'search-friends',template:/*ion-inline-start:"D:\Taylor\Documents\Websites\intensity2\src\modals\search-friends\search-friends.html"*/`<ion-header>\n    <ion-toolbar color="primary">\n        <ion-title>\n            Send Message\n        </ion-title>\n        <ion-buttons start>\n            <button ion-button (click)="dismiss()">\n                <span ion-text showWhen="ios">Cancel</span>\n                <ion-icon name="md-close" showWhen="android, windows"></ion-icon>\n            </button>\n        </ion-buttons>\n    </ion-toolbar>\n</ion-header>\n\n\n\n<ion-content>\n    \n    \n    <ion-searchbar\n        [(ngModel)]="properties.search"\n        [showCancelButton]="shouldShowCancel"\n        (ionCancel)="searchCancelled()"\n        placeholder="Search Friends"\n        class="flat-search">\n    </ion-searchbar>   \n    \n\n\n    \n    <ion-list class="search-friends">\n        <ion-item *ngFor="let friend of friends" (click)="selectFriend(friend)">\n            <ion-avatar item-start>\n                <img [src]="getDp(friend.dp)">\n            </ion-avatar>\n            <h2>{{friend.display ? friend.display : friend.username}}</h2>\n            <p></p>\n\n            <ion-icon ios="ios-arrow-forward" md="ios-arrow-forward" item-end></ion-icon>\n\n        </ion-item>  \n    </ion-list>\n     \n    \n\n    \n</ion-content>`/*ion-inline-end:"D:\Taylor\Documents\Websites\intensity2\src\modals\search-friends\search-friends.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ToastController */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_3__providers_account_account__["a" /* AccountProvider */]])
    ], SearchFriendsModal);
    return SearchFriendsModal;
}());

//# sourceMappingURL=search-friends.js.map

/***/ }),

/***/ 373:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LeaderboardPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_leaderboard_leaderboard__ = __webpack_require__(374);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_exercise_exercise__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_account_account__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_app_settings__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_social_sharing__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__modals_select_exercise_select_exercise__ = __webpack_require__(43);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var LeaderboardPage = (function () {
    function LeaderboardPage(navCtrl, modalCtrl, storage, accountProvider, leaderboardProvider, exerciseProvider, events, alertCtrl, socialSharing) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.storage = storage;
        this.accountProvider = accountProvider;
        this.leaderboardProvider = leaderboardProvider;
        this.exerciseProvider = exerciseProvider;
        this.events = events;
        this.alertCtrl = alertCtrl;
        this.socialSharing = socialSharing;
        this.properties = { type: "maxes", reps: "1", limit: 10, exerciseid: 0 };
        this.leaderboardProperties = { "0-1": { loading: true } };
        this.leaderboards = {};
        this.storage.get("account").then(function (data) {
            _this.account = data;
        });
        this.reps = [];
        for (var x = 1; x < 31; x++) {
            this.reps.push(x);
        }
        this.exercise = { name: "" };
        this.getLatestExercise();
    }
    LeaderboardPage.prototype.getLatestExercise = function () {
        var _this = this;
        this.storage.get("recentexercises").then(function (exercises) {
            if (exercises && exercises.length > 0) {
                _this.exercise = exercises[0];
                _this.getLeaderboard();
            }
        });
        this.exerciseProvider.getRecentExercises().then(function (exercises) {
            if (!_this.exercise.name) {
                _this.exercise = exercises[0];
                _this.getLeaderboard();
            }
        });
    };
    LeaderboardPage.prototype.getLeaderboard = function () {
        var _this = this;
        this.properties.exerciseid = this.exercise.exerciseid;
        var key = this.properties.exerciseid + "-" + this.properties.reps;
        if (key in this.leaderboards) {
            return;
        }
        this.leaderboards[key] = [];
        this.leaderboardProperties[key] = { page: 1, canloadmore: true, loading: true };
        this.preloadLeaderboard();
        var options = {};
        Object.assign(options, this.properties);
        Object.assign(options, this.leaderboardProperties[key]);
        this.leaderboardProvider.getLeaderboard(options).then(function (data) {
            _this.leaderboards[key] = data["data"];
            _this.leaderboardProperties[key].canloadmore = data["canloadmore"];
            _this.leaderboardProperties[key].loading = false;
        })
            .catch(function () {
            _this.leaderboards[key] = [];
            _this.leaderboardProperties[key].canloadmore = false;
            _this.leaderboardProperties[key].loading = false;
        });
    };
    LeaderboardPage.prototype.loadMoreLeaderboard = function (infiniteScroll) {
        var _this = this;
        var key = this.properties.exerciseid + "-" + this.properties.reps;
        if (!this.leaderboardProperties[key].canloadmore) {
            infiniteScroll.complete();
            return;
        }
        this.leaderboardProperties[key].page = this.leaderboardProperties[key].page + 1;
        var options = {};
        Object.assign(options, this.properties);
        Object.assign(options, this.leaderboardProperties[key]);
        this.leaderboardProvider.getLeaderboard(options).then(function (data) {
            for (var _i = 0, _a = data["data"]; _i < _a.length; _i++) {
                var item = _a[_i];
                _this.leaderboards[key].push(item);
            }
            _this.leaderboardProperties[key].canloadmore = data["canloadmore"];
            infiniteScroll.complete();
        })
            .catch(function () {
            _this.leaderboardProperties[key].canloadmore = false;
            infiniteScroll.complete();
        });
    };
    LeaderboardPage.prototype.preloadLeaderboard = function () {
        var _this = this;
        var key = this.properties.exerciseid + "-" + this.properties.reps;
        if (this.leaderboardProperties[key].page !== 1) {
            return;
        }
        this.storage.get("leaderboard" + this.properties.exerciseid + +this.properties.reps + this.leaderboardProperties[key].page + this.properties.limit).then(function (data) {
            if (data) {
                _this.leaderboards[key] = data["data"];
                _this.leaderboardProperties[key].loading = false;
            }
        });
    };
    LeaderboardPage.prototype.getDp = function (dp) {
        return __WEBPACK_IMPORTED_MODULE_7__app_app_settings__["a" /* AppSettings */].apiUrl.replace("index.php", "") + dp;
    };
    LeaderboardPage.prototype.formatDate = function (date) {
        return __WEBPACK_IMPORTED_MODULE_3_moment__(date).format('MMMM Do YYYY');
    };
    LeaderboardPage.prototype.toggleLike = function (item) {
        item.liked = !item.liked;
        if (item.liked) {
            item.likes.push({});
            this.leaderboardProvider.likeSet(item.id);
        }
        else {
            item.likes.pop();
            this.leaderboardProvider.unlikeSet(item.id);
        }
    };
    LeaderboardPage.prototype.share = function (set, rank) {
        var name = set.display ? set.display : set.username;
        this.socialSharing
            .share(name + " tracked " + this.exercise.name + " for " + set.reps + " reps with " + set.weight + set.unit + ". They are ranked number " + rank + " on the Intensity leaderboard!", "Intensity leaderboard", null, "http://www.intensityapp.com/");
    };
    LeaderboardPage.prototype.openChangeExercise = function () {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_9__modals_select_exercise_select_exercise__["a" /* SelectExerciseModal */]);
        modal.onDidDismiss(function (exercise) {
            if (exercise) {
                _this.exercise = exercise;
                _this.getLeaderboard();
            }
        });
        modal.present();
    };
    LeaderboardPage.prototype.viewDetails = function (item, rank) {
        var name = item.display ? item.display : item.username;
        var alert = this.alertCtrl.create({
            title: rank + ". " + item.weight + item.unit,
            subTitle: "Made by " + name,
            message: "This record for " + this.exercise.name + " was performed on " + this.formatDate(item.assigneddate) + ". It was entered into their diary on " + this.formatDate(item.created),
            buttons: [
                {
                    text: 'Dismiss',
                    role: 'cancel'
                }
            ]
        });
        alert.present();
    };
    LeaderboardPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-leaderboard',template:/*ion-inline-start:"D:\Taylor\Documents\Websites\intensity2\src\pages\leaderboard\leaderboard.html"*/`<ion-header>\n    <ion-navbar color="primary">\n        <button ion-button menuToggle>\n            <ion-icon name="menu"></ion-icon>\n        </button>\n        <ion-title>Leaderboard</ion-title>\n\n        <ion-buttons end>\n            <button ion-button icon-only tools tappable>\n                <ion-icon name="more" ></ion-icon>\n            </button>\n        </ion-buttons>    \n        \n      \n    \n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n \n  \n    <h3 class="leaderboard-exercise" (click)="openChangeExercise()">{{exercise.name}} <ion-icon name="create"></ion-icon></h3>\n  \n    <div class="extended-segments" id="leaderboard-segments" >\n        <ion-segment color="primary" [(ngModel)]="properties.reps" (ionChange)="getLeaderboard()">\n            <ion-segment-button value="{{rep}}" *ngFor="let rep of reps">\n                {{rep}}RM\n            </ion-segment-button>\n        </ion-segment>\n    </div>   \n    \n    <div class="diary-loading" *ngIf="leaderboardProperties[properties.exerciseid + \'-\' + properties.reps].loading">\n        <ion-spinner></ion-spinner>\n    </div>    \n    \n    <div class="diary-empty leaderboard-empty" *ngIf="(!leaderboards[properties.exerciseid + \'-\' + properties.reps] || leaderboards[properties.exerciseid + \'-\' + properties.reps].length < 1) && !leaderboardProperties[properties.exerciseid + \'-\' + properties.reps].loading">\n        <ion-icon name=\'ribbon\'></ion-icon>\n        Leaderboard Empty\n    </div>    \n    \n    \n    <ion-list *ngIf="!leaderboardProperties[properties.exerciseid + \'-\' + properties.reps].loading" class="leaderboard-list">\n        <ion-item *ngFor="let item of leaderboards[properties.exerciseid + \'-\' + properties.reps]; let i = index">\n            <ion-avatar item-start>\n                <img [src]="getDp(item.dp)" onerror="this.style.display=\'none\'">\n            </ion-avatar>\n            <h2>{{i + 1}}. {{item.weight}}{{item.unit}}</h2>\n            <p (click)="viewDetails(item, i + 1)">{{item.display ? item.display : item.username}}, {{formatDate(item.assigneddate)}}</p>\n            \n            <ion-icon tappable [ngClass]="{\'liked\' : item.liked}" name="thumbs-up" item-end (click)="toggleLike(item)">\n                 <ion-badge item-end *ngIf="item.likes.length > 0">{{item.likes.length}}</ion-badge>   \n            </ion-icon>\n            <ion-icon tappable name="share" item-end (click)="share(item, i + 1)"></ion-icon>\n            \n        </ion-item>\n    </ion-list>    \n    \n    <ion-infinite-scroll (ionInfinite)="loadMoreLeaderboard($event)" *ngIf="!leaderboardProperties[properties.exerciseid + \'-\' + properties.reps].loading">\n        <ion-infinite-scroll-content></ion-infinite-scroll-content>\n    </ion-infinite-scroll>     \n    \n    \n</ion-content>\n`/*ion-inline-end:"D:\Taylor\Documents\Websites\intensity2\src\pages\leaderboard\leaderboard.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_6__providers_account_account__["a" /* AccountProvider */], __WEBPACK_IMPORTED_MODULE_4__providers_leaderboard_leaderboard__["a" /* LeaderboardProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_exercise_exercise__["a" /* ExerciseProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_social_sharing__["a" /* SocialSharing */]])
    ], LeaderboardPage);
    return LeaderboardPage;
}());

//# sourceMappingURL=leaderboard.js.map

/***/ }),

/***/ 374:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LeaderboardProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_settings__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(4);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/*
  Generated class for the DiaryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var LeaderboardProvider = (function () {
    function LeaderboardProvider(http, storage, events) {
        this.http = http;
        this.storage = storage;
        this.events = events;
    }
    LeaderboardProvider.prototype.getLeaderboard = function (options) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("session").then(function (session) {
                var data = { key: __WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiKey, session: session, controller: "view", action: "getleaderboard" };
                Object.assign(data, options);
                _this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl, data).subscribe(function (res) {
                    if (res["success"] === true) {
                        res["data"]["reps"] = data["reps"];
                        _this.storage.set("leaderboard" + data["exerciseid"] + data["reps"] + data["page"] + data["limit"], res["data"]);
                        resolve(res["data"]);
                    }
                    else {
                        reject(res);
                    }
                }, function (e) {
                    _this.events.publish("app:heartbeat");
                    _this.storage.get("leaderboard" + data["exerciseid"] + data["reps"] + data["page"] + data["limit"]).then(function (data) {
                        if (data) {
                            resolve(data);
                            return;
                        }
                        reject(e);
                    });
                });
            });
        });
    };
    LeaderboardProvider.prototype.likeSet = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("session").then(function (session) {
                var data = { key: __WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiKey, session: session, controller: "create", action: "likeset", id: id };
                _this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl, data).subscribe(function (res) {
                    if (res["success"] === true) {
                        resolve(res["data"]);
                    }
                    else {
                        reject(res);
                    }
                }, function (e) {
                    _this.events.publish("app:heartbeat");
                    reject(e);
                });
            });
        });
    };
    LeaderboardProvider.prototype.unlikeSet = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("session").then(function (session) {
                var data = { key: __WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiKey, session: session, controller: "edit", action: "unlikeset", id: id };
                _this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl, data).subscribe(function (res) {
                    if (res["success"] === true) {
                        resolve(res["data"]);
                    }
                    else {
                        reject(res);
                    }
                }, function (e) {
                    _this.events.publish("app:heartbeat");
                    reject(e);
                });
            });
        });
    };
    LeaderboardProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["d" /* Events */]])
    ], LeaderboardProvider);
    return LeaderboardProvider;
}());

//# sourceMappingURL=leaderboard.js.map

/***/ }),

/***/ 375:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_account_account__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_diary_diary__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__modals_edit_profile_edit_profile__ = __webpack_require__(376);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ion_datepicker__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_camera__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_file_transfer__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_file__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__app_app_settings__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var ProfilePage = (function () {
    function ProfilePage(navCtrl, modalCtrl, storage, accountProvider, events, alertCtrl, diaryProvider, camera, transfer, file, toastCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.storage = storage;
        this.accountProvider = accountProvider;
        this.events = events;
        this.alertCtrl = alertCtrl;
        this.diaryProvider = diaryProvider;
        this.camera = camera;
        this.transfer = transfer;
        this.file = file;
        this.toastCtrl = toastCtrl;
        this.properties = { activeTab: "profile", activityPage: 1 };
        this.account = {};
        this.profile = {};
        this.activity = {};
        this.storage.get("account").then(function (data) {
            _this.account = data;
            _this.getProfile();
            _this.accountProvider.getUserActivity(_this.account.id, _this.properties.activityPage).then(function (data) {
                _this.activity = data;
            });
        });
        this.storage.get("session").then(function (session) {
            _this.session = session;
        });
    }
    ProfilePage.prototype.getProfile = function () {
        var _this = this;
        this.storage.get("profile" + this.account.id).then(function (data) {
            if (data) {
                _this.profile = data;
            }
        });
        this.accountProvider.getProfile(this.account.id).then(function (data) {
            _this.profile = data;
        });
    };
    ProfilePage.prototype.getMoreActivity = function (infiniteScroll) {
        var _this = this;
        if (!this.activity.canloadmore) {
            infiniteScroll.complete();
            return;
        }
        this.properties.activityPage = this.properties.activityPage + 1;
        this.accountProvider.getUserActivity(this.account.id, this.properties.activityPage).then(function (data) {
            for (var _i = 0, _a = data["activity"]; _i < _a.length; _i++) {
                var item = _a[_i];
                _this.activity.activity.push(item);
            }
            _this.activity.canloadmore = data["canloadmore"];
            infiniteScroll.complete();
        })
            .catch(function (e) {
            infiniteScroll.complete();
        });
    };
    ProfilePage.prototype.openEditProfile = function () {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__modals_edit_profile_edit_profile__["a" /* EditProfileModal */], { profile: this.profile });
        modal.onDidDismiss(function (profile) {
            if (profile) {
                _this.profile = profile;
                profile.dp = null;
                _this.accountProvider.updateProfile(profile);
                _this.events.publish("profile:updated", { dp: _this.account.dp, username: _this.profile.username });
            }
        });
        modal.present();
    };
    ProfilePage.prototype.formatDate = function (date) {
        return __WEBPACK_IMPORTED_MODULE_3_moment__(date).format('MMMM Do YYYY');
    };
    ProfilePage.prototype.copyToDate = function (date, workout) {
        var _this = this;
        var copy = {
            exerciseid: workout.exerciseid,
            userid: this.account.id,
            type: "sets",
            date: __WEBPACK_IMPORTED_MODULE_3_moment__(date).format('YYYY-MM-DD'),
            assigneddate: __WEBPACK_IMPORTED_MODULE_3_moment__(workout.assigneddate).format('YYYY-MM-DD')
        };
        this.diaryProvider.copyWorkout(copy).then(function (data) {
            var alert = _this.alertCtrl.create({
                title: workout.sets + " sets copied",
                subTitle: "To " + _this.formatDate(date),
                buttons: [
                    {
                        text: 'OK',
                        role: 'cancel'
                    }
                ]
            });
            alert.present();
        });
    };
    ProfilePage.prototype.viewDetails = function (activity) {
        var alert = this.alertCtrl.create({
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
    };
    ProfilePage.prototype.changeAvatar = function () {
        var _this = this;
        var cameraOptions = {
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            quality: 25
        };
        this.camera.getPicture(cameraOptions)
            .then(function (image) {
            var fileTransfer = _this.transfer.create();
            var options = {
                fileKey: "fileToUpload",
                fileName: _this.account.username,
                params: { key: __WEBPACK_IMPORTED_MODULE_11__app_app_settings__["a" /* AppSettings */].apiKey, session: _this.session, controller: "edit", action: "uploaddp", userid: _this.account.id },
                mimeType: "image/jpeg"
            };
            var toast = _this.toastCtrl.create({
                message: 'Your image is being uploaded...',
                duration: 3000,
                position: 'bottom'
            });
            toast.present();
            fileTransfer.upload(image, encodeURI(__WEBPACK_IMPORTED_MODULE_11__app_app_settings__["a" /* AppSettings */].apiUrl), options).then(function (data) {
                var response = JSON.parse(data.response);
                if (response.success === true) {
                    _this.profile.dp = response.data;
                    _this.account.dp = __WEBPACK_IMPORTED_MODULE_11__app_app_settings__["a" /* AppSettings */].apiUrl.replace("index.php", "") + _this.profile.dp;
                }
                else {
                    var alert_1 = _this.alertCtrl.create({
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
                    alert_1.present();
                }
            }, function (err) {
                var alert = _this.alertCtrl.create({
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
            });
        }, function (err) {
            //console.log(err)
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_7_ion_datepicker__["a" /* DatePickerDirective */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_7_ion_datepicker__["a" /* DatePickerDirective */])
    ], ProfilePage.prototype, "datepicker", void 0);
    ProfilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-profile',template:/*ion-inline-start:"D:\Taylor\Documents\Websites\intensity2\src\pages\profile\profile.html"*/`<ion-header class="profile-nav">\n    <ion-navbar color="primary">\n        <button ion-button menuToggle>\n            <ion-icon name="menu"></ion-icon>\n        </button>\n        <ion-title>Profile</ion-title>\n\n        <ion-buttons end>\n            <button ion-button icon-only (click)="openEditProfile()">\n                <ion-icon name="create" ></ion-icon>\n            </button>\n        </ion-buttons>    \n        \n    \n    \n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n    \n    <div class="profile-header">\n        \n        <div class="profile-dp" (click)="changeAvatar()">\n            <img [src]="account.dp"/>\n        </div>\n        \n\n        <h2>{{account.username}}</h2>\n        <p>{{profile.display}}</p>\n\n\n        <ion-segment [(ngModel)]="properties.activeTab" color="light">\n            <ion-segment-button value="profile">\n                Profile\n            </ion-segment-button>\n            <ion-segment-button value="activity">\n                Activity\n            </ion-segment-button>\n       </ion-segment>     \n\n\n    </div>\n\n\n    <div *ngIf="properties.activeTab === \'profile\'">\n        <ion-list class="profile-content">\n            <ion-item>\n                <ion-icon name="person" item-start></ion-icon>\n                <h2>Display Name</h2>\n                <p>{{profile.display}}</p>\n            </ion-item>\n            <ion-item>\n                <ion-icon name="mail" item-start></ion-icon>\n                <h2>Email</h2>\n                <p>{{profile.email}}</p>\n            </ion-item> \n            <ion-item>\n                <ion-icon name="heart" item-start></ion-icon>\n                <h2>Age</h2>\n                <p>{{profile.age}}</p>\n            </ion-item> \n            <ion-item>\n                <ion-icon name="body" item-start></ion-icon>\n                <h2>Gender</h2>\n                <p>{{profile.gender}}</p>\n            </ion-item> \n            <ion-item >\n                <ion-icon name="help" item-start></ion-icon>\n                <h2>About Me</h2>\n                <p class="extended">{{profile.about}}</p>\n            </ion-item> \n            <ion-item>\n                <ion-icon name="locate" item-start></ion-icon>\n                <h2>Purpose</h2>\n                <p class="extended">{{profile.why}}</p>\n            </ion-item>\n            <ion-item>\n                <ion-icon name="trending-up" item-start></ion-icon>\n                <h2>Goals</h2>\n                <p class="extended">{{profile.goals}}</p>\n            </ion-item>              \n        </ion-list>    \n        \n    </div>\n    \n    \n    <div *ngIf="properties.activeTab === \'activity\'">\n        <ion-list class=\'activity\'>\n            <ion-item *ngFor="let activity of activity.activity;" (click)="viewDetails(activity)">\n                <h2>{{formatDate(activity.assigneddate)}}</h2>\n                <p>You tracked {{activity.name}}</p>             \n                <ion-icon tappable name="copy" item-end ion-datepicker (ionChanged)="copyToDate($event, activity)" [okText]="\'Copy To Date\'"></ion-icon>\n            </ion-item>  \n            \n        </ion-list>\n    \n        <ion-infinite-scroll (ionInfinite)="getMoreActivity($event)">\n            <ion-infinite-scroll-content></ion-infinite-scroll-content>\n        </ion-infinite-scroll>         \n    </div>\n\n\n \n</ion-content>\n`/*ion-inline-end:"D:\Taylor\Documents\Websites\intensity2\src\pages\profile\profile.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_4__providers_account_account__["a" /* AccountProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_5__providers_diary_diary__["a" /* DiaryProvider */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_9__ionic_native_file_transfer__["a" /* FileTransfer */], __WEBPACK_IMPORTED_MODULE_10__ionic_native_file__["a" /* File */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ToastController */]])
    ], ProfilePage);
    return ProfilePage;
}());

//# sourceMappingURL=profile.js.map

/***/ }),

/***/ 376:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditProfileModal; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var EditProfileModal = (function () {
    function EditProfileModal(platform, params, viewCtrl, toastCtrl, storage, alertCtrl) {
        this.platform = platform;
        this.params = params;
        this.viewCtrl = viewCtrl;
        this.toastCtrl = toastCtrl;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.profile = {};
        Object.assign(this.profile, this.params.data.profile);
    }
    EditProfileModal.prototype.saveProfile = function () {
        this.viewCtrl.dismiss(this.profile);
    };
    EditProfileModal.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    EditProfileModal = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'edit-profile',template:/*ion-inline-start:"D:\Taylor\Documents\Websites\intensity2\src\modals\edit-profile\edit-profile.html"*/`<ion-header>\n    <ion-toolbar color="primary">\n        <ion-title>\n            Edit Profile\n        </ion-title>\n        <ion-buttons start>\n            \n            <button icon-start ion-button (click)="saveProfile()" showWhen="android, windows">\n                <ion-icon name="md-checkmark"></ion-icon>\n                Save\n            </button>  \n\n            \n            <button ion-button (click)="dismiss()">\n                <span ion-text showWhen="ios">Cancel</span>\n                <ion-icon name="md-close" showWhen="android, windows"></ion-icon>\n            </button>\n        </ion-buttons>\n        \n        \n        <ion-buttons showWhen="ios" end>\n            <button ion-button (click)="saveProfile()">\n                <span ion-text>Save</span>\n            </button>            \n        </ion-buttons>        \n        \n    </ion-toolbar>\n</ion-header>\n\n\n\n<ion-content>\n    \n<ion-list class="edit-profile">\n\n    <ion-item>\n        <ion-label floating>Display Name</ion-label>\n        <ion-input type="text" [(ngModel)]="profile.display"></ion-input>\n    </ion-item>\n\n    <ion-item>\n        <ion-label floating>Email</ion-label>\n        <ion-input type="email" [(ngModel)]="profile.email"></ion-input>\n    </ion-item>\n    \n    \n    <ion-item>\n        <ion-label floating>Age</ion-label>\n        <ion-input type="number" [(ngModel)]="profile.age"></ion-input>\n    </ion-item>    \n\n    \n    <ion-item>\n        <ion-label>Gender</ion-label>\n        <ion-select [(ngModel)]="profile.gender">\n          <ion-option value="Male">Male</ion-option>\n          <ion-option value="Female">Female</ion-option>\n          <ion-option value="Other">Other</ion-option>\n          <ion-option value="Alien">Alien</ion-option>\n        </ion-select>\n    </ion-item>    \n    \n\n    <ion-item>\n        <ion-label floating>About Me</ion-label>\n        <ion-textarea [(ngModel)]="profile.about" autosize></ion-textarea>\n    </ion-item>\n\n    <ion-item>\n        <ion-label floating>Purpose</ion-label>\n        <ion-textarea [(ngModel)]="profile.why" autosize></ion-textarea>\n    </ion-item>\n\n    <ion-item>\n        <ion-label floating>Goals</ion-label>\n        <ion-textarea [(ngModel)]="profile.goals" autosize></ion-textarea>\n    </ion-item>\n\n    \n</ion-list>\n    \n</ion-content>`/*ion-inline-end:"D:\Taylor\Documents\Websites\intensity2\src\modals\edit-profile\edit-profile.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ToastController */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], EditProfileModal);
    return EditProfileModal;
}());

//# sourceMappingURL=edit-profile.js.map

/***/ }),

/***/ 377:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProgramsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_account_account__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_program_program__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_program_program__ = __webpack_require__(378);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__modals_create_program_create_program__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__modals_edit_program_edit_program__ = __webpack_require__(381);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var ProgramsPage = (function () {
    function ProgramsPage(navCtrl, modalCtrl, storage, accountProvider, programProvider, events, alertCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.storage = storage;
        this.accountProvider = accountProvider;
        this.programProvider = programProvider;
        this.events = events;
        this.alertCtrl = alertCtrl;
        this.properties = { activeTab: "popular", search: "" };
        this.loading = { all: false, recent: false, created: false };
        this.storage.get("account").then(function (data) {
            _this.account = data;
            _this.getCreatedPrograms();
        });
        this.getPrograms();
        this.getRecentPrograms();
        this.events.subscribe('programs:modified', function () {
            _this.getCreatedPrograms();
            _this.getRecentPrograms();
            _this.getPrograms();
        });
        this.events.subscribe("premium:purchased", function () {
            _this.account.premium = true;
        });
    }
    ProgramsPage.prototype.getPrograms = function () {
        var _this = this;
        this.loading.all = true;
        this.programProvider.getPrograms().then(function (data) {
            _this.loading.all = false;
            _this.programs = data;
        });
    };
    ProgramsPage.prototype.getCreatedPrograms = function () {
        var _this = this;
        this.loading.created = true;
        this.programProvider.getCreatedPrograms(this.account.id).then(function (data) {
            _this.loading.created = false;
            _this.createdPrograms = data;
        });
    };
    ProgramsPage.prototype.getRecentPrograms = function () {
        var _this = this;
        this.loading.recent = true;
        this.programProvider.getRecentPrograms().then(function (data) {
            _this.loading.recent = false;
            _this.recentPrograms = data;
        });
    };
    ProgramsPage.prototype.checkOwnership = function (userid) {
        return this.account.id === userid;
    };
    ProgramsPage.prototype.searchStarted = function () {
        this.properties.activeTab = "all";
        document.getElementById("program-segments").scrollLeft += document.getElementById("program-segments").offsetWidth;
    };
    ProgramsPage.prototype.openProgram = function (program) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__pages_program_program__["a" /* ProgramPage */], { program: program });
    };
    ProgramsPage.prototype.openCreateProgram = function () {
        /*
        if (!this.account.premium){
            this.navCtrl.push(PremiumPage);
            return;
        }
        */
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__modals_create_program_create_program__["a" /* CreateProgramModal */]);
        modal.onDidDismiss(function (program) {
            if (program) {
                _this.storage.set("previousProgram", program);
                _this.programProvider.createProgram(program).then(function () {
                    _this.getCreatedPrograms();
                    var alert = _this.alertCtrl.create({
                        title: "Program created",
                        subTitle: "Your program has been added to the database.",
                        buttons: [
                            {
                                text: 'Dismiss',
                                role: 'cancel'
                            }
                        ]
                    });
                    alert.present();
                }).catch(function () {
                    var alert = _this.alertCtrl.create({
                        title: "Error",
                        subTitle: "There was an error creating your program.",
                        message: "Your program has been saved in temporary storage so you can try again later.",
                        buttons: [
                            {
                                text: 'Dismiss',
                                role: 'cancel'
                            }
                        ]
                    });
                    alert.present();
                });
            }
        });
        modal.present();
    };
    ProgramsPage.prototype.openEditProgram = function (ev, program) {
        var _this = this;
        ev.stopPropagation();
        ev.preventDefault();
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_7__modals_edit_program_edit_program__["a" /* EditProgramModal */], { program: program });
        modal.onDidDismiss(function (data) {
            if (data) {
                _this.programProvider.updateProgram(data).then(function () {
                    _this.events.publish('programs:modified');
                    var alert = _this.alertCtrl.create({
                        title: "Program update",
                        subTitle: "Your program has been successfully modified.",
                        buttons: [
                            {
                                text: 'Dismiss',
                                role: 'cancel'
                            }
                        ]
                    });
                    alert.present();
                }).catch(function () {
                    var alert = _this.alertCtrl.create({
                        title: "Error",
                        subTitle: "There was an error updating your program.",
                        buttons: [
                            {
                                text: 'Dismiss',
                                role: 'cancel'
                            }
                        ]
                    });
                    alert.present();
                });
            }
        });
        modal.present();
    };
    ProgramsPage.prototype.openDeleteProgram = function (ev, program, index) {
        var _this = this;
        ev.stopPropagation();
        ev.preventDefault();
        var alert = this.alertCtrl.create({
            title: "Confirm",
            subTitle: "Are you sure you want to remove this program?",
            buttons: [
                {
                    text: 'Dismiss',
                    role: 'cancel'
                },
                {
                    text: 'Yes',
                    handler: function () {
                        _this.programProvider.deleteProgram(program.id).then(function () {
                            _this.events.publish('programs:modified');
                        });
                    }
                }
            ]
        });
        alert.present();
    };
    ProgramsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-programs',template:/*ion-inline-start:"D:\Taylor\Documents\Websites\intensity2\src\pages\programs\programs.html"*/`<ion-header>\n    <ion-navbar color="primary">\n        <button ion-button menuToggle>\n            <ion-icon name="menu"></ion-icon>\n        </button>\n        <ion-title>Programs</ion-title>\n\n       <ion-buttons end>\n            <button ion-button icon-only tools tappable>\n                <ion-icon name="more" ></ion-icon>\n            </button>\n        </ion-buttons>   \n        \n      \n    \n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n    \n    <ion-searchbar\n        [(ngModel)]="properties.search"\n        [showCancelButton]="shouldShowCancel"\n        (ionInput)="searchStarted()"\n        placeholder="Search Programs"\n        class="flat-search">\n    </ion-searchbar> \n\n    <div class="extended-segments" id="program-segments" >\n    <ion-segment color="primary" [(ngModel)]="properties.activeTab">\n        <ion-segment-button value="popular">\n            Popular\n        </ion-segment-button>\n      <ion-segment-button value="powerlifting">\n            Powerlifting\n      </ion-segment-button>\n      <ion-segment-button value="bodybuilding">\n            Bodybuilding\n      </ion-segment-button>            \n        \n        <ion-segment-button value="created">\n            My Programs\n        </ion-segment-button>\n      <ion-segment-button value="recent">\n            Recent Adds\n      </ion-segment-button>         \n      <ion-segment-button value="all">\n            All Programs\n      </ion-segment-button>     \n    </ion-segment>\n    </div>\n\n    <div class="card-background-page" *ngIf="properties.activeTab === \'popular\'">\n    \n        <ion-card (click)="openProgram({name:\'5/3/1\', id:12})">\n            <img src="http://api.intensityapp.com/uploads/531.jpg" onerror="this.style.display=\'none\'"/>\n            <div class="card-title">5/3/1</div>\n            <div class="card-subtitle">4 Weeks</div>\n        </ion-card>    \n        \n        <ion-card (click)="openProgram({name:\'The Juggernaut Method\', id:235})">\n            <img src="http://api.intensityapp.com/uploads/juggernaut.jpg" onerror="this.style.display=\'none\'"/>\n            <div class="card-title">The Juggernaut Method</div>\n            <div class="card-subtitle">16 Weeks</div>\n        </ion-card>          \n        \n\n        <ion-card (click)="openProgram({name:\'Starting Strength\', id:10})">\n            <img src="http://api.intensityapp.com/uploads/startingstrength.jpg" onerror="this.style.display=\'none\'"/>\n            <div class="card-title">Starting Strength</div>\n            <div class="card-subtitle">Alternating Workouts</div>\n        </ion-card>  \n\n\n        <ion-card (click)="openProgram({name:\'StrongLifts 5x5\', id:50})">\n            <img src="http://api.intensityapp.com/uploads/stronglifts.jpg" onerror="this.style.display=\'none\'"/>\n            <div class="card-title">StrongLifts 5x5</div>\n            <div class="card-subtitle">Alternating Workouts</div>\n        </ion-card>  \n\n\n        <ion-card (click)="openProgram({name:\'Smolov\', id:13})">\n            <img src="http://api.intensityapp.com/uploads/smolov.jpg" onerror="this.style.display=\'none\'"/>\n            <div class="card-title">Smolov</div>\n            <div class="card-subtitle">13 Weeks</div>\n        </ion-card>          \n        \n        \n    </div>\n    \n\n\n    <div class="card-background-page" *ngIf="properties.activeTab === \'powerlifting\'">\n    \n        <ion-card (click)="openProgram({name:\'Sheiko #29\', id:220})">\n            <img src="http://api.intensityapp.com/uploads/sheiko.jpg" onerror="this.style.display=\'none\'"/>\n            <div class="card-title">Sheiko</div>\n            <div class="card-subtitle">4 Weeks</div>\n        </ion-card>    \n        \n        <ion-card (click)="openProgram({name:\'Smolov Jr Bench\', id:54})">\n            <img src="http://api.intensityapp.com/uploads/smolovbench.jpg"/>\n            <div class="card-title">Smolov Jr Bench</div>\n            <div class="card-subtitle">3 Weeks</div>\n        </ion-card>          \n        \n\n        <ion-card (click)="openProgram({name:\'PowerliftingToWin Intermediate Program 1\', id:212})">\n            <img src="http://api.intensityapp.com/uploads/ptw.jpg"/>\n            <div class="card-title">PowerliftingToWin</div>\n            <div class="card-subtitle">Alternating Workouts</div>\n        </ion-card>  \n\n\n        <ion-card (click)="openProgram({name:\'The Cube Method\', id:217})">\n            <img src="http://api.intensityapp.com/uploads/cube.jpg" onerror="this.style.display=\'none\'"/>\n            <div class="card-title">The Cube Method</div>\n            <div class="card-subtitle">10 Weeks</div>\n        </ion-card>  \n\n\n        <ion-card (click)="openProgram({name:\'Candito 6 Week Strength Program\', id:208})">\n            <img src="http://api.intensityapp.com/uploads/candito.jpg" onerror="this.style.display=\'none\'"/>\n            <div class="card-title">Candito Strength Program</div>\n            <div class="card-subtitle">6 Weeks</div>\n        </ion-card>          \n        \n        <ion-card (click)="openProgram({name:\'5/3/1\', id:12})">\n            <img src="http://api.intensityapp.com/uploads/531.jpg" onerror="this.style.display=\'none\'"/>\n            <div class="card-title">5/3/1</div>\n            <div class="card-subtitle">4 Weeks</div>\n        </ion-card>    \n         \n        \n        <ion-card (click)="openProgram({name:\'Smolov\', id:13})">\n            <img src="http://api.intensityapp.com/uploads/smolov.jpg" onerror="this.style.display=\'none\'"/>\n            <div class="card-title">Smolov</div>\n            <div class="card-subtitle">13 Weeks</div>\n        </ion-card>    \n\n        <ion-card (click)="openProgram({name:\'The Conjugate Method by Westside Barbell\', id:222})">\n            <img src="http://api.intensityapp.com/uploads/conjugate.jpg" onerror="this.style.display=\'none\'"/>\n            <div class="card-title">The Conjugate Method</div>\n            <div class="card-subtitle">3 Weeks</div>\n        </ion-card>    \n\n        <ion-card (click)="openProgram({name:\'Coan Philippi Deadlift Routine\', id:219})">\n            <img src="http://api.intensityapp.com/uploads/coan.jpg" onerror="this.style.display=\'none\'"/>\n            <div class="card-title">Deadlift Routine</div>\n            <div class="card-subtitle">10 Weeks</div>\n        </ion-card>            \n\n        <ion-card (click)="openProgram({name:\'Smolov Jr\', id:53})">\n            <img src="http://api.intensityapp.com/uploads/smolovjr.jpg" onerror="this.style.display=\'none\'"/>\n            <div class="card-title">Smolov Jr</div>\n            <div class="card-subtitle">3 Weeks</div>\n        </ion-card>     \n        \n        <ion-card (click)="openProgram({name:\'The Juggernaut Method\', id:235})">\n            <img src="http://api.intensityapp.com/uploads/juggernaut.jpg" onerror="this.style.display=\'none\'"/>\n            <div class="card-title">The Juggernaut Method</div>\n            <div class="card-subtitle">16 Weeks</div>\n        </ion-card> \n\n        \n    </div>\n    \n    \n    <div class="card-background-page" *ngIf="properties.activeTab === \'bodybuilding\'">\n    \n        <ion-card (click)="openProgram({name:\'Layne Norton PHAT\', id:216})">\n            <img src="http://api.intensityapp.com/uploads/layne.jpg" onerror="this.style.display=\'none\'"/>\n            <div class="card-title">Layne Norton PHAT</div>\n            <div class="card-subtitle">Weekly Bodypart Split</div>\n        </ion-card>    \n        \n        <ion-card (click)="openProgram({name:\'Gorillafinger 5 Day Split\', id:171})">\n            <img src="http://api.intensityapp.com/uploads/gorilla.jpg" onerror="this.style.display=\'none\'"/>\n            <div class="card-title">Gorillafinger 5 Day Split</div>\n            <div class="card-subtitle">Weekly Bodypart Split</div>\n        </ion-card>    \n        \n        <ion-card (click)="openProgram({name:\'Power Hypertrophy UL\', id:114})">\n            <img src="http://api.intensityapp.com/uploads/upperlower.jpg" onerror="this.style.display=\'none\'"/>\n            <div class="card-title">Power Hypertrophy</div>\n            <div class="card-subtitle">Weekly Upper/Lower Split</div>\n        </ion-card>        \n        \n        <ion-card (click)="openProgram({name:\'German Volume Training\', id:64})">\n            <img src="http://api.intensityapp.com/uploads/german.jpg" onerror="this.style.display=\'none\'"/>\n            <div class="card-title">German Volume Training</div>\n            <div class="card-subtitle">Weekly Fullbody Split</div>\n        </ion-card>      \n        \n        <ion-card (click)="openProgram({name:\'StrongLifts 5x5\', id:50})">\n            <img src="http://api.intensityapp.com/uploads/stronglifts.jpg" onerror="this.style.display=\'none\'"/>\n            <div class="card-title">StrongLifts 5x5</div>\n            <div class="card-subtitle">Alternating Workouts</div>\n        </ion-card>         \n        \n        \n    </div>  \n    \n    <ion-list class="add-diary-list" *ngIf="properties.activeTab === \'created\'">\n        <button ion-item detail-none *ngFor="let program of createdPrograms; let i = index" (click)="openProgram(program)">\n            {{program.name}}\n            <ion-icon name=\'create\' item-end *ngIf="checkOwnership(program.userid)" (click)="openEditProgram($event, program)"></ion-icon>\n            <ion-icon name=\'trash\' item-end *ngIf="checkOwnership(program.userid)" (click)="openDeleteProgram($event, program, i)"></ion-icon>\n        </button> \n    </ion-list>     \n    \n    <ion-list class="add-diary-list" *ngIf="properties.activeTab === \'recent\'">\n        <button ion-item detail-none *ngFor="let program of recentPrograms; let i = index" (click)="openProgram(program)">\n            {{program.name}}\n            <ion-icon name=\'create\' item-end *ngIf="checkOwnership(program.userid)" (click)="openEditProgram($event, program)"></ion-icon>\n            <ion-icon name=\'trash\' item-end *ngIf="checkOwnership(program.userid)" (click)="openDeleteProgram($event, program, i)"></ion-icon>\n        </button> \n    </ion-list>    \n    \n    \n    <ion-list class="add-diary-list" *ngIf="properties.activeTab === \'all\'">\n        <button ion-item detail-none *ngFor="let program of programs | programSearch:properties.search; let i = index" (click)="openProgram(program)">\n            {{program.name}}\n            <ion-icon name=\'create\' item-end *ngIf="checkOwnership(program.userid)" (click)="openEditProgram($event, program)"></ion-icon>\n            <ion-icon name=\'trash\' item-end *ngIf="checkOwnership(program.userid)" (click)="openDeleteProgram($event, program, i)"></ion-icon>\n        </button> \n    </ion-list>     \n    \n\n    \n    <ion-fab bottom right>\n        <button ion-fab color="primary" (click)="openCreateProgram()">\n            <ion-icon name="add"></ion-icon>\n        </button>\n    </ion-fab>    \n \n</ion-content>\n`/*ion-inline-end:"D:\Taylor\Documents\Websites\intensity2\src\pages\programs\programs.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_3__providers_account_account__["a" /* AccountProvider */], __WEBPACK_IMPORTED_MODULE_4__providers_program_program__["a" /* ProgramProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], ProgramsPage);
    return ProgramsPage;
}());

//# sourceMappingURL=programs.js.map

/***/ }),

/***/ 378:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProgramPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_account_account__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_program_program__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__program_popover_program_popover__ = __webpack_require__(379);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__modals_add_program_add_program__ = __webpack_require__(380);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__modals_create_program_create_program__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_diary_diary__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var ProgramPage = (function () {
    function ProgramPage(navCtrl, params, modalCtrl, storage, accountProvider, events, alertCtrl, programProvider, popoverCtrl, diaryProvider) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.params = params;
        this.modalCtrl = modalCtrl;
        this.storage = storage;
        this.accountProvider = accountProvider;
        this.events = events;
        this.alertCtrl = alertCtrl;
        this.programProvider = programProvider;
        this.popoverCtrl = popoverCtrl;
        this.diaryProvider = diaryProvider;
        this.properties = { activeTab: "Week 1", loading: true };
        this.program = this.params.data.program;
        this.tabs = ["Week 1"];
        this.account = {};
        this.storage.get("account").then(function (data) {
            _this.account = data;
        });
        this.programProvider.getProgram(this.program.id).then(function (data) {
            _this.properties.loading = false;
            _this.program = data;
            _this.program.workouts.sort(function (a, b) {
                return a.day - b.day;
            });
            _this.calculateTabs();
        })
            .catch(function () {
            _this.properties.loading = false;
        });
        this.events.subscribe("premium:purchased", function () {
            _this.account.premium = true;
        });
    }
    ProgramPage.prototype.calculateTabs = function () {
        var tabsCount = Math.ceil(parseInt(this.program.duration) / 7);
        if (tabsCount > 1) {
            this.tabs = [];
            for (var x = 1; x <= tabsCount; x++) {
                this.tabs.push("Week " + x);
            }
        }
    };
    ProgramPage.prototype.isInTab = function (workout) {
        var index = (this.tabs.indexOf(this.properties.activeTab)) + 1;
        var tab = Math.ceil(parseInt(workout.day) / 7);
        return index === tab;
    };
    ProgramPage.prototype.openExercise = function (exercise, workout) {
        var message = "";
        var reps = exercise.reps ? "Reps: " + exercise.reps + "<br>" : "";
        var sets = exercise.sets ? "Sets: " + exercise.sets + "<br>" : "";
        var weight = exercise.weight && exercise.weight > 0 ? "Weight: " + exercise.weight + "<br>" : "";
        var percentage = exercise.percentage && exercise.percentage > 0 ? "Percentage: " + exercise.percentage + "<br>" : "";
        var rpe = exercise.rpe && exercise.rpe > 0 ? "RPE: " + exercise.rpe + "<br>" : "";
        var notes = exercise.notes ? "Notes: " + exercise.notes : "";
        message = reps + sets + weight + percentage + rpe + notes;
        message = message.replace(/^\s*<br\s*\/?>|<br\s*\/?>\s*$/g, '');
        var alert = this.alertCtrl.create({
            title: exercise.name,
            subTitle: workout.name,
            message: message,
            buttons: [
                {
                    text: 'Dismiss',
                    role: 'cancel'
                }
            ]
        });
        alert.present();
    };
    ProgramPage.prototype.openProgramPopover = function (ev) {
        var popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_5__program_popover_program_popover__["a" /* ProgramPopover */], { program: this.program }, { cssClass: "tools-popover" });
        popover.present({
            ev: ev
        });
    };
    ProgramPage.prototype.openWorkoutPopover = function (ev, workout) {
        var popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_5__program_popover_program_popover__["b" /* ProgramWorkoutPopover */], { workout: workout }, { cssClass: "tools-popover" });
        popover.present({
            ev: ev
        });
    };
    ProgramPage.prototype.openAddProgram = function () {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__modals_add_program_add_program__["a" /* AddProgramModal */], { program: this.program });
        modal.onDidDismiss(function (data) {
            if (data) {
                var maxes = data.maxes;
                var details_1 = data.options;
                _this.diaryProvider.updateMaxes(maxes).then(function () {
                    _this.programProvider.addProgram(details_1).then(function () {
                        var alert = _this.alertCtrl.create({
                            title: "Program added",
                            subTitle: _this.program.name + " has been added to your diary",
                            buttons: [
                                {
                                    text: 'Dismiss',
                                    role: 'cancel'
                                },
                                {
                                    text: 'Go To Diary',
                                    handler: function (data) {
                                    },
                                }
                            ]
                        });
                        alert.present();
                    });
                });
            }
        });
        modal.present();
    };
    ProgramPage.prototype.customizeProgram = function () {
        /*
        if (!this.account.premium){
            this.navCtrl.push(PremiumPage);
            return;
        }
        */
        var _this = this;
        var name = this.account.display ? this.account.display : this.account.username;
        var customizedProgram = this.deepCopy(this.program);
        customizedProgram.name = name + "'s " + this.program.name;
        customizedProgram.public = false;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_7__modals_create_program_create_program__["a" /* CreateProgramModal */], { program: customizedProgram });
        modal.onDidDismiss(function (program) {
            if (program) {
                var alert_1 = _this.alertCtrl.create({
                    title: "Program created",
                    subTitle: "Your customized version of " + _this.program.name + " program has been added to the database.",
                    buttons: [
                        {
                            text: 'Dismiss',
                            role: 'cancel'
                        }
                    ]
                });
                alert_1.present();
                _this.storage.set("previousProgram", program);
                _this.programProvider.createProgram(program).then(function () {
                    _this.events.publish('programs:modified');
                });
                _this.navCtrl.pop();
            }
        });
        modal.present();
    };
    ProgramPage.prototype.deepCopy = function (oldObj) {
        var newObj = oldObj;
        if (oldObj && typeof oldObj === "object") {
            newObj = Object.prototype.toString.call(oldObj) === "[object Array]" ? [] : {};
            for (var i in oldObj) {
                newObj[i] = this.deepCopy(oldObj[i]);
            }
        }
        return newObj;
    };
    ProgramPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-program',template:/*ion-inline-start:"D:\Taylor\Documents\Websites\intensity2\src\pages\program\program.html"*/`<ion-header>\n    <ion-navbar color="primary">\n        <button ion-button menuToggle>\n            <ion-icon name="menu"></ion-icon>\n        </button>\n        <ion-title>{{program.name}}</ion-title>\n\n        <ion-buttons end>\n            <button ion-button icon-only (click)="openProgramPopover($event)">\n                <ion-icon name="more" ></ion-icon>\n            </button>\n        </ion-buttons>   \n        \n      \n    \n    </ion-navbar>\n</ion-header>\n\n<ion-content class=\'program-content\'>\n    \n    <div *ngIf="properties.loading" class="diary-loading">\n        <ion-spinner></ion-spinner>\n    </div>\n    \n    <div *ngIf="!properties.loading">\n        <div class="workout-description" *ngIf="program.description" (click)="viewFull = !viewFull" [ngClass]="{\'show-all\': viewFull}">\n            {{program.description}}\n        </div>\n\n        <div class="workout-tabs"  *ngIf="tabs.length > 1">\n            <button ion-button small (click)="properties.activeTab = tab" [outline]="properties.activeTab !== tab" *ngFor="let tab of tabs">{{tab}}</button>\n\n        </div>\n\n        <div class="program-workouts">\n\n            <div *ngFor="let workout of program.workouts" class="workout-list">\n                <ion-list *ngIf="isInTab(workout)" >\n                    <ion-list-header>\n                        {{workout.name}}\n                        <ion-icon name="more" item-end (click)="openWorkoutPopover($event, workout)"></ion-icon>\n                    </ion-list-header>\n                    <ion-item *ngFor="let exercise of workout.exercises" (click)="openExercise(exercise,workout)">\n                        <h2>{{exercise.name}}</h2>\n                        <p>{{exercise.sets}} set<span *ngIf="exercise.sets !== \'1\'">s</span> of {{exercise.reps}} rep<span *ngIf="exercise.reps !== \'1\'">s</span><span *ngIf="exercise.percentage && exercise.percentage > 0">, {{exercise.percentage}}%</span><span *ngIf="exercise.rpe && exercise.rpe > 0">, @{{exercise.rpe}}RPE</span></p>\n                        <ion-icon ios="ios-arrow-forward" md="ios-arrow-forward" item-end ></ion-icon>\n                    </ion-item>\n                </ion-list>\n            </div>\n\n        </div>\n    \n    </div>\n</ion-content>\n\n\n<ion-footer class="program-footer">\n    <button ion-button (click)="openAddProgram()">Add To Diary</button>\n    <button ion-button color="light" (click)="customizeProgram()">Cutsomize Program</button>\n</ion-footer>`/*ion-inline-end:"D:\Taylor\Documents\Websites\intensity2\src\pages\program\program.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_3__providers_account_account__["a" /* AccountProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_4__providers_program_program__["a" /* ProgramProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* PopoverController */], __WEBPACK_IMPORTED_MODULE_8__providers_diary_diary__["a" /* DiaryProvider */]])
    ], ProgramPage);
    return ProgramPage;
}());

//# sourceMappingURL=program.js.map

/***/ }),

/***/ 379:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProgramPopover; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ProgramWorkoutPopover; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_social_sharing__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_program_program__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ProgramPopover = (function () {
    function ProgramPopover(viewCtrl, modalCtrl, alertCtrl, socialSharing, params) {
        this.viewCtrl = viewCtrl;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.socialSharing = socialSharing;
        this.params = params;
        this.program = this.params.data.program;
        if (!this.program.workouts) {
            this.program.workouts = [];
        }
    }
    ProgramPopover.prototype.close = function () {
        this.viewCtrl.dismiss();
    };
    ProgramPopover.prototype.openProgramDetails = function () {
        var alert = this.alertCtrl.create({
            title: this.program.name,
            subTitle: "Created by " + (this.program.display ? this.program.display : this.program.username),
            message: "This program has <strong>" + this.program.workouts.length + " workouts</strong> and lasts a total of <strong>" + this.program.duration + " days</strong>. It has been added <strong>" + this.program.added + " times</strong> by other users.",
            buttons: [
                {
                    text: 'Dismiss',
                    role: 'cancel'
                }
            ]
        });
        alert.present();
        this.close();
    };
    ProgramPopover.prototype.shareProgram = function () {
        this.socialSharing
            .share("Check " + this.program.name + " on Intensity", "Workout Program", null, "http://programs.intensityapp.com/#/programs/" + this.program.id);
        this.close();
    };
    ProgramPopover = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            template: "\n    <ion-list>\n      <button ion-item (click)=\"openProgramDetails()\">View Details</button>\n      <button ion-item (click)=\"shareProgram()\">Share Program</button>\n    </ion-list>\n  "
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_social_sharing__["a" /* SocialSharing */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */]])
    ], ProgramPopover);
    return ProgramPopover;
}());

var ProgramWorkoutPopover = (function () {
    function ProgramWorkoutPopover(viewCtrl, modalCtrl, alertCtrl, socialSharing, params, programProvider) {
        this.viewCtrl = viewCtrl;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.socialSharing = socialSharing;
        this.params = params;
        this.programProvider = programProvider;
        this.workout = this.params.data.workout;
    }
    ProgramWorkoutPopover.prototype.close = function () {
        this.viewCtrl.dismiss();
    };
    ProgramWorkoutPopover.prototype.openWorkoutDetails = function () {
        var alert = this.alertCtrl.create({
            title: "Day " + this.workout.day,
            subTitle: this.workout.name,
            message: "Contains " + this.workout.exercises.length + " exercises.",
            buttons: [
                {
                    text: 'Dismiss',
                    role: 'cancel'
                }
            ]
        });
        alert.present();
        this.close();
    };
    ProgramWorkoutPopover.prototype.addWorkout = function (date) {
        var _this = this;
        var startDate = __WEBPACK_IMPORTED_MODULE_4_moment__(date).format('YYYY-MM-DD');
        this.programProvider.addWorkout(this.workout.workoutid, startDate).then(function () {
            var alert = _this.alertCtrl.create({
                title: "Workout added",
                subTitle: _this.workout.name + " has been added to your diary",
                buttons: [
                    {
                        text: 'Dismiss',
                        role: 'cancel'
                    },
                    {
                        text: 'Go To Diary',
                        handler: function (data) {
                        },
                    }
                ]
            });
            alert.present();
        });
        this.close();
    };
    ProgramWorkoutPopover = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            template: "\n    <ion-list>\n      <button ion-item (click)=\"openWorkoutDetails()\">View Details</button>\n      <button ion-item ion-datepicker (ionChanged)=\"addWorkout($event)\" [okText]=\"'Add To Diary'\">Add Workout</button>\n    </ion-list>\n  "
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_social_sharing__["a" /* SocialSharing */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_program_program__["a" /* ProgramProvider */]])
    ], ProgramWorkoutPopover);
    return ProgramWorkoutPopover;
}());

//# sourceMappingURL=program-popover.js.map

/***/ }),

/***/ 380:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddProgramModal; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_diary_diary__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AddProgramModal = (function () {
    function AddProgramModal(platform, params, viewCtrl, toastCtrl, diaryProvider, storage, alertCtrl) {
        var _this = this;
        this.platform = platform;
        this.params = params;
        this.viewCtrl = viewCtrl;
        this.toastCtrl = toastCtrl;
        this.diaryProvider = diaryProvider;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.storage.get("account").then(function (data) {
            _this.account = data;
        });
        this.calculator = { reps: "", weight: "" };
        this.program = params.data.program;
        this.startDate = new Date();
        this.options = { progressiontype: "", progressionamount: "", progressiontimeframe: "", progressioncycles: "", progressionexercises: {} };
        this.getMaxes();
    }
    AddProgramModal.prototype.getMaxes = function () {
        var _this = this;
        this.maxes = {};
        this.exercises = [];
        this.maxCount = 0;
        for (var _i = 0, _a = this.program.workouts; _i < _a.length; _i++) {
            var workout = _a[_i];
            for (var _b = 0, _c = workout.exercises; _b < _c.length; _b++) {
                var exercise = _c[_b];
                if (!this.maxes[exercise.exerciseid]) {
                    this.maxes[exercise.exerciseid] = exercise;
                    this.maxes[exercise.exerciseid]["max"] = "";
                    this.exercises.push(exercise.exerciseid);
                }
                if (!this.options.progressionexercises[exercise.exerciseid]) {
                    this.options.progressionexercises[exercise.exerciseid] = "";
                }
            }
        }
        this.diaryProvider.getMaxes(this.exercises).then(function (data) {
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var exercise = data_1[_i];
                if (exercise["onerm"] && exercise["onerm"] > 0) {
                    _this.maxes[exercise.exerciseid]["max"] = exercise["onerm"];
                    _this.maxCount = _this.maxCount + 1;
                }
            }
        });
    };
    AddProgramModal.prototype.calculateMaxes = function () {
        this.maxCount = 0;
        for (var index in this.maxes) {
            var exercise = this.maxes[index];
            if (exercise["max"] && exercise["max"] > 0) {
                this.maxCount = this.maxCount + 1;
            }
        }
    };
    AddProgramModal.prototype.selectDate = function (date) {
        this.startDate = date;
    };
    AddProgramModal.prototype.formatDate = function (date) {
        return __WEBPACK_IMPORTED_MODULE_4_moment__(date).format('MMMM Do YYYY');
    };
    AddProgramModal.prototype.getEndDate = function () {
        return __WEBPACK_IMPORTED_MODULE_4_moment__(this.startDate).add(this.program.duration, "days").format('MMMM Do YYYY');
    };
    AddProgramModal.prototype.getMax = function () {
        var max = 0;
        if (this.calculator.reps < 10) {
            max = Math.round((this.calculator.weight / (1.0278 - 0.0278 * this.calculator.reps)) * 100) / 100;
        }
        else {
            max = Math.round((this.calculator.weight / 0.75) * 100) / 100;
        }
        return max;
    };
    AddProgramModal.prototype.updateFrequency = function () {
        if (this.options.frequencySelect === "every") {
            this.options.progressiontimeframe = 1;
        }
        else if (this.options.frequencySelect === "everyother") {
            this.options.progressiontimeframe = 2;
        }
    };
    AddProgramModal.prototype.addProgram = function () {
        this.options.programid = this.program.id;
        this.options.assigneddate = __WEBPACK_IMPORTED_MODULE_4_moment__(this.startDate).format('YYYY-MM-DD');
        for (var index in this.options) {
            if (!this.options[index]) {
                this.options[index] = null;
            }
        }
        this.viewCtrl.dismiss({ options: this.options, maxes: this.maxes });
    };
    AddProgramModal.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    AddProgramModal = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'add-program',template:/*ion-inline-start:"D:\Taylor\Documents\Websites\intensity2\src\modals\add-program\add-program.html"*/`<ion-header>\n    <ion-toolbar color="primary">\n        <ion-title>\n            Confirm Details\n        </ion-title>\n        <ion-buttons start>\n            <button ion-button (click)="dismiss()">\n                <span ion-text showWhen="ios">Cancel</span>\n                <ion-icon name="md-close" showWhen="android, windows"></ion-icon>\n            </button>\n        </ion-buttons>\n    </ion-toolbar>\n</ion-header>\n\n\n\n<ion-content>\n    \n\n    <p class="program-start">\n        Program will start on <strong>{{formatDate(startDate)}}</strong> \n       \n        \n    </p>\n    \n    <p class="program-end">\n        Program will end on {{getEndDate()}}\n    </p>\n    \n    <p class="program-change-date">\n     <button color="light" small ion-button ion-datepicker (ionChanged)="selectDate($event)" [okText]="\'Select Date\'">Change Start Date</button>\n    </p>\n\n\n    <ion-list class="add-program-maxes">\n        <ion-list-header [ngClass]="{\'maxes-required\': maxCount < exercises.length}" (click)="showMoreMaxes = !showMoreMaxes">\n            {{maxCount}}/{{exercises.length}} Max<span *ngIf="(exercises.length) !== 1">es</span> Entered\n            <ion-icon [name]="showMoreMaxes ? \'md-arrow-dropup\' :\'md-arrow-dropdown\'" item-end></ion-icon>\n        </ion-list-header>\n        <div *ngIf="showMoreMaxes">\n            <ion-item *ngFor="let exercise of exercises">\n                <ion-label floating>{{maxes[exercise].name}}</ion-label>\n                <ion-input type="text" [(ngModel)]="maxes[exercise].max" (change)="calculateMaxes()"></ion-input>\n            </ion-item>\n        </div>\n    </ion-list>\n    \n    \n    <ion-list class=\'add-program-options\' >\n        <ion-list-header class="more-header" (click)="showMoreCalc = !showMoreCalc">\n            1RM Calculator\n            <ion-icon [name]="showMoreCalc ? \'md-arrow-dropup\' :\'md-arrow-dropdown\'" item-end></ion-icon>\n        </ion-list-header>        \n        <div *ngIf="showMoreCalc">\n            <ion-item>\n                <ion-label floating>Reps</ion-label>\n                <ion-input name="reps" type="number" placeholder="Reps" [(ngModel)]="calculator.reps"></ion-input>\n            </ion-item>            \n            <ion-item>\n                <ion-label floating>Weight</ion-label>\n                <ion-input name="weight" type="number" placeholder="Weight" [(ngModel)]="calculator.weight"></ion-input>\n            </ion-item> \n            <ion-item *ngIf="calculator.reps && calculator.weight" class="result">\n                Estimated Max: {{getMax() | number:\'1.0-2\'}}{{account.units}}\n            </ion-item>\n        </div>\n    </ion-list>     \n    \n    \n    <ion-list class="add-program-options">\n        <ion-list-header class="more-header" (click)="showMore = !showMore">\n            Repeat Program\n            <ion-icon [name]="showMore ? \'md-arrow-dropup\' :\'md-arrow-dropdown\'" item-end></ion-icon>\n        </ion-list-header>   \n        \n        <div *ngIf="showMore">\n            \n            <ion-item>\n                <ion-label floating>How many times should this program repeat?</ion-label>\n                <ion-input type="text" [(ngModel)]="options.cycles"></ion-input>\n            </ion-item>    \n\n            \n        </div>\n    </ion-list>\n    \n    <ion-list class="add-program-options">\n        <ion-list-header class="more-header" (click)="showMoreProg = !showMoreProg">\n            Progression Options\n            <ion-icon [name]="showMoreProg ? \'md-arrow-dropup\' :\'md-arrow-dropdown\'" item-end></ion-icon>\n        </ion-list-header>   \n        \n        <div *ngIf="showMoreProg">\n\n            <ion-item>\n                <ion-label>Progression Type</ion-label>\n                <ion-select [(ngModel)]="options.progressiontype">\n                  <ion-option value="">None</ion-option>\n                  <ion-option value="weight">Weight</ion-option>\n                  <ion-option value="percentage">Percentage</ion-option>\n                </ion-select>\n            </ion-item>               \n              \n            <div *ngIf="options.progressiontype">\n                <ion-item>\n                    <ion-label floating>Progression Amount (<span *ngIf="options.progressiontype === \'weight\'">{{account.units}}</span><span *ngIf="options.progressiontype === \'percentage\'">%</span>)</ion-label>\n                    <ion-input type="text" [(ngModel)]="options.progressionamount"></ion-input>\n                </ion-item>  \n                \n                <p class="exercise-progression-amounts-toggle" (click)="showMoreProgEx = !showMoreProgEx">\n                    Specify amounts per exercise\n                    <ion-icon [name]="showMoreProgEx ? \'md-arrow-dropup\' :\'md-arrow-dropdown\'" item-end></ion-icon>  \n                </p>\n                <div class="exercise-progression-amounts" *ngIf="showMoreProgEx">\n                    <ion-item *ngFor="let exercise of exercises">\n                        <ion-label floating>{{maxes[exercise].name}}</ion-label>\n                        <ion-input type="number" [(ngModel)]="options.progressionexercises[exercise.exerciseid]"></ion-input>\n                    </ion-item>                    \n                </div>\n                \n                <ion-item>\n                    <ion-label floating>Progression Frequency</ion-label>\n                    <ion-select [(ngModel)]="options.frequencySelect" (change)="updateFrequency()">\n                      <ion-option value="every">Increase after every workout</ion-option>\n                      <ion-option value="everyother">Increase after every other workout</ion-option>\n                      <ion-option value="custom">Increase after a custom amount of workouts</ion-option>\n                    </ion-select>\n                </ion-item>                  \n\n                <ion-item *ngIf="options.frequencySelect === \'custom\'">\n                    <ion-label floating>Custom Frequency</ion-label>\n                    <ion-input type="number" [(ngModel)]="options.progressiontimeframe"></ion-input>\n                </ion-item>                 \n                \n            </div>\n            \n            \n        </div>\n    </ion-list>    \n\n    \n</ion-content>\n\n<ion-footer class="add-program-footer">\n    <button ion-button (click)="addProgram()">Add To Diary</button>\n</ion-footer>`/*ion-inline-end:"D:\Taylor\Documents\Websites\intensity2\src\modals\add-program\add-program.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ToastController */], __WEBPACK_IMPORTED_MODULE_2__providers_diary_diary__["a" /* DiaryProvider */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], AddProgramModal);
    return AddProgramModal;
}());

//# sourceMappingURL=add-program.js.map

/***/ }),

/***/ 381:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditProgramModal; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_diary_diary__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modals_select_exercise_select_exercise__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modals_edit_program_exercise_edit_program_exercise__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_program_program__ = __webpack_require__(54);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var EditProgramModal = (function () {
    function EditProgramModal(platform, params, viewCtrl, toastCtrl, diaryProvider, storage, alertCtrl, modalCtrl, programProvider) {
        var _this = this;
        this.platform = platform;
        this.params = params;
        this.viewCtrl = viewCtrl;
        this.toastCtrl = toastCtrl;
        this.diaryProvider = diaryProvider;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.programProvider = programProvider;
        this.properties = { activeTab: "Week 1", loading: true };
        this.storage.get("account").then(function (data) {
            _this.account = data;
        });
        this.program = this.params.data.program;
        this.program.public = parseInt(this.program.public);
        this.programProvider.getProgram(this.program.id).then(function (data) {
            _this.properties.loading = false;
            _this.program = data;
            _this.program.public = parseInt(_this.program.public);
            _this.program.workouts.sort(function (a, b) {
                return a.day - b.day;
            });
            _this.calculateTabs();
        })
            .catch(function () {
            _this.properties.loading = false;
        });
        this.tabs = [];
        this.calculateTabs();
    }
    EditProgramModal.prototype.calculateTabs = function () {
        var tabsCount = Math.ceil(parseInt(this.program.duration) / 7);
        this.tabs = [];
        for (var x = 1; x <= tabsCount; x++) {
            this.tabs.push("Week " + x);
        }
    };
    EditProgramModal.prototype.isInTab = function (workout) {
        var index = (this.tabs.indexOf(this.properties.activeTab)) + 1;
        var tab = Math.ceil(parseInt(workout.day) / 7);
        return index === tab;
    };
    EditProgramModal.prototype.addWeek = function () {
        this.program.duration += 7;
        this.calculateTabs();
    };
    EditProgramModal.prototype.openWeekOptions = function (week, index) {
        var _this = this;
        var alertObj = {
            title: week,
            cssClass: "button-only-alert",
            buttons: [
                {
                    text: 'Copy',
                    handler: function (data) {
                        _this.addWeek();
                        var newWeekStartDay = (_this.tabs.length * 7) - 7;
                        var copyWeekStartDay = (parseInt(index) * 7) + 1;
                        var copyWeekEndDay = copyWeekStartDay + 6;
                        for (var _i = 0, _a = _this.program.workouts; _i < _a.length; _i++) {
                            var workout = _a[_i];
                            if (workout.day >= copyWeekStartDay && workout.day <= copyWeekEndDay) {
                                var copy = Object.assign({}, workout);
                                copy.day += newWeekStartDay;
                                copy.name = "Day " + copy.day;
                                _this.program.workouts.push(copy);
                            }
                        }
                    },
                    cssClass: "copy-button"
                },
                {
                    text: 'Move',
                    handler: function (data) {
                        var week = parseInt(index) + 1;
                        var alertObj = {
                            title: "Move Week " + week,
                            message: "Enter where you want this week to move to. Other weeks will adjust automatically.",
                            buttons: [
                                {
                                    text: 'Cancel',
                                    role: 'cancel'
                                },
                                {
                                    text: 'Move',
                                    handler: function (data) {
                                        var moveToWeek = parseInt(data.week);
                                        if (moveToWeek === week) {
                                            return;
                                        }
                                        if (moveToWeek > (_this.tabs.length)) {
                                            while (moveToWeek > (_this.tabs.length)) {
                                                _this.addWeek();
                                            }
                                        }
                                        var daysChange = (moveToWeek - week) * 7;
                                        var moveWeekStartDay = (parseInt(index) * 7) + 1;
                                        var moveWeekEndDay = moveWeekStartDay + 6;
                                        var newWeekStartDay = moveWeekStartDay + daysChange;
                                        var newWeekEndDay = moveWeekEndDay + daysChange;
                                        for (var _i = 0, _a = _this.program.workouts; _i < _a.length; _i++) {
                                            var workout = _a[_i];
                                            if (workout.day >= moveWeekStartDay && workout.day <= moveWeekEndDay) {
                                                workout.day += daysChange;
                                            }
                                            else if (daysChange > 0 && (workout.day >= moveWeekStartDay && workout.day <= newWeekEndDay)) {
                                                workout.day -= 7;
                                            }
                                            else if (daysChange < 0 && (workout.day >= newWeekStartDay && workout.day <= moveWeekEndDay)) {
                                                workout.day += 7;
                                            }
                                        }
                                    }
                                }
                            ],
                            inputs: [{ name: "week", placeholder: "Week", type: "number", value: "" + week }]
                        };
                        var alert = _this.alertCtrl.create(alertObj);
                        setTimeout(function () {
                            alert.present();
                        }, 200);
                    },
                    cssClass: "reorder-button"
                },
                {
                    text: 'Remove',
                    handler: function (data) {
                        var alert = _this.alertCtrl.create({
                            title: "Remove " + week,
                            message: "Are you sure you want to remove this week? This will delete all workouts that belong to this week.",
                            buttons: [
                                {
                                    text: 'Cancel',
                                    role: 'cancel'
                                },
                                {
                                    text: 'Yes',
                                    handler: function (data) {
                                        //TODO: there is a bug here
                                        //delete all workouts within range of deleted week
                                        //subtract 7 from all workouts that follow deleted week
                                        var weekStartDay = (parseInt(index) * 7) + 1;
                                        var weekEndDay = weekStartDay + 6;
                                        for (var x = _this.program.workouts.length - 1; x >= 0; x--) {
                                            var workout = _this.program.workouts[0];
                                            if (workout.day >= weekStartDay && workout.day <= weekEndDay) {
                                                _this.program.workouts.splice(x, 1);
                                            }
                                            else if (workout.day > weekEndDay) {
                                                workout.day -= 7;
                                            }
                                        }
                                        _this.program.duration -= 7;
                                        if (_this.program.duration < 7) {
                                            _this.program.duration = 7;
                                            _this.program.workouts = [{ day: 1, name: "Day 1", exercises: [] }];
                                        }
                                        _this.calculateTabs();
                                    }
                                }
                            ]
                        });
                        setTimeout(function () {
                            alert.present();
                        }, 200);
                    },
                    cssClass: "remove-button"
                }
            ]
        };
        var alert = this.alertCtrl.create(alertObj);
        alert.present();
    };
    EditProgramModal.prototype.addWorkout = function () {
        var _this = this;
        var weekIndex = this.tabs.indexOf(this.properties.activeTab);
        var weekStartDay = (weekIndex * 7) + 1;
        var weekEndDay = weekStartDay + 6;
        var newDay = weekStartDay;
        for (var _i = 0, _a = this.program.workouts; _i < _a.length; _i++) {
            var workout = _a[_i];
            if (workout.day >= weekStartDay && workout.day <= weekEndDay) {
                newDay = workout.day + 1;
            }
        }
        if (newDay > weekEndDay) {
            newDay = weekEndDay;
        }
        this.program.workouts.push({ name: "Day " + newDay, day: newDay, exercises: [] });
        setTimeout(function () { _this.content.scrollToBottom(); }, 200);
    };
    EditProgramModal.prototype.copyWorkout = function (workout) {
        var _this = this;
        var alertObj = {
            title: "Copy " + workout.name,
            message: "Select the workouts you want to copy to.",
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel'
                },
                {
                    text: 'Copy',
                    handler: function (data) {
                        var exerciseCount = workout.exercises.length;
                        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                            var workoutIndex = data_1[_i];
                            for (var x = 0; x < exerciseCount; x++) {
                                var exercise = workout.exercises[x];
                                var copy = Object.assign({}, exercise);
                                _this.program.workouts[workoutIndex].exercises.push(copy);
                            }
                        }
                    }
                }
            ],
            inputs: []
        };
        var inputs = [];
        for (var index in this.program.workouts) {
            var workout_1 = this.program.workouts[index];
            inputs.push({ name: "workout-" + index, label: workout_1.name, value: index, type: "checkbox" });
        }
        alertObj.inputs = inputs;
        var alert = this.alertCtrl.create(alertObj);
        alert.present();
    };
    EditProgramModal.prototype.moveWorkout = function (workout) {
        var _this = this;
        var alertObj = {
            title: "Move " + workout.name,
            message: "Enter what day you want to move this workout to.",
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel'
                },
                {
                    text: 'Move',
                    handler: function (data) {
                        if (data.day && data.name) {
                            workout.day = data.day;
                            workout.name = data.name;
                            if (workout.day > _this.program.duration) {
                                var newDuration = ((workout.day % 7) + 1) * 7;
                                _this.program.duration = newDuration;
                                _this.calculateTabs();
                            }
                        }
                    }
                }
            ],
            inputs: [{ name: "name", placeholder: "Workout Name", type: "text", value: workout.name }, { name: "day", placeholder: "Day", type: "number", value: workout.day }]
        };
        var alert = this.alertCtrl.create(alertObj);
        alert.present();
    };
    EditProgramModal.prototype.editWorkout = function (workout) {
        var alertObj = {
            title: "Edit Workout Name",
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel'
                },
                {
                    text: 'Update',
                    handler: function (data) {
                        if (data.name) {
                            workout.name = data.name;
                        }
                    }
                }
            ],
            inputs: [{ name: "name", placeholder: "Workout Name", type: "text", value: workout.name }]
        };
        var alert = this.alertCtrl.create(alertObj);
        alert.present();
    };
    EditProgramModal.prototype.deleteWorkout = function (index, workout) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: "Remove " + workout.name,
            message: "Are you sure you want to remove this workout? This will delete all exercises that belong to this workout.",
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel'
                },
                {
                    text: 'Yes',
                    handler: function (data) {
                        _this.program.workouts.splice(index, 1);
                    }
                }
            ]
        });
        alert.present();
    };
    EditProgramModal.prototype.addExercise = function (workout) {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__modals_select_exercise_select_exercise__["a" /* SelectExerciseModal */]);
        modal.onDidDismiss(function (exercise) {
            if (exercise) {
                workout.exercises.push(exercise);
            }
        });
        modal.present();
    };
    EditProgramModal.prototype.copyExercise = function (ev, exercise, workout) {
        var _this = this;
        ev.stopPropagation();
        ev.preventDefault();
        var alertObj = {
            title: "Copy " + exercise.name,
            message: "Select the workouts you want to copy to.",
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel'
                },
                {
                    text: 'Copy',
                    handler: function (data) {
                        for (var _i = 0, data_2 = data; _i < data_2.length; _i++) {
                            var workoutIndex = data_2[_i];
                            var copy = Object.assign({}, exercise);
                            _this.program.workouts[workoutIndex].exercises.push(copy);
                        }
                    }
                }
            ],
            inputs: []
        };
        var inputs = [];
        for (var index in this.program.workouts) {
            var workout_2 = this.program.workouts[index];
            inputs.push({ name: "workout-" + index, label: workout_2.name, value: index, type: "checkbox" });
        }
        alertObj.inputs = inputs;
        var alert = this.alertCtrl.create(alertObj);
        alert.present();
    };
    EditProgramModal.prototype.editExercise = function (ev, exercise) {
        ev.stopPropagation();
        ev.preventDefault();
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__modals_edit_program_exercise_edit_program_exercise__["a" /* EditProgramExerciseModal */], { exercise: exercise });
        modal.onDidDismiss(function (updatedExercise) {
            if (updatedExercise) {
                Object.assign(exercise, updatedExercise);
            }
        });
        modal.present();
    };
    EditProgramModal.prototype.deleteExercise = function (ev, index, workout) {
        ev.stopPropagation();
        ev.preventDefault();
        workout.exercises.splice(index, 1);
    };
    EditProgramModal.prototype.reorderItems = function (indexes, workout) {
        var element = workout.exercises[indexes.from];
        workout.exercises.splice(indexes.from, 1);
        workout.exercises.splice(indexes.to, 0, element);
    };
    EditProgramModal.prototype.update = function () {
        this.viewCtrl.dismiss(this.program);
    };
    EditProgramModal.prototype.dismiss = function () {
        var _this = this;
        var alertObj = {
            title: "Wait!",
            message: "By leaving, you will lose your current changes.",
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel'
                },
                {
                    text: 'Continue',
                    handler: function (data) {
                        _this.viewCtrl.dismiss();
                    }
                }
            ]
        };
        var alert = this.alertCtrl.create(alertObj);
        alert.present();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Content */])
    ], EditProgramModal.prototype, "content", void 0);
    EditProgramModal = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'edit-program',template:/*ion-inline-start:"D:\Taylor\Documents\Websites\intensity2\src\modals\edit-program\edit-program.html"*/`<ion-header>\n    <ion-toolbar color="primary">\n        <ion-title>\n            Edit Program\n        </ion-title>\n        <ion-buttons start>\n            <button ion-button (click)="dismiss()">\n                <span ion-text showWhen="ios">Cancel</span>\n                <ion-icon name="md-close" showWhen="android, windows"></ion-icon>\n            </button>\n        </ion-buttons>\n    </ion-toolbar>\n</ion-header>\n\n\n\n<ion-content>\n\n    \n\n    <ion-list class="edit-profile program-info">    \n        <ion-item>\n            <ion-label floating>Program Name</ion-label>\n            <ion-input type="text" [(ngModel)]="program.name"></ion-input>\n        </ion-item>\n        \n       \n\n\n        <ion-item>\n            <ion-label floating>Description</ion-label>\n            <ion-textarea [(ngModel)]="program.description" autosize></ion-textarea>\n        </ion-item>  \n\n        <ion-item>\n            <ion-label>Public</ion-label>\n            <ion-checkbox color="primary" [(ngModel)]="program.public"></ion-checkbox>\n        </ion-item>         \n        \n        \n    </ion-list>\n    \n    \n    <div *ngIf="properties.loading" class="diary-loading program-loading">\n        <ion-spinner></ion-spinner>\n    </div>    \n    \n    <div *ngIf="!properties.loading">\n        \n        <div class="workout-tabs">\n            <button ion-button small (click)="properties.activeTab = tab" (press)="openWeekOptions(tab, i)" [outline]="properties.activeTab !== tab" *ngFor="let tab of tabs;let i = index">{{tab}}</button>\n            <button ion-button small clear icon-start (click)="addWeek()">\n                <ion-icon name="add"></ion-icon>\n                Add Week\n            </button>\n        </div>   \n\n\n            <div class="program-workouts">\n\n                <div *ngFor="let workout of program.workouts; let workoutIndex = index" class="workout-list">\n\n                    <ion-list *ngIf="isInTab(workout)">\n                        <ion-list-header>\n                            <span (click)="workout.hide = !workout.hide">{{workout.name}}</span>\n                            <ion-icon name="git-compare" item-end (click)="moveWorkout(workout)"></ion-icon>\n                            <ion-icon name="copy" item-end (click)="copyWorkout(workout)"></ion-icon>\n                            <ion-icon name="create" item-end (click)="editWorkout(workout)"></ion-icon>\n                            <ion-icon name="trash" item-end (click)="deleteWorkout(workoutIndex, workout)"></ion-icon>\n                        </ion-list-header>\n\n\n                        <ion-item-group reorder="true" (ionItemReorder)="reorderItems($event, workout)" *ngIf="!workout.hide" class="diary-sets">\n\n\n                            <ion-item *ngFor="let exercise of workout.exercises; let i = index" (click)="editExercise($event, exercise)">\n                                <h2>{{exercise.name}}</h2>\n                                <p>{{exercise.sets ? exercise.sets : 0}} set<span *ngIf="exercise.sets !== \'1\'">s</span> of {{exercise.reps ? exercise.reps : 0}} rep<span *ngIf="exercise.reps !== \'1\'">s</span><span *ngIf="exercise.percentage && exercise.percentage > 0">, {{exercise.percentage}}%</span><span *ngIf="exercise.rpe && exercise.rpe > 0">, @{{exercise.rpe}}RPE</span></p>\n                                <div class="program-exercise-actions">\n                                    <ion-icon name="copy" (click)="copyExercise($event, exercise,workout)"></ion-icon>\n                                    <ion-icon name="create" (click)="editExercise($event, exercise)"></ion-icon>\n                                    <ion-icon name="trash" (click)="deleteExercise($event, i,workout)"></ion-icon>\n                                </div>\n                            </ion-item>\n\n                        </ion-item-group>\n\n                        <button class="program-add-exercise" ion-button small clear icon-start (click)="addExercise(workout)" *ngIf="!workout.hide">\n                            <ion-icon name="add"></ion-icon>\n                            Add Exercise\n                        </button>  \n\n                    </ion-list>\n\n                </div>\n\n            </div>    \n\n\n        <div class="add-program-workout" (click)="addWorkout()">\n            <ion-icon name="add"></ion-icon> Add Workout\n        </div>\n        \n    </div>\n    \n</ion-content>\n\n<ion-footer class="add-program-footer premium-footer">\n    <button ion-button (click)="update()">Update Program</button>\n</ion-footer>`/*ion-inline-end:"D:\Taylor\Documents\Websites\intensity2\src\modals\edit-program\edit-program.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ToastController */], __WEBPACK_IMPORTED_MODULE_2__providers_diary_diary__["a" /* DiaryProvider */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */], __WEBPACK_IMPORTED_MODULE_6__providers_program_program__["a" /* ProgramProvider */]])
    ], EditProgramModal);
    return EditProgramModal;
}());

//# sourceMappingURL=edit-program.js.map

/***/ }),

/***/ 382:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RecordsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_exercise_exercise__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modals_records_records__ = __webpack_require__(383);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var RecordsPage = (function () {
    function RecordsPage(navCtrl, modalCtrl, storage, exerciseProvider, events, alertCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.storage = storage;
        this.exerciseProvider = exerciseProvider;
        this.events = events;
        this.alertCtrl = alertCtrl;
        this.properties = { userid: 0, search: "", loading: true };
        this.exercises = [];
        this.storage.get("userid").then(function (data) {
            _this.properties.userid = data;
        });
        this.getExercises();
    }
    RecordsPage.prototype.getExercises = function () {
        var _this = this;
        this.storage.get("recentexercises").then(function (exercises) {
            if (exercises && _this.properties.loading) {
                _this.exercises = exercises;
            }
        });
        this.exerciseProvider.getRecentExercises().then(function (data) {
            _this.properties.loading = false;
            _this.exercises = data;
        })
            .catch(function () {
            _this.properties.loading = false;
        });
    };
    RecordsPage.prototype.viewRecords = function (exercise) {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__modals_records_records__["a" /* RecordsModal */], { exercise: exercise });
        modal.present();
    };
    RecordsPage.prototype.searchCancelled = function () {
        this.properties.search = '';
    };
    RecordsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-records',template:/*ion-inline-start:"D:\Taylor\Documents\Websites\intensity2\src\pages\records\records.html"*/`<ion-header>\n    <ion-navbar color="primary">\n        <button ion-button menuToggle>\n            <ion-icon name="menu"></ion-icon>\n        </button>\n        <ion-title>Records</ion-title>\n\n        <ion-buttons end>\n            <button ion-button icon-only tools tappable>\n                <ion-icon name="more" ></ion-icon>\n            </button>\n        </ion-buttons>    \n        \n      \n    \n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n<ion-content>\n    \n    \n    <ion-searchbar\n        [(ngModel)]="properties.search"\n        [showCancelButton]="shouldShowCancel"\n        (ionCancel)="searchCancelled()"\n        placeholder="Search Exercises"\n        class="flat-search" *ngIf="exercises.length > 0">\n    </ion-searchbar>   \n    \n    <div class="diary-empty empty-state" *ngIf="exercises.length < 1">\n        <ion-icon name=\'trophy\'></ion-icon>\n        No Records\n    </div>     \n\n    \n    <ion-list class="record-exercises">\n        <button ion-item detail-none *ngFor="let exercise of exercises | exerciseSearch:properties.search; let i = index" (click)="viewRecords(exercise)">\n            {{exercise.name}}\n        </button> \n    </ion-list> \n</ion-content>\n`/*ion-inline-end:"D:\Taylor\Documents\Websites\intensity2\src\pages\records\records.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_2__providers_exercise_exercise__["a" /* ExerciseProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], RecordsPage);
    return RecordsPage;
}());

//# sourceMappingURL=records.js.map

/***/ }),

/***/ 383:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RecordsModal; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_diary_diary__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_diary_diary__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var RecordsModal = (function () {
    function RecordsModal(navCtrl, platform, params, viewCtrl, toastCtrl, storage, alertCtrl, diaryProvider) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.params = params;
        this.viewCtrl = viewCtrl;
        this.toastCtrl = toastCtrl;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.diaryProvider = diaryProvider;
        this.properties = { activeTab: "volume", loading: false };
        this.account = {};
        this.storage.get("account").then(function (data) {
            _this.account = data;
        });
        this.exercise = this.params.data.exercise;
        this.fullRecords = { amrap: [], backoffs: [], overall: [], amrapIndex: -1, backoffsIndex: -1, overallIndex: -1 };
        this.loadRecords();
    }
    RecordsModal.prototype.loadRecords = function () {
        var _this = this;
        this.properties.loading = true;
        this.diaryProvider.getRecords(this.exercise.exerciseid).then(function (data) {
            _this.fullRecords.amrap = data["amrap"];
            _this.fullRecords.overall = data["overall"];
            _this.fullRecords.backoffs = data["backoffs"];
            _this.fullRecords.amrapIndex = _this.generateRandomIndex(_this.fullRecords.amrap.length - 1);
            _this.fullRecords.overallIndex = _this.generateRandomIndex(_this.fullRecords.overall.length - 1);
            _this.fullRecords.backoffsIndex = _this.generateRandomIndex(_this.fullRecords.backoffs.length - 1);
            _this.properties.loading = false;
        }).catch(function (e) {
            _this.properties.loading = false;
        });
    };
    RecordsModal.prototype.generateRandomIndex = function (max) {
        var min = 0;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    RecordsModal.prototype.viewRecord = function (record) {
        var _this = this;
        var randomDescriptors = ["glorious", "gainful", "powerful", "fantastic", "tremdious", "sickening"];
        var alert = this.alertCtrl.create({
            title: __WEBPACK_IMPORTED_MODULE_5_moment__(record.assigneddate).format('MMMM Do YYYY'),
            message: "Your acheived this record on this date. It was a " + randomDescriptors[this.generateRandomIndex(5)] + " " + __WEBPACK_IMPORTED_MODULE_5_moment__(record.assigneddate).format('dddd') + ".",
            buttons: [
                {
                    text: 'Dismiss',
                    role: 'cancel'
                },
                {
                    text: 'Go to date',
                    handler: function (data) {
                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__pages_diary_diary__["a" /* DiaryPage */], { date: __WEBPACK_IMPORTED_MODULE_5_moment__(record.assigneddate).toDate() });
                    }
                }
            ]
        });
        alert.present();
    };
    RecordsModal.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    RecordsModal = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'records',template:/*ion-inline-start:"D:\Taylor\Documents\Websites\intensity2\src\modals\records\records.html"*/`<ion-header>\n    <ion-toolbar color="primary">\n        <ion-title>\n            {{exercise.name}}\n        </ion-title>\n        <ion-buttons start>\n            <button ion-button (click)="dismiss()">\n                <span ion-text showWhen="ios">Cancel</span>\n                <ion-icon name="md-close" showWhen="android, windows"></ion-icon>\n            </button>\n        </ion-buttons>\n    </ion-toolbar>\n</ion-header>\n\n\n\n<ion-content>\n    \n    <ion-segment color="primary" [(ngModel)]="properties.activeTab"> \n      <ion-segment-button value="volume">\n            Volume\n      </ion-segment-button>\n      <ion-segment-button value="weight">\n            Weight\n      </ion-segment-button>   \n      <ion-segment-button value="reps">\n            Reps\n      </ion-segment-button>      \n    </ion-segment>    \n\n \n    \n    <div *ngIf="properties.activeTab === \'volume\'">\n        <div class="diary-loading" *ngIf="properties.loading">\n            <ion-spinner></ion-spinner>\n        </div>     \n     \n        <div class="records-estimated-max yellow-background" *ngIf="fullRecords.backoffs.length > 0">\n            <ion-icon name="trophy"></ion-icon>\n            <h2>{{fullRecords.backoffs[fullRecords.backoffsIndex].best}}{{account.units}}</h2>\n            <p>Volume for {{fullRecords.backoffs[fullRecords.backoffsIndex].reps}} rep sets</p>\n        </div>        \n        \n        <ion-list class="records-list" *ngIf="fullRecords.backoffs.length > 0">\n            <button ion-item *ngFor="let item of fullRecords.backoffs" (click)="viewRecord(item)">\n                Best volume for {{item.reps}} rep sets: {{item.best}}{{account.units}}\n            </button>  \n        </ion-list>        \n        \n        \n        \n        \n    </div>\n    \n    <div *ngIf="properties.activeTab === \'weight\'">\n        <div class="diary-loading" *ngIf="properties.loading">\n            <ion-spinner></ion-spinner>\n        </div>  \n        \n        \n        <div class="records-estimated-max red-background" *ngIf="fullRecords.overall.length > 0">\n            <ion-icon name="trophy"></ion-icon>\n            <h2>{{fullRecords.overall[fullRecords.overallIndex].max}}{{account.units}}</h2>\n            <p>{{fullRecords.overall[fullRecords.overallIndex].rep}} rep max</p>\n        </div>         \n        \n        <ion-list class="records-list" *ngIf="fullRecords.overall.length > 0">\n            <button ion-item *ngFor="let item of fullRecords.overall" (click)="viewRecord(item)" class="text-center">\n                {{item.rep}}RM: {{item.max}}{{account.units}}\n            </button>  \n        </ion-list>          \n        \n        \n    </div>\n\n    <div *ngIf="properties.activeTab === \'reps\'">\n        <div class="diary-loading" *ngIf="properties.loading">\n            <ion-spinner></ion-spinner>\n        </div> \n        \n        <div class="records-estimated-max orange-background" *ngIf="fullRecords.amrap.length > 0">\n            <ion-icon name="trophy"></ion-icon>\n            <h2>{{fullRecords.amrap[fullRecords.amrapIndex].reps}} rep<span *ngIf="fullRecords.amrap[fullRecords.amrapIndex].reps > 1">s</span></h2>\n            <p>With {{fullRecords.amrap[fullRecords.amrapIndex].weight}}{{account.units}}</p>\n        </div>  \n\n        \n        <ion-list class="records-list" *ngIf="fullRecords.amrap.length > 0">\n            <button ion-item *ngFor="let item of fullRecords.amrap" (click)="viewRecord(item)">\n                Best reps with {{item.weight}}{{account.units}}: {{item.reps}}@RPE{{item.rpe}}\n            </button>  \n        </ion-list>            \n        \n        \n    </div>    \n    \n</ion-content>`/*ion-inline-end:"D:\Taylor\Documents\Websites\intensity2\src\modals\records\records.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ToastController */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2__providers_diary_diary__["a" /* DiaryProvider */]])
    ], RecordsModal);
    return RecordsModal;
}());

//# sourceMappingURL=records.js.map

/***/ }),

/***/ 384:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StatsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_account_account__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_chart_chart__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_diary_diary__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_exercise_exercise__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__modals_change_exercise_change_exercise__ = __webpack_require__(385);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_angular_highcharts__ = __webpack_require__(65);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var StatsPage = (function () {
    function StatsPage(navCtrl, modalCtrl, storage, accountProvider, events, alertCtrl, chartProvider, diaryProvider, exerciseProvider) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.storage = storage;
        this.accountProvider = accountProvider;
        this.events = events;
        this.alertCtrl = alertCtrl;
        this.chartProvider = chartProvider;
        this.diaryProvider = diaryProvider;
        this.exerciseProvider = exerciseProvider;
        this.properties = { activeTab: "all" };
        this.account = { last_workout: "", last_workout_formatted: "" };
        this.storage.get("account").then(function (data) {
            _this.account = data;
        });
        this.exercise = { name: "", isMusclegroup: false, isType: false };
        this.stats = {
            chart: new __WEBPACK_IMPORTED_MODULE_9_angular_highcharts__["a" /* Chart */](this.chartProvider.getLineConfig()),
            heatmap: new __WEBPACK_IMPORTED_MODULE_9_angular_highcharts__["a" /* Chart */](this.chartProvider.getHeatmapConfig()),
            piechart1: new __WEBPACK_IMPORTED_MODULE_9_angular_highcharts__["a" /* Chart */](this.chartProvider.getPieConfig()),
            piechart2: new __WEBPACK_IMPORTED_MODULE_9_angular_highcharts__["a" /* Chart */](this.chartProvider.getPieConfig()),
            general: { heatmap: [], heatmap_date: "", current_streak: 0, current_streak_date: "", best_streak: { start: null, end: null, streak: 0 }, musclegroup: { breakdown: [], most_tracked: {}, least_tracked: {} }, exercise_type: { breakdown: [], most_tracked: {}, least_tracked: {} } },
            metric: "volume",
            timeframe: "forever",
            units: "",
            firstLoad: true,
            extra: {
                best: {},
                worst: {},
                average: {},
                growth: {},
                units: ""
            },
            availableMetrics: ["volume", "rpe", "intensity", "weight", "volume/wilks", "best weight"]
        };
        this.getGeneralStats();
        this.getLatestExercise();
    }
    StatsPage.prototype.getGeneralStats = function () {
        var _this = this;
        this.diaryProvider.getStats({ type: "generaluserdata" }).then(function (data) {
            _this.stats.general = data;
            if (_this.stats.general.heatmap.length < 1) {
                return;
            }
            if (_this.stats.general.current_streak) {
                _this.stats.general.current_streak_date = __WEBPACK_IMPORTED_MODULE_3_moment__().subtract(_this.stats.general.current_streak * 7).format("MMMM Do YYYY");
            }
            if (_this.stats.general.heatmap.length > 0) {
                _this.stats.general.heatmap_date = _this.formatDate(_this.stats.general.heatmap[_this.stats.general.heatmap.length - 1].assigneddate);
            }
            _this.stats.heatmap.ref.update({ xAxis: {
                    type: 'datetime',
                    min: new Date(_this.stats.general.heatmap[_this.stats.general.heatmap.length - 1].assigneddate).getTime(),
                    max: new Date(_this.stats.general.heatmap[0].assigneddate).getTime(),
                    labels: {
                        format: '{value:%b}',
                        step: 1
                    },
                    showLastLabel: false,
                    tickLength: 4
                } }, true);
            _this.stats.heatmap.removeSerie(0);
            _this.stats.heatmap.addSerie({
                name: 'Session workload',
                borderWidth: 0,
                colsize: 24 * 36e5 * 7,
                borderColor: '#de4223',
                data: _this.formatHeatmapStats(_this.stats.general.heatmap),
                dataLabels: {
                    enabled: false,
                    color: 'black',
                    style: {
                        textShadow: 'none'
                    }
                }
            });
            _this.stats.piechart1.removeSerie(0);
            _this.stats.piechart1.addSerie({
                name: 'Percentage of total volume',
                colorByPoint: true,
                borderWidth: 0,
                data: _this.formatPiechartStats(_this.stats.general.musclegroup.breakdown)
            });
            _this.stats.piechart2.removeSerie(0);
            _this.stats.piechart2.addSerie({
                name: 'Percentage of total volume',
                colorByPoint: true,
                borderWidth: 0,
                data: _this.formatPiechartStats(_this.stats.general.exercise_type.breakdown)
            });
        });
    };
    StatsPage.prototype.formatHeatmapStats = function (data) {
        var formatted = [];
        for (var index in data) {
            var stat = data[index];
            var date = new Date(stat.assigneddate);
            formatted.push([date.getTime(), parseInt(stat.current_day), parseInt(stat.volume)]);
        }
        return formatted.sort(function (a, b) {
            return a[0] - b[0];
        });
    };
    StatsPage.prototype.formatPiechartStats = function (data) {
        var formatted = [];
        for (var index in data) {
            var stat = data[index];
            formatted.push({ name: index, y: stat });
        }
        return formatted;
    };
    StatsPage.prototype.getLatestExercise = function () {
        var _this = this;
        this.storage.get("recentexercises").then(function (exercises) {
            if (exercises && exercises.length > 0) {
                _this.recentExercises = exercises;
                _this.exercise = exercises[0];
                _this.getStats();
            }
        });
        this.exerciseProvider.getRecentExercises().then(function (exercises) {
            _this.recentExercises = exercises;
            if (!_this.exercise.name) {
                _this.exercise = exercises[0];
                _this.getStats();
            }
        });
    };
    StatsPage.prototype.openChangeExercise = function () {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_8__modals_change_exercise_change_exercise__["a" /* ChangeExerciseModal */], { exercises: this.recentExercises });
        modal.onDidDismiss(function (exercise) {
            if (exercise) {
                _this.exercise.isMusclegroup = false;
                _this.exercise.isType = false;
                if (exercise.selectedMusclegroup) {
                    _this.exercise.isMusclegroup = true;
                    _this.exercise.name = exercise.selectedMusclegroup;
                }
                else if (exercise.selectedType) {
                    _this.exercise.isType = true;
                    _this.exercise.name = exercise.selectedType;
                }
                else {
                    _this.exercise = exercise;
                }
                _this.getStats();
            }
        });
        modal.present();
    };
    StatsPage.prototype.getStats = function () {
        var _this = this;
        if (this.stats.firstLoad) {
            this.stats.firstLoad = false;
        }
        var requestData = { accumulation: "Weekly", timeframe: this.stats.timeframe, metric: this.stats.metric };
        if (this.exercise.isMusclegroup) {
            requestData["musclegroup"] = this.exercise.name;
        }
        else if (this.exercise.isType) {
            requestData["type"] = this.exercise.name;
        }
        else {
            requestData["name"] = this.exercise.name;
        }
        this.diaryProvider.getStats(requestData).then(function (data) {
            _this.setStatsUnits();
            _this.stats.chart.removeSerie(0);
            _this.stats.chart.addSerie({
                data: _this.formatStats(data),
                name: _this.stats.metric + _this.stats.units,
                color: '#de4223',
                showInLegend: false
            });
            _this.setExtraStats(data);
        }).catch(function () {
            _this.setStatsUnits();
            _this.stats.chart.removeSerie(0);
            _this.stats.chart.addSerie({
                data: [],
                name: _this.stats.metric + _this.stats.units,
                color: '#de4223',
                showInLegend: false
            });
        });
    };
    StatsPage.prototype.setStatsUnits = function () {
        this.stats.units = "";
        if (this.stats.metric.indexOf("volume") > -1 || this.stats.metric.indexOf("weight") > -1) {
            this.stats.units = " (" + this.account.units + ")";
        }
        else if (this.stats.metric.indexOf("intensity") > -1) {
            this.stats.units = " (%)";
        }
    };
    StatsPage.prototype.setExtraStats = function (data) {
        this.stats.extra = {
            best: { data: 0, date: null },
            worst: { data: 10000000, date: null },
            average: { data: 0, fromDate: null, toDate: null },
            growth: { data: 0, percentage: null },
            units: this.stats.units.replace(/[()]/g, '').trim()
        };
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var stat = data_1[_i];
            if (stat.y > this.stats.extra.best.data) {
                this.stats.extra.best.data = stat.y;
                this.stats.extra.best.date = __WEBPACK_IMPORTED_MODULE_3_moment__(stat.x).format("MMMM Do YYYY");
            }
            if (stat.y < this.stats.extra.worst.data) {
                this.stats.extra.worst.data = stat.y;
                this.stats.extra.worst.date = __WEBPACK_IMPORTED_MODULE_3_moment__(stat.x).format("MMMM Do YYYY");
            }
            this.stats.extra.average.data = this.stats.extra.average.data + stat.y;
        }
        this.stats.extra.average.data = this.stats.extra.average.data / data.length;
        this.stats.extra.average.fromDate = data[data.length - 1].x;
        this.stats.extra.average.toDate = data[0].x;
        this.stats.extra.growth.data = (this.stats.extra.best.data - this.stats.extra.worst.data) / data.length;
        this.stats.extra.growth.percentage = this.stats.extra.growth.data * 100;
    };
    StatsPage.prototype.formatStats = function (data) {
        var formatted = [];
        for (var _i = 0, data_2 = data; _i < data_2.length; _i++) {
            var stat = data_2[_i];
            var date = new Date(stat.x);
            formatted.push([date.getTime(), stat.y]);
        }
        return formatted.sort(function (a, b) {
            return a[0] - b[0];
        });
    };
    StatsPage.prototype.changeStatsTimeframe = function (timeframe) {
        this.stats.timeframe = timeframe;
        this.getStats();
    };
    StatsPage.prototype.openChangeMetric = function () {
        var _this = this;
        var data = {
            title: "Change Metric",
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel'
                },
                {
                    text: 'OK',
                    handler: function (data) {
                        _this.stats.metric = data;
                        _this.getStats();
                    }
                }
            ],
            inputs: []
        };
        for (var _i = 0, _a = this.stats.availableMetrics; _i < _a.length; _i++) {
            var metric = _a[_i];
            data.inputs.push({ type: 'radio', label: metric, value: metric, checked: metric === this.stats.metric });
        }
        var alert = this.alertCtrl.create(data);
        alert.present();
    };
    StatsPage.prototype.formatDate = function (date) {
        if (!date) {
            date = new Date();
        }
        return __WEBPACK_IMPORTED_MODULE_3_moment__(date).format("MMMM Do YYYY");
    };
    StatsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-stats',template:/*ion-inline-start:"D:\Taylor\Documents\Websites\intensity2\src\pages\stats\stats.html"*/`<ion-header>\n    <ion-navbar color="primary">\n        <button ion-button menuToggle>\n            <ion-icon name="menu"></ion-icon>\n        </button>\n        <ion-title>Stats</ion-title>\n\n        <ion-buttons end>\n            <button ion-button icon-only tools tappable>\n                <ion-icon name="more" ></ion-icon>\n            </button>\n        </ion-buttons>    \n        \n      \n    \n    </ion-navbar>\n</ion-header>\n\n<ion-content  [ngClass]="{\'display-borders\':properties.activeTab === \'all\'}">\n    \n    <ion-segment color="primary" [(ngModel)]="properties.activeTab">\n        <ion-segment-button value="all">\n            All\n        </ion-segment-button>        \n        <ion-segment-button value="general">\n            General\n        </ion-segment-button>\n      <ion-segment-button value="exercise">\n            Exercise\n      </ion-segment-button>\n      <ion-segment-button value="breakdown">\n            Breakdown\n      </ion-segment-button>        \n    </ion-segment>    \n    \n    \n    \n    <div class="stats-page-section general-stats" [hidden]="properties.activeTab !== \'general\' && properties.activeTab !== \'all\'">\n        <div [chart]="stats.heatmap" style="height:300px;"></div>\n        \n        \n        <div class="extra-stats primary-stats" *ngIf="stats.general.best_streak">\n        \n            <ion-card class="red-background">\n                <div class="card-subsubtitle">From {{stats.general.heatmap_date}}</div>\n                <div class="card-title">{{stats.general.heatmap.length}} Workout<span *ngIf="stats.general.heatmap.length !== 1">s</span></div>\n                <div class="card-subtitle">In the last year</div>\n            </ion-card>  \n            \n            \n            <ion-card class="orange-background">\n                <div class="card-subsubtitle">From {{formatDate(stats.general.best_streak.start)}}</div>\n              <div class="card-title">{{stats.general.best_streak.streak}} Week<span *ngIf="stats.general.best_streak.streak !== 1">s</span></div>\n              <div class="card-subtitle">Longest Weekly Streak</div>\n            </ion-card>        \n        \n            <ion-card class="yellow-background">\n                <div class="card-subsubtitle">From {{stats.general.current_streak_date}}</div>\n                <div class="card-title">{{stats.general.current_streak}} Week<span *ngIf="stats.general.current_streak !== 1">s</span></div>\n              <div class="card-subtitle">Current Weekly Streak</div>\n            </ion-card>       \n            \n            <ion-card class="darkorange-background">\n                <div class="card-subsubtitle">{{formatDate(account.last_workout)}}</div>\n              <div class="card-title">{{account.last_workout_formatted}}</div>\n              <div class="card-subtitle">Last Workout</div>\n            </ion-card>              \n            \n        </div>        \n        \n    </div>\n    \n    \n    \n    <div class="stats-page-section exercise-stats" [hidden]="properties.activeTab !== \'exercise\' && properties.activeTab !== \'all\'">\n        \n        <h3 tappable class="stats-metric stats-exercise" (click)="openChangeExercise()">{{exercise.name}} <ion-icon name="create"></ion-icon></h3>\n        \n        <div class="stats-timeframes">\n            <button ion-button small (click)="changeStatsTimeframe(\'forever\')" [outline]="stats.timeframe !== \'forever\'">Lifetime</button>\n            <button ion-button small (click)="changeStatsTimeframe(\'1 Year\')" [outline]="stats.timeframe !== \'1 Year\'">1 Year</button>\n            <button ion-button small (click)="changeStatsTimeframe(\'6 Months\')" [outline]="stats.timeframe !== \'6 Months\'">6 Months</button>\n            <button ion-button small (click)="changeStatsTimeframe(\'1 Month\')" [outline]="stats.timeframe !== \'1 Month\'">1 Month</button>\n            <button ion-button small (click)="changeStatsTimeframe(\'1 Week\')" [outline]="stats.timeframe !== \'1 Week\'">1 Week</button>\n        </div>\n        <div [chart]="stats.chart"></div>\n        <h3 tappable class="stats-metric" (click)="openChangeMetric()">{{stats.metric}} <ion-icon name="create"></ion-icon></h3>\n        \n        <div class="extra-stats" *ngIf="stats.extra.best.date">\n        \n            <ion-card class="red-background">\n              <div class="card-subsubtitle">{{stats.extra.best.date}}</div>\n              <div class="card-title">{{stats.extra.best.data | number: \'1.0-0\'}}{{stats.units}}</div>\n              <div class="card-subtitle">Maximum</div>\n            </ion-card>  \n            \n            \n            <ion-card class="orange-background">\n              <div class="card-subsubtitle">{{stats.extra.worst.date}}</div>\n              <div class="card-title">{{stats.extra.worst.data | number: \'1.0-0\'}}{{stats.units}}</div>\n              <div class="card-subtitle">Minimum</div>\n            </ion-card>        \n        \n        </div>  \n\n\n        <div class="extra-stats" *ngIf="stats.extra.average.data">\n        \n            <ion-card class="yellow-background">\n              <div class="card-title">{{stats.extra.average.data | number: \'1.0-0\'}}{{stats.units}}</div>\n              <div class="card-subtitle">Average</div>\n            </ion-card>  \n            \n            \n            <ion-card class="darkorange-background">\n              <div class="card-title">{{stats.extra.growth.data | number: \'1.0-0\'}}{{stats.units}}</div>\n              <div class="card-subtitle">Growth</div>\n            </ion-card>        \n        \n        </div> \n\n        \n    </div> \n    \n    \n    <div class="stats-page-section pie-stats" [hidden]="properties.activeTab !== \'breakdown\' && properties.activeTab !== \'all\'">\n        <h2>Musclegroup Breakdown</h2>\n        <div [chart]="stats.piechart1"></div>\n        \n        <div class="extra-stats" *ngIf="stats.general.musclegroup.most_tracked.name">\n        \n            <ion-card class="red-background">\n                <div class="card-subsubtitle">{{stats.general.musclegroup.most_tracked.data}}{{account.units}}</div>  \n                <div class="card-title">{{stats.general.musclegroup.most_tracked.name}}</div>\n                <div class="card-subtitle">Most Volume</div>\n            </ion-card>  \n            \n            \n            <ion-card class="orange-background">\n                <div class="card-subsubtitle">{{stats.general.musclegroup.least_tracked.data}}{{account.units}}</div>\n                <div class="card-title">{{stats.general.musclegroup.least_tracked.name}}</div>\n                <div class="card-subtitle">Least Volume</div>\n            </ion-card>          \n        \n        </div>          \n        \n        \n        \n        <h2>Exercise Type Breakdown</h2>\n        <div [chart]="stats.piechart2"></div>    \n        \n        \n        <div class="extra-stats"  *ngIf="stats.general.exercise_type.least_tracked.name">\n        \n            <ion-card class="yellow-background">\n                <div class="card-subsubtitle">{{stats.general.exercise_type.most_tracked.data}}{{account.units}}</div>  \n                <div class="card-title">{{stats.general.exercise_type.most_tracked.name}}</div>\n                <div class="card-subtitle">Most Volume</div>\n            </ion-card>  \n            \n            \n            <ion-card class="darkorange-background">\n                <div class="card-subsubtitle">{{stats.general.exercise_type.least_tracked.data}}{{account.units}}</div>\n                <div class="card-title">{{stats.general.exercise_type.least_tracked.name}}</div>\n                <div class="card-subtitle">Least Volume</div>\n            </ion-card>        \n        \n        </div>         \n        \n        \n    </div>\n    \n    \n    \n</ion-content>\n`/*ion-inline-end:"D:\Taylor\Documents\Websites\intensity2\src\pages\stats\stats.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_4__providers_account_account__["a" /* AccountProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_5__providers_chart_chart__["a" /* ChartProvider */], __WEBPACK_IMPORTED_MODULE_6__providers_diary_diary__["a" /* DiaryProvider */], __WEBPACK_IMPORTED_MODULE_7__providers_exercise_exercise__["a" /* ExerciseProvider */]])
    ], StatsPage);
    return StatsPage;
}());

//# sourceMappingURL=stats.js.map

/***/ }),

/***/ 385:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChangeExerciseModal; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_exercise_exercise__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ChangeExerciseModal = (function () {
    function ChangeExerciseModal(platform, params, viewCtrl, toastCtrl, exerciseProvider, storage, alertCtrl) {
        var _this = this;
        this.platform = platform;
        this.params = params;
        this.viewCtrl = viewCtrl;
        this.toastCtrl = toastCtrl;
        this.exerciseProvider = exerciseProvider;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.properties = { userid: 0, search: "", activeTab: "exercises" };
        this.loading = { recent: false };
        this.recentExercises = this.params.data.exercises;
        this.musclegroups = ["Rectus Abdominis", "Biceps", "Deltoids", "Erector Spinae", "Gastrocnemius", "Soleus", "Gluteus", "Hamstrings", "Latissimus Dorsi", "Rhomboids", "Obliques", "Pectoralis", "Quadriceps", "Trapezius", "Triceps", "Forearms"];
        this.exerciseTypes = ["Squat", "Press", "Deadlift", "Pull", "Isolation"];
        if (!this.recentExercises) {
            this.getRecentExercises();
        }
        this.storage.get("userid").then(function (data) {
            _this.properties.userid = data;
        });
    }
    ChangeExerciseModal.prototype.checkOwnership = function (userid) {
        return this.properties.userid === parseInt(userid);
    };
    ChangeExerciseModal.prototype.getRecentExercises = function () {
        var _this = this;
        this.loading.recent = true;
        this.storage.get("recentexercises").then(function (exercises) {
            if (exercises && _this.loading.recent) {
                _this.recentExercises = exercises;
                if (_this.recentExercises.length > 0) {
                    _this.properties.activeTab = "recent";
                }
            }
        });
        this.exerciseProvider.getRecentExercises().then(function (data) {
            _this.loading.recent = false;
            _this.recentExercises = data;
            if (_this.recentExercises.length > 0) {
                _this.properties.activeTab = "recent";
            }
        });
    };
    ChangeExerciseModal.prototype.searchCancelled = function () {
        this.properties.search = '';
    };
    ChangeExerciseModal.prototype.openViewDetails = function (ev, exercise) {
        var _this = this;
        ev.preventDefault();
        ev.stopPropagation();
        var alert = this.alertCtrl.create({
            title: exercise.name,
            message: "<strong>Musclegroups:</strong> " + exercise.musclegroup + "<br><strong>Exercise Types:</strong> " + exercise.type,
            buttons: [
                {
                    text: 'Dismiss',
                    role: 'cancel'
                },
                {
                    text: 'Select',
                    handler: function (data) {
                        _this.selectExercise(exercise);
                    }
                }
            ]
        });
        alert.present();
    };
    ChangeExerciseModal.prototype.selectExercise = function (exercise) {
        if (exercise.exerciseid) {
            exercise.id = exercise.exerciseid;
        } //for recent exercises
        this.viewCtrl.dismiss(exercise);
    };
    ChangeExerciseModal.prototype.selectExerciseType = function (type) {
        this.viewCtrl.dismiss({ selectedType: type });
    };
    ChangeExerciseModal.prototype.selectMusclegroup = function (musclegroup) {
        this.viewCtrl.dismiss({ selectedMusclegroup: musclegroup });
    };
    ChangeExerciseModal.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    ChangeExerciseModal = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'change-exercise',template:/*ion-inline-start:"D:\Taylor\Documents\Websites\intensity2\src\modals\change-exercise\change-exercise.html"*/`<ion-header>\n    <ion-toolbar color="primary">\n        <ion-title>\n            Select Exercise\n        </ion-title>\n        <ion-buttons start>\n            <button ion-button (click)="dismiss()">\n                <span ion-text showWhen="ios">Cancel</span>\n                <ion-icon name="md-close" showWhen="android, windows"></ion-icon>\n            </button>\n        </ion-buttons>\n    </ion-toolbar>\n</ion-header>\n\n\n\n<ion-content>\n    \n    \n    <ion-searchbar\n        [(ngModel)]="properties.search"\n        [showCancelButton]="shouldShowCancel"\n        (ionCancel)="searchCancelled()"\n        placeholder="Search Exercises"\n        class="flat-search">\n    </ion-searchbar>   \n\n    <ion-segment color="primary" [(ngModel)]="properties.activeTab">\n        <ion-segment-button value="exercises">\n            Exercises\n        </ion-segment-button>        \n        <ion-segment-button value="musclegroups">\n            Musclegroups\n        </ion-segment-button>\n      <ion-segment-button value="types">\n            Exercise Types\n      </ion-segment-button>      \n    </ion-segment>      \n    \n    \n    \n    \n    \n    <ion-list class="add-diary-list" *ngIf="properties.activeTab===\'exercises\'">\n        <button ion-item detail-none *ngFor="let exercise of recentExercises | exerciseSearch:properties.search; let i = index" (click)="selectExercise(exercise)">\n            {{exercise.name}}\n            <ion-icon name=\'more\' item-end (click)="openViewDetails($event, exercise)"></ion-icon>\n        </button> \n    </ion-list>\n    \n    \n    <ion-list class="add-diary-list"  *ngIf="properties.activeTab===\'musclegroups\'">\n        <button ion-item detail-none *ngFor="let musclegroup of musclegroups; let i = index" (click)="selectMusclegroup(musclegroup)">\n            {{musclegroup}}\n        </button> \n    </ion-list>    \n\n    <ion-list class="add-diary-list"  *ngIf="properties.activeTab===\'types\'">\n        <button ion-item detail-none *ngFor="let type of exerciseTypes; let i = index" (click)="selectExerciseType(type)">\n            {{type}}\n        </button> \n    </ion-list>   \n\n    \n</ion-content>`/*ion-inline-end:"D:\Taylor\Documents\Websites\intensity2\src\modals\change-exercise\change-exercise.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ToastController */], __WEBPACK_IMPORTED_MODULE_2__providers_exercise_exercise__["a" /* ExerciseProvider */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], ChangeExerciseModal);
    return ChangeExerciseModal;
}());

//# sourceMappingURL=change-exercise.js.map

/***/ }),

/***/ 386:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginModal; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_authentication_authentication__ = __webpack_require__(71);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LoginModal = (function () {
    function LoginModal(platform, params, viewCtrl, auth, toastCtrl) {
        this.platform = platform;
        this.params = params;
        this.viewCtrl = viewCtrl;
        this.auth = auth;
        this.toastCtrl = toastCtrl;
        this.user = {
            email: "",
            password: "",
            errors: {}
        };
        this.properties = { loading: false, activeForm: "login" };
        this.errors = {};
    }
    LoginModal.prototype.facebookLogin = function () {
        var _this = this;
        this.errors = {};
        this.auth.loginFb().then(function () {
            _this.user = {};
            _this.viewCtrl.dismiss(true);
        })
            .catch(function (e) {
            _this.errors.facebookLogin = e.errorMessage ? e.errorMessage : e;
        });
    };
    LoginModal.prototype.login = function () {
        var _this = this;
        this.errors = {};
        this.properties.loading = true;
        this.auth.login(this.user.email, this.user.password).then(function () {
            _this.user = {};
            _this.properties.loading = false;
            _this.viewCtrl.dismiss(true);
        })
            .catch(function (e) {
            _this.properties.loading = false;
            _this.errors.login = e;
        });
    };
    LoginModal.prototype.register = function () {
        var _this = this;
        this.errors = {};
        if (this.user.password !== this.user.repeatPassword) {
            this.errors.register = "Password do not match";
            return;
        }
        this.properties.loading = true;
        this.auth.register(this.user.email, this.user.password).then(function () {
            //this.user = {};
            //loading is turned off in login
            _this.login();
        })
            .catch(function (e) {
            _this.properties.loading = false;
            _this.errors.register = e;
        });
    };
    LoginModal.prototype.resetPassword = function () {
        var _this = this;
        this.errors = {};
        this.properties.loading = true;
        this.auth.resetPassword(this.user.email).then(function () {
            _this.properties.loading = false;
            var toast = _this.toastCtrl.create({
                message: 'An email to reset your password has been sent.',
                duration: 3000
            });
            toast.present();
            _this.user = {};
        })
            .catch(function (e) {
            _this.properties.loading = false;
            _this.errors.reset = e;
        });
    };
    LoginModal.prototype.dismiss = function () {
        //create dummy user
        this.viewCtrl.dismiss();
    };
    LoginModal = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'login',template:/*ion-inline-start:"D:\Taylor\Documents\Websites\intensity2\src\modals\login\login.html"*/`<ion-header>\n    <ion-toolbar color="primary">\n        <ion-title>\n            Login\n        </ion-title>\n        <ion-buttons start>\n            <button ion-button (click)="dismiss()">\n                <span ion-text color="light">Skip</span>\n            </button>\n        </ion-buttons>\n    </ion-toolbar>\n</ion-header>\n\n\n\n<ion-content>\n    \n    <div class=\'login-intro\'>\n        <img src="assets/imgs/cloud.png"/>\n        <p>Create an account to keep your data safe.</p>\n    </div>\n    \n    <div class=\'facebook-login\'>        \n        <button ion-button icon-start (click)="facebookLogin()">\n            <ion-icon name="logo-facebook"></ion-icon>\n            Login with Facebook\n        </button>\n        \n        <p class="login-error" *ngIf="errors.facebookLogin">{{errors.facebookLogin}}</p>  \n        \n    </div>\n    \n    <div class="login-loading" *ngIf="properties.loading">\n        <ion-spinner></ion-spinner>\n    </div>\n    \n    <form class="login-form" ion-list (ngSubmit)="login()" *ngIf="properties.activeForm === \'login\' && !properties.loading">\n\n        <ion-item>\n            <ion-label floating>Email</ion-label>\n            <ion-input type="email" name="email" required [(ngModel)]="user.email"></ion-input>\n        </ion-item>\n\n        <ion-item>\n            <ion-label floating>Password</ion-label>\n            <ion-input type="password" name="password" required [(ngModel)]="user.password"></ion-input>\n        </ion-item>\n          \n          \n        <p class="login-error" *ngIf="errors.login">{{errors.login}}</p>\n        \n        <button ion-button type=\'submit\'>\n            Login\n        </button>  \n        \n        <a ion-button color="light" (click)="properties.activeForm = \'register\'">\n            Register\n        </a>\n\n        \n      \n        \n        \n         <a class="forgot-password" (click)="properties.activeForm = \'resetPassword\'">Forgot Password?</a> \n          \n    </form>  \n    \n    \n    \n    <form class="login-form" ion-list (ngSubmit)="register()" *ngIf="properties.activeForm === \'register\' && !properties.loading">\n\n        <ion-item>\n            <ion-label floating>Email</ion-label>\n            <ion-input type="Email" name="email" required [(ngModel)]="user.email"></ion-input>\n        </ion-item>\n\n        <ion-item>\n            <ion-label floating>Password</ion-label>\n            <ion-input type="password" name="password" required [(ngModel)]="user.password"></ion-input>\n        </ion-item>\n          \n        <ion-item>\n            <ion-label floating>Repeat Password</ion-label>\n            <ion-input type="password" name="repeatPassword" required [(ngModel)]="user.repeatPassword"></ion-input>\n        </ion-item>    \n          \n        <p class="login-error" *ngIf="errors.register">{{errors.register}}</p>  \n\n        \n        <a ion-button color="light" (click)="properties.activeForm = \'login\'">\n            Login\n        </a>        \n        \n        <button ion-button  type=\'submit\'>\n            Register\n        </button>           \n          \n\n\n        \n       \n        \n        \n    </form>     \n    \n    \n    \n    \n    <form class="login-form" ion-list (ngSubmit)="resetPassword()" *ngIf="properties.activeForm === \'resetPassword\' && !properties.loading">\n\n        <ion-item>\n            <ion-label floating>Email</ion-label>\n            <ion-input type="Email" name="email" required [(ngModel)]="user.email"></ion-input>\n        </ion-item>\n       \n        <p class="login-error" *ngIf="errors.reset">{{errors.reset}}</p>\n\n        <button ion-button  type=\'submit\'>\n            Reset\n        </button>           \n          \n        <a ion-button color="light" (click)="properties.activeForm = \'login\'">\n            Login\n        </a>\n\n        \n       \n        \n        \n    </form>       \n    \n    \n    \n</ion-content>`/*ion-inline-end:"D:\Taylor\Documents\Websites\intensity2\src\modals\login\login.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__providers_authentication_authentication__["a" /* AuthenticationProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ToastController */]])
    ], LoginModal);
    return LoginModal;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 387:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OfflineProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_settings__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_network__ = __webpack_require__(236);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/*
  Generated class for the ExerciseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var OfflineProvider = (function () {
    function OfflineProvider(http, storage, events, platform, network) {
        var _this = this;
        this.http = http;
        this.storage = storage;
        this.events = events;
        this.platform = platform;
        this.network = network;
        this.properties = { inProgress: false, heartbeatStarted: false, requestCount: 0 };
        this.completedRequests = [];
        this.network.onConnect().subscribe(function (data) {
            _this.events.publish("app:online");
            setTimeout(function () { _this.doRequests(); }, 2000);
        }, function (error) {
            //console.error(error)
        });
        this.network.onDisconnect().subscribe(function (data) {
            _this.events.publish("app:offline");
            //this.startHeartbeat();
        }, function (error) {
            //console.error(error)
        });
        this.platform.ready().then(function () {
            if ((!_this.network.type || _this.network.type === "none") && _this.platform.is("cordova")) {
                _this.events.publish("app:offline");
            }
            _this.storage.get("failedRequests").then(function (requests) {
                if (requests) {
                    if (requests.length > 0 && _this.network.type && _this.network.type !== "none") {
                        _this.doRequests();
                    }
                }
            });
        });
        this.events.subscribe("app:heartbeat", function () {
            _this.startHeartbeat();
        });
    }
    OfflineProvider.prototype.doRequests = function () {
        var _this = this;
        if (this.properties.inProgress) {
            return;
        }
        this.properties.inProgress = true;
        this.storage.get("session").then(function (session) {
            if (session) {
                _this.storage.get("failedRequests").then(function (requests) {
                    if (requests && requests.length > 0) {
                        _this.properties.requestCount = requests.length;
                        _this.completedRequests = [];
                        var _loop_1 = function () {
                            var request = requests[index];
                            _this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl, request).subscribe(function (res) {
                                _this.updateRequestCount();
                                if (res["success"] === true) {
                                    //remove requestid from item and add proper id
                                    var id = res["data"]["id"];
                                    var requestCopy = Object.assign({}, request);
                                    _this.updateStorage(id, requestCopy);
                                    //remove from storage
                                    _this.completedRequests.push(index);
                                }
                                else {
                                    _this.completedRequests.push(index); //wasnt an error from the internet, so remove it
                                }
                            }, function () {
                                _this.updateRequestCount();
                            });
                        };
                        for (var index in requests) {
                            _loop_1();
                        }
                    }
                    else {
                        _this.properties.inProgress = false;
                    }
                });
            }
            else {
                _this.properties.inProgress = false;
            }
        });
    };
    OfflineProvider.prototype.updateRequestCount = function () {
        var _this = this;
        this.properties.requestCount -= 1;
        if (this.properties.requestCount < 1) {
            this.properties.inProgress = false;
            this.events.publish("requests:completed");
            this.storage.get("failedRequests").then(function (requests) {
                if (requests) {
                    _this.completedRequests.sort(function (a, b) { return parseInt(b) - parseInt(a); });
                    for (var _i = 0, _a = _this.completedRequests; _i < _a.length; _i++) {
                        var requestIndex = _a[_i];
                        requests.splice(requestIndex, 1);
                    }
                    _this.storage.set("failedRequests", requests);
                }
            });
        }
    };
    OfflineProvider.prototype.startHeartbeat = function () {
        var _this = this;
        if (this.properties.heartbeatStarted) {
            return;
        }
        this.events.publish("app:offline");
        this.properties.heartbeatStarted = true;
        this.heartbeat = setInterval(function () {
            _this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl, { key: __WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiKey }).subscribe(function (res) {
                _this.events.publish("app:online");
                clearInterval(_this.heartbeat);
                _this.properties.heartbeatStarted = false;
                _this.doRequests();
            });
        }, 20000);
    };
    OfflineProvider.prototype.updateStorage = function (id, request) {
        var _this = this;
        if (request.action === "addresults") {
            this.storage.get("workouts").then(function (workouts) {
                if (workouts && workouts[request.assigneddate]) {
                    for (var index in workouts[request.assigneddate]) {
                        var workoutExercise = workouts[request.assigneddate][index];
                        if (workoutExercise.exerciseid === request.exerciseid) {
                            for (var setIndex in workoutExercise.sets) {
                                if (workoutExercise.sets[setIndex].requestId && workoutExercise.sets[setIndex].requestId === request.requestId) {
                                    workouts[request.assigneddate][index].sets[setIndex].requestId = null;
                                    workouts[request.assigneddate][index].sets[setIndex].id = id;
                                }
                            }
                        }
                    }
                    _this.storage.set("workouts", workouts);
                }
            });
        }
        else if (request.action === "savebodyweight") {
            this.storage.get("bodyweights").then(function (bodyweights) {
                if (bodyweights) {
                    for (var index in bodyweights) {
                        var bodyweight = bodyweights[index];
                        if (bodyweight.requestId === request.requestId) {
                            bodyweights[index].requestId = null;
                            bodyweights[index].id = id;
                        }
                    }
                    _this.storage.set("bodyweights", bodyweights);
                }
            });
        }
    };
    OfflineProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["m" /* Platform */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_network__["a" /* Network */]])
    ], OfflineProvider);
    return OfflineProvider;
}());

//# sourceMappingURL=offline.js.map

/***/ }),

/***/ 388:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PopoverPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_tools_timer__ = __webpack_require__(389);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_tools_calculator__ = __webpack_require__(391);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_tools_bodyweight__ = __webpack_require__(392);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_tools_help__ = __webpack_require__(394);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_timer_timer__ = __webpack_require__(136);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var PopoverPage = (function () {
    function PopoverPage(viewCtrl, modalCtrl, timerService) {
        this.viewCtrl = viewCtrl;
        this.modalCtrl = modalCtrl;
        this.timerService = timerService;
        this.properties = { timerRunning: false, stopwatchRunning: false };
        this.properties.stopwatchRunning = this.timerService.stopwatchProperties.started;
        this.properties.timerRunning = this.timerService.countdownTimerProperties.started;
    }
    PopoverPage.prototype.openTimer = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__components_tools_timer__["a" /* TimerModal */]);
        modal.present();
        this.close();
    };
    PopoverPage.prototype.openCalculator = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__components_tools_calculator__["a" /* CalculatorModal */]);
        modal.present();
        this.close();
    };
    PopoverPage.prototype.openBodyweight = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__components_tools_bodyweight__["a" /* BodyweightModal */]);
        modal.present();
        this.close();
    };
    PopoverPage.prototype.openHelp = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__components_tools_help__["a" /* HelpModal */]);
        modal.present();
        this.close();
    };
    PopoverPage.prototype.close = function () {
        this.viewCtrl.dismiss();
    };
    PopoverPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'tools-popover',template:/*ion-inline-start:"D:\Taylor\Documents\Websites\intensity2\src\components\tools\popover.html"*/`<ion-list>\n    <button ion-item (click)="openTimer()">Timer <span *ngIf="properties.timerRunning || properties.stopwatchRunning">(running)</span></button>\n    <button ion-item (click)="openCalculator()">Calculator</button>\n    <button ion-item (click)="openBodyweight()">Bodyweight</button>\n    <button ion-item (click)="openHelp()">Help</button>\n</ion-list>`/*ion-inline-end:"D:\Taylor\Documents\Websites\intensity2\src\components\tools\popover.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */], __WEBPACK_IMPORTED_MODULE_6__providers_timer_timer__["a" /* TimerService */]])
    ], PopoverPage);
    return PopoverPage;
}());

//# sourceMappingURL=popover.js.map

/***/ }),

/***/ 389:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TimerModal; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_timer_timer__ = __webpack_require__(136);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TimerModal = (function () {
    function TimerModal(viewCtrl, timerService, alertCtrl) {
        this.viewCtrl = viewCtrl;
        this.timerService = timerService;
        this.alertCtrl = alertCtrl;
        this.properties = { activeTab: "stopwatch", stopwatchStarted: false, timerStarted: false, stopwatchInitialStart: true, timerInitialStart: true };
        this.timerOptions = { time: 60000, timeRaw: "1970-01-01T00:01:00.000Z", playSound: false, repeat: false, force: false };
    }
    TimerModal.prototype.ionViewDidEnter = function () {
        this.initialSetup();
    };
    TimerModal.prototype.initialSetup = function () {
        this.properties.stopwatchStarted = this.timerService.stopwatchProperties.started;
        this.properties.timerStarted = this.timerService.countdownTimerProperties.started;
        this.timerOptions.playSound = this.timerService.countdownTimerProperties.playSound;
        this.timerOptions.repeat = this.timerService.countdownTimerProperties.repeat;
        this.timerOptions.force = this.timerService.countdownTimerProperties.force;
    };
    TimerModal.prototype.getStopwatchTime = function () {
        return this.formatTime(this.timerService.stopwatch);
    };
    TimerModal.prototype.startStopwatch = function () {
        this.properties.stopwatchStarted = true;
        this.properties.stopwatchInitialStart = false;
        this.timerService.startStopwatch();
    };
    TimerModal.prototype.stopStopwatch = function () {
        this.properties.stopwatchStarted = false;
        this.timerService.stopStopwatch();
    };
    TimerModal.prototype.toggleStopwatch = function () {
        if (this.properties.stopwatchStarted) {
            this.stopStopwatch();
        }
        else {
            this.startStopwatch();
        }
    };
    TimerModal.prototype.resetStopwatch = function () {
        this.timerService.resetStopwatch();
    };
    TimerModal.prototype.stopwatchNotZero = function () {
        return this.timerService.stopwatch > 0;
    };
    TimerModal.prototype.getTimerTime = function () {
        this.properties.timerStarted = this.timerService.countdownTimerProperties.started;
        return this.formatTime(this.timerService.countdownTimer);
    };
    TimerModal.prototype.getRawTimerTime = function () {
        return this.timerService.countdownTimer;
    };
    TimerModal.prototype.startTimer = function () {
        this.properties.timerStarted = true;
        this.properties.timerInitialStart = false;
        this.timerService.startTimer();
    };
    TimerModal.prototype.stopTimer = function () {
        this.properties.timerStarted = false;
        this.timerService.stopTimer();
    };
    TimerModal.prototype.toggleTimer = function () {
        if (this.properties.timerStarted) {
            this.stopTimer();
        }
        else {
            this.startTimer();
        }
    };
    TimerModal.prototype.resetTimer = function () {
        this.timerService.resetTimer();
    };
    TimerModal.prototype.updateBackgroundNotifications = function () {
        var _this = this;
        if (this.timerOptions.force) {
            var alert_1 = this.alertCtrl.create({
                title: 'Warning',
                subTitle: 'Are you sure you want to enable this?',
                message: 'Background notifications are experimental. Notifications are not guarenteed to work correctly on all devices. Use at your own risk.',
                buttons: [
                    {
                        text: 'No',
                        role: 'cancel',
                        handler: function (data) {
                            _this.timerOptions.force = false;
                        }
                    },
                    {
                        text: 'Yes',
                        handler: function (data) {
                        }
                    },
                ]
            });
            alert_1.present();
        }
        this.updateTimerProperties();
    };
    TimerModal.prototype.updateTimerProperties = function () {
        var date = new Date(this.timerOptions.timeRaw);
        this.timerOptions.time = ((date.getMinutes() * 60) + date.getSeconds()) * 1000;
        this.timerService.updateTimerOptions(this.timerOptions);
    };
    TimerModal.prototype.formatTime = function (time) {
        if (time > 59999) {
            var total_1 = time / 60000;
            var m = Math.floor(total_1);
            var s_1 = Math.floor(((total_1 - m) * 60));
            return m + ":" + ((s_1 < 10 ? '0' : '') + s_1);
        }
        var total = time / 1000;
        var s = Math.floor(total);
        var ms = Math.floor(((total - s) * 100));
        return ((s < 10 ? '0' : '') + s) + ":" + ((ms < 10 ? '0' : '') + ms);
    };
    TimerModal.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    TimerModal = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'timer',template:/*ion-inline-start:"D:\Taylor\Documents\Websites\intensity2\src\components\tools\timer.html"*/`<ion-header>\n    <ion-toolbar color="primary">\n        <ion-title>\n            Timer\n        </ion-title>\n        <ion-buttons start>\n            <button ion-button (click)="dismiss()">\n                <span ion-text showWhen="ios">Cancel</span>\n                <ion-icon name="md-close" showWhen="android, windows"></ion-icon>\n            </button>\n        </ion-buttons>\n    </ion-toolbar>\n</ion-header>\n\n\n\n<ion-content>\n    \n    \n    <ion-segment [(ngModel)]="properties.activeTab">\n        <ion-segment-button value="stopwatch">\n            Stopwatch\n        </ion-segment-button>\n        <ion-segment-button value="timer">\n            Countdown\n        </ion-segment-button>\n    </ion-segment>    \n    \n    <div *ngIf="properties.activeTab === \'stopwatch\'" >\n        <div tappable class="stopwatch timer" (click)="toggleStopwatch()" [ngClass]="{\'timer-stopped\':!properties.stopwatchStarted && !properties.stopwatchInitialStart && stopwatchNotZero()}">\n            <div class="time">{{getStopwatchTime()}}</div>\n            <a class="timer-actions">\n                <ion-icon name="play"  *ngIf="!properties.stopwatchStarted"></ion-icon>\n                <ion-icon name="pause" *ngIf="properties.stopwatchStarted"></ion-icon>\n            </a>\n        </div>\n        \n        <div class="timer-extra-actions">\n            <button color="primary" ion-button (click)="resetStopwatch()">Reset </button>\n        </div>\n    </div>\n    \n    \n    <div *ngIf="properties.activeTab === \'timer\'">\n\n        <div tappable class="stopwatch timer" (click)="toggleTimer()" [ngClass]="{\'timer-stopped\':!properties.timerStarted && !properties.timerInitialStart && getRawTimerTime() > 0}">\n            <div class="time">{{getTimerTime()}}</div>\n            <a class="timer-actions">\n                <ion-icon name="play"  [hidden]="properties.timerStarted"></ion-icon>\n                <ion-icon name="pause" [hidden]="!properties.timerStarted"></ion-icon>\n            </a>\n        </div>\n        \n        <div class="timer-extra-actions">\n            <button color="primary" ion-button (click)="resetTimer()">Reset </button>\n            \n\n        </div>        \n        \n        <ion-list class="timer-options" (click)="showMore = !showMore">\n            <ion-list-header>\n                Timer Options\n                <ion-icon [name]="showMore ? \'md-arrow-dropup\' :\'md-arrow-dropdown\'" item-end></ion-icon>\n            </ion-list-header>\n            <ion-item-group *ngIf="showMore">\n                <ion-item>\n                    <ion-label>Countdown From</ion-label>\n                    <ion-datetime displayFormat="mm:ss" [(ngModel)]="timerOptions.timeRaw" (ionChange)="updateTimerProperties()"></ion-datetime>\n                </ion-item>            \n                <ion-item>\n                    <ion-label>Play Sound At 0</ion-label>\n                    <ion-checkbox [(ngModel)]="timerOptions.playSound" (ionChange)="updateTimerProperties()"></ion-checkbox>   \n                </ion-item>            \n                <ion-item>\n                    <ion-label>Repeat</ion-label>\n                    <ion-checkbox [(ngModel)]="timerOptions.repeat" (ionChange)="updateTimerProperties()"></ion-checkbox>   \n                </ion-item>   \n                <ion-item>\n                    <ion-label>Force Background Notifications (Experimental)</ion-label>\n                    <ion-checkbox [(ngModel)]="timerOptions.force" (ionChange)="updateBackgroundNotifications()"></ion-checkbox>   \n                </ion-item>                 \n            </ion-item-group>        \n        </ion-list>   \n    </div>\n    \n</ion-content>`/*ion-inline-end:"D:\Taylor\Documents\Websites\intensity2\src\components\tools\timer.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__providers_timer_timer__["a" /* TimerService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], TimerModal);
    return TimerModal;
}());

//# sourceMappingURL=timer.js.map

/***/ }),

/***/ 391:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CalculatorModal; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CalculatorModal = (function () {
    function CalculatorModal(viewCtrl, storage, alertCtrl) {
        var _this = this;
        this.viewCtrl = viewCtrl;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.properties = { activeTab: "1rm" };
        this.fields = { reps: "", weight: "", bodyweight: "", gender: "", barweight: "", fullweight: "", units: "", kgplates: [20, 15, 10, 5, 2.5, 1.25], lbsplates: [45, 35, 25, 10, 5, 2.5], workweight: "", warmupmethod: "startingstrength", warmupCustomSets: [{ reps: 10, weight: "bar", percentage: "" }] };
        this.calculatedWarmupSets = [];
        this.storage.get("account").then(function (data) {
            _this.account = data;
            _this.fields.units = _this.account.units;
            if (_this.fields.units === "kg") {
                _this.fields.barweight = 20;
            }
            else if (_this.fields.units === "lbs") {
                _this.fields.barweight = 45;
            }
        });
        this.storage.get("customwarmup").then(function (data) {
            if (data) {
                _this.fields.warmupCustomSets = data;
            }
        });
    }
    CalculatorModal.prototype.getMax = function () {
        var max = 0;
        if (this.fields.reps < 10) {
            max = Math.round((this.fields.weight / (1.0278 - 0.0278 * this.fields.reps)) * 100) / 100;
        }
        else {
            max = Math.round((this.fields.weight / 0.75) * 100) / 100;
        }
        return max;
    };
    CalculatorModal.prototype.getWilks = function () {
        var wilks = 0;
        if (this.fields.gender === "Female") {
            var a = 594.31747775582, b = -27.23842536447, c = 0.82112226871, d = -0.00930733913, e = 0.00004731582, f = -0.00000009054;
        }
        else {
            var a = -216.0475144, b = 16.2606339, c = -0.002388645, d = -0.00113732, e = 7.01863E-06, f = -1.291E-08;
        }
        var wilksCe = 500 / (a + (b * this.fields.bodyweight) + (c * (Math.pow(this.fields.bodyweight, 2))) + (d * (Math.pow(this.fields.bodyweight, 3))) + (e * (Math.pow(this.fields.bodyweight, 4))) + (f * (Math.pow(this.fields.bodyweight, 5))));
        wilks = Math.round(wilksCe * this.fields.weight * 100) / 100;
        return wilks;
    };
    CalculatorModal.prototype.getPlates = function () {
        var weight = (this.fields.fullweight - this.fields.barweight) / 2;
        var plates = [];
        if (this.fields.units === "kg") {
            plates = this.fields.kgplates;
        }
        else if (this.fields.units === "lbs") {
            plates = this.fields.lbsplates;
        }
        var i = 0, platecount = plates.map(function () { return 0; }); // returns an array and for each element of coins zero
        while (i < plates.length) {
            while (plates[i] <= weight) {
                weight -= plates[i];
                platecount[i]++;
            }
            i++;
        }
        var returnString = "";
        for (var index in platecount) {
            if (platecount[index] > 0) {
                var count = platecount[index];
                returnString = returnString + count + "x" + plates[index] + this.fields.units + ", ";
            }
        }
        returnString = returnString.replace(/(^[,\s]+)|([,\s]+$)/g, '');
        return returnString;
    };
    CalculatorModal.prototype.saveWarmupCustomSets = function () {
        this.storage.set("customwarmup", this.fields.warmupCustomSets);
    };
    CalculatorModal.prototype.addWarmupSet = function () {
        this.fields.warmupCustomSets.push({ reps: "", weight: "", percentage: "" });
        this.saveWarmupCustomSets();
    };
    CalculatorModal.prototype.removeWarmupSet = function (index) {
        this.fields.warmupCustomSets.splice(index, 1);
        this.saveWarmupCustomSets();
    };
    CalculatorModal.prototype.calculateWarmups = function () {
        var warmupSets = [];
        if (this.fields.warmupmethod === "startingstrength") {
            warmupSets = [
                { reps: 5, weight: "bar", percentage: "" },
                { reps: 5, weight: "bar", percentage: "" },
                { reps: 5, weight: "workweight", percentage: 40 },
                { reps: 3, weight: "workweight", percentage: 60 },
                { reps: 2, weight: "workweight", percentage: 80 },
            ];
        }
        else if (this.fields.warmupmethod === "507085") {
            warmupSets = [
                { reps: 5, weight: "bar", percentage: "" },
                { reps: 5, weight: "bar", percentage: "" },
                { reps: 5, weight: "workweight", percentage: 50 },
                { reps: 3, weight: "workweight", percentage: 70 },
                { reps: 2, weight: "workweight", percentage: 85 },
            ];
        }
        else if (this.fields.warmupmethod === "custom") {
            warmupSets = this.fields.warmupCustomSets;
        }
        var calculatedSets = [];
        for (var _i = 0, warmupSets_1 = warmupSets; _i < warmupSets_1.length; _i++) {
            var set = warmupSets_1[_i];
            var calculatedSet = { reps: set.reps, weight: 0, percentage: set.percentage, plates: "" };
            if (set.weight === "bar") {
                calculatedSet.weight = this.fields.barweight;
                calculatedSet.plates = "Just the bar";
            }
            else {
                var result = this.calculateWarmupWeight(this.fields.workweight * (set.percentage / 100));
                calculatedSet.weight = result.weight;
                calculatedSet.plates = result.plates;
            }
            calculatedSets.push(calculatedSet);
        }
        return calculatedSets;
    };
    CalculatorModal.prototype.calculateWarmupWeight = function (totalWeight) {
        var weight = (totalWeight - this.fields.barweight) / 2;
        var roundedWeight = 0;
        var plates = [];
        if (this.fields.units === "kg") {
            plates = this.fields.kgplates;
        }
        else if (this.fields.units === "lbs") {
            plates = this.fields.lbsplates;
        }
        var i = 0, platecount = plates.map(function () { return 0; }); // returns an array and for each element of coins zero
        while (i < plates.length) {
            while (plates[i] <= weight) {
                weight -= plates[i];
                platecount[i]++;
            }
            i++;
        }
        var returnString = "";
        for (var index in platecount) {
            if (platecount[index] > 0) {
                var count = platecount[index];
                returnString = returnString + count + "x" + plates[index] + this.fields.units + ", ";
                roundedWeight = roundedWeight + (count * plates[index]);
            }
        }
        returnString = returnString.replace(/(^[,\s]+)|([,\s]+$)/g, '');
        roundedWeight = (roundedWeight * 2) + this.fields.barweight;
        return { weight: roundedWeight, plates: returnString };
    };
    CalculatorModal.prototype.openWarmupPlates = function (set) {
        var alert = this.alertCtrl.create({
            title: 'Plates to use per side',
            subTitle: set.reps + ' reps at ' + set.weight + this.fields.units + (set.percentage ? " (" + set.percentage + "% of work weight)" : ""),
            message: set.plates,
            buttons: [
                {
                    text: 'Dismiss',
                    role: 'cancel'
                }
            ]
        });
        alert.present();
    };
    CalculatorModal.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    CalculatorModal = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'calculator',template:/*ion-inline-start:"D:\Taylor\Documents\Websites\intensity2\src\components\tools\calculator.html"*/`<ion-header>\n    <ion-toolbar color="primary">\n        <ion-title>\n            Calculator\n        </ion-title>\n        <ion-buttons start>\n            <button ion-button (click)="dismiss()">\n                <span ion-text showWhen="ios">Cancel</span>\n                <ion-icon name="md-close" showWhen="android, windows"></ion-icon>\n            </button>\n        </ion-buttons>\n    </ion-toolbar>\n</ion-header>\n\n\n\n<ion-content>\n\n    <ion-segment [(ngModel)]="properties.activeTab">\n        <ion-segment-button value="1rm">\n            1RM\n        </ion-segment-button>\n        <ion-segment-button value="wilks">\n            Wilks\n        </ion-segment-button>\n        <ion-segment-button value="plates">\n            Plates\n        </ion-segment-button>\n        <ion-segment-button value="warmup">\n            Warmup\n        </ion-segment-button>        \n    </ion-segment> \n    \n    \n    \n    <ion-list class=\'calculator\' *ngIf="properties.activeTab === \'1rm\'">\n        <ion-item>\n            <ion-label floating>Reps</ion-label>\n            <ion-input name="reps" type="number" [(ngModel)]="fields.reps"></ion-input>\n        </ion-item>            \n        <ion-item>\n            <ion-label floating>Weight</ion-label>\n            <ion-input name="weight" type="number" [(ngModel)]="fields.weight"></ion-input>\n        </ion-item> \n        <ion-item *ngIf="fields.reps && fields.weight" class="result">\n            Estimated Max: {{getMax() | number:\'1.0-2\'}}{{account.units}}\n        </ion-item>\n    </ion-list>  \n\n\n    <ion-list class=\'calculator\' *ngIf="properties.activeTab === \'wilks\'">\n        <ion-item>\n            <ion-label floating>Bodyweight</ion-label>\n            <ion-input name="bodyweight" type="number" [(ngModel)]="fields.bodyweight"></ion-input>\n        </ion-item>            \n        <ion-item>\n            <ion-label floating>Weight Lifted</ion-label>\n            <ion-input name="weight" type="number" [(ngModel)]="fields.weight"></ion-input>\n        </ion-item> \n        <ion-item>\n            <ion-label floating>Gender</ion-label>\n            <ion-select [(ngModel)]="fields.gender">\n                <ion-option value="male">Male</ion-option>\n                <ion-option value="female">Female</ion-option>\n                <ion-option value="other">Other</ion-option>\n            </ion-select>\n        </ion-item>         \n        <ion-item *ngIf="fields.bodyweight && fields.weight && fields.gender" class="result">\n            Wilks Points: {{getWilks() | number:\'1.0-2\'}}\n        </ion-item>\n    </ion-list>  \n\n\n    <ion-list class=\'calculator\' *ngIf="properties.activeTab === \'plates\'">\n        <ion-item>\n            <ion-label floating>Units</ion-label>\n            <ion-select [(ngModel)]="fields.units">\n                <ion-option value="kg">kg</ion-option>\n                <ion-option value="lbs">lbs</ion-option>\n            </ion-select>\n        </ion-item>      \n        \n        <ion-item *ngIf="fields.units === \'kg\'">\n            <ion-label floating>Plates</ion-label>\n            <ion-select multiple="true" [(ngModel)]="fields.kgplates">\n                <ion-option value="50">50</ion-option>\n                <ion-option value="30">30</ion-option>\n                <ion-option value="25">25</ion-option>\n                <ion-option value="20">20</ion-option>\n                <ion-option value="15">15</ion-option>\n                <ion-option value="10">10</ion-option>\n                <ion-option value="5">5</ion-option>\n                <ion-option value="2.5">2.5</ion-option>\n                <ion-option value="1.25">1.25</ion-option>\n                <ion-option value="0.5">0.5</ion-option>\n                <ion-option value="0.25">0.25</ion-option>\n                \n            </ion-select>\n        </ion-item>    \n        \n        <ion-item *ngIf="fields.units === \'lbs\'">\n            <ion-label floating>Plates</ion-label>\n            <ion-select multiple="true" [(ngModel)]="fields.lbsplates">\n                <ion-option value="110">110</ion-option>\n                <ion-option value="65">65</ion-option>\n                <ion-option value="55">55</ion-option>\n                <ion-option value="45">45</ion-option>\n                <ion-option value="35">35</ion-option>\n                <ion-option value="25">25</ion-option>\n                <ion-option value="10">15</ion-option>\n                <ion-option value="5">5</ion-option>\n                <ion-option value="2.5">2.5</ion-option>\n                <ion-option value="1.25">1.25</ion-option>\n                <ion-option value="0.5">0.5</ion-option>\n                \n            </ion-select>\n        </ion-item>         \n        \n        \n        \n        <ion-item>\n            <ion-label floating>Bar Weight</ion-label>\n            <ion-input name="barweight" type="number" [(ngModel)]="fields.barweight"></ion-input>\n        </ion-item>            \n        <ion-item>\n            <ion-label floating>Full Weight (including bar)</ion-label>\n            <ion-input name="fullweight" type="number" [(ngModel)]="fields.fullweight"></ion-input>\n        </ion-item>         \n        <ion-item *ngIf="fields.units && fields.barweight && fields.fullweight" class="result plates-result">\n            Plates Per Side: <br>{{getPlates()}}\n        </ion-item>\n    </ion-list> \n    \n    \n    <ion-list class=\'calculator\' *ngIf="properties.activeTab === \'warmup\'">\n        \n        <ion-item>\n            <ion-label floating>Units</ion-label>\n            <ion-select [(ngModel)]="fields.units">\n                <ion-option value="kg">kg</ion-option>\n                <ion-option value="lbs">lbs</ion-option>\n            </ion-select>\n        </ion-item>         \n        \n        <ion-item>\n            <ion-label floating>Bar Weight</ion-label>\n            <ion-input name="barweight" type="number" [(ngModel)]="fields.barweight"></ion-input>\n        </ion-item> \n\n        <ion-item>\n            <ion-label floating>Work Weight</ion-label>\n            <ion-input name="workweight" type="number" [(ngModel)]="fields.workweight"></ion-input>\n        </ion-item> \n        \n        <ion-item>\n            <ion-label floating>Warmup Method</ion-label>\n            <ion-select [(ngModel)]="fields.warmupmethod">\n                <ion-option value="startingstrength">Starting Strength</ion-option>\n                <ion-option value="507085">50% - 70% - 85%</ion-option>\n                <ion-option value="custom">Custom</ion-option>        \n            </ion-select>\n        </ion-item> \n        \n        <div class=\'warmup-custom\' *ngIf="fields.warmupmethod === \'custom\'">\n            <div class="warmup-set" *ngFor="let set of fields.warmupCustomSets; let i = index;">\n                <h6>Warmup Set {{i + 1}}</h6>\n            \n                <div class="warm-set-data">\n                    <ion-item>\n                        <ion-label floating>Reps</ion-label>\n                        <ion-input type="number" [(ngModel)]="set.reps" (ionChange)="saveWarmupCustomSets()"></ion-input>\n                    </ion-item>  \n                    <ion-item>\n                        <ion-label floating>Weight</ion-label>\n                        <ion-select [(ngModel)]="set.weight" (ionChange)="saveWarmupCustomSets()">\n                            <ion-option value="bar">Bar only</ion-option>\n                            <ion-option value="workweight">Work Weight</ion-option>\n                        </ion-select>\n                    </ion-item>    \n                    <ion-item *ngIf="set.weight === \'workweight\'">\n                        <ion-label floating>%</ion-label>\n                        <ion-input type="number" [(ngModel)]="set.percentage" (ionChange)="saveWarmupCustomSets()"></ion-input>\n                    </ion-item>  \n\n                    <ion-icon name="trash" (click)="removeWarmupSet(i)"></ion-icon>    \n\n                </div>\n\n \n            </div>\n            \n            <button ion-button (click)="addWarmupSet()">\n                <span ion-text>Add Set</span>\n            </button>             \n            \n            \n        </div>\n\n        <ion-item *ngIf="fields.units === \'kg\'">\n            <ion-label floating>Plates</ion-label>\n            <ion-select multiple="true" [(ngModel)]="fields.kgplates">\n                <ion-option value="50">50</ion-option>\n                <ion-option value="30">30</ion-option>\n                <ion-option value="25">25</ion-option>\n                <ion-option value="20">20</ion-option>\n                <ion-option value="15">15</ion-option>\n                <ion-option value="10">10</ion-option>\n                <ion-option value="5">5</ion-option>\n                <ion-option value="2.5">2.5</ion-option>\n                <ion-option value="1.25">1.25</ion-option>\n                <ion-option value="0.5">0.5</ion-option>\n                <ion-option value="0.25">0.25</ion-option>\n                \n            </ion-select>\n        </ion-item>    \n        \n        <ion-item *ngIf="fields.units === \'lbs\'">\n            <ion-label floating>Plates</ion-label>\n            <ion-select multiple="true" [(ngModel)]="fields.lbsplates">\n                <ion-option value="110">110</ion-option>\n                <ion-option value="65">65</ion-option>\n                <ion-option value="55">55</ion-option>\n                <ion-option value="45">45</ion-option>\n                <ion-option value="35">35</ion-option>\n                <ion-option value="25">25</ion-option>\n                <ion-option value="10">15</ion-option>\n                <ion-option value="5">5</ion-option>\n                <ion-option value="2.5">2.5</ion-option>\n                <ion-option value="1.25">1.25</ion-option>\n                <ion-option value="0.5">0.5</ion-option>\n                \n            </ion-select>\n        </ion-item>           \n        \n        <div *ngIf="fields.barweight && fields.workweight && fields.warmupmethod" class="result warmup-result">\n            Warmup Sets:\n            <ion-item *ngFor="let set of calculateWarmups()" (click)="openWarmupPlates(set)">\n                {{set.reps}} x {{set.weight}}{{fields.units}}\n                <ion-icon ios="ios-arrow-forward" md="ios-arrow-forward" item-end></ion-icon>\n            </ion-item>\n        </div>\n        \n    </ion-list>     \n    \n    \n    \n</ion-content>`/*ion-inline-end:"D:\Taylor\Documents\Websites\intensity2\src\components\tools\calculator.html"*/
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ViewController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ViewController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]) === "function" && _c || Object])
    ], CalculatorModal);
    return CalculatorModal;
    var _a, _b, _c;
}());

//# sourceMappingURL=calculator.js.map

/***/ }),

/***/ 392:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BodyweightModal; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular_highcharts__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_bodyweight_bodyweight__ = __webpack_require__(393);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_chart_chart__ = __webpack_require__(70);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var BodyweightModal = (function () {
    function BodyweightModal(viewCtrl, storage, chartProvider, bodyweightProvider, alertCtrl) {
        var _this = this;
        this.viewCtrl = viewCtrl;
        this.storage = storage;
        this.chartProvider = chartProvider;
        this.bodyweightProvider = bodyweightProvider;
        this.alertCtrl = alertCtrl;
        this.properties = { loading: true };
        var config = this.chartProvider.getLineConfig();
        config.yAxis.min = null;
        this.bodyweightChart = new __WEBPACK_IMPORTED_MODULE_4_angular_highcharts__["a" /* Chart */](config);
        this.bodyweights = [];
        this.bodyweightProvider.getBodyweights().then(function (data) {
            console.log(data);
            _this.properties.loading = false;
            _this.bodyweights = data.sort(function (a, b) {
                var aDate = new Date(a.created);
                var bDate = new Date(b.created);
                if (aDate > bDate) {
                    return -1;
                }
                else if (aDate < bDate) {
                    return 1;
                }
                else {
                    return 0;
                }
            });
            _this.bodyweightChart.removeSerie(0);
            _this.bodyweightChart.addSerie({
                data: _this.formatStats(data),
                name: "Weight (" + _this.account.units + ")",
                color: '#de4223',
                showInLegend: false
            });
        });
        this.bodyweight = { weight: "" };
        this.storage.get("account").then(function (data) {
            _this.account = data;
        });
    }
    BodyweightModal.prototype.formatStats = function (data) {
        var formatted = [];
        for (var index in data) {
            var stat = data[index];
            var date = new Date(stat.created);
            formatted.push([date.getTime(), parseFloat(stat.weight)]);
        }
        return formatted.sort(function (a, b) {
            return a[0] - b[0];
        });
    };
    BodyweightModal.prototype.formatDate = function (date) {
        return __WEBPACK_IMPORTED_MODULE_3_moment__(date).format('MMMM Do YYYY');
    };
    BodyweightModal.prototype.addBodyweight = function () {
        var bodyweight = { id: false, created: new Date(), weight: this.bodyweight.weight };
        this.bodyweights.unshift(bodyweight);
        console.log(this.bodyweightChart);
        this.bodyweightChart.addPoint([bodyweight.created.getTime(), parseFloat(bodyweight.weight)]);
        this.bodyweightProvider.addBodyweight(bodyweight.weight).then(function (data) {
            bodyweight.id = data["id"];
        });
    };
    BodyweightModal.prototype.removeBodyweight = function (bodyweight, index) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: "Delete Entry",
            message: "Are you sure you want to delete this entry?",
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel'
                },
                {
                    text: 'Yes',
                    handler: function (data) {
                        var chartIndex = (_this.bodyweights.length - 1) - index;
                        _this.bodyweights.splice(index, 1);
                        _this.bodyweightChart.removePoint(chartIndex);
                        if (bodyweight.id || bodyweight.requestId) {
                            _this.bodyweightProvider.removeBodyweight(bodyweight);
                        }
                    }
                }
            ]
        });
        alert.present();
    };
    BodyweightModal.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    BodyweightModal = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'bodyweight',template:/*ion-inline-start:"D:\Taylor\Documents\Websites\intensity2\src\components\tools\bodyweight.html"*/`<ion-header>\n    <ion-toolbar color="primary">\n        <ion-title>\n            Bodyweight\n        </ion-title>\n        <ion-buttons start>\n            <button ion-button (click)="dismiss()">\n                <span ion-text showWhen="ios">Cancel</span>\n                <ion-icon name="md-close" showWhen="android, windows"></ion-icon>\n            </button>\n        </ion-buttons>\n    </ion-toolbar>\n</ion-header>\n\n\n\n<ion-content>\n    \n    <div class="diary-loading" *ngIf="properties.loading">\n        <ion-spinner></ion-spinner>\n    </div>    \n\n    <div class="diary-empty empty-state" *ngIf="!properties.loading && bodyweights.length < 1">\n        <ion-icon name=\'body\'></ion-icon>\n        No Entries\n    </div>     \n    \n    <div *ngIf="!properties.loading && bodyweights.length > 0">\n    \n        <div class="bodyweight-chart" [chart]="bodyweightChart"></div>\n\n        <ion-list class="bodyweight-list">\n\n            <ion-list-header>\n                Entries\n            </ion-list-header>        \n            <ion-item *ngFor="let bodyweight of bodyweights;let i = index">\n                <h2>{{formatDate(bodyweight.created)}}</h2>\n                <p>{{bodyweight.weight}}{{this.account.units}}</p>   \n                <ion-icon name="trash" item-end (click)="removeBodyweight(bodyweight, i)"></ion-icon>\n            </ion-item>\n        </ion-list>\n    </div>\n    \n    \n</ion-content>\n\n\n<ion-footer class="diary-footer bodyweight-footer">\n        <form name="diary-exercise-form" (ngSubmit)="addBodyweight()">\n            <ion-input name="weight" type="number" placeholder="Weight" [(ngModel)]="bodyweight.weight"></ion-input>\n            <div class="button-container">\n                <button type="submit" ion-button>Add</button>\n            </div>\n        </form>\n</ion-footer>`/*ion-inline-end:"D:\Taylor\Documents\Websites\intensity2\src\components\tools\bodyweight.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_6__providers_chart_chart__["a" /* ChartProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_bodyweight_bodyweight__["a" /* BodyweightProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], BodyweightModal);
    return BodyweightModal;
}());

//# sourceMappingURL=bodyweight.js.map

/***/ }),

/***/ 393:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BodyweightProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_settings__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(4);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/*
  Generated class for the DiaryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var BodyweightProvider = (function () {
    function BodyweightProvider(http, storage, events) {
        this.http = http;
        this.storage = storage;
        this.events = events;
    }
    BodyweightProvider.prototype.getBodyweights = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("session").then(function (session) {
                var data = { key: __WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiKey, session: session, controller: "view", action: "getbodyweights" };
                _this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl, data).subscribe(function (res) {
                    if (res["success"] === true) {
                        _this.storage.set("bodyweights", res["data"]);
                        resolve(res["data"]);
                    }
                    else {
                        reject(res);
                    }
                }, function (e) {
                    _this.events.publish("app:heartbeat");
                    _this.storage.get("bodyweights").then(function (data) {
                        if (data) {
                            resolve(data);
                            return;
                        }
                        reject(e);
                    });
                });
            });
        });
    };
    BodyweightProvider.prototype.addBodyweight = function (weight) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("session").then(function (session) {
                var requestData = { key: __WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiKey, session: session, controller: "create", action: "savebodyweight", weight: weight };
                _this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl, requestData).subscribe(function (res) {
                    if (res["success"] === true) {
                        _this.storage.get("bodyweights").then(function (data) {
                            var bodyweights = data ? data : {};
                            bodyweights.push(res["data"]);
                            _this.storage.set("bodyweights", bodyweights);
                        });
                        resolve(res["data"]);
                    }
                    else {
                        reject(res);
                    }
                }, function (e) {
                    _this.events.publish("app:heartbeat");
                    _this.storage.get("failedRequests").then(function (data) {
                        var requests = data ? data : [];
                        var requestId = requests.length > 0 ? requests[requests.length - 1].id + 1 : 1;
                        requestData["requestId"] = requestId;
                        requests.push(requestData);
                        _this.storage.set("failedRequests", requests);
                        _this.storage.get("bodyweights").then(function (data) {
                            var bodyweights = data ? data : {};
                            bodyweights.push({ weight: weight, created: new Date(), requestId: requestId });
                            _this.storage.set("workouts", bodyweights);
                        });
                        reject(e);
                    });
                });
            });
        });
    };
    BodyweightProvider.prototype.removeBodyweight = function (bodyweight) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("session").then(function (session) {
                if (bodyweight.requestId) {
                    _this.storage.get("workouts").then(function (data) {
                        var bodyweights = data;
                        for (var index in bodyweights) {
                            if (bodyweights[index].requestId === bodyweight.requestId) {
                                bodyweights.splice(index, 1);
                                break;
                            }
                        }
                        _this.storage.set("bodyweights", bodyweights);
                    });
                    _this.storage.get("failedRequests").then(function (data) {
                        var requests = data;
                        for (var index in requests) {
                            var request = requests[index];
                            if (request.requestId === bodyweight.requestId) {
                                requests.splice(index, 1); //not sure if this works
                            }
                        }
                        _this.storage.set("failedRequests", requests);
                    });
                    return;
                }
                var requestData = { key: __WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiKey, session: session, controller: "edit", action: "removebodyweight", id: bodyweight.id };
                _this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl, requestData).subscribe(function (res) {
                    if (res["success"] === true) {
                        _this.storage.get("bodyweights").then(function (data) {
                            var bodyweights = data;
                            for (var index in bodyweights) {
                                if (bodyweights[index].id === bodyweight.id) {
                                    bodyweights.splice(index, 1);
                                    break;
                                }
                            }
                            _this.storage.set("bodyweights", bodyweights);
                        });
                        resolve(res["data"]);
                    }
                    else {
                        reject(res);
                    }
                }, function (e) {
                    _this.events.publish("app:heartbeat");
                    _this.storage.get("failedRequests").then(function (data) {
                        var requests = data ? data : [];
                        var requestId = requests.length > 0 ? requests[requests.length - 1].id + 1 : 1;
                        requestData["requestId"] = requestId;
                        requests.push(requestData);
                        _this.storage.set("failedRequests", requests);
                        _this.storage.get("workouts").then(function (data) {
                            var bodyweights = data;
                            for (var index in bodyweights) {
                                if (bodyweights[index].id === bodyweight.id) {
                                    bodyweights.splice(index, 1);
                                    break;
                                }
                            }
                            _this.storage.set("workouts", bodyweights);
                        });
                        reject(e);
                    });
                });
            });
        });
    };
    BodyweightProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["d" /* Events */]])
    ], BodyweightProvider);
    return BodyweightProvider;
}());

//# sourceMappingURL=bodyweight.js.map

/***/ }),

/***/ 394:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HelpModal; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_email_composer__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_in_app_browser__ = __webpack_require__(67);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var HelpModal = (function () {
    function HelpModal(viewCtrl, storage, emailComposer, iab) {
        var _this = this;
        this.viewCtrl = viewCtrl;
        this.storage = storage;
        this.emailComposer = emailComposer;
        this.iab = iab;
        this.contact = { subject: "", message: "" };
        this.account = {};
        this.storage.get("account").then(function (data) {
            _this.account = data;
        });
    }
    HelpModal.prototype.sendMessage = function () {
        var email = {
            to: ["support@intensityapp.com"],
            subject: "Suport request: " + this.contact.subject,
            body: 'UserID: ' + this.account.id + '<br>User Email: ' + this.account.email + '<br>Message: ' + this.contact.message,
            isHtml: true
        };
        this.emailComposer.open(email);
    };
    HelpModal.prototype.openLink = function (link) {
        window.open(link, '_system');
    };
    HelpModal.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    HelpModal = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'help',template:/*ion-inline-start:"D:\Taylor\Documents\Websites\intensity2\src\components\tools\help.html"*/`<ion-header>\n    <ion-toolbar color="primary">\n        <ion-title>\n            Help\n        </ion-title>\n        <ion-buttons start>\n            <button ion-button (click)="dismiss()">\n                <span ion-text showWhen="ios">Cancel</span>\n                <ion-icon name="md-close" showWhen="android, windows"></ion-icon>\n            </button>\n        </ion-buttons>\n    </ion-toolbar>\n</ion-header>\n\n\n\n<ion-content>\n    \n    <div class="program-workouts">\n\n        <div class="workout-list">\n            <ion-list>\n                <div class="accordion-item">\n                    <ion-list-header (click)="openItem = !openItem">\n                        Getting started\n                        <ion-icon [name]="openItem ? \'remove-circle\' : \'add-circle\'" item-end></ion-icon>\n                    </ion-list-header>\n                    <ion-item *ngIf="openItem">\n                        \n                        \n                        <p>There are 2 steps to getting starting with tracking your workout.</p>\n                            <ol>\n                                <li><strong>Add an exercise</strong>. You can do this by tapping the red + circle in the bottom right corner</li>\n                                <li>Once you have added an exercise, you can now start <strong>adding sets</strong>. To do this, enter the weight and number of reps you did in the bar at the bottom of the screen, then tap the Add button.</li>\n                            </ol>\n                            <p>Some other points to note:</p>\n                            <ul>\n                                <li>To <strong>edit a set</strong> or add more information such as RPE, percentage, videos, or notes, tap on the set.</li>\n                                <li>You can <strong>mark sets as complete or incomplete</strong> by tapping the checkmark circle on the left of the set. Grey means not completed, red means completed.</li>\n                            </ul>                        \n                        \n                        \n                    </ion-item>\n                </div>\n                \n                <div class="accordion-item">\n                    <ion-list-header (click)="openItem2 = !openItem2">\n                        What does the progress circle mean?\n                        <ion-icon [name]="openItem2 ? \'remove-circle\' : \'add-circle\'" item-end></ion-icon>\n                    </ion-list-header>\n                    <ion-item *ngIf="openItem2">\n                        <p>The progress circle indicates how far towards your goal you are. By default, the goal is to achieve more volume every workout. You can change this by either tapping the progress circle, or going to your settings. Learn more about goals by viewing our blog post <a (click)="openLink(\'https://www.intensityapp.com/programming/intensity-workout-app-3-ways-to-make-faster-progress-with-custom-goals/\')">here</a>.</p>\n                    </ion-item>\n                </div>       \n                \n                \n                <div class="accordion-item">\n                    <ion-list-header (click)="openItem3 = !openItem3">\n                        What is volume?\n                        <ion-icon [name]="openItem3 ? \'remove-circle\' : \'add-circle\'" item-end></ion-icon>\n                    </ion-list-header>\n                    <ion-item *ngIf="openItem3">\n                        <p>Volume is a measure of work done. It is calculated by multiplying reps, weight, and sets together (i.e. reps x weight x sets).</p>\n                    </ion-item>\n                </div>       \n                \n                <div class="accordion-item">\n                    <ion-list-header (click)="openItem4 = !openItem4">\n                        How can I change my units?\n                        <ion-icon [name]="openItem4 ? \'remove-circle\' : \'add-circle\'" item-end></ion-icon>\n                    </ion-list-header>\n                    <ion-item *ngIf="openItem4">\n                        <p>You can change your units to lbs or kg by going to your settings. To access your settings, open the side menu by tapping the icon in the top left corner, then tap on Settings.</p>\n                    </ion-item>\n                </div>     \n\n\n                <div class="accordion-item">\n                    <ion-list-header (click)="openItem5 = !openItem5">\n                        How do I edit my password?\n                        <ion-icon [name]="openItem5 ? \'remove-circle\' : \'add-circle\'" item-end></ion-icon>\n                    </ion-list-header>\n                    <ion-item *ngIf="openItem5">\n                        <p>You can change your password by going to your settings. To access your settings, open the side menu by tapping the icon in the top left corner, then tap on Settings. The change password option is towards the bottom of the list.</p>\n                    </ion-item>\n                </div>                    \n                \n                <div class="accordion-item">\n                    <ion-list-header (click)="openItem6 = !openItem6">\n                        How do I edit my profile and email address?\n                        <ion-icon [name]="openItem6 ? \'remove-circle\' : \'add-circle\'" item-end></ion-icon>\n                    </ion-list-header>\n                    <ion-item *ngIf="openItem6">\n                        <p>You can change your profile information and email address by going to your profile. To access your profile, open the side menu by tapping the icon in the top left corner, then tap on the circular avatar image at the top. To edit your profile on this page, tap on the pencil in the top right corner. You can edit your avatar by tapping on the main circular image in your profile page.</p>\n                    </ion-item>\n                </div> \n\n\n                <div class="accordion-item">\n                    <ion-list-header (click)="openItem7 = !openItem7">\n                        How do I start a program?\n                        <ion-icon [name]="openItem7 ? \'remove-circle\' : \'add-circle\'" item-end ></ion-icon>\n                    </ion-list-header>\n                    <ion-item *ngIf="openItem7">\n                        <p>To start a program such as 5/3/1, Starting Strength, or any other number of programs in the database, navigate to the programs page. To do this, open the side menu by tapping the icon in the top left corner, then tap on Programs. Select a program you want to do by tapping on it. E.g. tap on 5/3/1 to open it. This will show you the details of the program. Confirm you are happy to add this program, and then tap on Add To Diary. You will be presented with some options such as setting the start date and entering your maxes. For more information on these settings, visit our blog post <a (click)="openLink(\'https://www.intensityapp.com/programming/intensity-programs-explained/\')">here</a>. Once you are happy with these settings, tap on Add To Diary.</p>\n                    </ion-item>\n                </div> \n                \n                <div class="accordion-item">\n                    <ion-list-header (click)="openItem9 = !openItem9">\n                        How can I export my data?\n                        <ion-icon [name]="openItem9 ? \'remove-circle\' : \'add-circle\'" item-end ></ion-icon>\n                    </ion-list-header>\n                    <ion-item *ngIf="openItem9">\n                        <p>You can export all your workout data by going to your settings. To access your settings, open the side menu by tapping the icon in the top left corner, then tap on Settings. From here, find Export Data and tap the Download button.</p>\n                    </ion-item>\n                </div>                 \n\n                <div class="accordion-item">\n                    <ion-list-header (click)="openItem8 = !openItem8">\n                        Have another question?\n                        <ion-icon [name]="openItem8 ? \'remove-circle\' : \'add-circle\'" item-end></ion-icon>\n                    </ion-list-header>\n                    \n                    <div *ngIf="openItem8">\n                    \n                        <p class="help-message">\n                            If you require assistance with anything to do with the app, or just need to get in touch, fill out the below form.\n                        </p>\n                        <ion-list class="help-form">\n                            <ion-item>\n                                <ion-label>Subject</ion-label>\n                                <ion-select [(ngModel)]="contact.subject">\n                                    <ion-option value="Genereal Help">Genereal Help</ion-option>\n                                  <ion-option value="Report Bug">Report Bug</ion-option>\n                                  <ion-option value="Connection Issue">Connection Issue</ion-option>\n                                  <ion-option value="Data Import Error">Data Import Error</ion-option>\n                                  <ion-option value="Feature Request">Feature Request</ion-option>\n                                  <ion-option value="Other">Other</ion-option>\n                                </ion-select>\n                            </ion-item>     \n\n\n                            <ion-item class="set-notes">\n                                <ion-label floating>Message</ion-label>\n                                <ion-textarea [(ngModel)]="contact.message" autosize></ion-textarea>\n                            </ion-item>   \n                        </ion-list>   \n\n                        <div class="send-button">\n                            <button ion-button (click)="sendMessage()">\n                                <span ion-text>Send</span>\n                            </button>     \n                        </div>\n                    \n                    \n                    </div>\n                    \n                </div> \n\n\n                \n            </ion-list>\n        </div>\n\n    </div>\n    \n    \n    \n\n    \n</ion-content>`/*ion-inline-end:"D:\Taylor\Documents\Websites\intensity2\src\components\tools\help.html"*/
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ViewController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ViewController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__ionic_native_email_composer__["a" /* EmailComposer */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ionic_native_email_composer__["a" /* EmailComposer */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__ionic_native_in_app_browser__["a" /* InAppBrowser */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__ionic_native_in_app_browser__["a" /* InAppBrowser */]) === "function" && _d || Object])
    ], HelpModal);
    return HelpModal;
    var _a, _b, _c, _d;
}());

//# sourceMappingURL=help.js.map

/***/ }),

/***/ 397:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(398);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(418);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 40:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FriendsProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_settings__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(4);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/*
  Generated class for the DiaryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var FriendsProvider = (function () {
    function FriendsProvider(http, storage, events) {
        this.http = http;
        this.storage = storage;
        this.events = events;
    }
    FriendsProvider.prototype.searchUsers = function (search) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("session").then(function (session) {
                var data = { key: __WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiKey, session: session, controller: "view", action: "getusers", username: search };
                _this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl, data).subscribe(function (res) {
                    if (res["success"] === true) {
                        resolve(res["data"]);
                    }
                    else {
                        reject(res);
                    }
                }, function (e) {
                    _this.events.publish("app:heartbeat");
                    reject(e);
                });
            });
        });
    };
    FriendsProvider.prototype.getSuggestedFriends = function (userId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("session").then(function (session) {
                var data = { key: __WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiKey, session: session, controller: "view", action: "getsuggestedfriends", userid: userId };
                _this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl, data).subscribe(function (res) {
                    if (res["success"] === true) {
                        resolve(res["data"]);
                    }
                    else {
                        reject(res);
                    }
                }, function (e) {
                    _this.events.publish("app:heartbeat");
                    reject(e);
                });
            });
        });
    };
    FriendsProvider.prototype.addFriend = function (userId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("session").then(function (session) {
                var data = { key: __WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiKey, session: session, controller: "create", action: "addfriend", friendid: userId };
                _this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl, data).subscribe(function (res) {
                    if (res["success"] === true) {
                        resolve(res["data"]);
                    }
                    else {
                        reject(res);
                    }
                }, function (e) {
                    _this.events.publish("app:heartbeat");
                    reject(e);
                });
            });
        });
    };
    FriendsProvider.prototype.removeFriend = function (userId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("session").then(function (session) {
                var data = { key: __WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiKey, session: session, controller: "edit", action: "removefriend", friendid: userId };
                _this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl, data).subscribe(function (res) {
                    if (res["success"] === true) {
                        resolve(res["data"]);
                    }
                    else {
                        reject(res);
                    }
                }, function (e) {
                    _this.events.publish("app:heartbeat");
                    reject(e);
                });
            });
        });
    };
    FriendsProvider.prototype.getFriendDiary = function (userId, date) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("session").then(function (session) {
                var data = { key: __WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiKey, session: session, controller: "view", action: "selectresults", assigneddate: date, userid: userId };
                _this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl, data).subscribe(function (res) {
                    if (res["success"] === true) {
                        resolve(res["data"]);
                    }
                    else {
                        reject(res);
                    }
                }, function (e) {
                    _this.events.publish("app:heartbeat");
                    reject(e);
                });
            });
        });
    };
    FriendsProvider.prototype.getMessages = function (userId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("session").then(function (session) {
                var data = { key: __WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiKey, session: session, controller: "view", action: "getmessages", friendid: userId };
                _this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl, data).subscribe(function (res) {
                    if (res["success"] === true) {
                        resolve(res["data"]);
                    }
                    else {
                        reject(res);
                    }
                }, function (e) {
                    _this.events.publish("app:heartbeat");
                    reject(e);
                });
            });
        });
    };
    FriendsProvider.prototype.createMessages = function (message, userId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("session").then(function (session) {
                var data = { key: __WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiKey, session: session, controller: "create", action: "savemessage", friendid: userId, message: message };
                _this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl, data).subscribe(function (res) {
                    if (res["success"] === true) {
                        resolve(res["data"]);
                    }
                    else {
                        reject(res);
                    }
                }, function (e) {
                    _this.events.publish("app:heartbeat");
                    reject(e);
                });
            });
        });
    };
    FriendsProvider.prototype.getWorkout = function (date, userId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("session").then(function (session) {
                var data = { key: __WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiKey, session: session, controller: "view", action: "selectresults", assigneddate: date, v2: true, userid: userId };
                _this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl, data).subscribe(function (res) {
                    if (res["success"] === true) {
                        resolve(res["data"]);
                    }
                    else {
                        reject(res);
                    }
                }, function (e) {
                    _this.events.publish("app:heartbeat");
                    reject(e);
                });
            });
        });
    };
    FriendsProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["d" /* Events */]])
    ], FriendsProvider);
    return FriendsProvider;
}());

//# sourceMappingURL=friends.js.map

/***/ }),

/***/ 418:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export highchartsModules */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular_highcharts__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_highcharts_modules_heatmap_src__ = __webpack_require__(464);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_highcharts_modules_heatmap_src___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_highcharts_modules_heatmap_src__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_facebook__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_in_app_purchase__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_email_composer__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_in_app_browser__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_local_notifications__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_file_transfer__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_file__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_camera__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_push__ = __webpack_require__(476);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_onesignal__ = __webpack_require__(235);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_network__ = __webpack_require__(236);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_native_background_mode__ = __webpack_require__(237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_ion_datepicker__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__app_component__ = __webpack_require__(482);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_diary_diary__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_diary_exercise_diary_exercise__ = __webpack_require__(361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_settings_settings__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_friends_friends__ = __webpack_require__(368);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_friend_profile_friend_profile__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pages_friend_diary_friend_diary__ = __webpack_require__(369);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_messages_messages__ = __webpack_require__(371);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__pages_message_message__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__pages_leaderboard_leaderboard__ = __webpack_require__(373);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__pages_premium_premium__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__pages_profile_profile__ = __webpack_require__(375);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__pages_program_program__ = __webpack_require__(378);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__pages_programs_programs__ = __webpack_require__(377);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__pages_records_records__ = __webpack_require__(382);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__pages_stats_stats__ = __webpack_require__(384);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__components_tools_tools__ = __webpack_require__(485);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__components_tools_timer__ = __webpack_require__(389);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__components_tools_calculator__ = __webpack_require__(391);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__components_tools_bodyweight__ = __webpack_require__(392);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__components_tools_help__ = __webpack_require__(394);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__pages_program_popover_program_popover__ = __webpack_require__(379);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__components_autosize_autosize__ = __webpack_require__(494);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__components_tools_popover__ = __webpack_require__(388);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44_ionic_long_press__ = __webpack_require__(495);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44_ionic_long_press___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_44_ionic_long_press__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45__modals_login_login__ = __webpack_require__(386);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46__modals_add_exercise_add_exercise__ = __webpack_require__(367);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47__modals_select_exercise_select_exercise__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_48__modals_add_program_add_program__ = __webpack_require__(380);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_49__modals_change_exercise_change_exercise__ = __webpack_require__(385);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_50__modals_edit_set_edit_set__ = __webpack_require__(362);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_51__modals_diary_records_diary_records__ = __webpack_require__(363);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_52__modals_records_records__ = __webpack_require__(383);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_53__modals_edit_profile_edit_profile__ = __webpack_require__(376);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_54__modals_add_friends_add_friends__ = __webpack_require__(370);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_55__modals_search_friends_search_friends__ = __webpack_require__(372);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_56__modals_import_import__ = __webpack_require__(364);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_57__modals_goal_settings_goal_settings__ = __webpack_require__(365);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_58__modals_goal_resets_goal_resets__ = __webpack_require__(366);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_59__modals_create_program_create_program__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_60__modals_edit_program_exercise_edit_program_exercise__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_61__modals_edit_program_edit_program__ = __webpack_require__(381);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_62__ionic_native_status_bar__ = __webpack_require__(241);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_63__ionic_native_splash_screen__ = __webpack_require__(242);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_64__ionic_native_social_sharing__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_65__ionic_native_native_audio__ = __webpack_require__(390);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_66__providers_diary_diary__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_67__providers_program_program__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_68__providers_authentication_authentication__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_69__providers_account_account__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_70__providers_leaderboard_leaderboard__ = __webpack_require__(374);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_71__providers_friends_friends__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_72__providers_message_message__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_73__providers_chart_chart__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_74__providers_offline_offline__ = __webpack_require__(387);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_75__providers_timer_timer__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_76_angular_svg_round_progressbar__ = __webpack_require__(497);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_76_angular_svg_round_progressbar___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_76_angular_svg_round_progressbar__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_77__providers_exercise_exercise__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_78__providers_bodyweight_bodyweight__ = __webpack_require__(393);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_79__pipes_exercise_search__ = __webpack_require__(498);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_80__pipes_program_search__ = __webpack_require__(499);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_81__pipes_sort__ = __webpack_require__(500);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






function highchartsModules() {
    return [__WEBPACK_IMPORTED_MODULE_5_highcharts_modules_heatmap_src__];
}












































































var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_20__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_21__pages_diary_diary__["a" /* DiaryPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_diary_exercise_diary_exercise__["a" /* DiaryExercisePage */],
                __WEBPACK_IMPORTED_MODULE_45__modals_login_login__["a" /* LoginModal */],
                __WEBPACK_IMPORTED_MODULE_23__pages_settings_settings__["a" /* SettingsPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_friends_friends__["a" /* FriendsPage */],
                __WEBPACK_IMPORTED_MODULE_25__pages_friend_profile_friend_profile__["a" /* FriendProfilePage */],
                __WEBPACK_IMPORTED_MODULE_26__pages_friend_diary_friend_diary__["a" /* FriendDiaryPage */],
                __WEBPACK_IMPORTED_MODULE_27__pages_messages_messages__["a" /* MessagesPage */],
                __WEBPACK_IMPORTED_MODULE_28__pages_message_message__["a" /* MessagePage */],
                __WEBPACK_IMPORTED_MODULE_29__pages_leaderboard_leaderboard__["a" /* LeaderboardPage */],
                __WEBPACK_IMPORTED_MODULE_30__pages_premium_premium__["a" /* PremiumPage */],
                __WEBPACK_IMPORTED_MODULE_31__pages_profile_profile__["a" /* ProfilePage */],
                __WEBPACK_IMPORTED_MODULE_32__pages_program_program__["a" /* ProgramPage */],
                __WEBPACK_IMPORTED_MODULE_33__pages_programs_programs__["a" /* ProgramsPage */],
                __WEBPACK_IMPORTED_MODULE_34__pages_records_records__["a" /* RecordsPage */],
                __WEBPACK_IMPORTED_MODULE_35__pages_stats_stats__["a" /* StatsPage */],
                __WEBPACK_IMPORTED_MODULE_46__modals_add_exercise_add_exercise__["a" /* AddExerciseModal */],
                __WEBPACK_IMPORTED_MODULE_48__modals_add_program_add_program__["a" /* AddProgramModal */],
                __WEBPACK_IMPORTED_MODULE_49__modals_change_exercise_change_exercise__["a" /* ChangeExerciseModal */],
                __WEBPACK_IMPORTED_MODULE_47__modals_select_exercise_select_exercise__["a" /* SelectExerciseModal */],
                __WEBPACK_IMPORTED_MODULE_52__modals_records_records__["a" /* RecordsModal */],
                __WEBPACK_IMPORTED_MODULE_37__components_tools_timer__["a" /* TimerModal */],
                __WEBPACK_IMPORTED_MODULE_38__components_tools_calculator__["a" /* CalculatorModal */],
                __WEBPACK_IMPORTED_MODULE_39__components_tools_bodyweight__["a" /* BodyweightModal */],
                __WEBPACK_IMPORTED_MODULE_40__components_tools_help__["a" /* HelpModal */],
                __WEBPACK_IMPORTED_MODULE_50__modals_edit_set_edit_set__["a" /* EditSetModal */],
                __WEBPACK_IMPORTED_MODULE_51__modals_diary_records_diary_records__["a" /* DiaryRecordsModal */],
                __WEBPACK_IMPORTED_MODULE_53__modals_edit_profile_edit_profile__["a" /* EditProfileModal */],
                __WEBPACK_IMPORTED_MODULE_54__modals_add_friends_add_friends__["a" /* AddFriendsModal */],
                __WEBPACK_IMPORTED_MODULE_55__modals_search_friends_search_friends__["a" /* SearchFriendsModal */],
                __WEBPACK_IMPORTED_MODULE_56__modals_import_import__["a" /* ImportModal */],
                __WEBPACK_IMPORTED_MODULE_57__modals_goal_settings_goal_settings__["a" /* GoalSettingsModal */],
                __WEBPACK_IMPORTED_MODULE_58__modals_goal_resets_goal_resets__["a" /* GoalResetsModal */],
                __WEBPACK_IMPORTED_MODULE_59__modals_create_program_create_program__["a" /* CreateProgramModal */],
                __WEBPACK_IMPORTED_MODULE_61__modals_edit_program_edit_program__["a" /* EditProgramModal */],
                __WEBPACK_IMPORTED_MODULE_60__modals_edit_program_exercise_edit_program_exercise__["a" /* EditProgramExerciseModal */],
                __WEBPACK_IMPORTED_MODULE_41__pages_program_popover_program_popover__["a" /* ProgramPopover */],
                __WEBPACK_IMPORTED_MODULE_41__pages_program_popover_program_popover__["b" /* ProgramWorkoutPopover */],
                __WEBPACK_IMPORTED_MODULE_36__components_tools_tools__["a" /* ToolsDirective */],
                __WEBPACK_IMPORTED_MODULE_42__components_autosize_autosize__["a" /* Autosize */],
                __WEBPACK_IMPORTED_MODULE_43__components_tools_popover__["a" /* PopoverPage */],
                __WEBPACK_IMPORTED_MODULE_79__pipes_exercise_search__["a" /* ExerciseSearchPipe */],
                __WEBPACK_IMPORTED_MODULE_80__pipes_program_search__["a" /* ProgramSearchPipe */],
                __WEBPACK_IMPORTED_MODULE_81__pipes_sort__["a" /* ArraySortPipe */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["BrowserModule"],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_20__app_component__["a" /* MyApp */], {}, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_76_angular_svg_round_progressbar__["RoundProgressModule"],
                __WEBPACK_IMPORTED_MODULE_19_ion_datepicker__["b" /* DatePickerModule */],
                __WEBPACK_IMPORTED_MODULE_44_ionic_long_press__["LongPressModule"],
                __WEBPACK_IMPORTED_MODULE_4_angular_highcharts__["b" /* ChartModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_20__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_21__pages_diary_diary__["a" /* DiaryPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_diary_exercise_diary_exercise__["a" /* DiaryExercisePage */],
                __WEBPACK_IMPORTED_MODULE_45__modals_login_login__["a" /* LoginModal */],
                __WEBPACK_IMPORTED_MODULE_23__pages_settings_settings__["a" /* SettingsPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_friends_friends__["a" /* FriendsPage */],
                __WEBPACK_IMPORTED_MODULE_25__pages_friend_profile_friend_profile__["a" /* FriendProfilePage */],
                __WEBPACK_IMPORTED_MODULE_26__pages_friend_diary_friend_diary__["a" /* FriendDiaryPage */],
                __WEBPACK_IMPORTED_MODULE_27__pages_messages_messages__["a" /* MessagesPage */],
                __WEBPACK_IMPORTED_MODULE_28__pages_message_message__["a" /* MessagePage */],
                __WEBPACK_IMPORTED_MODULE_29__pages_leaderboard_leaderboard__["a" /* LeaderboardPage */],
                __WEBPACK_IMPORTED_MODULE_30__pages_premium_premium__["a" /* PremiumPage */],
                __WEBPACK_IMPORTED_MODULE_31__pages_profile_profile__["a" /* ProfilePage */],
                __WEBPACK_IMPORTED_MODULE_32__pages_program_program__["a" /* ProgramPage */],
                __WEBPACK_IMPORTED_MODULE_33__pages_programs_programs__["a" /* ProgramsPage */],
                __WEBPACK_IMPORTED_MODULE_34__pages_records_records__["a" /* RecordsPage */],
                __WEBPACK_IMPORTED_MODULE_35__pages_stats_stats__["a" /* StatsPage */],
                __WEBPACK_IMPORTED_MODULE_46__modals_add_exercise_add_exercise__["a" /* AddExerciseModal */],
                __WEBPACK_IMPORTED_MODULE_48__modals_add_program_add_program__["a" /* AddProgramModal */],
                __WEBPACK_IMPORTED_MODULE_49__modals_change_exercise_change_exercise__["a" /* ChangeExerciseModal */],
                __WEBPACK_IMPORTED_MODULE_47__modals_select_exercise_select_exercise__["a" /* SelectExerciseModal */],
                __WEBPACK_IMPORTED_MODULE_41__pages_program_popover_program_popover__["a" /* ProgramPopover */],
                __WEBPACK_IMPORTED_MODULE_41__pages_program_popover_program_popover__["b" /* ProgramWorkoutPopover */],
                __WEBPACK_IMPORTED_MODULE_37__components_tools_timer__["a" /* TimerModal */],
                __WEBPACK_IMPORTED_MODULE_38__components_tools_calculator__["a" /* CalculatorModal */],
                __WEBPACK_IMPORTED_MODULE_39__components_tools_bodyweight__["a" /* BodyweightModal */],
                __WEBPACK_IMPORTED_MODULE_54__modals_add_friends_add_friends__["a" /* AddFriendsModal */],
                __WEBPACK_IMPORTED_MODULE_40__components_tools_help__["a" /* HelpModal */],
                __WEBPACK_IMPORTED_MODULE_50__modals_edit_set_edit_set__["a" /* EditSetModal */],
                __WEBPACK_IMPORTED_MODULE_51__modals_diary_records_diary_records__["a" /* DiaryRecordsModal */],
                __WEBPACK_IMPORTED_MODULE_52__modals_records_records__["a" /* RecordsModal */],
                __WEBPACK_IMPORTED_MODULE_53__modals_edit_profile_edit_profile__["a" /* EditProfileModal */],
                __WEBPACK_IMPORTED_MODULE_55__modals_search_friends_search_friends__["a" /* SearchFriendsModal */],
                __WEBPACK_IMPORTED_MODULE_56__modals_import_import__["a" /* ImportModal */],
                __WEBPACK_IMPORTED_MODULE_57__modals_goal_settings_goal_settings__["a" /* GoalSettingsModal */],
                __WEBPACK_IMPORTED_MODULE_58__modals_goal_resets_goal_resets__["a" /* GoalResetsModal */],
                __WEBPACK_IMPORTED_MODULE_59__modals_create_program_create_program__["a" /* CreateProgramModal */],
                __WEBPACK_IMPORTED_MODULE_61__modals_edit_program_edit_program__["a" /* EditProgramModal */],
                __WEBPACK_IMPORTED_MODULE_60__modals_edit_program_exercise_edit_program_exercise__["a" /* EditProgramExerciseModal */],
                __WEBPACK_IMPORTED_MODULE_43__components_tools_popover__["a" /* PopoverPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_62__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_63__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_66__providers_diary_diary__["a" /* DiaryProvider */],
                __WEBPACK_IMPORTED_MODULE_68__providers_authentication_authentication__["a" /* AuthenticationProvider */],
                __WEBPACK_IMPORTED_MODULE_75__providers_timer_timer__["a" /* TimerService */],
                __WEBPACK_IMPORTED_MODULE_69__providers_account_account__["a" /* AccountProvider */],
                __WEBPACK_IMPORTED_MODULE_78__providers_bodyweight_bodyweight__["a" /* BodyweightProvider */],
                __WEBPACK_IMPORTED_MODULE_70__providers_leaderboard_leaderboard__["a" /* LeaderboardProvider */],
                __WEBPACK_IMPORTED_MODULE_71__providers_friends_friends__["a" /* FriendsProvider */],
                __WEBPACK_IMPORTED_MODULE_74__providers_offline_offline__["a" /* OfflineProvider */],
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_facebook__["a" /* Facebook */],
                __WEBPACK_IMPORTED_MODULE_65__ionic_native_native_audio__["a" /* NativeAudio */],
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_email_composer__["a" /* EmailComposer */],
                __WEBPACK_IMPORTED_MODULE_8__ionic_native_in_app_purchase__["a" /* InAppPurchase */],
                __WEBPACK_IMPORTED_MODULE_10__ionic_native_in_app_browser__["a" /* InAppBrowser */],
                __WEBPACK_IMPORTED_MODULE_64__ionic_native_social_sharing__["a" /* SocialSharing */],
                __WEBPACK_IMPORTED_MODULE_11__ionic_native_local_notifications__["a" /* LocalNotifications */],
                __WEBPACK_IMPORTED_MODULE_16__ionic_native_onesignal__["a" /* OneSignal */],
                __WEBPACK_IMPORTED_MODULE_17__ionic_native_network__["a" /* Network */],
                __WEBPACK_IMPORTED_MODULE_13__ionic_native_file__["a" /* File */],
                __WEBPACK_IMPORTED_MODULE_15__ionic_native_push__["a" /* Push */],
                __WEBPACK_IMPORTED_MODULE_12__ionic_native_file_transfer__["a" /* FileTransfer */],
                __WEBPACK_IMPORTED_MODULE_14__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_77__providers_exercise_exercise__["a" /* ExerciseProvider */],
                __WEBPACK_IMPORTED_MODULE_67__providers_program_program__["a" /* ProgramProvider */],
                __WEBPACK_IMPORTED_MODULE_72__providers_message_message__["a" /* MessageProvider */],
                __WEBPACK_IMPORTED_MODULE_73__providers_chart_chart__["a" /* ChartProvider */],
                __WEBPACK_IMPORTED_MODULE_18__ionic_native_background_mode__["a" /* BackgroundMode */],
                { provide: __WEBPACK_IMPORTED_MODULE_4_angular_highcharts__["c" /* HIGHCHARTS_MODULES */], useFactory: highchartsModules }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 43:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SelectExerciseModal; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_exercise_exercise__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SelectExerciseModal = (function () {
    function SelectExerciseModal(platform, params, viewCtrl, toastCtrl, exerciseProvider, storage, alertCtrl) {
        var _this = this;
        this.platform = platform;
        this.params = params;
        this.viewCtrl = viewCtrl;
        this.toastCtrl = toastCtrl;
        this.exerciseProvider = exerciseProvider;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.properties = { activeTab: "recent", userid: 0, search: "", allCount: 100 };
        this.loading = { all: false, recent: false, search: false };
        this.exercises = [];
        this.recentExercises = [];
        this.searchExercises = [];
        this.getExercises();
        this.getRecentExercises();
        this.storage.get("userid").then(function (data) {
            _this.properties.userid = data;
        });
    }
    SelectExerciseModal.prototype.getExercises = function () {
        var _this = this;
        this.loading.all = true;
        this.exerciseProvider.getExercises().then(function (data) {
            _this.exercises = data;
            _this.loading.all = false;
        });
    };
    SelectExerciseModal.prototype.getRecentExercises = function () {
        var _this = this;
        this.loading.recent = true;
        this.storage.get("recentexercises").then(function (exercises) {
            if (exercises && _this.loading.recent) {
                _this.recentExercises = exercises;
                if (_this.recentExercises.length > 0) {
                    _this.properties.activeTab = "recent";
                }
            }
        });
        this.exerciseProvider.getRecentExercises().then(function (data) {
            _this.loading.recent = false;
            _this.recentExercises = data;
            if (_this.recentExercises.length > 0) {
                _this.properties.activeTab = "recent";
            }
        });
    };
    SelectExerciseModal.prototype.searchStarted = function () {
        this.properties.activeTab = 'all';
    };
    SelectExerciseModal.prototype.searchCancelled = function () {
        this.properties.search = '';
    };
    SelectExerciseModal.prototype.openViewDetails = function (ev, exercise) {
        var _this = this;
        ev.preventDefault();
        ev.stopPropagation();
        var alert = this.alertCtrl.create({
            title: exercise.name,
            message: "<strong>Musclegroups:</strong> " + exercise.musclegroup + "<br><strong>Exercise Types:</strong> " + exercise.type,
            buttons: [
                {
                    text: 'Dismiss',
                    role: 'cancel'
                },
                {
                    text: 'Select',
                    handler: function (data) {
                        _this.addExercise(exercise);
                    }
                }
            ]
        });
        alert.present();
    };
    SelectExerciseModal.prototype.addExercise = function (exercise) {
        if (exercise.exerciseid) {
            exercise.id = exercise.exerciseid;
        } //for recent exercises
        exercise.exerciseid = exercise.id;
        this.viewCtrl.dismiss(exercise);
    };
    SelectExerciseModal.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    SelectExerciseModal = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'select-exercise',template:/*ion-inline-start:"D:\Taylor\Documents\Websites\intensity2\src\modals\select-exercise\select-exercise.html"*/`<ion-header>\n    <ion-toolbar color="primary">\n        <ion-title>\n            Select Exercise\n        </ion-title>\n        <ion-buttons start>\n            <button ion-button (click)="dismiss()">\n                <span ion-text showWhen="ios">Cancel</span>\n                <ion-icon name="md-close" showWhen="android, windows"></ion-icon>\n            </button>\n        </ion-buttons>\n    </ion-toolbar>\n</ion-header>\n\n\n\n<ion-content>\n    \n    \n    <ion-searchbar\n        [(ngModel)]="properties.search"\n        [showCancelButton]="shouldShowCancel"\n        (ionInput)="searchStarted()"\n        (ionCancel)="searchCancelled()"\n        placeholder="Search Exercises"\n        class="flat-search">\n    </ion-searchbar>   \n    \n    <ion-segment color="primary" [(ngModel)]="properties.activeTab">      \n        <ion-segment-button value="recent">\n            Recent\n        </ion-segment-button>\n        <ion-segment-button value="all">\n            All Exercises\n        </ion-segment-button> \n    </ion-segment>    \n    \n\n    \n    <ion-list class="add-diary-list" *ngIf="properties.activeTab === \'recent\'">\n        <button ion-item detail-none *ngFor="let exercise of recentExercises | exerciseSearch:properties.search; let i = index" (click)="addExercise(exercise)">\n            {{exercise.name}}\n            <ion-icon name=\'more\' item-end (click)="openViewDetails($event, exercise)"></ion-icon>\n        </button> \n    </ion-list>\n    \n\n    \n    \n    <ion-list class="add-diary-list" *ngIf="properties.activeTab === \'all\' && properties.search">\n        <button ion-item detail-none *ngFor="let exercise of exercises | exerciseSearch:properties.search | slice:0:30; let l = count; let i = index" (click)="addExercise(exercise)">\n            {{exercise.name}}\n            <ion-icon name=\'more\' item-end (click)="openViewDetails($event, exercise)"></ion-icon>\n        </button> \n        <ion-item class="create-exercise" detail-none>\n            Can\'t find {{properties.search}}?<br> \n            <button type="submit" ion-button (click)="createExercise(properties.search)">Create It</button>\n        </ion-item>                \n    </ion-list>  \n    \n    \n    \n    <ion-list class="add-diary-list" *ngIf="properties.activeTab === \'all\' && !properties.search">\n        <button ion-item detail-none *ngFor="let exercise of exercises | slice:0:properties.allCount; let i = index" (click)="addExercise(exercise)">\n            {{exercise.name}}\n            <ion-icon name=\'more\' item-end (click)="openViewDetails($event, exercise)"></ion-icon>\n        </button> \n        <button class="more-exercises" ion-item detail-none (click)="properties.allCount = properties.allCount + 100">\n                + {{exercises.length - properties.allCount}} more\n        </button>         \n    </ion-list>     \n    \n\n    \n</ion-content>`/*ion-inline-end:"D:\Taylor\Documents\Websites\intensity2\src\modals\select-exercise\select-exercise.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ToastController */], __WEBPACK_IMPORTED_MODULE_2__providers_exercise_exercise__["a" /* ExerciseProvider */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], SelectExerciseModal);
    return SelectExerciseModal;
}());

//# sourceMappingURL=select-exercise.js.map

/***/ }),

/***/ 482:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(241);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(242);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_onesignal__ = __webpack_require__(235);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_diary_diary__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_friends_friends__ = __webpack_require__(368);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_messages_messages__ = __webpack_require__(371);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_leaderboard_leaderboard__ = __webpack_require__(373);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_premium_premium__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_profile_profile__ = __webpack_require__(375);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_programs_programs__ = __webpack_require__(377);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_records_records__ = __webpack_require__(382);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_stats_stats__ = __webpack_require__(384);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_settings_settings__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__modals_login_login__ = __webpack_require__(386);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_17_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__providers_account_account__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__providers_offline_offline__ = __webpack_require__(387);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__providers_authentication_authentication__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__ionic_native_in_app_purchase__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__ionic_native_local_notifications__ = __webpack_require__(127);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};























var MyApp = (function () {
    function MyApp(platform, statusBar, modalCtrl, splashScreen, accountProvider, events, storage, loadingCtrl, auth, alertCtrl, oneSignal, offlineProvider, iap, localNotifications) {
        var _this = this;
        this.platform = platform;
        this.statusBar = statusBar;
        this.modalCtrl = modalCtrl;
        this.splashScreen = splashScreen;
        this.accountProvider = accountProvider;
        this.events = events;
        this.storage = storage;
        this.loadingCtrl = loadingCtrl;
        this.auth = auth;
        this.alertCtrl = alertCtrl;
        this.oneSignal = oneSignal;
        this.offlineProvider = offlineProvider;
        this.iap = iap;
        this.localNotifications = localNotifications;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_6__pages_diary_diary__["a" /* DiaryPage */];
        this.initializeApp();
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Diary', component: __WEBPACK_IMPORTED_MODULE_6__pages_diary_diary__["a" /* DiaryPage */], icon: "bookmarks" },
            { title: 'Records', component: __WEBPACK_IMPORTED_MODULE_13__pages_records_records__["a" /* RecordsPage */], icon: "trophy" },
            { title: 'Stats', component: __WEBPACK_IMPORTED_MODULE_14__pages_stats_stats__["a" /* StatsPage */], icon: "stats" },
            { title: 'Leaderboard', component: __WEBPACK_IMPORTED_MODULE_9__pages_leaderboard_leaderboard__["a" /* LeaderboardPage */], icon: "ribbon" },
            { title: 'Friends', component: __WEBPACK_IMPORTED_MODULE_7__pages_friends_friends__["a" /* FriendsPage */], icon: "people" },
            { title: 'Messages', component: __WEBPACK_IMPORTED_MODULE_8__pages_messages_messages__["a" /* MessagesPage */], icon: "chatbubbles" },
            { title: 'Programs', component: __WEBPACK_IMPORTED_MODULE_12__pages_programs_programs__["a" /* ProgramsPage */], icon: "calendar" },
            { title: 'Settings', component: __WEBPACK_IMPORTED_MODULE_15__pages_settings_settings__["a" /* SettingsPage */], icon: "settings" }
        ];
        this.account = { username: "John Doe", dp: "http://api.intensityapp.com/uploads/default.png" };
        this.storage.get('session').then(function (session) {
            if (!session) {
                _this.openLogin();
            }
            else {
                _this.getAccount();
                _this.savePushId();
            }
        });
        this.connectionStatus = true;
        this.events.subscribe('app:online', function () {
            _this.connectionStatus = true;
        });
        this.events.subscribe('app:offline', function () {
            _this.connectionStatus = false;
        });
        this.premiumPage = { title: 'Premium', component: __WEBPACK_IMPORTED_MODULE_10__pages_premium_premium__["a" /* PremiumPage */] };
        this.profilePage = { title: 'Profile', component: __WEBPACK_IMPORTED_MODULE_11__pages_profile_profile__["a" /* ProfilePage */] };
        this.events.subscribe('workout:added', function (workoutDateObj) {
            var workoutDate = workoutDateObj.date;
            if (__WEBPACK_IMPORTED_MODULE_17_moment__(workoutDate).isSame(__WEBPACK_IMPORTED_MODULE_17_moment__(), 'day') && (__WEBPACK_IMPORTED_MODULE_17_moment__(workoutDate).isAfter(_this.account.last_workout, 'day') || __WEBPACK_IMPORTED_MODULE_17_moment__(workoutDate).isSame(_this.account.last_workout, 'day'))) {
                _this.account.last_workout = workoutDate;
                _this.account.last_workout_formatted = "today";
            }
            else if (_this.account.last_workout_formatted === "never" || __WEBPACK_IMPORTED_MODULE_17_moment__(workoutDate).isAfter(_this.account.last_workout, 'day')) {
                _this.account.last_workout = workoutDate;
                _this.account.last_workout_formatted = __WEBPACK_IMPORTED_MODULE_17_moment__(_this.account.last_workout).fromNow();
            }
        });
        this.events.subscribe('profile:updated', function (profile) {
            _this.account.dp = profile.dp;
            _this.account.username = profile.username;
        });
        this.events.subscribe('user:logout', function () {
            _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_6__pages_diary_diary__["a" /* DiaryPage */]);
            _this.nav.popToRoot();
            _this.openLogin();
        });
        this.storage.get("theme").then(function (data) {
            if (data) {
                _this.theme = data;
                if (_this.theme === "dark") {
                    document.querySelector("ion-app").className += " dark-theme";
                }
            }
        });
        this.events.subscribe('theme:updated', function (theme) {
            _this.theme = theme;
            if (_this.theme === "dark") {
                document.querySelector("ion-app").className += " dark-theme";
            }
            else {
                if (document.querySelector("ion-app").classList.contains("dark-theme")) {
                    document.querySelector("ion-app").classList.remove("dark-theme");
                }
            }
        });
        this.events.subscribe("premium:purchased", function () {
            _this.account.premium = true;
        });
    }
    MyApp.prototype.openLogin = function () {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_16__modals_login_login__["a" /* LoginModal */]);
        modal.onDidDismiss(function (data) {
            if (data) {
                _this.events.publish('session:retreived');
                _this.getAccount();
                _this.savePushId();
            }
            else {
                //skipped, create an anonymous user account
                var loading_1 = _this.loadingCtrl.create({
                    content: 'Creating anonymous user...'
                });
                loading_1.present();
                _this.auth.registerAnonymous().then(function (account) {
                    _this.events.publish('session:retreived');
                    _this.getAccount();
                    _this.savePushId();
                    loading_1.dismiss();
                    var alert = _this.alertCtrl.create({
                        title: 'Success',
                        subTitle: 'Your anonmyous user account has been created',
                        message: 'Login on other platforms using <strong>' + account["username"] + '</strong> with password <strong>' + account["password"] + '</strong>. Change this in your settings.',
                        buttons: [
                            {
                                text: 'OK',
                                role: 'cancel',
                                handler: function (data) {
                                }
                            }
                        ]
                    });
                    setTimeout(function () { alert.present(); }, 200);
                }).catch(function () {
                    loading_1.dismiss();
                    var alert = _this.alertCtrl.create({
                        title: 'Error',
                        message: 'There was an issue creating your anonymous user account.',
                        buttons: [
                            {
                                text: 'Dismiss',
                                role: 'cancel',
                                handler: function (data) {
                                    _this.openLogin();
                                }
                            }
                        ]
                    });
                    setTimeout(function () { alert.present(); }, 200);
                });
            }
        });
        modal.present();
    };
    MyApp.prototype.getAccount = function () {
        var _this = this;
        this.accountProvider.getAccount().then(function (account) {
            _this.account = account;
            if (_this.account.last_workout) {
                _this.account.last_workout_formatted = __WEBPACK_IMPORTED_MODULE_17_moment__(_this.account.last_workout).fromNow();
            }
            else {
                _this.account.last_workout = new Date();
                _this.account.last_workout_formatted = "never";
            }
            _this.checkPremium();
            _this.events.publish('user:retreived');
        });
    };
    MyApp.prototype.checkPremium = function () {
        var _this = this;
        if (this.platform.is('cordova')) {
            var premiumDate_1 = __WEBPACK_IMPORTED_MODULE_17_moment__(this.account.premium_date).add(1, 'months');
            if (this.account.premium && __WEBPACK_IMPORTED_MODULE_17_moment__(this.account.premium_date).add(1, 'months').isBefore(__WEBPACK_IMPORTED_MODULE_17_moment__())) {
                //check purchases
                this.iap.restorePurchases().then(function (purchases) {
                    var renewed = false;
                    var productId = _this.platform.is("android") ? "com.taylorhamling.intensity.premium2" : "com.taylorhamling.intensity.premium";
                    for (var _i = 0, purchases_1 = purchases; _i < purchases_1.length; _i++) {
                        var purchase = purchases_1[_i];
                        if (!purchase.date && purchase.receipt) {
                            var receipt = JSON.parse(purchase.receipt);
                            purchase.date = receipt.purchaseTime;
                        }
                        if (__WEBPACK_IMPORTED_MODULE_17_moment__(purchase.date).add(1, 'months').isAfter(__WEBPACK_IMPORTED_MODULE_17_moment__()) && purchase.productId === productId) {
                            premiumDate_1 = __WEBPACK_IMPORTED_MODULE_17_moment__(purchase.date);
                            renewed = true;
                            break;
                        }
                    }
                    if (renewed) {
                        _this.account.premium_date = premiumDate_1.format("YYYY-MM-DD");
                        _this.accountProvider.updateSettings({ premiumdate: _this.account.premium_date }, _this.account.id);
                    }
                    else {
                        _this.account.premium = false;
                        _this.accountProvider.updateSettings({ premium: _this.account.premium }, _this.account.id);
                    }
                });
            }
        }
    };
    MyApp.prototype.savePushId = function () {
        var _this = this;
        this.oneSignal.getIds().then(function (data) {
            if (data.userId) {
                //save
                _this.auth.savePushId(data.userId);
            }
        }).catch(function (e) {
            //console.log(e);
        });
    };
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            if (_this.platform.is("android")) {
                _this.statusBar.backgroundColorByHexString("#9c2111");
                _this.statusBar.styleLightContent();
            }
            else {
                _this.statusBar.styleLightContent();
            }
            _this.splashScreen.hide();
            _this.localNotifications.clearAll();
            if (_this.platform.is('cordova')) {
                _this.oneSignal.startInit("f500d613-213a-4a7b-9be0-a101ecbc36ed", "654916760436");
                _this.oneSignal.handleNotificationOpened().subscribe(function (data) {
                    if (!data.notification.isAppInFocus) {
                        var pushData = data.notification.payload.additionalData;
                        if (pushData.type === "friends") {
                            setTimeout(function () { _this.nav.push(__WEBPACK_IMPORTED_MODULE_7__pages_friends_friends__["a" /* FriendsPage */]); }, 500);
                        }
                        else if (pushData.type === "messages") {
                            setTimeout(function () { _this.nav.push(__WEBPACK_IMPORTED_MODULE_8__pages_messages_messages__["a" /* MessagesPage */]); }, 500);
                        }
                        else if (pushData.type === "leaderboard") {
                            setTimeout(function () { _this.nav.push(__WEBPACK_IMPORTED_MODULE_9__pages_leaderboard_leaderboard__["a" /* LeaderboardPage */]); }, 500);
                        }
                    }
                });
                _this.oneSignal.endInit();
            }
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"D:\Taylor\Documents\Websites\intensity2\src\app\app.html"*/`<ion-menu [content]="content" [ngClass]="{\'dark-theme\':theme === \'dark\'}">\n\n\n    <ion-content>\n\n        <div class="menu-header" menuClose (click)="openPage(profilePage)" [ngClass]="{\'is-premium\':account.premium}">\n            <div class="user-dp">\n                <img [src]="account.dp" onerror="this.style.display=\'none\'"/>\n            </div>\n            <div class="username">\n                {{account.username}}\n            </div>\n            <p>{{account.streak}} week streak, last workout {{account.last_workout_formatted}}</p>\n        </div>\n        \n        <div class="offline-mode" *ngIf="!connectionStatus">\n            <ion-spinner></ion-spinner>\n            Checking for internet connection...\n        </div>\n\n        <ion-list class=\'menu-list\'>\n            <button menuClose ion-item class=\'menu-premium\' (click)="openPage(premiumPage)" *ngIf="!account.premium">\n                <ion-icon name=\'star\' item-start></ion-icon>\n                Explore Premium\n            </button>            \n            <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n                <ion-icon [name]="p.icon" item-start></ion-icon>\n                {{p.title}}\n            </button>\n        </ion-list>\n    </ion-content>\n\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false" [ngClass]="{\'dark-theme\':theme === \'dark\'}"></ion-nav>`/*ion-inline-end:"D:\Taylor\Documents\Websites\intensity2\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_18__providers_account_account__["a" /* AccountProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_20__providers_authentication_authentication__["a" /* AuthenticationProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_onesignal__["a" /* OneSignal */], __WEBPACK_IMPORTED_MODULE_19__providers_offline_offline__["a" /* OfflineProvider */], __WEBPACK_IMPORTED_MODULE_21__ionic_native_in_app_purchase__["a" /* InAppPurchase */], __WEBPACK_IMPORTED_MODULE_22__ionic_native_local_notifications__["a" /* LocalNotifications */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 484:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 243,
	"./af.js": 243,
	"./ar": 244,
	"./ar-dz": 245,
	"./ar-dz.js": 245,
	"./ar-kw": 246,
	"./ar-kw.js": 246,
	"./ar-ly": 247,
	"./ar-ly.js": 247,
	"./ar-ma": 248,
	"./ar-ma.js": 248,
	"./ar-sa": 249,
	"./ar-sa.js": 249,
	"./ar-tn": 250,
	"./ar-tn.js": 250,
	"./ar.js": 244,
	"./az": 251,
	"./az.js": 251,
	"./be": 252,
	"./be.js": 252,
	"./bg": 253,
	"./bg.js": 253,
	"./bm": 254,
	"./bm.js": 254,
	"./bn": 255,
	"./bn.js": 255,
	"./bo": 256,
	"./bo.js": 256,
	"./br": 257,
	"./br.js": 257,
	"./bs": 258,
	"./bs.js": 258,
	"./ca": 259,
	"./ca.js": 259,
	"./cs": 260,
	"./cs.js": 260,
	"./cv": 261,
	"./cv.js": 261,
	"./cy": 262,
	"./cy.js": 262,
	"./da": 263,
	"./da.js": 263,
	"./de": 264,
	"./de-at": 265,
	"./de-at.js": 265,
	"./de-ch": 266,
	"./de-ch.js": 266,
	"./de.js": 264,
	"./dv": 267,
	"./dv.js": 267,
	"./el": 268,
	"./el.js": 268,
	"./en-au": 269,
	"./en-au.js": 269,
	"./en-ca": 270,
	"./en-ca.js": 270,
	"./en-gb": 271,
	"./en-gb.js": 271,
	"./en-ie": 272,
	"./en-ie.js": 272,
	"./en-nz": 273,
	"./en-nz.js": 273,
	"./eo": 274,
	"./eo.js": 274,
	"./es": 275,
	"./es-do": 276,
	"./es-do.js": 276,
	"./es-us": 277,
	"./es-us.js": 277,
	"./es.js": 275,
	"./et": 278,
	"./et.js": 278,
	"./eu": 279,
	"./eu.js": 279,
	"./fa": 280,
	"./fa.js": 280,
	"./fi": 281,
	"./fi.js": 281,
	"./fo": 282,
	"./fo.js": 282,
	"./fr": 283,
	"./fr-ca": 284,
	"./fr-ca.js": 284,
	"./fr-ch": 285,
	"./fr-ch.js": 285,
	"./fr.js": 283,
	"./fy": 286,
	"./fy.js": 286,
	"./gd": 287,
	"./gd.js": 287,
	"./gl": 288,
	"./gl.js": 288,
	"./gom-latn": 289,
	"./gom-latn.js": 289,
	"./gu": 290,
	"./gu.js": 290,
	"./he": 291,
	"./he.js": 291,
	"./hi": 292,
	"./hi.js": 292,
	"./hr": 293,
	"./hr.js": 293,
	"./hu": 294,
	"./hu.js": 294,
	"./hy-am": 295,
	"./hy-am.js": 295,
	"./id": 296,
	"./id.js": 296,
	"./is": 297,
	"./is.js": 297,
	"./it": 298,
	"./it.js": 298,
	"./ja": 299,
	"./ja.js": 299,
	"./jv": 300,
	"./jv.js": 300,
	"./ka": 301,
	"./ka.js": 301,
	"./kk": 302,
	"./kk.js": 302,
	"./km": 303,
	"./km.js": 303,
	"./kn": 304,
	"./kn.js": 304,
	"./ko": 305,
	"./ko.js": 305,
	"./ky": 306,
	"./ky.js": 306,
	"./lb": 307,
	"./lb.js": 307,
	"./lo": 308,
	"./lo.js": 308,
	"./lt": 309,
	"./lt.js": 309,
	"./lv": 310,
	"./lv.js": 310,
	"./me": 311,
	"./me.js": 311,
	"./mi": 312,
	"./mi.js": 312,
	"./mk": 313,
	"./mk.js": 313,
	"./ml": 314,
	"./ml.js": 314,
	"./mr": 315,
	"./mr.js": 315,
	"./ms": 316,
	"./ms-my": 317,
	"./ms-my.js": 317,
	"./ms.js": 316,
	"./my": 318,
	"./my.js": 318,
	"./nb": 319,
	"./nb.js": 319,
	"./ne": 320,
	"./ne.js": 320,
	"./nl": 321,
	"./nl-be": 322,
	"./nl-be.js": 322,
	"./nl.js": 321,
	"./nn": 323,
	"./nn.js": 323,
	"./pa-in": 324,
	"./pa-in.js": 324,
	"./pl": 325,
	"./pl.js": 325,
	"./pt": 326,
	"./pt-br": 327,
	"./pt-br.js": 327,
	"./pt.js": 326,
	"./ro": 328,
	"./ro.js": 328,
	"./ru": 329,
	"./ru.js": 329,
	"./sd": 330,
	"./sd.js": 330,
	"./se": 331,
	"./se.js": 331,
	"./si": 332,
	"./si.js": 332,
	"./sk": 333,
	"./sk.js": 333,
	"./sl": 334,
	"./sl.js": 334,
	"./sq": 335,
	"./sq.js": 335,
	"./sr": 336,
	"./sr-cyrl": 337,
	"./sr-cyrl.js": 337,
	"./sr.js": 336,
	"./ss": 338,
	"./ss.js": 338,
	"./sv": 339,
	"./sv.js": 339,
	"./sw": 340,
	"./sw.js": 340,
	"./ta": 341,
	"./ta.js": 341,
	"./te": 342,
	"./te.js": 342,
	"./tet": 343,
	"./tet.js": 343,
	"./th": 344,
	"./th.js": 344,
	"./tl-ph": 345,
	"./tl-ph.js": 345,
	"./tlh": 346,
	"./tlh.js": 346,
	"./tr": 347,
	"./tr.js": 347,
	"./tzl": 348,
	"./tzl.js": 348,
	"./tzm": 349,
	"./tzm-latn": 350,
	"./tzm-latn.js": 350,
	"./tzm.js": 349,
	"./uk": 351,
	"./uk.js": 351,
	"./ur": 352,
	"./ur.js": 352,
	"./uz": 353,
	"./uz-latn": 354,
	"./uz-latn.js": 354,
	"./uz.js": 353,
	"./vi": 355,
	"./vi.js": 355,
	"./x-pseudo": 356,
	"./x-pseudo.js": 356,
	"./yo": 357,
	"./yo.js": 357,
	"./zh-cn": 358,
	"./zh-cn.js": 358,
	"./zh-hk": 359,
	"./zh-hk.js": 359,
	"./zh-tw": 360,
	"./zh-tw.js": 360
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 484;

/***/ }),

/***/ 485:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ToolsDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tools_popover__ = __webpack_require__(388);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ToolsDirective = (function () {
    function ToolsDirective(popoverCtrl) {
        this.popoverCtrl = popoverCtrl;
    }
    ToolsDirective.prototype.onClick = function (ev) {
        this.presentPopover(ev);
    };
    ToolsDirective.prototype.presentPopover = function (ev) {
        var popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_2__tools_popover__["a" /* PopoverPage */], {}, { cssClass: "tools-popover" });
        popover.present({
            ev: ev
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('click', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], ToolsDirective.prototype, "onClick", null);
    ToolsDirective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[tools]'
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* PopoverController */]])
    ], ToolsDirective);
    return ToolsDirective;
}());

//# sourceMappingURL=tools.js.map

/***/ }),

/***/ 494:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Autosize; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var Autosize = (function () {
    function Autosize(element) {
        this.element = element;
    }
    Autosize.prototype.onInput = function (textArea) {
        this.adjust();
    };
    Autosize.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () { return _this.adjust(); }, 0);
    };
    Autosize.prototype.adjust = function () {
        var textArea = this.element.nativeElement.getElementsByTagName('textarea')[0];
        textArea.style.overflow = 'hidden';
        textArea.style.height = 'auto';
        textArea.style.height = textArea.scrollHeight + "px";
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('input', ['$event.target']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [HTMLTextAreaElement]),
        __metadata("design:returntype", void 0)
    ], Autosize.prototype, "onInput", null);
    Autosize = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: 'ion-textarea[autosize]'
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]])
    ], Autosize);
    return Autosize;
}());

//# sourceMappingURL=autosize.js.map

/***/ }),

/***/ 498:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ExerciseSearchPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var ExerciseSearchPipe = (function () {
    function ExerciseSearchPipe() {
    }
    ExerciseSearchPipe.prototype.transform = function (items, term) {
        var returnItems = items.filter(function (item) { return item.name.toLowerCase().indexOf(term.toLowerCase()) !== -1; });
        return returnItems;
    };
    ExerciseSearchPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
            name: 'exerciseSearch'
        }),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
    ], ExerciseSearchPipe);
    return ExerciseSearchPipe;
}());

//# sourceMappingURL=exercise-search.js.map

/***/ }),

/***/ 499:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProgramSearchPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var ProgramSearchPipe = (function () {
    function ProgramSearchPipe() {
    }
    ProgramSearchPipe.prototype.transform = function (items, term) {
        var returnItems = items.filter(function (item) { return item.name.toLowerCase().indexOf(term.toLowerCase()) !== -1; });
        return returnItems;
    };
    ProgramSearchPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
            name: 'programSearch'
        }),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
    ], ProgramSearchPipe);
    return ProgramSearchPipe;
}());

//# sourceMappingURL=program-search.js.map

/***/ }),

/***/ 500:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArraySortPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var ArraySortPipe = (function () {
    function ArraySortPipe() {
    }
    ArraySortPipe.prototype.transform = function (array, field) {
        array.sort(function (a, b) {
            if (field === "id") {
                a = parseInt(a[field]);
                b = parseInt(b[field]);
            }
            else {
                a = a[field].toLowerCase();
                b = b[field].toLowerCase();
            }
            if (a < b) {
                return -1;
            }
            else if (a > b) {
                return 1;
            }
            else {
                return 0;
            }
        });
        return array;
    };
    ArraySortPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
            name: "sort"
        })
    ], ArraySortPipe);
    return ArraySortPipe;
}());

//# sourceMappingURL=sort.js.map

/***/ }),

/***/ 53:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DiaryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_diary_diary__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_account_account__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_exercise_exercise__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_diary_exercise_diary_exercise__ = __webpack_require__(361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ion_datepicker__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__modals_add_exercise_add_exercise__ = __webpack_require__(367);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_social_sharing__ = __webpack_require__(44);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var DiaryPage = (function () {
    function DiaryPage(navCtrl, params, modalCtrl, storage, diaryProvider, accountProvider, events, exerciseProvider, alertCtrl, socialSharing) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.params = params;
        this.modalCtrl = modalCtrl;
        this.storage = storage;
        this.diaryProvider = diaryProvider;
        this.accountProvider = accountProvider;
        this.events = events;
        this.exerciseProvider = exerciseProvider;
        this.alertCtrl = alertCtrl;
        this.socialSharing = socialSharing;
        this.selectedDate = this.params.data.date ? this.params.data.date : new Date();
        this.reorderActive = false;
        this.markedWorkoutDates = [];
        this.setupSlides();
        this.events.subscribe('session:retreived', function () {
            if (_this.workouts.length > 1 && !_this.workouts[7].retreived) {
                _this.getWorkout(_this.workouts[7]);
            }
        });
        this.events.subscribe('workout:copied', function (data) {
            _this.refreshWorkouts();
        });
        this.events.subscribe('requests:completed', function (data) {
            _this.refreshWorkouts();
        });
        this.events.subscribe('settings:updated', function (data) {
            _this.account = data;
        });
        this.events.subscribe('goals:updated', function (data) {
            _this.account = data;
            _this.navCtrl.popToRoot();
            _this.refreshWorkouts();
        });
        this.events.subscribe('recentexercises:retreived', function (data) {
            _this.recentExercises = data;
        });
        this.storage.get("account").then(function (data) {
            _this.account = data;
        });
        this.setMarkedDates();
    }
    DiaryPage.prototype.refreshWorkouts = function () {
        for (var _i = 0, _a = this.workouts; _i < _a.length; _i++) {
            var workout = _a[_i];
            workout.retreived = false;
        }
        this.getWorkout(this.workouts[this.slides.getActiveIndex()]);
    };
    DiaryPage.prototype.sendPush = function () {
        this.diaryProvider.sendPush().then(function (data) {
        });
    };
    DiaryPage.prototype.setupSlides = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.workoutSlides = [_this.selectedDate];
            _this.workouts = [{ loading: true, retreived: false, workouts: [] }];
            for (var i = 1; i < 8; i++) {
                var newDate = _this.calculateDate(_this.selectedDate, -i);
                _this.workoutSlides.unshift(newDate);
                _this.workouts.unshift({ loading: true, retreived: false, workouts: [] });
                var newDate2 = _this.calculateDate(_this.selectedDate, i);
                _this.workoutSlides.push(newDate2);
                _this.workouts.push({ loading: true, retreived: false, workouts: [] });
            }
            resolve();
        });
    };
    DiaryPage.prototype.getWorkout = function (workout) {
        if (workout.retreived) {
            return;
        }
        else {
            workout.loading = true;
            var formattedDate = __WEBPACK_IMPORTED_MODULE_3_moment__(this.selectedDate).format('YYYY-MM-DD');
            this.diaryProvider.getWorkout(formattedDate).then(function (data) {
                workout.workouts = data;
                workout.loading = false;
                workout.retreived = true;
            })
                .catch(function () {
                workout.loading = false;
                workout.retreived = false;
            });
        }
    };
    DiaryPage.prototype.updateExercise = function (exercise) {
        var formattedDate = __WEBPACK_IMPORTED_MODULE_3_moment__(this.selectedDate).format('YYYY-MM-DD');
        this.diaryProvider.getWorkout(formattedDate).then(function (data) {
            for (var _i = 0, _a = data; _i < _a.length; _i++) {
                var workoutExercise = _a[_i];
                if (exercise["exerciseid"] === workoutExercise["exerciseid"]) {
                    exercise["sets"] = workoutExercise["sets"];
                }
            }
        });
    };
    DiaryPage.prototype.setMarkedDates = function () {
        var _this = this;
        this.markedWorkoutDates = [];
        this.diaryProvider.getWorkoutDates().then(function (dates) {
            var workoutDates = dates["data"];
            for (var _i = 0, workoutDates_1 = workoutDates; _i < workoutDates_1.length; _i++) {
                var date = workoutDates_1[_i];
                var workoutDate = new Date(date["assigneddate"]);
                _this.markedWorkoutDates.push(workoutDate);
            }
        });
    };
    DiaryPage.prototype.calculateDate = function (date, change) {
        return (function (d) { return new Date(d.setDate(d.getDate() + change)); })(new Date(date));
    };
    DiaryPage.prototype.getSelectedDate = function () {
        return __WEBPACK_IMPORTED_MODULE_3_moment__(this.selectedDate).calendar(null, {
            sameDay: '[Today]',
            nextDay: '[Tomorrow]',
            nextWeek: 'dddd',
            lastDay: '[Yesterday]',
            lastWeek: '[Last] dddd',
            sameElse: 'dddd, MMMM Do YYYY'
        });
    };
    DiaryPage.prototype.getSelectedDateKey = function () {
        return __WEBPACK_IMPORTED_MODULE_3_moment__(this.selectedDate).format('YYYY-MM-DD');
    };
    DiaryPage.prototype.changeDay = function (direction) {
        this.reorderActive = false;
        this.selectedDate = this.calculateDate(this.selectedDate, direction);
        this.getWorkout(this.workouts[this.slides.getActiveIndex()]);
        if (direction > 0) {
            this.slides.slideNext();
        }
        else {
            this.slides.slidePrev();
        }
    };
    DiaryPage.prototype.changeDate = function (date) {
        var _this = this;
        this.selectedDate = date;
        this.setupSlides().then(function () {
            _this.slides.slideTo(7, 0, false);
            _this.getWorkout(_this.workouts[7]);
        });
    };
    DiaryPage.prototype.workoutChanged = function () {
        this.reorderActive = false;
        this.selectedDate = this.workoutSlides[this.slides.getActiveIndex()];
        this.getWorkout(this.workouts[this.slides.getActiveIndex()]);
        if (this.slides.isBeginning()) {
            for (var i = 1; i < 8; i++) {
                var newDate = this.calculateDate(this.selectedDate, -i);
                this.workoutSlides.unshift(newDate);
                this.workouts.unshift({ loading: true, retreived: false, workouts: [] });
            }
            this.slides.slideTo(7, 0, false);
        }
        else if (this.slides.isEnd()) {
            for (var i = 1; i < 8; i++) {
                var newDate = this.calculateDate(this.selectedDate, i);
                this.workoutSlides.push(newDate);
                this.workouts.push({ loading: true, retreived: false, workouts: [] });
            }
        }
    };
    DiaryPage.prototype.openAddDiaryModal = function () {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_9__modals_add_exercise_add_exercise__["a" /* AddExerciseModal */], { recentExercises: this.recentExercises });
        modal.onDidDismiss(function (exercise) {
            if (exercise) {
                var workout = _this.workouts[_this.slides.getActiveIndex()];
                for (var _i = 0, _a = workout.workouts; _i < _a.length; _i++) {
                    var workoutExercise_1 = _a[_i];
                    if (workoutExercise_1.name === exercise.name) {
                        //already added, just open it
                        _this.selectExercise(workoutExercise_1);
                        return;
                    }
                }
                var workoutExercise_2 = { name: exercise.name, exerciseid: exercise.id, calibrating: false, addid: null, goals: { goal: 1, progress: 0 }, history: [], records: {}, sets: [], reps: "", weight: "", unit: false };
                workout.workouts.push(workoutExercise_2);
                _this.events.publish("workout:added", { date: _this.selectedDate });
                var formattedDate = __WEBPACK_IMPORTED_MODULE_3_moment__(_this.selectedDate).format('YYYY-MM-DD');
                _this.exerciseProvider.getExerciseData(exercise.id, formattedDate).then(function (data) {
                    workoutExercise_2.calibrating = data["history"] && data["history"].length < 1 ? true : false;
                    workoutExercise_2.goals = data["goals"];
                    workoutExercise_2.history = data["history"];
                    workoutExercise_2.records = data["records"];
                    if (data["reps"] > 0)
                        workoutExercise_2.reps = data["reps"];
                    if (data["weight"] > 0)
                        workoutExercise_2.weight = data["weight"];
                    workoutExercise_2.unit = data["unit"] ? data["unit"] : _this.account.units;
                });
                _this.selectExercise(workoutExercise_2);
            }
        });
        modal.present();
    };
    DiaryPage.prototype.addSet = function (ev, exercise) {
        var _this = this;
        ev.stopPropagation();
        ev.preventDefault();
        var reps = exercise.sets.length > 0 ? exercise.sets[exercise.sets.length - 1]["reps"] : (exercise.reps > 0 ? exercise.reps : "");
        var weight = exercise.sets.length > 0 ? exercise.sets[exercise.sets.length - 1]["weight"] : (exercise.weight > 0 ? exercise.weight : "");
        var prompt = this.alertCtrl.create({
            title: 'Add Set',
            inputs: [
                {
                    name: 'reps',
                    placeholder: 'Reps',
                    type: "number",
                    value: reps
                },
                {
                    name: 'weight',
                    placeholder: 'Weight',
                    type: "number",
                    value: weight
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) {
                    }
                },
                {
                    text: 'Add',
                    handler: function (data) {
                        var set = {
                            id: 0,
                            reps: data.reps ? data.reps : 0,
                            weight: data.weight ? data.weight : 0,
                            percentage: _this.determinePercentage(data.reps),
                            rpe: 8,
                            unit: exercise.unit ? exercise.unit : _this.account.units,
                            sets: exercise.sets.length > 0 ? parseInt(exercise.sets[exercise.sets.length - 1].sets) + 1 : 1,
                            completed: _this.account.autocomplete
                        };
                        exercise.sets.push(set);
                        _this.events.publish("workout:added", { date: _this.selectedDate });
                        if (_this.account.autocomplete) {
                            exercise.goals.progress = exercise.goals.progress + _this.getProgressAmount(set);
                        }
                        _this.diaryProvider.addSet(__WEBPACK_IMPORTED_MODULE_3_moment__(_this.selectedDate).format('YYYY-MM-DD'), exercise.exerciseid, exercise, set).then(function (res) {
                            set.id = res["id"];
                            exercise.goals = res["goals"];
                            exercise.records = res["records"];
                            exercise.cailbrating = res["calibrating"];
                            exercise.history = res["history"];
                        });
                    }
                }
            ]
        });
        prompt.present();
    };
    DiaryPage.prototype.determinePercentage = function (reps) {
        var percentages = { 0: 0, 1: 100, 2: 95, 3: 90, 4: 88, 5: 86, 6: 83, 7: 80, 8: 78, 9: 76, 10: 75, 11: 72, 12: 70, 13: 66, 14: 63, 15: 60 };
        var repRounded = Math.floor(reps);
        return repRounded > 15 ? 50 : percentages[repRounded];
        ;
    };
    DiaryPage.prototype.getProgressAmount = function (set) {
        if (this.account.goals.primary === "volume") {
            return set.reps * set.weight;
        }
        else if (this.account.goals.primary === "reps") {
            return parseFloat(set.reps);
        }
        else if (this.account.goals.primary === "weight") {
            return parseFloat(set.weight);
        }
        return 0;
    };
    DiaryPage.prototype.toggleSet = function (ev, set, exercise) {
        ev.stopPropagation();
        ev.preventDefault();
        set.completed = !set.completed || set.completed === "0" ? false : true;
        set.completed = !set.completed;
        if (set.completed) {
            exercise.goals.progress = exercise.goals.progress + this.getProgressAmount(set);
        }
        else {
            exercise.goals.progress = exercise.goals.progress - this.getProgressAmount(set);
        }
        this.diaryProvider.editSet(__WEBPACK_IMPORTED_MODULE_3_moment__(this.selectedDate).format('YYYY-MM-DD'), exercise.exerciseid, set).then(function (data) {
            exercise.goals = data["goals"];
            exercise.records = data["records"];
            exercise.cailbrating = data["calibrating"];
            exercise.history = data["history"];
        });
    };
    DiaryPage.prototype.selectExercise = function (exercise) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__pages_diary_exercise_diary_exercise__["a" /* DiaryExercisePage */], { exercise: exercise, date: this.selectedDate });
    };
    DiaryPage.prototype.showOptions = function (exercise, index) {
        var _this = this;
        var alertObj = {
            title: exercise.name,
            cssClass: "button-only-alert",
            buttons: [
                {
                    text: 'Share',
                    handler: function (data) {
                        var setText = "I tracked " + exercise.name + " on Intensity. These are my sets: ";
                        for (var _i = 0, _a = exercise.sets; _i < _a.length; _i++) {
                            var set = _a[_i];
                            setText = setText + set.reps + " reps with " + set.weight + set.unit + " (" + set.percentage + "%, " + set.rpe + "rpe), ";
                        }
                        setText = setText.replace(/^[,\s]+|[,\s]+$/g, '');
                        _this.socialSharing
                            .share(setText, "My workout on Intensity", null, "http://www.intensityapp.com/") // Share via native share sheet
                            .then(function (result) {
                            // Success!
                        }, function (err) {
                            // An error occured. Show a message to the user
                        });
                    },
                    cssClass: "share-button"
                },
                {
                    text: 'Copy',
                    handler: function (data) {
                        _this.selectedExercise = exercise;
                        _this.datepicker.open();
                    },
                    cssClass: "copy-button"
                },
                {
                    text: 'Reorder',
                    handler: function (data) {
                        _this.reorderActive = true;
                    },
                    cssClass: "reorder-button"
                },
                {
                    text: 'Remove',
                    handler: function (data) {
                        var alert = _this.alertCtrl.create({
                            title: "Remove Exercise",
                            message: "Are you sure you want to remove this exercise? This will delete all sets from the current workout for this exercise.",
                            buttons: [
                                {
                                    text: 'Cancel',
                                    role: 'cancel'
                                },
                                {
                                    text: 'Yes',
                                    handler: function (data) {
                                        var workout = _this.workouts[_this.slides.getActiveIndex()];
                                        workout.workouts.splice(index, 1);
                                        _this.diaryProvider.removeExercise(__WEBPACK_IMPORTED_MODULE_3_moment__(_this.selectedDate).format('YYYY-MM-DD'), exercise.exerciseid);
                                    }
                                }
                            ]
                        });
                        setTimeout(function () {
                            alert.present();
                        }, 200);
                    },
                    cssClass: "remove-button"
                }
            ]
        };
        if (exercise.addid) {
            alertObj.buttons.push({
                text: 'Remove Program',
                handler: function (data) {
                    var alert = _this.alertCtrl.create({
                        title: "Remove Program",
                        message: "Are you sure you want to remove this program? This will delete all workouts from this added program.",
                        buttons: [
                            {
                                text: 'Cancel',
                                role: 'cancel'
                            },
                            {
                                text: 'Yes',
                                handler: function (data) {
                                    var workout = _this.workouts[_this.slides.getActiveIndex()];
                                    for (var i = workout.workouts.length - 1; i >= 0; i--) {
                                        if (workout.workouts[i].addid === exercise.addid) {
                                            workout.workouts.splice(i, 1);
                                        }
                                    }
                                    for (var _i = 0, _a = _this.workouts; _i < _a.length; _i++) {
                                        var workout_1 = _a[_i];
                                        workout_1.retreived = false;
                                    }
                                    _this.diaryProvider.removeProgram(exercise.addid);
                                }
                            }
                        ]
                    });
                    setTimeout(function () {
                        alert.present();
                    }, 200);
                },
                cssClass: "remove-program-button"
            });
        }
        var alert = this.alertCtrl.create(alertObj);
        alert.present();
    };
    DiaryPage.prototype.copyWorkout = function (date) {
        var _this = this;
        var data = {
            title: "What sets do you want to copy?",
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel'
                },
                {
                    text: 'Copy',
                    handler: function (data) {
                        var copy = {
                            exerciseid: data === "sets" ? _this.selectedExercise.exerciseid : null,
                            userid: _this.account.id,
                            type: data,
                            date: __WEBPACK_IMPORTED_MODULE_3_moment__(date).format('YYYY-MM-DD'),
                            assigneddate: __WEBPACK_IMPORTED_MODULE_3_moment__(_this.selectedDate).format('YYYY-MM-DD')
                        };
                        _this.diaryProvider.copyWorkout(copy).then(function () {
                            _this.events.publish('workout:copied', { date: copy.date });
                            var sets = 0;
                            if (data === "sets") {
                                sets = _this.selectedExercise.sets.length;
                            }
                            else {
                                var workout = _this.workouts[_this.slides.getActiveIndex()];
                                for (var _i = 0, _a = workout.workouts; _i < _a.length; _i++) {
                                    var exercise = _a[_i];
                                    sets = sets + exercise.sets.length;
                                }
                            }
                            var alert = _this.alertCtrl.create({
                                title: sets + " sets copied",
                                subTitle: "To " + __WEBPACK_IMPORTED_MODULE_3_moment__(date).format('MMMM Do YYYY'),
                                buttons: [
                                    {
                                        text: 'OK',
                                        role: 'cancel'
                                    }
                                ]
                            });
                            alert.present();
                        });
                    }
                }
            ],
            inputs: [
                { type: 'radio', label: "Selected Exercise", value: "sets", checked: true },
                { type: 'radio', label: "Entire Workout", value: "workout", checked: false }
            ]
        };
        var alert = this.alertCtrl.create(data);
        setTimeout(function () {
            alert.present();
        }, 200);
    };
    DiaryPage.prototype.reorderItems = function (indexes) {
        var workout = this.workouts[this.slides.getActiveIndex()];
        var element = workout.workouts[indexes.from];
        workout.workouts.splice(indexes.from, 1);
        workout.workouts.splice(indexes.to, 0, element);
        var sets = [];
        var order = 1;
        for (var _i = 0, _a = workout.workouts; _i < _a.length; _i++) {
            var exercise = _a[_i];
            for (var index in exercise.sets) {
                exercise.sets[index]["exerciseorder"] = order;
                sets.push({ id: exercise.sets[index].id, exerciseorder: order });
            }
            order = order + 1;
        }
        this.diaryProvider.reorderExercises(__WEBPACK_IMPORTED_MODULE_3_moment__(this.selectedDate).format('YYYY-MM-DD'), sets);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* Slides */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* Slides */])
    ], DiaryPage.prototype, "slides", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_8_ion_datepicker__["a" /* DatePickerDirective */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_8_ion_datepicker__["a" /* DatePickerDirective */])
    ], DiaryPage.prototype, "datepicker", void 0);
    DiaryPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-diary',template:/*ion-inline-start:"D:\Taylor\Documents\Websites\intensity2\src\pages\diary\diary.html"*/`<ion-header>\n    <ion-navbar color="primary">\n        <button ion-button menuToggle [hidden]="reorderActive">\n            <ion-icon name="menu"></ion-icon>\n        </button>\n        <ion-title>Diary</ion-title>\n\n        <ion-buttons end>\n            <button ion-button icon-only tools tappable>\n                <ion-icon name="more" ></ion-icon>\n            </button>\n        </ion-buttons>    \n        \n        <ion-buttons class="reorder-close" left [hidden]="!reorderActive">\n            <button ion-button icon-only (click)="reorderActive = false">\n                <ion-icon name="close" ></ion-icon>\n            </button>\n        </ion-buttons>         \n    \n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <span ion-datepicker [hidden]="true" (ionChanged)="copyWorkout($event)" [okText]="\'Copy To Date\'">Copy</span>\n    <div class="date-changer">\n        <ion-icon tappable ios="ios-arrow-back" md="ios-arrow-back" (click)="changeDay(-1)"></ion-icon>\n        <span tappable ion-datepicker [markDates]="markedWorkoutDates" (ionChanged)="changeDate($event)">{{getSelectedDate()}}</span>\n        <ion-icon tappable ios="ios-arrow-forward" md="ios-arrow-forward" (click)="changeDay(1)"></ion-icon>\n    </div>\n    \n    <ion-slides initialSlide="7" (ionSlideDidChange)="workoutChanged()">\n\n        <ion-slide style="background-color:#ececec;" *ngFor="let slide of workoutSlides; let i = index" >\n            \n            <div class="diary-loading" *ngIf="workouts[i].loading">\n                <ion-spinner></ion-spinner>\n            </div>\n                   \n            <div class="diary-empty" *ngIf="workouts[i].workouts.length < 1 && !workouts[i].loading">\n                <ion-icon name=\'bookmarks\'></ion-icon>\n                Diary Empty\n            </div>                   \n                   \n            <ion-list reorder="{{reorderActive}}" side="start" (ionItemReorder)="reorderItems($event)" class=\'diary-exercise-list\' *ngIf="!workouts[i].loading">\n              <ion-item *ngFor="let exercise of workouts[i].workouts; let i = index" (click)="selectExercise(exercise)" (press)="showOptions(exercise, i)">\n                  <h2>{{exercise.name}}</h2>\n                  <p *ngIf="exercise.sets.length < 11">\n                      <ion-icon tappable *ngFor="let set of exercise.sets" [ngClass]="{\'completed\' : !(!set.completed || set.completed === \'0\')}" name=\'checkmark-circle\' (click)="toggleSet($event,set, exercise)"></ion-icon>\n                      <ion-icon class="add-set" name=\'add-circle\' tappable (click)="addSet($event,exercise)"></ion-icon>\n                  </p>\n                  <p *ngIf="exercise.sets.length > 10">\n                      <span class="set-overflow">{{exercise.sets.length}}</span>\n                      <ion-icon class="add-set" name=\'add-circle\' tappable  (click)="addSet($event,exercise)"></ion-icon>\n                  </p>                  \n                  \n                  <div class="bar-progress" [ngStyle]="{\'width\': (exercise.goals.progress / exercise.goals.goal) * 100 + \'%\'}" [ngClass]="{\'calibrating\' : exercise.calibrating}"></div>\n                  <ion-icon ios="ios-arrow-forward" md="ios-arrow-forward" item-end ></ion-icon>\n              </ion-item>\n \n                \n                \n            </ion-list>            \n            \n            \n        </ion-slide>\n\n    </ion-slides>\n    \n    <ion-fab bottom right>\n        <button ion-fab color="primary" (click)="openAddDiaryModal()">\n            <ion-icon name="add"></ion-icon>\n        </button>\n    </ion-fab>\n    \n</ion-content>\n`/*ion-inline-end:"D:\Taylor\Documents\Websites\intensity2\src\pages\diary\diary.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_4__providers_diary_diary__["a" /* DiaryProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_account_account__["a" /* AccountProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_6__providers_exercise_exercise__["a" /* ExerciseProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_10__ionic_native_social_sharing__["a" /* SocialSharing */]])
    ], DiaryPage);
    return DiaryPage;
}());

//# sourceMappingURL=diary.js.map

/***/ }),

/***/ 54:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProgramProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_settings__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(4);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/*
  Generated class for the DiaryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var ProgramProvider = (function () {
    function ProgramProvider(http, storage, events) {
        this.http = http;
        this.storage = storage;
        this.events = events;
    }
    ProgramProvider.prototype.getPrograms = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("session").then(function (session) {
                var data = { key: __WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiKey, session: session, controller: "view", action: "getprograms" };
                _this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl, data).subscribe(function (res) {
                    if (res["success"] === true) {
                        _this.storage.set("programs", res["data"]);
                        resolve(res["data"]);
                    }
                    else {
                        reject(res);
                    }
                }, function (e) {
                    _this.events.publish("app:heartbeat");
                    _this.storage.get("programs").then(function (data) {
                        if (data) {
                            resolve(data);
                            return;
                        }
                        reject(e);
                    });
                });
            });
        });
    };
    ProgramProvider.prototype.getSuggestedPrograms = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("session").then(function (session) {
                var data = { key: __WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiKey, session: session, controller: "view", action: "getsuggestedprograms" };
                _this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl, data).subscribe(function (res) {
                    if (res["success"] === true) {
                        _this.storage.set("suggestedprograms", res["data"]);
                        resolve(res["data"]);
                    }
                    else {
                        reject(res);
                    }
                }, function (e) {
                    _this.events.publish("app:heartbeat");
                    _this.storage.get("suggestedprograms").then(function (data) {
                        if (data) {
                            resolve(data);
                            return;
                        }
                        reject(e);
                    });
                });
            });
        });
    };
    ProgramProvider.prototype.getRecentPrograms = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("session").then(function (session) {
                var data = { key: __WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiKey, session: session, controller: "view", action: "selectresults", type: "programs", limit: 99 };
                _this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl, data).subscribe(function (res) {
                    if (res["success"] === true) {
                        _this.storage.set("recentprograms", res["data"]);
                        resolve(res["data"]);
                    }
                    else {
                        reject(res);
                    }
                }, function (e) {
                    _this.events.publish("app:heartbeat");
                    _this.storage.get("recentprograms").then(function (data) {
                        if (data) {
                            resolve(data);
                            return;
                        }
                        reject(e);
                    });
                });
            });
        });
    };
    ProgramProvider.prototype.getCreatedPrograms = function (userId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("session").then(function (session) {
                var data = { key: __WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiKey, session: session, controller: "view", action: "getprograms", userid: userId };
                _this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl, data).subscribe(function (res) {
                    if (res["success"] === true) {
                        _this.storage.set("createdprograms", res["data"]);
                        resolve(res["data"]);
                    }
                    else {
                        reject(res);
                    }
                }, function (e) {
                    _this.events.publish("app:heartbeat");
                    _this.storage.get("createdprograms").then(function (data) {
                        if (data) {
                            resolve(data);
                            return;
                        }
                        reject(e);
                    });
                });
            });
        });
    };
    ProgramProvider.prototype.getProgram = function (programId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("session").then(function (session) {
                var data = { key: __WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiKey, session: session, controller: "view", action: "getprograms", id: programId };
                _this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl, data).subscribe(function (res) {
                    if (res["success"] === true && res["data"].length > 0) {
                        _this.storage.set("program" + programId, res["data"][0]);
                        resolve(res["data"][0]);
                    }
                    else {
                        reject(res);
                    }
                }, function (e) {
                    _this.events.publish("app:heartbeat");
                    _this.storage.get("program" + programId).then(function (data) {
                        if (data) {
                            resolve(data);
                            return;
                        }
                        reject(e);
                    });
                });
            });
        });
    };
    ProgramProvider.prototype.addProgram = function (details) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("session").then(function (session) {
                var data = { key: __WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiKey, session: session, controller: "create", action: "addresults" };
                Object.assign(data, details);
                _this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl, data).subscribe(function (res) {
                    if (res["success"] === true) {
                        resolve(res["data"]);
                    }
                    else {
                        reject(res);
                    }
                }, function (e) {
                    _this.events.publish("app:heartbeat");
                    reject(e);
                });
            });
        });
    };
    ProgramProvider.prototype.addWorkout = function (workoutId, date) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("session").then(function (session) {
                var data = { key: __WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiKey, session: session, controller: "create", action: "addresults", workoutid: workoutId, assigneddate: date };
                _this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl, data).subscribe(function (res) {
                    if (res["success"] === true) {
                        resolve(res["data"]);
                    }
                    else {
                        reject(res);
                    }
                }, function (e) {
                    _this.events.publish("app:heartbeat");
                    reject(e);
                });
            });
        });
    };
    ProgramProvider.prototype.createProgram = function (program) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("session").then(function (session) {
                var data = { key: __WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiKey, session: session, controller: "create", action: "createfullprogram", program: program };
                _this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl, data).subscribe(function (res) {
                    if (res["success"] === true) {
                        resolve(res["data"]);
                    }
                    else {
                        reject(res);
                    }
                }, function (e) {
                    _this.events.publish("app:heartbeat");
                    reject(e);
                });
            });
        });
    };
    ProgramProvider.prototype.updateProgram = function (program) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("session").then(function (session) {
                var data = { key: __WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiKey, session: session, controller: "edit", action: "updatefullprogram", program: program };
                _this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl, data).subscribe(function (res) {
                    if (res["success"] === true) {
                        resolve(res["data"]);
                    }
                    else {
                        reject(res);
                    }
                }, function (e) {
                    _this.events.publish("app:heartbeat");
                    reject(e);
                });
            });
        });
    };
    ProgramProvider.prototype.deleteProgram = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("session").then(function (session) {
                var data = { key: __WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiKey, session: session, controller: "edit", action: "deleteprogram", id: id };
                _this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl, data).subscribe(function (res) {
                    if (res["success"] === true) {
                        resolve(res["data"]);
                    }
                    else {
                        reject(res);
                    }
                }, function (e) {
                    _this.events.publish("app:heartbeat");
                    reject(e);
                });
            });
        });
    };
    ProgramProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["d" /* Events */]])
    ], ProgramProvider);
    return ProgramProvider;
}());

//# sourceMappingURL=program.js.map

/***/ }),

/***/ 70:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChartProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/*
  Generated class for the DiaryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var ChartProvider = (function () {
    function ChartProvider(http, storage) {
        this.http = http;
        this.storage = storage;
    }
    ChartProvider.prototype.brighten = function (hex, lum) {
        // Validate hex string
        hex = String(hex).replace(/[^0-9a-f]/gi, "");
        if (hex.length < 6) {
            hex = hex.replace(/(.)/g, '$1$1');
        }
        lum = lum || 0;
        // Convert to decimal and change luminosity
        var rgb = "#", c;
        for (var i = 0; i < 3; ++i) {
            c = parseInt(hex.substr(i * 2, 2), 16);
            c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
            rgb += ("00" + c).substr(c.length);
        }
        return rgb;
    };
    ChartProvider.prototype.getColors = function () {
        var colors = [], base = '#de4223', i;
        for (i = 0; i < 20; i += 1) {
            // Start out with a darkened base color (negative brighten), and end
            // up with a much brighter color
            colors.push(this.brighten(base, (i - 3) / 7));
        }
        return colors;
    };
    ChartProvider.prototype.getLineConfig = function () {
        return {
            options: {
                chart: {
                    type: 'line',
                    zoomType: 'x',
                    resetZoomButton: {
                        position: {
                            align: 'right',
                            verticalAlign: 'top',
                            y: 10
                        },
                        relativeTo: 'chart'
                    },
                    spacingRight: 20,
                    marginLeft: 70,
                    marginTop: 40
                }
            },
            series: [{
                    data: [],
                    name: "",
                    color: '#de4223',
                    showInLegend: false
                }],
            title: {
                text: null
            },
            credits: {
                enabled: false
            },
            yAxis: { title: { text: "" }, min: 0 },
            xAxis: { type: 'datetime',
                dateTimeLabelFormats: {
                    month: '%e. %b',
                    year: '%b'
                } },
            tooltip: {},
            loading: false
        };
    };
    ChartProvider.prototype.getHeatmapConfig = function () {
        return {
            chart: {
                type: 'heatmap',
                spacingRight: 20
            },
            colorAxis: {
                min: 0,
                minColor: '#ffffff',
                maxColor: '#de4223'
            },
            legend: {
                enabled: true
            },
            tooltip: {
                headerFormat: '',
                pointFormat: '<b>Date:</b> {point.x:%e. %b}<br><b>Volume:</b> {point.value:.0f}'
            },
            title: {
                text: null
            },
            credits: {
                enabled: false
            },
            xAxis: {
                type: 'datetime',
                min: Date.UTC(2016, 0, 1),
                max: Date.UTC(2017, 0, 1),
                labels: {
                    format: '{value:%b}',
                    step: 1
                },
                showLastLabel: false,
                tickLength: 4
            },
            yAxis: {
                categories: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
                title: null,
                reversed: true,
                gridLineWidth: 0,
                minorGridLineWidth: 0,
            },
            series: [{
                    name: 'Session workload',
                    borderWidth: 0,
                    colsize: 24 * 36e5 * 7,
                    borderColor: '#de4223',
                    data: [],
                    dataLabels: {
                        enabled: false,
                        color: 'black',
                        style: {
                            textShadow: 'none'
                        }
                    }
                }]
        };
    };
    ChartProvider.prototype.getPieConfig = function () {
        return {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            tooltip: {
                pointFormat: 'Total Volume:<b>{point.y:.0f}</b><br>{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                    },
                    colors: this.getColors()
                }
            },
            title: {
                text: null
            },
            credits: {
                enabled: false
            },
            series: [{
                    name: 'Percentage of total volume',
                    colorByPoint: true,
                    borderWidth: 0,
                    data: []
                }]
        };
    };
    ChartProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]])
    ], ChartProvider);
    return ChartProvider;
}());

//# sourceMappingURL=chart.js.map

/***/ }),

/***/ 71:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthenticationProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_facebook__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_settings__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/*
  Generated class for the AuthenticationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var AuthenticationProvider = (function () {
    function AuthenticationProvider(http, fb, storage) {
        this.http = http;
        this.fb = fb;
        this.storage = storage;
    }
    AuthenticationProvider.prototype.loginFb = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.fb.login(['public_profile', 'user_friends', 'email']) //login to FB
                .then(function (res) {
                var user_id = res.authResponse.userID; //get FB UID     
                _this.fb.api(user_id + '/?fields=id,email,name', ["email"]) //get extra fields
                    .then(function (res) {
                    var profile = res;
                    var data = { key: __WEBPACK_IMPORTED_MODULE_3__app_app_settings__["a" /* AppSettings */].apiKey, session: null, controller: "authentication", action: "loginfb", id: profile.id, name: profile.name, email: profile.email };
                    _this.http.post(__WEBPACK_IMPORTED_MODULE_3__app_app_settings__["a" /* AppSettings */].apiUrl, data).subscribe(function (res) {
                        if (res["success"] === true) {
                            _this.storage.set("session", res["data"]["sessionid"]);
                            resolve();
                        }
                        else {
                            reject(res);
                        }
                    }, function (e) {
                        reject(e);
                    });
                })
                    .catch(function (e) {
                    reject(e);
                });
            })
                .catch(function (e) {
                //console.log('Error logging into Facebook', e);
                reject(e);
            });
        });
    };
    AuthenticationProvider.prototype.login = function (email, password) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var data = { key: __WEBPACK_IMPORTED_MODULE_3__app_app_settings__["a" /* AppSettings */].apiKey, session: null, controller: "authentication", action: "login", username: email, password: password };
            _this.http.post(__WEBPACK_IMPORTED_MODULE_3__app_app_settings__["a" /* AppSettings */].apiUrl, data).subscribe(function (res) {
                if (res["success"] === true) {
                    _this.storage.set("session", res["data"]["sessionid"]);
                    resolve();
                }
                else {
                    reject(res["errormsg"]);
                }
            }, function (e) {
                reject(e);
            });
        });
    };
    AuthenticationProvider.prototype.register = function (email, password) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var data = { key: __WEBPACK_IMPORTED_MODULE_3__app_app_settings__["a" /* AppSettings */].apiKey, session: null, controller: "create", action: "createuser", username: email, password: password };
            _this.http.post(__WEBPACK_IMPORTED_MODULE_3__app_app_settings__["a" /* AppSettings */].apiUrl, data).subscribe(function (res) {
                if (res["success"] === true) {
                    _this.login(email, password).then(function () {
                        resolve();
                    }).catch(function (e) {
                        reject(e);
                    });
                }
                else {
                    reject(res);
                }
            }, function (e) {
                reject(e);
            });
        });
    };
    AuthenticationProvider.prototype.registerAnonymous = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var data = { key: __WEBPACK_IMPORTED_MODULE_3__app_app_settings__["a" /* AppSettings */].apiKey, session: null, controller: "create", action: "createanonymoususer" };
            _this.http.post(__WEBPACK_IMPORTED_MODULE_3__app_app_settings__["a" /* AppSettings */].apiUrl, data).subscribe(function (res) {
                if (res["success"] === true) {
                    var account_1 = res["data"];
                    _this.login(account_1["username"], account_1["password"]).then(function () {
                        resolve(account_1);
                    }).catch(function (e) {
                        reject(e);
                    });
                }
                else {
                    reject(res);
                }
            }, function (e) {
                reject(e);
            });
        });
    };
    AuthenticationProvider.prototype.resetPassword = function (email) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var data = { key: __WEBPACK_IMPORTED_MODULE_3__app_app_settings__["a" /* AppSettings */].apiKey, session: null, controller: "edit", action: "resetpassword", email: email };
            _this.http.post(__WEBPACK_IMPORTED_MODULE_3__app_app_settings__["a" /* AppSettings */].apiUrl, data).subscribe(function (res) {
                if (res["success"] === true) {
                    resolve();
                }
                else {
                    reject(res);
                }
            }, function (e) {
                reject(e);
            });
        });
    };
    AuthenticationProvider.prototype.changePassword = function (oldPassword, newPassword, userId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("session").then(function (session) {
                if (session) {
                    var data = { key: __WEBPACK_IMPORTED_MODULE_3__app_app_settings__["a" /* AppSettings */].apiKey, session: session, controller: "edit", action: "updateuser", id: userId, oldpassword: oldPassword, password: newPassword };
                    _this.http.post(__WEBPACK_IMPORTED_MODULE_3__app_app_settings__["a" /* AppSettings */].apiUrl, data).subscribe(function (res) {
                        if (res["success"] === true) {
                            resolve();
                        }
                        else {
                            reject(res);
                        }
                    }, function (e) {
                        reject(e);
                    });
                }
                else {
                    reject();
                }
            });
        });
    };
    AuthenticationProvider.prototype.logout = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("session").then(function (session) {
                if (session) {
                    var data = { key: __WEBPACK_IMPORTED_MODULE_3__app_app_settings__["a" /* AppSettings */].apiKey, session: session, controller: "authentication", action: "logout" };
                    _this.http.post(__WEBPACK_IMPORTED_MODULE_3__app_app_settings__["a" /* AppSettings */].apiUrl, data).subscribe(function (res) {
                        if (res["success"] === true) {
                            resolve(res["data"]);
                        }
                        else {
                            resolve(res);
                        }
                    }, function (e) {
                        resolve();
                    });
                }
                else {
                    resolve();
                }
                _this.storage.clear();
            });
        });
    };
    AuthenticationProvider.prototype.savePushId = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("session").then(function (session) {
                if (session) {
                    var data = { key: __WEBPACK_IMPORTED_MODULE_3__app_app_settings__["a" /* AppSettings */].apiKey, session: session, controller: "edit", action: "savetoken", token: id };
                    _this.http.post(__WEBPACK_IMPORTED_MODULE_3__app_app_settings__["a" /* AppSettings */].apiUrl, data).subscribe(function (res) {
                        if (res["success"] === true) {
                            resolve();
                        }
                        else {
                            reject(res);
                        }
                    }, function (e) {
                        reject(e);
                    });
                }
                else {
                    reject();
                }
            });
        });
    };
    AuthenticationProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_facebook__["a" /* Facebook */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */]])
    ], AuthenticationProvider);
    return AuthenticationProvider;
}());

//# sourceMappingURL=authentication.js.map

/***/ }),

/***/ 72:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PremiumPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_account_account__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_in_app_purchase__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_in_app_browser__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_diary_diary__ = __webpack_require__(53);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var PremiumPage = (function () {
    function PremiumPage(navCtrl, platform, modalCtrl, storage, accountProvider, events, alertCtrl, iap, iab) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.modalCtrl = modalCtrl;
        this.storage = storage;
        this.accountProvider = accountProvider;
        this.events = events;
        this.alertCtrl = alertCtrl;
        this.iap = iap;
        this.iab = iab;
        this.storage.get("account").then(function (data) {
            _this.account = data;
        });
        this.productId = this.platform.is("android") ? "com.taylorhamling.intensity.premium2" : "com.taylorhamling.intensity.premium";
        this.product = { price: 4.99, title: "Premium", productId: this.productId };
        this.iap
            .getProducts([this.productId])
            .then(function (products) {
            if (products.length > 0) {
                _this.product = products[0];
                if (_this.product.price) {
                    document.getElementById("product-price").innerText = _this.product.price;
                }
            }
        })
            .catch(function (err) {
            //console.log(err);
        });
    }
    PremiumPage.prototype.buyPremium = function () {
        var _this = this;
        if (this.platform.is("ios")) {
            var alert_1 = this.alertCtrl.create({
                title: 'Confirm',
                subTitle: "You are purchasing Intensity Premium. This is a subscription which will renew every month for " + this.product.price + ". \
                        <span class=\'purchase-details\'>Payment will be charged to your credit card through your iTunes account at confirmation of purchase. Subscription renews automatically unless cancelled at least 24 hours prior to the end of the subscription period. There is no increase in price when renewing. Subscriptions can be managed and auto-renewal turned off in Account Settings in iTunes after purchase. Once purchased, refunds will not be provided for any unused portion of the term. Read our full <a id=\'premium-terms-link\'>Terms of Service</a> and our <a id=\'premium-privacy-link\'>Privacy Policy</a></span>",
                buttons: [{
                        text: 'Continue',
                        handler: function (data) {
                            _this.subscribe();
                        }
                    }]
            });
            alert_1.present();
            setTimeout(function () {
                var links = document.querySelectorAll(".purchase-details a");
                for (var i = 0; i < links.length; i++) {
                    var link = links[i];
                    link.addEventListener("click", function (data) {
                        if (data && data.target && data.target["innerHTML"] === 'Terms of Service') {
                            window.open("http://www.intensityapp.com/terms-conditions", '_system');
                        }
                        else if (data && data.target && data.target["innerHTML"] === 'Privacy Policy') {
                            window.open("http://www.intensityapp.com/privacy-policy", '_system');
                        }
                    });
                }
            }, 1000);
            return;
        }
        this.subscribe();
    };
    PremiumPage.prototype.subscribe = function () {
        var _this = this;
        this.iap
            .subscribe(this.productId)
            .then(function (data) {
            _this.account.premium = true;
            _this.account.premium_date = __WEBPACK_IMPORTED_MODULE_3_moment__().format("YYYY-MM-DD");
            _this.events.publish("premium:purchased");
            _this.accountProvider.updateSettings({ premium: _this.account.premium, premiumdate: _this.account.premium_date }, _this.account.id);
            _this.storage.set("account", _this.account);
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__pages_diary_diary__["a" /* DiaryPage */]);
            _this.navCtrl.popToRoot();
        })
            .catch(function (err) {
            if (err && err.message && err.message.toLowerCase().indexOf("cancelled") > -1) {
                return;
            }
            else if (err && err.message) {
                alert(JSON.stringify(err.message));
            }
            else {
                alert(JSON.stringify(err));
            }
        });
    };
    PremiumPage.prototype.restorePremium = function () {
        var _this = this;
        this.iap.restorePurchases().then(function (products) {
            for (var _i = 0, products_1 = products; _i < products_1.length; _i++) {
                var product = products_1[_i];
                if (!product.date && product.receipt) {
                    var receipt = JSON.parse(product.receipt);
                    product.date = receipt.purchaseTime;
                }
                if (__WEBPACK_IMPORTED_MODULE_3_moment__(product.date).add(1, 'months').isAfter(__WEBPACK_IMPORTED_MODULE_3_moment__()) && product.productId === _this.product.productId) {
                    _this.account.premium = true;
                    _this.account.premium_date = __WEBPACK_IMPORTED_MODULE_3_moment__().format("YYYY-MM-DD");
                    _this.events.publish("premium:purchased");
                    _this.accountProvider.updateSettings({ premium: _this.account.premium, premiumdate: _this.account.premium_date }, _this.account.id);
                    _this.storage.set("account", _this.account);
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__pages_diary_diary__["a" /* DiaryPage */]);
                    _this.navCtrl.popToRoot();
                    return;
                }
            }
            var alert = _this.alertCtrl.create({
                title: 'Error',
                subTitle: "Could not restore premium as we couldn't find it in your purchases or it has expired.",
                buttons: ['OK']
            });
            alert.present();
        })
            .catch(function (er) {
            var alert = _this.alertCtrl.create({
                title: 'Error',
                subTitle: "There was an error trying to restore your purchase.",
                buttons: ['OK']
            });
            alert.present();
        });
    };
    PremiumPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-premium',template:/*ion-inline-start:"D:\Taylor\Documents\Websites\intensity2\src\pages\premium\premium.html"*/`<ion-header class="profile-nav">\n    <ion-navbar color="primary">\n        <button ion-button menuToggle>\n            <ion-icon name="menu"></ion-icon>\n        </button>\n        <ion-title>Premium</ion-title>\n\n        <ion-buttons end>\n            <button ion-button icon-only tools tappable>\n                <ion-icon name="more" ></ion-icon>\n            </button>\n        </ion-buttons>    \n        \n      \n    \n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n    \n    <div class="premium-header">\n        \n        <img src="assets/imgs/crown.png" />\n        \n        <h2>Improve your tracking</h2>\n        \n    </div>\n    \n    <ion-card class="premium-card">\n        <ion-list>\n            <ion-list-header>\n                <h2>Personalized Programs</h2>\n            </ion-list-header>             \n            <ion-item>\n                <ion-icon name="calendar" item-start></ion-icon>\n                <h2>Your own custom program</h2>\n                <p>Create programs with your own workouts and exercises.</p>\n            </ion-item> \n            <ion-item>\n                <ion-icon name="body" item-start></ion-icon>\n                <h2>Strength specific</h2>\n                <p>Add details such as reps, weight, percentages, RPE, and custom notes.</p>\n            </ion-item>   \n            <ion-item>\n                <ion-icon name="megaphone" item-start></ion-icon>\n                <h2>Public promotion</h2>\n                <p>Make your program visible to all users of Intensity to use for themselves.</p>\n            </ion-item>    \n            <ion-item>\n                <ion-icon name="md-globe" item-start></ion-icon>\n                <h2>Unique URL</h2>\n                <p>Your program has a unique URL so you can share it with people outside of Intensity.</p>\n            </ion-item>    \n            <ion-item>\n                <ion-icon name="infinite" item-start></ion-icon>\n                <h2>Unlimited</h2>\n                <p>Create as many simple or complex programs as you require.</p>\n            </ion-item>            \n        </ion-list>\n    </ion-card>  \n    \n    \n    <ion-card class="premium-card">\n        <ion-list>\n            <ion-list-header>\n                <h2>Program Customizations</h2>\n            </ion-list-header>             \n            <ion-item>\n                <ion-icon name="create" item-start></ion-icon>\n                <h2>Modify existing programs</h2>\n                <p>Create your own versions of existing programs in the Intensity database such as 5/3/1, Texas Method, etc...</p>\n            </ion-item> \n            <ion-item>\n                <ion-icon name="share-alt" item-start></ion-icon>\n                <h2>Share</h2>\n                <p>Share your customized programs for other users to utilize.</p>\n            </ion-item>          \n        </ion-list>\n    </ion-card>     \n    \n    \n    <ion-card class="premium-card">\n        <ion-list>\n            <ion-list-header>\n                <h2>Theming</h2>\n            </ion-list-header>             \n            <ion-item>\n                <ion-icon name="contrast" item-start></ion-icon>\n                <h2>Dark theme</h2>\n                <p>The dark theme uses black and grey tonnes instead of light ones which can be easier on the eye.</p>\n            </ion-item> \n            <ion-item>\n                <ion-icon name="flash" item-start></ion-icon>\n                <h2>Energy efficient</h2>\n                <p>Darker colors tend to use less power on most phones.</p>\n            </ion-item>          \n        </ion-list>\n    </ion-card>      \n    \n    <ion-card class="premium-card">\n        <ion-list>\n            <ion-list-header>\n                <h2>Support</h2>\n            </ion-list-header>             \n            <ion-item>\n                <ion-icon name="heart" item-start></ion-icon>\n                <h2>Priority support</h2>\n                <p>Stuck with something? We\'ll help right away.</p>\n            </ion-item> \n            <ion-item>\n                <ion-icon name="git-pull-request" item-start></ion-icon>\n                <h2>Priority feature requests</h2>\n                <p>Have an idea for a new feature? We\'ll listen and add it to future releases.</p>\n            </ion-item>          \n        </ion-list>\n    </ion-card>  \n\n\n    <ion-card class="premium-card">\n        <ion-list>\n            <ion-list-header>\n                <h2>Ongoing Development</h2>\n            </ion-list-header>             \n            <ion-item>\n                <ion-icon name="code-working" item-start></ion-icon>\n                <h2>Support Us</h2>\n                <p>Help us to continue building and providing the best workout tracking app for strength athletes</p>\n            </ion-item> \n            <ion-item>\n                <ion-icon name="logo-usd" item-start></ion-icon>\n                <h2>Reinvestment</h2>\n                <p>Subscription revenue always goes directly into supporting development, paying for the servers that host users data, and investing back into the lifting community however we can.</p>\n            </ion-item>          \n        </ion-list>\n    </ion-card>     \n    \n    <div class="restore">\n        <p>Already purchased premium?</p>\n        <button ion-button outline block (click)="restorePremium()">Restore Premium</button>\n    </div>    \n \n</ion-content>\n\n<ion-footer class="add-program-footer premium-footer">\n    <button ion-button (click)="buyPremium()">Upgrade -&nbsp;<span id="product-price">$4.99</span>/month</button>\n</ion-footer>\n`/*ion-inline-end:"D:\Taylor\Documents\Websites\intensity2\src\pages\premium\premium.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_4__providers_account_account__["a" /* AccountProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_in_app_purchase__["a" /* InAppPurchase */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_in_app_browser__["a" /* InAppBrowser */]])
    ], PremiumPage);
    return PremiumPage;
}());

//# sourceMappingURL=premium.js.map

/***/ }),

/***/ 73:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FriendProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_account_account__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_friends_friends__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_diary_diary__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_app_settings__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_friend_diary_friend_diary__ = __webpack_require__(369);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_message_message__ = __webpack_require__(132);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var FriendProfilePage = (function () {
    function FriendProfilePage(navCtrl, params, modalCtrl, storage, accountProvider, events, alertCtrl, friendsProvider, diaryProvider) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.params = params;
        this.modalCtrl = modalCtrl;
        this.storage = storage;
        this.accountProvider = accountProvider;
        this.events = events;
        this.alertCtrl = alertCtrl;
        this.friendsProvider = friendsProvider;
        this.diaryProvider = diaryProvider;
        this.properties = { activeTab: "profile", activityPage: 1, fromMessage: false };
        this.friendProfile = this.params.data.friend;
        this.friendProfile.friendid = this.friendProfile.friendid ? this.friendProfile.friendid : this.friendProfile.userid;
        this.properties.fromMessage = this.params.data.fromMessage;
        this.friendProfile.userid = this.friendProfile.friendid;
        this.friendProfile.dpFull = __WEBPACK_IMPORTED_MODULE_7__app_app_settings__["a" /* AppSettings */].apiUrl.replace("index.php", "") + this.friendProfile.dp;
        this.added = this.params.data.added;
        this.account = {};
        this.profile = {};
        this.activity = {};
        this.getProfile();
        this.accountProvider.getUserActivity(this.friendProfile.friendid, this.properties.activityPage).then(function (data) {
            _this.activity = data;
        });
        this.storage.get("account").then(function (data) {
            _this.account = data;
        });
    }
    FriendProfilePage.prototype.getProfile = function () {
        var _this = this;
        this.storage.get("profile" + this.friendProfile.friendid).then(function (data) {
            if (data) {
                _this.profile = data;
            }
        });
        this.accountProvider.getProfile(this.friendProfile.friendid).then(function (data) {
            _this.profile = data;
        });
    };
    FriendProfilePage.prototype.getMoreActivity = function (infiniteScroll) {
        var _this = this;
        if (!this.activity.canloadmore) {
            infiniteScroll.complete();
            return;
        }
        this.properties.activityPage = this.properties.activityPage + 1;
        this.accountProvider.getUserActivity(this.friendProfile.friendid, this.properties.activityPage).then(function (data) {
            for (var _i = 0, _a = data["activity"]; _i < _a.length; _i++) {
                var item = _a[_i];
                _this.activity.activity.push(item);
            }
            _this.activity.canloadmore = data["canloadmore"];
            infiniteScroll.complete();
        })
            .catch(function (e) {
            infiniteScroll.complete();
        });
    };
    FriendProfilePage.prototype.formatDate = function (date) {
        return __WEBPACK_IMPORTED_MODULE_3_moment__(date).format('MMMM Do YYYY');
    };
    FriendProfilePage.prototype.copyToDate = function (date, workout) {
        var _this = this;
        var copy = {
            exerciseid: workout.exerciseid,
            userid: this.friendProfile.friendid,
            type: "sets",
            date: __WEBPACK_IMPORTED_MODULE_3_moment__(date).format('YYYY-MM-DD'),
            assigneddate: __WEBPACK_IMPORTED_MODULE_3_moment__(workout.assigneddate).format('YYYY-MM-DD')
        };
        this.diaryProvider.copyWorkout(copy).then(function (data) {
            var alert = _this.alertCtrl.create({
                title: workout.sets + " sets copied",
                subTitle: "To " + _this.formatDate(date),
                buttons: [
                    {
                        text: 'OK',
                        role: 'cancel'
                    }
                ]
            });
            alert.present();
        });
    };
    FriendProfilePage.prototype.viewDetails = function (activity) {
        var alert = this.alertCtrl.create({
            title: activity.name,
            subTitle: this.formatDate(activity.assigneddate),
            message: activity.sets + " sets of " + activity.reps + " with " + activity.weight + this.profile.units,
            buttons: [
                {
                    text: 'Dismiss',
                    role: 'cancel'
                }
            ]
        });
        alert.present();
    };
    FriendProfilePage.prototype.addFriend = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: "Add User",
            message: "Are you sure you want to add this user?",
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel'
                },
                {
                    text: 'Yes',
                    handler: function (data) {
                        _this.added = true;
                        _this.friendsProvider.addFriend(_this.friendProfile.userid);
                    }
                }
            ]
        });
        alert.present();
    };
    FriendProfilePage.prototype.removeFriend = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: "Delete Friend",
            message: "Are you sure you want to delete this friend?",
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel'
                },
                {
                    text: 'Yes',
                    handler: function (data) {
                        _this.added = false;
                        _this.friendsProvider.removeFriend(_this.friendProfile.userid);
                    }
                }
            ]
        });
        alert.present();
    };
    FriendProfilePage.prototype.openDiary = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__pages_friend_diary_friend_diary__["a" /* FriendDiaryPage */], { friend: this.friendProfile });
    };
    FriendProfilePage.prototype.sendMessage = function () {
        if (this.properties.fromMessage) {
            this.navCtrl.pop();
        }
        else {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_9__pages_message_message__["a" /* MessagePage */], { profile: this.friendProfile, fromProfile: true });
        }
    };
    FriendProfilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-friend-profile',template:/*ion-inline-start:"D:\Taylor\Documents\Websites\intensity2\src\pages\friend-profile\friend-profile.html"*/`<ion-header class="profile-nav">\n    <ion-navbar color="primary">\n        <button ion-button menuToggle>\n            <ion-icon name="menu"></ion-icon>\n        </button>\n        <ion-title>Profile</ion-title>\n\n        <ion-buttons end>\n            <button ion-button icon-only *ngIf="added" (click)="removeFriend()">\n                <ion-icon name="remove-circle"></ion-icon>\n            </button>\n            <button ion-button icon-only *ngIf="!added" (click)="addFriend()">\n                <ion-icon name="ios-add-circle"></ion-icon>\n            </button>            \n        </ion-buttons>    \n        \n      \n    \n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <div class="profile-header">\n        \n        <div class="profile-dp">\n            <img [src]="friendProfile.dpFull" onerror="this.style.display=\'none\'"/>\n        </div>\n        \n\n        <h2>{{friendProfile.display ? friendProfile.display : friendProfile.username}}</h2>\n        <p>\n            <a (click)="openDiary()">View Diary</a> \n            <a (click)="sendMessage()">Send Message</a>\n        </p>\n\n\n        <ion-segment [(ngModel)]="properties.activeTab" color="light">\n            <ion-segment-button value="profile">\n                Profile\n            </ion-segment-button>\n            <ion-segment-button value="activity">\n                Activity\n            </ion-segment-button>\n       </ion-segment>     \n\n\n    </div>\n\n\n    <div *ngIf="properties.activeTab === \'profile\'">\n        <ion-list class="profile-content">\n            <ion-item *ngIf="profile.display">\n                <ion-icon name="person" item-start></ion-icon>\n                <h2>Display Name</h2>\n                <p>{{profile.display}}</p>\n            </ion-item>\n            <ion-item *ngIf="profile.age">\n                <ion-icon name="heart" item-start></ion-icon>\n                <h2>Age</h2>\n                <p>{{profile.age}}</p>\n            </ion-item> \n            <ion-item *ngIf="profile.gender">\n                <ion-icon name="body" item-start></ion-icon>\n                <h2>Gender</h2>\n                <p>{{profile.gender}}</p>\n            </ion-item> \n            <ion-item *ngIf="profile.about">\n                <ion-icon name="help" item-start></ion-icon>\n                <h2>About Me</h2>\n                <p class="extended">{{profile.about}}</p>\n            </ion-item> \n            <ion-item *ngIf="profile.why">\n                <ion-icon name="locate" item-start></ion-icon>\n                <h2>Purpose</h2>\n                <p class="extended">{{profile.why}}</p>\n            </ion-item>\n            <ion-item *ngIf="profile.goals">\n                <ion-icon name="trending-up" item-start></ion-icon>\n                <h2>Goals</h2>\n                <p class="extended">{{profile.goals}}</p>\n            </ion-item>              \n        </ion-list>    \n        \n    </div>\n    \n    \n    <div *ngIf="properties.activeTab === \'activity\'">\n        <ion-list class=\'activity\'>\n            <ion-item *ngFor="let activity of activity.activity;" (click)="viewDetails(activity)">\n                <h2>{{formatDate(activity.assigneddate)}}</h2>\n                <p>Tracked {{activity.name}}</p>             \n                <ion-icon tappable name="copy" item-end ion-datepicker (ionChanged)="copyToDate($event, activity)" [okText]="\'Copy To Date\'"></ion-icon>\n            </ion-item>  \n            \n        </ion-list>\n    \n        <ion-infinite-scroll (ionInfinite)="getMoreActivity($event)">\n            <ion-infinite-scroll-content></ion-infinite-scroll-content>\n        </ion-infinite-scroll>         \n    </div>\n \n</ion-content>\n`/*ion-inline-end:"D:\Taylor\Documents\Websites\intensity2\src\pages\friend-profile\friend-profile.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_4__providers_account_account__["a" /* AccountProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_5__providers_friends_friends__["a" /* FriendsProvider */], __WEBPACK_IMPORTED_MODULE_6__providers_diary_diary__["a" /* DiaryProvider */]])
    ], FriendProfilePage);
    return FriendProfilePage;
}());

//# sourceMappingURL=friend-profile.js.map

/***/ })

},[397]);
//# sourceMappingURL=main.js.map