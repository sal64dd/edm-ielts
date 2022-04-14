import { Injectable } from '@angular/core';
import { iSocialUser } from '../types/social-types';

@Injectable({providedIn: 'root'})
export class LeaderService {
  constructor() { }
  leaderList: iSocialUser [] = [];

  getLeaderList(){}

}
