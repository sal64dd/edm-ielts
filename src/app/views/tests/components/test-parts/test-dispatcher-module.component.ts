import { Subscription } from 'rxjs';
import { Component, Input, OnInit, Output, EventEmitter, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { TestV3Service } from '../../services/test-v3.service';

@Component({
  selector: 'app-test-mod-dispatch',
  template: `
  <ng-container [ngSwitch]="Test.CurrentQuestion.CurrentModule" >

    <ng-container *ngSwitchCase="'Listening'">
      <app-test-listening>
        <app-test-set-dispatch></app-test-set-dispatch>
      </app-test-listening>
    </ng-container>

    <ng-container *ngSwitchCase="'Reading'">
      <app-test-reading>
        <app-test-set-dispatch ></app-test-set-dispatch>
      </app-test-reading>
    </ng-container>

    <ng-container *ngSwitchCase="'Writing'">
      <app-test-writing>
        <app-text-area-test></app-text-area-test>
      </app-test-writing>
    </ng-container>

    <ng-container *ngSwitchCase="'Speaking'">
      <app-test-speaking>
        <app-record-test></app-record-test>
      </app-test-speaking>
    </ng-container>

    <ng-container *ngSwitchDefault>
      <app-test-excercise>
        <app-test-set-dispatch></app-test-set-dispatch>
      </app-test-excercise>
    </ng-container>

  </ng-container>

  `
})

export class TestModDispatcherComponent implements OnDestroy, OnInit{
  TestSubscription: Subscription;
  constructor(public Test: TestV3Service, private cd: ChangeDetectorRef) {
    this.TestSubscription = this.Test._CurrentQuestion.subscribe((v)=>{
    })
   }

  ngOnInit(): void {
    this.Test._CurrentQuestion.subscribe(v => {
      this.cd.detectChanges();
    })
  }

  ngOnDestroy(): void {
    this.TestSubscription?.unsubscribe();
  }
}
