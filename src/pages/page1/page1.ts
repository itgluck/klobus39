 import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController, Slides, Content } from 'ionic-angular';
import { TrainDetails } from './train/train';

import 'rxjs/add/operator/map';

import { AdMobFree, AdMobFreeBannerConfig} from '@ionic-native/admob-free';
// Import All Routs ***
import { db_parom, db_trains, db_sovetsk, db_ozersk, db_bolshakovo, db_gvardeysk, db_chernahovsk, db_gusev, db_spisok, db_items } from '../../app/routs'

@Component({
	templateUrl: 'citydetal.html',
})
export class DetailsPage {
	item: any;
	alertCtrl;
	constructor(params: NavParams,
		alertCtrl: AlertController,
		public navCtrl: NavController) {

		this.item = params.data.item;
		this.tabs = ["Будни · Суббота", "Воскресенье · Праздники"];
		this.alertCtrl = alertCtrl;
	}



	// New Segment
	@ViewChild('SwipedTabsSlider') SwipedTabsSlider: Slides;
	@ViewChild('scroll') scroll: Content;

	SwipedTabsIndicator: any = null;
	tabs: any = [];
	// tabElementWidth_px :number= 150;
	doMessage() {
		let confirm = this.alertCtrl.create({
			title: 'Исправить ошибку',
			message: 'Внесите свой вклад - сообщите об ошибке или дополните информацию',
			buttons: [
				{
					text: 'Написать',
					handler: () => {
						console.log('Написать письмо');
						window.open('mailto:klobus39@yandex.ru', '_system', 'location=yes'); return false;
					}
				},
				{
					text: 'Не сейчас',
					handler: () => {
						console.log('Cancel clicked');
					}
				},
			]
		});
		confirm.present();
	}
	ionViewDidEnter() {
		this.SwipedTabsIndicator = document.getElementById("indicator");

	}

	selectTab(index) {
		this.SwipedTabsIndicator.style.webkitTransform = 'translate3d(' + (100 * index) + '%,0,0)';
		//    this.scroll.scrollTo(index*this.tabElementWidth_px,0,50);
		this.SwipedTabsSlider.slideTo(index, 50);
	}

	updateIndicatorPosition() {
		if (this.SwipedTabsSlider.length() > this.SwipedTabsSlider.getActiveIndex()) {
			this.SwipedTabsIndicator.style.webkitTransform = 'translate3d(' + (this.SwipedTabsSlider.getActiveIndex() * 100) + '%,0,0)';
		}
	}
	animateIndicator($event) {
		if (this.SwipedTabsIndicator)
			this.SwipedTabsIndicator.style.webkitTransform = 'translate3d(' + (($event.progress * (this.SwipedTabsSlider.length() - 1)) * 100) + '%,0,0)';
	}

	// Test


}



// Page1
@Component({
	templateUrl: `page1.html`
	,
	styles: [`.invisible{display:block;}
			.noimg{	display:none !important;}`]
})
export class Page1 {
	// Exp всех направлений
	trains = db_trains;
	parom = db_parom;

	items = db_items;
	spisok = db_spisok;
	gusev = db_gusev;
	chernahovsk = db_chernahovsk;
	gvardeysk = db_gvardeysk;
	bolshakovo = db_bolshakovo;
	ozersk = db_ozersk;
	sovetsk = db_sovetsk;

	jzdorojniy = [];
	krznamensk = [];
	neman = [];
	pravdinsk = [];

	item: any;
	searchQuery: string = '';
	checked: boolean = false;
	visibility: boolean = true;

	// Banner
	// bannerBox: Observable<any>;
	// visibleBanner: boolean = false;
	// httpTetx: String;

	constructor(public navCtrl: NavController,
		params: NavParams,  
		private admobFree: AdMobFree,
	) {

		this.searchQuery = '';
		this.initializeItems();
		this.item = params.data.item;
		// this.showBanner();

		
	}


	hide() {
		this.checked = !this.checked;
		this.searchQuery = '';
		this.initializeItems();
	}

	toggle() {
		this.visibility = !this.visibility;
	}

	initializeItems() {
		this.trains = db_trains;
		this.parom = db_parom;

		this.items = db_items;
		this.spisok = db_spisok;
		this.gusev = db_gusev;
		this.chernahovsk = db_chernahovsk;
		this.gvardeysk = db_gvardeysk;
		this.bolshakovo = db_bolshakovo;
		this.ozersk = db_ozersk;
		this.sovetsk = db_sovetsk;
	}

	// AdMob Block #############
	ionViewWillLoad() {
		setTimeout(() => {
			console.log("Прошло 5 сек...");
			this.showBanner();
			// this.showInterstitialAds();
			console.log("Банер - удачная попытка!");
		  }, 4000);
	}

