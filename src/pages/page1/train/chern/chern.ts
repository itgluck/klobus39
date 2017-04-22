import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';


@Component({
 selector:"rout-chern",
 templateUrl: 'chern.html',
})
export class RoutChern {

 items = [];
 backs= [];
 item:any;

	menubtn: string = "out";
	isAndroid: boolean = true;

 constructor(public navCtrl: NavController, params: NavParams) {

this.menubtn= "out";
this.item = params.data.item;
 
  this.items = [
				{'title':'Калининград Южный',
				'bullet_type':'def start',
				'time':'18:00',
					},
				{'title':'Айвазовская',
				'bullet_type':'def',
				'time':'18:08',
					},
				{'title':'Луговое-новое',
				'bullet_type':'def',
				'time':'18:14',
					},
				{'title':'1271 км',
				'bullet_type':'def',
				'time':'18:19',
					},
				{'title':'Комсомольск-западный',
				'bullet_type':'def',
				'time':'18:24',
					},
				{'title':'Озерки-Новые',
				'bullet_type':'def',
				'time':'18:31',
					},
				{'title':'1252 км',
				'bullet_type':'def',
				'time':'18:37',
					},
				{'title':'Гвардейск',
				'bullet_type':'def',
				'time':'18:44',
					},
				{'title':'Знаменск',
				'bullet_type':'def',
				'time':'18:52',
					},
				{'title':'Пушкарево',
				'bullet_type':'def',
				'time':'19:01',
					},
				{'title':'Междуречье',
				'bullet_type':'def',
				'time':'19:11',
					},
				{'title':'Пастухово',
				'bullet_type':'def',
				'time':'19:19',
					},
				{'title':'Черняховск',
				'bullet_type':'def start',
				'time':'19:30',
					},
  ],
  this.backs = [
				{'title':'Черняховск',
				'bullet_type':'def start',
				'time':'07:07',
					},
				{'title':'Пастухово',
				'bullet_type':'def',
				'time':'07:17',
					},
				{'title':'Междуречье',
				'bullet_type':'def',
				'time':'07:24',
					},
				{'title':'Пушкарево',
				'bullet_type':'def',
				'time':'07:33',
					},
				{'title':'Знаменск',
				'bullet_type':'def',
				'time':'07:41',
					},
				{'title':'Гвардейск',
				'bullet_type':'def',
				'time':'07:49',
					},
				{'title':'1252 км',
				'bullet_type':'def',
				'time':'07:55',
					},
				{'title':'Озерки-Новые',
				'bullet_type':'def',
				'time':'08:02',
					},
				{'title':'Комсомольск-западный',
				'bullet_type':'def',
				'time':'08:10',
					},
				{'title':'1271 км',
				'bullet_type':'def',
				'time':'08:14',
					},
				{'title':'Луговое-новое',
				'bullet_type':'def',
				'time':'08:19',
					},
				{'title':'Айвазовская',
				'bullet_type':'def',
				'time':'08:25',
					},
				{'title':'Калининград Южный',
				'bullet_type':'def start',
				'time':'08:34',
					},
  			]
   }

// Навигация. 

 goToRout(item) {
 this.navCtrl.push(RoutChern , { item: item });
 }

}