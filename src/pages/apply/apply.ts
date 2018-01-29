import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import 'rxjs/add/operator/map';
import { HTTP } from '@ionic-native/http';
import { GlobalVariable } from '../../app/globals';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

@Component({
  selector: 'page-apply',
  templateUrl: 'apply.html',
})
export class ApplyPage {

  title: string;
  item: any;
  candidate: string;
  contact: string;
  altnumber: string;
  email: string;
  location: string;
  english: string;
  qualification: string;
  experience: string;
  skills: string;
  comment: string;
  allskills: boolean;

  contactForm: FormGroup;
  skillsForm: FormGroup;
  contactValidationError: boolean;
  skillValidationError: boolean;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    private http2: HTTP,
    private ga: GoogleAnalytics,
    public platform: Platform ) {

    this.title = navParams.get('title');
    this.item = navParams.get('item');

    this.contactForm = formBuilder.group({
      candidate: ['', Validators.compose([Validators.minLength(5), Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      contact: ['', Validators.compose([Validators.minLength(5), Validators.maxLength(15), Validators.required])],
      altnumber: ['', Validators.compose([Validators.minLength(5), Validators.maxLength(15)])],
      email: ['', Validators.compose([Validators.minLength(5), Validators.maxLength(80), Validators.email, Validators.required])],
      location: ['', Validators.compose([Validators.minLength(5), Validators.maxLength(50), Validators.required])]
    });

    this.skillsForm = formBuilder.group({
      english: ['', Validators.compose([Validators.required])],
      qualification: ['', Validators.compose([Validators.required])],
      experience: ['', Validators.compose([Validators.required])],
      skills: ['', Validators.compose([Validators.required])],
      allskills: ['false', Validators.compose([Validators.required, Validators.requiredTrue])],
      comment: ['']
    });

  }


  send() {

    if (!this.contactForm.valid) {
      console.log("contact not valid!")
      this.contactValidationError = true;
    }
    else if (!this.skillsForm.valid) {
      console.log("skills not valid!")
      this.skillValidationError = true;
    }
    else {
      console.log("success!")
      this.skillValidationError = false;
      this.contactValidationError = false;

      var newline = "\n";
      var body = "job title: " + this.title + newline +
                 "location: " + this.item.location.name + newline + newline;
      body += "contact info: " + newline;          
      for (const field in this.contactForm.controls) { 
          const control = this.contactForm.get(field); 
          body += field + ": " + control.value + newline;
      }
      body +=  newline + "skills: " + newline;
      for (const field in this.skillsForm.controls) { 
        const control = this.skillsForm.get(field); 
        body += field + ": " + control.value + newline
      }

      let data = {
        "from": "India TrueJobs <mailgun@"+GlobalVariable.MAIL_DOMAIN+".mailgun.org>",
        "to": "biemond@gmail.com,maan.truejobs@gmail.com,maan@truejobsindia.com",
        "subject": "TrueJobs application " +this.title,
        "text": body
      };
  
      let headers = {
      };
  
      this.http2.setDataSerializer('urlencoded')
      this.http2.useBasicAuth('api', GlobalVariable.MAIL_API)
      this.http2.post("https://api.mailgun.net/v3/"+GlobalVariable.MAIL_DOMAIN+".mailgun.org/messages", data, headers)
      .then(data => {
        console.log(data.status);
        console.log(data.data); // data received by server
        console.log(data.headers);

        let alert = this.alertCtrl.create({
          title: 'Successful send the job application to TrueJobs',
          subTitle: 'Everything went well',
          buttons: ['OK']
        });
        alert.present();
        this.navCtrl.push(HomePage, {});
      })
      .catch(error => {
        console.log(error.status);
        console.log(error.error); // error message as string
        console.log(error.headers);
        let alert = this.alertCtrl.create({
          title: 'Something went wrong',
          subTitle: 'Please retry again',
          buttons: ['OK']
        });
        alert.present();
      });
 
    }
  }

  ionViewDidEnter() {
    this.platform.ready().then(() => {
          // Okay, so the platform is ready and our plugins are available.
          this.ga.trackView("Apply Job Page");
          console.log("Apply Job Page enter");
    });
  }

}
