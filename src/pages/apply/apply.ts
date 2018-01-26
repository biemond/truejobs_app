import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { HTTP } from '@ionic-native/http';
import { GlobalVariable } from '../../app/globals';

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
  submitAttempt: boolean;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    private http: Http,
    private http2: HTTP) {

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
    this.submitAttempt = true;

    if (!this.contactForm.valid) {
      console.log("contact not valid!")
    }
    else if (!this.skillsForm.valid) {
      console.log("skills not valid!")
    }
    else {
      console.log("success!")
      console.log(this.contactForm.value);
      console.log(this.skillsForm.value);

      let data = {
        "from": "India TrueJobs <mailgun@"+GlobalVariable.MAIL_DOMAIN+".mailgun.org>",
        "to": "biemond@gmail.com",
        "subject": "TrueJobs application " +this.title,
        "text": "data: "
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
          title: 'Successful send the job application',
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
      });
 
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ApplyPage');
  }

}
