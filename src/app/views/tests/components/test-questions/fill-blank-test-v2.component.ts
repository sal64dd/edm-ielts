import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ChangeDetectorRef, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { iQuestionV2 } from 'src/app/types/test-types';
import { TestV3Service } from '../../services/test-v3.service';

@Component({
  selector: 'app-fill-blank-test-v2',
  template: `
  <div class="set set-table-completion" *ngIf="Test.CurrentSetData">
  <p class="h6 mb-1 text-secondary question-heading" [innerHTML]="Test.CurrentSetData.question_sets_heading"></p>
  <!-- <p class="lead question-desp" [innerHTML]="CurrentSetData.Question_descp"></p> -->
  <!-- <p class="question-image">{{CurrentSetData.Question_image}}</p> -->

  <div #HtmlContent *ngIf="OutputContent" [innerHTML]="OutputContent | sanitizeHtml"></div>
  `,
  styleUrls: ['./../../style.scss']
})

export class FillBlankTestV2Component implements OnInit {

  @ViewChild('HtmlContent') OutputContentRef: ElementRef;

  public OutputContent: string;

  public status: 'loading' | 'parse-error' | 'loaded' ;

  constructor(public Test: TestV3Service, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.Test._CurrentQuestion.subscribe((v: any) => {
      this.prepare();
    })
  }

  /**
   * Prepares Element Data
   */
  prepare(){
    let i=0;
    const loadAnswers = this.Test.loadAnswers();
    this.OutputContent = this.Test.CurrentSetData.Question_passage
      .replace(/~~~/g, (str: any) => `<input type="text" id="inp_${i}" value="${loadAnswers[i++]}">`);
    this.cd.detectChanges();
    const inputs = this.getInputElements();
    this.setChangeHandlers(inputs);
  }

  private getInputElements(): HTMLInputElement[]{
    return this.OutputContentRef.nativeElement.querySelectorAll('input');
  }

  private setChangeHandlers(inputs: HTMLInputElement[]){
    inputs.forEach(input => {
      input.addEventListener('change',
        $event => this.onChangeHandler($event))
    })
  }

  /**
   * On Input Change Handler
   * Saves changes to answer array
   * emits result
   *
   * @param inpEvent Change Event
   * @returns
   */
  private onChangeHandler(inpEvent: Event){
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
    this.Test.Answer.forEach((ans: any) => {
      if(ans.question_id == question.question_id){
        ans.student_answers = input.value;
        console.log(`${ans.question_no}: ${input.value}`);
      }
    })

    // emit
    this.Test.AnswerChange.emit();
  }
}
