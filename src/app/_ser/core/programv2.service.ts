/* eslint-disable no-underscore-dangle */
import {  HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, filter, map, skip, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { StorageService } from '../../services/storage.service';
import { iProgramV2 } from 'src/app/interfaces/programv1.interface';
import { httpService } from './http.service';
import { iUserV3 } from 'src/app/interfaces/userv3.interface';
import { iProfileV1 } from 'src/app/interfaces/profilev1.interface';
import { Router } from '@angular/router';

// Routes for profile api
const PROGRAM_API = {
  update: '/student/update',
  get: '/student'
}

// Api Url
const URL = environment.url + environment.apiVersion;

// Local storage Keys
const PROGRAM_KEY = 'program-details'

@Injectable({providedIn: 'root'})
export class ProgramV2Service {

  ProgramList: {Exam_id: string, Exam_name: string, Subcategories: iProgramV2[]}[];

  _Program = new BehaviorSubject<iProgramV2 | null>(null);
  get Program(): iProgramV2 | null { return this._Program.value;}
  set Program(program: iProgramV2 | null) { if (program) this._Program.next(program);}



  constructor(private storage: StorageService, private http: httpService,  private router: Router) {
    // Checks the program state whenever it changes
    this.getPrograms();

    this._Program
      .pipe(
        skip(1)
      )
      .subscribe(program => {
        if(!this.check(program)){
          console.log('ProgramObserver: Program Invalid');
          this.navCtrl.navigateRoot('select-program')
        } else{
          this.setLocalStorage();
        }
      });
  }

  /**
   * Update Program
   */
  update(User: iUserV3, Profile: iProfileV1, Program: iProgramV2): Observable<{isUpdated: boolean, msg: string}>{

    // Build header
    const httpOptions = {
      headers: new HttpHeaders({
        token: User.UUID,
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
      profile_pic: '',

      time_zone: 619, // Todo Fix Time zone and Country
      country_id: 1,

      programe_id: Program.Subcategory_id,
      test_module_id: Program.Exam_id,
    };

    // call api
    return this.http.put(URL + PROGRAM_API.update, body, httpOptions).pipe(
      take(1),
      map((res: any) => {
        switch(res.error_message.success){
          case 1:
            this.Program = Program;
            this.Program.Exam_name = this.ProgramList[0].Exam_name;
            this.Program.Subcategory_name = this.Program.Subcategory_id == '11' ?  this.ProgramList[0].Subcategories[0].Subcategory_name : this.ProgramList[0].Subcategories[1].Subcategory_name;
            this.setLocalStorage();
            return {isUpdated: true, msg: res.error_message.message};
          case 0:
            throw Error(res.error_message.message);
          default:
            throw Error('Unknown Error');
        }
      }),
      catchError(err => {
        console.error('ProgramV2Service.update: Error', err.message)
        return of({isUpdated: false, msg: err.message});
      })
    );
  }

  /**
   * Get Program
   */
  get(User: iUserV3): Observable<iProgramV2 | null>{
    console.log('GetProgram: Program API!');
    // Build header
    const httpOptions = {
      headers: new HttpHeaders({
        token: User.UUID,
        id: User.ID
      })
    };

    // call the api
    return this.http.get(URL + PROGRAM_API.get, httpOptions).pipe(
      take(1),
      map( (res: any) => {
        switch(res.error_message.success){
          case 1:
            console.log('GetProgram: Program Returned!');
            return {
              Exam_id: res.error_message.userdetails.test_module_id,
              Subcategory_id: res.error_message.userdetails.programe_id,
              Exam_name: this.ProgramList[0].Exam_name,
              Subcategory_name: res.error_message.userdetails.programe_id == '11' ?  this.ProgramList[0].Subcategories[0].Subcategory_name : this.ProgramList[0].Subcategories[1].Subcategory_name
            } as iProgramV2;
          case 0:
            console.log('GetProgram: Program Error 0!');
            throw Error(res.error_message.message);
          default:
            console.log('GetProgram: Program Error default!');
            throw Error('Unknown Error');
        }
      }),
      catchError(err => {
        console.error('ProgramV2Service.get: Error', err)
        return of(null);
      })
    );
  }

  /**
   * Gets list of available programs
   */
  getPrograms(): Observable<boolean> {
    // TODO: rewrite this to be dynamic
    // Hardcoding for now as there exists no backend functiality yet

    this.ProgramList = [
      {
        Exam_id: "1", Exam_name: "IELTS",
        Subcategories: [
          {Exam_id: '1', Exam_name: 'IELTS', Subcategory_id: '11', Subcategory_name: 'Academic'},
          {Exam_id: '1', Exam_name: 'IELTS', Subcategory_id: '10', Subcategory_name: 'General Training'},
        ]
      }
    ]

    return of(true);
  }

  /**
   * Set Program to Local Storage
   */
  setLocalStorage(): boolean{
    return this.storage.setKey(PROGRAM_KEY, JSON.stringify(this.Program));
  }

  /**
   * Load Program from Local Storage
   */
  getLocalStorage(): iProgramV2 | null{
    const strProgram = this.storage.getKey(PROGRAM_KEY);
    let Program: iProgramV2;

    try {
      Program = JSON.parse(strProgram);
    } catch (e) {
      // throw Error('Parse Error');
      return null;
    }

    if (Program == null) {
      // throw Error('Null Error');
      return null;
    }

    return Program;
  }

  /**
   * Clear Local Storage
   */
  clearLocalStorage(){
    this.storage.remove(PROGRAM_KEY);
  }

  /**
   * Check Program Validity
   */
  check(Program: iProgramV2 | null): boolean{
    if(!Program){
      throw Error('ProgramV2Service.check: program is null');
    }
    try{
      const checking_arr = [
        Program.Exam_id,
        Program.Subcategory_id
      ];
      for(let i = 0; i < checking_arr.length; i++){
        const x = checking_arr[i];
        if(!(x && x !== null && x !== '' && x !== 'null' && x !== '0')){
          throw Error('ProgramV2Service.check: Error at (x@i)'+ x + ':' + i);
        }
      }

      console.log('program chck pased')
      return true;


    } catch (e){
      // console.log('ProgramV2Service.check: Error While Checking Program Details', e.message, Program)
      console.log('program chck failed')
      return false;
    }
  }


}
