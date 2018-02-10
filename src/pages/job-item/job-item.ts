import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, Platform, Events } from 'ionic-angular';
import { ApplyPage } from '../apply/apply';
import { BloggerProvider } from '../../providers/blogger/blogger'
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions
} from '@ionic-native/google-maps';

@Component({
  selector: 'page-job-item',
  templateUrl: 'job-item.html',
})
export class JobItemPage {

  selectedItem: any;
  title: string;
  content: string;

  map: GoogleMap;
  lat: number;
  lng: number;


  constructor(private navCtrl: NavController,
    public navParams: NavParams,
    public blogger: BloggerProvider,
    public platform: Platform,
    private ga: GoogleAnalytics,
    public events: Events,
    private zone: NgZone ) {
    // If we navigated to this page, we will have an item available as a nav param
    var postid = navParams.get('item');
    this.title = navParams.get('title');
    console.log('postid: ' + postid)

    this.events.subscribe('updateScreen', () => {
      this.zone.run(() => {
        console.log('force update the screen');
      });
    });

    platform.ready().then(() => {
      this.refreshData(postid);
    });
  }

  refreshData(postid) {
    console.log('GetPost');
    this.blogger.getPostById(postid).then(data => {
      this.selectedItem = data;
      if (data['location'] != null) {
        this.lat = data['location']['lat'];
        this.lng = data['location']['lng'];
      }
      var tempContent: string = data['content'];
      if (tempContent.indexOf("&nbsp; &nbsp; &nbsp;") > 0) {
        this.content = tempContent.substring(0, tempContent.indexOf("&nbsp; &nbsp; &nbsp;"));
      } else {
        this.content = tempContent;
      }
      //refresh
      // this.events.publish('updateScreen');
      if (this.platform.is('cordova')) {
        this.loadMap();
      }
      // console.log(this.content);
    }, (err) => {
      console.log(err);
    });
  }

  ionViewDidEnter() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      this.ga.trackView("JobItem Page for " + this.title);
      console.log("JobItem Page enter");
    });
  }

  apply(event, title, item) {
    console.log('title:' + title);
    this.navCtrl.push(ApplyPage, { title: title, item: item });
  }

  loadMap() {
    if (this.lat != null) {
      console.log('loadmap');
      let mapOptions: GoogleMapOptions = {
        controls: {
          compass: true,
          myLocationButton: true,
          indoorPicker: true,
          zoom: true
        },
        camera: {
          target: {
            lat: this.lat,
            lng: this.lng
          },
          tilt: 30,
          zoom: 13,
          bearing: 50
        }
      };

      this.map = GoogleMaps.create('map', mapOptions);
      console.log('done');
      this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
        console.log('Map is ready!');

        // Now you can use all methods safely.
        this.map.addMarker({
          title: this.title,
          icon: 'blue',
          animation: 'DROP',
          position: {
            lat: this.lat,
            lng: this.lng
          }
        }).then(marker => {
          marker.on(GoogleMapsEvent.MARKER_CLICK)
            .subscribe(() => {
              marker.showInfoWindow();
            });
        });
      }).catch((r) => {
        console.log('error maps: ' + JSON.stringify(r));
      });;
    }
  }

}
