import { Component, Input, OnInit } from '@angular/core';
import { ModalDefaultComponent } from 'src/app/components/common/modal-default/modal-default.component';
import { LiveCounsellingService } from 'src/app/services/api/live-counselling.service';

@Component({
  selector: 'app-admin-counselling-session',
  templateUrl: './admin-counselling-session.component.html',
  styleUrls: ['./admin-counselling-session.component.css']
})
export class AdminCounsellingSessionComponent extends ModalDefaultComponent implements OnInit {

  @Input() activeSessionId;
  activeSession;

  constructor(private live: LiveCounsellingService) { super(); }

  ngOnInit(): void {
    console.log('activeSessionId', this.activeSessionId)
    this.live.getSessionWithId(this.activeSessionId).subscribe(session => {
      console.log('active session found', session);
      this.activeSession = session;
    }, error => {
      console.log('error while searching active session', error);
    })
  }

}
