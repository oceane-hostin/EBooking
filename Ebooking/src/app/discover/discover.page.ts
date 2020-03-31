import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AppModule} from "../app.module";

@Component({
  selector: 'app-discover',
  templateUrl: 'discover.page.html',
  styleUrls: ['discover.page.scss']
})
export class DiscoverPage {
    public housings;

    constructor(private http: HttpClient) {
        var apiBaseUrl = AppModule.getApiUrl();
        this.http.get(apiBaseUrl + 'housing/read/').subscribe((response) => {
            this.housings = response;
        });
    }

}
