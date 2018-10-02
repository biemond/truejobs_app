import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { JobItemPage } from '../pages/job-item/job-item';
import { LabelPage } from '../pages/label/label';
import { ApplyPage } from '../pages/apply/apply';
import { LabelsOverviewPage } from '../pages/labels-overview/labels-overview';
import { NotificationsPage } from '../pages/notifications/notifications';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { OrderBy } from './orderby.pipe';
import { TruncatePipe } from './app.pipe';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HTTP } from '@ionic-native/http';
import { BloggerProvider } from '../providers/blogger/blogger';

import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { AppVersion } from '@ionic-native/app-version';  
import { GoogleMaps } from '@ionic-native/google-maps';

import { LazyLoadImageModule } from 'ng-lazyload-image';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    JobItemPage,
    LabelPage,
    TruncatePipe,
    OrderBy,
    ApplyPage,
    AboutPage,
    ContactPage,
    LabelsOverviewPage,
    NotificationsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    LazyLoadImageModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    JobItemPage,
    LabelPage,
    ApplyPage,
    AboutPage,
    ContactPage,
    LabelsOverviewPage,
    NotificationsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GoogleAnalytics,
    InAppBrowser,
    AppVersion,
    HTTP,
    GoogleMaps,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BloggerProvider
  ]
})
export class AppModule {}
