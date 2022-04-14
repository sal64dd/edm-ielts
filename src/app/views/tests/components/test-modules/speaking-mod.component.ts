import { Component, Input, OnInit } from '@angular/core';
import { TestV3Service } from '../../services/test-v3.service';

@Component({
  selector: 'app-test-speaking',
  template: `
  <div class="w-100 m-0 p-0 modules  " *ngIf="Test.CurrentSectionData">

  <div class="row mb-2 mod mod-section">
    <h6 class="section-heading "
      [innerHTML]="Test.CurrentSectionData.section_heading"
      *ngIf="Test.CurrentSectionData.section_heading !== '' " ></h6>

    <p class="section-descp "
      [innerHTML]="Test.CurrentSectionData.section_desc" ></p>

    <p class="section-para "
      [innerHTML]="Test.CurrentSectionData.section_para"
      *ngIf="Test.CurrentSectionData.section_para !== '' "></p>

  </div>

  <div class="row mod mod-question">
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

export class TestSpeakingV2Component implements OnInit {
  constructor(public Test: TestV3Service) { }

  ngOnInit() {  }
}
