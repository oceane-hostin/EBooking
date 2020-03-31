import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AppModule} from "../app.module";

@Component({
  selector: 'app-housing',
  templateUrl: 'housing.page.html',
  styleUrls: ['housing.page.scss']
})

export class HousingPage {
    public housing;
    public parent;

    constructor(private http: HttpClient) {
        var apiBaseUrl = AppModule.getApiUrl();
        var currentUrl = window.location.href; // get url
        var idHousing = currentUrl.split('?id=')[1]; // get housing id from url
        this.parent = currentUrl.split("/tabs/")[1].split("/housing")[0]; // get the parent tabs for back button
        if(idHousing) {
            this.http.get(apiBaseUrl + 'housing/read/id/' + idHousing).subscribe((response) => {
                if(response != null) {
                    var housing = response;
                    // @ts-ignore
                    housing.created_at = AppModule.reformatDate(housing.created_at);
                    // @ts-ignore
                    housing.updated_at = AppModule.reformatDate(housing.updated_at);
                    this.housing = housing;
                } else {
                    this.housing = "notfound";
                }
            });
        }
    }

}