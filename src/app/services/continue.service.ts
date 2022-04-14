import { Injectable } from '@angular/core';
import { iView } from '../types/continue-types';

@Injectable({providedIn: 'root'})
export class ContinueService {
  constructor() { }

  lastView: iView | null = null;

  getLastView() {}

  saveCurrentView(view: iView) {}

}
