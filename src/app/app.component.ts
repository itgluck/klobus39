import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ToastController } from 'ionic-angular';
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
  newVer: number = null;
  html: any;
  currentAppVersion = AppVersion;
  // *********************************************************
  gitMessage: string = '';
  pages: Array<{ title: string, icon: string, component: any }>;

  constructor(public platform: Platform, private statusBar: StatusBar,
    public http: Http,
    private alertCtrl: AlertController,
    public toastCtrl: ToastController
  ) {
    // this.adMobFree.banner.show();
    this.pages = [
      { title: 'Заказ авто', icon: 'car', component: Page7 },
      { title: 'Контакты', icon: 'call', component: Page2 },
      { title: 'Правила', icon: 'checkbox-outline', component: Page5 },
      { title: 'О приложении', icon: 'help', component: Page6 }
    ];
    setTimeout(() => {
      this.getVersion();
    }, 2000);
  }

  // https://github.com/itgluck/klobus39/blob/master/src/assets/menu/update.json   ***Тут поменять версию ***
  getVersion() {
    console.log("Версия при запуске: " + this.newVer);
    console.log("Версия KLoBus39 на устройстве ... " + AppVersion);
    this.http.get('https://raw.githubusercontent.com/itgluck/klobus39/master/src/assets/menu/update.json')
      .map(res => res.json())
      .subscribe(
        data => {
          this.infoblocks = data.results;
          this.gitMessage = data.message;
          this.newVer = data.version;
          console.log("Версия на GitHub данные получены: " + this.newVer);
        },
        err => {
          console.log("не удалось получить данные с GitHub");
        }
      )
    setTimeout(() => {
      console.log("3 сек прошло, Сравнение версий ...");
      this.goCalc();
    }, 2500);
  }

  goCalc() {
    console.log("Сравнение версий ...");
    if (this.newVer == AppVersion) {
      console.log("Уже установлена актуальная версия: " + this.newVer);
      return
    }
    if ( this.newVer == null) {
      console.log("Null version " + this.newVer)
      this.updToast();
      this.notUpdConnectToast();
    }
    if (this.newVer > AppVersion) {
      console.log("Версии не совпали - Запуск обновления...");
      setTimeout(() => {
        this.updToast();
        this.getUpdate();
      }, 2000);
    }
    console.log("Сравнение версий окончено");
  }

  updToast() {
    const toast = this.toastCtrl.create({
      message: "Проверка обновлений ...",
      duration: 800
    });
    toast.present();
  }


  getUpdate() {
    if (this.newVer > AppVersion) {
      console.log('Предложение обновиться до версии: ' + this.newVer);
      let alert = this.alertCtrl.create({
        title: 'Доступна версия ' + this.newVer,
        subTitle: 'Что нового:',
        message: this.gitMessage,
        buttons: [
          {
            text: 'Напомнить позже',
            role: 'cancel',
            handler: () => {
              console.log('Отказался');
            }
          },
          {
            text: 'Обновить',
            handler: () => {
              console.log('Обновился');
              window.open('https://play.google.com/store/apps/details?id=com.itgluck.klobus39', '_system', 'location=yes'); return false;
            }
          }
        ]
      });
      alert.present();      
    }
    else {
      this.notUpdConnectToast();
    }
      setTimeout(() => {
        this.newVer = null;
        console.log("Версия зачищена!!!");
      }, 9000);
  }


  notUpdConnectToast() {
    console.log("Не удалось подключиться к серверу обновлений");
    const toast = this.toastCtrl.create({
      message: "Не удалось подключиться к серверу обновлений",
      duration: 3000
    });
    toast.present();
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
