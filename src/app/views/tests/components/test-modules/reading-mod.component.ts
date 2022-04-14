import { Component, Input, OnInit } from '@angular/core';
import { TestV3Service } from '../../services/test-v3.service';

@Component({
  selector: 'app-test-reading',
  template: `
  <div class="w-100 m-0 p-0 modules modules-row  " *ngIf="Test.CurrentSectionData">

  <div class="col me-2 mod mod-section">
    <div class="scrollable">
      <h6 class="section-heading "
        [innerHTML]="Test.CurrentSectionData.section_heading"
        *ngIf="Test.CurrentSectionData.section_heading !== '' " ></h6>
      <!-- <p class="section-descp "
        [innerHTML]="CurrentSectionData.section_desc" ></p> -->
        <div *ngIf="Test.CurrentSectionData.section_para !== '' ">
          <mx-annotate class="section-para "
            [PageID]="'Test_Annotate_' + Test.CurrentQuestion.CurrentSectionId"
            [Limited]="true"
            [HTML]="Test.CurrentSectionData.section_para"
          ></mx-annotate>
        </div>

    </div>
  </div>

  <div class="col mod mod-question">
    <div class="scrollable">
      <div class="section-img" *ngIf="Test.CurrentSectionData.section_image">
        <img [src]="Test.CurrentSectionData.section_image" />
      </div>

      <div class="set-questions">
        <ng-content ></ng-content>
      </div>
    </div>
  </div>
</div>
  `,
  styleUrls: ['../../style.scss']
})

export class TestReadingV2Component implements OnInit {
  constructor(public Test: TestV3Service) { }

  ngOnInit() {  }
}
