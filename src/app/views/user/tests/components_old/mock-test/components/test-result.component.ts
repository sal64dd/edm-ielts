import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-result',
  template: `
  <mx-page [type]="0"
    [header]="{ heading: 'Mock Test 1 | Result', back: true }" >

  </mx-page>
`,
})

export class TestResultComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

}
