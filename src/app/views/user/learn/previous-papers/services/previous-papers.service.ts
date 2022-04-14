import { Injectable } from '@angular/core';
import { iPreviousPaper } from 'src/app/types/test-types';

@Injectable({ providedIn: 'root' })
export class PreviousPapersService {
  getAll():iPreviousPaper[] {
    return undefined;
  }
  get(id: string): iPreviousPaper {
    return undefined;
  }

  constructor() {}
}
