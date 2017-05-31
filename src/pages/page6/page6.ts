import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

/*
  Generated class for the Page6 page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page6',
  templateUrl: 'page6.html'
})
export class Page6 {
    AlertController; 
    alertCtrl;
    // Uri:any;
	constructor(private nav: NavController, alertCtrl: AlertController){
		this.nav = nav;
    this.alertCtrl= alertCtrl;

}

	doMessage() {
    let confirm = this.alertCtrl.create({
      title: 'Напишите нам',
      message: 'Если у Вас есть идеи - как улучшить приложение или Вы заметили неточность в данных, пожалуйста сообщите нам.',
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
			window.open('mailto:it.gluck@ya.ru?subject=Предложение-Отзыв о работе сервиса KLoBus39&body=App build v1.1.  Здравсвуй, уважаемые разработчики!');
          }
        }
      ]
    });
   confirm.present();
  }
	doUpdate() {
    let confirm = this.alertCtrl.create({
      title: 'Отценить',
      message: 'Будем рады Вашему отзыву<p><h6>Текущая версия: 1.1</h6></p>',
      buttons: [
        {
          text: 'Отмена',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Отценить',
          handler: () => {
            console.log('Rate clicked');			
			window.open('http://goo.gl/7O8QKI');
          }
        }
      ]
    });
   confirm.present();
  }

doMap(){

  window.open('geo:lat,lon?q=address', '_system');
  // window.open('geo:lat,lon?q=Kaliningrad', '_system');
  
//     Uri gmmIntentUri = Uri.parse("geo:37.7749,-122.4194");
// Intent mapIntent = new Intent(Intent.ACTION_VIEW, gmmIntentUri);
// mapIntent.setPackage("com.google.android.apps.maps");
// if (mapIntent.resolveActivity(getPackageManager()) != null) {
// startActivity(mapIntent);
// 	}
}
}