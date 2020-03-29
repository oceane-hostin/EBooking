import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-account',
  templateUrl: 'account.page.html',
  styleUrls: ['account.page.scss']
})
export class AccountPage {
  private id;
  private firstName;
  private lastName;
  private email;
  private dateOfBirth;
  private housings;
  private bookings;


  constructor(private storage: Storage, private http: HttpClient) {
    storage.get('session').then((val) => {
      if(val == null) {
        window.location.href = "/tabs/account/login";
      } else {
        this.id = val;
        var apiBaseUrl = "http://127.0.0.1:8000/";
        this.http.get(apiBaseUrl + 'person/read/id/'+ this.id).subscribe((response) => {
          // @ts-ignore
          this.firstName = response.first_name;
          // @ts-ignore
          this.lastName = response.last_name;
          // @ts-ignore
          this.email = response.email;
          // @ts-ignore
          var date = response.date_of_birth;
          date = date.split('CEST')[0];
          this.dateOfBirth = new Date(date);
          // @ts-ignore
          console.log(response.housings);
          // @ts-ignore
          this.housings = response.housings;
          // @ts-ignore
          this.bookings = response.bookings;
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
