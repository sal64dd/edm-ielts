import { Component, OnInit } from '@angular/core';
import { ModalDefaultComponent } from 'src/app/components/common/modal-default/modal-default.component';

@Component({
  selector: 'app-modal-new-counselling-session',
  templateUrl: 'new-counselling-session-modal.component.html'
})

export class NewCounsellingSessionModalComponent extends ModalDefaultComponent implements OnInit {
  loader: 'loading' | 'loaded' | 'idle' = 'idle';
  constructor() { super(); }

  ngOnInit() { }

  createSession(){

  }
}
