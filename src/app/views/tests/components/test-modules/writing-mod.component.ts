import { Component, Input, OnInit } from '@angular/core';
import { TestV3Service } from '../../services/test-v3.service';

@Component({
  selector: 'app-test-writing',
  template: `
  <div class="w-100 m-0 p-0 modules modules-row  " *ngIf="Test.CurrentSectionData">

  <div class="col me-2 mod mod-section">
    <div class="scrollable">

      <h6 class="section-heading "
        [innerHTML]="Test.CurrentSectionData.section_heading"
        *ngIf="Test.CurrentSectionData.section_heading !== '' " ></h6>

      <p class="section-descp "
        [innerHTML]="Test.CurrentSectionData.section_desc" ></p>

      <p class="section-para "
        [innerHTML]="Test.CurrentSectionData.section_para"
        *ngIf="Test.CurrentSectionData.section_para !== '' "></p>

        <div *ngFor="let ques of Test.CurrentSetData.Questions">
          <div class="ques-box">
            <div class="ques-text " [innerHTML]="ques.question"></div>
          </div>
        </div>

      <!-- <div class="section-img" *ngIf="Test.CurrentSectionData.section_image">
        <img [src]="Test.CurrentSectionData.section_image" />
      </div> -->

      <div class="set-img" *ngIf="Test.CurrentSetData.Question_image">
        <img [src]="Test.CurrentSetData.Question_image" />
      </div>

      <div class="set-descp"
        [innerHTML]="Test.CurrentSetData.Question_descp"
        *ngIf="Test.CurrentSetData.Question_descp">
      </div>

      <div class="set-pass"
        *ngIf="Test.CurrentSetData.Question_passage"
        [innerHTML]="Test.CurrentSetData.Question_passage">
      </div>

    </div>
  </div>

  <div class="col mod mod-question">
    <div class="scrollable">


      <div class="set-questions">
        <ng-content ></ng-content>
      </div>
    </div>
  </div>
</div>
  `,
  styleUrls: ['../../style.scss']
})

export class TestWritingV2Component implements OnInit {
  constructor(public Test: TestV3Service) { }

  ngOnInit() {  }
}
