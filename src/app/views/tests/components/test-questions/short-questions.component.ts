import { Component,  OnInit, ChangeDetectorRef } from '@angular/core';
import { iQuestionV2 } from 'src/app/types/test-types';
import { TestV3Service } from '../../services/test-v3.service';

@Component({
  selector: 'app-short-questions-test',
  template: `
  <div class="set set-table-completion" *ngIf="Test.CurrentSetData">
  <p class="h6 mb-1 text-secondary question-heading" [innerHTML]="Test.CurrentSetData.question_sets_heading"></p>

    <div class="mcq-questions">
      <div class="mcq-question" *ngFor="let q of Test.CurrentSetData.Questions; let i = index">
        <div class="mcq-question-head">
            <span>{{ q.question_no }}. </span>
            <span [innerHTML]="q.question"></span>
        </div>
        <div>
          <input class="long-input" type="text" (change)="onChangeHandler($event)" [id]="'inp_' + i" [value]="loadedAnswers[i]">
        </div>
      </div>
    </div>

  `,
  styleUrls: ['./../../style.scss']
})

export class ShortAnswerComponent implements OnInit {

  public loadedAnswers: string[];
  public status: 'loading' | 'parse-error' | 'loaded' ;

  constructor(public Test: TestV3Service, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.Test._CurrentQuestion.subscribe(v => {
      this.prepare();
    })
  }

  /**
   * Prepares Element Data
   */
  prepare(){
    this.loadedAnswers = this.Test.loadAnswers();
  }

  /**
   * On Input Change Handler
   * Saves changes to answer array
   * emits result
   *
   * @param inpEvent Change Event
   * @returns
   */
  public onChangeHandler(inpEvent: Event){
    // get input
    const input = (inpEvent.target as HTMLInputElement);
    const id = parseInt(input.id.slice(4), 10);

    // get question
    let question: iQuestionV2;
    try{
      question = this.Test.CurrentSetData.Questions[id];
    } catch(e){
      console.error('Cant find question with id', id, e);
      return;
    }

    // set answer
    this.Test.Answer.forEach(ans => {
      if(ans.question_id == question.question_id){
        ans.student_answers = input.value;
        console.log(`${ans.question_no}: ${input.value}`);
      }
    })

    // emit
    this.Test.AnswerChange.emit();
  }
}
