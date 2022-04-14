import { Component, ViewChild, ChangeDetectorRef, ElementRef, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { iQuestionV2, iOptionV2 } from 'src/app/types/test-types';
import { TestV3Service } from '../../services/test-v3.service';

@Component({
  selector: 'app-multiple-choice-test-v2',
  template: `
  <div class="set set-table-completion" *ngIf="Test.CurrentSetData">
    <p class="h6 mb-1 text-secondary question-heading" [innerHTML]="Test.CurrentSetData.question_sets_heading"></p>
    <!-- <p class="lead question-desp" [innerHTML]="CurrentSetData.Question_descp"></p> -->
    <!-- <p class="question-image">{{CurrentSetData.Question_image}}</p> -->

    <div class="para" [innerHTML]="Test.CurrentSetData.Question_passage"></div>

    <div class="mcq-questions">
      <div class="mcq-question" *ngFor="let q of Test.CurrentSetData.Questions; let i = index">
        <div class="mcq-question-head">
            <span>{{ q.question_no }}. </span>
            <span [innerHTML]="q.question"></span>
        </div>
        <div class="options">
          <div class="option btn "
            [ngClass]="{
              'btn-success': selectedOptions[i] === o.option_key,
              'btn-outline-secondary': selectedOptions[i] !== o.option_key
            }"
            *ngFor="let o of q.options;"
            (click)="onOptionSelected(q,o)"
          >
            <span class="opt option-indicator-success"
              *ngIf="selectedOptions[i] === o.option_key">
              <i class="fas fa-check"></i>
            </span>
            <span class="opt option-indicator"
              *ngIf="selectedOptions[i] !== o.option_key">
            </span>
            <span class="opt option-value"><b>{{o.option_key}}</b></span>
            <span class="opt option-text">{{o.option_value}}</span>
          </div>
        </div>
      </div>
    </div>

  </div>
  `,
  styleUrls: ['./../../style.scss']
})

export class MultipleChoiceTestV2Component implements OnInit {

  @ViewChild('HtmlContent') OutputContentRef: ElementRef;

  public status: 'loading' | 'parse-error' | 'loaded' ;

  public selectedOptions: string[];

  constructor(private cd: ChangeDetectorRef, public Test: TestV3Service) { }

  ngOnInit(): void {
    this.Test._CurrentQuestion.subscribe(v => {
      this.prepare();
    })
  }

  /**
   * Prepares Element Data
   */
  prepare(){
    this.selectedOptions = [];
    const loadAnswers = this.Test.loadAnswers();
    // set option class
    this.Test.CurrentSetData.Questions.forEach((q,i) => {
      this.selectedOptions.push(loadAnswers[i]);
    });
  }

  /**
   * On Option selected Handler
   * Saves changes to answer array
   * sets the option to change class
   * emits result
   *
   * @param question question
   * @param option the selected option
   * @returns
   */
  public onOptionSelected(question: iQuestionV2, option: iOptionV2){

    // set answer
    this.Test.Answer.forEach(ans => {
      if(ans.question_id == question.question_id){
        ans.student_answers = option.option_key;
        console.log(`${ans.question_no}: ${option.option_key}`);
      }
    })

    // set option class
    this.Test.CurrentSetData.Questions.forEach((q,i) => {
      if(question.question_id == q.question_id){
        this.selectedOptions[i] = option.option_key;
      }
    });

    // emit
    this.Test.AnswerChange.emit();
  }


}
