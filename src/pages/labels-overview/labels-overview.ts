import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { BloggerProvider } from '../../providers/blogger/blogger'
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { HTTP } from '@ionic-native/http';
import { LabelPage } from '../label/label';

@Component({
  selector: 'page-labels-overview',
  templateUrl: 'labels-overview.html',
})
export class LabelsOverviewPage {

  labels: any;
  urlLabels: string = 'http://www.truejobsindia.com/feeds/posts/default/-/LabelToFilterBy?max-results=50&alt=json';

  constructor(public navCtrl: NavController,
              public blogger: BloggerProvider,
              public platform: Platform,
              public navParams: NavParams,
              private ga: GoogleAnalytics,
              private http2: HTTP) {
    platform.ready().then(() => {
      this.getAllLabels();
    });
  }

  labelTapped(event, label) {
    this.navCtrl.push(LabelPage, { label: label });
  }

  getAllLabels() {
    console.log("getAllLabels");
    let headers = { "Accept": "application/json"};
    this.http2.get(this.urlLabels ,{}, headers)
     .then(data => {
        this.labels = JSON.parse(data.data);
        this.labels = this.labels.feed.category;
         console.log(data.status);
         console.log(data.headers);
        }).catch(error => {
          console.log(error.status);
          console.log(error.error); // error message as string
          console.log(error.headers);
        })
  }


  ionViewDidEnter() {
    this.platform.ready().then(() => {
          // Okay, so the platform is ready and our plugins are available.
          this.ga.trackView("Labels overview Page");
          console.log("Labels overview Page enter");
    });
  }
}
