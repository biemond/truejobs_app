import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { JobItemPage } from '../job-item/job-item';
import { LabelPage } from '../label/label';
import { GlobalVariable } from '../../app/globals';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  url: string = 'https://www.googleapis.com/blogger/v3/blogs/6590972831374935792/posts?key='+GlobalVariable.API_KEY+'&fetchImages=true&status=live&view=READER&fetchBodies=false&maxResults=20'; //&fetchBodies=false';
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
    this.items = [];

    this.http.get(this.url)
      .map(res => res.json())
      .subscribe(data => {
          var nextToken = data.nextPageToken;
          console.log("nexttoken" + nextToken);
          this.items = data.items;

          if(nextToken != null) { 
            this.http.get(this.url + "&pageToken=" + nextToken)
            .map(res => res.json())
            .subscribe(data => {
                console.log("get new data");
                if (data.nextPageToken == null) {
                  nextToken = data.nextPageToken;
                } else {
                  nextToken = null;
                }
                
                var a;
                var checksLen2 = this.items.length
                var checksLen = data.items.length
                console.log(checksLen2);
                console.log(checksLen);
                for (a = 0; a < checksLen; a += 1) {
                  this.items[a+checksLen2] = data.items[a];
                }
            });
          }
        });
       
  }

  itemTapped(event, item, title) {
      this.navCtrl.push(JobItemPage, { item: item, title: title });
  }

  labelTapped(event, label) {
    this.navCtrl.push(LabelPage, { label: label });
  }

}
