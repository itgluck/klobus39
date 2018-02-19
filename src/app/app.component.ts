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


    // Check VersionApp  этот блок будет показан в версии 3.6.2
    this.infoblocks = this.http.get('https://raw.githubusercontent.com/itgluck/klobus39/master/src/assets/menu/update_v3.6.2.json').map(res => res.json());

    // Local
    // this.infoblocks = this.http.get('../assets/menu/update.json').map(res => res.json());

  }


  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.overlaysWebView(true);
    }
    );


  }

  openPage(page) {
    this.nav.push(page.component);
  }
  goHome() {
    this.nav.setRoot(Page1);
  }
  goPromo() {
    this.nav.push(DetailsPromo);
  }

}
