/* eslint-disable arrow-body-style */
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { iUserV3 } from '../../interfaces/userv3.interface';
import { httpService } from './http.service';
import { StorageService } from '../../services/storage.service';

// Auth actions
export enum AuthAction {SIGNIN, SIGNUP};

// Routes for profile api
const AUTH_API = {
  sendotp_signin: '/Student_otp_login',
  sendotp_signup: '/student/create',
  verifyotp_signin: '/Student_otp_login_verify',
  verifyotp_signup: '/otp/verifyOTP'
}

// Api url
const URL = environment.url + environment.apiVersion;

@Injectable({providedIn: 'root'})
export class AuthV3Service {

  constructor(private storage: StorageService, private http: httpService) {}

  /**
   * Sends Otp
   */
  sendOtp(credentials: {mno, countryCode, hashkey}, action: AuthAction): Observable<{isSent: boolean, msg: string}>{

    // build api url
    let url = URL;
    if(action == AuthAction.SIGNIN){
      url += AUTH_API.sendotp_signin;
    } else{
      url += AUTH_API.sendotp_signup;
    }

    // call api
    return this.http.post(url, credentials).pipe(
      take(1),
      map((res: any) => {
        switch(res.error_message.success){
          case 1:
            return {
              isSent: true,
              msg: res.error_message.message,
            };
          case 0:
            throw Error(res.error_message.message);
          default:
            throw Error('Unknown Error');
        }
      }),
      catchError(err => {
        console.error('AuthV3Service.sendOtp: Error', err)
        return of({isSent: false, msg: err});
      })
    );

  }

  /**
   * Verifies Otp
   */
  verifyOtp(credentials: {mno, countryCode, otp}, action: AuthAction): Observable<{isVerified: boolean, msg: string, user: iUserV3}>{

    // build api url
    let url = URL;
    if(action == AuthAction.SIGNIN){
      url += AUTH_API.verifyotp_signin;
    } else{
      url += AUTH_API.verifyotp_signup;
    }

    // call the api
    return this.http.post(url, credentials).pipe(
      take(1),
      map((res: any) => {
        console.log('Verify Otp Resp', res);
        switch(res.error_message.success){
          case 1:

            let User: iUserV3;
            if(action == AuthAction.SIGNIN){
              User =
              {
                ID: res.error_message.userdetails.id,
                UUID: res.error_message.userdetails.token
              };
            } else{
              User =
              {
                ID: res.error_message.id,
                UUID: res.error_message.token
              };
            }

            return {
              isVerified: true,
              msg: res.error_message.message,
              user: User
            };
          case 0:
            throw Error(res.error_message.message);
          default:
            throw Error('Unknown Error');
        }
      }),
      catchError(err => {
        console.log('AuthV3Service.verifyOtp: Error', err)
        return of({isVerified: false, msg: err, user: null});
      })
    )
  }

}
