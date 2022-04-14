import { ActivatedRoute } from '@angular/router';
import { Component, Input, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { iTestQueryV1 } from 'src/app/types/test-types';
import { TestV3Service } from './services/test-v3.service';

@Component({
  selector: 'app-test-v3',
  template: `
<div class="test-main" >

  <!-- Main Contet -->
  <ng-container *ngIf="Test.status === 'loaded'">
    <!-- Header -->
    <div class="row test-header ">
      <app-test-header></app-test-header>
    </div>

    <!-- Content -->
    <div class="row test-content" >
      <ng-container [ngSwitch]="this.Test.state">

        <ng-container *ngSwitchCase="'Instructions'">
          <app-test-instructions></app-test-instructions>
        </ng-container>

        <ng-container *ngSwitchCase="'TestInProgress'">
          <app-test-mod-dispatch></app-test-mod-dispatch>
        </ng-container>

        <ng-container *ngSwitchCase="'Result'">
          <app-test-result-instant *ngIf="! Test.resultIsDelayed()"></app-test-result-instant>
          <app-test-result-delayed *ngIf="Test.resultIsDelayed()"></app-test-result-delayed>
        </ng-container>

        <ng-container *ngSwitchCase="'AnswerReview'">
          <app-test-review></app-test-review>
        </ng-container>

      </ng-container>
    </div>

    <!-- Footer -->
    <div class="row py-2 px-4 mb-2  ">
      <app-test-footer *ngIf="this.Test.state === 'TestInProgress'">
      </app-test-footer>
    </div>
  </ng-container>

  <!-- Loading -->
  <ng-container *ngIf="Test.status === 'loading'">
    <!-- Header -->
    <div class="row test-header ">
      <div class="row py-2 px-4 align-items-center text-light">

      <skltn-root [duration]="1000" [rectRadius]="10" flareWidth="50%" bgFill="#d8d5d1" flareFill="rgba(255,255,255, 0.5)">
        <div skltn-bone class="skltn-card__line"></div>
      </skltn-root>

      </div>
    </div>

      <!-- Content -->
      <div class="row test-content" >

      <skltn-root [duration]="1000" [rectRadius]="10" flareWidth="50%" bgFill="#d8d5d1" flareFill="rgba(255,255,255, 0.5)">
        <!-- Card with Avatar -->
        <div class="skltn-card">
          <div skltn-bone class="skltn-card__avatar" type="circle"></div>
          <div class="skltn-card__body">
            <div skltn-bone class="skltn-card__title"></div>
            <div skltn-bone class="skltn-card__line my-1"></div>
            <div skltn-bone class="skltn-card__line my-1"></div>
          </div>
        </div>
      </skltn-root>

      </div>
  </ng-container>

  <!-- Error -->
  <ng-container *ngIf="Test.status === 'parse-error'">
 <!-- Header -->
 <div class="row test-header ">
      <div class="row py-2 px-4 align-items-center text-light">



      </div>
    </div>

      <!-- Content -->
      <div class="row test-content" >

        <app-comm-err-500></app-comm-err-500>

      </div>
  </ng-container>

</div>


  `,
  styleUrls: ['style.scss']
})

export class TestV3Component implements OnInit, OnDestroy {
  constructor(private route: ActivatedRoute, public Test: TestV3Service, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    console.log('Test Component Started');

    // get the route param
    const query = this.getRouteData();
    this.Test.setQuery(query);

    // get instructions
    this.Test.getInstructions();
    // this.Test.startTest();
  }

  private getRouteData(): iTestQueryV1 {

    const CategoryAssocId = this.route.snapshot.params['CategoryAssocId'];
    const TestId = this.route.snapshot.params['TestId'];
    const CategoryId = this.route.snapshot.params['CategoryId'];

    // return {TestId: "33", CategoryId: "47", CategoryAssocId: "82"};
    return {TestId, CategoryAssocId, CategoryId};
  }

  ngOnDestroy() {
    this.Test.stopTimer();
  }
}
