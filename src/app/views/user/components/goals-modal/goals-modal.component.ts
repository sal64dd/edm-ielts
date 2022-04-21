import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { DateClickArg } from '@fullcalendar/interaction';
import { BasicModalComponent } from 'src/app/components/common/basic-modal/basic-modal.component';
import { GoalsService } from 'src/app/services/goals.service';
import { iStatus } from 'src/app/types/api-types';

@Component({
  selector: 'app-goals-modal',
  templateUrl: './goals-modal.component.html',
  styles: [],
})
export class GoalsModalComponent extends BasicModalComponent implements OnInit {
  constructor(public goalService: GoalsService) {
    super();
    
  }

  modules: any;

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    dateClick: (args) => this.handleDateClick(args), // bind is important!
    events: [
      { title: 'event 1', date: '2019-04-01' },
      { title: 'event 2', date: '2019-04-02' },
    ],
  };

  handleDateClick({ dateStr }: DateClickArg) {
    alert('date click! ' + dateStr);
  }

  status: iStatus = 'none';

  submit() {
    this.goalService.setGoal();
  }

  close() {
    this.onSubmit.next(null);
  }

  ngOnInit(): void {
    this.status = 'loading';
    this.goalService.getGoal().subscribe((status) => {
      this.status = status;
      if(status == 'error') return;
      this.modules = ['Listening', 'Reading', 'Writing', 'Speaking'].map(
        (module, i) => {
          let scores = [
            this.goalService.goals.Goal_l,
            this.goalService.goals.Goal_r,
            this.goalService.goals.Goal_w,
            this.goalService.goals.Goal_s,
          ];
          return {
            text: module,
            score: scores[i],
          };
        }
      );
    });
  }
}
