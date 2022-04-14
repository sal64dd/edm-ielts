import { Component, Input, OnInit, Output } from '@angular/core';
import { BasicModalComponent } from 'src/app/components/common/basic-modal/basic-modal.component';

@Component({
  selector: 'app-test-modal',
  template: `
  <div class="modal" tabindex="-1" role="dialog" aria-hidden="false">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{Header}}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"
            (click)="Close.callback()">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body" >
          <p>{{Content}}</p>
        </div>
        <div class="modal-footer">
          <button type="button" *ngFor="let b of Buttons" [class]="b.class" (click)="b.callback()" >{{b.text}}</button>
        </div>
      </div>
    </div>
  </div>
`,
  styleUrls: ['../../style.scss']
})

export class TestModalComponent extends BasicModalComponent implements OnInit {
  constructor() { super(); }
  Close: {show: boolean, callback: () => void}
  Buttons: { text: string, class: string, callback: () => void}[];
  Header: string;
  Content: string;
  ngOnInit() {
    this.Close = this.data['Close'];
    this.Buttons = this.data['Buttons'];
    this.Header = this.data['Header'];
    this.Content = this.data['Content'];
  }
}
