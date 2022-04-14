import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { TestV3Service } from '../../services/test-v3.service';

@Component({
  selector: 'app-test-set-dispatch',
  template: `
  <div *ngIf="Test.CurrentSetData">

    <!-- Debug -->
    <div class="border d-none">
        <div >behavior_name: {{Test.CurrentSetData.behavior_name}}</div>
        <div >Question_type: {{Test.CurrentSetData.Question_type}}</div>
    </div>

    <div [ngSwitch]="Test.CurrentSetData.behavior_name" >

      <div *ngSwitchCase="'text'">
        <ng-container [ngSwitch]="Test.CurrentSetData.Question_type" >

          <!-- 1. Short Answers -->
          <app-short-questions-test
            *ngSwitchCase='"Short answer questions"'>
          </app-short-questions-test>

          <!-- 2. Sentece Completion -->
          <ng-container *ngSwitchCase='"Sentence completion"'>

            <!-- #REFAC: Sentence completion can have text in passage or questions
                  - If its in passage then it goes to fill in the blanks
                  - if its in questions then it goes to sentence completion componene  -->
            <app-sentence-comp-test
              *ngIf="!'Test.CurrentSetData.Question_passage'">
            </app-sentence-comp-test>

            <app-fill-blank-test-v2
            *ngIf="'Test.CurrentSetData.Question_passage'">
            </app-fill-blank-test-v2>
          </ng-container>

          <!-- 3. Fill in blank Question -->
          <app-fill-blank-test-v2
            *ngSwitchDefault>
          </app-fill-blank-test-v2>

        </ng-container>
      </div>

      <!-- 4. MCQ Question -->
      <div *ngSwitchCase="'Radio'">
        <app-multiple-choice-test-v2></app-multiple-choice-test-v2>
      </div>

  </div>
  `,
  styleUrls: ['../../style.scss']
})

export class TestSetDispatcherComponent implements OnDestroy, OnInit{
  TestSubscription: Subscription;
  constructor(public Test: TestV3Service, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.Test._CurrentQuestion.subscribe(v => {
      this.cd.detectChanges();
    })
  }

  ngOnDestroy(): void {
    this.TestSubscription?.unsubscribe();
  }
}
