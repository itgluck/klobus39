import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';


@Component({
 selector:"rout-zel",
 templateUrl: 'zel.html',
})
export class RoutZel {

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
				'time':'06:40',
				'time2':'15:40', //6809
				'time3':'17:33', //6913
				'time4':'18:40', //6815
				},
				{'title':'Калининград Северный',
				'bullet_type':'def',
				'time':'06:47',
				'time2':'15:48',
				'time3':'17:41',
				'time4':'18:48',
				},
				{'title':'Кутузово-Новое',
				'bullet_type':'def',
				'time':'06:52',
				'time2':'15:54',
				'time3':'17:47',
				'time4':'18:53',
				},
				{'title':'7 км',
				'bullet_type':'def',
				'time':'06:59',
				'time2':'16:01',
				'time3':'17:54',
				'time4':'19:00',
				},
				{'title':'Рябиновка',
				'bullet_type':'def',
				'time':'07:04',
				'time2':'16:05',
				'time3':'17:58',
				'time4':'19:04',
				},
				{'title':'Каштановка',
				'bullet_type':'def',
				'time':'07:09',
				'time2':'16:10',
				'time3':'18:03',
				'time4':'19:09',
				},
				{'title':'Муромское',
				'bullet_type':'def',
				'time':'07:13',
				'time2':'16:14',
				'time3':'18:07',
				'time4':'19:13',
				},
				{'title':'Сосновка',
				'bullet_type':'var',
				'time':'--:--',
				'time2':'16:19',
				'time3':'18:12',
				'time4':'19:18',
				},
				{'title':'Зеленоградск-новый',
				'bullet_type':'def start',
				'time':'07:21',
				'time2':'16:25',
				'time3':'18:18', 
				'time4':'19:24',
				}
  ],

this.backs = [
				{'title':'Зеленоградск-новый',
				'bullet_type':'def start',
				'time':'07:44', //6802
				'time2':'17:19', //6810
				'time3':'18:46', //6812
				'time4':'19:49', //6814
				},
				{'title':'Сосновка',
				'bullet_type':'var',
				'time':'07:50',
				'time2':'--:--',
				'time3':'--:--',
				'time4':'--:--',
				},
				{'title':'Муромское',
				'bullet_type':'def',
				'time':'07:54',
				'time2':'17:27',
				'time3':'18:54',
				'time4':'19:57',
				},
				{'title':'Каштановка',
				'bullet_type':'def',
				'time':'07:58',
				'time2':'17:31',
				'time3':'18:58',
				'time4':'20:01',
				},
				{'title':'Рябиновка',
				'bullet_type':'def',
				'time':'08:03',
				'time2':'17:36',
				'time3':'19:04',
				'time4':'20:07',
				},
				{'title':'7 км',
				'bullet_type':'def',
				'time':'08:07',
				'time2':'17:40',
				'time3':'19:08',
				'time4':'20:11',
				},
				{'title':'Кутузово-Новое',
				'bullet_type':'def',
				'time':'08:14',
				'time2':'17:47',
				'time3':'19:15',
				'time4':'20:18',
				},
				{'title':'Калининград Северный',
				'bullet_type':'def',
				'time':'08:21',
				'time2':'17:55',
				'time3':'19:22',
				'time4':'20:25',
				},
				{'title':'Калининград Южный',
				'bullet_type':'def start',
				'time':'08:27',
				'time2':'18:01',
				'time3':'19:28',
				'time4':'20:31',
				}
  			]
   }

// Навигация. 

 goToRout(item) {
 this.navCtrl.push(RoutZel , { item: item });
 }

}