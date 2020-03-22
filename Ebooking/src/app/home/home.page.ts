import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})

export class HomePage {
  public cities;

  constructor(private http: HttpClient) {
    var apiBaseUrl = "http://127.0.0.1:8000/"; // TODO: put the right base url somewhere
    this.http.get(apiBaseUrl + 'housing/cities').subscribe((response) => {
      if(response != null) {
        this.cities = response;
      } else {
        this.cities = "notfound";
      }
    });

  }
}
