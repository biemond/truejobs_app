import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { JobItemPage } from '../job-item/job-item';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  url: string = 'https://www.googleapis.com/blogger/v3/blogs/6590972831374935792/posts?key=AIzaSyBdtXGJesZvK6p3jPCd6JFcVcf9gsTYEbQ&fetchImages=true&status=live&view=READER'; //&fetchBodies=false';
  items: any;

  constructor(public navCtrl: NavController,
              private http: Http,
              public platform: Platform) {
    platform.ready().then(() => {
      this.refreshData();
    });
  }

  refreshData(){
    console.log('RefreshData');
    this.http.get(this.url)
      .map(res => res.json())
      .subscribe(data => {
          this.items = data.items;
          console.log(this.items);
      });
  }

  itemTapped(event, item) {
      this.navCtrl.push(JobItemPage, { item: item });
  }

}
