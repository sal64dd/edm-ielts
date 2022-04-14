import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { TestV3ApiService } from 'src/app/services/test-v3-api.service';

@Component({
  selector: 'app-user-tests',
  templateUrl: 'tests.component.html'
})

export class TestsComponent implements OnInit {

  constructor(public test: TestV3ApiService) {
  }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth'
  };

  ngOnInit() { }
}
