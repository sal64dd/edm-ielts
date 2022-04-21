import { Component, OnInit } from '@angular/core';
import { ModalControllerService } from 'src/app/services/modal-controller.service';
import { TopElem } from 'src/app/types/common-components';
import { DictModalComponent } from './components/dict-modal/dict-modal.component';

@Component({
  selector: 'app-user-learn',
  templateUrl: `./learn.component.html`
})

export class LearnComponent implements OnInit {

  dictModal(){
    this.modal.createModal({modal: DictModalComponent, params: {id: 'Funambulism'}}).subscribe(d => {

      if(!d){this.modal.destroy(); return;}

      console.log(d);

    })
  }

  constructor(private modal: ModalControllerService) { }

  ngOnInit() { }
}
