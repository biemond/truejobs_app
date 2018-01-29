import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { JobItemPage } from '../job-item/job-item';
import { LabelPage } from '../label/label';
import { BloggerProvider } from '../../providers/blogger/blogger'
import { GoogleAnalytics } from '@ionic-native/google-analytics';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  items: any;

  constructor(public navCtrl: NavController,
              public blogger: BloggerProvider,
              public platform: Platform,
              private ga: GoogleAnalytics ) {
    platform.ready().then(() => {
      this.refreshData();
    });
  }

  ionViewDidEnter() {
    this.platform.ready().then(() => {
          // Okay, so the platform is ready and our plugins are available.
          this.ga.trackView("Home Page");
          console.log("Home Page enter");
    });
  }

  refreshData(){
    console.log('RefreshData');
    this.blogger.getAllJobs().then(data => {
      this.items = data;
      // console.log(this.items);
    }, (err) => {
      console.log(err);
    });
  }

  itemTapped(event, item, title) {
      this.navCtrl.push(JobItemPage, { item: item, title: title });
  }

  labelTapped(event, label) {
    this.navCtrl.push(LabelPage, { label: label });
  }

}
