import {Component} from '@angular/core';
import {Storage} from "@ionic/storage";
import {HttpClient} from "@angular/common/http";
import {AppModule} from "../app.module";

@Component({
    selector: 'app-unlock',
    templateUrl: 'unlock.page.html',
    styleUrls: ['unlock.page.scss']
})
export class UnlockPage {
    public userId;
    public apiBaseUrl;
    public booking;

    constructor(private storage: Storage, private http: HttpClient) {
        this.apiBaseUrl = AppModule.getApiUrl();

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

                    this.http.get(this.apiBaseUrl + 'booking/current/person_id/' + this.userId).subscribe((response) => {
                        //this.http.get(this.apiBaseUrl + 'booking/read/id/1').subscribe((response) => {
                        if (response != null) {
                            this.booking = response;
                        } else {
                            this.booking = "none";
                        }
                        console.log(response);
                    });
                });
            }
        });

    }

}
