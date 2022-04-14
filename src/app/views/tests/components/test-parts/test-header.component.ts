import { Component, Input, OnInit, Output } from '@angular/core';
import { TestV3Service } from '../../services/test-v3.service';

@Component({
  selector: 'app-test-header',
  template: `
    <div class="row py-2 px-4 align-items-center  text-light">

      <!-- Test in progress header -->
      <ng-container *ngIf="Test.state === 'TestInProgress'">
        <span class="test-info col lead">
          <strong>{{Test.Test.BasicDetails.test_seriese_name}} | {{Test.Test.BasicDetails.category_name}}</strong>
        </span>

        <span class="timer col-auto ">
          <strong>
            <i class="far fa-clock"></i>
            {{Test.TimeLeft.minutes}}:{{Test.TimeLeft.seconds}}
          </strong>
        </span>
      </ng-container>

      <ng-container *ngIf="Test.state === 'Instructions'">
        <span class="test-info col lead">
          <strong>Instructions</strong>
        </span>
      </ng-container>

      <ng-container *ngIf="Test.state === 'Result'">
        <span class="test-info col lead">
          <strong>Result</strong>
        </span>
      </ng-container>

      <ng-container *ngIf="Test.state === 'AnswerReview'">
        <span class="test-info col lead">
          <strong>Review</strong>
        </span>
      </ng-container>

      <!-- Common for all states -->
      <span class="quit col-auto">
        <button class="btn btn-light mx-2"
          (click)="Test.onQuit()">
          Quit
          <i class="far fa-times-circle"></i>
        </button>
      </span>

    </div>
`,
  styleUrls: ['../../style.scss']
})

export class TestHeaderComponent implements OnInit {
  constructor(public Test: TestV3Service) { }
  ngOnInit() {

  }
}
