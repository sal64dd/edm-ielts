import { Component, Input, OnInit } from '@angular/core';
import { ModalDefaultComponent } from 'src/app/components/common/modal-default/modal-default.component';
import { CounsellingClientService } from 'src/app/services/counselling.service';

@Component({
  selector: 'app-user-counselling-session',
  templateUrl: './user-counselling-session.component.html',
  styleUrls: ['./user-counselling-session.component.css'],
})
export class UserCounsellingSessionComponent
  extends ModalDefaultComponent
  implements OnInit
{
  @Input() id: any;
  constructor(private live: CounsellingClientService) {
    super();
  }

  activeSession: any = null;

  interval: any;

  ngOnInit(): void {
    this.interval = setTimeout(() => {
      this.runLoop();
    }, 3000);
  }

  runLoop() {
    if (this.activeSession) {
      clearTimeout(this.interval);
      return;
    }

    this.live.getSessionWithUserId(this.id).subscribe({
      next: s => {
        let p = s as any[];
        console.log('found active session', p);
        this.activeSession = p[0];
      },
      error: (e: any) => {
        console.log('error whilegetting session', e);
        this.interval = setTimeout(() => {
          this.runLoop();
        }, 3000);
      },
    });
  }
}
