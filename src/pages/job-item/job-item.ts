import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-job-item',
  templateUrl: 'job-item.html',
})
export class JobItemPage {

  selectedItem: any;

  constructor(private nav: NavController,
              private navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad JobItemPage');
  }

}
