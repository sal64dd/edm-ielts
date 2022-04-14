import { Component, Input, OnInit } from '@angular/core';
import { TopElem } from 'src/app/types/common-components';

@Component({
  selector: 'app-top-elements',
  templateUrl: './top-elements.component.html',
  styles: [],
})
export class TopElementsComponent implements OnInit {
  @Input() TopElemList: TopElem[] = [];

  constructor() {}

  ngOnInit(): void {}
}
