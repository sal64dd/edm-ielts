import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class PointsService {
  constructor() { }

  _totalPoints = new BehaviorSubject<number>(0);

  get totalPoints() : number {
    return  this._totalPoints.value;
  }

  /**
   * Gets total points from api
   */
  getPoints() {
    this._totalPoints.next(0);
  }

}
