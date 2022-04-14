/* eslint-disable no-underscore-dangle */
/* eslint-disable arrow-body-style */
import { Injectable } from '@angular/core';
import { Observable, from, BehaviorSubject, of, throwError } from 'rxjs';
import { StorageService } from '../../services/storage.service';
import { filter, skip } from 'rxjs/operators';
import { iUserV3 } from 'src/app/interfaces/userv3.interface';

// Local storage Keys
const USER_KEY = 'user-details';

@Injectable({ providedIn: 'root' })

export class UserV3Service {
  _User = new BehaviorSubject<iUserV3>(null);
  get User(): iUserV3 {
    return this._User.value;
  }
  set User(user: iUserV3) {
    this._User.next(user);
  }

  constructor(private storage: StorageService, private navCtrl: NavController) {

    // Checks the user state whenever it changes
    this._User.pipe(skip(1)).subscribe((user) => {
      if (!this.check(user)) {
        console.log('UserObserver: User Invalid');
        this.navCtrl.navigateRoot('login');
      } else {
        this.setLocalStorage();
      }
    });
  }

  /**
   * Set Profile to Local Storage
   */
  setLocalStorage(): boolean {
    return this.storage.setKey(USER_KEY, JSON.stringify(this.User));
  }

  /**
   * Load Profile from Local Storage
   */
  getLocalStorage(): iUserV3 {
    const strUser = this.storage.getKey(USER_KEY);
    let User: iUserV3;

    try {
      User = JSON.parse(strUser);
    } catch (e) {
      console.error('UserV3Service: getLocalStorage: Parse Error', e.message);
      return null;
    }

    return User;
  }

  /**
   * Clear Local Storage
   */
  clearLocalStorage() {
    this.storage.remove(USER_KEY);
  }

  /**
   * Check Profile Validity
   */
  check(user: iUserV3): boolean {
    try {
      if (!(user.ID && user.ID !== null && user.ID !== '')) {
        console.log('user check failed');
        return false;
      } else if (!(user.UUID && user.UUID !== null && user.UUID !== '')) {
        console.log('user check failed');
        return false;
      } else {
        console.log('user check pass');
        return true;
      }
    } catch (e) {
      console.log('user check failed');
      return false;
    }
  }

  /**
   * Loads user
   */
  loadUser(user: iUserV3): boolean {
    if (this.check(user)) {
      this.User = user;
      return true;
    } else{
      return false;
    }
  }
}
