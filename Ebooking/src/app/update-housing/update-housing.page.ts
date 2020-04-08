import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient } from "@angular/common/http";
import {AppModule} from "../app.module";

@Component({
    selector: 'app-update-housing',
    templateUrl: 'update-housing.page.html',
    styleUrls: ['update-housing.page.scss']
})
export class UpdateHousingPage {
    public apiBaseUrl;
    public form;
    private userId;
    public housingId;
    //public person;
    public housing;

    constructor(private http: HttpClient, private storage: Storage) {
        this.apiBaseUrl = AppModule.getApiUrl();

        storage.get('session').then((val) => {
            if (val == null) {
                window.location.href = "/tabs/housing/login";
            } else {
                this.userId = val;
                /*var apiBaseUrl = AppModule.getApiUrl();
                this.http.get(apiBaseUrl + 'person/read/id/' + this.id).subscribe((response) => {
                    this.person = response;
                });*/
            }
        });
        var currentUrl = window.location.href;
        this.housingId = currentUrl.split('?id=')[1];

        if(this.housingId) {
            this.http.get(this.apiBaseUrl + 'housing/read/id/' + this.housingId).subscribe((response) => {
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

    update() {
        if (this.housing.person.id == this.userId) {
            this.form = "wait";

            // @ts-ignore
            var housing = '{ "name": "'+this.housing.name+'", "description": "'+this.housing.description+'", "street": "'+this.housing.street+'", "city": "'+this.housing.city+'", "zip_code": "'+this.housing.zip_code+'", "country": "'+this.housing.country+'", "price_per_day": '+this.housing.price_per_day+', "surface_area": '+this.housing.surface_area+', "number_of_travellers": '+this.housing.number_of_travellers+', "number_of_bedrooms": '+this.housing.number_of_bedrooms+', "number_of_bed": '+this.housing.number_of_bed+', "number_of_bathrooms": '+this.housing.number_of_bathrooms+'}';

            console.log(housing);

            var apiBaseUrl = AppModule.getApiUrl();
            this.http.put(apiBaseUrl + 'housing/update/' + this.housingId, housing).subscribe((response) => {
                // response having status and info values
                // @ts-ignore
                if (response.status == "success") {
                    // @ts-ignore
                    this.storage.set("session", response.info);
                    window.location.href = "/tabs/account/";
                } else {
                    window.location.reload();
                }
            });
        }

    }
}
