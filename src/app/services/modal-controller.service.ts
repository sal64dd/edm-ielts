import { ComponentRef, Injectable, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { BasicModalComponent } from '../components/common/basic-modal/basic-modal.component';
import { ModalAdhocDirective } from '../components/common/modal-adhoc.directive';

@Injectable({providedIn: 'root'})
export class ModalControllerService {
  modalAdHoc: ModalAdhocDirective | null = null;
  compRef: ComponentRef<BasicModalComponent> | null = null;
  constructor() { }

  register(modalAdHoc: ModalAdhocDirective){
    console.log(modalAdHoc);
    this.modalAdHoc = modalAdHoc;
  }

  createModal({modal, params}:{modal: Type<BasicModalComponent>; params: any;}): Observable<any>{
    this.modalAdHoc.viewContainerRef.clear();
    this.compRef = this.modalAdHoc.viewContainerRef.createComponent<BasicModalComponent>(modal);
    this.compRef.instance.data = params;
    return this.compRef.instance.onSubmit.asObservable();
  }

  destroy(){
    this.modalAdHoc.viewContainerRef.clear();
  }

}
