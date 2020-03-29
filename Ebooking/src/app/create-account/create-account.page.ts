import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient } from "@angular/common/http";

@Component({
    selector: 'app-create-account',
    templateUrl: 'create-account.page.html',
    styleUrls: ['create-account.page.scss']
})
export class CreateAccountPage {

    constructor(private http: HttpClient, private storage: Storage) {

    }

    register() {
        // @ts-ignore
        var firstName = this.first_name;
        // @ts-ignore
        var lastName = this.last_name;
        // @ts-ignore
        var email = this.email;
        // @ts-ignore
        var password = this.password;
        // @ts-ignore
        var dateOfBirth = this.date_of_birth;

        var person = '{ "first_name": "'+firstName+'", "last_name": "'+lastName+'", "email": "'+email+'", "password": "'+password+'", "date_of_birth": "'+dateOfBirth+'", "is_admin": false }';

        var apiBaseUrl = "http://127.0.0.1:8000/";
        this.http.post(apiBaseUrl + 'person/create', person).subscribe((response) => {
            // response having status and info values
            // @ts-ignore
            if(response.status == "success") {
                console.log(response);
                // @ts-ignore
                this.storage.set("session", response.info);
                window.location.href = "/tabs/account/";
            } else {
                window.location.reload()
            }
        });

    }

}
