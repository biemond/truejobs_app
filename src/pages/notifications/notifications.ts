import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { HTTP } from '@ionic-native/http';

@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {

  labels: any;
  urlLabels: string = 'http://www.truejobsindia.com/feeds/posts/default/-/LabelToFilterBy?max-results=50&alt=json';
  check: boolean = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    private ga: GoogleAnalytics,
    private http2: HTTP) {

    this.platform.ready().then(() => {
      this.getAllLabels();
      if (this.platform.is('cordova')) {

        window["plugins"].OneSignal.getPermissionSubscriptionState(function (status) {
          console.log(status.permissionStatus.hasPrompted);
          console.log(status.permissionStatus.status);

          console.log(status.subscriptionStatus.subscribed);
          console.log(status.subscriptionStatus.userSubscriptionSetting);
          console.log(status.subscriptionStatus.pushToken);

          console.log(status.subscriptionStatus.userId);
        });
        window["plugins"].OneSignal.getTags(function (tags) {
          console.log('Tags Received: ' + JSON.stringify(tags));
        });
        window["plugins"].OneSignal.sendTag("test", "123");
      }
    });
  }

  getAllLabels() {
    console.log("getAllLabels");
    let headers = { "Accept": "application/json" };
    this.http2.get(this.urlLabels, {}, headers)
      .then(data => {
        this.labels = JSON.parse(data.data);
        this.labels = this.labels.feed.category;
        console.log(data.status);
        console.log(data.headers);
      }).catch(error => {
        console.log(error.status);
        console.log(error.error); // error message as string
        console.log(error.headers);
      })
  }

  checkboxClicked(label: string) {
    console.log('CheckboxClicked for ' + label + " value "+ this.check);
  }

  ionViewDidEnter() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      this.ga.trackView("Notifications Page");
      console.log("Notifications Page enter");
    });
  }

}
