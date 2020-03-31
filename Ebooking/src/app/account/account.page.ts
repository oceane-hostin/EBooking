import {Component} from '@angular/core';
import {Storage} from '@ionic/storage';
import {HttpClient} from "@angular/common/http";
import {AppModule} from "../app.module";

@Component({
    selector: 'app-account',
    templateUrl: 'account.page.html',
    styleUrls: ['account.page.scss']
})
export class AccountPage {
    private id;
    public person;
    private housings;
    private bookings;


    constructor(private storage: Storage, private http: HttpClient) {
        storage.get('session').then((val) => {
            if (val == null) {
                window.location.href = "/tabs/account/login";
            } else {
                this.id = val;
                var apiBaseUrl = AppModule.getApiUrl();
                this.http.get(apiBaseUrl + 'person/read/id/' + this.id).subscribe((response) => {
                    var person = response;
                    // @ts-ignore
                    person.date_of_birth = AppModule.reformatDate(person.date_of_birth);
                    this.person = person;
                    // @ts-ignore
                    this.housings = response.housings;
                    // @ts-ignore
                    var bookings = response.bookings;
                    bookings.forEach(function (booking) {
                        booking.beginning_date = AppModule.reformatDate(booking.beginning_date);
                        booking.ending_date = AppModule.reformatDate(booking.ending_date);
                    });
                    this.bookings = bookings;

                });
            }
        });


        /*{
            "id": 8,
            "first_name": "undefined",
            "last_name": "a",
            "email": "a",
            "password": "123",
            "date_of_birth": "1999-01-01T15:31:16.000000CEST",
            "is_admin": false,
            "created_at": "2020-03-29T15:32:47.000000CEST",
            "updated_at": "2020-03-29T15:32:47.000000CEST",
            "housings": [],
            "bookings": []
        }*/

    }

    logout() {
        this.storage.remove('session');
        window.location.href = '/tabs/home';
    }

}
