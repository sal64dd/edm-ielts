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
import { CommonAuthService } from './common-auth.service';

@Injectable({
  providedIn: 'root',
})
export class CommonApiService {
  constructor(private http: HttpClient, private auth: CommonAuthService) {}

  request({
    method,
    url,
    headers,
    body,
    auth,
  }: {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    url: string;
    headers?: { [header: string]: string };
    body?: { [header: string]: string };
    auth?: boolean;
  }): Observable<iAPIResultv2> {
    const options: any = {};
    if (headers) options.headers = headers;
    if (body) options.body = body;

    if (auth) {
      if (!options.headers) options.headers = {};
      options.headers['token'] = this.auth.User.UUID;
    }

    return this.http.request(method, url, options).pipe(
      map((res: any): iAPIResultv2 => {
        const result: iAPIResultv2 = {
          success: false,
        };

        if (!res) {
          result.message = 'Null Respose';
          return result;
        }
        if (res.error_message.success) result.success = true;

        if (res.error_message.message) result.message = res.error_message.message;

        result.data = res.error_message.data;

        return result;
      })
    );
  }
}
