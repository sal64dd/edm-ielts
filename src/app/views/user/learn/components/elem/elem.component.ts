import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-elem',
  templateUrl: './elem.component.html',
  styleUrls: ['./elem.component.scss']
})
export class ElemComponent implements OnInit {
  @Input() data: {
    type: string,
    module: string,
    img: string,
    route: string[]
  }
  constructor() { }

  ngOnInit(): void {
  }

}
