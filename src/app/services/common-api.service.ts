/**
 * Http Client Request/Respose Wrapper
 * - To sanitize the repose for errors
 * - add auth and other fields to request
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { iAPIResultv2 } from '../types/api-types';
import { routes } from '../views/user/user.module';

@Injectable({
  providedIn: 'root',
})
export class CommonApiService {
  constructor(private http: HttpClient) {}

  request(t: {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    route: string;
    headers?: {[header: string]: string};
    body?: {[header: string]: string};
    auth?: boolean;
  }): Observable<iAPIResultv2> {

    const options: any = {};
    if(t.headers) options.headers = t.headers;
    if(t.body) options.body = t.body;

    const url = environment.api + routes;

    return this.http.request(t.method, url, options).pipe(
      map((res:any):iAPIResultv2 => {
        const result: iAPIResultv2 = {
          success: false,
        }

        if(!res) {
          result.message = 'Null Respose'
          return result;
        }

        if(res.success)
          res.success = true;

        if(res.message)
          result.message = res.message;

        if(res.data)
          result.data = res.data;

        return result;
      }),
    );
  }
}
