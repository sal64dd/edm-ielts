import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IeltsScore } from '../types/goals-types';

@Injectable({providedIn: 'root'})
export class ReportService {
  constructor() { }

  currentAvgScore: IeltsScore | null = null;

  getAverageIeltsScore(): Observable< IeltsScore | null> {
    return undefined;
  }

}
