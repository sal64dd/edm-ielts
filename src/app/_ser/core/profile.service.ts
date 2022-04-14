/* eslint-disable no-underscore-dangle */
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { catchError, filter, map, skip, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { StorageService } from '../../services/storage.service';
import { iProfileV1 } from 'src/app/interfaces/profilev1.interface';
import { httpService } from './http.service';
import { iUserV3 } from 'src/app/interfaces/userv3.interface';
import { iProgramV2 } from 'src/app/interfaces/programv1.interface';

// Routes for profile api
const PROFILE_API = {
  update: '/student/update',
  get: '/student'
}

// Api Url
const URL = environment.url + environment.apiVersion;

// Local storage Keys
const PROFILE_KEY = 'profile-details'

@Injectable({providedIn: 'root'})
export class ProfileService {

  _Profile = new BehaviorSubject<iProfileV1>(null);
  get Profile(): iProfileV1 { return this._Profile.value;}
  set Profile(profile: iProfileV1) { this._Profile.next(profile);}

  constructor( private storage: StorageService, private http: httpService, private navCtrl: NavController) {

    // Checks the Profile state whenever it changes
    this._Profile
    .pipe(
      skip(1)
    )
    .subscribe(profile => {
      if(!this.check(profile)){
        console.log('ProfileObserver: Profile Invalid');
        this.navCtrl.navigateRoot('create-profile')
      } else{
        this.setLocalStorage();
      }
    });

  }

  /**
   * Update Profile
   */
  update(User: iUserV3, Program: iProgramV2, Profile: iProfileV1): Observable<{isUpdated: boolean, msg: string}>{

    // Build header
     const httpOptions = {
      headers: new HttpHeaders({
        token: User.UUID,
        'Content-Type' : 'application/json',
        id: User.ID,
      }),
    };

    // Build Profile
    const body = {
      fname: Profile.FirstName,
      lname: Profile.Lastname,
      gender: Profile.Gender,
      dob: Profile.Dob,
      email: Profile.Email,

      residential_address: Profile.Address,
      profile_pic: Profile.ProfilePic,

      time_zone: 619, // Todo Fix Time zone and Country
      country_id: 1,

      programe_id: Program.Subcategory_id,
      test_module_id: Program.Exam_id,
    };

    console.log('Updating Profile', body);

    // call api
    return this.http.put(URL + PROFILE_API.update, body, httpOptions).pipe(
      take(1),
      map((res: any) => {
        console.log('Update Respose:', res);
        switch(res.error_message.success){
          case 1:

            if(Profile.ProfilePic != ''){
              Profile.ProfilePic = res.error_message.data.profile_pic;
            } else{
              // put back old pic
              if (this.check(this.Profile)){
                Profile.ProfilePic = this.Profile.ProfilePic ?  this.Profile.ProfilePic : '';
              } else{
                Profile.ProfilePic = '';
              }
            }

            this.Profile = Profile;

            this.setLocalStorage();
            console.log('Profile Update Successful', res.error_message)
            return {isUpdated: true, msg: res.error_message.message};
          case 0:
            throw Error(res.error_message.message);
          default:
            throw Error('Unknown Error');
        }
      }),
      catchError(err => {
        console.error('ProfileService.update: Error', err.message)
        return of({isUpdated: false, msg: err.message});
      })
    );
  }

  /**
   * Get Profile
   */
  get(User: iUserV3): Observable<iProfileV1>{

    // Build header
    const httpOptions = {
      headers: new HttpHeaders({
        token: User.UUID,
        id: User.ID
      })
    };

    // call the api
    return this.http.get(URL + PROFILE_API.get, httpOptions).pipe(
      take(1),
      map((res: any) => {
        switch(res.error_message.success){
          case 1:
            return {
              FirstName: res.error_message.userdetails.fname,
              Lastname: res.error_message.userdetails.lname,
              Dob: res.error_message.userdetails.dob,
              Gender: res.error_message.userdetails.gender,

              MobileNumber: res.error_message.userdetails.mobile,
              CountryCode: res.error_message.userdetails.country_code,

              Email: res.error_message.userdetails.email,
              Address: res.error_message.userdetails.residential_address,
              ProfilePic: res.error_message.userdetails.profile_pic
            } as iProfileV1;
          case 0:
            throw Error(res.error_message.message);
          default:
            throw Error('Unknown Error');
        }
      }),
      catchError(err => {
        console.error('ProfileService.get: Error', err)
        return of(null);
      })
    );
  }

  /**
   * Set Profile to Local Storage
   */
  setLocalStorage(): boolean{
    return this.storage.setKey(PROFILE_KEY, JSON.stringify(this.Profile));
  }

  /**
   * Load Profile from Local Storage
   */
  getLocalStorage(): iProfileV1{
    const strProfile = this.storage.getKey(PROFILE_KEY);
    let Profile: iProfileV1;

    try {
      Profile = JSON.parse(strProfile);
    } catch (e) {
      // throw Error('Parse Error');
      return null;
    }

    if (Profile == null) {
      // throw Error('Null Error');
      return null;
    }

    return Profile;
  }

  /**
   * Clear Local Storage
   */
  clearLocalStorage(){
    this.storage.remove(PROFILE_KEY);
  }

  /**
   * Check Profile Validity
   */
  check(Profile: iProfileV1): boolean{
    try {
      const checking_arr = [
        Profile.FirstName,
        Profile.Lastname,
        Profile.Email,
      ];

      for(let i = 0; i < checking_arr.length; i++){
        const x = checking_arr[i];
        if(!(x && x !== null && x !== '')){
          throw Error('Profile Error (x:i) '+ x +':'+ i);
        }
      }
    } catch(e){
      // console.error('ProfileService.check: Error While Checking Profile', e.message)
      console.log('profile check failed')
      return false;
    }
    console.log('profile check pased')
    return true;
  }


}
