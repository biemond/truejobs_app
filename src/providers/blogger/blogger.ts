import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { GlobalVariable } from '../../app/globals';

@Injectable()
export class BloggerProvider {

  url: string = 'https://www.googleapis.com/blogger/v3/blogs/6590972831374935792/posts?key=' + GlobalVariable.API_KEY + '&fetchImages=true&status=live&view=READER&fetchBodies=false&maxResults=20';

  urlPost: string = 'https://www.googleapis.com/blogger/v3/blogs/6590972831374935792/posts/'
  keyPost: string = '?key='+GlobalVariable.API_KEY+'&fetchImages=true';


  constructor(public http: Http) {
    console.log('Hello BloggerProvider Provider');
  }

  getAllJobs() {
    console.log("getAllJobs");
    return new Promise((resolve, reject) => {
      this.http.get(this.url)
        .map(res => res.json())
        .subscribe(data => {
          // var nextToken = data.nextPageToken;
          // console.log("nexttoken" + nextToken);
          resolve(data.items);
        }, (err) => {
          reject(err);
        });
    });
  }

  getAllJobsByLabel(label) {
    console.log("getAllJobsByLabel " + label);
    return new Promise((resolve, reject) => {
      this.http.get(this.url + "&labels=" + label)
        .map(res => res.json())
        .subscribe(data => {
          // var nextToken = data.nextPageToken;
          // console.log("nexttoken" + nextToken);
          resolve(data.items);
        }, (err) => {
          reject(err);
        });
    });
  }

  getPostById(id) {
    console.log("getPostById " + id);
    return new Promise((resolve, reject) => {
      this.http.get(this.urlPost + id + this.keyPost)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }
}
