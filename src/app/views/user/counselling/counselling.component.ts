import { Component, OnInit } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CounsellingClientService } from 'src/app/services/counselling.service';

@Component({
  selector: 'app-counselling',
  templateUrl: 'counselling.component.html'
})

export class CounsellingComponent implements OnInit {
  constructor(private liveCounsel: CounsellingClientService) { }

  activeSessions: Observable<DocumentData[]>;
  showLiveSessionModal = false;
  activeSessionId: string;

  showGetUserInfoModal = false;

  showUserCousellingSession = false;

  ngOnInit() {
    // this.activeSessions = this.liveCounsel.getSessions();
  }
  onSessionStart(sessionId: any){
    console.log(sessionId)
    this.activeSessionId = sessionId;
    this.showLiveSessionModal = true;
  }

  requestid: any;
  userInfoModalResult(res: any){
    this.showGetUserInfoModal = false;
    if(!res){
      console.log('closed')
    } else if(res){
      console.log('res', res);
      this.liveCounsel.addUserToWaitlist(res).then(e => {console.log('result e ', e.id); this.requestid = e.id;} );
      this.showUserCousellingSession = true;
    }
  }
}
