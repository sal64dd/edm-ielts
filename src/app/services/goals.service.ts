import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { iStatus } from '../types/api-types';
import { GetGoal, UserGoalData } from '../types/goals-types';
import { CommonApiService } from './common-api.service';

@Injectable({ providedIn: 'root' })
export class GoalsService {
  constructor(private api: CommonApiService) {}

  status: iStatus = 'none';
  goals: GetGoal | null = null;

  getGoal(): Observable<iStatus> {
    this.status = 'loading';
    return this.api
      .request({
        method: 'GET',
        url: environment.url + environment.apiVersion + '/Goal_settings',
        auth: true,
      })
      .pipe(
        map((d) => {
          console.log(d)
          if (!d.success) {
            this.status = 'error';
          } else {
            this.status = 'found';
            this.goals = d.data as GetGoal;
          }
          console.log(this.goals);
          return this.status;
        })
      );
  }

  setGoal() {
    this.api.request({
      method: 'POST',
        url: environment.url + environment.apiVersion + '/Goal_settings',
        auth: true,
        body: {
          
        }
    })
  }
}
