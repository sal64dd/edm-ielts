import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-courses-home',
  template: `
  <div #main class="container-fluid py-4" style="height: 100vh">
    <h1>Courses</h1>
  </div>`
})

export class CoursesHomeComponent implements OnInit {
  constructor() { }

  ngOnInit() { }
}
