import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';


@Component({
 selector:"rout-blt",
 templateUrl: 'blt.html',
})

export class RoutBlt {
// Exp
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
				'time':'08:50',
				'time2': '18:05',
					},
				{'title':'Западный-новый',
				'bullet_type':'def',
				'time':'08:59',
				'time2': '18:14',
					},
				{'title':'Лесное-новое',
				'bullet_type':'def',
				'time':'09:08',
				'time2':'18:22',
					},
				{'title':'о.п. 13 км',
				'bullet_type':'def',
				'time':'09:12',
				'time2':'18:26',
					},
				{'title':'Люблино',
				'bullet_type':'def',
				'time':'09:15',
				'time2':'18:29',
					},
				{'title':'о.п. 18 км',
				'bullet_type':'def',
				'time':'09:19',
				'time2':'18:33',
					},
				{'title':'Шиповка',
				'bullet_type':'def',
				'time':'09:24',
				'time2':'18:38',
					},
				{'title':'о.п. 29 км',
				'bullet_type':'def',
				'time':'--:--',
				'time2':'18:45',
					},
				{'title':'о.п. 33 км',
				'bullet_type':'disable',
				'time':'--:--',
				'time2':'--:--',
					},
				{'title':'Приморск-новый',
				'bullet_type':'def',
				'time':'--:--',
				'time2':'18:51',
					},
				{'title':'Мечниково',
				'bullet_type':'def',
				'time':'--:--',
				'time2':'18:58',
					},
				{'title':'о.п. 45 км',
				'bullet_type':'def',
				'time':'--:--',
				'time2':'19:02',
					},
				{'title':'Балтийск',
				'bullet_type':'def start',
				'time':'--:--',
				'time2':'19:06',
					}
						],

this.backs= [
		{'title':'Балтийск',
			'bullet_type':'def start',
			'time':'06:19',
			'time2':'--:--',
				}, {'title':'о.п. 45 км',
			'bullet_type':'def',
			'time':'06:23',
			'time2':'--:--',
				},{'title':'Мечниково',
			'bullet_type':'def',
			'time':'06:27',
			'time2':'--:--',
				},{'title':'Приморск-новый',
			'bullet_type':'def',
			'time':'06:34',
			'time2':'--:--',
				},{'title':'о.п. 33 км',
			'bullet_type':'disable',
			'time':'--:--',
			'time2':'--:--',
				}, {'title':'о.п. 29 км',
			'bullet_type':'def',
			'time':'06:41',
			'time2':'--:--',
				}, {'title':'Шиповка',
			'bullet_type':'def',
			'time':'06:48',
			'time2':'17:00',
				},{'title':'о.п. 18 км',
			'bullet_type':'def',
			'time':'06:53',
			'time2':'17:05',
				}, {'title':'Люблино',
			'bullet_type':'def',
			'time':'06:58',
			'time2':'17:10',
				}, {'title':'о.п. 13 км',
			'bullet_type':'def',
			'time':'07:01',
			'time2':'17:13',
				},  {'title':'Лесное-новое',
			'bullet_type':'def',
			'time':'07:05',
			'time2':'17:17',
				}, {'title':'Западный-новый',
			'bullet_type':'def',
			'time':'07:14',
			'time2': '17:26',
				}, {'title':'Калининград Южный',
			'bullet_type':'def start',
			'time':'07:22',
			'time2': '17:34',
				}
	 ]
  
 }
// Навигация. 

 goToRout(item) {
 this.navCtrl.push(RoutBlt , { item: item });
 }

}


