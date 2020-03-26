import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-account',
  templateUrl: 'account.page.html',
  styleUrls: ['account.page.scss']
})
export class AccountPage {

  constructor(private storage: Storage) {
    storage.get('session').then((val) => {
      if(val == null) {
        window.location.href = "/tabs/account/login";
      }
    });
  }

  logout() {
    this.storage.remove('session');
    window.location.href = '/tabs/home';
  }


}
