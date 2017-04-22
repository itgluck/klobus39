import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

@Component({
 selector:"rout-bgrt",
 templateUrl: 'bgrt.html',
})
export class RoutBgrt {

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
				'time':'07:45',
					},
				{'title':'о.п. 4км',
				'bullet_type':'def',
				'time':'07:52',
					},
				{'title':'Дзержинская-новая',
				'bullet_type':'disable',
				'time':'--:--',
					},
				{'title':'о.п. 6 км',
				'bullet_type':'disable',
				'time':'--:--',
					},
				{'title':'о.п. Отважное',
				'bullet_type':'def',
				'time':'08:03',
					},
				{'title':'Владимиров',
				'bullet_type':'def',
				'time':'08:08',
					},
				{'title':'о.п. 18 км',
				'bullet_type':'def',
				'time':'08:14',
					},
				{'title':'о.п. 20 км',
				'bullet_type':'def',
				'time':'--:--',
				'time2':'08:17',
					},
				{'title':'о.п. 21 км',
				'bullet_type':'def',
				'time':'08:19',
					},
				{'title':'Стрельня Новая',
				'bullet_type':'def start',
				'time':'08:24',
					},
				{'title':'Багратионовск',
				'bullet_type':'disable',
				'time':'--:--',
					}
	 ],
this.backs = [
				{'title':'Багратионовск',
				'bullet_type':'disable',
				'time':'--:--',
					},
				{'title':'Стрельня Новая',
				'bullet_type':'def start',
				'time':'19:10',
					},
				{'title':'о.п. 21 км',
				'bullet_type':'def',
				'time':'19:13',
					},
				{'title':'о.п. 20 км',
				'bullet_type':'def',
				'time':'19:16',
					},
				{'title':'о.п. 18 км',
				'bullet_type':'def',
				'time':'19:21',
					},
				{'title':'Владимиров',
				'bullet_type':'def',
				'time':'19:27',
					},
				{'title':'о.п. Отважное',
				'bullet_type':'def',
				'time':'19:33',
					},
				{'title':'о.п. 6 км',
				'bullet_type':'disable',
				'time':'--:--',
					},
				{'title':'Дзержинская-новая',
				'bullet_type':'disable',
				'time':'--:--',
					},
				{'title':'о.п. 4км',
				'bullet_type':'def',
				'time':'19:43',
					},
				{'title':'Калининград Южный',
				'bullet_type':'def start',
				'time':'19:50',
					}
				]

    }

// Навигация. 

 goToRout(item) {
 this.navCtrl.push(RoutBgrt , { item: item });
 }

}

//  END*
