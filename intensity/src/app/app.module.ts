import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';


import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import * as highchartsHeatmap from 'highcharts/modules/heatmap.src';

export function highchartsModules() {
  return [highchartsHeatmap];
}

import { IonicStorageModule } from '@ionic/storage';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { InAppPurchase } from '@ionic-native/in-app-purchase';
import { EmailComposer } from '@ionic-native/email-composer';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Push, PushObject, PushOptions } from '@ionic-native/push';

import { DatePickerModule } from 'ion-datepicker';

import { MyApp } from './app.component';

import {AppSettings} from './app.settings';

import { DiaryPage } from '../pages/diary/diary';
import { DiaryExercisePage } from '../pages/diary-exercise/diary-exercise';
import { SettingsPage } from '../pages/settings/settings';
import { FriendsPage } from '../pages/friends/friends';
import { FriendProfilePage } from '../pages/friend-profile/friend-profile';
import { FriendDiaryPage } from '../pages/friend-diary/friend-diary';
import { MessagesPage } from '../pages/messages/messages';
import { MessagePage } from '../pages/message/message';
import { LeaderboardPage } from '../pages/leaderboard/leaderboard';
import { PremiumPage } from '../pages/premium/premium';
import { ProfilePage } from '../pages/profile/profile';
import { ProgramPage } from '../pages/program/program';
import { ProgramsPage } from '../pages/programs/programs';
import { RecordsPage } from '../pages/records/records';
import { StatsPage } from '../pages/stats/stats';

import {ToolsDirective} from '../components/tools/tools';

import {TimerModal} from '../components/tools/timer';
import {CalculatorModal} from '../components/tools/calculator';
import {BodyweightModal} from '../components/tools/bodyweight';
import {HelpModal} from '../components/tools/help';
import {ProgramPopover, ProgramWorkoutPopover} from '../pages/program-popover/program-popover';

import {Autosize} from '../components/autosize/autosize';

import {PopoverPage} from '../components/tools/popover';

import { LongPressModule } from 'ionic-long-press';
import { LoginModal } from '../modals/login/login';
import { AddExerciseModal } from '../modals/add-exercise/add-exercise';
import { SelectExerciseModal } from '../modals/select-exercise/select-exercise';
import { AddProgramModal } from '../modals/add-program/add-program';
import { ChangeExerciseModal } from '../modals/change-exercise/change-exercise';
import { EditSetModal } from '../modals/edit-set/edit-set';
import { DiaryRecordsModal } from '../modals/diary-records/diary-records';
import { RecordsModal } from '../modals/records/records';
import { EditProfileModal } from '../modals/edit-profile/edit-profile';
import { AddFriendsModal } from '../modals/add-friends/add-friends';
import { SearchFriendsModal } from '../modals/search-friends/search-friends';
import { ImportModal } from '../modals/import/import';
import { GoalSettingsModal } from '../modals/goal-settings/goal-settings';
import { CreateProgramModal } from '../modals/create-program/create-program';
import { EditProgramExerciseModal } from '../modals/edit-program-exercise/edit-program-exercise';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SocialSharing } from '@ionic-native/social-sharing';
import { NativeAudio } from '@ionic-native/native-audio';
import { DiaryProvider } from '../providers/diary/diary';
import { ProgramProvider } from '../providers/program/program';
import { AuthenticationProvider } from '../providers/authentication/authentication';
import { AccountProvider } from '../providers/account/account';
import { LeaderboardProvider } from '../providers/leaderboard/leaderboard';
import { FriendsProvider } from '../providers/friends/friends';
import { MessageProvider } from '../providers/message/message';
import { ChartProvider } from '../providers/chart/chart';

import {TimerService} from '../providers/timer/timer';

import {RoundProgressModule} from 'angular-svg-round-progressbar';
import { ExerciseProvider } from '../providers/exercise/exercise';
import { BodyweightProvider } from '../providers/bodyweight/bodyweight';

import {ExerciseSearchPipe} from '../pipes/exercise-search';
import {ProgramSearchPipe} from '../pipes/program-search';
import {ArraySortPipe} from '../pipes/sort';






@NgModule({
  declarations: [
    MyApp,
    DiaryPage,
    DiaryExercisePage,
    LoginModal,
    SettingsPage,
    FriendsPage,
    FriendProfilePage,
    FriendDiaryPage,
    MessagesPage,
    MessagePage,
    LeaderboardPage,
    PremiumPage,
    ProfilePage,
    ProgramPage,
    ProgramsPage,
    RecordsPage,
    StatsPage,    
    AddExerciseModal,
    AddProgramModal,
    ChangeExerciseModal,
    SelectExerciseModal,
    RecordsModal,
    TimerModal,
    CalculatorModal,
    BodyweightModal,
    HelpModal,
    EditSetModal,
    DiaryRecordsModal,
    EditProfileModal,
    AddFriendsModal,
    SearchFriendsModal,
    ImportModal,
    GoalSettingsModal,
    CreateProgramModal,
    EditProgramExerciseModal,
    ProgramPopover,
    ProgramWorkoutPopover,
    ToolsDirective,
    Autosize,
    PopoverPage,
    ExerciseSearchPipe,
    ProgramSearchPipe,
    ArraySortPipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule,
    RoundProgressModule,
    DatePickerModule,
    LongPressModule,
    ChartModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    DiaryPage,
    DiaryExercisePage,
    LoginModal,
    SettingsPage,
    FriendsPage,
    FriendProfilePage,
    FriendDiaryPage,
    MessagesPage,
    MessagePage,
    LeaderboardPage,
    PremiumPage,
    ProfilePage,
    ProgramPage,
    ProgramsPage,
    RecordsPage,
    StatsPage,       
    AddExerciseModal,
    AddProgramModal,
    ChangeExerciseModal,
    SelectExerciseModal,
    ProgramPopover,
    ProgramWorkoutPopover,
    TimerModal,
    CalculatorModal,
    BodyweightModal,
    AddFriendsModal,
    HelpModal,    
    EditSetModal,
    DiaryRecordsModal,
    RecordsModal,
    EditProfileModal,
    SearchFriendsModal,
    ImportModal,
    GoalSettingsModal,    
    CreateProgramModal,
    EditProgramExerciseModal,
    PopoverPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DiaryProvider,
    AuthenticationProvider,
    TimerService,
    AccountProvider,
    BodyweightProvider,
    LeaderboardProvider,
    FriendsProvider,
    Facebook,
    NativeAudio,
    EmailComposer,
    InAppPurchase,
    InAppBrowser, 
    SocialSharing,
    LocalNotifications,
    File,
    Push,
    FileTransfer,
    Camera,
    ExerciseProvider,
    ProgramProvider,
    MessageProvider,
    ChartProvider,
    {provide: HIGHCHARTS_MODULES, useFactory: highchartsModules}
  ]
})
export class AppModule {}




