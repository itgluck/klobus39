import { Component } from '@angular/core';
import { NavController,Platform} from 'ionic-angular';// import {GoogleMap, GoogleMapsEvent, GoogleMapsLatLng} from 'ionic-native';
import {
 GoogleMaps,
 GoogleMap,
 GoogleMapsEvent,
 LatLng,
 CameraPosition,
 MarkerOptions
} from '@ionic-native/google-maps';


@Component({
  selector: 'page4',
  templateUrl: 'page4.html'
})
export class Page4 {

// map: GoogleMap;

  constructor(public navCtrl: NavController, public platform: Platform ,public googleMaps: GoogleMaps) {
    
    platform.ready().then(() => {
      this.loadMap();
    });
  }


loadMap(){
 let element: HTMLElement = document.getElementById('map');

 let map: GoogleMap = this.googleMaps.create(element);

 // listen to MAP_READY event
 // You must wait for this event to fire before adding something to the map or modifying it in anyway
 map.one(GoogleMapsEvent.MAP_READY).then(
   () => {
     console.log('Map is ready!');
     // Now you can add elements to the map like the marker
   }
 );

  let ionic: LatLng = new LatLng(54.70649, 20.509);

 // create CameraPosition
 let position: CameraPosition = {
   target: ionic,
   zoom: 18,
   tilt: 30
 };

 // move the map's camera to position
 map.moveCamera(position);

// create new marker
 let markerOptions: MarkerOptions = {
   position: ionic,
   title: 'Ionic'
 };

//  const marker: Marker = map.addMarker(markerOptions)
//    .then((marker: Marker) => {
//       marker.showInfoWindow();
//     });


//  map.addMarker(markerOptions)
//    .then((marker: Marker) => {
//      marker.showInfoWindow();
//    });

//  }

  // map ready event
        map.one(GoogleMapsEvent.MAP_READY)
            //move camera to position
            .then(() => map.moveCamera(position))
            //add a marker
            .then(() => map.addMarker(markerOptions),
                //show some info
                (marker) => marker.showInfoWindow());

    // let klg = new LatLng(54.70649,20.509);

    // this.map = new GoogleMap('map',{
    //   'backgroundColor': 'white',
    //       'controls': {
    //         'compass': true,
    //         'myklgButton': true,
    //         'indoorPicker': true,
    //         'zoom': true
    //       },
    //        'gestures': {
    //         'scroll': true,
    //         'tilt': true,
    //         'rotate': true,
    //         'zoom': true
    //       },
    //       'camera': {
    //         'latLng': klg,
    //         'tilt': 45,
    //         'zoom': 12,
    //         'bearing': 0
    //       }
    // });
   
    // let marker = new GoogleMapsMarker(this.map);
    // marker.setTitle("Teste");
    // marker.setPosition(klg);

    // this.map.setCenter(latLng);
    // this.map.setZoom(12);

//      let severniy = new LatLng(54.70649,20.509);
//      this.map.addMarker(severniy);

//     this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {console.log('Map is ready!');
//   });
  
// }


}
}