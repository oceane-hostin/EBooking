import {Component} from '@angular/core';
import {Storage} from '@ionic/storage';
import {HttpClient} from "@angular/common/http";
import {AppModule} from "../app.module";

@Component({
    selector: 'app-login',
    templateUrl: 'login.page.html',
    styleUrls: ['login.page.scss']
})
export class LoginPage {
    public form;

    constructor(private http: HttpClient, private storage: Storage) {

    }

    login() {
        this.form = "wait";
        // @ts-ignore
        var email = this.email;
        // @ts-ignore
        var password = this.password;

        var apiBaseUrl = AppModule.getApiUrl();

        this.http.post(apiBaseUrl + 'person/connect', {'email': email, 'password': password}).subscribe((response) => {
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
