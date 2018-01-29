import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { JobItemPage } from '../pages/job-item/job-item';
import { LabelPage } from '../pages/label/label';
import { ApplyPage } from '../pages/apply/apply';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TruncatePipe } from './app.pipe';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HTTP } from '@ionic-native/http';
import { BloggerProvider } from '../providers/blogger/blogger';
import { OneSignal } from '@ionic-native/onesignal';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    JobItemPage,
    LabelPage,
    TruncatePipe,
    ApplyPage,
    AboutPage,
    ContactPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
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
    ContactPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    OneSignal,
    GoogleAnalytics,
    HTTP,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BloggerProvider
  ]
})
export class AppModule {}
