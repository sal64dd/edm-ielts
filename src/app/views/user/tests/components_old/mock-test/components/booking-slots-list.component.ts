import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { TestV3ApiService } from 'src/app/services/api/test-v3-api.service';
import { MockTestV2Service } from '../mock-test-v2.service';

@Component({
  selector: 'app-slot-list',
  template: `
  <mx-page [type]="0" [isTest]="true"
    [header]="{ heading: 'Mock Test 1 | Booking Slots', back: false }" >

    <h6>Book your Speaking time Slot</h6>

    <h6 *ngIf="!slots.length">Currently, there is no slot available. Kindly try again later.</h6>

    <hr>

  </mx-page>
`,
styleUrls: ['./../styles.scss']
})

export class BookingSlotsListComponent implements OnInit {
  slots = [];

  constructor(private test: TestV3ApiService, private mock: MockTestV2Service) {

  }

  ngOnInit() {
    this.test.getAvailableSpeakingSlots().subscribe(
      slots => {
        console.log(slots);
      },
      error => {
        console.log('error');
    });
  }



}
