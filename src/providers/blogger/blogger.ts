import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalVariable } from '../../app/globals';

@Injectable()
export class BloggerProvider {

  url: string = 'https://www.googleapis.com/blogger/v3/blogs/6590972831374935792/posts?key=' + GlobalVariable.API_KEY + '&fetchImages=true&status=live&view=READER&fetchBodies=false&maxResults=20';

  urlPost: string = 'https://www.googleapis.com/blogger/v3/blogs/6590972831374935792/posts/'
  keyPost: string = '?key='+GlobalVariable.API_KEY+'&fetchImages=true';
  items: any;

  constructor(public http: HttpClient) {
  }

  getAllJobs() {
    console.log("getAllJobs");
    this.items = [];
    return new Promise((resolve, reject) => {
      this.http.get(this.url)
        .subscribe(data => {
          this.items = data['items'];
          if (data['nextPageToken'] != null ) {
            this.getAllJobsNextSet(data['nextPageToken']);
          }  
          resolve(this.items);
        }, (err) => {
          reject(err);
        });
    });
  }

  getAllJobsNextSet(token) {
    console.log("getAllJobsNextSet "+ token);
    this.http.get(this.url + "&pageToken="+token)
      .subscribe(data => {
        this.items.push(data['items']);
        if (data['nextPageToken'] != null) {
          this.getAllJobsNextSet(data['nextPageToken']);
        } 
      });
  }

  getAllJobsByLabel(label) {
    console.log("getAllJobsByLabel " + label);
    this.items = [];
    return new Promise((resolve, reject) => {
      this.http.get(this.url + "&labels=" + label)
        .subscribe(data => {
          this.items = data['items'];
          if (data['nextPageToken'] != null ) {
            this.getAllJobsByLabelNextSet(label,data['nextPageToken']);
          }  
          resolve(this.items);
        }, (err) => {
          reject(err);
        });
    });
  }

  getAllJobsByLabelNextSet(label, token) {
    console.log("getAllJobsByLabelNextSet "+ token);
    this.http.get(this.url + "&labels=" + label + "&pageToken="+token)
      .subscribe(data => {
        this.items.push(data['items']);
        if (data['nextPageToken'] != null) {
          this.getAllJobsByLabelNextSet(label,data['nextPageToken']);
        } 
      });
  }

  getPostById(id) {
    console.log("getPostById " + id);
    return new Promise((resolve, reject) => {
      this.http.get(this.urlPost + id + this.keyPost)
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }
}