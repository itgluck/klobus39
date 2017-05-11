import { Component } from '@angular/core';
import { NavController,Platform} from 'ionic-angular';
import {GoogleMap, GoogleMapsEvent, GoogleMapsLatLng} from 'ionic-native';

@Component({
  selector: 'page4',
  templateUrl: 'page4.html'
})
export class Page4 {

map: GoogleMap;

  constructor(public navCtrl: NavController, public platform: Platform) {
    
    platform.ready().then(() => {
      this.loadMap();
    });
  }

loadMap(){
    // somewhere in your component
    let klg = new GoogleMapsLatLng(54.70649,20.509);

    this.map = new GoogleMap('map',{
      'backgroundColor': 'white',
          'controls': {
            'compass': true,
            'myklgButton': true,
            'indoorPicker': true,
            'zoom': true
          },
           'gestures': {
            'scroll': true,
            'tilt': true,
            'rotate': true,
            'zoom': true
          },
          'camera': {
            'latLng': klg,
            'tilt': 45,
            'zoom': 12,
            'bearing': 0
          }
    });
   
    // let marker = new GoogleMapsMarker(this.map);
    // marker.setTitle("Teste");
    // marker.setPosition(klg);

    // this.map.setCenter(latLng);
    // this.map.setZoom(12);

     let severniy = new GoogleMapsLatLng(54.70649,20.509);
     this.map.addMarker(severniy);

    this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {console.log('Map is ready!');
  });
  
}


}