import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    public formBuilder: FormBuilder) {
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
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ApplyPage');
  }

}
