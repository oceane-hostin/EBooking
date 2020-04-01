import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient } from "@angular/common/http";
import {AppModule} from "../app.module";

@Component({
    selector: 'app-create-account',
    templateUrl: 'create-account.page.html',
    styleUrls: ['create-account.page.scss']
})
export class CreateAccountPage {
    public form;

    constructor(private http: HttpClient, private storage: Storage) {

    }

    register() {
        this.form = "wait";
        // @ts-ignore
        var person = '{ "first_name": "'+this.first_name+'", "last_name": "'+this.last_name+'", "email": "'+this.email+'", "password": "'+this.password+'", "date_of_birth": "'+this.date_of_birth+'", "is_admin": false }';

        var apiBaseUrl = AppModule.getApiUrl();
        this.http.post(apiBaseUrl + 'person/create', person).subscribe((response) => {
            // response having status and info values
            // @ts-ignore
            if(response.status == "success") {
                // @ts-ignore
                this.storage.set("session", response.info);
                window.location.href = "/tabs/account/";
            } else {
                window.location.reload()
            }
        });

    }

}
