import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
                        // = t
@Injectable()
export class CarService {

  BASE_URL: string      = 'http://localhost:3000';

  constructor(
    private myHttp:     Http
  ) { }

  carDetails(item) {
    const options = { withCredentials: true };
    return this.myHttp.get(`${this.BASE_URL}/api/car/${item}`)
      .toPromise()
      .then(apiResponse => apiResponse.json())
  }

  //Request All current items from the API
  all() {
    const options = { withCredentials: true };
    return this.myHttp.get(`${this.BASE_URL}/api/all`)
      .toPromise()
      .then(apiResponse => apiResponse.json())
  }
}
