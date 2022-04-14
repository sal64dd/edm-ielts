import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-end',
  template: `
   <mx-page [type]="0"
    [header]="{ heading: 'Mock Test 1 | Completed', back: false }" >

  </mx-page>
`,
})

export class TestEndComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

}
