import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ContactPage } from '../pages/contact/contact';
import { AboutPage } from '../pages/about/about';
import { OneSignal } from '@ionic-native/onesignal';
import { GlobalVariable } from './globals';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              private notification: OneSignal) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Contact', component: ContactPage },
      { title: 'About', component: AboutPage },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      if (this.platform.is('cordova')) {
        this.notification.startInit(GlobalVariable.ONE_SIGNAL, GlobalVariable.PUSH_GOOGLE_ID);
        this.notification.inFocusDisplaying(this.notification.OSInFocusDisplayOption.Notification);
        this.notification.setSubscription(true);
        this.notification.handleNotificationReceived().subscribe(() => {
            // your code after Notification received.
        });
        this.notification.handleNotificationOpened().subscribe(() => {
            // your code to handle after Notification opened
        });
        this.notification.endInit();
      }
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
