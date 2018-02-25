import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController, Slides, Content } from 'ionic-angular';

// Routs
import { TrainDetails } from './train/train';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';

@Component({
	templateUrl: 'citydetal.html',
})
export class DetailsPage {
	item: any;
	alertCtrl;
	constructor(params: NavParams, alertCtrl: AlertController, public navCtrl: NavController) {

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
					text: 'группа VK',
					handler: () => {
						console.log('Message VK');
						window.open('https://vk.com/klobus_39', '_system', 'location=yes'); return false;
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
	template: `
<ion-header style="text-align:center;">
    <ion-navbar color="primary"  (click)="startADB()">
        <button ion-button menuToggle >
 			<ion-icon name="menu" color="hidden"></ion-icon>
 		</button>
		<ion-buttons end>
				<button ion-button onclick="window.plugins.socialsharing.share('KLoBus39 транспорт Калининградской области', 'Рекомендую приложение KLoBus39', 'https://pp.userapi.com/c638320/v638320752/4bd5e/UgZtg-jvSbs.jpg', 'https://play.google.com/store/apps/details?id=com.itgluck.klobus39')">
				<ion-icon name="share" color="hidden"></ion-icon>
				</button>
				<button ion-button (click)="hide()" (click)="toggle()">
				<ion-icon name="search" color="hidden"></ion-icon>
				</button>
		</ion-buttons>
        <ion-title logo-header>
			
			KLoBus39
		</ion-title>
	</ion-navbar>
	
    <ion-toolbar color="primary" *ngIf="checked"> 
        <ion-searchbar  [(ngModel)]="searchQuery" (ionInput)="getItems($event)" placeholder="Укажите город или маршрут"></ion-searchbar>
	</ion-toolbar>
	

</ion-header>


<ion-content class="citylist" >


    <!--Accordion-->
    <div class="arrows accordion">
  

    <!--Железнодорожный вокзал--> 
 
        <div class="tab" [ngClass]="{noimg: !visibility}">
			<input id="tab-elect" type="checkbox" name="tabs">
			
            <label for="tab-elect">Электрички <ion-icon name="subway" item-end></ion-icon></label>
			<div class="tab-content" >

				<ion-list class="trainbtn">
					<div *ngFor="let train of trains">
						<button ion-item (click)="trainList(train)" class="citylist">
							
							Калининград - {{train.title}}
							<br><div class='en'>Kaliningrad - {{train.en}}
							<br>{{train.info}}</div>
						</button>
					</div>
                </ion-list>			
			</div>
		</div>
		
 	<h5>Автовокзалы г.Калининград</h5>
		<!-- АвтоВокзалы --> 
				<div class="tab">
					<input id="tab-2" type="checkbox" name="tabs">
					<label for="tab-2">Северный автовокзал  
					<a href="geo:54.7214,20.50011?z=15&q=Северный вокзал">
					<ion-icon item-end name="pin"></ion-icon>
					</a>
					</label>
					<div class="tab-content"  [ngClass]="{invisible: !visibility}">
					
						<ion-list>
							<div *ngFor="let data of spisok">
								<button ion-item (click)="openNavDetailsPage2(data)" class="citylist">
									{{data.title }}
									<br><div class='en'>{{data.en}}</div>
									<span item-right class='numb'>
									<ion-icon start name="bus"></ion-icon>
									{{data.numb}}
									</span> 
								</button>
							</div>
						</ion-list>
					</div>
				</div>

				<div class="tab">
					<input id="tab-3" type="checkbox" name="tabs">
					<label for="tab-3">Южный автовокзал 
					<a href="geo:54.6935,20.50188?z=15&q=Южный вокзал">
					<ion-icon name="pin" item-end></ion-icon>
					</a>    
					</label>
					<div class="tab-content" [ngClass]="{invisible: !visibility}">
					
						<ion-list>
							<div *ngFor="let item of items">
								<button ion-item (click)="openNavDetailsPage(item)" class="citylist">
								{{ item.title }}<br><div class='en'>{{item.en}}</div>
								<span item-right class='numb'><ion-icon start name="bus"></ion-icon>{{item.numb}}</span> 
								</button>
							</div> 
						</ion-list>
					</div>
				</div>

	<h5>Автостанции Калининградской области</h5>

				<div class="tab">
					<input id="tab-4" type="checkbox" name="tabs">
					<label for="tab-4">Советск 
					<a href="geo:55.081515,21.87958?z=9&q=АВ Советск">
					<ion-icon name="pin" item-end></ion-icon>					
					</a>               
					</label>
					<div class="tab-content" [ngClass]="{invisible: !visibility}">
						<ion-list>
							<div *ngFor="let sov of sovetsk">
								<button ion-item (click)="openNavDetailsSov(sov)" class="citylist">
								{{sov.title }}<br><div class='en'>{{sov.en}}</div>
								<span item-right class='numb'><ion-icon start name="bus"></ion-icon>{{sov.numb}}</span> 
								</button>
							</div>
						</ion-list>
					</div>
				</div>
			
				<div class="tab">
					<input id="tab-6" type="checkbox" name="tabs">
					<label for="tab-6">Черняховск
					<a href="geo:54.6311,21.8202?z=9&q=Черняховск автовокзал">
					<ion-icon name="pin" item-end></ion-icon>
					</a>
					</label>
					<div class="tab-content" [ngClass]="{invisible: !visibility}">
						<ion-list>
							<div *ngFor="let cher of chernahovsk">
								<button ion-item (click)="openNavDetailsCher(cher)" class="citylist">
								{{cher.title }}<br><div class='en'>{{cher.en}}</div>
								<span item-right class='numb'><ion-icon start name="bus"></ion-icon>{{cher.numb}}</span> 
								</button>
							</div>
						</ion-list>
					</div>
				</div>
					
				<div class="tab">
					<input id="tab-12" type="checkbox" name="tabs">
					<label for="tab-12">Озерск 
					<a href="geo:54.943894,22.492978?z=8&q=Озерск автостанция">
					<ion-icon name="pin" item-end></ion-icon>
					</a>               
					</label>
					<div class="tab-content" [ngClass]="{invisible: !visibility}">
						<ion-list>
							<div *ngFor="let ozer of ozersk">
								<button ion-item (click)="openNavDetailsOzersk(ozer)" class="citylist">
								{{ozer.title }}<br><div class='en'>{{ozer.en}}</div>
								<span item-right class='numb'><ion-icon start name="bus"></ion-icon>{{ozer.numb}}</span> 
								</button>
							</div>
						</ion-list>
					</div>
				</div>

				<div class="tab">
					<input id="tab-5" type="checkbox" name="tabs">
					<label for="tab-5">Гусев 
					<a href="geo:54.585265,22.198909?z=8&q=Гусев жд вокзал">
					<ion-icon name="pin" item-end></ion-icon>
					</a>               
					</label>
					<div class="tab-content" [ngClass]="{invisible: !visibility}">
						<ion-list>
							<div *ngFor="let gus of gusev">
								<button ion-item (click)="openNavDetailsGus(gus)" class="citylist">
								{{gus.title }}<br><div class='en'>{{gus.en}}</div>
								<span item-right class='numb'><ion-icon start name="bus"></ion-icon>{{gus.numb}}</span> 
								</button>
							</div>
						</ion-list>
					</div>
				</div>
			
				<div class="tab">
					<input id="tab-7" type="checkbox" name="tabs">
					<label for="tab-7">Большаково
					<a href="geo:54.8805,21.6521?z=8&q=Большаково автостанция">
					<ion-icon name="pin" item-end></ion-icon>
					</a>
					</label>
					<div class="tab-content" [ngClass]="{invisible: !visibility}">
						<ion-list>
							<div *ngFor="let bolsh of bolshakovo">
								<button ion-item (click)="openNavDetailsBolsh(bolsh)" class="citylist">
								{{bolsh.title }}<br><div class='en'>{{bolsh.en}}</div>
								<span item-right class='numb'><ion-icon start name="bus"></ion-icon>{{bolsh.numb}}</span> 
								</button>
							</div>
						</ion-list>
					</div>
				</div>

				<div class="tab">
					<input id="tab-8" type="checkbox" name="tabs">
					<label for="tab-8">Гвардейск 
					<a href="geo:54.6311,21.8202?z=9&q=Гвардейск автостанция">
					<ion-icon name="pin" item-end></ion-icon>
					</a>               
					</label>
					<div class="tab-content" [ngClass]="{invisible: !visibility}">
						<ion-list>
							<div *ngFor="let gvard of gvardeysk">
								<button ion-item (click)="openNavDetailsGvard(gvard)" class="citylist">
								{{gvard.title }}<br><div class='en'>{{gvard.en}}</div>
								<span item-right class='numb'><ion-icon start name="bus"></ion-icon>{{gvard.numb}}</span> 
								</button>
							</div>
						</ion-list>
					</div>
				</div>

				<div class="tab">
				<input id="tab-9" type="checkbox" name="tabs">
				<label for="tab-9">Железнодорожный 
				<a href="geo:54.361693,21.305466?z=7">
				<ion-icon name="pin" item-end></ion-icon>
				</a>               
				</label>
					<div class="tab-content" [ngClass]="{invisible: !visibility}">
						<ion-list>
							<div *ngFor="let jzd of jzdorojniy">
								<button ion-item (click)="openNavDetailsJzd(jzd)" class="citylist">
								{{jzd.title }}<br><div class='en'>{{jzd.en}}</div>
								<span item-right class='numb'><ion-icon start name="bus"></ion-icon>{{jzd.numb}}</span> 
								</button>
							</div>
						</ion-list>
					</div>
				</div>

				<div class="tab">
				<input id="tab-10" type="checkbox" name="tabs">
				<label for="tab-10">Краснознаменск 
				<a href="geo:54.943894,22.492978?z=8&q=Краснознаменск автостанция">
				<ion-icon name="pin" item-end></ion-icon>
				</a>               
				</label>
					<div class="tab-content" [ngClass]="{invisible: !visibility}">
						<ion-list>
							<div *ngFor="let krz of krznamensk">
								<button ion-item (click)="openNavDetailsKrz(krz)" class="citylist">
								{{krz.title }}<br><div class='en'>{{krz.en}}</div>
								<span item-right class='numb'><ion-icon start name="bus"></ion-icon>{{krz.numb}}</span> 
								</button>
							</div>
						</ion-list>
					</div>
				</div>
				
				<div class="tab">
				<input id="tab-11" type="checkbox" name="tabs">
				<label for="tab-11">Неман 
				<a href="geo:54.943894,22.492978?z=8&q=Неман автостанция">
				<ion-icon name="pin" item-end></ion-icon>
				</a>       
				</label>
				<div class="tab-content" [ngClass]="{invisible: !visibility}">
						<ion-list>
							<div *ngFor="let nem of neman">
								<button ion-item (click)="openNavDetailsNeman(nem)" class="citylist">
								{{nem.title }}<br><div class='en'>{{nem.en}}</div>
								<span item-right class='numb'><ion-icon start name="bus"></ion-icon>{{nem.numb}}</span> 
								</button>
							</div>
						</ion-list>
					</div>
				</div>
				
				<div class="tab">
				<input id="tab-13" type="checkbox" name="tabs">
				<label for="tab-13">Правдинск
				<a href="geo:54.4463,21.01878?z=9&q=Правдинск автостанция">
				<ion-icon name="pin" item-end></ion-icon>
				</a>
				</label>
				<div class="tab-content" [ngClass]="{invisible: !visibility}">
						<ion-list>
							<div *ngFor="let prav of pravdinsk">
								<button ion-item (click)="openNavDetailsPravdinsk(prav)" class="citylist">
								{{prav.title }}<br><div class='en'>{{prav.en}}</div>
								<span item-right class='numb'><ion-icon start name="bus"></ion-icon>{{prav.numb}}</span> 
								</button>
							</div>
						</ion-list>
					</div>
				</div>

			<h5>Балтийская коса</h5>

				<div class="tab">
					<input id="tab-14" type="checkbox" name="tabs">
					<label for="tab-14">Паром <ion-icon name="boat" item-end></ion-icon></label>
					<div class="tab-content" [ngClass]="{invisible: !visibility}">             
						<ion-list>
							<div *ngFor="let boat of parom">
								<button ion-item (click)="openNavDetailsParom(boat)" class="citylist">
								{{boat.title}}<br><div class='en'>{{boat.en}}</div>
								<span item-right class='numb'><ion-icon start name="boat"></ion-icon></span> 
								</button>
							</div>
						</ion-list> 
					</div>
				</div>
			</div>

</ion-content>
`,
	styles: [`.invisible{display:block;}
			.noimg{
				display:none !important;
			}
`]
})
export class Page1 {
	// Exp всех направлений
	items = [];
	spisok = [];
	sovetsk = [];
	gusev = [];
	chernahovsk = [];
	bolshakovo = [];
	gvardeysk = [];
	jzdorojniy = [];
	krznamensk = [];
	neman = [];
	ozersk = [];
	pravdinsk = [];
	parom = [];

	trains = [];
	item: any;
	searchQuery: string = '';
	checked: boolean = false;
	visibility: boolean = true;


	constructor(public navCtrl: NavController, params: NavParams, private adMobFree: AdMobFree
	) {
		this.searchQuery = '';
		this.initializeItems();
		this.item = params.data.item;
	}

	hide() {
		this.checked = !this.checked;
		this.initializeItems();
		this.searchQuery = '';
	}
	toggle() {
		this.visibility = !this.visibility;
	}

	startADB() {
		// AdMob Block #############
		const bannerConfig: AdMobFreeBannerConfig = {
			id: 'ca-app-pub-7133305264165200/6243373138',
			// isTesting: true,
			autoShow: true,
			bannerAtTop: true
		}

		this.adMobFree.banner.config(bannerConfig);
		this.adMobFree.banner.prepare()
			.then(() => {
				console.log('AdMob готов')
			})

			.catch(e => console.log(e));
		// AdMob Block #############
	}

