import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';

// import {SocialSharing} from '@ionic-native/social-sharing';    

@Component({
  selector: 'page6',
  templateUrl: 'page6.html'
})
export class Page6 {
    AlertController; 
    alertCtrl;
  constructor( alertCtrl: AlertController, 
    // private socialSharing: SocialSharing
  ){
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
			window.open('mailto:it.gluck@ya.ru?subject=Предложение-Отзыв о работе сервиса KLoBus39&body=App build v3.1 */ Здравсвуйте, уважаемые разработчики!');
          }
        }
      ]
    });
   confirm.present();
  }
	doUpdate() {
    let confirm = this.alertCtrl.create({
      title: 'Отценить',
      message: 'Будем рады Вашему отзыву<p><h6>Версия приложения: 3.1</h6></p>',
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
			window.open('https://play.google.com/store/apps/details?id=com.itgluck.klobus39');
          }
        }
      ]
    });
   confirm.present();
  }

}