import { Component } from '@angular/core';
import { NavParams, NavController} from 'ionic-angular';



@Component({
	selector: 'promo-slide',
	template: `
	<ion-slides (click)="goPromo()" autoplay="3000" loop="true" speed="1200">
    <ion-slide >
     <img src="assets/promo/promo2.jpg">
    </ion-slide>
    <ion-slide >
      <img src="assets/promo/promo1.jpg">
    </ion-slide>
    <ion-slide >
      <img src="assets/promo/promo3.jpg">
    </ion-slide> 
  </ion-slides>
					`
})
// export class PromoSlide {
// 	constructor(){

// 	}
// }

export class Promo { 
	item: any;
	promolist = [];

	constructor(public navCtrl: NavController, public params: NavParams) {

	}


	// Promo route
	goPromo() {
		this.navCtrl.push(DetailsPromo);
	}

}


@Component({
	templateUrl: 'promo.html',
})
export class DetailsPromo {
	item: any;
	spisok: any;
	menubtn: string = "workday";
	//  details: string = "time";
	// isAndroid: boolean = true;

	constructor(params: NavParams, public navCtrl: NavController) {

		this.item = params.data.item;
		this.menubtn = "workday";
		// this.isAndroid = platform.is('android');
	}

}