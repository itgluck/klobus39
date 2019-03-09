import { ToastController, Nav, Platform, AlertController} from 'ionic-angular';
import { Component, ViewChild, } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar';

import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { Page5 } from '../pages/page5/page5';
import { Page6 } from '../pages/page6/page6'; 
import { Page7 } from '../pages/page7/page7';
import { DetailsPromo } from '../pages/promo/promo';

// import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { AppVersion } from './routs';


@Component({
  templateUrl: 'app.html',
  styles: [`.weather-no{	display:none !important;}`]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = Page1;
  infoblocks: Observable<any>;
  gitVer: number = null;
  weatherbox:boolean = false;
  version: number = AppVersion;
  // *********************************************************
  gitMessage: string = '';
  pages: Array<{ title: string, icon: string, component: any }>;

  constructor(public platform: Platform, private statusBar: StatusBar,
    public http: Http,
    private alertCtrl: AlertController,
    public toastCtrl: ToastController
  ) {
    this.pages = [
      { title: 'Заказ авто', icon: 'car', component: Page7 },
      { title: 'Контакты', icon: 'call', component: Page2 },
      { title: 'Правила', icon: 'checkbox-outline', component: Page5 },
      { title: 'О приложении', icon: 'help', component: Page6 }
    ];
    this.weatherbox = false;
    this.gitVer = AppVersion;
    setTimeout(() => {
      this.getVersion();
      this.weatherbox = false;
    }, 7000);
  }
  // https://github.com/itgluck/klobus39/blob/master/src/assets/menu/update.json   ***Тут поменять версию ***
  getVersion() {
    console.log("*** Версия APP: " + this.version + " *** Версия на GitHub " + this.gitVer);
    
    this.http.get('https://raw.githubusercontent.com/itgluck/klobus39/master/src/assets/menu/update.json')
      .map(res => res.json())
      .subscribe( 
        data => {
          this.infoblocks = data.results;
          this.gitMessage = data.message;
          this.gitVer = data.version;
          this.weatherbox = data.weatherbox;
          console.log("Версия на GitHub: " + this.gitVer);
          console.log("Показать погоду: " + this.weatherbox);
        },
        err => {
          console.log("не удалось получить данные с GitHub");
          
          this.weatherbox = false;
          console.log("Погода не доступна " + this.weatherbox);
          
        }
      )

    setTimeout(() => {
      console.log("Сравнение версий: " +this.gitVer +" != " + this.version);
      if (this.gitVer != AppVersion) {
      // if (this.gitVer > AppVersion) {
        console.log("Версии не совпали - Запуск обновления...");
        setTimeout(() => {
          this.updToast();
          this.getUpdate();
        }, 2000);
      }
      if (this.gitVer == AppVersion) {
        console.info("У вас последняя версия KLoBus39");
      }
      console.log("Сравнение версий окончено");
    }, 3000);
  }

  updToast() {
    const toast = this.toastCtrl.create({
      message: "Проверка обновлений ...",
      duration: 1500
    });
    toast.present();
  }

  getWeather(){
    this.weatherbox = false;
    console.log(this.weatherbox);
  };

  getUpdate() {
    console.log('Предложение обновиться до версии: ' + this.gitVer);
    let alert = this.alertCtrl.create({
      title: 'Доступна версия ' + this.gitVer,
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

    // setTimeout(() => {
    //   this.getWeather();
    //   console.log("Версия зачищена!!!");
    // }, 6000);
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
