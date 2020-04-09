import {Component} from '@angular/core';
import {Storage} from '@ionic/storage';
import {HttpClient} from "@angular/common/http";
import {AppModule} from "../app.module";
import {count} from "rxjs/operators";

@Component({
    selector: 'app-account',
    templateUrl: 'account.page.html',
    styleUrls: ['account.page.scss']
})
export class AccountPage {
    public apiBaseUrl;
    private id;
    public person;
    public housings;
    public bookings;
    public rentings;
    public validationCount;


    constructor(private storage: Storage, private http: HttpClient) {
        this.apiBaseUrl = AppModule.getApiUrl();

        storage.get('session').then((val) => {
            if (!val) {
                window.location.href = "/tabs/account/login";
            } else {
                this.id = val;
                this.http.get(this.apiBaseUrl + 'person/read/id/' + this.id).subscribe((response) => {
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
                this.http.get(this.apiBaseUrl + 'booking/read/owner_id/' + this.id).subscribe((response) => {
                    var rentings = response;
                    var validationCount = 0;
                    // @ts-ignore
                    rentings.forEach(function (renting) {
                        renting.beginning_date = AppModule.reformatDate(renting.beginning_date);
                        renting.ending_date = AppModule.reformatDate(renting.ending_date);
                        if (renting.is_confirmed == 0) {
                            validationCount++;
                        }
                    });
                    this.rentings = rentings;
                    this.validationCount = validationCount;
                });
            }
        });
    }

    logout() {
        this.storage.remove('session');
        window.location.href = '/tabs/home';
    }

    deleteAccount() {
        this.http.delete(this.apiBaseUrl + 'person/delete/'+this.person.id).subscribe((response) => {
            // @ts-ignore
            if(response.status == "success") {
                this.storage.remove('session');
                setTimeout(() =>
                {
                    window.location.href = '/';
                },
                5000);
            } else {
                alert("Compte non supprimer");
            }
        });
    }
}