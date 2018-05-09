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
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = Page1;

  infoblocks: Observable<any>;
  versionApp: number = 3.7;
  newVer: number;
  gitMessage: string ='';
  // show: boolean = true;      
  pages: Array<{ title: string, icon: string, component: any}>;

  constructor(public platform: Platform, private statusBar: StatusBar,
    public http: Http,private adMobFree: AdMobFree
  ) {
    // this.adMobFree.banner.show();
    this.pages = [
      { title: 'Заказ авто', icon: 'car', component: Page7 },
      { title: 'Контакты', icon: 'call', component: Page2 },
      { title: 'Правила', icon: 'checkbox-outline', component: Page5 },
      { title: 'О приложении', icon: 'help', component: Page6 }
    ];
    this.getVersion();
    this.showBanner();

    console.log("App start!");

    //В ссылке ниже, указать будущую версию +1
    // this.infoblocks = this.http.get('https://raw.githubusercontent.com/itgluck/klobus39/master/src/assets/menu/update_v3.7.json').map(res => res.json());
    // После публикации Создать на сайте фаил 3.6.8 (ver-1) 

    // this.infoblocks = this.http.get('../assets/menu/update.json').map(res => res.json());

    // this.http.get('../assets/menu/update.json').map((val) => {
    //   let actualVersionApp = val;
    //   console.log(actualVersionApp);
    // });
    
  }
  // ionViewDidEnter() {
  //   this.showBanner();
  // }
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
        setInterval(() => {  
          this.getVersion();
          this.showBanner();
          console.log("Проверка версии приложения " + this.newVer);
        },10000);       
        // alert ("Нет интернет соединения! К счастью, KLoBus39 работает офлайн");
      }
    )
     
  }
// AdMob Block #############
async showBanner(){	
	try {
		const bannerConfig: AdMobFreeBannerConfig = {
			id: 'ca-app-pub-7133305264165200/6243373138',
			isTesting: true,
			autoShow: true,
			bannerAtTop: false
		}
	
    this.adMobFree.banner.config(bannerConfig);
    // Create banner
    this.adMobFree.banner.prepare();
		this.adMobFree.banner.show();
		// const result = await this.adMobFree.banner.prepare();
		console.log("Banner Отображается!");
	}
	catch (e) {
    console.error(e);
        
	}
}



// Убрать рекламу
// hideAdb() {
// 	this.adMobFree.banner.remove();
// 	console.log('AdMob hide: Нет рекламы');
// }
// AdMob Block #############
  
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.overlaysWebView(true); 
   
    }
    );

    
  }

  openPage(page) {
    this.nav.push(page.component);     
  }
  // goHome() {
  //   this.nav.setRoot(Page1);
  // }
  goPromo() {
    this.nav.push(DetailsPromo);
    
  }





}
