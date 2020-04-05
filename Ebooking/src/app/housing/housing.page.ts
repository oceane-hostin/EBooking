import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AppModule} from "../app.module";
import {Storage} from "@ionic/storage";

@Component({
  selector: 'app-housing',
  templateUrl: 'housing.page.html',
  styleUrls: ['housing.page.scss']
})

export class HousingPage {
    public userId;
    public apiBaseUrl;
    public housing;
    public parent;
    public owner;

    constructor(private http: HttpClient, private storage: Storage) {
        this.apiBaseUrl = AppModule.getApiUrl();
        var currentUrl = window.location.href; // get url
        var idHousing = currentUrl.split('?id=')[1]; // get housing id from url
        this.parent = currentUrl.split("/tabs/")[1].split("/housing")[0]; // get the parent tabs for back button

        storage.get('session').then((val) => {
            if (val == null) {
                window.location.href = "/tabs/account/login";
            } else {
                this.userId = val;
                this.http.get(this.apiBaseUrl + 'person/read/id/' + this.userId).subscribe((response) => {
                    if (response == null) {
                        this.storage.remove('session');
                        window.location.href = "/tabs/account/login";
                    }
                    // @ts-ignore
                    this.userId = response.id;
                });
            }
        });

        if(idHousing) {
            this.http.get(this.apiBaseUrl + 'housing/read/id/' + idHousing).subscribe((response) => {
                if(response != null) {
                    var housing = response;
                    // @ts-ignore
                    housing.created_at = AppModule.reformatDate(housing.created_at);
                    // @ts-ignore
                    housing.updated_at = AppModule.reformatDate(housing.updated_at);
                    this.housing = housing;

                    this.owner = (this.housing.person.id == this.userId);

                } else {
                    this.housing = "notfound";
                }
            });
        }
    }

    deleteHousing() {
        if (this.userId == this.housing.person.id) {
            this.http.delete(this.apiBaseUrl + 'housing/delete/'+this.housing.id).subscribe((response) => {
                // @ts-ignore
                if(response.status == "success") {
                    window.location.href = '/tabs/' + this.parent;
                } else {
                    alert("Annonce non supprimée");
                }
            });
        } else {
            alert("Annonce non supprimée");
        }
    }

}