import { Component } from '@angular/core';
import { NavController, Platform, NavParams } from 'ionic-angular';
import { JobItemPage } from '../job-item/job-item';
import { BloggerProvider } from '../../providers/blogger/blogger'

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
              public platform: Platform) {
      this.label = navParams.get('label');
      platform.ready().then(() => {
        this.refreshData(this.label);
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LabelPage');
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
