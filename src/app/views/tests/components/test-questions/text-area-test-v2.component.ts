import { Component, ViewChild, ChangeDetectorRef, ElementRef, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { TestV3Service } from '../../services/test-v3.service';

@Component({
  selector: 'app-text-area-test',
  template: `
  <div class="set set-table-completion" *ngIf="Test.CurrentSetData">
    <p class="h6 mb-1 text-secondary question-heading" [innerHTML]="Test.CurrentSetData.question_sets_heading"></p>
    <p class="lead question-desp" [innerHTML]="Test.CurrentSetData.Question_descp"></p>

    <div class="input-area">
      <textarea
        spellcheck="false"
        (change)="null"
        (input)="onTextChangeHandler($event)"
        [value]="answer"
        class="w-100"
        rows="20">
      </textarea>
      <div class="mt-2 word-count text-secondary">
        <span>Word Count: {{ AnswerLength }}</span>
      </div>
    </div>

  </div>
  `,
  styleUrls: ['./../../style.scss']
})

export class TextAreaTestComponent implements OnInit {

  @ViewChild('TextArea') TextArea: ElementRef;

  public answer: string ;
  public get AnswerLength(){ return this.answer.split(/\w+/).length - 1; }

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
    const loadAnswers = this.Test.loadAnswers();
    this.answer = loadAnswers[0];
  }

  /**
   *
   */
  public onTextChangeHandler(event: Event){
    this.answer = (event.target as HTMLTextAreaElement).value;
    const question_id = this.Test.CurrentSetData.Questions[0].question_id;

    // set answer
    this.Test.Answer.forEach(ans => {
      if(ans.question_sets_id == this.Test.CurrentQuestion.CurrentSetId){
        ans.student_answers = this.answer;
        console.log(`${ans.question_no}: ${this.answer}`);
      }
    })

    // emit
    this.Test.AnswerChange.emit();
  }


}
