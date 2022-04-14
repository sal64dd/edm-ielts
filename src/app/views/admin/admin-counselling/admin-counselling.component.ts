import { Component, OnInit } from '@angular/core';
import { DocumentData } from 'rxfire/firestore/interfaces';
import { Observable } from 'rxjs';
import { LiveCounsellingService } from 'src/app/services/api/live-counselling.service';

@Component({
  selector: 'app-admin-counselling',
  templateUrl: 'admin-counselling.component.html'
})

export class AdminCounsellingComponent implements OnInit {
  showSessionModal = false;

  constructor(private liveCounsel: LiveCounsellingService) { }

  waitList: Observable<DocumentData[]> = null;
  interval;
  ngOnInit() {
    console.log('hi')
    this.interval = setTimeout(() => this.runLoop(), 3000)
  }

  runLoop(){
    this.waitList = this.liveCounsel.getWaitlist().pipe(s => {
      clearTimeout(this.interval);
      this.interval = setTimeout(() => this.runLoop(), 3000)
      return s;
    });
  }

  showLiveSessionModal = false;
  activeSessionId;

  startSession(userData){
    clearTimeout(this.interval);
    console.log(userData.id);

    this.liveCounsel.createSession('test1', userData).then(session => {
      console.log('new session', session)
      this.activeSessionId = session.id;
      this.showLiveSessionModal = true;
      clearTimeout(this.interval);
    }).catch(e => console.log('error while session creation', e))
  }
}
