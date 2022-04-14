import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styles: [],
})
export  class ModalComponent<OutputType> {
  @Input() id: string = 'modal';
  @Output() output = new EventEmitter<OutputType>();

  style: 'FULLSCREEN' | 'NORMAL' = 'NORMAL';
  showHeader = true;
  showBody = true;
  showFooter = true;

  constructor() {}
}
