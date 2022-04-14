import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mock-test-controller',
  template: `
  <router-outlet></router-outlet>
  <hr>
  <div class="btn-group">
    <a class="btn btn-outline-secondary" routerLink="list">
      List
    </a>
    <a class="btn btn-outline-secondary" routerLink="slots">
      slots
    </a>
    <a class="btn btn-outline-secondary" routerLink="test-start">
      test-start
    </a>
    <a class="btn btn-outline-secondary" routerLink="test-end">
      test-end
    </a>
    <a class="btn btn-outline-secondary" routerLink="test-result">
      test-result
    </a>
  </div>
  <hr>
`,
})

export class MockTestControllerComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

}
