import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-apply',
  templateUrl: 'apply.html',
})
export class ApplyPage {

  title: string;
  item: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.title = navParams.get('title');
    this.item = navParams.get('item');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ApplyPage');
  }

}