	showBanner() {
		const bannerConfig: AdMobFreeBannerConfig = {
			id: 'ca-app-pub-7133305264165200/6243373138',
			isTesting: false,
			autoShow: true
		};
		this.admobFree.banner.config(bannerConfig);
		// this.admobFree.banner.show();
		this.admobFree.banner.prepare()
			.then(() => {
				console.log("Банер с рекламой загружен");
				this.admobFree.banner.show();
			})
			.catch(e => console.log(e));

	}

	// showInterstitialAds() {
	// 	const interstitalConfig: AdMobFreeInterstitialConfig = {
	// 	  id: 'ca-app-pub-7133305264165200/6597507258',
	// 	  isTesting: true,
	// 	  autoShow: true
	// 	};
	// 	this.admobFree.interstitial.config(interstitalConfig);
	
	// 	this.admobFree.interstitial.prepare()
	// 	  .then(() => {
	// 		this.admobFree.interstitial.show();
	// 	  })
	// 	  .catch(e => console.log(e));
	//   }
	

	
	//  End Block
	//Search -
	getItems(searchbar) {
		// Reset items back to all of the items
		this.initializeItems();

		// set q to the value of the searchbar
		let q = this.searchQuery;

		// if the value is an empty string don't filter the items
		if (q.trim() == '') {
			return;
		}


		this.items = this.items.filter((item) => {
			if (item.title.toLowerCase().indexOf(q.toLowerCase()) >= 0 ||
				item.numb.toLowerCase().indexOf(q.toLowerCase()) >= 0 ||
				item.en.toLowerCase().indexOf(q.toLowerCase()) >= 0 ||
				item.description.toLowerCase().indexOf(q.toLowerCase()) >= 0
			) {
				return true;
			}
			return false;
		})

		this.spisok = this.spisok.filter((data) => {
			if (data.title.toLowerCase().indexOf(q.toLowerCase()) >= 0 ||
				data.numb.toLowerCase().indexOf(q.toLowerCase()) >= 0 ||
				data.en.toLowerCase().indexOf(q.toLowerCase()) >= 0 ||
				data.description.toLowerCase().indexOf(q.toLowerCase()) >= 0
			) {
				return true;
			}
			return false;
		})
		//Sov
		this.sovetsk = this.sovetsk.filter((sov) => {
			if (sov.title.toLowerCase().indexOf(q.toLowerCase()) >= 0 ||
				sov.numb.toLowerCase().indexOf(q.toLowerCase()) >= 0 ||
				sov.en.toLowerCase().indexOf(q.toLowerCase()) >= 0 ||
				sov.description.toLowerCase().indexOf(q.toLowerCase()) >= 0
			) {
				return true;
			}
			return false;
		})
		//Gus
		this.gusev = this.gusev.filter((gus) => {
			if (gus.title.toLowerCase().indexOf(q.toLowerCase()) >= 0 ||
				gus.numb.toLowerCase().indexOf(q.toLowerCase()) >= 0 ||
				gus.en.toLowerCase().indexOf(q.toLowerCase()) >= 0 ||
				gus.description.toLowerCase().indexOf(q.toLowerCase()) >= 0
			) {
				return true;
			}
			return false;
		})
		//Cher
		this.chernahovsk = this.chernahovsk.filter((cher) => {
			if (cher.title.toLowerCase().indexOf(q.toLowerCase()) >= 0 ||
				cher.numb.toLowerCase().indexOf(q.toLowerCase()) >= 0 ||
				cher.en.toLowerCase().indexOf(q.toLowerCase()) >= 0 ||
				cher.description.toLowerCase().indexOf(q.toLowerCase()) >= 0
			) {
				return true;
			}
			return false;
		})
		//Bolsh
		this.bolshakovo = this.bolshakovo.filter((bolsh) => {
			if (bolsh.title.toLowerCase().indexOf(q.toLowerCase()) >= 0 ||
				bolsh.numb.toLowerCase().indexOf(q.toLowerCase()) >= 0 ||
				bolsh.en.toLowerCase().indexOf(q.toLowerCase()) >= 0 ||
				bolsh.description.toLowerCase().indexOf(q.toLowerCase()) >= 0
			) {
				return true;
			}
			return false;
		})
		//Gvard
		this.gvardeysk = this.gvardeysk.filter((gvard) => {
			if (gvard.title.toLowerCase().indexOf(q.toLowerCase()) >= 0 ||
				gvard.numb.toLowerCase().indexOf(q.toLowerCase()) >= 0 ||
				gvard.en.toLowerCase().indexOf(q.toLowerCase()) >= 0 ||
				gvard.description.toLowerCase().indexOf(q.toLowerCase()) >= 0
			) {
				return true;
			}
			return false;
		})
		//Jzd
		this.jzdorojniy = this.jzdorojniy.filter((jzd) => {
			if (jzd.title.toLowerCase().indexOf(q.toLowerCase()) >= 0 ||
				jzd.numb.toLowerCase().indexOf(q.toLowerCase()) >= 0 ||
				jzd.en.toLowerCase().indexOf(q.toLowerCase()) >= 0 ||
				jzd.description.toLowerCase().indexOf(q.toLowerCase()) >= 0
			) {
				return true;
			}
			return false;
		})
		//Krasnznam
		this.krznamensk = this.krznamensk.filter((krz) => {
			if (krz.title.toLowerCase().indexOf(q.toLowerCase()) >= 0 ||
				krz.numb.toLowerCase().indexOf(q.toLowerCase()) >= 0 ||
				krz.en.toLowerCase().indexOf(q.toLowerCase()) >= 0 ||
				krz.description.toLowerCase().indexOf(q.toLowerCase()) >= 0
			) {
				return true;
			}
			return false;
		})
		//Neman
		this.neman = this.neman.filter((nem) => {
			if (nem.title.toLowerCase().indexOf(q.toLowerCase()) >= 0 ||
				nem.numb.toLowerCase().indexOf(q.toLowerCase()) >= 0 ||
				nem.en.toLowerCase().indexOf(q.toLowerCase()) >= 0 ||
				nem.description.toLowerCase().indexOf(q.toLowerCase()) >= 0
			) {
				return true;
			}
			return false;
		})
		//Ozersk
		this.ozersk = this.ozersk.filter((ozer) => {
			if (ozer.title.toLowerCase().indexOf(q.toLowerCase()) >= 0 ||
				ozer.numb.toLowerCase().indexOf(q.toLowerCase()) >= 0 ||
				ozer.en.toLowerCase().indexOf(q.toLowerCase()) >= 0 ||
				ozer.description.toLowerCase().indexOf(q.toLowerCase()) >= 0
			) {
				return true;
			}
			return false;
		})
		//Pravdinsk
		this.pravdinsk = this.pravdinsk.filter((prav) => {
			if (prav.title.toLowerCase().indexOf(q.toLowerCase()) >= 0 ||
				prav.numb.toLowerCase().indexOf(q.toLowerCase()) >= 0 ||
				prav.en.toLowerCase().indexOf(q.toLowerCase()) >= 0 ||
				prav.description.toLowerCase().indexOf(q.toLowerCase()) >= 0
			) {
				return true;
			}
			return false;
		})
		//Parom
		this.parom = this.parom.filter((prav) => {
			if (prav.title.toLowerCase().indexOf(q.toLowerCase()) >= 0 ||
				prav.numb.toLowerCase().indexOf(q.toLowerCase()) >= 0 ||
				prav.en.toLowerCase().indexOf(q.toLowerCase()) >= 0 ||
				prav.description.toLowerCase().indexOf(q.toLowerCase()) >= 0
			) {
				return true;
			}
			return false;
		})

	}
	// ::::::::::::::::: END Поиск

