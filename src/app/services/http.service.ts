/* eslint-disable guard-for-in */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';



@Injectable({providedIn: 'root'})
export class httpService {
  constructor( private httpWeb: HttpClient) { }

  get(url: string, options = {headers: new HttpHeaders()}): Observable<any> {

      return this.httpWeb.get(url, options);
  }
  put(url: string, param: any, options = {headers: new HttpHeaders()}): Observable<any>{

      return this.httpWeb.put(url, param, options);
  }
  post(url: string, params: any = {}, options = {headers: new HttpHeaders()}): Observable<any>{

      return this.httpWeb.post(url, params, options);
  }


}

export interface iAPIResultv1 {
  error_message?: {
    success?: number,
    message?: string,
    data?: any,
    other_info?: any
  }
}


