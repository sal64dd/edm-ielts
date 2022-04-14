import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { iTask } from '../types/task-types';

@Injectable({providedIn: 'root'})
export class TaskService {
  constructor() { this.getTaskList();}

  taskList = new BehaviorSubject<iTask[]>([]);

  getTaskList(){
    this.taskList.next([
      {
        text: 'English Grammer Revision',
        points: '30',
        route: ['/'],
        isComplete: false
      },
      {
        text: 'Reading Practice Test',
        points: '50',
        route: ['/'],
        isComplete: false
      },
      {
        text: 'Writing Practice Test',
        points: '50',
        route: ['/'],
        isComplete: false
      },
      {
        text: 'Mock Test',
        points: '200',
        route: ['/'],
        isComplete: false
      },
      {
        text: 'Daily Check-in',
        points: '5',
        route: ['/'],
        isComplete: true
      }
    ])
  }

}
