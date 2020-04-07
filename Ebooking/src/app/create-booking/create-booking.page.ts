import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppModule} from "../app.module";
import {Storage} from "@ionic/storage";

@Component({
    selector: 'app-create-booking',
    templateUrl: 'create-booking.page.html',
    styleUrls: ['create-booking.page.scss']
})

export class CreateBookingPage {
    public userId;
    public bookings;
    public housing;
    public parent;
    public apiBaseUrl;
    public form;
    public min;
    public max;

    constructor(private http: HttpClient, private storage: Storage) {
        this.apiBaseUrl = AppModule.getApiUrl();

        // Check if user if connected
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

        var currentUrl = window.location.href; // get url
        var idHousing = currentUrl.split('?id=')[1]; // get housing id from url
        this.parent = currentUrl.split("/tabs/")[1].split("/booking")[0]; // get the parent tabs for back button
        var today = new Date();
        var year = today.getFullYear();
        this.min = year;
        this.max = year+10;

        // Check if housing exist
        this.http.get(this.apiBaseUrl + 'housing/read/id/' + idHousing).subscribe((response) => {
            if (response == null) {
                this.storage.remove('session');
                window.location.href = "/tabs/discover";
            }
            this.housing = response;

            this.http.get(this.apiBaseUrl + 'booking/read/housing_id/' + idHousing).subscribe((response) => {
                if (response != null) {
                    var bookings = response;
                    // @ts-ignore
                    bookings.forEach(function (booking) {
                        booking.beginning_date = AppModule.reformatDate(booking.beginning_date);
                        booking.ending_date = AppModule.reformatDate(booking.ending_date);
                    });
                    this.bookings = bookings;
                } else {
                    this.bookings = "notfound";
                }
            });
        });
    }

    bookHousing() {
        this.form = "wait";
        // @ts-ignore
        var booking = '{ "beginning_date": "'+this.begin+'", "ending_date": "'+this.end+'", "housing" : { "id": '+this.housing.id+' }, "person": { "id": '+this.userId+' } }';

        console.log(booking);

        this.http.post(this.apiBaseUrl + 'booking/create', booking).subscribe((response) => {
            // response having status and info values
            // @ts-ignore
            if(response.status == "success") {
                window.location.href = "/tabs/account/";
            } else {
                window.location.reload();
            }
        });
    }
}