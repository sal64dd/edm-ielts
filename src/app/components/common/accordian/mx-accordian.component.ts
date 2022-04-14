/* eslint-disable @angular-eslint/component-selector */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { iNode } from 'src/app/services/core/cachev1.service';


@Component({
  selector: 'mx-accordian',
  templateUrl: 'mx-accordian.component.html',
  styleUrls: ['mx-accordian.component.scss']
})

export class MxAccordianComponent implements OnInit {
  @Input() id: string;
  @Input() cls: string;
  @Input() tree: iNode;
  @Input() path: string[];
  @Input() level: number = 1
  @Output() clicked = new EventEmitter<string[]>()

  constructor() { }
  ngOnInit() {
   }

  public isBranchActive(id){
    if(this.path?.length >= this.level){
      if (this.path[this.level] == id){
        return true
      }
    }
    return false
  }

}
