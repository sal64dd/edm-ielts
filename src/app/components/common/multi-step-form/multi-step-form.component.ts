import { Component, Input, OnInit } from '@angular/core';
import { MultiStepElem } from 'src/app/types/common-components';

@Component({
  selector: 'app-multi-step-form',
  templateUrl: './multi-step-form.component.html',
  styles: [
  ]
})
export class MultiStepFormComponent implements OnInit {

  @Input() data: MultiStepElem[] = []
  current_pos: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
