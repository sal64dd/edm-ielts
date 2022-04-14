import { Component, OnInit } from '@angular/core';
import { TestV3Service } from '../../services/test-v3.service';

@Component({
  selector: 'app-test-excercise',
  template: `
  <div class="w-100 m-0 p-0 modules" *ngIf="Test.CurrentSectionData">

    <div class="row mb-2 mod mod-section">
      <h6 class="section-heading "
        [innerHTML]="Test.CurrentSectionData.section_heading"
        *ngIf="Test.CurrentSectionData.section_heading !== '' " ></h6>

      <p class="section-para "
        [innerHTML]="Test.CurrentSectionData.section_para"
        *ngIf="Test.CurrentSectionData.section_para !== '' "></p>

      <div class="audio "  *ngIf="Test.Test.BasicDetails.audio_file">
        <audio
          #audioOption
          id="audio"
          controlsList="nodownload"
          autoplay
          controls="Volume"

          style=" width: 100%;"
        >
          <source [src]="Test.Test.BasicDetails.audio_file" />
        </audio>

        <div class="audio-note d-none">
          <i class="fas fa-headphones"></i>
          <p>Please use headphones for better clarity</p>
        </div>
      </div>
    </div>

    <div class="row mod mod-question">
      <div class="scrollable">
        <div class="section-img" *ngIf="Test.CurrentSectionData.section_image">
          <img [src]="Test.CurrentSectionData.section_image" />
        </div>

        <div class="set-questions">
          <ng-content></ng-content>
        </div>

      </div>
    </div>
  </div>
  `,
  styleUrls: ['../../style.scss']
})

export class TestExcerciseV2Component implements OnInit {
  constructor(public Test: TestV3Service) { }
  ngOnInit() { }
}
