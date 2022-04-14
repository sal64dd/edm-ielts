import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { iEvent } from '../types/events-types';

@Injectable({providedIn: 'root'})
export class EventsService {
  constructor() { }

  getCurrentEvents(): Observable<iEvent[]> {
    return undefined;
  }

}
