import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ContactPage } from '../pages/contact/contact';
import { AboutPage } from '../pages/about/about';
import { LabelsOverviewPage } from '../pages/labels-overview/labels-overview';
import { NotificationsPage } from '../pages/notifications/notifications';

import { GlobalVariable } from './globals';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

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
              private ga: GoogleAnalytics) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Select by Labels', component: LabelsOverviewPage},
      // { title: 'Notifications', component: NotificationsPage},
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

        var notificationOpenedCallback = function(jsonData) {
          console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
          if (jsonData.notification.payload.additionalData != null) {
            console.log("Here we access addtional data");
            if (jsonData.notification.payload.additionalData.openURL != null) {
              console.log("Here we access the openURL sent in the notification data");
  
            }
          }
        };
  
        window["plugins"].OneSignal
          .startInit(GlobalVariable.ONE_SIGNAL, GlobalVariable.PUSH_GOOGLE_ID)
          .inFocusDisplaying(window["plugins"].OneSignal.OSInFocusDisplayOption.Notification)
          .handleNotificationOpened(notificationOpenedCallback)
          .endInit();

        console.log('Google analytics is starting now');
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        this.ga.startTrackerWithId('UA-2832203-11', 5 ).then(() => {
           console.log('Google analytics is ready now');
           // GoogleAnalytics.debugMode();
           this.ga.setAllowIDFACollection(false);
           // Tracker is ready
           // You can now track pages or set additional information such as AppVersion or UserId
        }).catch(e => console.log('Error starting GoogleAnalytics', e));

      }
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
