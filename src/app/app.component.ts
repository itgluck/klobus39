import { Component, ViewChild } from '@angular/core';
import { Nav, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
//  import { SplashScreen } from '@ionic-native/splash-screen';

import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { Page3 } from '../pages/page3/page3';
// import { Page4 } from '../pages/page4/page4';
import { Page5 } from '../pages/page5/page5';
import { Page6 } from '../pages/page6/page6';
import { Page7 } from '../pages/page7/page7';

import {
  Push,
  PushToken
} from '@ionic/cloud-angular';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = Page1;
  pages: Array<{ title: string, icon: string, component: any }>;

  constructor(public platform: Platform, private statusBar: StatusBar, public push: Push)
   {
    this.initializeApp();
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Заказ авто', icon: 'car', component: Page7 },
      { title: 'Погода', icon: 'rainy', component: Page3 },
      { title: 'Контакты', icon: 'call', component: Page2 },
      { title: 'Правила', icon: 'checkbox-outline', component: Page5 },
      { title: 'О приложении', icon: 'help', component: Page6 }
          ];
          
    // this.mapLocation = 54.71 + ',' + 20.5365;

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.overlaysWebView(true);
      // this.splashScreen.hide();

        this.push.register().then((t: PushToken) => {
      return this.push.saveToken(t);
    }).then((t: PushToken) => {
      console.log('Token saved:', t.token);
    });



// PaltEnd
    });
  }



  openPage(page) {
    this.nav.push(page.component);
    // this.nav.setRoot(page.component);
    // this.nav.push(page.component);
  }
  goHome() {
    this.nav.setRoot(Page1);
    // this.nav.setRoot(page.component);
    // this.nav.push(page.component);
  }



}
