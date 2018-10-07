import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
// import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import {SocialSharing} from '@ionic-native/social-sharing';     
import { HttpModule } from '@angular/http';
import { StatusBar } from '@ionic-native/status-bar';
import { BrowserModule } from '@angular/platform-browser';

import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { DetailsPage } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { Page5 } from '../pages/page5/page5';
import { Page6 } from '../pages/page6/page6';
import { Page7 } from '../pages/page7/page7';
import { Promo } from '../pages/promo/promo';
import { DetailsPromo } from '../pages/promo/promo';
import { TrainDetails } from '../pages/page1/train/train';


// AdMob
import { AdMobFree } from '@ionic-native/admob-free';

@NgModule({
  declarations: [
    MyApp,
    Page1,
    DetailsPage,
    TrainDetails,
    Page2,
    Page5,
    Page6,
    Page7,
    Promo,    
    DetailsPromo
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    // CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    DetailsPage,
    TrainDetails,
    Page2,
    Page5,
    Page6,
    Page7,
    Promo,
    DetailsPromo
  ],
  providers: [
    // Push,
    StatusBar,
    SocialSharing,
    AdMobFree,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
}) 


export class AppModule {}