	// Навигация.

	openNavDetailsPage(item) {
		this.navCtrl.push(DetailsPage, { item: item });
	}
	openNavDetailsPage2(data) {
		this.navCtrl.push(DetailsPage, { item: data });
	}
	openNavDetailsSov(sov) {
		this.navCtrl.push(DetailsPage, { item: sov });
	}
	openNavDetailsGus(gus) {
		this.navCtrl.push(DetailsPage, { item: gus });
	}
	openNavDetailsCher(cher) {
		this.navCtrl.push(DetailsPage, { item: cher });
	}
	openNavDetailsBolsh(bolsh) {
		this.navCtrl.push(DetailsPage, { item: bolsh });
	}
	openNavDetailsGvard(gvard) {
		this.navCtrl.push(DetailsPage, { item: gvard });
	}
	openNavDetailsJzd(jzd) {
		this.navCtrl.push(DetailsPage, { item: jzd });
	}
	openNavDetailsKrz(krz) {
		this.navCtrl.push(DetailsPage, { item: krz });
	}
	openNavDetailsNeman(nem) {
		this.navCtrl.push(DetailsPage, { item: nem });
	}
	openNavDetailsOzersk(ozer) {
		this.navCtrl.push(DetailsPage, { item: ozer });
	}
	openNavDetailsPravdinsk(prav) {
		this.navCtrl.push(DetailsPage, { item: prav });
	}
	openNavDetailsParom(boat) {
		this.navCtrl.push(DetailsPage, { item: boat });
	}

	//  JD Routs
	trainList(train) {
		this.navCtrl.push(TrainDetails, { item: train });
	}



}
