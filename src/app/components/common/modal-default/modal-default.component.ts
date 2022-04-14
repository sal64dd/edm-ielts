import { Component, Input, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
export type BtnAction = [string , () => any];

@Component({
  selector: 'app-modal-default',
  templateUrl: 'modal-default.component.html',
})
export class ModalDefaultComponent {
  @Input() show: boolean;
  @Input() className: string;
  @Output() output = new EventEmitter();

  @Input() btnSave: BtnAction;
  @Input() btnCancel: BtnAction;
  @Input() btnCross: boolean = true;
  @Input() btnBackground: boolean = true;
  @Input() bgstyle: 'blur' | 'dark' = 'dark';

  @Input() bodyStyle = '';
  @Input() titleStyle = '';

  @Input() noHeader = false;
  constructor() { }


  cancel(){
    this.output.emit(null);
  }
  submit(value: any){
    this.output.emit(value);
  }


}
