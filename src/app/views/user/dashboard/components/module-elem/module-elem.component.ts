import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-module-elem',
  templateUrl: './module-elem.component.html',
  styles: [
  ]
})
export class ModuleElemComponent implements OnInit {
  @Input() module: string = '';
  @Input() level: string = '';
  constructor() { }

  ngOnInit(): void {
  }

}
