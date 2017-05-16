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

  detail(itemId) {
    const options = { withCredentials: true };
    return this.myHttp.get(`${this.BASE_URL}/api/detail/${itemId}`, options)
      .toPromise()
      .then(apiResponse => apiResponse.json())
  }

  //Request All current items from the API
  all() {
    const options = { withCredentials: true };
    return this.myHttp.get(`${this.BASE_URL}/api/all`, options)
      .toPromise()
      .then(apiResponse => apiResponse.json())
  }
  //Request the first 3 current items from the API
  three() {
    const options = { withCredentials: true };
    return this.myHttp.get(`${this.BASE_URL}/api/three`)
      .toPromise()
      .then(apiResponse => apiResponse.json())
  }
  //Request quotes from Quotes collection
  quotes() {
    const options = { withCredentials: true };
    return this.myHttp.get(`${this.BASE_URL}/api/quotes`)
      .toPromise()
      .then(apiResponse => apiResponse.json())
  }
}
