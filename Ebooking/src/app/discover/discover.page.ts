import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-discover',
  templateUrl: 'discover.page.html',
  styleUrls: ['discover.page.scss']
})
export class DiscoverPage {
    public housings;

    constructor(private http: HttpClient) {
        // put the right base url somewhere
        var apiBaseUrl = "http://127.0.0.1:8000/";
        this.http.get(apiBaseUrl + 'housing/read/').subscribe((response) => {
            this.housings = response;
        });
    }

}
