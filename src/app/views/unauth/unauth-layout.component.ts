import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-unauth-layout',
  template: `
    <router-outlet></router-outlet>
  `
})

export class UnAuthLayoutComponent implements OnInit {
  constructor() { }

  ngOnInit() { }
}
