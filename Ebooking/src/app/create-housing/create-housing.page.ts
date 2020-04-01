import {Component} from '@angular/core';
import {Storage} from "@ionic/storage";
import {HttpClient} from "@angular/common/http";
import {AppModule} from "../app.module";

@Component({
    selector: 'app-create-housing',
    templateUrl: 'create-housing.page.html',
    styleUrls: ['create-housing.page.scss']
})
export class CreateHousingPage {
    public apiBaseUrl;
    public userId;
    public form;

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
                });
            }
        });
    }

    /*{
    "name": "Petit Châlet à la montagne",
    "description": "Logement remis à neuf. Bien situé. Quartier calme.",
    "street": "87, boulevard de Prague ",
    "city": "Noisy Le Grand",
    "zip_code": "93160",
    "country": "France",
    "price_per_day": 35,
    "surface_area": 50,
    "number_of_travellers": 4,
    "number_of_bedrooms": 2,
    "number_of_bed": 2,
    "number_of_bathrooms": 2,
    "person" : {
    	"id" : 1
    },
    "images": [
        {
            "url": "housing1.jpg"
        }
    ]
} */

    create() {
        this.form = "await";

        // @ts-ignore
        var housing = '{ "name": "'+this.name+'", "description": "'+this.description+'", "street": "'+this.street+'", "city": "'+this.city+'", "zip_code": "'+this.zip_code+'", "country": "'+this.country+'", "price_per_day": '+this.price_per_day+', "surface_area": '+this.surface_area+', "number_of_travellers": '+this.number_of_travellers+', "number_of_bedrooms": '+this.number_of_bedrooms+', "number_of_bed": '+this.number_of_bed+', "number_of_bathrooms": '+this.number_of_bathrooms+', "person" : {"id" : '+this.userId+'}, "images": [{"url": "housing1.jpg"}]}';

        var apiBaseUrl = AppModule.getApiUrl();
        this.http.post(apiBaseUrl + 'housing/create', housing).subscribe((response) => {
            // response having status and info values
            // @ts-ignore
            if(response.status == "success") {
                window.location.href = "/tabs/account/";
            } else {
                alert("Annonce non ajoutée");
            }
        });
    }

}
