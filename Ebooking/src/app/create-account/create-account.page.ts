import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-create-account',
  templateUrl: 'create-account.page.html',
  styleUrls: ['create-account.page.scss']
})
export class CreateAccountPage {

  constructor(private storage: Storage) {

  }


}
