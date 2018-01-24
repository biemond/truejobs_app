import { Component } from '@angular/core';
import { NavController, Platform, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { JobItemPage } from '../job-item/job-item';

@Component({
  selector: 'page-label',
  templateUrl: 'label.html',
})
export class LabelPage {

  label: string;
  url: string = 'https://www.googleapis.com/blogger/v3/blogs/6590972831374935792/posts?key=AIzaSyBdtXGJesZvK6p3jPCd6JFcVcf9gsTYEbQ&fetchImages=true&status=live&view=READER&fetchBodies=false&maxResults=20';
  items: any;

  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private http: Http,
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
    this.http.get(this.url + "&labels=" + label)
      .map(res => res.json())
      .subscribe(data => {
          this.items = data.items;
      });
  }

}
