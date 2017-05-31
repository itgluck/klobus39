import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
// import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BrowserModule } from '@angular/platform-browser';
import {GoogleMaps} from '@ionic-native/google-maps';
// import {Marker} from '@ionic-native/google-maps';

import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { DetailsPage } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { Page3 } from '../pages/page3/page3';
import { Page4 } from '../pages/page4/page4';
import { Page5 } from '../pages/page5/page5';
import { Page6 } from '../pages/page6/page6';
import { Page7 } from '../pages/page7/page7';
// import { Rout1 } from '../pages/page1/train/rout';
// import { RoutPage } from '../pages/page1/train/rout';
// Routs
import { RoutBlt } from '../pages/page1/train/blt/blt';
import { RoutBgrt } from '../pages/page1/train/bgrt/bgrt';
import { RoutMamo } from '../pages/page1/train/mamo/mamo';
import { RoutChern } from '../pages/page1/train/chern/chern';
import { RoutSov } from '../pages/page1/train/sov/sov';
import { RoutZel } from '../pages/page1/train/zel/zel';
import { RoutSvt } from '../pages/page1/train/svt/svt';
import { RoutSvt2 } from '../pages/page1/train/svt2/svt2';
// Detail


@NgModule({
  declarations: [
    MyApp,
    Page1,
    DetailsPage,
    Page2,
    Page3,
    Page4,
    Page5,
    Page6,
    Page7,
    RoutBlt,
    RoutBgrt,
    RoutMamo,
    RoutChern,
    RoutSov,
    RoutZel,
    RoutSvt,
    RoutSvt2,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    DetailsPage,
    Page2,
    Page3,
    Page4,
    Page5,
    Page6,
    Page7,
    RoutBlt,
    RoutBgrt,
    RoutMamo,
    RoutChern,
    RoutSov,
    RoutZel,
    RoutSvt,
    RoutSvt2,
  ],
  providers: [
    StatusBar,
    // SplashScreen,
    GoogleMaps,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

