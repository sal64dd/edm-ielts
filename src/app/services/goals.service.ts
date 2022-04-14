import { Injectable } from '@angular/core';
import { iStatus } from '../types/api-types';
import { UserGoalData } from '../types/goals-types';

@Injectable({providedIn: 'root'})
export class GoalsService {
  constructor() { }

  status: iStatus = 'none';
  goals: UserGoalData | null = null;

  getGoal() {}

  setGoal(data: UserGoalData) {}

}
