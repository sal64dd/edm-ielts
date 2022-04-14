import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress-box',
  templateUrl: './progress-box.component.html',
  styles: [
  ]
})
export class ProgressBoxComponent implements OnInit {

  modules = [
    {
      module: 'Listening',
      icon: 'ri-customer-service-line',
      avgScore: 7.0,
    },
    {
      module: 'Reading',
      icon: 'ri-book-open-line',
      avgScore: 6.5,
    },
    {
      module: 'Writing',
      icon: 'ri-edit-2-line',
      avgScore: 5.0,
    },
    {
      module: 'Speaking',
      icon: 'ri-mic-line',
      avgScore: 4.0,
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
