/**
 * User Authentication and Data
 * - provides user token and id for api requests
 */

import { Injectable } from '@angular/core';
import { iEdmUser } from '../types/auth-types';

@Injectable({
  providedIn: 'root'
})
export class CommonAuthService {

  User: iEdmUser = {
   ID: "964",
   UUID: "2af6db59b1e2ffa631ac4486ec4a92cd",
   type: "STUDENT",
   name: "Shaurya"
  };



  constructor() { }
}
