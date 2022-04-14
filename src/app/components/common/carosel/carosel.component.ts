import { Component, Input, OnInit } from '@angular/core';
import { CaroselList } from 'src/app/types/common-components';

@Component({
  selector: 'app-carosel',
  templateUrl: './carosel.component.html',
  styles: [
  ]
})
export class CaroselComponent implements OnInit {
  @Input() CaroselList: CaroselList[] = []
  constructor() { }

  ngOnInit(): void {
  }

}
