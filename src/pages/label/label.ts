import { Component } from '@angular/core';
import { NavController, Platform, NavParams } from 'ionic-angular';
import { JobItemPage } from '../job-item/job-item';
import { BloggerProvider } from '../../providers/blogger/blogger'
import { GoogleAnalytics } from '@ionic-native/google-analytics';

@Component({
  selector: 'page-label',
  templateUrl: 'label.html',
})
export class LabelPage {

  label: string;
  items: any;

  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              public blogger: BloggerProvider,
              public platform: Platform,
              private ga: GoogleAnalytics ) {
      this.label = navParams.get('label');
      platform.ready().then(() => {
        this.refreshData(this.label);
      });
  }

  ionViewDidEnter() {
    this.platform.ready().then(() => {
          // Okay, so the platform is ready and our plugins are available.
          this.ga.trackView("Label Page");
          console.log("Label Page enter");
    });
  }

  itemTapped(event, item, title) {
    console.log('item: '+ item);
    console.log('title:' + title);
    this.navCtrl.push(JobItemPage, { item: item, title: title });
  }

  refreshData(label){
    console.log('RefreshData for labels');
    this.blogger.getAllJobsByLabel(this.label).then(data => {
      this.items = data;
      // console.log(this.items);
    }, (err) => {
      console.log(err);
    });
  }

}
