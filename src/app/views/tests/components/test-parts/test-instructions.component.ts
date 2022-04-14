import { Component, Input, OnInit, Output } from '@angular/core';
import { TestV3Service } from '../../services/test-v3.service';

@Component({
  selector: 'app-test-instructions',
  template: `
  <div class="w-100 m-0 p-0 modules" >
    <div class="row p-4  mb-2 mod mod-section " *ngIf="Test.status === 'loaded'">
      <div class="my-2" [innerHTML]="Test.Instructions?.content"></div>
      <div class="mb-2">
        <button class="btn btn-primary btn-big" (click)="onTestStartHandler()">
          Start Test  <i class="fas fa-pen"></i>
        </button>
      </div>
    </div>
    <app-comm-loading *ngIf="Test.status === 'loading'"></app-comm-loading>
    <app-comm-err-500 *ngIf="Test.status === 'parse-error'"></app-comm-err-500>
  </div>

`,
  styleUrls: ['../../style.scss']
})

export class TestInstructionsComponent implements OnInit {
  constructor(public Test: TestV3Service) { }
  ngOnInit() {

   }

  onTestStartHandler(){
    this.Test.startTest();
  }
}
