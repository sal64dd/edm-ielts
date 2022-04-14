import { httpService } from '../core/http.service';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

// Get country api routes
const COUNTRY_API = {
  get: '/Get_country'
}

// Api Url
const URL = environment.url + environment.apiVersion;

@Injectable({providedIn: 'root'})
export class CountryService {

  CountryList: {country_id, iso3, name, phonecode, flag, phoneNo_limit}[];

  constructor( private http: httpService) { }

  /**
   * Gets country list from api
   */
  get(): Observable<boolean>{

    const obs = this.http.get(URL + COUNTRY_API.get);

    return obs.pipe(
      take(1),
      map((res: any) => {
        switch(res.error_message.success){
          case 1:
            this.CountryList = res.error_message.data;
            return true;
          case 0:
            throw Error(res.error_message.message);
          default:
            throw Error('Unknown Error');
        }
      }),
      catchError(err => {
        console.error('Country Codes Downloaded error', err)
        return of(false);
      })
    );
  }

  /**
   * Build Country list for picker
   */
  build(): {text, value}[]{
    const options: {text, value}[] = [];
    this.CountryList.forEach((x, i, arr )=> {
      options.push({text:x.iso3 + ' ' + x.phonecode, value:i});
    });
    return options;
  }

}
