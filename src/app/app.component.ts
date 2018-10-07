import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { Page5 } from '../pages/page5/page5';
import { Page6 } from '../pages/page6/page6';
import { Page7 } from '../pages/page7/page7';
import { DetailsPromo } from '../pages/promo/promo';

import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { AlertController } from 'ionic-angular';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = Page1;
  banner: any;
  infoblocks: Observable<any>;
  newVer: number;
  // *********************************************************
  versionApp: number = 3.9;
  gitMessage: string = '';
  pages: Array<{ title: string, icon: string, component: any }>;

  constructor(public platform: Platform, private statusBar: StatusBar,
    public http: Http, private alertCtrl: AlertController,
  ) {
    // this.adMobFree.banner.show();
    this.pages = [
      { title: 'Заказ авто', icon: 'car', component: Page7 },
      { title: 'Контакты', icon: 'call', component: Page2 },
      { title: 'Правила', icon: 'checkbox-outline', component: Page5 },
      { title: 'О приложении', icon: 'help', component: Page6 }
    ];




  }




  getUpdate() {
    if (this.newVer > this.versionApp) {
      let alert = this.alertCtrl.create({
        title: 'Обновление',
        subTitle: 'Доступна версия ' + this.newVer,
        message: this.gitMessage,
        buttons: [
          {
            text: 'Напомнить позже',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Обновить',
            handler: () => {
              console.log('Update');
              window.open('https://play.google.com/store/apps/details?id=com.itgluck.klobus39', '_system', 'location=yes'); return false;
            }
          }
        ]
      });
      console.log("Доступно обновление " + this.newVer);
      alert.present();
    }
    else {
      console.log("У Вас актуальная версия приложения: " + this.versionApp)
    }
  }
  getVersion() {
    // this.http.get('../assets/menu/update.json')

    this.http.get('https://raw.githubusercontent.com/itgluck/klobus39/master/src/assets/menu/update.json')
      .map(res => res.json())
      .subscribe(
        data => {
          this.infoblocks = data.results;
          this.newVer = data.version;
          this.gitMessage = data.message;
          console.log("Текущая версия KLoBus39 " + this.versionApp);
          console.log("Актуальная версия приложения " + this.newVer);
          console.log(this.gitMessage);
        },

        err => {
          console.log("не удалось получить данные");
        }
      )

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.overlaysWebView(true);

    }
    );
    this.getVersion();

    setTimeout(() => {
      this.getUpdate();
    }, 3000);


  }

  openPage(page) {
    this.nav.push(page.component);
  }

  goPromo() {
    this.nav.push(DetailsPromo);

  }





}
