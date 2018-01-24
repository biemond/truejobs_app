import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ApplyPage } from '../apply/apply';

@Component({
  selector: 'page-job-item',
  templateUrl: 'job-item.html',
})
export class JobItemPage {

  selectedItem: any;

  url: string = 'https://www.googleapis.com/blogger/v3/blogs/6590972831374935792/posts/'
  key: string = '?key=AIzaSyBdtXGJesZvK6p3jPCd6JFcVcf9gsTYEbQ&fetchImages=true';
  title: string;


  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private http: Http,
              public platform: Platform) {
    // If we navigated to this page, we will have an item available as a nav param
    var postid = navParams.get('item');
    this.title = navParams.get('title');
    console.log('postid: '+postid)
    platform.ready().then(() => {
      this.refreshData(postid);
    });
  }

  refreshData(postid){
    console.log('GetPost');
    console.log('url: '+this.url + postid + this.key)
    this.http.get(this.url + postid + this.key)
      .map(res => res.json())
      .subscribe(data => {
          console.log(data);
          this.selectedItem = data;
      });
  }  

  ionViewDidLoad() {
    console.log('ionViewDidLoad JobItemPage');
  }

  apply(event, title, item) {
    console.log('title:' + title);
    this.navCtrl.push(ApplyPage, { title: title, item: item });
  }

}
