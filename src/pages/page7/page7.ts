import { Component, ViewChild } from '@angular/core';
import { Slides, Content } from 'ionic-angular';

@Component({
  templateUrl:'page7.html',
})
export class Page7 { 
 items= []; 
 cars=[];
//  tabs=[];
//  autobtn: string = "taxi";

  constructor() {
// this.autobtn= "taxi";
this.tabs = ["Такси", "Аренда авто"];

  
 this.items = [
       {'title':'Агат',
       'description':'',
       'call':'+74012391821',
      },
        {'title':'Аллё',
       'description':'',
       'call':'+74012999944'
      },
        {'title':'Арбат ',
       'description':'',
       'call':'++74012727272'
      },
        {'title':'Бриз',
       'description':'',
       'call':'+74012577200'
      },
        {'title':'Вираж',
       'description':'',
       'call':'+74012756406'
      },
        {'title':'Вокруг света ',
       'description':'',
       'call':'+74012563030'
      },
        {'title':'Вояж',
       'description':'',
       'call':'+74012365666'
      },
        {'title':'Городское',
       'description':'',
       'call':'+74012767777'
      },
        {'title':'Дельфин',
       'description':'',
       'call':'+74012771771'
      },
        {'title':'Зеленоглазое',
       'description':'',
       'call':'+74012356563'
      },
        {'title':'Зoo',
       'description':'*перевозка животных',
       'call':'+74012507506'
      },
        {'title':'Калининградский таксопарк',
       'description':'',
       'call':'+74012585858'
      },
        {'title':'Калининградское',
       'description':'',
       'call':'+74012999997'
      },
        {'title':'Кобра',
       'description':'',
       'call':'+74012919191'
      },
        {'title':'Конкорд',
       'description':'',
       'call':'+74012779495'
      },
        {'title':'Максим',
       'description':'',
       'call':'+74012999666'
      },
        {'title':'Марсель',
       'description':'',
       'call':'+74012768888'
      },
        {'title':'Навигатор',
       'description':'',
       'call':'+74012555525'
      },
        {'title':'Парадиз',
       'description':'',
       'call':'+74012930303'
      },
        {'title':'Просто Такси',
       'description':'',
       'call':'+74012777101'
      },
        {'title':'Пятерочка',
       'description':'',
       'call':'+74012555555'
      },
        {'title':'Сити Плюс ',
       'description':'',
       'call':'+74012602602'
      }
 ];

  this.cars = [
       {'title':'АвтоРентаПлюс',
       'description':'ул. А. Невского, 120, Калининград',
       'call':'8 (401) 237-60-00'
      }, 
      {'title':'Автопрокат № 1',
       'description':'Советский пр., 182, Калининград',
       'call':'8 (401) 238-88-88'
      },
      {'title':'Автопрокат-Алиса Голд',
       'description':'ул. А. Невского, 36В, Калининград',
       'call':'8 (401) 252-16-15'
      },
      {'title':'Центр проката автомобилей',
       'description':'ул. Портовая, 1, Калининград',
       'call':'8 (401) 277-08-07'
      },
      {'title':'Сити Рент',
       'description':'просп. Мира, 50, Калининград',
       'call':'8 (401) 250-91-91'
      },
      {'title':'Сити Рент',
       'description':'Московский пр-кт, 182А, Калининград',
       'call':'8 (401) 250-91-91'
      },
      {'title':'Лидер Прокат',
       'description':'ул. Менделеева, 61 Б, Калининград',
       'call':'8 (401) 269-79-79'
      },
      {'title':'Аэропорт Храброво',
       'description':'пос. Храброво, Калининградская область',
       'call':'8 (401) 261-04-15'
      },
      {'title':'Royal Rent',
       'description':'ул. Генделя, 5, Калининград',
       'call':'8 (952) 795-61-71'
      },
      {'title':'АРЕНА',
       'description':'ул. Октябрьская, 8, Калининград',
       'call':'8 (981) 477-02-86'
      },
      {'title':'Автопрокат 39',
       'description':'ул. Эпроновская, 1, Калининград',
       'call':'8 (401) 290-07-90'
      },
      {'title':'Rentcars39',
       'description':'ул. Гайдара, 120, Калининград',
       'call':'8 (906) 219-99-17'
      },
      {'title':'ООО БАЛТИКРЕНТ',
       'description':'Ленинский пр., 131, Калининград',
       'call':'8 (401) 290-44-33'
      },
      {'title':'MAXRENT',
       'description':'ул. Юбилейная, 2, Калининград',
       'call':'8 (401) 299-94-44'
      },
      {'title':'Авто-Рентал',
       'description':'Храброво, Калининградская обл',
       'call':'8 (401) 275-88-55'
      },
      {'title':'ООО Балттрансавто',
       'description':'ул. Киевская, 19, Калининград',
       'call':'8 (401) 263-11-35'
      },
      {'title':'Прокат Авто',
       'description':'Житомирская ул., 18, Калининград',
       'call':''
      },
  ];

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

}


