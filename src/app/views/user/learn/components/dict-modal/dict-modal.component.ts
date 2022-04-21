import { Component, OnInit } from '@angular/core';
import { BasicModalComponent } from 'src/app/components/common/basic-modal/basic-modal.component';

@Component({
  selector: 'app-dict-modal',
  templateUrl: './dict-modal.component.html',
  styleUrls: ['./dict-modal.component.scss']
})
export class DictModalComponent extends BasicModalComponent implements OnInit {

  constructor() {super(); }

  ngOnInit(): void {
  }

  close(){
    this.onSubmit.next(null);
  }

}
