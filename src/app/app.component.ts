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
import { AppVersion } from './routs';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = Page1;
  // banner: any;
  infoblocks: Observable<any>;
  newVer: number;
  currentAppVersion = AppVersion;
  // *********************************************************
  gitMessage: string = '';
  pages: Array<{ title: string, icon: string, component: any }>;

  constructor(public platform: Platform, private statusBar: StatusBar,
    public http: Http,
    private alertCtrl: AlertController,
  ) {
    // this.adMobFree.banner.show();
    this.pages = [
      { title: 'Заказ авто', icon: 'car', component: Page7 },
      { title: 'Контакты', icon: 'call', component: Page2 },
      { title: 'Правила', icon: 'checkbox-outline', component: Page5 },
      { title: 'О приложении', icon: 'help', component: Page6 }
    ];
    this.getVersion();
  }

  // this.http.get('../assets/menu/update.json')
  // https://github.com/itgluck/klobus39/blob/master/src/assets/menu/update.json   ***Тут поменять версию ***
  getVersion() {
    console.log("Запрос версии приложения ... " + AppVersion);
    this.http.get('https://raw.githubusercontent.com/itgluck/klobus39/master/src/assets/menu/update.json')
      .map(res => res.json())
      .subscribe(
        data => {
          this.infoblocks = data.results;
          this.gitMessage = data.message;
          this.newVer = data.version;
          console.log("данные: " + this.newVer);
        },
        err => {
          console.log("не удалось получить данные"); 
        }
      )
    console.log("данные вне функции: " + this.newVer);
    setTimeout(() => {
      console.log("Прошло 5 сек...");
      this.getUpdate();
    }, 3000);
  }
  getUpdate() {
    if (this.newVer > AppVersion) {
      console.log('Предложение обновиться!' + this.newVer);
      let alert = this.alertCtrl.create({
        title: 'Доступна версия ' + this.newVer,
        subTitle: 'Что нового:',
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
      alert.present();
      console.log("Доступно обновление " + this.newVer);
    }
    else {
      console.log("Для вашей версии " + this.newVer + " - Обновлений нет!");
    }
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

  goPromo() {
    this.nav.push(DetailsPromo);

  }




}
