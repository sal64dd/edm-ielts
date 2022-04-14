import { Component, OnInit } from '@angular/core';
import { IeltsTestingService, iTest } from 'src/app/services-v2/ielts/ielts-testing.service';

@Component({
  selector: 'app-ielts-apt-test',
  template: `
  <mx-page [type]="0" [header]="{ heading: 'IELTS Aptitute Assesement', back: true }" >
    <test-controller *ngIf="test" [test]="test"></test-controller>
  </mx-page>
`,
})

export class IeltsAptituteTestComponent implements OnInit {

  public test: iTest;

  constructor(private testService: IeltsTestingService) { }

  ngOnInit() {
    this.testService.getTest()
      .subscribe(
        t => {
          this.test = t;
          console.log('Test Data recieved', this.test)
        },
        e => console.error(e))
  }



}
