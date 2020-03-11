import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-housing',
  templateUrl: 'housing.page.html',
  styleUrls: ['housing.page.scss']
})

export class HousingPage {
    public housing;
    public parent;

    constructor(private http: HttpClient) {
        var apiBaseUrl = "http://127.0.0.1:8000/"; // TODO: put the right base url somewhere
        var currentUrl = window.location.href; // get url
        var idHousing = currentUrl.split('?id=')[1]; // get housing id from url
        this.parent = currentUrl.split("/tabs/")[1].split("/housing")[0]; // get the parent tabs for back button
        if(idHousing) {
            this.http.get(apiBaseUrl + 'housing/read/id/' + idHousing).subscribe((response) => {
                if(response != null) {
                    this.housing = response;
                } else {
                    this.housing = "notfound";
                }
            });
        }
    }

}