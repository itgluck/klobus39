import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides, Content, AlertController } from 'ionic-angular';

// TrainPage
@Component({
    templateUrl: 'train.html'
})
export class TrainDetails {
    item: any;
    alertCtrl;

    constructor(params: NavParams, public navCtrl: NavController, alertCtrl: AlertController) {
        this.item = params.data.item;
        this.tabs = ["Из Калининграда", "В Калининград"];
        this.alertCtrl=alertCtrl;
    }
    // ScrollTabs
    @ViewChild('SwipedTabsSlider') SwipedTabsSlider: Slides;
    @ViewChild('scroll') scroll: Content;

    SwipedTabsIndicator: any = null;
    tabs: any = [];

    ionViewDidEnter() {
        this.SwipedTabsIndicator = document.getElementById("indicator");
    }

    selectTab(index) {
        this.SwipedTabsIndicator.style.webkitTransform = 'translate3d(' + (100 * index) + '%,0,0)';
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

    doMessage() {
		let confirm = this.alertCtrl.create({
		  title: 'Напишите нам',
		  message: 'Если у Вас есть идеи - как улучшить приложение или Вы заметили неточность в данных',
		  buttons: [
			{
			  text: 'Не сейчас',
			  handler: () => {
				console.log('Cancel clicked');
			  }
			},
			{
			  text: 'Написать',
			  handler: () => {
				console.log('Message clicked');			
				window.open('mailto:it.gluck@ya.ru?subject=Отзыв мобильное приложение KLoBus39&body=Версия приложения v3.6.1 */Здравсвуйте, ');			  }
			}
		  ]
		});
	   confirm.present();
	  }

}