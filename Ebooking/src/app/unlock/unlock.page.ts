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
    public bookings;

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
                        if (response != null) {
                            var bookings = response;
                            // @ts-ignore
                            bookings.forEach(function (booking) {
                                booking.beginning_date = AppModule.reformatDate(booking.beginning_date);
                                booking.ending_date = AppModule.reformatDate(booking.ending_date);
                            });
                            this.bookings = bookings;
                        } else {
                            this.bookings = "none";
                        }
                    });
                });
            }
        });

    }

}
