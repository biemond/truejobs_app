import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { JobItemPage } from '../job-item/job-item';
import { LabelPage } from '../label/label';
import { BloggerProvider } from '../../providers/blogger/blogger'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  items: any;

  constructor(public navCtrl: NavController,
              public blogger: BloggerProvider,
              public platform: Platform) {
    platform.ready().then(() => {
      this.refreshData();
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
