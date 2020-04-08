import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AppModule} from "../app.module";
import {Storage} from "@ionic/storage";

@Component({
  selector: 'app-booking',
  templateUrl: 'booking.page.html',
  styleUrls: ['booking.page.scss']
})

export class BookingPage {
    public userId;
    public booking;
    public housing;
    public parent;
    public apiBaseUrl;
    public userType;

    constructor(private http: HttpClient, private storage: Storage) {
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
                });
            }
        });

        var currentUrl = window.location.href; // get url
        var idBooking = currentUrl.split('?id=')[1]; // get booking id from url
        this.parent = currentUrl.split("/tabs/")[1].split("/booking")[0]; // get the parent tabs for back button
        if(idBooking) {
            this.http.get(this.apiBaseUrl + 'booking/read/id/' + idBooking).subscribe((response) => {
                if(response != null) {
                    var booking = response;

                    // @ts-ignore
                    if(booking.person.id != this.userId && booking.housing.person.id != this.userId) {
                        window.location.href = "/tabs/account";
                    // @ts-ignore
                    } else if (booking.housing.person.id == this.userId) {
                        this.userType = "owner";
                    // @ts-ignore
                    } else if (booking.person.id  == this.userId) {
                        this.userType = "customer";
                    }

                    // @ts-ignore
                    booking.beginning_date = AppModule.reformatDate(booking.beginning_date);
                    // @ts-ignore
                    booking.ending_date = AppModule.reformatDate(booking.ending_date);
                    this.booking = booking;

                    // @ts-ignore
                    var housing = response.housing;
                    // @ts-ignore
                    housing.created_at = AppModule.reformatDate(housing.created_at);
                    // @ts-ignore
                    housing.updated_at = AppModule.reformatDate(housing.updated_at);
                    this.housing = housing;
                } else {
                    this.booking = "notfound";
                    this.housing = "notfound";
                }
            });
        }
    }

    cancelBooking() {
        this.http.delete(this.apiBaseUrl + 'booking/delete/'+this.booking.id).subscribe((response) => {
            // @ts-ignore
            if(response.status == "success") {
                window.location.href = '/tabs/' + this.parent;
            } else {
                alert("Réservation non annulée");
            }
        });
    }

    confirmBooking() {
        this.http.get(this.apiBaseUrl + 'booking/confirm/' + this.booking.id).subscribe((response) => {
            // response having status and info values
            // @ts-ignore
            if (response.status == "success") {
                // @ts-ignore
                window.location.href = "/tabs/account/";
            } else {
                window.location.reload();
            }
        });
    }

}