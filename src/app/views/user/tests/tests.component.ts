import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { ModalControllerService } from 'src/app/services/modal-controller.service';
import { TestV3ApiService } from 'src/app/services/test-v3-api.service';
import { MockModalComponent } from './components/mock-modal/mock-modal.component';

@Component({
  selector: 'app-user-tests',
  templateUrl: 'tests.component.html'
})

export class TestsComponent implements OnInit {

  constructor(public test: TestV3ApiService, private modal: ModalControllerService) {
  }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth'
  };

  mock(){
    this.modal.createModal({modal: MockModalComponent, params: {}}).subscribe(d => {
      this.modal.destroy();
    })

  }

  ngOnInit() { }
}
