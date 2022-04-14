import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[modalAdhoc]'
})
export class ModalAdhocDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
