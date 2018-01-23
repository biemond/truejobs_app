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

  selectedItem: any;
  url: string = 'https://www.googleapis.com/blogger/v3/blogs/6590972831374935792/posts?key=AIzaSyBdtXGJesZvK6p3jPCd6JFcVcf9gsTYEbQ&fetchImages=true&status=live&view=READER';
  items: any;

  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private http: Http,
              public platform: Platform) {
      // If we navigated to this page, we will have an item available as a nav param
      this.selectedItem = navParams.get('label');

      platform.ready().then(() => {
        this.refreshData();
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LabelPage');
  }

  itemTapped(event, item) {
    this.navCtrl.push(JobItemPage, { item: item });
  }

  refreshData(){
    console.log('RefreshData');
    this.http.get(this.url + "&labels=" + this.selectedItem)
      .map(res => res.json())
      .subscribe(data => {
          this.items = data.items;
          console.log(this.items);
      });
  }

}
