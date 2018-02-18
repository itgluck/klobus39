import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { Page5 } from '../pages/page5/page5';
import { Page6 } from '../pages/page6/page6';
import { Page7 } from '../pages/page7/page7';
import { DetailsPromo } from '../pages/promo/promo';

// Тест   ionic cordova plugin rm
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

// import { Push, PushToken } from '@ionic/cloud-angular';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = Page1;

  infoblocks: Observable<any>;
  show: boolean = true;                  // Check VersionApp 3.6 

  pages: Array<{ title: string, icon: string, component: any }>;

  constructor(public platform: Platform, private statusBar: StatusBar,
    public http: Http
    // public push: Push
  ) {
  
    this.pages = [
      { title: 'Заказ авто', icon: 'car', component: Page7 },
      { title: 'Контакты', icon: 'call', component: Page2 },
      { title: 'Правила', icon: 'checkbox-outline', component: Page5 },
      { title: 'О приложении', icon: 'help', component: Page6 }
    ];


    // Check VersionApp 3.6.2
    this.infoblocks = this.http.get('https://raw.githubusercontent.com/itgluck/klobus39/master/src/assets/menu/update_v3.6.2.json').map(res => res.json());

    // Local
    // this.infoblocks = this.http.get('../assets/menu/update.json').map(res => res.json());

  }
  

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
        this.statusBar.overlaysWebView(true);
        // this.splashScreen.hide();

        //PushBlock
        // this.push.register().then((t: PushToken) => {
        //   return this.push.saveToken(t);
        //   }).then((t: PushToken) => {
        //   console.log('Token saved:', t.token);
        // });
        //End PushBlock

        // AdMob
      //   let bannerConfig: AdMobFreeBannerConfig = {
      //   // isTesting: true, // Remove in production
      //   id:'ca-app-pub-7133305264165200/6243373138',//id: Your Ad Unit ID goes here
      //   autoShow: true
      //  };
      //   this.admob.banner.config(bannerConfig);

      //   this.admob.banner.prepare().then(() => {
      //   // success
      // }).catch(e => console.log(e));

      // END AdMob



          } 
        );


  }

  openPage(page) {
    this.nav.push(page.component);
    // this.nav.setRoot(page.component);
    // this.nav.push(page.component);
  }
  goHome() {
    this.nav.setRoot(Page1);
  }
  goPromo() {
    this.nav.push(DetailsPromo);
  }

}
