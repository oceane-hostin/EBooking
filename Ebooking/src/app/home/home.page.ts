import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppModule} from "../app.module";

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss']
})

export class HomePage {
    public cities;

    constructor(private http: HttpClient) {
        var apiBaseUrl = AppModule.getApiUrl();
        this.http.get(apiBaseUrl + 'housing/cities').subscribe((response) => {
            if (response != null) {
                this.cities = response;
            } else {
                this.cities = "notfound";
            }
        });

    }
}
