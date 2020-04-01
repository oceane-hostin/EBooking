import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient } from "@angular/common/http";
import {AppModule} from "../app.module";

@Component({
    selector: 'app-update-account',
    templateUrl: 'update-account.page.html',
    styleUrls: ['update-account.page.scss']
})
export class UpdateAccountPage {
    public form;
    private id;
    public person;

    constructor(private http: HttpClient, private storage: Storage) {
        storage.get('session').then((val) => {
            if (val == null) {
                window.location.href = "/tabs/account/login";
            } else {
                this.id = val;
                var apiBaseUrl = AppModule.getApiUrl();
                this.http.get(apiBaseUrl + 'person/read/id/' + this.id).subscribe((response) => {
                    this.person = response;
                });
            }
        });
    }

    update() {
        this.form = "wait";

        var person = '{ "first_name": "'+this.person.first_name+'", "last_name": "'+this.person.last_name+'", "email": "'+this.person.email+'", "password": "'+this.person.password+'", "date_of_birth": "'+this.person.date_of_birth+'", "is_admin": "'+this.person.is_admin+'" }';

        var apiBaseUrl = AppModule.getApiUrl();
        this.http.put(apiBaseUrl + 'person/update/'+this.id, person).subscribe((response) => {
            // response having status and info values
            // @ts-ignore
            if(response.status == "success") {
                // @ts-ignore
                this.storage.set("session", response.info);
                window.location.href = "/tabs/account/";
            } else {
                console.log(response);
                //window.location.reload();
            }
        });

    }
}
