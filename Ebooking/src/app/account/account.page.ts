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
    public apiBaseUrl;
    private id;
    public person;
    private housings;
    private bookings;


    constructor(private storage: Storage, private http: HttpClient) {
        this.apiBaseUrl = AppModule.getApiUrl();

        storage.get('session').then((val) => {
            if (val == null) {
                window.location.href = "/tabs/account/login";
            } else {
                this.id = val;
                this.http.get(this.apiBaseUrl + 'person/read/id/' + this.id).subscribe((response) => {
                    if(response == null) {
                        this.storage.remove('session');
                        window.location.href = "/tabs/account/login";
                    }
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
                window.location.href = '/';
            } else {
                alert("Compte non supprimer");
            }
        });
    }

}
