import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-housing',
  templateUrl: 'housing.page.html',
  styleUrls: ['housing.page.scss']
})

export class HousingPage {
    public housing;

    constructor(private http: HttpClient) {
        // put the right base url somewhere
        var apiBaseUrl = "http://127.0.0.1:8000/";
        var currentUrl = window.location.href;
        var idHousing = currentUrl.split('?id=')[1];
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