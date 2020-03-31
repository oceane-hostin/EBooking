import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AppModule} from "../app.module";

@Component({
  selector: 'app-booking',
  templateUrl: 'booking.page.html',
  styleUrls: ['booking.page.scss']
})

export class BookingPage {
    public booking;
    public housing;
    public parent;
    public apiBaseUrl;

    constructor(private http: HttpClient) {
        this.apiBaseUrl = AppModule.getApiUrl();
        var currentUrl = window.location.href; // get url
        var idBooking = currentUrl.split('?id=')[1]; // get housing id from url
        this.parent = currentUrl.split("/tabs/")[1].split("/booking")[0]; // get the parent tabs for back button
        if(idBooking) {
            this.http.get(this.apiBaseUrl + 'booking/read/id/' + idBooking).subscribe((response) => {
                if(response != null) {
                    /*{
                        "id": 1,
                        "beginning_date": "2020-02-11T00:00:00+01:00",
                        "ending_date": "2020-02-21T00:00:00+01:00",
                        "housing": { ... },
                        "person": { ... },
                        "is_confirmed": false,
                        "created_at": "2020-02-17T00:00:00+01:00",
                        "updated_at": "2020-02-17T00:00:00+01:00"
                    }*/
                    var booking = response;
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

}