	initializeItems() {

		// Trains

		this.trains = [
			{
				'title': 'Багратионовск',
				'en': 'Bagrationovsk',
				city: 'Калининград',
				time: '0:37', dist: '22', cost: '41',
				station: [
					{
						'title': 'Калининград Южный',
						'bullet_type': 'def start',
						'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
						't1': '08:05', 'r1': '6314', 'd1': 'по выходным'
					},
					{
						'title': 'о.п. 4км',
						'bullet_type': 'def',
						'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
						't1': '08:10', 'r1': '6314', 'd1': 'по выходным'
					},
					{
						'title': 'Дзержинская-новая',
						'bullet_type': 'disable',
						'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
						'r1': '6314', 'd1': 'по выходным'
					},
					{
						'title': 'о.п. 6 км',
						'bullet_type': 'disable',
						'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
						'r1': '6314', 'd1': 'по выходным'
					},
					{
						'title': 'о.п. Отважное',
						'bullet_type': 'def',
						'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
						't1': '08:20', 'r1': '6314', 'd1': 'по выходным'
					},
					{
						'title': 'Владимиров',
						'bullet_type': 'def',
						'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
						't1': '08:26', 'r1': '6314', 'd1': 'по выходным'
					},
					{
						'title': 'о.п. 18 км',
						'bullet_type': 'def',
						'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
						'r1': '6314', 'd1': 'по выходным'
					},
					{
						'title': 'о.п. 20 км',
						'bullet_type': 'disable',
						'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
						't1': '08:33', 'r1': '6314', 'd1': 'по выходным'
					},
					{
						'title': 'о.п. 21 км',
						'bullet_type': 'def',
						'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
						't1': '08:36', 'r1': '6314', 'd1': 'по выходным'
					},
					{
						'title': 'Стрельня Новая',
						'bullet_type': 'def start',
						'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
						't1': '08:42', 'r1': '6314', 'd1': 'по выходным'
					},
					{
						'title': 'Багратионовск',
						'bullet_type': 'disable',
						'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
						'r1': '6314', 'd1': 'по выходным'
					}
				],
				back: [
					{
						'title': 'Багратионовск',
						'bullet_type': 'disable',
						'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
						'r1': '6315', 'd1': 'по выходным'
					},
					{
						'title': 'Стрельня Новая',
						'bullet_type': 'def start',
						'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
						't1': '15:00', 'r1': '6315', 'd1': 'по выходным'
					},
					{
						'title': 'о.п. 21 км',
						'bullet_type': 'def',
						'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
						't1': '15:02', 'r1': '6315', 'd1': 'по выходным'
					},
					{
						'title': 'о.п. 20 км',
						'bullet_type': 'def',
						'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
						't1': '15:05', 'r1': '6315', 'd1': 'по выходным'
					},
					{
						'title': 'о.п. 18 км',
						'bullet_type': 'disable',
						'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
						'r1': '6315', 'd1': 'по выходным'
					},
					{
						'title': 'Владимиров',
						'bullet_type': 'def',
						'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
						't1': '15:14', 'r1': '6315', 'd1': 'по выходным'
					},
					{
						'title': 'о.п. Отважное',
						'bullet_type': 'def',
						'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
						't1': '15:20', 'r1': '6315', 'd1': 'по выходным'
					},
					{
						'title': 'о.п. 6 км',
						'bullet_type': 'disable',
						'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
						'r1': '6315', 'd1': 'по выходным'
					},
					{
						'title': 'Дзержинская-новая',
						'bullet_type': 'disable',
						'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
						'r1': '6315', 'd1': 'по выходным'
					},
					{
						'title': 'о.п. 4км',
						'bullet_type': 'def',
						'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
						't1': '15:29', 'r1': '6315', 'd1': 'по выходным'
					},
					{
						'title': 'Калининград Южный',
						'bullet_type': 'def start',
						'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
						't1': '15:38', 'r1': '6315', 'd1': 'по выходным'
					}
				]
			},
			{
				'title': 'Балтийск',
				'en': 'Baltiysk',
				city: 'Калининград',
				time: '1:00', dist: '47', cost: '84',
				station: [
					{
						'title': 'Калининград Северный',
						'bullet_type': 'def start',
						't1': '18:22',
						'r1': '6407', 'd1': 'побудням', 'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
					},
					{
						'title': 'Западный-новый',
						'bullet_type': 'def',
						't1': '18:30',
						'r1': '6407', 'd1': 'побудням', 'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
					},
					{
						'title': 'Лесное-новое',
						'bullet_type': 'def',
						't1': '18:38',
						'r1': '6407', 'd1': 'побудням', 'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
					},
					{
						'title': 'о.п. 13 км',
						'bullet_type': 'def',
						't1': '18:42',
						'r1': '6407', 'd1': 'побудням', 'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
					},
					{
						'title': 'Люблино',
						'bullet_type': 'def',
						't1': '18:45',
						'r1': '6407', 'd1': 'побудням', 'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
					},
					{
						'title': 'о.п. 18 км',
						'bullet_type': 'def',
						't1': '18:49',
						'r1': '6407', 'd1': 'побудням', 'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
					},
					{
						'title': 'Шиповка',
						'bullet_type': 'def',
						't1': '18:54',
						'r1': '6407', 'd1': 'побудням', 'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
					},
					{
						'title': 'о.п. 29 км',
						'bullet_type': 'def',
						't1': '19:01',
						'r1': '6407', 'd1': 'побудням', 'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
					},
					{
						'title': 'о.п. 33 км',
						'bullet_type': 'disable',

						'r1': '6407', 'd1': 'побудням', 'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
					},
					{
						'title': 'Приморск-новый',
						'bullet_type': 'def',
						't1': '19:07',
						'r1': '6407', 'd1': 'побудням', 'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
					},
					{
						'title': 'Мечниково',
						'bullet_type': 'def',
						't1': '19:14',
						'r1': '6407', 'd1': 'побудням', 'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
					},
					{
						'title': 'о.п. 45 км',
						'bullet_type': 'def',
						't1': '19:18',
						'r1': '6407', 'd1': 'побудням', 'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
					},
					{
						'title': 'Балтийск',
						'bullet_type': 'def start',
						't1': '19:22',
						'r1': '6407', 'd1': 'побудням', 'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
					}],
				back: [
						{
							'title': 'Балтийск',
							'bullet_type': 'def start',
							't1': '06:01',
							'r1': '6410', 'd1': 'побудням', 'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
						},
						{
							'title': 'о.п. 45 км',
							'bullet_type': 'def',
							't1': '06:04',
							'r1': '6410', 'd1': 'побудням', 'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
						},
						{
							'title': 'Мечниково',
							'bullet_type': 'def',
							't1': '06:08',
							'r1': '6410', 'd1': 'побудням', 'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
						},
						{
							'title': 'Приморск-новый',
							'bullet_type': 'def',
							't1': '06:15',
							'r1': '6410', 'd1': 'побудням', 'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
						},
						{
							'title': 'о.п. 33 км',
							'bullet_type': 'disable',

							'r1': '6410', 'd1': 'побудням', 'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
						},
						{
							'title': 'о.п. 29 км',
							'bullet_type': 'def',
							't1': '06:22',
							'r1': '6410', 'd1': 'побудням', 'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
						},
						{
							'title': 'Шиповка',
							'bullet_type': 'def',
							't1': '06:29',
							'r1': '6410', 'd1': 'побудням', 'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
						},
						{
							'title': 'о.п. 18 км',
							'bullet_type': 'def',
							't1': '06:34',
							'r1': '6410', 'd1': 'побудням', 'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
						},
						{
							'title': 'Люблино',
							'bullet_type': 'def',
							't1': '06:39',
							'r1': '6410', 'd1': 'побудням', 'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
						},
						{
							'title': 'о.п. 13 км',
							'bullet_type': 'def',
							't1': '06:42',
							'r1': '6410', 'd1': 'побудням', 'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
						},
						{
							'title': 'Лесное-новое',
							'bullet_type': 'def',
							't1': '06:46',
							'r1': '6410', 'd1': 'побудням', 'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
						},
						{
							'title': 'Западный-новый',
							'bullet_type': 'def',
							't1': '06:54',
							'r1': '6410', 'd1': 'побудням', 'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
						},
						{
							'title': 'Калининград-Северный',
							'bullet_type': 'def start',
							't1': '07:02',
							'r1': '6410', 'd1': 'побудням', 'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
						}
					]
				},
			{
				'title': 'Мамоново', //update 21.02
				'en': 'Mamonovo',
				info: 'Через Ладушкин',
				city: 'Калининград',
				time: '1:07', dist: '50', cost: '89',
				station: [
					{
						'title': 'Калининград Южный',
						'bullet_type': 'def start',
						// 'ok1':'showRow',
						't1': '18:10', 'r1': '6307', 'd1': 'по будням',
						// 't2':'09:35','r2':'6323','d2':'по будням',
						'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
					},
					{
						'title': 'Киевская',
						'bullet_type': 'def',
						'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
						't1': '18:14', 'r1': '6307', 'd1': 'по будням'

					},
					{
						'title': 'Голубево',
						'bullet_type': 'def',
						'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
						't1': '18:23', 'r1': '6307', 'd1': 'по будням'
					},
					{
						'title': '1298',
						'bullet_type': 'def',
						'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
						't1': '18:27', 'r1': '6307', 'd1': 'по будням'
					},
					{
						'title': 'Светлое',
						'bullet_type': 'def',
						'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
						't1': '18:31', 'r1': '6307', 'd1': 'по будням'
					},
					{
						'title': '1305',
						'bullet_type': 'def',
						'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
						't1': '18:35', 'r1': '6307', 'd1': 'по будням'
					},
					{
						'title': '1307',
						'bullet_type': 'def',
						'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
						't1': '18:39', 'r1': '6307', 'd1': 'по будням'
					},
					{
						'title': '1312',
						'bullet_type': 'def',
						'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
						't1': '18:44', 'r1': '6307', 'd1': 'по будням'
					},
					{
						'title': 'Ладушкин',
						'bullet_type': 'def start',
						'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
						't1': '18:49', 'r1': '6307', 'd1': 'по будням'
					},
					{
						'title': 'Сосновый Бор',
						'bullet_type': 'var',
						'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
						't1': '18:54', 'r1': '6307', 'd1': 'по будням'
					},
					{
						'title': 'Приморское-новое',
						'bullet_type': 'var',
						'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
						't1': '18:59', 'r1': '6307', 'd1': 'по будням'
					},
					{
						'title': 'Знаменка-новая',
						'bullet_type': 'var',
						'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
						't1': '19:05', 'r1': '6307', 'd1': 'по будням'
					},
					{
						'title': '1333',
						'bullet_type': 'var',
						'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
						't1': '19:11', 'r1': '6307', 'd1': 'по будням'
					},
					{
						'title': 'Мамоново',
						'bullet_type': 'def start',
						'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
						't1': '19:17', 'r1': '6307', 'd1': 'по будням'
					}],
				back: [{
					'title': 'Мамоново',
					'bullet_type': 'def start',
					'ok2': 'showRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
					't1': '06:15', 'r1': '6302', 'd1': 'по будням',
					't2': '19:45', 'r2': '6310', 'd2': 'по будням'
				},
				{
					'title': '1333',
					'bullet_type': 'var',
					'ok2': 'showRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
					't1': '06:18', 'r1': '6302', 'd1': 'по будням',
					't2': '19:48', 'r2': '6310', 'd2': 'по будням'
				},
				{
					'title': 'Знаменка-новая',
					'bullet_type': 'var',
					'ok2': 'showRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
					't1': '06:24', 'r1': '6302', 'd1': 'по будням',
					't2': '19:54', 'r2': '6310', 'd2': 'по будням'
				},
				{
					'title': 'Приморское-новое',
					'bullet_type': 'var',
					'ok2': 'showRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
					't1': '06:30', 'r1': '6302', 'd1': 'по будням',
					't2': '20:00', 'r2': '6310', 'd2': 'по будням'
				},
				{
					'title': 'Сосновый Бор',
					'bullet_type': 'var',
					'ok2': 'showRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
					't1': '06:35', 'r1': '6302', 'd1': 'по будням',
					't2': '20:05', 'r2': '6310', 'd2': 'по будням'
				},
				{
					'title': 'Ладушкин',
					'bullet_type': 'def start',
					'ok2': 'showRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
					't1': '06:39', 'r1': '6302', 'd1': 'по будням',
					't2': '20:09', 'r2': '6310', 'd2': 'по будням'
				},
				{
					'title': '1312 км',
					'bullet_type': 'def',
					'ok2': 'showRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
					't1': '06:44', 'r1': '6302', 'd1': 'по будням',
					't2': '20:14', 'r2': '6310', 'd2': 'по будням'
				},
				{
					'title': '1307 км',
					'bullet_type': 'def',
					'ok2': 'showRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
					't1': '06:49', 'r1': '6302', 'd1': 'по будням',
					't2': '20:19', 'r2': '6310', 'd2': 'по будням'
				},
				{
					'title': '1305 км',
					'bullet_type': 'def',
					'ok2': 'showRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
					't1': '06:53', 'r1': '6302', 'd1': 'по будням',
					't2': '20:23', 'r2': '6310', 'd2': 'по будням'
				},
				{
					'title': 'Светлое',
					'bullet_type': 'def',
					'ok2': 'showRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
					't1': '06:57', 'r1': '6302', 'd1': 'по будням',
					't2': '20:27', 'r2': '6310', 'd2': 'по будням'
				},
				{
					'title': '1298 км',
					'bullet_type': 'def',
					'ok2': 'showRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
					't1': '07:02', 'r1': '6302', 'd1': 'по будням',
					't2': '20:32', 'r2': '6310', 'd2': 'по будням'
				},
				{
					'title': 'Голубево',
					'bullet_type': 'def',
					'ok2': 'showRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
					't1': '07:05', 'r1': '6302', 'd1': 'по будням',
					't2': '20:35', 'r2': '6310', 'd2': 'по будням'
				},
				{
					'title': 'Киевская',
					'bullet_type': 'def',
					'ok2': 'showRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
					't1': '07:14', 'r1': '6302', 'd1': 'по будням',
					't2': '20:44', 'r2': '6310', 'd2': 'по будням'
				},
				{
					'title': 'Калининград Южный',
					'bullet_type': 'def start',
					'ok2': 'showRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
					't1': '07:21', 'r1': '6302', 'd1': 'по будням',
					't2': '20:51', 'r2': '6310', 'd2': 'по будням'
				}]
			},

			{
				'title': 'Черняховск',
				'en': 'Cherniahovsk',
				info: 'Через Гвардейск, Черняховск',
				city: 'Калининград',
				time: '1:30', dist: '90', cost: '170',
				station: [{
					'title': 'Калининград Южный',
					'bullet_type': 'def start',
					'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
					't1': '18:00', 'r1': '6508', 'd1': 'по будням',
				},
				{
					'title': 'Айвазовская',
					'bullet_type': 'def',
					'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
					't1': '18:08', 'r1': '6508', 'd1': 'по будням',
				},
				{
					'title': 'Луговое-новое',
					'bullet_type': 'def',
					'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
					't1': '18:14', 'r1': '6508', 'd1': 'по будням',
				},
				{
					'title': '1271 км',
					'bullet_type': 'def',
					'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
					't1': '18:19', 'r1': '6508', 'd1': 'по будням',
				},
				{
					'title': 'Комсомольск-западный',
					'bullet_type': 'def',
					'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
					't1': '18:24', 'r1': '6508', 'd1': 'по будням',
				},
				{
					'title': 'Озерки-Новые',
					'bullet_type': 'def',
					'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
					't1': '18:31', 'r1': '6508', 'd1': 'по будням',
				},
				{
					'title': '1252 км',
					'bullet_type': 'def',
					'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
					't1': '18:37', 'r1': '6508', 'd1': 'по будням',
				},
				{
					'title': 'Гвардейск',
					'bullet_type': 'def',
					'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
					't1': '18:44', 'r1': '6508', 'd1': 'по будням',
				},
				{
					'title': 'Знаменск',
					'bullet_type': 'def',
					'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
					't1': '18:52', 'r1': '6508', 'd1': 'по будням',
				},
				{
					'title': 'Пушкарево',
					'bullet_type': 'def',
					'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
					't1': '19:01', 'r1': '6508', 'd1': 'по будням',
				},
				{
					'title': 'Междуречье',
					'bullet_type': 'def',
					'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
					't1': '19:11', 'r1': '6508', 'd1': 'по будням',
				},
				{
					'title': 'Пастухово',
					'bullet_type': 'def',
					'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
					't1': '19:19', 'r1': '6508', 'd1': 'по будням',
				},
				{
					'title': 'Черняховск',
					'bullet_type': 'def start',
					'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
					't1': '19:30', 'r1': '6508', 'd1': 'по будням'
				}],
				back: [{
					'title': 'Черняховск',
					'bullet_type': 'def start',
					't1': '07:07', 'r1': '6503', 'd1': 'по будням',
					'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
				},
				{
					'title': 'Пастухово',
					'bullet_type': 'def',
					't1': '07:17', 'r1': '6503', 'd1': 'по будням',
					'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
				},
				{
					'title': 'Междуречье',
					'bullet_type': 'def',
					't1': '07:24', 'r1': '6503', 'd1': 'по будням',
					'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
				},
				{
					'title': 'Пушкарево',
					'bullet_type': 'def',
					't1': '07:33', 'r1': '6503', 'd1': 'по будням',
					'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
				},
				{
					'title': 'Знаменск',
					'bullet_type': 'def',
					't1': '07:41', 'r1': '6503', 'd1': 'по будням',
					'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
				},
				{
					'title': 'Гвардейск',
					'bullet_type': 'def',
					't1': '07:49', 'r1': '6503', 'd1': 'по будням',
					'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
				},
				{
					'title': '1252 км',
					'bullet_type': 'def',
					't1': '07:55', 'r1': '6503', 'd1': 'по будням',
					'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
				},
				{
					'title': 'Озерки-Новые',
					'bullet_type': 'def',
					't1': '08:02', 'r1': '6503', 'd1': 'по будням',
					'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
				},
				{
					'title': 'Комсомольск-западный',
					'bullet_type': 'def',
					't1': '08:10', 'r1': '6503', 'd1': 'по будням',
					'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
				},
				{
					'title': '1271 км',
					'bullet_type': 'def',
					't1': '08:14', 'r1': '6503', 'd1': 'по будням',
					'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
				},
				{
					'title': 'Луговое-новое',
					'bullet_type': 'def',
					't1': '08:19', 'r1': '6503', 'd1': 'по будням',
					'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
				},
				{
					'title': 'Айвазовская',
					'bullet_type': 'def',
					't1': '08:25', 'r1': '6503', 'd1': 'по будням',
					'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
				},
				{
					'title': 'Калининград Южный',
					'bullet_type': 'def start',
					't1': '08:34', 'r1': '6503', 'd1': 'по будням',
					'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
				}]
			},
			{
				'title': 'Светлогорск-2',
				'en': 'Svetlogorsk-2',
				info: 'Через Переславское',
				city: 'Калининград',
				time: '1:00', dist: '46', cost: '82',
				station: [
					{
						'title': 'Калининград Южный',
						'bullet_type': 'def start',
						't1': '06:23',
						't2': '07:42', //6703
						't3': '11:09', //6707
						't4': '15:10', //6713
						't5': '17:39', //6717
						't6': '18:28', //6719
						// 'route': '6701 6703 6707 6713 6717 6719',
						'ok7': 'noRow',
						'r1': '6701', 'd1': 'кроме Вс',
						'r2': '6703', 'd2': 'ежедневно',
						'r3': '6707', 'd3': 'ежедневно',
						'r4': '6713', 'd4': 'ежедневно',
						'r5': '6717', 'd5': 'ежедневно',
						'r6': '6719', 'd6': 'ежедневно'
					},
					{
						'title': 'Калининград Северный',
						'bullet_type': 'def',
						't1': '06:30',
						't2': '07:49',
						't3': '11:17',
						't4': '15:18',
						't5': '17:47',
						't6': '18:36',
						'ok7': 'noRow',
						'r1': '6701', 'd1': 'кроме Вс',
						'r2': '6703', 'd2': 'ежедневно',
						'r3': '6707', 'd3': 'ежедневно',
						'r4': '6713', 'd4': 'ежедневно',
						'r5': '6717', 'd5': 'ежедневно',
						'r6': '6719', 'd6': 'ежедневно'
					},
					{
						'title': 'Сельма',
						'bullet_type': 'def',
						't1': '06:34',
						't2': '07:53',
						't3': '11:21',
						't4': '15:22',
						't5': '17:51',
						't6': '18:40',
						'ok7': 'noRow',
						'r1': '6701', 'd1': 'кроме Вс',
						'r2': '6703', 'd2': 'ежедневно',
						'r3': '6707', 'd3': 'ежедневно',
						'r4': '6713', 'd4': 'ежедневно',
						'r5': '6717', 'd5': 'ежедневно',
						'r6': '6719', 'd6': 'ежедневно'
					},
					{
						'title': 'Чкаловск-Западный',
						'bullet_type': 'def',
						't1': '06:39',
						't2': '07:58',
						't3': '11:26',
						't4': '15:27',
						't5': '17:56',
						't6': '18:45',
						'ok7': 'noRow',
						'r1': '6701', 'd1': 'кроме Вс',
						'r2': '6703', 'd2': 'ежедневно',
						'r3': '6707', 'd3': 'ежедневно',
						'r4': '6713', 'd4': 'ежедневно',
						'r5': '6717', 'd5': 'ежедневно',
						'r6': '6719', 'd6': 'ежедневно'
					},
					{
						'title': 'Дружное',
						'bullet_type': 'def',
						't1': '06:45',
						't2': '08:04',
						't3': '11:32',
						't4': '15:33',
						't5': '18:02',
						't6': '18:52',
						'ok7': 'noRow',
						'r1': '6701', 'd1': 'кроме Вс',
						'r2': '6703', 'd2': 'ежедневно',
						'r3': '6707', 'd3': 'ежедневно',
						'r4': '6713', 'd4': 'ежедневно',
						'r5': '6717', 'd5': 'ежедневно',
						'r6': '6719', 'd6': 'ежедневно'
					},
					{
						'title': 'Колосовка',
						'bullet_type': 'def',
						't1': '06:50',
						't2': '08:10',
						't3': '11:37',
						't4': '15:38',
						't5': '18:07',
						't6': '18:57',
						'ok7': 'noRow',
						'r1': '6701', 'd1': 'кроме Вс',
						'r2': '6703', 'd2': 'ежедневно',
						'r3': '6707', 'd3': 'ежедневно',
						'r4': '6713', 'd4': 'ежедневно',
						'r5': '6717', 'd5': 'ежедневно',
						'r6': '6719', 'd6': 'ежедневно'
					},
					{
						'title': '20 км',
						'bullet_type': 'def',
						't1': '06:54',
						't2': '08:13',
						't3': '11:40',
						't4': '15:41',
						't5': '18:10',
						't6': '19:00',
						'ok7': 'noRow',
						'r1': '6701', 'd1': 'кроме Вс',
						'r2': '6703', 'd2': 'ежедневно',
						'r3': '6707', 'd3': 'ежедневно',
						'r4': '6713', 'd4': 'ежедневно',
						'r5': '6717', 'd5': 'ежедневно',
						'r6': '6719', 'd6': 'ежедневно'
					},
					{
						'title': 'Переславское',
						'bullet_type': 'def',
						't1': '06:59',
						't2': '08:17',
						't3': '11:44',
						't4': '15:46',
						't5': '18:14',
						't6': '19:04',
						'ok7': 'noRow',
						'r1': '6701', 'd1': 'кроме Вс',
						'r2': '6703', 'd2': 'ежедневно',
						'r3': '6707', 'd3': 'ежедневно',
						'r4': '6713', 'd4': 'ежедневно',
						'r5': '6717', 'd5': 'ежедневно',
						'r6': '6719', 'd6': 'ежедневно'
					},
					{
						'title': 'Романово',
						'bullet_type': 'var',

						't2': '08:23',
						't3': '11:50',
						't4': '15:52',
						't5': '18:20',

						'ok7': 'noRow',
						'r1': '6701', 'd1': 'кроме Вс',
						'r2': '6703', 'd2': 'ежедневно',
						'r3': '6707', 'd3': 'ежедневно',
						'r4': '6713', 'd4': 'ежедневно',
						'r5': '6717', 'd5': 'ежедневно',
						'r6': '6719', 'd6': 'ежедневно'
					},
					{
						'title': 'Пионерский Курорт',
						'bullet_type': 'def',
						't1': '07:12',
						't2': '08:30',
						't3': '11:58',
						't4': '15:59',
						't5': '18:28',
						't6': '19:17',
						'ok7': 'noRow',
						'r1': '6701', 'd1': 'кроме Вс',
						'r2': '6703', 'd2': 'ежедневно',
						'r3': '6707', 'd3': 'ежедневно',
						'r4': '6713', 'd4': 'ежедневно',
						'r5': '6717', 'd5': 'ежедневно',
						'r6': '6719', 'd6': 'ежедневно'
					},
					{
						'title': 'Светлогорск-1',
						'bullet_type': 'def',
						't1': '07:19',
						't2': '08:37',
						't3': '12:05',
						't4': '16:06',
						't5': '18:35',
						't6': '19:24',
						'ok7': 'noRow',
						'r1': '6701', 'd1': 'кроме Вс',
						'r2': '6703', 'd2': 'ежедневно',
						'r3': '6707', 'd3': 'ежедневно',
						'r4': '6713', 'd4': 'ежедневно',
						'r5': '6717', 'd5': 'ежедневно',
						'r6': '6719', 'd6': 'ежедневно'
					},
					{
						'title': 'Светлогорск-2',
						'bullet_type': 'def start',
						't1': '07:24',
						't2': '08:42',
						't3': '12:10',
						't4': '16:11',
						't5': '18:40',
						't6': '19:29',
						'ok7': 'noRow',
						'r1': '6701', 'd1': 'кроме Вс',
						'r2': '6703', 'd2': 'ежедневно',
						'r3': '6707', 'd3': 'ежедневно',
						'r4': '6713', 'd4': 'ежедневно',
						'r5': '6717', 'd5': 'ежедневно',
						'r6': '6719', 'd6': 'ежедневно'
					}
				],
				back: [
					{
						'title': 'Светлогорск-2',
						'bullet_type': 'def start',
						't2': '07:39', //6702
						't1': '06:35', //6700
						't3': '09:00', //6704
						't4': '12:26', //6708
						't5': '17:11', //6714
						't6': '19:17', //6718
						't7': '20:28', //6720
						'r1': '6700', 'd1': 'по будням',
						'r2': '6702', 'd2': 'кроме Вс',
						'r3': '6704', 'd3': 'ежедневно',
						'r4': '6708', 'd4': 'ежедневно',
						'r5': '6714', 'd5': 'ежедневно',
						'r6': '6718', 'd6': 'ежедневно',
						'r7': '6720', 'd7': 'ежедневно'
					},
					{
						'title': 'Светлогорск-1',
						'bullet_type': 'def',
						't2': '07:45',
						't1': '06:41',
						't3': '09:06',
						't4': '12:32',
						't5': '17:17',
						't6': '19:24',
						't7': '20:34',
						'r1': '6700', 'd1': 'по будням',
						'r2': '6702', 'd2': 'кроме Вс',
						'r3': '6704', 'd3': 'ежедневно',
						'r4': '6708', 'd4': 'ежедневно',
						'r5': '6714', 'd5': 'ежедневно',
						'r6': '6718', 'd6': 'ежедневно',
						'r7': '6720', 'd7': 'ежедневно'
					},
					{
						'title': 'Пионерский Курорт',
						'bullet_type': 'def',
						't2': '07:51',
						't1': '06:47',
						't3': '09:12',
						't4': '12:38',
						't5': '17:24',
						't6': '19:31',
						't7': '20:40',
						'r1': '6700', 'd1': 'по будням',
						'r2': '6702', 'd2': 'кроме Вс',
						'r3': '6704', 'd3': 'ежедневно',
						'r4': '6708', 'd4': 'ежедневно',
						'r5': '6714', 'd5': 'ежедневно',
						'r6': '6718', 'd6': 'ежедневно',
						'r7': '6720', 'd7': 'ежедневно'
					},
					{
						'title': 'Романово',
						'bullet_type': 'var',
						't2': '07:57',

						't3': '09:18',
						't4': '12:44',
						't5': '17:30',
						't6': '19:37',

						'r1': '6700', 'd1': 'по будням',
						'r2': '6702', 'd2': 'кроме Вс',
						'r3': '6704', 'd3': 'ежедневно',
						'r4': '6708', 'd4': 'ежедневно',
						'r5': '6714', 'd5': 'ежедневно',
						'r6': '6718', 'd6': 'ежедневно',
						'r7': '6720', 'd7': 'ежедневно'
					},
					{
						'title': 'Переславское',
						'bullet_type': 'def',
						't2': '08:03',
						't1': '06:59',
						't3': '09:24',
						't4': '12:50',
						't5': '17:36',
						't6': '19:43',
						't7': '20:52',
						'r1': '6700', 'd1': 'по будням',
						'r2': '6702', 'd2': 'кроме Вс',
						'r3': '6704', 'd3': 'ежедневно',
						'r4': '6708', 'd4': 'ежедневно',
						'r5': '6714', 'd5': 'ежедневно',
						'r6': '6718', 'd6': 'ежедневно',
						'r7': '6720', 'd7': 'ежедневно'
					},
					{
						'title': '20 км',
						'bullet_type': 'def',
						't2': '08:06',
						't1': '07:02',
						't3': '09:27',
						't4': '12:53',
						't5': '17:39',
						't6': '19:46',
						't7': '20:55',
						'r1': '6700', 'd1': 'по будням',
						'r2': '6702', 'd2': 'кроме Вс',
						'r3': '6704', 'd3': 'ежедневно',
						'r4': '6708', 'd4': 'ежедневно',
						'r5': '6714', 'd5': 'ежедневно',
						'r6': '6718', 'd6': 'ежедневно',
						'r7': '6720', 'd7': 'ежедневно'
					},
					{
						'title': 'Колосовка',
						'bullet_type': 'def',
						't2': '08:10',
						't1': '07:06',
						't3': '09:31',
						't4': '12:57',
						't5': '17:43',
						't6': '19:50',
						't7': '21:00',
						'r1': '6700', 'd1': 'по будням',
						'r2': '6702', 'd2': 'кроме Вс',
						'r3': '6704', 'd3': 'ежедневно',
						'r4': '6708', 'd4': 'ежедневно',
						'r5': '6714', 'd5': 'ежедневно',
						'r6': '6718', 'd6': 'ежедневно',
						'r7': '6720', 'd7': 'ежедневно'
					},
					{
						'title': 'Дружное',
						'bullet_type': 'def',
						't2': '08:15',
						't1': '07:11',
						't3': '09:36',
						't4': '13:03',
						't5': '17:48',
						't6': '19:55',
						't7': '21:05',
						'r1': '6700', 'd1': 'по будням',
						'r2': '6702', 'd2': 'кроме Вс',
						'r3': '6704', 'd3': 'ежедневно',
						'r4': '6708', 'd4': 'ежедневно',
						'r5': '6714', 'd5': 'ежедневно',
						'r6': '6718', 'd6': 'ежедневно',
						'r7': '6720', 'd7': 'ежедневно'
					},
					{
						'title': 'Чкаловск-Западный',
						'bullet_type': 'def',
						't2': '08:22',
						't1': '07:18',
						't3': '09:43',
						't4': '13:10',
						't5': '17:56',
						't6': '20:02',
						't7': '21:12',
						'r1': '6700', 'd1': 'по будням',
						'r2': '6702', 'd2': 'кроме Вс',
						'r3': '6704', 'd3': 'ежедневно',
						'r4': '6708', 'd4': 'ежедневно',
						'r5': '6714', 'd5': 'ежедневно',
						'r6': '6718', 'd6': 'ежедневно',
						'r7': '6720', 'd7': 'ежедневно'
					},
					{
						'title': 'Сельма',
						'bullet_type': 'def',
						't2': '08:26',
						't1': '07:22',
						't3': '09:47',
						't4': '13:14',
						't5': '18:00',
						't6': '20:06',
						't7': '21:16',
						'r1': '6700', 'd1': 'по будням',
						'r2': '6702', 'd2': 'кроме Вс',
						'r3': '6704', 'd3': 'ежедневно',
						'r4': '6708', 'd4': 'ежедневно',
						'r5': '6714', 'd5': 'ежедневно',
						'r6': '6718', 'd6': 'ежедневно',
						'r7': '6720', 'd7': 'ежедневно'
					},
					{
						'title': 'Калининград Северный',
						'bullet_type': 'def',
						't2': '08:32',
						't1': '07:28',
						't3': '09:52',
						't4': '13:20',
						't5': '18:06',
						't6': '20:12',
						't7': '21:22',
						'r1': '6700', 'd1': 'по будням',
						'r2': '6702', 'd2': 'кроме Вс',
						'r3': '6704', 'd3': 'ежедневно',
						'r4': '6708', 'd4': 'ежедневно',
						'r5': '6714', 'd5': 'ежедневно',
						'r6': '6718', 'd6': 'ежедневно',
						'r7': '6720', 'd7': 'ежедневно'
					},
					{
						'title': 'Калининград Южный',
						'bullet_type': 'def start',
						't2': '08:38',
						't1': '07:34',
						't3': '09:58',
						't4': '13:26',
						't5': '18:12',
						't6': '20:18',
						't7': '21:28',
						'r1': '6700', 'd1': 'по будням',
						'r2': '6702', 'd2': 'кроме Вс',
						'r3': '6704', 'd3': 'ежедневно',
						'r4': '6708', 'd4': 'ежедневно',
						'r5': '6714', 'd5': 'ежедневно',
						'r6': '6718', 'd6': 'ежедневно',
						'r7': '6720', 'd7': 'ежедневно'
					}
				]
			},
			{
				'title': 'Светлогорск-2',
				'en': 'Svetlogorsk-2',
				info: 'Через Зеленоградск, Пионерский',
				city: 'Калининград',
				time: '1:34', dist: '43', cost: '100',
				station: [{
					'title': 'Калининград Южный',
					'bullet_type': 'def start',
					't2': '08:00',
					'r2': '6901', 'd2': 'ежедневно',
					'ok1': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'

				},
				{
					'title': 'Калининград Северный',
					'bullet_type': 'def',
					't2': '08:08', 'r2': '6901', 'd2': 'ежедневно',
					'ok1': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
				},
				{
					'title': 'Кутузово-Новое',
					'bullet_type': 'def',
					't2': '08:14', 'r2': '6901', 'd2': 'ежедневно',
					'ok1': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
				},
				{
					'title': '7 км',
					'bullet_type': 'def',
					't2': '08:21', 'r2': '6901', 'd2': 'ежедневно',
					'ok1': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
				},
				{
					'title': 'Рябиновка',
					'bullet_type': 'def',
					't2': '08:25', 'r2': '6901', 'd2': 'ежедневно',
					'ok1': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
				},
				{
					'title': 'Каштановка',
					'bullet_type': 'def',
					't2': '08:30', 'r2': '6901', 'd2': 'ежедневно',
					'ok1': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
				},
				{
					'title': 'Муромское',
					'bullet_type': 'def',
					't2': '08:34', 'r2': '6901', 'd2': 'ежедневно',
					'ok1': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
				},
				{
					'title': 'Сосновка',
					'bullet_type': 'disable',
					'r2': '6901', 'd2': 'ежедневно',
					'ok1': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
				},
				{
					'title': 'Зеленоградск-новый',
					'bullet_type': 'def',
					't2': '08:57', 'r2': '6901', 'd2': 'ежедневно',
					'ok1': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
				},
				{
					'title': 'Малиновка',
					'bullet_type': 'def',
					't2': '09:01', 'r2': '6901', 'd2': 'ежедневно',
					'ok1': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
				},
				{
					'title': 'Сокольники-1',
					'bullet_type': 'def',
					't2': '09:04', 'r2': '6901', 'd2': 'ежедневно',
					'ok1': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
				},
				{
					'title': 'Сокольники-2',
					'bullet_type': 'def',
					't2': '09:07', 'r2': '6901', 'd2': 'ежедневно',
					'ok1': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
				},
				{
					'title': 'Рощино',
					'bullet_type': 'def',
					't2': '09:11', 'r2': '6901', 'd2': 'ежедневно',
					'ok1': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
				},
				{
					'title': 'Куликово',
					'bullet_type': 'def',
					't2': '09:14', 'r2': '6901', 'd2': 'ежедневно',
					'ok1': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
				},
				{
					'title': 'Пионерский Курорт',
					'bullet_type': 'def',
					't2': '09:22', 'r2': '6901', 'd2': 'ежедневно',
					'ok1': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
				},
				{
					'title': 'Светлогорск-1',
					'bullet_type': 'def',
					't2': '09:29', 'r2': '6901', 'd2': 'ежедневно',
					'ok1': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
				},
				{
					'title': 'Светлогорск-2',
					'bullet_type': 'def start',
					't2': '09:34', 'r2': '6901', 'd2': 'ежедневно',
					'ok1': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
				}],
				back: [{
					'title': 'Светлогорск-2',
					'bullet_type': 'def start',
					't2': '10:04', 'r2': '6902', 'd2': 'ежедневно',
					'ok1': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
				},
				{
					'title': 'Светлогорск-1',
					'bullet_type': 'var',
					't2': '10:10', 'r2': '6902', 'd2': 'ежедневно',
					'ok1': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
				},
				{
					'title': 'Пионерский Курорт',
					'bullet_type': 'def',
					't2': '10:16', 'r2': '6902', 'd2': 'ежедневно',
					'ok1': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
				},
				{
					'title': 'Куликово',
					'bullet_type': 'def',
					't2': '10:24', 'r2': '6902', 'd2': 'ежедневно',
					'ok1': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
				},
				{
					'title': 'Рощино',
					'bullet_type': 'def',
					't2': '10:27', 'r2': '6902', 'd2': 'ежедневно',
					'ok1': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
				},
				{
					'title': 'Сокольники-2',
					'bullet_type': 'def',
					't2': '10:31', 'r2': '6902', 'd2': 'ежедневно',
					'ok1': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
				},
				{
					'title': 'Сокольники-1',
					'bullet_type': 'def',
					't2': '10:34', 'r2': '6902', 'd2': 'ежедневно',
					'ok1': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
				},
				{
					'title': 'Малиновка',
					'bullet_type': 'def',
					't2': '10:37', 'r2': '6902', 'd2': 'ежедневно',
					'ok1': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
				},
				{
					'title': 'Зеленоградск-новый',
					'bullet_type': 'def',
					't2': '10:55', 'r2': '6902', 'd2': 'ежедневно',
					'ok1': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
				},
				{
					'title': 'Сосновка',
					'bullet_type': 'def',
					't2': '11:01', 'r2': '6902', 'd2': 'ежедневно',
					'ok1': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
				},
				{
					'title': 'Муромское',
					'bullet_type': 'def',
					't2': '11:05', 'r2': '6902', 'd2': 'ежедневно',
					'ok1': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
				},
				{
					'title': 'Каштановка',
					'bullet_type': 'def',
					't2': '11:09', 'r2': '6902', 'd2': 'ежедневно',
					'ok1': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
				},
				{
					'title': 'Рябиновка',
					'bullet_type': 'def',
					't2': '11:15', 'r2': '6902', 'd2': 'ежедневно',
					'ok1': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
				},
				{
					'title': '7 км',
					'bullet_type': 'def',
					't2': '11:19', 'r2': '6902', 'd2': 'ежедневно',
					'ok1': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
				},
				{
					'title': 'Кутузово-Новое',
					'bullet_type': 'def',
					't2': '11:26', 'r2': '6902', 'd2': 'ежедневно',
					'ok1': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
				},
				{
					'title': 'Калининград Северный',
					'bullet_type': 'def',
					't2': '11:33', 'r2': '6902', 'd2': 'ежедневно',
					'ok1': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
				},
				{
					'title': 'Калининград Южный',
					'bullet_type': 'def start',
					't2': '11:39', 'r2': '6902', 'd2': 'ежедневно',
					'ok1': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
				}]
			},
			{
				'title': 'Зеленоградск',
				'en': 'Zelenogradsk',
				city: 'Калининград',
				time: '0:42', dist: '43', cost: '58',
				station: [{
					'title': 'Калининград Южный',
					'bullet_type': 'def start',
					't1': '06:40',
					't2': '15:40', //6809
					't3': '17:33', //6913
					't4': '18:40', //6815
					'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
					'r1': '6801', 'd1': 'кроме Вс',
					'r2': '6809', 'd2': 'кроме Вс',
					'r3': '6813', 'd3': 'ежедневно',
					'r4': '6815', 'd4': 'ежедневно'
				},
				{
					'title': 'Калининград Северный',
					'bullet_type': 'def',
					't1': '06:47',
					't2': '15:48',
					't3': '17:41',
					't4': '18:48',
					'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
					'r1': '6801', 'd1': 'кроме Вс',
					'r2': '6809', 'd2': 'кроме Вс',
					'r3': '6813', 'd3': 'ежедневно',
					'r4': '6815', 'd4': 'ежедневно'
				},
				{
					'title': 'Кутузово-Новое',
					'bullet_type': 'def',
					't1': '06:52',
					't2': '15:54',
					't3': '17:47',
					't4': '18:53',
					'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
					'r1': '6801', 'd1': 'кроме Вс',
					'r2': '6809', 'd2': 'кроме Вс',
					'r3': '6813', 'd3': 'ежедневно',
					'r4': '6815', 'd4': 'ежедневно'
				},
				{
					'title': '7 км',
					'bullet_type': 'def',
					't1': '06:59',
					't2': '16:01',
					't3': '17:54',
					't4': '19:00',
					'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
					'r1': '6801', 'd1': 'кроме Вс',
					'r2': '6809', 'd2': 'кроме Вс',
					'r3': '6813', 'd3': 'ежедневно',
					'r4': '6815', 'd4': 'ежедневно'
				},
				{
					'title': 'Рябиновка',
					'bullet_type': 'def',
					't1': '07:04',
					't2': '16:05',
					't3': '17:58',
					't4': '19:04',
					'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
					'r1': '6801', 'd1': 'кроме Вс',
					'r2': '6809', 'd2': 'кроме Вс',
					'r3': '6813', 'd3': 'ежедневно',
					'r4': '6815', 'd4': 'ежедневно'
				},
				{
					'title': 'Каштановка',
					'bullet_type': 'def',
					't1': '07:09',
					't2': '16:10',
					't3': '18:03',
					't4': '19:09',
					'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
					'r1': '6801', 'd1': 'кроме Вс',
					'r2': '6809', 'd2': 'кроме Вс',
					'r3': '6813', 'd3': 'ежедневно',
					'r4': '6815', 'd4': 'ежедневно'
				},
				{
					'title': 'Муромское',
					'bullet_type': 'def',
					't1': '07:13',
					't2': '16:14',
					't3': '18:07',
					't4': '19:13',
					'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
					'r1': '6801', 'd1': 'кроме Вс',
					'r2': '6809', 'd2': 'кроме Вс',
					'r3': '6813', 'd3': 'ежедневно',
					'r4': '6815', 'd4': 'ежедневно'
				},
				{
					'title': 'Сосновка',
					'bullet_type': 'var',

					't2': '16:19',
					't3': '18:12',
					't4': '19:18',
					'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
					'r1': '6801', 'd1': 'кроме Вс',
					'r2': '6809', 'd2': 'кроме Вс',
					'r3': '6813', 'd3': 'ежедневно',
					'r4': '6815', 'd4': 'ежедневно'
				},
				{
					'title': 'Зеленоградск-новый',
					'bullet_type': 'def start',
					't1': '07:21',
					't2': '16:25',
					't3': '18:18',
					't4': '19:24',
					'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
					'r1': '6801', 'd1': 'кроме Вс',
					'r2': '6809', 'd2': 'кроме Вс',
					'r3': '6813', 'd3': 'ежедневно',
					'r4': '6815', 'd4': 'ежедневно'
				}],
				back: [{
					'title': 'Зеленоградск-новый',
					'bullet_type': 'def start',
					't1': '07:44', //6802
					't2': '17:19', //6810
					't3': '18:46', //6812
					't4': '19:49', //6814
					'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
					'r1': '6802', 'd1': 'кроме Вс',
					'r2': '6810', 'd2': 'кроме Вс',
					'r3': '6812', 'd3': 'ежедневно',
					'r4': '6814', 'd4': 'ежедневно'
				},
				{
					'title': 'Сосновка',
					'bullet_type': 'var',
					't1': '07:50',
					'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
					'r1': '6802', 'd1': 'кроме Вс',
					'r2': '6810', 'd2': 'кроме Вс',
					'r3': '6812', 'd3': 'ежедневно',
					'r4': '6814', 'd4': 'ежедневно'
				},
				{
					'title': 'Муромское',
					'bullet_type': 'def',
					't1': '07:54',
					't2': '17:27',
					't3': '18:54',
					't4': '19:57',
					'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
					'r1': '6802', 'd1': 'кроме Вс',
					'r2': '6810', 'd2': 'кроме Вс',
					'r3': '6812', 'd3': 'ежедневно',
					'r4': '6814', 'd4': 'ежедневно'
				},
				{
					'title': 'Каштановка',
					'bullet_type': 'def',
					't1': '07:58',
					't2': '17:31',
					't3': '18:58',
					't4': '20:01',
					'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
					'r1': '6802', 'd1': 'кроме Вс',
					'r2': '6810', 'd2': 'кроме Вс',
					'r3': '6812', 'd3': 'ежедневно',
					'r4': '6814', 'd4': 'ежедневно'
				},
				{
					'title': 'Рябиновка',
					'bullet_type': 'def',
					't1': '08:03',
					't2': '17:36',
					't3': '19:04',
					't4': '20:07',
					'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
					'r1': '6802', 'd1': 'кроме Вс',
					'r2': '6810', 'd2': 'кроме Вс',
					'r3': '6812', 'd3': 'ежедневно',
					'r4': '6814', 'd4': 'ежедневно'
				},
				{
					'title': '7 км',
					'bullet_type': 'def',
					't1': '08:07',
					't2': '17:40',
					't3': '19:08',
					't4': '20:11',
					'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
					'r1': '6802', 'd1': 'кроме Вс',
					'r2': '6810', 'd2': 'кроме Вс',
					'r3': '6812', 'd3': 'ежедневно',
					'r4': '6814', 'd4': 'ежедневно'
				},
				{
					'title': 'Кутузово-Новое',
					'bullet_type': 'def',
					't1': '08:14',
					't2': '17:47',
					't3': '19:15',
					't4': '20:18',
					'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
					'r1': '6802', 'd1': 'кроме Вс',
					'r2': '6810', 'd2': 'кроме Вс',
					'r3': '6812', 'd3': 'ежедневно',
					'r4': '6814', 'd4': 'ежедневно'
				},
				{
					'title': 'Калининград Северный',
					'bullet_type': 'def',
					't1': '08:21',
					't2': '17:55',
					't3': '19:22',
					't4': '20:25',
					'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
					'r1': '6802', 'd1': 'кроме Вс',
					'r2': '6810', 'd2': 'кроме Вс',
					'r3': '6812', 'd3': 'ежедневно',
					'r4': '6814', 'd4': 'ежедневно'
				},
				{
					'title': 'Калининград Южный',
					'bullet_type': 'def start',
					't1': '08:27',
					't2': '18:01',
					't3': '19:28',
					't4': '20:31',
					'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
					'r1': '6802', 'd1': 'кроме Вс',
					'r2': '6810', 'd2': 'кроме Вс',
					'r3': '6812', 'd3': 'ежедневно',
					'r4': '6814', 'd4': 'ежедневно'
				}]
			},
			{
				'title': 'Пионерский Курорт',
				'en': 'Pionerskiy Kurort',
				city: 'Калининград',
				time: '1:23', dist: '43', cost: '87',
				station: [{
					'title': 'Калининград Южный',
					'bullet_type': 'def start',
					't1': '10:50',
					'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
					'r1': '6903', 'd1': 'ежедневно',
				},
				{
					'title': 'Калининград-Северный',
					'bullet_type': 'def',
					't1': '10:58',
					'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
					'r1': '6903', 'd1': 'ежедневно',
				},
				{
					'title': 'Кутузово-Новое',
					'bullet_type': 'def',
					't1': '11:04',
					'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
					'r1': '6903', 'd1': 'ежедневно',
				},
				{
					'title': 'о.п. 7 км',
					'bullet_type': 'def',
					't1': '11:11',
					'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
					'r1': '6903', 'd1': 'ежедневно',
				},
				{
					'title': 'Рябиновка',
					'bullet_type': 'def',
					't1': '11:15',
					'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
					'r1': '6903', 'd1': 'ежедневно',
				},
				{
					'title': 'Каштановка',
					'bullet_type': 'def',
					't1': '11:20',
					'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
					'r1': '6903', 'd1': 'ежедневно',
				},
				{
					'title': 'Муромское',
					'bullet_type': 'def',
					't1': '11:24',
					'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
					'r1': '6903', 'd1': 'ежедневно',
				},
				{
					'title': 'Сосновка',
					'bullet_type': 'def',
					't1': '11:29',
					'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
					'r1': '6903', 'd1': 'ежедневно',
				},
				{
					'title': 'Зеленоградск-новый',
					'bullet_type': 'def',
					't1': '11:49',
					'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
					'r1': '6903', 'd1': 'ежедневно',
				},
				{
					'title': 'Малиновка',
					'bullet_type': 'def',
					't1': '11:53',
					'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
					'r1': '6903', 'd1': 'ежедневно',
				},
				{
					'title': 'Сокольники-1',
					'bullet_type': 'def',
					't1': '11:56',
					'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
					'r1': '6903', 'd1': 'ежедневно',
				},
				{
					'title': 'Сокольники-2',
					'bullet_type': 'def',
					't1': '11:59',
					'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
					'r1': '6903', 'd1': 'ежедневно',
				},
				{
					'title': 'Рощино',
					'bullet_type': 'def',
					't1': '12:03',
					'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
					'r1': '6903', 'd1': 'ежедневно',
				},
				{
					'title': 'Куликово',
					'bullet_type': 'def',
					't1': '12:06',
					'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
					'r1': '6903', 'd1': 'ежедневно',
				},
				{
					'title': 'Пионерский Курорт',
					'bullet_type': 'def start',
					't1': '12:13',
					'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
					'r1': '6903', 'd1': 'ежедневно',
				},
				],
				back: [
					{
						'title': 'Пионерский Курорт',
						'bullet_type': 'def start',
						't1': '06:05', 'r1': '6900', 'd1': 'по будням',
						'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
					},
					{
						'title': 'Куликово',
						'bullet_type': 'def',
						't1': '06:13', 'r1': '6900', 'd1': 'по будням',
						'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
					},
					{
						'title': 'Рощино',
						'bullet_type': 'def ',
						't1': '06:16', 'r1': '6900', 'd1': 'по будням',
						'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
					},
					{
						'title': 'Сокольники-2',
						'bullet_type': 'def ',
						't1': '06:20', 'r1': '6900', 'd1': 'по будням',
						'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
					},
					{
						'title': 'Сокольники-1',
						'bullet_type': 'def ',
						't1': '06:23', 'r1': '6900', 'd1': 'по будням',
						'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
					},
					{
						'title': 'Малиновка',
						'bullet_type': 'def ',
						't1': '06:26', 'r1': '6900', 'd1': 'по будням',
						'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
					},
					{
						'title': 'Зеленоградск-новый',
						'bullet_type': 'def ',
						't1': '06:45', 'r1': '6900', 'd1': 'по будням',
						'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
					},
					{
						'title': 'Сосновка',
						'bullet_type': 'def ',
						't1': '06:51', 'r1': '6900', 'd1': 'по будням',
						'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
					},
					{
						'title': 'Муромское',
						'bullet_type': 'def ',
						't1': '06:55', 'r1': '6900', 'd1': 'по будням',
						'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
					},
					{
						'title': 'Каштановка',
						'bullet_type': 'def ',
						't1': '06:59', 'r1': '6900', 'd1': 'по будням',
						'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
					},
					{
						'title': 'Рябиновка',
						'bullet_type': 'def ',
						't1': '07:04', 'r1': '6900', 'd1': 'по будням',
						'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
					},
					{
						'title': 'о.п. 7 км',
						'bullet_type': 'def ',
						't1': '07:08', 'r1': '6900', 'd1': 'по будням',
						'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
					},
					{
						'title': 'Кутузово-Новое',
						'bullet_type': 'def ',
						't1': '07:15', 'r1': '6900', 'd1': 'по будням',
						'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
					},
					{
						'title': 'Калининград-Северный',
						'bullet_type': 'def',
						't1': '07:22', 'r1': '6900', 'd1': 'по будням',
						'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
					},
					{
						'title': 'Калининград-Южный',
						'bullet_type': 'def start',
						't1': '07:28', 'r1': '6900', 'd1': 'по будням',
						'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow',
					}
				]
			},
			{
				'title': 'Советск',
				'en': 'Sovetsk',
				info: 'Через Полесск, Славск',
				city: 'Калининград',
				time: '2:13', dist: '125', cost: '214',
				station: [{
					'title': 'Калининград Южный',
					'bullet_type': 'def start',
					't1': '18:20', 'r1': '6385', 'd1': 'кроме Сб',
					'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
				},
				{
					'title': 'Калининград Северный',
					'bullet_type': 'def',
					't1': '18:29', 'r1': '6385', 'd1': 'кроме Сб',
					'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
				},
				{
					'title': 'Кутузово-Новое',
					'bullet_type': 'def',
					't1': '18:35', 'r1': '6385', 'd1': 'кроме Сб',
					'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
				},
				{
					'title': 'Гурьевск-центральный ',
					'bullet_type': 'def',
					't1': '18:42', 'r1': '6385', 'd1': 'кроме Сб',
					'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
				},
				{
					'title': 'Гурьевск-новый',
					'bullet_type': 'def',
					't1': '18:47', 'r1': '6385', 'd1': 'кроме Сб',
					'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
				},
				{
					'title': 'Баевка-1 ',
					'bullet_type': 'disable',
					'r1': '6385', 'd1': 'кроме Сб',
					'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
				},
				{
					'title': 'Баевка-2 ',
					'bullet_type': 'def',
					't1': '18:58', 'r1': '6385', 'd1': 'кроме Сб',
					'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
				},
				{
					'title': 'Добрино ',
					'bullet_type': 'def',
					't1': '19:03', 'r1': '6385', 'd1': 'кроме Сб',
					'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
				},
				{
					'title': 'Славянское',
					'bullet_type': 'def',
					't1': '19:11', 'r1': '6385', 'd1': 'кроме Сб',
					'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
				},
				{
					'title': 'Полесск',
					'bullet_type': 'def',
					't1': '19:20', 'r1': '6385', 'd1': 'кроме Сб',
					'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
				},
				{
					'title': 'Шолохово',
					'bullet_type': 'def',
					't1': '19:29', 'r1': '6385', 'd1': 'кроме Сб',
					'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
				},
				{
					'title': 'Петино',
					'bullet_type': 'def',
					't1': '19:34', 'r1': '6385', 'd1': 'кроме Сб',
					'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
				},
				{
					'title': 'Богатово',
					'bullet_type': 'def',
					't1': '19:40', 'r1': '6385', 'd1': 'кроме Сб',
					'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
				},
				{
					'title': 'Залесье',
					'bullet_type': 'def',
					't1': '19:49', 'r1': '6385', 'd1': 'кроме Сб',
					'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
				},
				{
					'title': 'Большаково',
					'bullet_type': 'def',
					't1': '19:57', 'r1': '6385', 'd1': 'кроме Сб',
					'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
				},
				{
					'title': 'Славск',
					'bullet_type': 'def',
					't1': '20:11', 'r1': '6385', 'd1': 'кроме Сб',
					'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
				},
				{
					'title': 'Щегловка',
					'bullet_type': 'def',
					't1': '20:15', 'r1': '6385', 'd1': 'кроме Сб',
					'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
				},
				{
					'title': 'Ржевское',
					'bullet_type': 'def',
					't1': '20:21', 'r1': '6385', 'd1': 'кроме Сб',
					'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
				},
				{
					'title': '119 км',
					'bullet_type': 'disable',
					'r1': '6385', 'd1': 'кроме Сб',
					'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
				},
				{
					'title': 'Советск',
					'bullet_type': 'def start',
					't1': '20:33', 'r1': '6385', 'd1': 'кроме Сб',
					'ok2': 'noRow', 'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
				}],
				back: [{
					'title': 'Советск',
					'bullet_type': 'def start',
					't1': '06:29',
					't2': '18:01',
					'r1': '6381', 'd1': 'кроме Вс',
					'r2': '6387', 'd2': 'только Вс',
					'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
				},
				{
					'title': '119 км',
					'bullet_type': 'disable',


					'r1': '6381', 'd1': 'кроме Вс',
					'r2': '6387', 'd2': 'только Вс',
					'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
				},
				{
					'title': 'Ржевское',
					'bullet_type': 'def',
					't1': '06:44',
					't2': '18:16',
					'r1': '6381', 'd1': 'кроме Вс',
					'r2': '6387', 'd2': 'только Вс',
					'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
				},
				{
					'title': 'Щегловка',
					'bullet_type': 'def',
					't1': '06:50',
					't2': '18:22',
					'r1': '6381', 'd1': 'кроме Вс',
					'r2': '6387', 'd2': 'только Вс',
					'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
				},
				{
					'title': 'Славск',
					'bullet_type': 'def',
					't1': '06:55',
					't2': '18:27',
					'r1': '6381', 'd1': 'кроме Вс',
					'r2': '6387', 'd2': 'только Вс',
					'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
				},
				{
					'title': 'Большаково',
					'bullet_type': 'def',
					't1': '07:09',
					't2': '18:41',
					'r1': '6381', 'd1': 'кроме Вс',
					'r2': '6387', 'd2': 'только Вс',
					'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
				},
				{
					'title': 'Залесье',
					'bullet_type': 'def',
					't1': '07:17',
					't2': '18:51',
					'r1': '6381', 'd1': 'кроме Вс',
					'r2': '6387', 'd2': 'только Вс',
					'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
				},
				{
					'title': 'Богатово',
					'bullet_type': 'def',
					't1': '07:26',
					't2': '19:00',
					'r1': '6381', 'd1': 'кроме Вс',
					'r2': '6387', 'd2': 'только Вс',
					'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
				},
				{
					'title': 'Петино',
					'bullet_type': 'def',
					't1': '07:31',
					't2': '19:05',
					'r1': '6381', 'd1': 'кроме Вс',
					'r2': '6387', 'd2': 'только Вс',
					'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
				},
				{
					'title': 'Шолохово',
					'bullet_type': 'def',
					't1': '07:36',
					't2': '19:10',
					'r1': '6381', 'd1': 'кроме Вс',
					'r2': '6387', 'd2': 'только Вс',
					'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
				},
				{
					'title': 'Полесск',
					'bullet_type': 'def',
					't1': '07:45',
					't2': '19:21',
					'r1': '6381', 'd1': 'кроме Вс',
					'r2': '6387', 'd2': 'только Вс',
					'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
				},
				{
					'title': 'Славянское',
					'bullet_type': 'def',
					't1': '07:53',
					't2': '19:31',
					'r1': '6381', 'd1': 'кроме Вс',
					'r2': '6387', 'd2': 'только Вс',
					'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
				},
				{
					'title': 'Добрино',
					'bullet_type': 'def',
					't1': '08:01',
					't2': '19:40',
					'r1': '6381', 'd1': 'кроме Вс',
					'r2': '6387', 'd2': 'только Вс',
					'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
				},
				{
					'title': 'Баевка-2',
					'bullet_type': 'def',
					't1': '08:06',
					't2': '19:45',
					'r1': '6381', 'd1': 'кроме Вс',
					'r2': '6387', 'd2': 'только Вс',
					'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
				},
				{
					'title': 'Баевка-1',
					'bullet_type': 'disable',

					'r1': '6381', 'd1': 'кроме Вс',
					'r2': '6387', 'd2': 'только Вс',
					'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
				},
				{
					'title': 'Гурьевск-новый',
					'bullet_type': 'def',
					't1': '08:18',
					't2': '19:57',
					'r1': '6381', 'd1': 'кроме Вс',
					'r2': '6387', 'd2': 'только Вс',
					'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
				},
				{
					'title': 'Гурьевск-центральный',
					'bullet_type': 'var',
					't1': '08:24',
					't2': '20:02',
					'r1': '6381', 'd1': 'кроме Вс',
					'r2': '6387', 'd2': 'только Вс',
					'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
				},
				{
					'title': 'Кутузово-Новое',
					'bullet_type': 'def',
					't1': '08:31',
					't2': '20:12',
					'r1': '6381', 'd1': 'кроме Вс',
					'r2': '6387', 'd2': 'только Вс',
					'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
				},
				{
					'title': 'Калининград Северный',
					'bullet_type': 'def',
					't1': '08:39',
					't2': '20:19',
					'r1': '6381', 'd1': 'кроме Вс',
					'r2': '6387', 'd2': 'только Вс',
					'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
				},
				{
					'title': 'Калининград Южный',
					'bullet_type': 'def start',
					't1': '08:46',
					't2': '20:25',
					'r1': '6381', 'd1': 'кроме Вс',
					'r2': '6387', 'd2': 'только Вс',
					'ok3': 'noRow', 'ok4': 'noRow', 'ok5': 'noRow', 'ok6': 'noRow', 'ok7': 'noRow'
				}]
			},
		]

		// End Trains


		// Южный вокзал
		this.items = [
			{
				'title': 'Багратионовск',
				'en': 'Bagrationovsk',
				'description': 'Чехово, Тишино, Березовка',
				time: '1:05', dist: '49', cost: '84',
				'workday': "07:20 12:15 15:30",
				'workday2': "08:25 13:20 16:45",
				'workday3': "09:15 13:50 17:30",
				'workday4': "10:20 14:55 18:40",
				// station:'',
				'hollyday': "07:20 12:15 15:30",
				'hollyday2': "08:25 13:20 16:45",
				'hollyday3': "09:15 13:50 17:30",
				'hollyday4': "10:20 14:55 18:40",
				'icon': 'bus', 'map': '', city: 'Калининград',
				'img': 'bgrt',
				'numb': '121'
			}, {
				'title': 'Багратионовск',
				'en': 'Bagrationovsk',
				'description': 'Нивенское, Славяновка',
				time: '1:20', dist: '39', cost: '90',
				'workday': "06:15 09:10 12:40 17:55",
				'workday2': "07:30 10:29 14:00 19:15",
				'workday3': "07:40 10:55 14:10 19:25",
				'workday4': "09:00 12:15 15:29 20:45",
				// station:'',
				'hollyday': " 06:15 09:10 12:40 17:55",
				'hollyday2': "07:30 10:29 14:00 19:15",
				'hollyday3': "07:40 10:55 14:10 19:25",
				'hollyday4': "09:00 12:15 15:29 20:45",
				'icon': 'bus', 'map': '', city: 'Калининград',
				'img': 'bgrt',
				'numb': '137'
			}, {
				'title': 'Багратионовск',
				'en': 'Bagrationovsk',
				'description': 'Владимирово',
				time: '1:15', dist: '39', cost: '108',
				'workday': "06:25 08:20 10:00 11:55 14:00 16:05 17:40 19:20",
				'workday2': "07:35 09:35 11:15 13:10 15:15 17:20 18:55 20:35",
				'workday3': "06:40 08:10 10:05 11:55 13:30 15:35 17:30 19:00 21:05",
				'workday4': "07:56 09:26 11:20 13:11 14:46 16:51 18:41 20:16 22:10",
				// station:'',
				'hollyday': "06:25 10:00 14:00 17:40",
				'hollyday2': "07:35 11:15 15:15 18:55",
				'hollyday3': "08:10 11:55 15:35 19:00",
				'hollyday4': "09:26 13:11 16:51 20:16",
				'icon': 'bus', 'map': '', city: 'Калининград',
				'img': 'bgrt',
				'numb': '148'
			}, {
				'title': 'Багратионовск',
				'en': 'Bagrationovsk',
				'description': 'Стрельня, Долгоруково',
				time: '1:20', dist: '39', cost: '90',
				'workday': "08:00 *08:50 *10:50 13:00 *14:50 16:40 *18:00 *19:45",
				'workday2': "09:18 09:48 11:48 14:18 15:48 17:58 18:57 20:49",
				'workday3': "06:15 *09:48 10:30 *12:20 14:35 *16:10 18:10 *18:57 *20:55",
				'workday4': "07:32 10:40 11:37 13:20 15:52 17:10 19:27 19:56 21:59",
				// station:'',
				'hollyday': "08:35 13:00 16:15 *19:25",
				'hollyday2': "09:53 14:15 17:33 20:28",
				'hollyday3': "06:10 10:20 14:30 18:00 *20:30",
				'hollyday4': "07:27 11:37 15:47 19:17 21:34",
				info1: '* : следует до Долгоруково',
				info2: '* : отправляется из Долгоруково',
				info3: '* : следует до Долгоруково',
				info4: '* : отправляется из Долгоруково',
				'icon': 'bus', 'map': '', city: 'Калининград',
				'img': 'bgrt',
				'numb': '191'
			},
			{
				'title': 'Багратионовск · Лесная дача',
				'en': 'Bagrationovsk · Lesnaia dacha',
				'description': 'Нивенское, Багратионовск, Долгоруково',
				time: '1:15', dist: '48', cost: '117',
				'workday': "06:40 07:35 *08:40 *10:35 11:30 *13:45 *14:25 15:10 *17:05 18:30 *20:00 *20:45",
				'workday2': "07:50 08:50 09:39 11:34 12:45 14:44 15:24 16:25 18:04 19:45 20:59 21:44",
				'workday3': "*06:10 *07:15 08:20 09:30 *11:20 *12:45 13:10 *15:20 *16:35 17:10 *18:50 20:05 *21:05 *21:45",
				'workday4': "07:07 08:12 09:33 10:43 12:17 13:42 14:23 16:17 17:32 18:23 19:47 21:18 21:59 22:36",
				// station:'',
				'hollyday': "06:40 07:35 *10:35 11:40 *14:25 15:10 18:30 20:15",
				'hollyday2': "07:50 08:50 11:34 12:55 15:24 16:25 19:45 21:30",
				'hollyday3': "08:20 09:15 *12:15 13:20 *16:35 17:05 20:05 21:30",
				'hollyday4': "09:33 10:28 13:42 14:33 17:32 18:18 21:18 22:37",
				info1: '* : следует до Багратионовска',
				info2: '* : отправляется из Багратионовска',
				info3: '* : следует до Багратионовска',
				info4: '* : отправляется из Багратионовска',
				'icon': 'bus', 'map': '', city: 'Калининград',
				'img': 'bgrt',
				'numb': '113'
			},
			{
				'title': 'Балтийск',
				'en': 'Baltiisk',
				'description': 'Приморск, Кострово, Волочаевское, Взморье',
				time: '1:30', dist: '42', cost: '120',
				'workday': "*06:15 06:20 06:40 07:00 07:15 07:40 08:10 08:40 09:00 09:25 09:50 10:20 10:40 11:00 11:25 11:40 12:05 12:30 13:05 13:30 13:45 14:10 14:40 15:00 15:20 15:45 16:10 16:30 16:55 17:10 17:35 18:05 18:25 18:45 19:15 19:40 20:00 20:30 21:00 21:55",
				'workday2': "07:15 07:50 08:10 08:30 08:45 09:10 09:40 10:10 10:30 10:55 11:20 11:50 12:10 12:30 12:55 13:10 13:35 14:00 14:35 15:00 15:15 15:40 16:10 16:30 16:50 17:15 17:40 18:00 18:25 18:40 19:05 19:35 19:55 20:10 20:40 21:05 21:25 21:55 22:25 23:20",
				'workday3': "06:15 06:45 07:05 07:30 08:00 08:20 08:40 09:00 09:20 09:45 10:20 10:45 11:05 11:30 11:55 12:15 12:40 13:05 13:25 13:50 14:10 14:45 15:10 15:25 15:50 16:20 16:40 17:00 17:25 17:50 18:10 18:35 18:50 19:15 19:45 20:10 20:35 21:00 21:30 22:00",
				'workday4': "07:40 08:10 08:30 08:55 09:25 09:50 10:10 10:30 10:50 11:15 11:50 12:15 12:35 13:00 13:25 14:10 14:35 14:55 15:20 15:40 16:15 16:40 16:55 17:20 17:50 18:10 18:30 18:55 19:20 19:40 20:05 20:20 20:45 21:15 21:40 22:00 22:25 22:55 23:00*",
				// station:'',
				'hollyday': "*06:15 06:20 06:40 07:00 07:15 07:40 08:10 08:40 09:00 09:25 09:50 10:20 10:40 11:00 11:25 11:40 12:05 12:30 13:05 13:30 13:45 14:10 14:40 15:00 15:20 15:45 16:10 16:30 16:55 17:10 17:35 18:05 18:25 18:45 19:15 19:40 20:00 20:30 21:00 21:55",
				'hollyday2': "07:15 07:50 08:10 08:30 08:45 09:10 09:40 10:10 10:30 10:55 11:20 11:50 12:10 12:30 12:55 13:10 13:35 14:00 14:35 15:00 15:15 15:40 16:10 16:30 16:50 17:15 17:40 18:00 18:25 18:40 19:05 19:35 19:55 20:10 20:40 21:05 21:25 21:55 22:25 23:20",
				'hollyday3': "06:15 06:45 07:05 07:30 08:00 08:20 08:40 09:00 09:20 09:45 10:20 10:45 11:05 11:30 11:55 12:15 12:40 13:05 13:25 13:50 14:10 14:45 15:10 15:25 15:50 16:20 16:40 17:00 17:25 17:50 18:10 18:35 18:50 19:15 19:45 20:10 20:35 21:00 21:30 22:00",
				'hollyday4': "07:40 08:10 08:30 08:55 09:25 09:50 10:10 10:30 10:50 11:15 11:50 12:15 12:35 13:00 13:25 14:10 14:35 14:55 15:20 15:40 16:15 16:40 16:55 17:20 17:50 18:10 18:30 18:55 19:20 19:40 20:05 20:20 20:45 21:15 21:40 22:00 22:25 22:55 23:00*",
				info1: '* : отправляется от ул.Театральная',
				info4: '* : следует до ул.Театральная',
				'icon': 'bus', 'map': '', city: 'Калининград',
				'img': 'blt',
				'numb': '107',
			},
			{
				'title': 'Балтийск',
				'en': 'Baltiisk',
				'description': 'Волочаевское, Взморье, Ижевское, Приморск',
				time: '1:00', dist: '42', cost: '110',
				'workday': "09:00",
				'workday2': "22:40",
				'workday3': "10:00",
				'workday4': "21:25",
				// station:'',
				'hollyday': "07:25",
				'hollyday2': "22:40",
				'hollyday3': "06:00",
				'hollyday4': "21:25",
				'icon': 'bus', 'map': '', city: 'Калининград',
				info1: 'Периодичность 25 мин',
				info2: 'Периодичность 25 мин',
				info3: 'по субботам периодичность 35 мин',
				info4: 'по воскресеньям периодичность 25 мин',
				'img': '',
				'numb': '207э'
			},
			{
				'title': 'Большая поляна',
				'en': 'Bolshaya polyana',
				'description': 'Низовье, Гвардейск, Знаменск',
				time: '1:32', dist: '45', cost: '130',
				'workday': "11:45 16:15 20:15",
				'workday2': "13:22 17:51 21:47",
				'workday3': "08:04 13:24 17:53",
				'workday4': "09:49 15:17 19:40",
				// station:'',
				'hollyday': "11:45 16:15 20:15",
				'hollyday2': "13:22 17:51 21:47",
				'hollyday3': "08:04 13:24 17:53",
				'hollyday4': "09:49 15:17 19:40",
				'icon': 'bus', 'map': '', city: 'Калининград',
				'img': '',
				'numb': '156'
			},
			{
				'title': 'Большое Исаково',
				'en': 'Bolshoe Isakovo',
				'description': 'Васильково ',
				time: '1:00', dist: '11', cost: '28',
				'workday': "*06:55 07:35 08:05 08:40 09:15 10:00 10:35 12:45 15:25 16:00 16:35 *17:35 18:10 18:45 19:15 19:45 20:20 21:05",
				'workday2': "08:00 08:30 09:00 09:35 10:13 11:00 11:35 13:45 16:25 17:00 17:35 18:35 19:10 19:45 20:10 20:45 21:20 22:00",
				'workday3': "06:30 *07:04 07:36 08:10 08:40 09:10 11:40 16:30 17:05 17:40 18:40 19:15 20:11 20:46 21:25",
				'workday4': "07:25 07:59 08:30 09:05 09:35 10:09 12:40 17:30 18:05 18:40 19:40 20:15 21:04 21:30* 22:15*",
				info1: '* : через Малое Исаково',
				info2: '* : следует только до: п.Васильково',
				// station:'',
				'hollyday': "07:20 08:20 09:20 10:50 11:50 12:50 13:50 14:50 15:50 16:50 17:50 19:15 20:20 21:10",
				'hollyday2': "08:15 09:15 10:15 11:45 12:45 13:45 14:45 15:45 16:45 17:45 18:45 20:10 21:15 22:00",
				'hollyday3': "06:20 07:20 08:20 09:20 10:20 11:50 12:50 13:50 14:50 15:50 16:50 17:50 18:50 20:15 21:15 22:00",
				'hollyday4': "07:15 08:15 09:15 10:20 11:20 12:45 13:45 14:45 15:45 16:45 17:45 18:50 19:50 21:05 21:30* 22:15*",
				info4: '* : следует только до: п.Васильково',
				'icon': 'bus', 'map': '', city: 'Калининград',
				'img': '',
				'numb': '159'
			},
			{
				'title': 'Гвардейск',
				'en': 'Gvardeisk',
				'description': 'Озерки, Пруды',
				time: '1:14', dist: '26', cost: '98',
				'workday': "06:20 07:40 08:40 09:30 10:50 12:25 13:30 14:40 16:05 17:20 18:35 19:40 20:40",
				'workday2': "07:25 08:54 09:54 10:44 12:04 13:39 14:44 15:54 17:19 18:34 19:49 20:54 21:54",
				'workday3': "06:00 06:30 07:40 09:15 10:30 11:30 12:30 14:00 15:30 17:00 18:00 19:00 20:00 21:00",
				'workday4': "07:14 07:44 08:54 10:29 11:44 12:44 13:44 15:14 16:44 18:14 19:14 20:14 21:14 22:14",
				// station:'',
				'hollyday': "06:20 07:40 09:10 10:50 12:25 14:40 16:05 18:35 20:00",
				'hollyday2': "07:25 08:54 10:24 12:04 13:39 15:54 17:19 19:49 21:14",
				'hollyday3': "06:00 07:40 09:15 10:40 12:30 14:20 17:00 18:20 20:00",
				'hollyday4': "07:14 08:54 10:29 11:54 13:44 15:34 18:14 19:34 21:14",
				'icon': 'bus', 'map': '', city: 'Калининград',
				'img': '',
				'numb': '111'
			}, {
				'title': 'Гвардейск',
				'en': 'Gvardeisk',
				'description': 'Озерки, Пруды',
				time: '1:05', dist: '26', cost: '75',
				'workday': "06:25 07:50 08:20 09:25 10:30 11:25 12:15 13:30 14:50 15:20 16:45 17:50 19:20 20:00 20:50",
				'workday2': "07:30 08:50 09:25 10:30 11:35 12:30 13:20 14:35 15:55 16:25 17:50 18:55 20:20 21:20 21:50",
				'workday3': "06:25 06:55 07:50 09:00 09:35 10:45 11:40 13:00 13:45 14:45 16:10 17:15 18:20 19:15 20:30 21:20",
				'workday4': "07:30 08:00 08:55 10:05 10:40 12:00 13:20 14:05 14:50 15:50 17:15 18:20 19:25 20:20 21:30 22:20",
				// station:'',
				'hollyday': "06:25 07:50 08:20 09:25 10:30 11:25 12:15 13:30 14:50 15:20 16:45 17:50 19:20 20:00 20:50",
				'hollyday2': "07:30 08:50 09:25 10:30 11:35 12:30 13:20 14:35 15:55 16:25 17:50 18:55 20:20 21:20 21:50",
				'hollyday3': "*06:25 *06:55 07:50 09:00 09:35 10:45 11:40 13:00 13:45 14:45 16:10 17:15 18:20 19:15 20:30 21:20",
				'hollyday4': "07:30 08:00 08:55 10:05 10:40 12:00 13:20 14:05 14:50 15:50 17:15 18:20 19:25 20:20 21:30 22:20",
				'icon': 'bus', 'map': '', city: 'Калининград',
				info3: '*: рейс выполняется по рабочим дням и субботам',
				'img': '',
				'numb': '211э'
			},
			{
				'title': 'Гусев',
				'en': 'Gusev',
				'description': 'Гвардейск, Черняховск',
				time: '2:20', dist: '108', cost: '170',
				'workday': "17:35 21:40",
				'workday2': "19:55 00:05",
				'workday3': "05:00 17:10",
				'workday4': "07:30 19:35",
				// station:'',
				'hollyday': "17:35 21:40",
				'hollyday2': "19:55 00:05",
				'hollyday3': "05:00 17:10",
				'hollyday4': "07:30 19:35",
				'icon': 'bus', 'map': '', city: 'Калининград',
				'img': '',
				'numb': '580',
			},
			{
				'title': 'Гусев',
				'en': 'Gusev',
				'description': '',
				time: '2:10', dist: '108', cost: '170',
				'workday': "19:50",
				'workday2': "22:18",
				'workday3': "14:00",
				'workday4': "16:27",
				// station:'',
				'hollyday': "19:50",
				'hollyday2': "22:18",
				'hollyday3': "14:00",
				'hollyday4': "16:27",
				'icon': 'bus', 'map': '', city: 'Калининград',
				'img': '',
				'numb': '581'
			},
			{
				'title': 'Гусев',
				'en': 'Gusev',
				'description': 'Черняховск',
				time: '2:10', dist: '108', cost: '180',
				'workday': "08:25 08:50 09:25 10:20 10:50 11:20 12:10 12:30 *12:55 13:25 13:50 14:40 15:05 15:30 16:45 17:10 18:00 18:25 19:15 19:30 20:30 **21:00",
				'workday2': "10:35 10:55 11:35 12:25 12:55 13:25 14:10 14:35 15:00 15:30 15:55 16:45 17:10 17:35 18:50 19:15 20:03 20:30 21:18 21:30 22:35 23:05",
				'workday3': "05:25 05:50 06:20 06:40 07:00 07:50 08:20 09:10 10:00 10:25 11:15 11:35 12:05 12:30 12:55 13:45 14:25 15:00 15:25 16:15 17:45 19:15",
				'workday4': "07:28 07:53 08:25 08:43 09:08 09:58 10:23 11:13 12:03 12:28 13:18 13:40 14:08 14:33 14:58 15:48 16:26 17:03 17:28 18:18 19:50 21:20",
				// station:'',
				'hollyday': "08:25 08:50 09:25 10:20 10:50 11:20 12:10 12:30 12:55 13:25 13:50 14:40 15:05 15:30 16:45 17:10 18:00 18:25 19:15 19:30 20:30 21:00",
				'hollyday2': "10:35 10:55 11:35 12:25 12:55 13:25 14:10 14:35 15:00 15:30 15:55 16:45 17:10 17:35 18:50 19:15 20:03 20:30 21:18 21:30 22:35 23:05",
				'hollyday3': "05:25 05:50 06:20 06:40 07:00 07:50 08:20 09:10 10:00 10:25 11:15 11:35 12:05 12:30 12:55 13:45 14:25 15:00 15:25 16:15 17:45 18:00 19:15",
				'hollyday4': "07:28 07:53 08:25 08:43 09:08 09:58 10:23 11:13 12:03 12:28 13:18 13:40 14:08 14:33 14:58 15:48 16:26 17:03 17:28 18:18 19:50 20:03 21:20",
				'icon': 'bus', 'map': '', city: 'Калининград',
				info1: '* : рейс выполняется с 01.09. по 01.05',
				info2: '** : через Гвардейск',
				'img': '',
				'numb': '680э'
			},
			{
				'title': 'Гурьевск · Константиновка',
				'en': 'Gurevsk · Konstantinovka',
				'description': 'Ижевское, Взморье',
				time: '1:05', dist: '19', cost: '33',
				'workday': "06:41 22:03",
				'workday2': "07:46 23:02",
				'workday3': "06:30 20:55",
				'workday4': "07:30 22:00",
				info1: 'Периодичность 20-25 мин',
				info2: 'Периодичность 20-25 мин',
				info3: 'Периодичность 20-25 мин',
				info4: 'Периодичность 20-25 мин',
				// station:'',
				'hollyday': "07:21 21:40",
				'hollyday2': "08:26 22:23",
				'hollyday3': "06:55 20:10",
				'hollyday4': "07:50 21:05",
				'icon': 'bus', 'map': '', city: 'Калининград',
				'img': '',
				'numb': '103'
			},
			{
				'title': 'Ярославское',
				'en': 'Jaroslavskoe',
				'description': 'Гурьевск',
				time: '1:25', dist: '42', cost: '45',
				'workday': "08:24 11:05 14:03 16:49 19:41",
				'workday2': "09:35 12:16 15:10 18:00 20:52",
				'workday3': "06:52 09:45 12:26 15:14 18:13",
				'workday4': "07:58 10:54 13:32 16:21 19:18",
				// info1:'Периодичность 20-25 мин',
				info3: '* до Константиновки',
				// station:'',
				'hollyday': "09:03 11:28 14:02 16:28 19:25 22:00",
				'hollyday2': "10:00 12:30 15:03 17:30 20:27 22:50*",
				'hollyday3': "07:52 10:17 12:43 15:17 17:48 20:28",
				'hollyday4': "08:43 11:18 13:42 16:12 18:50 21:28",
				'icon': 'bus', 'map': '', city: 'Калининград',
				'img': '',
				'numb': '104'
			},
			{
				'title': 'Добрино',
				'en': 'Dobrino',
				'description': 'Заозерье, Доброе',
				time: '1:20', dist: '33', cost: '80',
				'workday': "06:00 07:00 08:00 09:00 10:30 11:30 13:00 14:30 16:00 17:10 18:00 19:20 20:40",
				'workday2': "07:15 08:24 09:20 10:28 11:58 13:04 14:32 15:59 17:34 18:39 19:29 20:51 21:54",
				'workday3': "06:40 07:20 08:30 09:30 10:30 12:00 13:30 15:00 16:00 17:40 18:40 19:30",
				'workday4': "07:48 08:45 09:58 10:58 11:58 13:32 14:58 16:28 17:24 19:08 20:08 20:34",
				// station:'',
				'hollyday': "06:00 09:00 13:00 17:10 20:40",
				'hollyday2': "07:15 10:28 14:32 18:39 21:54",
				'hollyday3': "07:20 10:30 15:00 18:40 ",
				'hollyday4': "08:45 11:58 16:28 20:08",
				'icon': 'bus', 'map': '', city: 'Калининград',
				'img': '',
				'numb': '112'
			},
			{
				'title': 'Донское',
				'en': 'Donskoe',
				'description': 'Переславское, Светлогорск, Отрадное',
				time: '1:30', dist: '106', cost: '114',
				'workday': "05:39 05:40 07:50 10:10 12:10 14:10 16:10 18:10 20:10",
				'workday2': "05:57 07:15 09:30 11:48 13:50 15:48 17:50 19:50 21:50",
				'workday3': "06:00 07:25 10:00 12:05 14:00 16:05 18:00 20:05 22:00*",
				'workday4': "07:30 08:55 11:30 13:35 15:30 17:35 19:30 21:35 22:30",
				// station:'',
				'hollyday': "05:39 05:40 07:50 10:10 12:10 14:10 16:10 18:10 20:10",
				'hollyday2': "05:57 07:15 09:30 11:48 13:50 15:48 17:50 19:50 21:50",
				'hollyday3': "06:00 07:25 10:00 12:05 14:00 16:05 18:00 20:05 22:00*",
				'hollyday4': "07:30 08:55 11:30 13:35 15:30 17:35 19:30 21:35 22:30",
				info2: '* : следует только до Светлогорска',
				info4: '* : следует только до Светлогорска',
				'icon': 'bus', 'map': '', city: 'Калининград',
				'img': '',
				'numb': '125',
			},
			{
				'title': 'Железнодорожный',
				'en': 'Zheleznodorozhnyi',
				'description': 'Чехово, Тишино, Правдинск',
				time: '2:15', dist: '85', cost: '153',
				'workday': "09:30 12:50 15:15 17:15",
				'workday2': "11:35 14:50 17:15 19:15",
				'workday3': "06:00 11:40 15:00 18:10",
				'workday4': "07:50 13:40 17:05 20:05",
				// station:'',
				'hollyday': "09:30 12:50 15:15 17:15",
				'hollyday2': "11:35 14:50 17:15 19:15",
				'hollyday3': "06:00 11:40 15:00 18:10",
				'hollyday4': "07:50 13:40 17:05 20:05",
				'icon': 'bus', 'map': '', city: 'Калининград',
				'img': '',
				'numb': '509'
			},
			{
				'title': 'Железнодорожный',
				'en': 'Zheleznodorozhnyi',
				'description': 'Большая Поляна',
				time: '2:15', dist: '85', cost: '164',
				'workday': "07:00 13:50",
				'workday2': "09:07 15:59",
				'workday3': "10:30 16:20",
				'workday4': "13:16 18:56",
				// station:'',
				'hollyday': "07:00 13:50",
				'hollyday2': "09:07 15:59",
				'hollyday3': "10:30 16:20",
				'hollyday4': "13:16 18:56",
				'icon': 'bus', 'map': '', city: 'Калининград',
				'img': '',
				'numb': '534'
			},
			{
				'title': 'Заливино',
				'en': 'Zalivino',
				'description': 'Полесск, Гурьевск, Добрино',
				time: '1:52', dist: '48', cost: '124',
				'workday': "05:25* 09:00 13:00 17:50",
				'workday2': "06:37 10:37 14:38 19:26",
				'workday3': "06:40 10:55 14:55 19:30",
				'workday4': "08:14 12:35 16:34 20:55",
				// station:'',
				'hollyday': "05:25* 09:00 13:00 17:50",
				'hollyday2': "06:37 10:37 14:38 19:26",
				'hollyday3': "06:40 10:55 14:55 19:30",
				'hollyday4': "08:14 12:35 16:34 20:55",
				info1: '* : от Центрального Рынка',
				info3: '* : от Центрального Рынка',
				'icon': 'bus', 'map': '', city: 'Калининград',
				'img': '',
				'numb': '152'
			},
			{
				'title': 'Заливное',
				'en': 'Zalivnoe',
				'description': 'Гурьевск, Маршальское, Рожково',
				time: '1:30', dist: '32', cost: '87',
				'workday': "05:30* 10:20 14:15 19:00",
				'workday2': "06:32 11:42 15:38 20:40",
				'workday3': "06:35 12:00 15:45 20:55",
				'workday4': "08:15 13:40 17:09 22:25",
				// station:'',
				'hollyday': "05:30* 10:20 14:15 19:00",
				'hollyday2': "06:32 11:42 15:38 20:40",
				'hollyday3': "06:35 12:00 15:45 20:55",
				'hollyday4': "08:15 13:40 17:09 22:25",
				info1: '* : от Центрального Рынка',
				info3: '* : от Центрального Рынка',
				'icon': 'bus', 'map': '', city: 'Калининград',
				'img': '',
				'numb': '127'
			},
			{
				'title': 'Зеленоградск',
				'en': 'Zelenogradsk',
				'description': 'Орловка, Муромское, Моршанское',
				time: '1:00', dist: '32', cost: '75',
				'workday': "07:15 07:45 10:40 12:45 14:15 16:15 18:15 19:15",
				'workday2': "08:16 08:55 11:41 13:55 15:16 17:25 19:16 20:25",
				'workday3': "06:50* 08:45 09:45 12:15 14:45 16:15 17:40 19:30 20:40",
				'workday4': "07:36 09:41 10:55 13:11 15:55 17:11 18:52 20:26 21:50",
				// station:'',
				info2: '* : из пос. Моршанское',
				info4: '* : из пос. Моршанское',
				'hollyday': "07:15 07:45 10:40 12:45 14:15 16:15 18:15 19:15",
				'hollyday2': "08:16 08:55 11:41 13:55 15:16 17:25 19:16 20:25",
				'hollyday3': "06:50* 08:45 09:45 12:15 14:45 16:15 17:40 19:30 20:40",
				'hollyday4': "07:36 09:41 10:55 13:11 15:55 17:11 18:52 20:26 21:50",
				'icon': 'bus', 'map': '', city: 'Калининград',
				'img': 'zelenogradsk',
				'numb': '114'
			},
			{
				'title': 'Зеленоградск',
				'en': 'Zelenogradsk',
				'description': 'пл. Василевского, Сосновка',
				time: '1:20', dist: '32', cost: '84',
				'workday': "06:45 07:10 07:40 08:15 08:45 09:15 09:45 10:15 10:50 11:15 11:45 12:15 12:50 13:15 13:45 14:20 14:45 15:15 15:50 16:20 16:45 17:15 17:45 18:10 18:45 19:10 19:45 20:30",
				'workday2': "07:40 08:10 08:35 09:10 09:40 10:10 10:40 11:10 11:40 12:10 12:40 13:10 13:45 14:10 14:40 15:15 15:40 16:10 16:40 17:15 17:40 18:10 18:40 19:05 19:40 20:05 20:40 21:25",
				'workday3': "07:20 07:50 08:20 08:50 09:20 09:50 10:20 10:50 11:20 11:50 12:20 12:50 13:20 13:50 14:20 14:50 15:20 15:50 16:20 16:50 17:20 17:50 18:20 18:50 19:20 19:50 20:20 20:50 21:50",
				'workday4': "08:20 08:50 09:20 09:50 10:20 10:50 11:20 11:50 12:20 12:50 13:20 13:50 14:20 14:50 15:20 15:50 16:20 16:50 17:20 17:50 18:20 18:45 19:15 19:50 20:20 20:40 21:10 21:40 22:40",
				// station:'',
				'hollyday': "07:40 08:15 08:45 09:15 09:45 10:15 10:50 11:15 11:45 12:15 12:50 13:15 13:45 14:20 14:45 15:15 15:50 16:20 16:45 17:15 17:45 18:10 18:45 19:10 19:45 20:30",
				'hollyday2': "08:35 09:10 09:40 10:10 10:40 11:10 11:40 12:10 12:40 13:10 13:45 14:10 14:40 15:15 15:40 16:10 16:40 17:15 17:40 18:10 18:40 19:05 19:40 20:05 20:40 21:25",
				'hollyday3': "08:20 08:50 09:20 09:50 10:20 10:50 11:20 11:50 12:20 12:50 13:20 13:50 14:20 14:50 15:20 15:50 16:20 16:50 17:20 17:50 18:20 18:50 19:20 19:50 20:20 20:50 21:50",
				'hollyday4': "09:20 09:50 10:20 10:50 11:20 11:50 12:20 12:50 13:20 13:50 14:20 14:50 15:20 15:50 16:20 16:50 17:20 17:50 18:20 18:45 19:15 19:50 20:20 20:40 21:10 21:40 22:40",
				'icon': 'bus', 'map': '', city: 'Калининград',
				'img': 'zelenogradsk',
				'numb': '140',
				station: [
					{ title: 'пл Василевского', tax: '20' },
					{ title: 'пл Победы', tax: '20' },
					{ title: 'ТЦ Аврора', tax: '20' },
					{ title: 'Безымянка', tax: '69' },
					{ title: 'Сосновка', tax: '75' },
					{ title: 'Зеленоградск', tax: '84' }
				]
			},
			{
				'title': 'Зеленоградск',
				'en': 'Zelenogradsk',
				'description': 'Петрово, Сокольники',
				time: '1:20', dist: '32', cost: '85',
				'workday': "06:00 06:30 07:00 07:25 07:55 08:25 08:55 09:25 09:55 10:25 10:55 11:25 11:55 12:25 12:55 13:25 13:55 14:25 14:55 15:25 15:55 16:25 16:55 17:25 17:55 18:25 18:55 19:25 19:55 20:30 20:55 21:30",
				'workday2': "07:10 07:40 08:10 08:40 09:10 09:40 10:10 10:40 11:10 11:40 12:10 12:40 13:10 13:40 14:10 14:40 15:10 15:40 16:10 16:40 17:10 17:40 18:10 18:40 19:10 19:40 20:10 20:40 21:10 21:40 22:10 22:40",
				'workday3': "06:00 06:30 07:00 07:30 08:00 08:30 09:00 09:30 10:00 10:30 11:00 11:30 12:00 12:30 13:00 13:30 14:00 14:30 15:00 15:30 16:00 16:30 17:00 17:30 18:00 18:30 19:00 19:30 20:00 20:30 21:00 21:30 22:20",
				'workday4': "07:07 07:37 08:07 08:37 09:07 09:37 10:07 10:37 11:07 11:37 12:07 12:37 13:07 13:37 14:07 14:37 15:07 15:37 16:07 16:37 17:07 17:37 18:07 18:37 19:07 19:37 20:07 20:37 21:07 21:37 22:04 22:34 23:24",
				// station:'',
				'hollyday': "06:00 06:30 07:00 07:25 07:55 08:25 08:55 09:25 09:55 10:25 10:55 11:25 11:55 12:25 12:55 13:25 13:55 14:25 14:55 15:25 15:55 16:25 16:55 17:25 17:55 18:25 18:55 19:25 19:55 20:30 20:55 21:30",
				'hollyday2': "07:07 07:40 08:07 08:40 09:07 09:40 10:07 10:40 11:07 11:40 12:07 12:40 13:07 13:40 14:07 14:40 15:07 15:40 16:07 16:40 17:07 17:40 18:07 18:40 19:07 19:40 20:07 20:40 21:07 21:40 22:07 22:40",
				'hollyday3': "06:00 06:30 07:00 07:30 08:00 08:30 09:00 09:30 10:00 10:30 11:00 11:30 12:00 12:30 13:00 13:30 14:00 14:30 15:00 15:30 16:00 16:30 17:00 17:30 18:00 18:30 19:00 19:30 20:00 20:30 21:00 21:30 22:20",
				'hollyday4': "07:07 07:37 08:07 08:37 09:07 09:37 10:07 10:37 11:07 11:37 12:07 12:37 13:07 13:37 14:07 14:37 15:07 15:37 16:07 16:37 17:07 17:37 18:07 18:37 19:07 19:37 20:07 20:37 21:07 21:37 22:04 22:34 23:24",
				'icon': 'bus', 'map': '', city: 'Калининград',
				'img': 'zelenogradsk',
				'numb': '141'
			},
			{
				'title': 'Знаменск',
				'en': 'Znamensk',
				'description': 'Гвардейск, Ельники, Ровное',
				time: '1:20', dist: '59', cost: '105',
				'workday': "10:00 13:10 18:40",
				'workday2': "10:59 14:30 20:00",
				'workday3': "08:06 11:05 16:15",
				'workday4': "09:26 12:03 17:35",
				// station:'',
				'hollyday': "10:00 13:10 18:40",
				'hollyday2': "10:59 14:30 20:00",
				'hollyday3': "08:06 11:05 16:15",
				'hollyday4': "09:26 12:03 17:35",
				'icon': 'bus', 'map': '', city: 'Калининград',
				'img': '',
				'numb': '157'
			},
			{
				'title': 'Каширское',
				'en': 'Kashirskoe',
				'description': 'Гурьевск, Лазовское',
				time: '1:25', dist: '32', cost: '73',
				'workday': "06:25 09:52 13:17 17:00 19:55",
				'workday2': "07:25 11:17 14:42 18:25 21:20",
				'workday3': "07:30 11:22 14:52 18:25 21:20*",
				'workday4': "09:05 12:56 16:17 19:45 21:56",
				// station:'',
				'hollyday': "06:25 09:52 13:17 17:00 19:55",
				'hollyday2': "07:25 11:17 14:42 18:25 21:20",
				'hollyday3': "07:30 11:22 14:52 18:25 21:20*",
				'hollyday4': "09:05 12:56 16:17 19:45 21:56",
				'icon': 'bus', 'map': '', city: 'Калининград',
				info2: '* : следует только до Гурьевска',
				info4: '* : следует только до Гурьевска',
				'img': '',
				'numb': '149'
			},
			{
				'title': 'Колосовка',
				'en': 'Kolosovka',
				'description': 'Холмогоровка, Павлинино',
				time: ':40', dist: '23', cost: '43',
				'workday': "07:10* 13:35 18:25*",
				'workday2': "07:32 14:17 18:48",
				'workday3': "07:40* 14:40 19:10*",
				'workday4': "08:21 15:18 19:50",
				// station:'',
				'hollyday': "07:10* 13:35 18:25*",
				'hollyday2': "07:32 14:17 18:48",
				'hollyday3': "07:40* 14:40 19:10*",
				'hollyday4': "08:21 15:18 19:50",
				'icon': 'bus', 'map': '', city: 'Калининград',
				info1: '* : следует только с/до Северного вокзала',
				info3: '* : следует только с/до Северного вокзала',
				'img': '',
				'numb': '123'
			},
			{
				'title': 'Красное',
				'en': 'Krasnoe',
				'description': 'Гурьевск, Добрино, Полесск, Саранское',
				time: '1:46', dist: '66', cost: '159',
				'workday': "06:10 11:40 16:00 21:00*",
				'workday2': "07:46 13:26 17:46 22:20",
				'workday3': "07:51 13:41 18:00 22:30*",
				'workday4': "09:37 15:27 19:46 23:50",
				// station:'',
				'hollyday': "06:10 11:40 16:00 21:00*",
				'hollyday2': "07:46 13:26 17:46 22:20",
				'hollyday3': "07:51 13:41 18:00 22:30*",
				'hollyday4': "09:37 15:27 19:46 23:50",
				'icon': 'bus', 'map': '', city: 'Калининград',
				info1: '* : следует только до п. Саранское',
				info3: '* : следует только до п. Саранское',
				'img': '',
				'numb': '514'
			},
			{
				'title': 'Краснознаменск',
				'en': 'Krasnoznamensk',
				'description': 'Гвардейск, Большаково, Советск, Неман',
				time: '4:20', dist: '175', cost: '324',
				'workday': "06:00 17:20",
				'workday2': "09:55 21:00",
				'workday3': "",
				'workday4': "",
				// station:'',
				'hollyday': "06:00 17:20",
				'hollyday2': "09:55 21:00",
				'hollyday3': "",
				'hollyday4': "",
				'icon': 'bus', 'map': '', city: 'Калининград',
				'img': '',
				'numb': '516'
			},
			{
				'title': 'Краснознаменск',
				'en': 'Krasnoznamensk',
				'description': 'Гвардейск, Черняховск, Гусев',
				time: '4:00', dist: '170', cost: '270',
				'workday': "07:10 15:50",
				'workday2': "11:32 20:12",
				'workday3': "06:20 13:35",
				'workday4': "11:15 18:20",
				// station:'',
				'hollyday': "07:10 15:50",
				'hollyday2': "11:32 20:12",
				'hollyday3': "06:20 13:35",
				'hollyday4': "11:15 18:20",
				'icon': 'bus', 'map': '', city: 'Калининград',
				'img': '',
				'numb': '526'
			},
			{
				'title': 'Люблино · Логвино',
				'en': 'Lublino · Logvino',
				'description': 'Космодемьянский поворот, Люблино, Черепаново',
				time: '1:10', dist: '23', cost: '49',
				'workday': "07:50 *09:20 11:20 *13:00 14:30 *15:50 17:15 *18:30 20:30",
				'workday2': "09:00 10:30 12:30 14:10 15:40 17:00 18:25 19:40 21:40",
				'workday3': "06:30 *07:50 09:10 *10:50 12:40 *14:20 15:50 *17:10 18:50",
				'workday4': "07:40 09:00 10:20 12:00 13:50 15:30 17:00 18:20 20:00",
				// station:'',
				'hollyday': "07:50 *09:20 11:20 *13:00 14:30 *15:50 17:15 *18:30 20:30",
				'hollyday2': "09:00 10:30 12:30 14:10 15:40 17:00 18:25 19:40 21:40",
				'hollyday3': "06:30 *07:50 09:10 *10:50 12:40 *14:20 15:50 *17:10 18:50",
				'hollyday4': "07:40 09:00 10:20 12:00 13:50 15:30 17:00 18:20 20:00",
				'icon': 'bus', 'map': '', city: 'Калининград',
				'img': '',
				'numb': '106'
			},
			{
				'title': 'Люблино · Светлый',
				'en': 'Lublino · Svetlyi',
				'description': 'Чкаловский поворот, Люблино',
				time: '1:20', dist: '34', cost: '75',
				'workday': "08:40 12:10 15:35 18:50",
				'workday2': "10:05 13:35 17:00 20:15",
				'workday3': "07:00 10:20 13:40 17:15",
				'workday4': "08:30 11:45 15:05 18:40",
				// station:'',
				'hollyday': "08:40 12:10 15:35 18:50",
				'hollyday2': "10:05 13:30 16:55 20:10",
				'hollyday3': "*07:40 10:20 13:40 17:15",
				'hollyday4': "08:25 11:40 15:00 18:40",
				'icon': 'bus', 'map': '', city: 'Калининград',
				'img': '',
				'numb': '108',
			},
			{
				'title': 'Мамоново · Краснофлотское',
				'en': 'Mamonovo · Krasnoflotskoe',
				'description': 'Ладушкин, Пятидорожное, Ушаково',
				time: '1:20', dist: '53', cost: '100',
				'workday': "06:00 06:30 07:00 07:30 08:00 08:30 09:00 09:30 10:00 10:30 11:00 11:30 12:00 12:30 13:00 13:30 14:00 14:30 15:00 15:30 16:00 16:30 17:00 17:30 18:00 18:30 19:00 19:30 20:15 21:00*",
				'workday2': "07:07 07:37 08:07 08:37 09:07 09:37 10:07 10:37 11:07 11:37 12:07 12:37 13:07 13:37 14:07 14:37 15:07 15:37 16:07 16:37 17:07 17:37 18:07 18:37 19:07 19:37 20:07 20:37 21:22 22:01",
				'workday3': "06:00* 06:15 06:45 07:15 07:45 08:15 08:45 09:15 09:45 10:15 10:45 11:15 11:45 12:15 12:45 13:15 13:45 14:15 14:45 15:15 15:45 16:15 16:45 17:15 17:45 18:15 18:45 19:15 19:45 20:15 20:45 21:25 22:10*",
				'workday4': "07:05 07:35 08:05 08:35 09:05 09:35 10:05 10:35 11:05 11:35 12:05 12:35 13:05 13:35 14:05 14:35 15:05 15:35 16:05 16:35 17:05 17:35 18:05 18:35 19:05 19:35 20:05 20:35 21:05 21:35 22:05 22:45 23:15",
				// station:'',
				'hollyday': "06:30 07:30 08:30 09:30 10:30 11:30 12:30 13:30 14:30 15:30 16:30 17:30 18:30 19:30 21:00*",
				'hollyday2': "07:37 08:37 09:37 10:37 11:37 12:37 13:37 14:37 15:37 16:37 17:37 18:37 19:37 20:37 22:01",
				'hollyday3': "06:00* 06:45 07:45 08:45 09:45 10:45 11:45 12:45 13:45 14:45 15:45 16:45 17:45 18:45 19:45 20:45 22:10*",
				'hollyday4': "07:05 08:05 09:05 10:05 11:05 12:05 13:05 14:05 15:05 16:05 17:05 18:05 19:05 20:05 21:05 22:05 23:15",
				'icon': 'bus', 'map': '', city: 'Калининград',
				info1: '* : следует до Мамоново',
				info2: '* : следует из/до Мамоново',
				info3: '* : следует из Мамоново',
				info4: '* : следует из/до Мамоново',
				'img': '',
				'numb': '117'
			},
			{
				'title': 'Мирное',
				'en': 'Mirnoe',
				'description': '',
				time: ':50', dist: '32', cost: '',
				'workday': "07:40 09:40 12:20 14:40 17:30",
				'workday2': "08:30 10:30 13:10 15:30 18:20",
				'workday3': "08:40 10:40 13:20 15:40 18:30",
				'workday4': "09:30 11:30 14:10 16:30 19:20",
				// station:'',
				'hollyday': "07:40 09:40 12:20 14:40 17:30",
				'hollyday2': "08:30 10:30 13:10 15:30 18:20",
				'hollyday3': "08:40 10:40 13:20 15:40 18:30",
				'hollyday4': "09:30 11:30 14:10 16:30 19:20",
				'icon': 'bus', 'map': '', city: 'Калининград',
				'img': '',
				info1: '* : Внимание: Рейс выполняется с 01 апреля по 30 сентября! По понедельникам, средам, пятницам, выходным и праздничным дням',
				info2: '* : Внимание: Рейс выполняется с 01 апреля по 30 сентября! По понедельникам, средам, пятницам, выходным и праздничным дням',
				info3: '* : Внимание: Рейс выполняется с 01 апреля по 30 сентября! По понедельникам, средам, пятницам, выходным и праздничным дням',
				info4: '* : Внимание: Рейс выполняется с 01 апреля по 30 сентября! По понедельникам, средам, пятницам, выходным и праздничным дням',
				'numb': '163'
			},
			{
				'title': 'Мозырь',
				'en': 'Mozir',
				'description': 'Гвардейск, Знаменск',
				time: '2:10', dist: '72', cost: '193',
				'workday': "05:05 10:45 17:00",
				'workday2': "06:30 12:48 19:10",
				'workday3': "06:45 13:10 19:20",
				'workday4': "08:51 15:21 21:36",
				// station:'',
				'hollyday': "10:45 17:00",
				'hollyday2': "12:48 19:10",
				'hollyday3': "13:10 19:20",
				'hollyday4': "15:21 21:36",
				'icon': 'bus', 'map': '', city: 'Калининград',
				'img': '',
				'numb': '536'
			},
			{
				'title': 'Морское',
				'en': 'Morskoe',
				'description': 'Зеленоградск, Лесное, Дюны, Рыбачий, Куршская коса',
				time: '2:05', dist: '77', cost: '176',
				'workday': "05:30 09:35 13:37 17:50",
				'workday2': "07:26 11:31 15:33 19:46",
				'workday3': "07:18 12:00 15:20 20:05",
				'workday4': "09:21 14:10 17:30 22:01",
				// station:'',
				'hollyday': "05:30 09:35 13:37 17:50",
				'hollyday2': "07:26 11:31 15:33 19:46",
				'hollyday3': "07:18 12:00 15:20 20:05",
				'hollyday4': "09:21 14:10 17:30 22:01",
				'icon': 'bus', 'map': '', city: 'Калининград',
				'img': '',
				'numb': '593'
			},
			{
				'title': 'Некрасово',
				'en': 'Nekrasovo',
				'description': 'Орловка, Сосновка, Храброво ',
				time: '1:20', dist: '23', cost: '74',
				'workday': "06:10 09:10 10:10 12:20 13:50 15:25 16:55 18:45",
				'workday2': "07:08* 10:19* 11:20 13:32 15:05 16:35 18:03 19:55",
				'workday3': "06:35* 07:10* 10:50* 11:40 13:40 15:10 16:50 18:15 20:05",
				'workday4': "08:05 08:34 12:10 12:45 15:05 16:25 18:01 19:25 21:10",
				// station:'',
				'hollyday': "06:10 09:10 10:10 12:20 13:50 15:25 16:55 18:45",
				'hollyday2': "07:08* 10:19* 11:20 13:32 15:05 16:35 18:03 19:55",
				'hollyday3': "06:35* 07:10* 10:50* 11:40 13:40 15:10 16:50 18:15 20:05",
				'hollyday4': "08:05 08:34 12:10 12:45 15:05 16:25 18:01 19:25 21:10",
				'icon': 'bus', 'map': '', city: 'Калининград',
				info1: '* : следует до Жемчужного',
				info2: '* : следует из Жемчужного',
				info3: '* : следует до Жемчужного',
				info4: '* : следует из Жемчужного',
				'img': '',
				'numb': '116'
			},
			{
				'title': 'Неман',
				'en': 'Neman',
				'description': 'Гвардейск, Большаково, Советск',
				time: '2:40', dist: '136', cost: '256',
				'workday': "10:20*",
				'workday2': "12:50",
				'workday3': "05:05 *07:35 *14:20 *18:20",
				'workday4': "07:35 10:10 16:40 20:40",
				// station:'',
				'hollyday': "10:20*",
				'hollyday2': "12:50",
				'hollyday3': "05:05 *07:35 *14:20 *18:20",
				'hollyday4': "07:35 10:10 16:40 20:40",
				'icon': 'bus', 'map': '', city: 'Калининград',
				info1: '* : следует до Советска',
				info2: '* : следует из Советска',
				info3: '* : следует до Советска',
				info4: '* : следует из Советска',
				'img': '',
				'numb': '543'
			},
			{
				'title': 'Нестеров · Чернышевское',
				'en': 'Nesterov · Chernyshevskoe',
				'description': 'Гвардейск, Черняховск, Гусев',
				time: '3:10', dist: '140', cost: '250',
				'workday': "08:00 09:45 11:50 14:20",
				'workday2': "10:03 13:01 15:17 17:40",
				'workday3': "06:55* 09:00* 10:15* 17:30",
				'workday4': "09:55 12:00 13:15 20:55",
				// station:'',
				'hollyday': "08:00 09:45 11:50 14:20",
				'hollyday2': "10:03 13:01 15:17 17:40",
				'hollyday3': "06:55* 09:00* 10:15* 17:30",
				'hollyday4': "09:55 12:00 13:15 20:55",
				'icon': 'bus', 'map': '', city: 'Калининград',
				info2: '* : следует из Нестерова',
				info4: '* : следует из Нестерова',
				'img': '',
				'numb': '583'
			},
			{
				'title': 'Озерск',
				'en': 'Ozersk',
				'description': 'Гвардейск, Черняховск',
				time: '2:50', dist: '124', cost: '200',
				'workday': "09:10 16:20 18:50",
				'workday2': "11:40 18:59 21:22",
				'workday3': "05:50 13:10",
				'workday4': "08:30 15:50",
				// station:'',
				'hollyday': "09:10 16:20 18:50",
				'hollyday2': "11:40 18:59 21:22",
				'hollyday3': "05:50 13:10",
				'hollyday4': "08:30 15:50",
				'icon': 'bus', 'map': '', city: 'Калининград',
				'img': '',
				'numb': '515'
			},
			{
				'title': 'Озерск',
				'en': 'Ozersk',
				'description': 'Гвардейск',
				time: '2:50', dist: '124', cost: '200',
				'workday': "14:00",
				'workday2': "16:50",
				'workday3': "07:50 16:30",
				'workday4': "10:40 18:45",
				// station:'',
				'hollyday': "14:00",
				'hollyday2': "16:50",
				'hollyday3': "07:50 16:30",
				'hollyday4': "10:40 18:45",
				'icon': 'bus', 'map': '', city: 'Калининград',
				'img': '',
				'numb': '566'
			},
			{
				'title': 'Озерск',
				'en': 'Ozersk',
				'description': 'Правдинск',
				time: '2:50', dist: '124', cost: '272',
				'workday': "16:15",
				'workday2': "19:30",
				'workday3': "07:00",
				'workday4': "10:15",
				// station:'',
				'hollyday': "16:15",
				'hollyday2': "19:30",
				'hollyday3': "07:00",
				'hollyday4': "10:15",
				'icon': 'bus', 'map': '', city: 'Калининград',
				'img': '',
				'numb': '527'
			},
			{
				'title': 'Озерск',
				'en': 'Ozersk',
				'description': 'Правдинск, Железнодорожный',
				time: '2:50', dist: '124', cost: '267',
				'workday': "11:20 20:00",
				'workday2': "14:37 23:17",
				'workday3': "07:45 15:55",
				'workday4': "09:09 19:12",
				// station:'',
				'hollyday': "11:20 20:00",
				'hollyday2': "14:37 23:17",
				'hollyday3': "07:45 15:55",
				'hollyday4': "09:09 19:12",
				'icon': 'bus', 'map': '', city: 'Калининград',
				'img': '',
				'numb': '525'
			},
			{
				'title': 'Озерск',
				'en': 'Ozersk',
				'description': 'Правдинск, Железнодорожный',
				time: '2:50', dist: '124', cost: '267',
				'workday': "10:20 18:15",
				'workday2': "13:26 21:21",
				'workday3': "06:00",
				'workday4': "09:06",
				// station:'',
				'hollyday': "10:20 18:15",
				'hollyday2': "13:26 21:21",
				'hollyday3': "6:00",
				'hollyday4': "09:06",
				'icon': 'bus', 'map': '', city: 'Калининград',
				'img': '',
				'numb': '554'
			},
			{
				'title': 'Партизанское',
				'en': 'Partizanskoe',
				'description': 'Отважное, Нивенское',
				time: ':30', dist: '16', cost: '38',
				'workday': "06:50 08:15 12:15 15:00 17:00 18:50 20:25",
				'workday2': "07:15 08:45 12:45 15:30 17:29 19:17 20:55",
				'workday3': "06:10 07:25 08:50 13:00 15:40 17:40 19:35 20:55",
				'workday4': "06:38 07:56 09:33 13:32 16:11 18:13 20:08 21:28",
				// station:'',
				'hollyday': "06:50 08:15 12:15 15:00 17:00 18:50 20:25",
				'hollyday2': "07:15 08:45 12:45 15:30 17:29 19:17 20:55",
				'hollyday3': "06:10 07:25 08:50 13:00 15:40 17:40 19:35 20:55",
				'hollyday4': "06:38 07:56 09:33 13:32 16:11 18:13 20:08 21:28",
				'icon': 'bus', 'map': '', city: 'Калининград',
				'img': '',
				'numb': '136'
			},
			{
				'title': 'Пионерский',
				'en': 'Pionerskii',
				'description': 'Переславское, Романово, Заостровье',
				time: '1:15', dist: '38', cost: '97',
				'workday': "06:00 06:30 06:55 07:25 07:55 08:25 08:55 09:25 09:55 10:25 10:55 11:25 11:55 12:25 12:55 13:25 13:55 14:25 14:55 15:25 15:55 16:25 16:55 17:25 17:55 18:25 18:55 19:25 19:55 20:25",
				'workday2': "07:11 07:41 08:11 08:41 09:11 09:41 10:11 10:41 11:11 11:41 12:11 12:41 13:11 13:41 14:11 14:41 15:11 15:41 16:11 16:41 17:11 17:41 18:11 18:41 19:11 19:41 20:11 20:41 21:11 21:41",
				'workday3': "06:00 06:30 07:00 07:30 08:00 08:30 09:00 09:30 10:00 10:30 11:00 11:30 12:00 12:30 13:00 13:30 14:00 14:30 15:00 15:30 16:00 16:30 17:00 17:30 18:00 18:30 19:00 19:30 20:00 20:30 21:00 21:30 22:00",
				'workday4': "06:55 07:25 08:03 08:33 09:03 09:33 10:03 10:33 11:03 11:33 12:03 12:33 13:03 13:33 14:03 14:33 15:03 15:33 16:03 16:33 17:03 17:33 18:03 18:33 19:03 19:33 20:03 20:33 20:55 21:25 21:55 22:25 22:55",
				// station:'',
				'hollyday': "06:00 06:30 06:55 07:25 07:55 08:25 08:55 09:25 09:55 10:25 10:55 11:25 11:55 12:25 12:55 13:25 13:55 14:25 14:55 15:25 15:55 16:25 16:55 17:25 17:55 18:25 18:55 19:25 19:55 20:25",
				'hollyday2': "07:11 07:41 08:11 08:41 09:11 09:41 10:11 10:41 11:11 11:41 12:11 12:41 13:11 13:41 14:11 14:41 15:11 15:41 16:11 16:41 17:11 17:41 18:11 18:41 19:11 19:41 20:11 20:41 21:11 21:41",
				'hollyday3': "06:00 06:30 07:00 07:30 08:00 08:30 09:00 09:30 10:00 10:30 11:00 11:30 12:00 12:30 13:00 13:30 14:00 14:30 15:00 15:30 16:00 16:30 17:00 17:30 18:00 18:30 19:00 19:30 20:00 20:30 21:00 21:30 22:00",
				'hollyday4': "06:55 07:25 08:03 08:33 09:03 09:33 10:03 10:33 11:03 11:33 12:03 12:33 13:03 13:33 14:03 14:33 15:03 15:33 16:03 16:33 17:03 17:33 18:03 18:33 19:03 19:33 20:03 20:33 20:55 21:25 21:55 22:25 22:55",
				'icon': 'bus', 'map': '', city: 'Калининград',
				'img': '',
				'numb': '119'
			},
			{
				'title': 'Пограничный',
				'en': 'Pogranichnyi',
				'description': 'Ладушкин, Новоселово',
				time: '1:15', dist: '43', cost: '102',
				'workday': "07:45 14:15 17:15",
				'workday2': "08:45 15:15 18:15",
				'workday3': "06:30 08:50 15:30 18:35",
				'workday4': "07:35 09:45 16:35 19:35",
				// station:'',
				'hollyday': "",
				'hollyday2': "",
				'hollyday3': "",
				'hollyday4': "",
				info3: '* : рейс выполняется только по рабочим дням',
				info4: '* : рейс выполняется только по рабочим дням',
				'icon': 'bus', 'map': '', city: 'Калининград',
				'img': '',
				'numb': '115'
			},
			{
				'title': 'Пограничный',
				'en': 'Pogranichnyi',
				'description': 'Медовое, Корнево',
				time: '1:15', dist: '43', cost: '98',
				'workday': "05:00 06:00 08:00* 09:30* 12:30 15:00* 16:10 17:40 19:00 20:30*",
				'workday2': "06:08 07:08 08:58 10:28 13:38 15:58 17:18 18:48 20:08 21:28",
				'workday3': "06:10 07:10 09:10* 10:30* 14:00 16:00* 17:30 19:00 20:20 21:45*",
				'workday4': "07:22 08:22 10:10 11:31 15:12 17:01 18:42 20:12 21:32 22:46",
				// station:'',
				'hollyday': "07:10 10:15* 12:30 15:25 18:20* 20:35",
				'hollyday2': "08:26 11:16 13:46 16:41 19:20 21:50",
				'hollyday3': "08:40 11:16* 13:50 16:45 19:20* 21:50",
				'hollyday4': "09:50 12:13 15:01 17:56 20:17 23:02",
				'icon': 'bus', 'map': '', city: 'Калининград',
				info1: '* : следует до Корнево',
				info2: '* : следует из Корнево',
				info3: '* : следует до Корнево',
				info4: '* : следует из Корнево',
				'img': '',
				'numb': '133'
			},
			{
				'title': 'Полесск',
				'en': 'Polessk',
				'description': 'Добрино, Гурьевск',
				time: '1:30', dist: '48', cost: '108',
				'workday': "07:00 10:25 14:20 18:20",
				'workday2': "08:30 11:55 15:50 19:50",
				'workday3': "08:35 12:30 16:10 20:00",
				'workday4': "10:05 14:00 17:40 21:25",
				// station:'',
				'hollyday': "07:00 10:25 14:20 18:20",
				'hollyday2': "08:30 11:55 15:50 19:50",
				'hollyday3': "08:35 12:30 16:10 20:00",
				'hollyday4': "10:05 14:00 17:40 21:25",
				'icon': 'bus', 'map': '', city: 'Калининград',
				'img': '',
				'numb': '345'
			},
			{
				'title': 'Правдинск',
				'en': 'Pravdinsk',
				'description': 'Осокино, Домново, Ермаково',
				time: '1:20', dist: '53', cost: '118',
				'workday': "06:50 14:00 17:45",
				'workday2': "08:05 15:15 19:15",
				'workday3': "08:10 16:00 19:20",
				'workday4': "09:25 17:15 20:35",
				// station:'',
				'hollyday': "06:50 14:00 17:45",
				'hollyday2': "08:05 15:15 19:15",
				'hollyday3': "08:10 16:00 19:20",
				'hollyday4': "09:25 17:15 20:35",
				'icon': 'bus', 'map': '', city: 'Калининград',
				'img': '',
				'numb': '173'
			},
			{
				'title': 'Правдинск',
				'en': 'Pravdinsk',
				'description': 'Домново, Солдатово, Ермаково',
				time: '1:15', dist: '53', cost: '107',
				'workday': "09:00 12:25 15:50* 21:00*",
				'workday2': "10:10 13:35 17:14 22:24",
				'workday3': "07:00* 10:40 14:10 17:20",
				'workday4': "08:24 11:50 15:20 18:30",
				// station:'',
				'hollyday': "09:00 12:25 15:50* 21:00*",
				'hollyday2': "10:10 13:35 17:14 22:24",
				'hollyday3': "07:00* 10:40 14:10 17:20",
				'hollyday4': "08:24 11:50 15:20 18:30",
				'icon': 'bus', 'map': '', city: 'Калининград',
				info1: '* : Через: Домново, Солдатово, Ермаково',
				info2: '* : Через: Домново, Солдатово, Ермаково',
				info3: '* : Через: Домново, Солдатово, Ермаково',
				info4: '* : Через: Домново, Солдатово, Ермаково',
				'img': '',
				'numb': '620э'
			},
			{
				'title': 'Светлогорск',
				'en': 'Svetlogorsk',
				'description': 'Холмогоровка, Переславское, Пионерский',
				time: '1:20', dist: '39', cost: '96',
				'workday': "06:00 06:20 07:00 07:20 07:40 08:00 08:20 08:40 09:00 09:20 09:40 10:00 10:20 10:40 11:00 11:20 11:40 12:00 12:20 12:40 13:00 13:20 13:40 14:00 14:20 14:40 15:00 15:20 15:40 16:00 16:20 16:40 17:00 17:20 17:40 18:00 18:20 18:40 19:00 19:20 19:40 20:00 20:20 20:40 21:00 21:30* 22:00 22:30",
				'workday2': "07:12 07:37 08:17 08:45 08:57 09:25 09:37 10:05 10:17 10:45 11:57 11:25 11:37 12:05 12:17 12:45 12:57 13:37 13:45 14:05 14:17 14:45 14:57 15:25 15:37 16:05 16:17 16:45 16:57 17:25 17:37 18:05 18:17 18:37 19:05 19:25 19:37 20:05 20:17 20:45 20:57 21:25 21:37 22:05 22:17 22:55 23:25 23:55",
				'workday3': "06:00 06:20 06:40 07:00 07:20 07:40 08:00 08:20 08:40 09:00 09:20 09:40 10:00 10:20 10:40 11:00 11:20 11:40 12:00 12:20 12:40 13:00 13:20 13:40 14:00 14:20 14:40 15:00 15:20 15:40 16:00 16:20 16:40 17:00 17:20 17:40 18:00 18:20 18:40 19:00 19:20 19:40 20:00 20:20 20:40 21:00 21:15 21:45 22:20",
				'workday4': "07:10 07:35 07:51 08:15 08:27 08:55 09:11 09:35 09:51 10:15 10:27 10:55 11:11 11:35 11:51 12:15 12:27 12:55 13:11 13:35 13:51 14:15 14:27 14:55 15:11 15:35 15:51 16:15 16:27 16:55 17:11 17:35 17:51 18:15 18:27 18:55 19:11 19:35 19:51 20:15 20:27 20:55 21:07 21:35 21:47 22:15 22:18 22:47 23:19",
				// station:'',
				'hollyday': "06:00 06:20 07:00 07:20 07:40 08:00 08:20 08:40 09:00 09:20 09:40 10:00 10:20 10:40 11:00 11:20 11:40 12:00 12:20 12:40 13:00 13:20 13:40 14:00 14:20 14:40 15:00 15:20 15:40 16:00 16:20 16:40 17:00 17:20 17:40 18:00 18:20 18:40 19:00 19:20 19:40 20:00 20:20 20:40 21:00 *21:30 22:00 22:30",
				'hollyday2': "07:12 07:37 08:17 08:45 08:57 09:25 09:37 10:05 10:17 10:45 11:57 11:25 11:37 12:05 12:17 12:45 12:57 13:37 13:45 14:05 14:17 14:45 14:57 15:25 15:37 16:05 16:17 16:45 16:57 17:25 17:37 18:05 18:17 18:37 19:05 19:25 19:37 20:05 20:17 20:45 20:57 21:25 21:37 22:05 22:17 22:55 23:25 23:55",
				'hollyday3': "06:00 06:20 06:40 07:00 07:20 07:40 08:00 08:20 08:40 09:00 09:20 09:40 10:00 10:20 10:40 11:00 11:20 11:40 12:00 12:20 12:40 13:00 13:20 13:40 14:00 14:20 14:40 15:00 15:20 15:40 16:00 16:20 16:40 17:00 17:20 17:40 18:00 18:20 18:40 19:00 19:20 19:40 20:00 20:20 20:40 21:00 21:15 21:45 22:20",
				'hollyday4': "07:10 07:35 07:51 08:15 08:27 08:55 09:11 09:35 09:51 10:15 10:27 10:55 11:11 11:35 11:51 12:15 12:27 12:55 13:11 13:35 13:51 14:15 14:27 14:55 15:11 15:35 15:51 16:15 16:27 16:55 17:11 17:35 17:51 18:15 18:27 18:55 19:11 19:35 19:51 20:15 20:27 20:55 21:07 21:35 21:47 22:15 22:18 22:47 23:19",
				'icon': 'bus', 'map': '', city: 'Калининград',
				info1: '* : Через: Пионерский',
				'img': 'svetlogorsk',
				'numb': '118'
			},
			{
				'title': 'Светлое',
				'en': 'Svetloe',
				'description': 'Ушаково, Новомосковский',
				time: '1:10', dist: '34', cost: '85',
				'workday': "05:45 08:20 11:40 14:50 17:20 20:40",
				'workday2': "06:35 09:30 12:40 15:50 18:20 21:35",
				'workday3': "06:40 09:40 12:50 16:00 18:30 21:35",
				'workday4': "07:40 10:40 13:50 17:00 19:30 22:30",
				// station:'',
				'hollyday': "05:45 08:20 11:40 14:50 17:20 20:40",
				'hollyday2': "06:35 09:30 12:40 15:50 18:20 21:35",
				'hollyday3': "06:40 09:40 12:50 16:00 18:30 21:35",
				'hollyday4': "07:40 10:40 13:50 17:00 19:30 22:30",
				'icon': 'bus', 'map': '', city: 'Калининград',
				'img': '',
				'numb': '161'
			},
			{
				'title': 'Светлый',
				'en': 'Svetlyi',
				'description': 'Ижевское, Взморье',
				time: '1:10', dist: '32', cost: '75',
				'workday': "06:30 06:45 07:05 07:30 08:00 08:25 08:50 09:10 09:35 10:00 10:30 10:50 11:15 11:30 11:50 12:20 12:40 12:55 13:20 13:40 14:00 14:20 14:40 14:55 15:10 15:30 15:45 16:05 16:20 16:40 17:00 17:20 17:35 17:50 18:05 18:20 18:35 19:00 19:15 19:35 19:50 20:10 20:40 21:15 21:40 22:10 22:40",
				'workday2': "07:45 07:55 08:15 08:40 09:10 09:35 10:00 10:20 10:45 11:10 11:40 12:00 12:25 12:40 13:00 13:30 13:50 14:05 14:30 14:50 15:10 15:30 15:50 16:05 16:20 16:40 16:55 17:15 17:30 17:50 18:10 18:30 18:45 19:00 19:15 19:30 19:45 20:10 20:25 20:45 21:00 21:15 21:45 22:20 22:40 23:10 23:55",
				'workday3': "05:15 05:35 05:50 06:10 06:25 06:40 06:55 07:10 07:20 07:35 07:45 08:05 08:25 08:40 09:00 09:25 09:45 10:00 10:30 10:50 11:10 11:30 12:00 12:20 12:40 13:00 13:30 13:50 14:05 14:20 14:40 15:00 15:20 15:40 16:00 16:15 16:30 16:50 17:05 17:30 17:50 18:05 18:20 18:45 19:10 19:40 20:10 20:45 21:25",
				'workday4': "06:20 06:40 06:55 07:15 07:30 07:50 08:05 08:20 08:30 08:45 08:55 09:15 09:35 09:50 10:10 10:35 10:55 11:10 11:40 12:00 12:20 12:45 13:15 13:35 13:55 14:15 14:45 15:05 15:20 15:35 15:55 16:10 16:30 16:50 17:10 17:25 17:40 18:00 18:15 18:40 19:00 19:15 19:30 19:55 20:20 20:50 21:20 21:55 22:35",
				// station:'',
				'hollyday': "06:30 06:50 07:25 08:00 08:25 08:50 09:10 09:35 10:00 10:30 10:50 11:15 11:30 11:50 12:20 12:40 12:55 13:20 13:40 14:00 14:25 14:50 14:55 15:10 15:40 16:05 16:20 16:40 17:00 17:20 17:50 18:15 18:35 19:00 19:30 19:50 20:10 20:45 21:15 21:40 22:10 22:40",
				'hollyday2': "07:40 08:00 08:35 09:10 09:35 10:00 10:20 10:45 11:10 11:40 12:00 12:25 12:40 13:00 13:30 13:50 14:05 14:30 14:50 15:10 15:35 16:00 16:20 16:50 17:15 17:30 17:50 18:10 18:30 18:45 19:00 19:25 19:45 20:10 20:40 21:00 21:20 21:55 22:20 22:45 23:15 23:40",
				'hollyday3': "05:15 05:35 06:00 06:20 06:40 06:55 07:15 07:30 07:50 08:10 08:30 08:50 09:10 09:30 09:50 10:10 10:30 10:55 11:30 11:55 12:20 12:40 13:05 13:30 13:50 14:20 14:40 15:00 15:20 15:40 16:00 16:30 16:50 17:05 17:30 17:50 18:20 18:45 19:10 19:40 20:10 20:45 21:25",
				'hollyday4': "06:20 06:40 07:05 07:25 07:45 08:00 08:20 08:35 09:00 09:20 09:40 10:00 10:20 10:40 11:00 11:20 11:40 12:05 12:40 13:05 13:30 13:50 14:15 14:40 15:00 15:30 15:50 16:10 16:30 16:50 17:10 17:40 18:00 18:15 18:40 19:00 19:30 19:55 20:20 20:50 21:20 21:55 22:30",
				'icon': 'bus', 'map': '', city: 'Калининград',
				'img': '',
				'numb': '105'
			},
			{
				'title': 'Светлый',
				'en': 'Svetlyi',
				'description': 'Ижевское, Взморье',
				time: '1:00', dist: '32', cost: '74',
				'workday': "09:00",
				'workday2': "22:40",
				'workday3': "10:00",
				'workday4': "21:25",
				// station:'',
				'hollyday': "07:25",
				'hollyday2': "22:40",
				'hollyday3': "06:00",
				'hollyday4': "21:25",
				'icon': 'bus', 'map': '', city: 'Калининград',
				info1: 'Периодичность 25 мин',
				info2: 'Периодичность 25 мин',
				info3: 'по субботам периодичность 35 мин',
				info4: 'по воскресеньям периодичность 25 мин',
				'img': '',
				'numb': '205э'
			},
			{
				'title': 'Славинск',
				'en': 'Slavinsk',
				'description': 'Борское, Калинково',
				time: '1:20', dist: '50', cost: '129',
				'workday': "09:20 15:30 19:00",
				'workday2': "10:43 16:45 20:13",
				'workday3': "06:50 10:45 17:00 20:15",
				'workday4': "08:00 11:35* 18:15 21:10*",
				// station:'',
				'hollyday': "09:20 15:30 19:00",
				'hollyday2': "10:43 16:45 20:13",
				'hollyday3': "06:50 10:45 17:00 20:15",
				'hollyday4': "08:00 11:35* 18:15 21:10*",
				'icon': 'bus', 'map': '', city: 'Калининград',
				info2: 'следует до ул. Ялтинская',
				info4: 'следует до ул. Ялтинская',
				'img': '',
				'numb': '134'
			},
			{
				'title': 'Советск',
				'en': 'Sovetsk',
				'description': 'Полесск, Большаково',
				time: '2:50', dist: '108', cost: '230',
				'workday': "09:40 11:00 13:50 16:50 21:00",
				'workday2': "12:25 13:50 16:40 19:40 23:50",
				'workday3': "05:00 06:10 13:20 15:15 17:20",
				'workday4': "07:54 09:00 15:55 18:09 20:14",
				// station:'',
				'hollyday': "09:40 11:00 13:50 16:50 21:00",
				'hollyday2': "12:25 13:50 16:40 19:40 23:50",
				'hollyday3': "05:00 06:10 13:20 15:15 17:20",
				'hollyday4': "07:54 09:00 15:55 18:09 20:14",
				'icon': 'bus', 'map': '', city: 'Калининград',
				'img': 'sovetsk',
				'numb': '513'
			},
			{
				'title': 'Советск',
				'en': 'Sovetsk',
				'description': 'Полесск, Славск',
				time: '2:30', dist: '108', cost: '230',
				'workday': "08:00 19:00",
				'workday2': "11:00 22:00",
				'workday3': "08:10 12:30",
				'workday4': "11:21 15:42",
				// station:'',
				'hollyday': "08:00 19:00",
				'hollyday2': "11:00 22:00",
				'hollyday3': "08:10 12:30",
				'hollyday4': "11:21 15:42",
				'icon': 'bus', 'map': '', city: 'Калининград',
				'img': 'sovetsk',
				'numb': '522'
			},
			{
				'title': 'Советск',
				'en': 'Sovetsk',
				'description': 'Гвардейск, Большаково, Славск',
				time: '2:30', dist: '108', cost: '230',
				'workday': "06:50 08:30 12:40 14:20 20:35",
				'workday2': "09:35 11:15 15:20 17:10 23:10",
				'workday3': "05:55 10:00 15:40",
				'workday4': "08:35 12:45 18:15",
				// station:'',
				'hollyday': "06:50 08:30 12:40 14:20 20:35",
				'hollyday2': "09:35 11:15 15:20 17:10 23:10",
				'hollyday3': "05:55 10:00 15:40",
				'hollyday4': "08:35 12:45 18:15",
				'icon': 'bus', 'map': '', city: 'Калининград',
				'img': 'sovetsk',
				'numb': '523'
			},
			{
				'title': 'Советск',
				'en': 'Sovetsk',
				'description': ' Полесск, Большаково',
				time: '2:30', dist: '108', cost: '240',
				'workday': "07:30 08:30 09:30 10:30 11:30 12:30 13:30 14:30 15:30 16:30 17:30 18:30 19:30 20:30 ",
				'workday2': "09:30 10:30 11:30 12:30 13:30 14:30 15:30 16:30 17:30 18:30 19:30 20:30 21:30 22:30",
				'workday3': "06:00 07:00 08:00 09:00 10:00 11:00 12:00 13:00 14:00 15:00 16:00 17:00 18:00 20:00",
				'workday4': "08:00 09:00 10:00 11:00 12:00 13:00 14:00 15:00 16:00 17:00 18:00 19:00 20:00 22:00",
				// station:'',
				'hollyday': "07:30 09:30 10:30 11:30 12:30 13:30 14:30 15:30 16:30 17:30 18:30 19:30 20:30 21:30*",
				'hollyday2': "09:30 11:30 12:30 13:30 14:30 15:30 16:30 17:30 18:30 19:30 20:30 21:30 22:30 23:30",
				'hollyday3': "07:00 08:00 09:00 10:00 11:00 12:00 13:00 14:00 15:00 16:00 17:00 18:00 19:00* 20:00",
				'hollyday4': "09:00 10:00 11:00 12:00 13:00 14:00 15:00 16:00 17:00 18:00 19:00 20:00 21:00 22:00",
				'icon': 'bus', 'map': '', city: 'Калининград',
				info3: '* : только по пятницам, субботам и воскресеньям',
				info4: '* : только по пятницам, субботам и воскресеньям',
				'img': 'sovetsk',
				'numb': '600э'
			},
			{
				'title': 'Советск',
				'en': 'Sovetsk',
				'description': '',
				time: '2:30', dist: '108', cost: '260',
				'workday': "08:00 *09:00 10:00 11:00 12:00 13:00 14:00 15:00 16:00 17:00 18:00 19:00 20:00 21:00",
				'workday2': "10:00 11:00 12:00 13:00 14:00 15:00 16:00 17:00 18:00 19:00 20:00 21:00 22:00 23:00",
				'workday3': "05:30 *06:30 07:30 08:30 09:30 10:30 11:30 12:30 13:30 14:30 15:30 16:30 17:30 18:30 19:30",
				'workday4': "07:30 08:30 09:30 10:30 11:30 12:30 13:30 14:30 15:30 16:30 17:30 18:30 19:30 20:30 21:30",
				// station:'',
				'hollyday': "*09:00 10:00 11:00 12:00 13:00 14:00 15:00 16:00 17:00 18:00 19:00 20:00 21:00",
				'hollyday2': "11:00 12:00 13:00 14:00 15:00 16:00 17:00 18:00 19:00 20:00 21:00 22:00 23:00",
				'hollyday3': "*06:30 07:30 08:30 09:30 10:30 11:30 12:30 13:30 14:30 15:30 16:30 17:30 18:30 19:30",
				'hollyday4': "08:30 09:30 10:30 11:30 12:30 13:30 14:30 15:30 16:30 17:30 18:30 19:30 20:30 21:30",
				'icon': 'bus', 'map': '', city: 'Калининград',
				info1: '* : только по пятницам, субботам и воскресеньям',
				info2: '* : только по пятницам, субботам и воскресеньям',
				info3: '* : только по пятницам, субботам и воскресеньям',
				info4: '* : только по пятницам, субботам и воскресеньям',
				'img': 'sovetsk',
				'numb': '601э'
			},
			{
				'title': 'Ушаково',
				'en': 'Ushakovo',
				'description': 'Родники, Низовье, Яблоновка',
				time: '1:10', dist: '22', cost: '67',
				'workday': "**05:34 06:45 08:10 10:30 12:35 14:00* 15:15 16:50 18:20* 19:55 21:05",
				'workday2': "06:20 07:40 09:09 11:34 13:35 15:17 16:14 17:49 19:39 20:54 22:05",
				'workday3': "06:32 07:45 09:15 11:35 13:40 15:25 16:20 17:55 19:45 21:00",
				'workday4': "07:27 08:40 10:10 12:30 14:35 16:20 17:15 18:50 20:40 21:55",
				// station:'',
				'hollyday': "06:45 09:05* 12:35 14:50* 18:20* 21:05",
				'hollyday2': "07:40 10:24 13:35 16:09 19:39 22:05",
				'hollyday3': "07:45 10:35 13:40 16:20 19:45 22:15",
				'hollyday4': "08:40 11:30 14:35 17:15 20:40 23:10",
				info1: '** : с Центрального рынка без заезда на автовокзал.* : Через: Рощино, Яблоновка.',
				info3: '* : Через: Рощино, Яблоновка',
				'icon': 'bus', 'map': '', city: 'Калининград',
				'img': '',
				'numb': '110'
			},
			{
				'title': 'Храброво',
				'en': 'KHrabrovo',
				'description': 'Орловка',
				time: ':50', dist: '18', cost: '57',
				'workday': "08:15 20:00 21:15",
				'workday2': "09:03 20:50 22:04",
				'workday3': "09:20 21:00 22:15",
				'workday4': "10:10 21:50 23:05",
				// station:'',
				'hollyday': "08:15 20:00 21:15",
				'hollyday2': "09:03 20:50 22:04",
				'hollyday3': "09:20 21:00 22:15",
				'hollyday4': "10:10 21:50 23:05",
				'icon': 'bus', 'map': '', city: 'Калининград',
				'img': '',
				'numb': '116к'
			},
			{
				'title': 'Храброво',
				'en': 'KHrabrovo',
				'description': 'Гурьевск, Лазовское, Каширское',
				time: '1:20', dist: '38', cost: '95',
				'workday': "06:00* 08:10 11:43 15:08 18:25**",
				'workday2': "06:40 10:03 13:35 17:00 20:17",
				'workday3': "06:41 10:08 13:41 17:06 20:23*",
				'workday4': "08:00 11:23 14:56 18:15 20:42",
				// station:'',
				'hollyday': "06:00* 08:10 11:43 15:08 18:25**",
				'hollyday2': "06:40 10:03 13:35 17:00 20:17",
				'hollyday3': "06:41 10:08 13:41 17:06 20:23*",
				'hollyday4': "08:00 11:23 14:56 18:15 20:42",
				info1: '* : только до Гурьевска. ** : с заездом в Каширскре',
				info2: '* : из Гурьевска',
				info3: '* : только до Гурьевска. ** : с заездом в Каширскре',
				info4: '* : из Гурьевска',
				'icon': 'bus', 'map': '', city: 'Калининград',
				'img': '',
				'numb': '145'
			},
			{
				'numb': '244э',
				'title': 'Храброво Аэропорт [KGD]',
				'en': '[KGD] Airport "KHrabrovo"',
				'description': '',
				time: ':45', dist: '17', cost: '80',
				'workday': "07:00 07:40 08:20 09:00 09:40 10:20 11:00 11:40 12:20 13:00 13:40 14:20 15:00 15:40 16:20 17:00 17:40 18:20 19:00 19:40 20:20",
				'workday2': "07:45 08:25 09:05 09:45 10:25 11:05 11:45 12:25 13:05 13:45 14:25 15:05 15:45 16:25 17:05 17:45 18:25 19:05 19:45 20:25 21:05",
				'workday3': "08:20 09:00 09:40 10:20 11:00 11:40 12:20 13:00 13:40 14:20 15:00 15:40 16:20 17:00 17:40 18:20 19:00 19:45 20:30 22:00",
				'workday4': "09:05 09:45 10:25 11:05 11:45 12:25 13:05 13:45 14:25 15:05 15:45 16:25 17:05 17:45 18:25 19:05 19:45 20:30 21:15 22:45",
				// station:'',
				'hollyday': "07:00 07:40 08:20 09:00 09:40 10:20 11:00 11:40 12:20 13:00 13:40 14:20 15:00 15:40 16:20 17:00 17:40 18:20 19:00 19:40 20:20",
				'hollyday2': "07:45 08:25 09:05 09:45 10:25 11:05 11:45 12:25 13:05 13:45 14:25 15:05 15:45 16:25 17:05 17:45 18:25 19:05 19:45 20:25 21:05",
				'hollyday3': "08:20 09:00 09:40 10:20 11:00 11:40 12:20 13:00 13:40 14:20 15:00 15:40 16:20 17:00 17:40 18:20 19:00 19:45 20:30 22:00",
				'hollyday4': "09:05 09:45 10:25 11:05 11:45 12:25 13:05 13:45 14:25 15:05 15:45 16:25 17:05 17:45 18:25 19:05 19:45 20:30 21:15 22:45",
				'icon': 'paper-plane',
				'map': '', city: 'Калининград',
				'img': '',
			},
			{
				'title': 'Черняховск',
				'en': 'Cherniahovsk',
				'description': 'Домново, Правдинск, ЖДР',
				time: '1:50', dist: '85', cost: '319',
				'workday': "05:20 11:50 13:25 19:00",
				'workday2': "08:24 14:54 16:38 22:13",
				'workday3': "04:50 09:30 15:10 18:00",
				'workday4': "07:27 12:43 18:27 21:27",
				// station:'',
				'hollyday': "05:20 11:50 13:25 19:00",
				'hollyday2': "08:24 14:54 16:38 22:13",
				'hollyday3': "04:50 09:30 15:10 18:00",
				'hollyday4': "07:27 12:43 18:27 21:27",
				'icon': 'bus', 'map': '', city: 'Калининград',
				'img': '',
				'numb': '520'
			},
			{
				'title': 'Черняховск',
				'en': 'Cherniahovsk',
				'description': 'Озерки, Гвардейск, Правдинск, ЖДР',
				time: '1:50', dist: '85', cost: '384',
				'workday': "08:10 15:30",
				'workday2': "12:20 19:40",
				'workday3': "07:00 13:00",
				'workday4': "11:10 17:10",
				// station:'',
				'hollyday': "08:10 15:30",
				'hollyday2': "12:20 19:40",
				'hollyday3': "07:00 13:00",
				'hollyday4': "11:10 17:10",
				'icon': 'bus', 'map': '', city: 'Калининград',
				'img': '',
				'numb': '567'
			},
			{
				'title': 'Южный ',
				'en': 'Yuzhnyi · Severnyi',
				'description': 'Лесное, Нивенское, Северный',
				time: ':43', dist: '39', cost: '45',
				'workday': "07:15 07:45 09:00 09:40 11:15 13:15 14:15 15:35 16:30 17:25 18:10 19:10 20:20 21:15 22:15",
				'workday2': "07:56 08:29 09:43 10:23 11:59 13:52 14:59 16:19 17:10 18:05 18:48 19:47 21:00 21:59 22:59",
				'workday3': "06:10 06:40 08:00 08:33 09:45 10:30 12:05 14:00 15:05 16:25 17:15 18:10 19:00 19:50 21:05",
				'workday4': "06:55 07:29 08:45 09:17 10:30 11:13 12:50 14:45 15:50 17:14 17:59 18:54 19:45 20:39 21:50",
				// station:'',
				'hollyday': "07:45 09:40 11:15 13:25 15:35 17:20 19:00 21:30",
				'hollyday2': "08:29 10:23 11:59 14:08 16:19 18:04 19:44 22:14",
				'hollyday3': "06:40 08:33 10:30 12:15 14:15 16:25 18:10 19:50",
				'hollyday4': "07:29 09:17 11:10 13:00 15:04 17:14 18:54 20:39",
				'icon': 'bus', 'map': '', city: 'Калининград',
				'img': '',
				'numb': '109'
			},
			{
				'title': 'Янтарный · Синявино',
				'en': 'Yantarnyi · Siniavino',
				'description': 'Переславское, Кругловка, Покровское',
				time: '1:25', dist: '48', cost: '110',
				'workday': "06:30 08:20 09:10 10:10 11:10 12:10 13:10 14:10 15:10 16:10 17:10 18:10 19:10 21:10",
				'workday2': "08:05 09:55 10:45 11:45 12:45 13:45 14:45 15:45 16:45 17:45 18:45 19:45 20:45 22:10",
				'workday3': "06:00 07:15 08:15 09:25 10:05 11:05 12:05 13:05 14:05 15:05 16:05 17:05 18:05 19:05 20:05 21:05",
				'workday4': "08:05 08:50 09:50 11:00 11:40 12:40 13:40 14:40 15:40 16:40 17:40 18:40 19:40 20:40 21:40 22:40",
				// station:'',
				'hollyday': "06:30 08:20 09:10 10:10 11:10 12:10 13:10 14:10 15:10 16:10 17:10 18:10 19:10 21:10",
				'hollyday2': "08:05 09:55 10:45 11:45 12:45 13:45 14:45 15:45 16:45 17:45 18:45 19:45 20:45 22:10",
				'hollyday3': "06:00 07:15 08:15 09:25 10:05 11:05 12:05 13:05 14:05 15:05 16:05 17:05 18:05 19:05 20:05 21:05",
				'hollyday4': "08:05 08:50 09:50 11:00 11:40 12:40 13:40 14:40 15:40 16:40 17:40 18:40 19:40 20:40 21:40 22:40",
				'icon': 'bus', 'map': '', city: 'Калининград',
				'img': 'yant',
				'numb': '120'
			},
			{
				'title': 'Светлогорск · Гусев',
				'en': 'Svetlogorsk · Gusev',
				'description': 'Черняховск, Гвардейск, Калининград, Холмогоровка, Переславское',
				time: '2:30', dist: '156', cost: '',
				'workday': "12:55 19:50",
				'workday2': "15:25 22:18",
				'workday3': "06:20 14:00",
				'workday4': "09:06 16:27",
				// station:'',
				'hollyday': "12:55 19:50",
				'hollyday2': "15:25 22:18",
				'hollyday3': "06:20 14:00",
				'hollyday4': "09:06 16:27",
				'info1': "Рейс выполняется с 01.05 по 30.09.",
				'info2': "Рейс выполняется с 01.05 по 30.09.",
				'info3': "Рейс выполняется с 01.05 по 30.09.",
				'info4': "Рейс выполняется с 01.05 по 30.09.",
				'icon': 'bus', 'map': '', city: 'Калининград',
				'img': 'svetlogorsk',
				'numb': '581'
			},
			{
				'title': 'Светлогорск · Гусев',
				'en': 'Svetlogorsk · Gusev',
				'description': 'Черняховск, Гвардейск, Калининград, Холмогоровка, Переславское',
				time: '2:30', dist: '156', cost: '',
				'workday': "09:16 16:45",
				'workday2': "10:25 18:10",
				'workday3': "11:35 18:35",
				'workday4': "12:44 19:40",

				// station:'',
				'hollyday': "09:16 16:45",
				'hollyday2': "10:25 18:10",
				'hollyday3': "11:35 18:35",
				'hollyday4': "12:44 19:40",
				'icon': 'bus', 'map': '', city: 'Калининград',
				'img': 'svetlogorsk',
				'numb': '581э'
			}
		];


		// Северный автовокзал
		this.spisok = [
			{
				'title': 'Донское',
				'en': 'Donskoe',
				'description': 'Переславское, Светлогорск, Отрадное',
				time: '1:15', dist: '106', cost: '107',
				'workday': "06:00 08:10 10:37 12:30 14:37 16:30 18:37 20:30",
				'workday2': "07:15 09:30 11:48 13:50 15:48 17:50 19:48 21:50",
				'workday3': "06:00 07:25 10:00 12:05 14:00 16:05 18:00 20:05 22:00*",
				'workday4': "07:10 08:40 11:15 13:20 15:15 17:20 19:15 21:20 22:15",
				// station:'',
				'hollyday': "06:00 08:10 10:37 12:30 14:37 16:30 18:37 20:30",
				'hollyday2': "07:15 09:30 11:48 13:50 15:48 17:50 19:48 21:50",
				'hollyday3': "06:00 07:25 10:00 12:05 14:00 16:05 18:00 20:05 22:00*",
				'hollyday4': "07:10 08:40 11:15 13:20 15:15 17:20 19:15 21:20 22:15",
				info2: '* : следует только до Светлогорска',
				info4: '* : следует только до Светлогорска',
				'icon': 'bus', 'map': '', city: 'Калининград',
				'img': '',
				'numb': '125',
				station: [
					// {title:'Переславское',
					// tax:'12'},
					// {title:'Переславское 2',
					// tax:'18'},
					// {title:'Переславское 3',
					// tax:'32'},
				]
			},
			{
				'title': 'Зеленоградск',
				'en': 'Zelenogradsk',
				'description': 'Петрово, Сокольники',
				time: ':50', dist: '32', cost: '85',
				'workday': "06:20 06:50 07:20 07:45 08:15 08:45 09:20 09:50 10:20 10:50 11:20 11:50 12:20 12:50 13:20 13:50 14:20 14:50 15:20 15:50 16:20 16:50 17:20 17:50 18:20 18:50 19:20 19:50 20:20 20:50 21:20 21:50",
				'workday2': "07:10 07:40 08:10 08:40 09:10 09:40 10:10 10:40 11:10 11:40 12:10 12:40 13:10 13:40 14:10 14:40 15:10 15:40 16:10 16:40 17:10 17:40 18:10 18:40 19:10 19:40 20:10 20:40 21:10 21:40 22:10 22:40",
				'workday3': "06:00 06:30 07:00 07:30 08:00 08:30 09:00 09:30 10:00 10:30 11:00 11:30 12:00 12:30 13:00 13:30 14:00 14:30 15:00 15:30 16:00 16:30 17:00 17:30 18:00 18:30 19:00 19:30 20:00 20:30 21:00 21:30 22:20",
				'workday4': "06:50 07:17 07:50 08:17 08:50 09:17 09:50 10:17 10:50 11:17 11:50 12:17 12:50 13:17 13:50 14:17 14:50 15:17 15:50 16:17 16:50 17:17 17:50 18:17 18:50 19:17 19:50 20:17 20:50 21:17 21:04 22:34 23:24",
				// station:'',
				'hollyday': "06:20 06:50 07:20 07:45 08:15 08:45 09:20 09:50 10:20 10:50 11:20 11:50 12:20 12:50 13:20 13:50 14:20 14:50 15:20 15:50 16:20 16:50 17:20 17:50 18:20 18:50 19:20 19:50 20:20 20:50 21:20 21:50",
				'hollyday2': "07:10 07:40 08:10 08:40 09:10 09:40 10:10 10:40 11:10 11:40 12:10 12:40 13:10 13:40 14:10 14:40 15:10 15:40 16:10 16:40 17:10 17:40 18:10 18:40 19:10 19:40 20:10 20:40 21:10 21:40 22:10 22:40",
				'hollyday3': "06:00 06:30 07:00 07:30 08:00 08:30 09:00 09:30 10:00 10:30 11:00 11:30 12:00 12:30 13:00 13:30 14:00 14:30 15:00 15:30 16:00 16:30 17:00 17:30 18:00 18:30 19:00 19:30 20:00 20:30 21:00 21:30 22:20",
				'hollyday4': "06:50 07:17 07:50 08:17 08:50 09:17 09:50 10:17 10:50 11:17 11:50 12:17 12:50 13:17 13:50 14:17 14:50 15:17 15:50 16:17 16:50 17:17 17:50 18:17 18:50 19:17 19:50 20:17 20:50 21:17 21:04 22:34 23:24",
				'icon': 'bus', 'map': '', city: 'Калининград',
				'img': 'zelenogradsk',
				'numb': '141'
			}, {

				'title': 'Зеленоградск',
				'en': 'Zelenogradsk',
				'description': 'Петрово, Сокольники',
				time: ':35', dist: '32', cost: '85',
				'workday': "07:05 08:05 09:05 10:05 11:05 12:05 13:05 14:05 15:05 16:05 17:05 18:05 19:05 20:05",
				'workday2': "07:40 08:40 09:40 10:40 11:40 12:40 13:40 14:40 15:40 16:40 17:40 18:40 19:40 20:40",
				'workday3': "",
				'workday4': "",
				// station:'',
				'hollyday': "07:05 08:05 09:05 10:05 11:05 12:05 13:05 14:05 15:05 16:05 17:05 18:05 19:05 20:05",
				'hollyday2': "07:40 08:40 09:40 10:40 11:40 12:40 13:40 14:40 15:40 16:40 17:40 18:40 19:40 20:40",
				'hollyday3': "",
				'hollyday4': "",
				'icon': 'bus', 'map': '', city: 'Калининград',
				'img': 'zelenogradsk',
				'numb': '141э'
			}, {
				'title': 'Люблино · Светлый',
				'en': 'Lublino · Svetlyi',
				'description': 'Чкаловский поворот',
				time: '1:05', dist: '27', cost: '70',
				'workday': "08:55 12:25 15:50 19:05",
				'workday2': "10:05 13:30 16:55 20:10",
				'workday3': "*07:40 10:20 13:40 17:15",
				'workday4': "08:10 11:25 14:45 18:25",
				'hollyday': "08:55 12:25 15:50 19:05",
				'hollyday2': "10:05 13:30 16:55 20:10",
				'hollyday3': "*07:40 10:20 13:40 17:15",
				'hollyday4': "08:10 11:25 14:45 18:25",
				'icon': 'bus', 'map': '', city: 'Калининград',
				info2: '* : следует из п.Новое Люблино',
				info4: '* : следует из п.Новое Люблино',
				'img': '',
				'numb': '108'
			}, {
				'title': 'Морское',
				'en': 'Morskoe',
				'description': 'Зеленоградск, Лесное, Дюны, Рыбачий',
				time: '1:45', dist: '72', cost: '170',
				'workday': "05:26 09:55 12:55 18:10",
				'workday2': "07:15 11:46 14:46 20:00",
				'workday3': "07:18 12:00 15:20 20:05",
				'workday4': "09:00 13:50 17:10 21:45",
				info1: 'В зимний период: 05:26 и 18:10',
				info3: 'В зимний период: 05:26 и 18:10',
				'hollyday': "05:26 09:55 12:55 18:10",
				'hollyday2': "07:15 11:46 14:46 20:00",
				'hollyday3': "07:18 12:00 15:20 20:05",
				'hollyday4': "09:00 13:50 17:10 21:45",
				'icon': 'bus', 'map': '', city: 'Калининград',
				'img': 'morskoe',
				'numb': '593'
			},
			{
				'title': 'Пионерский',
				'en': 'Pionerskii',
				'description': 'Переславское, Романово, Заостровье',
				time: ':55', dist: '34', cost: '97',
				'workday': "06:20 06:50 07:20 07:45 08:15 08:45 09:20 09:50 10:20 10:50 11:20 11:50 12:20 12:50 13:20 13:50 14:20 14:50 15:20 15:50 16:20 16:50 17:20 17:50 18:20 18:50 19:20 19:50 20:20 20:50",
				'workday2': "07:11 07:41 08:11 08:41 09:11 09:41 10:11 10:41 11:11 11:41 12:11 12:41 13:11 13:41 14:11 14:41 15:11 15:41 16:11 16:41 17:11 17:41 18:11 18:41 19:11 19:41 20:11 20:41 21:11 21:41",
				'workday3': "06:00 06:30 07:00 07:30 08:00 08:30 09:00 09:30 10:00 10:30 11:00 11:30 12:00 12:30 13:00 13:30 14:00 14:30 15:00 15:30 16:00 16:30 17:00 17:30 18:00 18:30 19:00 19:30 20:00 20:30 21:00 21:30 22:00",
				'workday4': "06:55 07:25 08:03 08:33 09:03 09:33 10:03 10:33 11:03 11:33 12:03 12:33 13:03 13:33 14:03 14:33 15:03 15:33 16:03 16:33 17:03 17:33 18:03 18:33 19:03 19:33 20:03 20:33 20:55 21:25 21:55 22:25 22:55",
				// station:'',
				'hollyday': "06:20 06:50 07:20 07:45 08:15 08:45 09:20 09:50 10:20 10:50 11:20 11:50 12:20 12:50 13:20 13:50 14:20 14:50 15:20 15:50 16:20 16:50 17:20 17:50 18:20 18:50 19:20 19:50 20:20 20:50",
				'hollyday2': "07:11 07:41 08:11 08:41 09:11 09:41 10:11 10:41 11:11 11:41 12:11 12:41 13:11 13:41 14:11 14:41 15:11 15:41 16:11 16:41 17:11 17:41 18:11 18:41 19:11 19:41 20:11 20:41 21:11 21:41",
				'hollyday3': "06:00 06:30 07:00 07:30 08:00 08:30 09:00 09:30 10:00 10:30 11:00 11:30 12:00 12:30 13:00 13:30 14:00 14:30 15:00 15:30 16:00 16:30 17:00 17:30 18:00 18:30 19:00 19:30 20:00 20:30 21:00 21:30 22:00",
				'hollyday4': "06:55 07:25 08:03 08:33 09:03 09:33 10:03 10:33 11:03 11:33 12:03 12:33 13:03 13:33 14:03 14:33 15:03 15:33 16:03 16:33 17:03 17:33 18:03 18:33 19:03 19:33 20:03 20:33 20:55 21:25 21:55 22:25 22:55",
				'icon': 'bus', 'map': '', city: 'Калининград',
				'img': '',
				'numb': '119'
			},
			{
				'title': 'Пионерский',
				'en': 'Pionerskii',
				'description': 'Переславское, Романово, Заостровье',
				time: ':40', dist: '34', cost: '97',
				'workday': "07:35 08:05 08:35 09:05 09:35 10:05 10:35 11:05 11:35 12:05 12:35 13:05 13:35 14:05 14:35 15:05 15:35 16:05 16:35 17:05 17:35 18:05 18:35 19:05",
				'workday2': "08:15 08:45 08:15 09:45 09:15 10:45 10:15 11:45 11:15 12:45 12:15 13:45 13:15 14:45 14:15 15:45 15:15 16:45 16:15 17:45 17:15 18:45 18:15 19:45",
				'workday3': ":",
				'workday4': ":",
				// station:'',
				'hollyday': "07:35 08:05 08:35 09:05 09:35 10:05 10:35 11:05 11:35 12:05 12:35 13:05 13:35 14:05 14:35 15:05 15:35 16:05 16:35 17:05 17:35 18:05 18:35 19:05",
				'hollyday2': "08:15 08:45 08:15 09:45 09:15 10:45 10:15 11:45 11:15 12:45 12:15 13:45 13:15 14:45 14:15 15:45 15:15 16:45 16:15 17:45 17:15 18:45 18:15 19:45",
				'hollyday3': ":",
				'hollyday4': ":",
				'icon': 'bus', 'map': '', city: 'Калининград',
				'img': '',
				'numb': '119э',

			}, {
				'title': 'Светлогорск',
				'en': 'Svetlogorsk',
				'description': 'Холмогоровка, Переславское, Пионерский',
				time: ':50', dist: '34', cost: '96',
				'workday': "06:18 06:45 07:05 07:25 07:45 08:06 08:25 08:45 09:05 09:25 09:45 10:05 10:25 10:45 11:05 11:25 11:45 12:05 12:25 12:45 13:05 13:25 13:45 14:05 14:25 14:45 15:05 15:25 15:45 16:05 16:25 16:45 17:05 17:25 17:45 18:05 18:25 18:45 19:05 19:25 19:45 20:05 20:25 20:42 21:05 21:17 21:55 22:25 22:55",
				'workday2': "07:18 07:45 08:05 08:25 08:45 09:06 09:25 09:45 10:05 10:25 10:45 11:05 11:25 11:45 12:05 12:25 12:45 13:05 13:25 13:45 14:05 14:25 14:45 15:05 15:25 15:45 16:05 16:25 16:45 17:05 17:25 17:45 18:05 18:25 18:45 19:05 19:25 19:45 20:05 20:25 20:45 21:05 21:25 21:42 22:05 22:17 22:55 23:25 23:55",
				'workday3': "06:00 06:20 06:40 07:00 07:20 07:40 08:00 08:20 08:40 09:00 09:20 09:40 10:00 10:20 10:40 11:00 11:20 11:40 12:00 12:20 12:40 13:00 13:20 13:40 14:00 14:20 14:40 15:00 15:20 15:40 16:00 16:20 16:40 17:00 17:20 17:40 18:00 18:20 18:40 19:00 19:20 19:40 20:00 20:20 20:40 21:00 21:15 21:45 22:20",
				'workday4': "06:50 07:10 07:30 07:50 08:10 08:30 08:50 09:10 09:30 09:50 10:10 10:30 10:50 11:10 11:30 11:50 12:10 12:30 12:50 13:10 13:30 13:50 14:10 14:30 14:50 15:10 15:30 15:50 16:10 16:30 16:50 17:10 17:30 17:50 18:10 18:30 18:50 19:10 19:30 19:50 20:10 20:30 20:50 21:10 21:30 21:50 22:05 22:35 23:10",
				'hollyday': "06:18 06:45 07:05 07:25 07:45 08:06 08:25 08:45 09:05 09:25 09:45 10:05 10:25 10:45 11:05 11:25 11:45 12:05 12:25 12:45 13:05 13:25 13:45 14:05 14:25 14:45 15:05 15:25 15:45 16:05 16:25 16:45 17:05 17:25 17:45 18:05 18:25 18:45 19:05 19:25 19:45 20:05 20:25 20:42 21:05 21:17 21:55 22:25 22:55",
				'hollyday2': "07:18 07:45 08:05 08:25 08:45 09:06 09:25 09:45 10:05 10:25 10:45 11:05 11:25 11:45 12:05 12:25 12:45 13:05 13:25 13:45 14:05 14:25 14:45 15:05 15:25 15:45 16:05 16:25 16:45 17:05 17:25 17:45 18:05 18:25 18:45 19:05 19:25 19:45 20:05 20:25 20:45 21:05 21:25 21:42 22:05 22:17 22:55 23:25 23:55",
				'hollyday3': "06:00 06:20 06:40 07:00 07:20 07:40 08:00 08:20 08:40 09:00 09:20 09:40 10:00 10:20 10:40 11:00 11:20 11:40 12:00 12:20 12:40 13:00 13:20 13:40 14:00 14:20 14:40 15:00 15:20 15:40 16:00 16:20 16:40 17:00 17:20 17:40 18:00 18:20 18:40 19:00 19:20 19:40 20:00 20:20 20:40 21:00 21:15 21:45 22:20",
				'hollyday4': "06:50 07:10 07:30 07:50 08:10 08:30 08:50 09:10 09:30 09:50 10:10 10:30 10:50 11:10 11:30 11:50 12:10 12:30 12:50 13:10 13:30 13:50 14:10 14:30 14:50 15:10 15:30 15:50 16:10 16:30 16:50 17:10 17:30 17:50 18:10 18:30 18:50 19:10 19:30 19:50 20:10 20:30 20:50 21:10 21:30 21:50 22:05 22:35 23:10",
				'icon': 'bus', 'map': '', city: 'Калининград',
				'img': 'svetlogorsk',
				'numb': '118',
			}, {
				'title': 'Светлогорск',
				'en': 'Svetlogorsk',
				'description': 'Холмогоровка, Переславское, Пионерский',
				time: ':40', dist: '34', cost: '96',
				'workday': "07:15 07:55 08:15 08:35 08:55 09:35 09:55 10:15 10:40 10:55 11:15 11:35 12:35 12:55 13:15 13:35 13:55 14:15 14:55 15:15 15:35 15:55 16:15 16:35 16:55 17:35 17:55 18:15 18:55 19:15 19:35 19:55 20:15 20:55",
				'workday2': "07:55 08:35 08:55 09:15 09:35 10:15 10:35 11:55 11:20 11:35 12:55 12:15 13:15 13:35 14:55 14:15 14:35 14:57 15:35 15:57 16:15 16:35 16:45 16:15 17:35 18:15 19:35 19:55 19:35 20:55 20:15 20:35 20:55 21:35",
				'workday3': "",
				'workday4': "",
				'hollyday': "07:15 07:55 08:35 08:55 09:35 09:55 10:15 10:40 10:55 11:15 11:35 12:35 12:55 13:15 13:35 13:55 14:15 14:55 15:15 15:35 15:55 16:15 16:35 16:55 17:35 17:55 18:15 18:55 19:15 19:35 19:55 20:15 20:55",
				'hollyday2': "07:55 08:35 09:15 09:35 10:15 10:35 11:55 11:20 11:35 12:55 12:15 13:15 13:35 14:55 14:15 14:35 14:57 15:35 15:57 16:15 16:35 16:45 16:15 17:35 18:15 19:35 19:55 19:35 20:55 20:15 20:35 20:55 21:35",
				'hollyday3': "",
				'hollyday4': "",
				'icon': 'bus', 'map': '', city: 'Калининград',
				'img': 'svetlogorsk',
				'numb': '118э',

			}, {
				'title': 'Янтарный · Синявино',
				'en': 'Yantarnyi · Siniavino',
				'description': 'Переславское, Кругловка, Покровское',
				time: '1:17', dist: '44', cost: '104',
				'workday': "06:47 07:57 08:37 10:27 11:20 11:27 12:27 13:27 14:27 15:27 16:27 17:27 18:27 19:27 20:27 21:27",
				'workday2': "08:05 09:05 09:55 11:45 12:35 12:45 13:45 14:45 15:45 16:45 17:45 18:45 19:45 20:45 21:40 22:45",
				'workday3': "06:00 07:15 08:15 09:25 10:05 11:05 12:05 13:05 14:05 15:05 16:05 17:05 18:05 19:05 20:05 21:05",
				'workday4': "08:05 08:50 09:50 11:00 11:40 12:40 13:40 14:40 15:40 16:40 17:40 18:40 19:40 20:40 21:40 22:40",
				// station:'',
				'hollyday': "06:47 07:57 08:37 10:27 11:20 11:27 12:27 13:27 14:27 15:27 16:27 17:27 18:27 19:27 21:27",
				'hollyday2': "08:05 09:05 09:55 11:45 12:35 12:45 13:45 14:45 15:45 16:45 17:45 18:45 19:45 20:45 22:45",
				'hollyday3': "06:00 07:15 08:15 09:25 10:05 11:05 12:05 13:05 14:05 15:05 16:05 17:05 18:05 19:05 20:05 21:05",
				'hollyday4': "08:05 08:50 09:50 11:00 11:40 12:40 13:40 14:40 15:40 16:40 17:40 18:40 19:40 20:40 21:40 22:40",
				'icon': 'bus', 'map': '', city: 'Калининград',
				'img': 'yant',
				'numb': '120'
			}
		];
		// End Severniy 

		//Советск +
		this.sovetsk = [
			{
				'title': 'Неман',
				'en': 'Neman',
				'numb': '115',
				'description': 'Канаш, Рудаково',
				time: '-:-', dist: '-', cost: '-',
				'workday': "08:36 14:20*",
				'workday2': "09:35 15:20",
				'workday3': "06:45 15:30*",
				'workday4': "08:35 16:46",
				// station:'',
				'hollyday': "08:36 14:20*",
				'hollyday2': "09:35 15:20",
				'hollyday3': "06:45 15:30*",
				'hollyday4': "08:35 16:46",
				'icon': 'bus',
				'map': '',
				city: 'Советск',
				'img': '',
				info1: '* : следует до Рудаково',
				info2: '* : следует из Рудаково',
				info3: '* : следует до Рудаково',
				info4: '* : следует из Рудаково',
			},
			{
				'title': 'Неман',
				'en': 'Neman',
				'numb': '301',
				'description': '',
				time: ':27', dist: '-', cost: '-',
				'workday': "06:00 06:15 06:30 06:45 07:00 07:15 07:30 07:45 08:00 08:15 08:30 08:45 09:00 09:15 09:30 09:45 10:00 10:15 10:45 11:00 11:30 11:45 12:15 12:30 12:45 13:00 13:15 13:30 13:45 14:00 14:15 14:30 14:45 15:00 15:30 16:00 16:15 16:30 16:45 17:00 17:15 17:30 17:45 18:00 18:15 18:30 18:45 19:00 19:15 19:30 19:45 20:00 20:15 20:30 20:45 21:00 21:30 22:00 22:30 23:00",
				'workday2': "06:27 06:42 06:57 07:12 07:27 07:42 07:57 08:12 08:27 08:42 08:57 09:12 09:27 09:42 09:57 10:12 10:27 10:42 11:12 11:27 11:57 12:12 12:42 12:57 13:12 13:27 13:42 13:57 14:12 14:27 14:42 14:57 15:12 15:27 15:57 16:27 16:42 16:57 17:12 17:27 17:42 17:57 18:12 18:27 18:42 18:57 19:12 19:27 19:42 19:57 20:12 20:27 20:42 20:57 21:12 21:27 21:57 22:27 22:57 23:27",
				'workday3': "06:00 06:30 06:45 07:00 07:15 07:30 07:45 08:00 08:15 08:30 08:45 09:00 09:15 09:30 09:45 10:00 10:15 10:45 11:00 11:30 11:45 12:15 12:30 12:45 13:00 13:15 13:30 13:45 14:00 14:15 14:30 14:45 15:00 15:30 16:00 16:15 16:30 16:45 17:00 17:15 17:30 17:45 18:00 18:15 18:30 18:45 19:00 19:15 19:30 19:45 20:00 20:15 20:30 21:00 21:30 22:00 22:30",
				'workday4': "06:27 06:57 07:12 07:27 07:42 07:57 08:12 08:27 08:42 08:57 09:12 09:27 09:42 09:57 10:12 10:27 10:42 11:12 11:27 11:57 12:12 12:42 12:57 13:12 13:27 13:42 13:57 14:12 14:27 14:42 14:57 15:12 15:27 15:57 16:27 16:42 16:57 17:12 17:27 17:42 17:57 18:12 18:27 18:42 18:57 19:12 19:27 19:42 19:57 20:12 20:27 20:42 20:57 21:27 21:57 22:27 22:57",
				// station:'',
				'hollyday': "06:00 06:15 06:30 06:45 07:00 07:15 07:30 07:45 08:00 08:15 08:30 08:45 09:00 09:15 09:30 09:45 10:00 10:15 10:45 11:00 11:30 11:45 12:15 12:30 12:45 13:00 13:15 13:30 13:45 14:00 14:15 14:30 14:45 15:00 15:30 16:00 16:15 16:30 16:45 17:00 17:15 17:30 17:45 18:00 18:15 18:30 18:45 19:00 19:15 19:30 19:45 20:00 20:15 20:30 20:45 21:00 21:30 22:00 22:30 23:00",
				'hollyday2': "06:27 06:42 06:57 07:12 07:27 07:42 07:57 08:12 08:27 08:42 08:57 09:12 09:27 09:42 09:57 10:12 10:27 10:42 11:12 11:27 11:57 12:12 12:42 12:57 13:12 13:27 13:42 13:57 14:12 14:27 14:42 14:57 15:12 15:27 15:57 16:27 16:42 16:57 17:12 17:27 17:42 17:57 18:12 18:27 18:42 18:57 19:12 19:27 19:42 19:57 20:12 20:27 20:42 20:57 21:12 21:27 21:57 22:27 22:57 23:27",
				'hollyday3': "06:00 06:30 06:45 07:00 07:15 07:30 07:45 08:00 08:15 08:30 08:45 09:00 09:15 09:30 09:45 10:00 10:15 10:45 11:00 11:30 11:45 12:15 12:30 12:45 13:00 13:15 13:30 13:45 14:00 14:15 14:30 14:45 15:00 15:30 16:00 16:15 16:30 16:45 17:00 17:15 17:30 17:45 18:00 18:15 18:30 18:45 19:00 19:15 19:30 19:45 20:00 20:15 20:30 21:00 21:30 22:00 22:30",
				'hollyday4': "06:27 06:57 07:12 07:27 07:42 07:57 08:12 08:27 08:42 08:57 09:12 09:27 09:42 09:57 10:12 10:27 10:42 11:12 11:27 11:57 12:12 12:42 12:57 13:12 13:27 13:42 13:57 14:12 14:27 14:42 14:57 15:12 15:27 15:57 16:27 16:42 16:57 17:12 17:27 17:42 17:57 18:12 18:27 18:42 18:57 19:12 19:27 19:42 19:57 20:12 20:27 20:42 20:57 21:27 21:57 22:27 22:57",
				'icon': 'bus',
				'map': '',
				city: 'Советск',
				'img': '',
			},
			{
				'title': 'Славск',
				'en': 'Slavsk',
				'numb': '316',
				'description': '',
				time: ':20', dist: '-', cost: '-',
				'workday': "06:50 07:50 08:50 09:50 10:50 11:50 12:50 13:50 15:50 16:50 17:50",
				'workday2': "07:10 08:10 09:10 10:10 11:10 12:10 13:10 15:10 16:10 17:10 18:10",
				'workday3': "07:20 08:20 09:20 10:20 11:20 12:20 13:20 15:20 16:20 17:20 18:20",
				'workday4': "07:20 08:20 09:20 10:20 11:20 12:20 13:20 15:20 16:20 17:20 18:40",
				info3: '* : Рейс выполняется только по будням',
				info4: '* : Рейс выполняется только по будням',
				'icon': 'bus',
				'map': '',
				city: 'Советск',
				'img': '',
			},
			{
				'title': 'Ясное',
				'en': 'Yasnoe',
				'numb': '317',
				'description': 'Славск',
				time: '1:00', dist: '-', cost: '-',
				'workday': "06:40* 11:20 13:40*",
				'workday2': "07:43 12:19 14:49",
				'workday3': "07:44* 12:40 14:50*",
				'workday4': "08:47 13:40 16:00",
				'hollyday': "06:40* 11:20 13:40*",
				'hollyday2': "07:43 12:19 14:49",
				'hollyday3': "07:44* 12:40 14:50*",
				'hollyday4': "08:47 13:40 16:00",
				info1: '* : следует до Вишневки',
				info2: '* : следует из Вишневки',
				info3: '* : следует до Вишневки',
				info4: '* : следует из Вишневки',
				'icon': 'bus',
				'map': '',
				city: 'Советск',
				'img': '',
			},
			{
				'title': 'Краснознаменск ',
				'en': 'Krasnoznamensk',
				'numb': '321',
				'description': 'Неман',
				time: '1:30', dist: '-', cost: '-',
				'workday': "06:30 12:25 14:50 17:40",
				'workday2': "07:59 13:56 16:03 19:00",
				'workday3': "06:00 08:25 10:30 14:00 17:00 19:10",
				'workday4': "07:15 09:41 11:40 15:35 18:05 20:30",
				'hollyday': "06:30 12:25 14:50 17:40",
				'hollyday2': "07:59 13:56 16:03 19:00",
				'hollyday3': "06:00 08:25 10:30 14:00 17:00 19:10",
				'hollyday4': "07:15 09:41 11:40 15:35 18:05 20:30",
				'icon': 'bus',
				'map': '',
				city: 'Советск',
				'img': '',
			},
			{
				'title': 'Заповедное ',
				'en': 'Zapovednoe',
				'numb': '329',
				'description': 'Славск',
				time: '1:15', dist: '-', cost: '-',
				'workday': "12:45 17:20",
				'workday2': "14:00 18:35",
				'workday3': "08:20 15:00",
				'workday4': "09:45 16:15",
				'hollyday': "12:45 17:20",
				'hollyday2': "14:00 18:35",
				'hollyday3': "08:20 15:00",
				'hollyday4': "09:45 16:15",
				'icon': 'bus',
				'map': '',
				city: 'Советск',
				'img': '',
			},
			{
				'title': 'Мысовка',
				'en': 'Misovka',
				'numb': '344',
				'description': ' Славск, Ясное',
				time: '1:25', dist: '-', cost: '-',
				'workday': "20:15",
				'workday2': "21:20",
				'workday3': "06:00",
				'workday4': "07:25",
				'hollyday': "20:15",
				'hollyday2': "21:20",
				'hollyday3': "06:00",
				'hollyday4': "07:25",
				'icon': 'bus',
				'map': '',
				city: 'Советск',
				'img': '',
			},
			{
				city: 'Советск',
				'title': 'Черняховск',
				'en': 'Chernyahovsk',
				numb: '503',
				'description': ' Славск, Большаково',
				time: '1:45', dist: '-', cost: '-',
				'workday': "06:30 08:20 14:00 17:50 ",
				'workday2': "08:17 10:07 15:45 19:25",
				'workday3': "10:35 16:00 20:10",
				'workday4': "12:20 17:44 21:55",
				'hollyday': "06:30 08:20 14:00 17:50 ",
				'hollyday2': "08:17 10:07 15:45 19:25",
				'hollyday3': "10:35 16:00 20:10",
				'hollyday4': "12:20 17:44 21:55",
				'icon': 'bus',
				'map': '',
				'img': '',
			},
			{
				city: 'Советск',
				'title': 'Причалы',
				'en': 'Prichali',
				numb: '508',
				'description': ' Славск, Прохладное',
				time: '2:00', dist: '-', cost: '-',
				'workday': "05:40 13:05 *16:30",
				'workday2': "07:28 15:25 17:55",
				'workday3': "07:30 15:30 *18:00",
				'workday4': "09:15 17:00 19:25",
				'hollyday': "05:40 13:05 *16:30",
				'hollyday2': "07:28 15:25 17:55",
				'hollyday3': "07:30 15:30 *18:00",
				'hollyday4': "09:15 17:00 19:25",
				'icon': 'bus',
				'map': '',
				'img': '',
				info1: '* : следует до Мысовка',
				info2: '* : следует до Мысовка',
				info3: '* : следует до Мысовка',
				info4: '* : следует до Мысовка',
			},
			{
				city: 'Советск',
				'title': 'Калининград',
				'en': 'Kaliningrad',
				numb: '513',
				'description': 'Новоколхозное, Полесск',
				time: '2:00', dist: '-', cost: '-',
				'workday': "05:00 *06:30 *13:20 15:15 17:20",
				'workday2': "07:54 08:50 15:45 18:09 20:14",
				'workday3': "*09:40 11:00 13:50 *16:50 20:00",
				'workday4': "12:05 13:50 16:40 19:20 22:50",
				'hollyday': "05:00 *06:30 *13:20 15:15 17:20",
				'hollyday2': "07:54 08:50 15:45 18:09 20:14",
				'hollyday3': "*09:40 11:00 13:50 *16:50 20:00",
				'hollyday4': "12:05 13:50 16:40 19:20 22:50",
				'icon': 'bus',
				'map': '',
				'img': '',
				info1: '* : рейсы выполняются автобусами малого класса',
				info2: '* : рейсы выполняются автобусами малого класса',
				info3: '* : рейсы выполняются автобусами малого класса',
				info4: '* : рейсы выполняются автобусами малого класса',
			},
			{
				'title': 'Краснознаменск',
				'en': 'Krasnoznamensk',
				numb: '516',
				city: 'Советск',
				'description': 'Новоколхозное, Полесск',
				time: '1:15', dist: '-', cost: '-',
				'workday': "08:40 19:50",
				'workday2': "09:55 21:00",
				'workday3': "06:00 17:20",
				'workday4': "08:30 19:40",
				'hollyday': "08:40 19:50",
				'hollyday2': "09:55 21:00",
				'hollyday3': "06:00 17:20",
				'hollyday4': "08:30 19:40",
				'icon': 'bus',
				'map': '',
				'img': '',
			},
			{
				'title': 'Высокое',
				'en': 'Visokoe',
				numb: '517',
				city: 'Советск',
				'description': 'Новоколхозное, Полесск',
				time: '1:45', dist: '-', cost: '-',
				'workday': "06:30 *12:15",
				'workday2': "08:16 13:55",
				'workday3': "*08:17 14:00",
				'workday4': "09:55 15:48",
				'hollyday': "06:30 12:15",
				'hollyday2': "08:16 13:55",
				'hollyday3': "08:17 14:00",
				'hollyday4': "09:55 15:48",
				'icon': 'bus',
				'map': '',
				'img': '',
				info1: '* : Пн, Ср, Пт с заездом в Придорожное',
				info2: '* : Пн, Ср, Пт с заездом в Придорожное',
				info3: '* : Пн, Ср, Пт с заездом в Придорожное',
				info4: '* : Пн, Ср, Пт с заездом в Придорожное',
			},
			{
				'title': 'Калининград',
				'en': 'Kaliningrad',
				numb: '522',
				city: 'Советск',
				'description': 'Славск, Полесск',
				time: '3:00', dist: '-', cost: '-',
				'workday': "08:10 12:30",
				'workday2': "11:21 15:42",
				'workday3': "08:00 19:00",
				'workday4': "11:00 22:00",
				'hollyday': "08:10 12:30",
				'hollyday2': "11:21 15:42",
				'hollyday3': "08:00 19:00",
				'hollyday4': "11:00 22:00",
				'icon': 'bus',
				'map': '',
				'img': '',
			},
			{
				'title': 'Калининград',
				'en': 'Kaliningrad',
				numb: '523',
				city: 'Советск',
				'description': 'Славск, Большаково, Гвардейск',
				time: '2:45', dist: '-', cost: '-',
				'workday': "05:55 10:00 15:40",
				'workday2': "08:35 12:45 18:15",
				'workday3': "06:50 08:30 12:40 14:20 20:35",
				'workday4': "09:35 11:15 15:20 17:10 23:10",
				'hollyday': "05:55 10:00 15:40",
				'hollyday2': "08:35 12:45 18:15",
				'hollyday3': "06:50 08:30 12:40 14:20 20:35",
				'hollyday4': "09:35 11:15 15:20 17:10 23:10",
				'icon': 'bus',
				'map': '',
				'img': '',
			},
			{
				'title': 'Черняховск',
				'en': 'Chernyahovsk',
				numb: '530',
				city: 'Советск',
				'description': 'Большаково',
				time: '1:35', dist: '-', cost: '-',
				'workday': "10:20 12:35 14:55",
				'workday2': "11:45 13:55 16:30",
				'workday3': "08:25 12:30 14:20 17:30",
				'workday4': "09:49 13:55 15:40 18:55",
				'hollyday': "10:20 *12:35 14:55",
				'hollyday2': "11:45 13:55 16:30",
				'hollyday3': "08:25 12:30 17:30",
				'hollyday4': "09:49 13:55 18:55",
				'icon': 'bus',
				'map': '',
				'img': '',
			},
			{
				'title': 'Черняховск',
				'en': 'Chernyahovsk',
				numb: '542',
				city: 'Неман',
				'description': 'Ульяново',
				time: '1:25', dist: '-', cost: '-',
				'workday': "07:35",
				'workday2': "09:11",
				'workday3': "05:45",
				'workday4': "07:21",
				'hollyday': "07:35",
				'hollyday2': "09:11",
				'hollyday3': "05:45",
				'hollyday4': "07:21",
				'icon': 'bus',
				'map': '',
				'img': '',
			},
			{
				'title': 'Калининград',
				'en': 'Kaliningrad',
				numb: '543',
				city: 'Советск',
				'description': 'Гвардейск',
				time: '2:20', dist: '-', cost: '-',
				'workday': "05:28 07:35 14:20 18:20",
				'workday2': "07:35 10:10 16:40 20:40",
				'workday3': "10:20",
				'workday4': "12:50",
				'hollyday': "05:28 07:35 14:20 18:20",
				'hollyday2': "07:35 10:10 16:40 20:40",
				'hollyday3': "10:20",
				'hollyday4': "12:50",
				'icon': 'bus',
				'map': '',
				'img': '',
			},
			{
				'title': 'Гусев',
				'en': 'Gusev',
				numb: '573',
				city: 'Советск',
				'description': 'Неман',
				time: '2:20', dist: '-', cost: '-',
				'workday': "08:30 13:40 18:30",
				'workday2': "10:16 15:25 20:14",
				'workday3': "06:20 11:25 16:30",
				'workday4': "08:06 13:10 18:17",
				'hollyday': "*08:30 13:40 18:30",
				'hollyday2': "10:16 15:25 20:14",
				'hollyday3': "11:25 16:30",
				'hollyday4': "13:10 18:17",
				'icon': 'bus',
				'map': '',
				'img': '',
			},
			{
				'title': 'Гусев',
				'en': 'Gusev',
				numb: '573',
				city: 'Советск',
				'description': 'Неман',
				time: '2:20', dist: '-', cost: '-',
				'workday': "08:30 13:40 18:30",
				'workday2': "10:16 15:25 20:14",
				'workday3': "06:20 11:25 16:30",
				'workday4': "08:06 13:10 18:17",
				'hollyday': "*08:30 13:40 18:30",
				'hollyday2': "10:16 15:25 20:14",
				'hollyday3': "11:25 16:30",
				'hollyday4': "13:10 18:17",
				'icon': 'bus',
				'map': '',
				'img': '',
			},
			{
				'title': 'Калининград',
				'en': 'Kaliningrad',
				city: 'Советск',
				'description': 'Полесск, Большаково',
				time: '2:00', dist: '108', cost: '240',
				'workday3': "06:00 07:00 08:00 09:00 10:00 11:00 12:00 13:00 14:00 15:00 16:00 17:00 18:00 *19:00 20:00",
				'workday4': "08:00 09:00 10:00 11:00 12:00 13:00 14:00 15:00 16:00 17:00 18:00 19:00 20:00 21:00 22:00",
				'workday': "07:30 08:30 09:30 10:30 11:30 12:30 13:30 14:30 15:30 16:30 17:30 18:30 19:30 20:30 *21:30",
				'workday2': "09:30 10:30 11:30 12:30 13:30 14:30 15:30 16:30 17:30 18:30 19:30 20:30 21:30 22:30 23:30",
				// station:'',
				'hollyday3': "07:00 08:00 09:00 10:00 11:00 12:00 13:00 14:00 15:00 16:00 17:00 18:00 *19:00 20:00",
				'hollyday4': "09:00 10:00 11:00 12:00 13:00 14:00 15:00 16:00 17:00 18:00 19:00 20:00 21:00 22:00",
				'hollyday': "07:30 09:30 10:30 11:30 12:30 13:30 14:30 15:30 16:30 17:30 18:30 19:30 20:30 *21:30",
				'hollyday2': "09:30 11:30 12:30 13:30 14:30 15:30 16:30 17:30 18:30 19:30 20:30 21:30 22:30 23:30",
				'icon': 'bus', 'map': '',
				'img': 'sovetsk',
				'numb': '600э'
			},
			{
				'title': 'Калининград',
				'en': 'Kaliningrad',
				'description': '',
				city: 'Советск',
				time: '2:00', dist: '108', cost: '240',
				'workday3': "05:30 06:30 07:30 08:30 09:30 10:30 11:30 12:30 13:30 14:30 15:30 16:30 17:30 18:30 19:30",
				'workday4': "07:30 08:30 09:30 10:30 11:30 12:30 13:30 14:30 15:30 16:30 17:30 18:30 19:30 20:30 21:30",
				'workday': "08:00 09:00 10:00 11:00 12:00 13:00 14:00 15:00 16:00 17:00 18:00 19:00 20:00 21:00",
				'workday2': "10:00 11:00 12:00 13:00 14:00 15:00 16:00 17:00 18:00 19:00 20:00 21:00 22:00 23:00",
				// station:'',
				'hollyday3': "07:30 08:30 09:30 10:30 11:30 12:30 13:30 14:30 15:30 16:30 17:30 18:30 19:30",
				'hollyday4': "09:30 10:30 11:30 12:30 13:30 14:30 15:30 16:30 17:30 18:30 19:30 20:30 21:30",
				'hollyday': "10:00 11:00 12:00 13:00 14:00 15:00 16:00 17:00 18:00 19:00 20:00 21:00",
				'hollyday2': "12:00 13:00 14:00 15:00 16:00 17:00 18:00 19:00 20:00 21:00 22:00 23:00",
				'icon': 'bus', 'map': '',
				'img': 'sovetsk',
				'numb': '601э'
			},
		];
		// End Sovetsk

		//Ozersk +
		this.ozersk = [
			{
				'title': 'Смирново',
				'en': 'Smirnovo',
				'numb': '113',
				'description': '',
				city: 'Озерск',
				time: '0:40', dist: '-', cost: '-',
				'workday': "07:00 13:30",
				'workday2': "07:40 14:14",
				'workday3': "07:45 14:15 ",
				'workday4': "08:40 15:10",
				'icon': 'bus',
				'map': '',
				'img': '',
				info3: '* : Рейс выполняется только по будням',
				info4: '* : Рейс выполняется только по будням',
			},
			{
				'title': 'Лужки',
				'en': 'Lujki',
				'numb': '114',
				'description': '',
				city: 'Озёрск',
				time: '0:50', dist: '-', cost: '-',
				'workday': "06:45 14:00",
				'workday2': "07:36 14:53",
				'workday3': "07:45 15:05",
				'workday4': "08:40 15:59",
				'icon': 'bus',
				'map': '',
				'img': '',
				info3: '* : Рейс выполняется только по будням',
				info4: '* : Рейс выполняется только по будням',
			},
			{
				'title': 'Шишкино',
				'en': 'Shishkino',
				'numb': '121',
				'description': '',
				city: 'Озёрск',
				time: '0:25', dist: '-', cost: '-',
				'workday': "06:30 13:20",
				'workday2': "06:55 13:39",
				'workday3': "07:00 13:40",
				'workday4': "07:25 13:59",
				'icon': 'bus',
				'map': '',
				'img': '',
				info3: '* : Рейс выполняется только по будням',
				info4: '* : Рейс выполняется только по будням',
			},
			{
				'title': 'Яблоновка',
				'en': 'Yablonovka',
				'numb': '122',
				'description': 'Кутузово, Псковское',
				city: 'Озёрск',
				time: '0:30', dist: '-', cost: '-',
				'workday': "07:50 13:20 17:10",
				'workday2': "08:20 13:42 17:40",
				'workday3': "08:30 13:43 17:40",
				'workday4': "08:50 13:59 18:00",
				'icon': 'bus',
				'map': '',
				'img': '',
				info3: '* : Рейс выполняется только по будням',
				info4: '* : Рейс выполняется только по будням',
			},
			{
				'title': 'Гусев',
				'en': 'Gusev',
				'numb': '362',
				'description': 'Гурьевское, Замостье, Маяковское',
				city: 'Озёрск',
				time: '0:45', dist: '-', cost: '-',
				'workday': "08:00 09:00 12:25 15:20 17:15 19:06",
				'workday2': "08:45 09:45 13:10 16:05 17:55 19:51",
				'workday3': "07:05 08:00 11:30 14:20 15:40 18:10",
				'workday4': "07:50 08:45 12:15 15:05 16:25 18:55",
				'hollyday': "09:00 12:25 15:20 17:15 19:06",
				'hollyday2': "09:45 13:10 16:05 17:55 19:51",
				'hollyday3': "08:00 11:30 14:20 15:40 18:10",
				'hollyday4': "08:45 12:15 15:05 16:25 18:55",
				'icon': 'bus',
				'map': '',
				'img': '',
			},
			{
				'title': 'Черняховск',
				'en': 'Chernyahovsk',
				'numb': '363',
				'description': 'Красноярское',
				city: 'Озёрск',
				time: '0:48', dist: '-', cost: '-',
				'workday': "07:00 08:20 09:30 10:00 11:00 12:10 14:00 15:50 17:00 18:50",
				'workday2': "07:48 09:08 10:18 10:48 11:48 12:58 14:48 16:38 17:48 19:38",
				'workday3': "08:10 09:10 09:40 10:40 12:00 13:20 15:00 15:30 17:20 18:00 19:40",
				'workday4': "08:58 09:58 10:28 11:28 12:48 14:08 15:48 16:18 18:08 18:44 20:28",
				'hollyday': "07:00 09:30 12:10 17:00 18:50",
				'hollyday2': "07:48 10:18 12:58 17:48 19:38",
				'hollyday3': "08:10 10:40 13:20 18:00 19:40",
				'hollyday4': "08:58 11:28 14:08 18:44 20:28",
				'icon': 'bus',
				'map': '',
				'img': '',
			},
			{
				'title': 'Калининград',
				'en': 'Kaliningrad',
				'numb': '515',
				'description': 'Новогурьевское, Черняховск, Гвардейск',
				city: 'Озёрск',
				time: '2:40', dist: '-', cost: '-',
				'workday': "05:50 13:10",
				'workday2': "08:30 15:50",
				'workday3': "09:10 16:20 18:50",
				'workday4': "11:40 18:59 21:22",
				'hollyday': "05:50 13:10",
				'hollyday2': "08:30 15:50",
				'hollyday3': "09:10 16:20 18:50 ",
				'hollyday4': "11:40 18:59 21:22",
				'icon': 'bus',
				'map': '',
				'img': '',
			},
			{
				'title': 'Калининград',
				'en': 'Kaliningrad',
				'numb': '525',
				'description': 'Железнодорожный, Правдинск',
				city: 'Озёрск',
				time: '3:15', dist: '-', cost: '-',
				'workday': "07:45 15:55",
				'workday2': "11:02 19:12",
				'workday3': "11:20 20:00",
				'workday4': "14:37 23:17",
				'hollyday': "07:45 15:55",
				'hollyday2': "11:02 19:12",
				'hollyday3': "11:20 20:00",
				'hollyday4': "14:37 23:17",
				'icon': 'bus',
				'map': '',
				'img': '',
			},
			{
				'title': 'Калининград',
				'en': 'Kaliningrad',
				'numb': '527',
				'description': 'Правдинск',
				city: 'Озёрск',
				time: '3:15', dist: '-', cost: '-',
				'workday': "07:00",
				'workday2': "10:15 ",
				'workday3': "16:15",
				'workday4': "19:30",
				'hollyday': "07:00",
				'hollyday2': "10:15",
				'hollyday3': "16:15",
				'hollyday4': "19:30",
				'icon': 'bus',
				'map': '',
				'img': '',
			},
			{
				'title': 'Калининград',
				'en': 'Kaliningrad',
				'numb': '554',
				'description': 'Гвардейск',
				city: 'Озёрск',
				time: '2:30', dist: '-', cost: '-',
				'workday': "14:30",
				'workday2': "17:01",
				'workday3': "--:--",
				'workday4': "--:--",
				'hollyday': "14:30",
				'hollyday2': "17:01",
				'hollyday3': "--:--",
				'hollyday4': "--:--",
				'icon': 'bus',
				'map': '',
				'img': '',
			},
			{
				'title': 'Калининград',
				'en': 'Kaliningrad',
				'numb': '554',
				'description': 'Правдинск',
				city: 'Озёрск',
				time: '3:06', dist: '-', cost: '-',
				'workday': "06:00",
				'workday2': "09:06",
				'workday3': "10:20 18:15",
				'workday4': "13:26 21:21",
				'hollyday': "06:00",
				'hollyday2': "09:06",
				'hollyday3': "10:20 18:15",
				'hollyday4': "13:26 21:21",
				'icon': 'bus',
				'map': '',
				'img': '',
			},
			{
				'title': 'Карамышево',
				'en': 'Karamishevo',
				'numb': '555',
				'description': 'Черняховск',
				city: 'Калининград',
				time: '2:20', dist: '-', cost: '-',
				'workday': "06:30 10:30",
				'workday2': "09:25 12:40",
				'workday3': "13:05 17:00",
				'workday4': "15:25 19:05",
				'hollyday': "06:30 10:30",
				'hollyday2': "09:25 12:40",
				'hollyday3': "13:05 17:00",
				'hollyday4': "15:25 19:05",
				'icon': 'bus',
				'map': '',
				'img': '',
			},
			{
				'title': 'Калининград',
				'en': 'Kaliningrad',
				'numb': '555',
				'description': 'Черняховск',
				city: 'Карамышево',
				time: '0:20', dist: '-', cost: '-',
				'workday': "15:30 19:10",
				'workday2': "15:50 19:30",
				'workday3': "06:00 10:00",
				'workday4': "06:25 10:25",
				'hollyday': "15:30 19:10",
				'hollyday2': "15:50 19:30",
				'hollyday3': "06:00 10:00",
				'hollyday4': "06:25 10:25",
				'icon': 'bus',
				'map': '',
				'img': '',
			},
			{
				'title': 'Черняховск',
				'en': 'Chernyahovsk',
				'numb': '564',
				'description': 'Демидовка, Липки',
				city: 'Озёрск',
				time: '1:45', dist: '-', cost: '-',
				'workday': "07:00 11:30",
				'workday2': "08:45 13:18",
				'workday3': "09:00 13:30",
				'workday4': "10:45 15:16",
				'hollyday': "07:00 11:30",
				'hollyday2': "08:45 13:18",
				'hollyday3': "09:00 13:30",
				'hollyday4': "10:45 15:16",
				'icon': 'bus',
				'map': '',
				'img': '',
			},
			{
				'title': 'Черняховск',
				'en': 'Chernyahovsk',
				'numb': '565',
				'description': 'Новостроево, Демидовка',
				city: 'Озёрск',
				time: '1:35', dist: '-', cost: '-',
				'workday': "06:00 12:30 16:50",
				'workday2': "07:35 14:10 18:30",
				'workday3': "07:40 14:40 18:40",
				'workday4': "09:20 16:20 20:20",
				'hollyday': "06:00 12:30 16:50",
				'hollyday2': "07:35 14:10 18:30",
				'hollyday3': "07:40 14:40 18:40",
				'hollyday4': "09:20 16:20 20:20",
				'icon': 'bus',
				'map': '',
				'img': '',
				info1: 'рейсы выполняются с заездом в п. Демидовка по Пн и Пт',
				info2: 'рейсы выполняются с заездом в п. Демидовка по Пн и Пт',
				info3: 'рейсы выполняются с заездом в п. Демидовка по Пн и Пт',
				info4: 'рейсы выполняются с заездом в п. Демидовка по Пн и Пт',
			},
			{
				'title': 'Калининград',
				'en': 'Kaliningrad',
				'numb': '566',
				'description': 'Гвардейск',
				city: 'Озёрск',
				time: '2:50', dist: '-', cost: '-',
				'workday': "07:50 16:30",
				'workday2': "10:40 18:45",
				'workday3': "14:00",
				'workday4': "16:50",
				'hollyday': "07:50 16:30",
				'hollyday2': "10:40 18:45",
				'hollyday3': "14:00",
				'hollyday4': "16:50",
				'icon': 'bus',
				'map': '',
				'img': '',
			},
		];
		// End ozersk

		//Cherniahovsk +
		this.chernahovsk = [
			{
				'title': 'Покровское',
				'en': 'Pokrovskoe',
				'numb': '101',
				'description': 'Придорожное',
				time: '1:00', dist: '-', cost: '-',
				'workday': "05:45 08:50 13:10 17:15",
				'workday2': "06:47 09:49 14:13 18:17",
				'workday3': "06:50 09:50 14:15 18:18",
				'workday4': "07:53 10:51 15:18 19:19",
				// station:'',
				'hollyday': "06:45 13:10 17:15",
				'hollyday2': "07:47 14:13 18:17",
				'hollyday3': "07:50 14:15 18:18",
				'hollyday4': "08:50 15:18 19:19",
				city: 'Черняховск',
				'icon': 'bus',
				'map': '',
				'img': '',
			},
			{
				'title': 'Щеглы',
				'en': 'Shchegli',
				'numb': '102',
				'description': 'Низменное, Загорское, Садовое',
				time: '0:48', dist: '-', cost: '-',
				'workday': "05:50 08:20 14:00 17:45",
				'workday2': "06:37 09:09 14:48 18:37",
				'workday3': "06:40 09:15 15:00 18:40",
				'workday4': "07:27 10:06 15:51 19:28",
				// station:'',
				'hollyday': "07:50 14:00 17:45",
				'hollyday2': "08:39 14:48 18:37",
				'hollyday3': "08:45 15:00 18:40",
				'hollyday4': "09:36 15:51 19:28",
				city: 'Черняховск',
				'icon': 'bus',
				'map': '',
				'img': '',
			},
			{
				'title': 'Краснооктябрьское',
				'en': 'Krasnooktyabrskoe',
				'numb': '105',
				'description': 'Садовое',
				time: '1:00', dist: '-', cost: '-',
				'workday': "05:25 08:35 13:15 17:50",
				'workday2': "06:38 09:49 14:30 19:05",
				'workday3': "06:40 09:50 14:32 19:07",
				'workday4': "07:54 11:04 15:47 20:21",
				// station:'',
				'hollyday': "08:35 13:15",
				'hollyday2': "09:49 14:30",
				'hollyday3': "09:50 14:32",
				'hollyday4': "11:04 15:47",
				city: 'Черняховск',
				'icon': 'bus',
				'map': '',
				'img': '',
			},
			{
				'title': 'Гремячье',
				'en': 'Gremiache',
				'numb': '105к',
				'description': 'Тимирязево',
				time: '0:30', dist: '-', cost: '-',
				'workday': " 06:25 08:50 12:10 14:50 17:10 *18:20",
				'workday2': "06:54 09:19 12:39 15:19 17:39 18:38",
				'workday3': "06:55 09:20 12:40 15:20 17:40 *18:40",
				'workday4': "07:24 09:49 13:09 15:49 18:08 18:58",
				// station:'',
				'hollyday': " 06:25 08:50 12:10 14:50 17:10 *18:20",
				'hollyday2': "06:54 09:19 12:39 15:19 17:39 18:38",
				'hollyday3': "06:55 09:20 12:40 15:20 17:40 *18:40",
				'hollyday4': "07:24 09:49 13:09 15:49 18:08 18:58",
				city: 'Черняховск',
				'icon': 'bus',
				'map': '',
				'img': '',
				info1: '* : выполняется ежедневно, кроме выходных и праздничных дней до пос.Доваторовка',
				info2: '* : выполняется ежедневно, кроме выходных и праздничных дней до пос.Доваторовка',
				info3: '* : выполняется ежедневно, кроме выходных и праздничных дней до пос.Доваторовка',
				info4: '* : выполняется ежедневно, кроме выходных и праздничных дней до пос.Доваторовка',
			},
			{
				'title': 'Зеленый бор',
				'en': 'Zelenyi bor',
				'numb': '108',
				'description': 'Тимофеевка',
				time: '0:35', dist: '-', cost: '-',
				'workday': "06:30 12:00 14:00 17:30",
				'workday2': " 07:05 12:35 14:35 18:05",
				'workday3': "07:10 12:38 14:37 18:06",
				'workday4': "07:45 13:13 15:12 18:30",
				// station:'',
				'hollyday': "06:30 12:00 14:00 17:30",
				'hollyday2': "07:05 12:35 14:35 18:05",
				'hollyday3': "07:10 12:38 14:37 18:06",
				'hollyday4': "07:45 13:13 15:12 18:30",
				city: 'Черняховск',
				'icon': 'bus',
				'map': '',
			},
			{
				'title': 'Пушкарево',
				'en': 'Pushkarevo',
				'numb': '119',
				'description': 'Междуречье',
				time: '0:45', dist: '-', cost: '-',
				'workday': "07:55 14:20",
				'workday2': "08:39 15:04",
				'workday3': "08:40 15:05 ",
				'workday4': "09:24 15:48",
				// station:'',
				'hollyday': "07:55 14:20",
				'hollyday2': "08:39 15:04",
				'hollyday3': "08:40 15:05 ",
				'hollyday4': "09:24 15:48",
				city: 'Черняховск',
				'icon': 'bus',
				'map': '',
			},
			{
				'title': 'Зеленцово',
				'en': 'Zelentcovo',
				'numb': '127',
				'description': 'Тельманово, Свобода',
				time: '0:35', dist: '-', cost: '-',
				'workday': "06:25 12:50 17:20",
				'workday2': "07:01 13:29 17:59",
				'workday3': "07:03 13:30 18:00",
				'workday4': "07:40 14:09 18:38",
				// station:'',
				'hollyday': "12:50",
				'hollyday2': "13:29",
				'hollyday3': "13:30",
				'hollyday4': "14:09",
				city: 'Черняховск',
				'icon': 'bus',
				'map': '',
			},
			{
				'title': 'Гусев',
				'en': 'Gusev',
				'numb': '343',
				'description': 'Лермантово',
				time: ':40', dist: '-', cost: '-',
				'workday': " 07:41",
				'workday2': "08:20",
				'workday3': "06:55",
				'workday4': "07:36",
				// station:'',
				'hollyday': " 07:41",
				'hollyday2': "08:20",
				'hollyday3': "06:55",
				'hollyday4': "07:36",
				city: 'Черняховск',
				'icon': 'bus',
				'map': '',
			},
			{
				'title': 'Озерск',
				'en': 'Ozersk',
				'numb': '363',
				'description': 'Шувалово, Новое Гурьевское',
				time: ':48', dist: '-', cost: '-',
				'workday': "08:10 09:10 09:40 10:40 12:00 13:20 15:00 15:30 17:20 18:00 19:40",
				'workday2': "08:58 09:58 10:28 11:28 12:48 14:08 15:48 16:18 18:08 18:44 20:28",
				'workday3': "07:00 08:20 09:30 10:00 11:00 12:10 14:00 15:50 17:00 18:50",
				'workday4': "07:48 09:08 10:18 10:48 11:48 12:58 14:48 16:38 17:48 19:38",
				// station:'',
				'hollyday': "08:10 09:40 10:40 13:20 15:30 18:00 19:40",
				'hollyday2': "08:58 10:28 11:28 14:08 16:18 18:44 20:28",
				'hollyday3': "07:00 09:30 11:00 12:10 17:00 18:50",
				'hollyday4': "07:48 10:18 11:48 12:58 17:48 19:38",
				city: 'Черняховск',
				'icon': 'bus',
				'map': '',
			},
			{
				'title': 'Советск',
				'en': 'Sovetsk',
				'numb': '503',
				'description': 'Калиновка, Большаково, Славск',
				time: '1:45', dist: '-', cost: '-',
				'workday': "10:35 16:00 20:10",
				'workday2': "12:20 17:44 21:55",
				'workday3': "06:30 08:20 14:00 17:50",
				'workday4': "08:17 10:07 15:45 19:25",
				// station:'',
				'hollyday': "10:35 16:00 20:10",
				'hollyday2': "12:20 17:44 21:55",
				'hollyday3': "06:30 08:20 14:00 17:50",
				'hollyday4': "08:17 10:07 15:45 19:25",
				city: 'Черняховск',
				'icon': 'bus',
				'map': '',
			},
			{
				'title': 'Озёрск',
				'en': 'Ozersk',
				'numb': '515',
				'description': 'Красноярское',
				time: '0:35', dist: '-', cost: '-',
				'workday': "11:05 18:25 20:45 ",
				'workday2': "11:40 18:59 21:22",
				'workday3': "05:50 13:10",
				'workday4': "06:30 13:50",
				// station:'',
				'hollyday': "11:05 18:25 20:45 ",
				'hollyday2': "11:40 18:59 21:22",
				'hollyday3': "05:50 13:10",
				'hollyday4': "06:30 13:50",
				city: 'Калининград',
				'icon': 'bus',
				'map': '',
			},
			{
				'title': 'Калининград',
				'en': 'Kaliningrad',
				'numb': '515',
				'description': 'Гвардейск',
				time: '1:55', dist: '-', cost: '-',
				'workday': "06:35 13:55",
				'workday2': "08:30 15:50",
				'workday3': "09:10 16:20 18:50",
				'workday4': "11:00 18:20 20:40",
				// station:'',
				'hollyday': "06:35 13:55",
				'hollyday2': "08:30 15:50",
				'hollyday3': "09:10 16:20 18:50",
				'hollyday4': "11:00 18:20 20:40",
				city: 'Озёрск',
				'icon': 'bus',
				'map': '',
			},
			{
				'title': 'Калининград',
				'en': 'Kaliningrad',
				'numb': '520',
				'description': 'Железнодорожный, Правдинск, Домново',
				time: '3:27', dist: '-', cost: '319',
				'workday': "04:50 09:30 15:10 18:00",
				'workday2': "07:27 12:43 18:27 21:27",
				'workday3': "05:20 11:50 13:25 19:00",
				'workday4': "08:24 14:54 16:38 22:13",
				// station:'',
				'hollyday': "09:30 15:10 18:00",
				'hollyday2': "12:43 18:27 21:27",
				'hollyday3': "05:20 11:50 13:25 19:00",
				'hollyday4': "08:24 14:54 16:38 22:13",
				city: 'Черняховск',
				'icon': 'bus',
				'map': '',
			},
			{
				'title': 'Краснознаменск',
				'en': 'Krasnoznamensk',
				'numb': '526',
				'description': 'Гусев, Нестеров',
				time: '2:15', dist: '-', cost: '-',
				'workday': "09:15 17:55",
				'workday2': "11:32 20:12",
				'workday3': "06:20 13:35",
				'workday4': "09:15 16:15",
				// station:'',
				'hollyday': "09:15 17:55",
				'hollyday2': "11:32 20:12",
				'hollyday3': "06:20 13:35",
				'hollyday4': "09:15 16:15",
				city: 'Калининград',
				'icon': 'bus',
				'map': '',
			},
			{
				'title': 'Калининград',
				'en': 'Kaliningrad',
				'numb': '526',
				'description': 'Гвардейск',
				time: '1:55', dist: '-', cost: '-',
				'workday': "09:20 16:20",
				'workday2': "11:15 18:20",
				'workday3': "07:10 15:50",
				'workday4': "09:00 17:40",
				// station:'',
				'hollyday': "09:20 16:20",
				'hollyday2': "11:15 18:20",
				'hollyday3': "07:10 15:50",
				'hollyday4': "09:00 17:40",
				city: 'Краснознаменск',
				'icon': 'bus',
				'map': '',
			},
			{
				'title': 'Советск',
				'en': 'Sovetsk',
				'numb': '530',
				'description': 'Большаково',
				time: '1:25', dist: '-', cost: '-',
				'workday': "08:25 12:30 14:20 17:30",
				'workday2': "09:49 13:55 15:40 18:55",
				'workday3': "10:20 12:35 14:55",
				'workday4': "11:45 13:55 16:30",
				// station:'',
				'hollyday': "08:25 12:30 17:30",
				'hollyday2': "09:49 13:55 18:55",
				'hollyday3': "10:20 14:55",
				'hollyday4': "11:45 16:30",
				city: 'Черняховск',
				'icon': 'bus',
				'map': '',
			},
			{
				'title': 'Неман',
				'en': 'Neman',
				'numb': '542',
				'description': 'Ульяново',
				time: '1:40', dist: '-', cost: '-',
				'workday': "*05:45 12:00",
				'workday2': "07:21 13:18",
				'workday3': "*07:35 13:30",
				'workday4': "09:11 14:51",
				// station:'',
				'hollyday': "*05:45 12:00",
				'hollyday2': "07:21 13:18",
				'hollyday3': "*07:35 13:30",
				'hollyday4': "09:11 14:51",
				city: 'Черняховск',
				'icon': 'bus',
				'map': '',
				info1: '* : рейс выполняется до Советска',
				info2: '* : рейс выполняется из Советска',
				info3: '* : рейс выполняется до Советска',
				info4: '* : рейс выполняется из Советска',

			},
			{
				'title': 'Калининград',
				'en': 'Kaliningrad',
				'numb': '554',
				'description': 'Гвардейск',
				time: '2:17', dist: '-', cost: '-',
				'workday': "15:15",
				'workday2': "17:32",
				'workday3': "--:--",
				'workday4': "--:--",
				// station:'',
				'hollyday': "15:15",
				'hollyday2': "17:32",
				'hollyday3': "--:--",
				'hollyday4': "--:--",
				city: 'Озёрск',
				'icon': 'bus',
				'map': '',
			},
			{
				'title': 'Карамышево',
				'en': 'Karamishevo',
				'numb': '555',
				'description': 'Озёрск',
				time: '1:00', dist: '-', cost: '-',
				'workday': "14:50 18:30",
				'workday2': "15:50 19:30",
				'workday3': "06:00 10:00",
				'workday4': "07:18 11:05",
				'hollyday': "14:50 18:30",
				'hollyday2': "15:50 19:30",
				'hollyday3': "06:00 10:00",
				'hollyday4': "07:18 11:05",
				city: 'Калининград',
				'icon': 'bus',
				'map': '',
			},
			{
				'title': 'Калининград',
				'en': 'Kaliningrad',
				'numb': '555',
				'description': '',
				time: '1:30', dist: '-', cost: '-',
				'workday': "07:23 11:10",
				'workday2': "09:25 12:40",
				'workday3': "13:05 17:00",
				'workday4': "14:45 18:25",
				'hollyday': "07:23 11:10",
				'hollyday2': "09:25 12:40",
				'hollyday3': "13:05 17:00",
				'hollyday4': "14:45 18:25",
				city: 'Карамышево',
				'icon': 'bus',
				'map': '',
			},
			{
				'title': 'Озёрск',
				'en': 'Ozersk',
				'numb': '564',
				'description': 'Свобода, Липки, Демидовка',
				time: '1:45', dist: '-', cost: '-',
				'workday': "09:00 13:30",
				'workday2': "10:45 15:16",
				'workday3': "07:00 11:30",
				'workday4': "08:45 13:43",
				'hollyday': "09:00 13:30",
				'hollyday2': "10:45 15:16",
				'hollyday3': "07:00 11:30",
				'hollyday4': "08:45 13:43",
				city: 'Черняховск',
				'icon': 'bus',
				'map': '',
			},
			{
				'title': 'Озёрск',
				'en': 'Ozersk',
				'numb': '565',
				'description': 'Новостроево, Демидовка',
				time: '1:30', dist: '-', cost: '-',
				'workday': "07:40 14:40 18:40",
				'workday2': "09:10 16:10 20:10",
				'workday3': "06:00 12:30 16:50",
				'workday4': "07:25 14:10 18:30",
				'hollyday': "07:40 14:40 18:40",
				'hollyday2': "09:10 16:10 20:10",
				'hollyday3': "06:00 12:30 16:50",
				'hollyday4': "07:25 14:10 18:30",
				city: 'Черняховск',
				'icon': 'bus',
				'map': '',
				info1: '* : по Пн и Пт с заездом в п.Демидовка',
				info2: '* : по Пн и Пт с заездом в п.Демидовка',
			},
			{
				'title': 'Озёрск',
				'en': 'Ozersk',
				'numb': '566',
				'description': 'Красноярское',
				time: '0:45', dist: '-', cost: '-',
				'workday': "16:05",
				'workday2': "16:50",
				'workday3': "07:50 16:20",
				'workday4': "08:32 17:10 ",
				'hollyday': "16:05",
				'hollyday2': "16:50",
				'hollyday3': "07:50 16:20",
				'hollyday4': "08:32 17:10 ",
				city: 'Калининград',
				'icon': 'bus',
			},
			{
				'title': 'Калининград',
				'en': 'Kaliningrad',
				'numb': '566',
				'description': 'Гвардейск',
				city: 'Озёрск',
				time: '2:00', dist: '-', cost: '-',
				'workday': "08:38 17:15",
				'workday2': "10:40 18:45",
				'workday3': "14:00",
				'workday4': "16:00",
				'hollyday': "08:38 17:15",
				'hollyday2': "10:40 18:45",
				'hollyday3': "14:00",
				'hollyday4': "16:00",
				'icon': 'bus',
			},
			{
				'title': 'Калининград',
				'en': 'Kaliningrad',
				'numb': '567',
				'description': 'Железнодорожный, Правдинск, Гвардейск',
				city: 'Черняховск',
				time: '5:10', dist: '-', cost: '-',
				'workday': "07:00 13:00",
				'workday2': "11:10 17:10",
				'workday3': "08:10 15:30",
				'workday4': "12:20 19:40",
				'hollyday': "07:00 13:00",
				'hollyday2': "11:10 17:10",
				'hollyday3': "08:10 15:30",
				'hollyday4': "12:20 19:40",
				'icon': 'bus',
			},
			{
				'title': 'Гусев',
				'en': 'Gusev',
				'numb': '580',
				'description': 'Лермантово',
				city: 'Калининград',
				time: '0:30', dist: '-', cost: '-',
				'workday': "19:25 23:30",
				'workday2': "19:55 00:05",
				'workday3': "05:00 17:10",
				'workday4': "05:30 17:40",
				'icon': 'bus',
				'hollyday': "19:25 23:30",
				'hollyday2': "19:55 00:05",
				'hollyday3': "05:00 17:10",
				'hollyday4': "05:30 17:40",
			},
			{
				'title': 'Гусев',
				'en': 'Gusev',
				'numb': '580',
				'description': 'Лермантово',
				city: 'Светлогорск',
				time: '0:40', dist: '-', cost: '-',
				'workday': "*14:45 21:40",
				'workday2': "15:25 22:18",
				'workday3': "*06:20 14:00",
				'workday4': "06:50 14:38",
				'icon': 'bus',
				'hollyday': "*14:45 21:40",
				'hollyday2': "15:25 22:18",
				'hollyday3': "*06:20 14:00",
				'hollyday4': "06:50 14:38",
				'info1': "Рейс выполняется с 01.05 по 30.09",
				'info2': "Рейс выполняется с 01.05 по 30.09",
				'info3': "Рейс выполняется с 01.05 по 30.09",
				'info4': "Рейс выполняется с 01.05 по 30.09",
			},
			{
				'title': 'Светлогорск',
				'en': 'Svetlogorsk',
				'numb': '581',
				'description': 'Гвардейск, Калининград',
				city: 'Гусев',
				time: '3:25', dist: '-', cost: '-',
				'workday': "*06:55 14:43",
				'workday2': "10:30 18:10",
				'workday3': "*11:35 *18:35",
				'workday4': "14:40 21:39",
				'icon': 'bus',
				'hollyday': "*06:55 14:43",
				'hollyday2': "10:30 18:10",
				'hollyday3': "*11:35 *18:35",
				'hollyday4': "14:40 21:39",
				'info1': "Рейс выполняется с 01.05 по 30.09",
				'info2': "Рейс выполняется с 01.05 по 30.09",
				'info3': "Рейс выполняется с 01.05 по 30.09",
				'info4': "Рейс выполняется с 01.05 по 30.09",
			},
			{
				'title': 'Калининград',
				'en': 'Kaliningrad',
				'numb': '583',
				'description': 'Гвардейск',
				city: 'Чернышевское',
				time: '1:50', dist: '-', cost: '250',
				'workday': "08:05 10:10 11:25 19:05",
				'workday2': "09:55 12:00 13:15 20:55",
				'workday3': "09:45 11:50 14:20",
				'workday4': "11:35 13:40 16:10",
				'icon': 'bus',
				'hollyday': "08:05 10:10 11:25 19:05",
				'hollyday2': "09:55 12:00 13:15 20:55",
				'hollyday3': "09:45 11:50 14:20",
				'hollyday4': "11:35 13:40 16:10",
			},
			{
				'title': 'Чернышевское',
				'en': 'Chernishevskoe',
				'numb': '583',
				'description': 'Гусев, Нестеров',
				city: 'Калининград',
				time: '1:20', dist: '-', cost: '250',
				'workday': "11:40 13:45 16:15",
				'workday2': "13:01 15:17 17:40",
				'workday3': "*06:55 *09:00 *10:15 17:30",
				'workday4': "08:00 10:05 11:20 19:00",
				'icon': 'bus',
				'hollyday': "11:40 13:45 16:15",
				'hollyday2': "13:01 15:17 17:40",
				'hollyday3': "*06:55 *09:00 *10:15 17:30",
				'hollyday4': "08:00 10:05 11:20 19:00",
				info1: '* : рейс выполняется до Нестерова',
				info2: '* : рейс выполняется из Нестерова',
				info3: '* : рейс выполняется до Нестерова',
				info4: '* : рейс выполняется из Нестерова',
			},
			{
				'title': 'Калининград',
				'en': 'Kaliningrad',
				'numb': '680э',
				'description': '',
				city: 'Гусев',
				time: '1:30', dist: '-', cost: '-',
				'workday': "05:58 06:23 *06:55 07:13 07:38 08:28 08:53 09:43 10:33 10:58 11:48 12:10 12:38 13:03 13:28 14:18 14:58 15:33 15:58 16:48 18:20 19:50",
				'workday2': "07:28 07:53 08:25 08:43 09:08 09:58 10:23 11:13 12:03 12:28 13:18 13:40 14:08 14:33 14:58 15:48 16:26 17:03 17:28 18:18 19:50 21:20",
				'workday3': "08:00 08:2 08:50 09:25 10:20 10:50 11:20 12:10 12:30 *12:55 13:25 13:50 14:40 15:05 15:30 16:45 17:10 18:00 18:25 19:15 19:30 20:30 21:00",
				'workday4': "09:30 09:55 10:20 10:55 11:50 12:20 12:50 13:35 14:00 14:25 14:55 15:20 16:10 16:35 17:00 18:15 18:40 19:30 19:55 20:45 21:00 22:00 22:30",
				'icon': 'bus',
				'hollyday': "05:58 06:23 *06:55 07:13 07:38 08:28 08:53 09:43 10:33 10:58 11:48 12:10 12:38 13:03 13:28 14:18 14:58 15:33 15:58 16:48 18:20 18:33 19:50",
				'hollyday2': "07:28 07:53 08:25 08:43 09:08 09:58 10:23 11:13 12:03 12:28 13:18 13:40 14:08 14:33 14:58 15:48 16:26 17:03 17:28 18:18 19:50 20:03 21:20",
				'hollyday3': "08:00 08:2 08:50 09:25 10:20 10:50 11:20 12:10 12:30 *12:55 13:25 13:50 14:40 15:05 15:30 16:45 17:10 18:00 18:25 19:15 19:30 20:30 21:00",
				'hollyday4': "09:30 09:55 10:20 10:55 11:50 12:20 12:50 13:35 14:00 14:25 14:55 15:20 16:10 16:35 17:00 18:15 18:40 19:30 19:55 20:45 21:00 22:00 22:30",
				info1: '* : рейс выполняется с 01.10 по 30.04',
				info2: '* : рейс выполняется с 01.10 по 30.04',
				info3: '* : рейс выполняется с 01.10 по 30.04',
				info4: '* : рейс выполняется с 01.10 по 30.04',
			},
			{
				'title': 'Гусев',
				'en': 'Gusev',
				'numb': '680э',
				'description': '',
				city: 'Калининград',
				time: '0:30', dist: '-', cost: '-',
				'workday': "09:33 10:00 10:25 11:00 11:55 12:25 12:55 13:40 14:05 *14:30 15:00 15:25 16:15 16:40 17:05 18:20 18:45 19:33 20:00 20:48 21:01 22:05 22:35",
				'workday2': "10:03 10:30 10:55 11:35 12:25 12:55 13:25 14:10 14:35 15:00 15:30 15:55 16:45 17:10 17:35 18:50 19:15 20:03 20:30 21:18 21:30 22:35 22:35",
				'workday3': "05:25 05:50 *06:20 06:40 07:00 07:50 08:20 09:10 10:00 10:25 11:15 11:35 12:05 12:30 12:55 13:45 14:25 15:00 15:25 16:15 17:45 19:15",
				'workday4': "05:55 06:20 06:50 07:10 07:35 08:25 08:50 09:40 10:30 10:55 11:45 12:05 12:35 13:00 13:25 14:15 14:55 15:30 15:55 16:45 18:15 19:45",
				'icon': 'bus',
				'hollyday': "09:33 10:00 10:25 11:00 11:55 12:25 12:55 13:40 14:05 *14:30 15:00 15:25 16:15 16:40 17:05 18:20 18:45 19:33 20:00 20:48 21:01 22:05 22:35",
				'hollyday2': "10:03 10:30 10:55 11:35 12:25 12:55 13:25 14:10 14:35 15:00 15:30 15:55 16:45 17:10 17:35 18:50 19:15 20:03 20:30 21:18 21:30 22:35 22:35",
				'hollyday3': "05:25 05:50 *06:20 06:40 07:00 07:50 08:20 09:10 10:00 10:25 11:15 11:35 12:05 12:30 12:55 13:45 14:25 15:00 15:25 16:15 17:45 18:00 19:15",
				'hollyday4': "05:55 06:20 06:50 07:10 07:35 08:25 08:50 09:40 10:30 10:55 11:45 12:05 12:35 13:00 13:25 14:15 14:55 15:30 15:55 16:45 18:15 18:30 19:45",
				info1: '* : рейс выполняется с 01.10 по 30.04',
				info2: '* : рейс выполняется с 01.10 по 30.04',
				info3: '* : рейс выполняется с 01.10 по 30.04',
				info4: '* : рейс выполняется с 01.10 по 30.04',
			},
		];
		// End Cherniahovsk

		//Гусев
		this.gusev = [
			{
				'title': 'Неман',
				'en': 'Neman',
				'numb': '115',
				'description': 'Канаш, Рудаково',
				time: '-:-', dist: '-', cost: '-',
				'workday': "08:36 14:20*",
				'workday2': "09:35 15:20",
				'workday3': "06:45 15:30*",
				'workday4': "08:35 16:46",
				// station:'',
				'hollyday': "08:36 14:20*",
				'hollyday2': "09:35 15:20",
				'hollyday3': "06:45 15:30*",
				'hollyday4': "08:35 16:46",
				'icon': 'bus',
				'map': '',
				city: 'Советск',
				'img': '',
				info1: '* : следует до Рудаково',
				info2: '* : следует до Рудаково',
				info3: '* : следует до Рудаково',
				info4: '* : следует до Рудаково',
			},
		];
		// End gusev
		this.parom = [
			{
				'title': 'Балтийская коса',
				'en': 'Baltiiskaya kosa',
				'description': 'паром - Балтийск, п.Коса',
				time: '0:07', dist: '1', cost: '50',
				'workday': "07:20 10:00 12:00 14:00 16:00 18:00 20:00 21:30",
				'workday2': "07:27 10:07 12:07 14:07 16:07 18:07 20:07 21:35",
				'workday3': "07:30 10:10 12:10 14:10 16:10 18:10 20:10 21:40",
				'workday4': "07:37 10:17 12:17 14:17 16:17 18:17 20:17 22:45",
				'hollyday': "07:20 10:00 12:00 14:00 16:00 18:00 20:00 21:30",
				'hollyday2': "07:27 10:07 12:07 14:07 16:07 18:07 20:07 21:35",
				'hollyday3': "07:30 10:10 12:10 14:10 16:10 18:10 20:10 21:40",
				'hollyday4': "07:37 10:17 12:17 14:17 16:17 18:17 20:17 22:45",
				'icon': 'boat', 'map': '', city: 'Калининград',
				'img': 'blt',
				'numb': ''
			}
		]

	}

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
