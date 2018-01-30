import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { AppVersion } from '@ionic-native/app-version';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  versionNumber: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private ga: GoogleAnalytics,
    public platform: Platform,
    private app: AppVersion) {
    platform.ready().then(() => {
      if (this.platform.is('cordova')) {
        this.app.getVersionNumber().then(version => {
          this.versionNumber = version;
        });
      }
    });
  }

  getVersionNumber() {
    return this.versionNumber;
  }

  ionViewDidEnter() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      this.ga.trackView("About Page");
      console.log("About Page enter");
    });
  }
}
