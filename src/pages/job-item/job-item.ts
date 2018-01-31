import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { ApplyPage } from '../apply/apply';
import { BloggerProvider } from '../../providers/blogger/blogger'
import { GoogleAnalytics } from '@ionic-native/google-analytics';

@Component({
  selector: 'page-job-item',
  templateUrl: 'job-item.html',
})
export class JobItemPage {

  selectedItem: any;
  title: string;
  content: string;

  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              public blogger: BloggerProvider,              
              public platform: Platform,
              private ga: GoogleAnalytics ) {
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
    this.blogger.getPostById(postid).then(data => {
      this.selectedItem = data;
      var tempContent: string = data['content'];
      this.content = tempContent.substring(0,tempContent.indexOf("&nbsp; &nbsp; &nbsp;"));
      console.log(this.content);
    }, (err) => {
      console.log(err);
    });
  }

  ionViewDidEnter() {
    this.platform.ready().then(() => {
          // Okay, so the platform is ready and our plugins are available.
          this.ga.trackView("JobItem Page for " + this.title);
          console.log("JobItem Page enter");
    });
  }

  apply(event, title, item) {
    console.log('title:' + title);
    this.navCtrl.push(ApplyPage, { title: title, item: item });
  }

}
