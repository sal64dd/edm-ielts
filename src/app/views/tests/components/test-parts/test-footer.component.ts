import { Subscription } from 'rxjs';
import { Component, Input, OnInit, Output, EventEmitter, ViewChild, ElementRef, ViewChildren, OnChanges, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { iQuestionV2 } from 'src/app/types/test-types';
import { TestV3Service } from '../../services/test-v3.service';

@Component({
  selector: 'app-test-footer',
  template: `
  <div class="d-flex h-100 test-footer">

    <!--question  List -->
    <div class="col list-main-wrapper ">
      <div #queslist class="list-main" [class.expanded]="isQuesListExpanded">

      <!-- Writing question list -->
      <ng-container *ngIf="Test.CurrentQuestion.CurrentModule !== 'Writing'" >

        <div class="list-sec" *ngFor="let section of Test.Test.Sections; let i = index">
          <span> {{ section.section_heading }} </span>
          <ng-container *ngFor="let set of section.Sets; let j = index">
            <ng-container *ngFor="let ques of set.Questions; let k = index">

              <span class="list-question"
                (click)="jump(section.section_id, set.question_sets_id)"
                [class.answerd]="isAnswered(ques)" >
                {{ ques.question_no }}
              </span>
            </ng-container>
          </ng-container>
        </div>

      </ng-container>

      <!-- rest of teh modules question list -->
      <ng-container *ngIf="Test.CurrentQuestion.CurrentModule === 'Writing'" >

        <ng-container class="list-sec" *ngFor="let section of Test.Test.Sections; let i = index">
          <ng-container *ngFor="let set of section.Sets; let j = index">
            <ng-container *ngFor="let ques of set.Questions; let k = index">

              <span class="list-question list-ques-big"
                (click)="jump(section.section_id, set.question_sets_id)"
                [class.answerd]="isAnswered(ques)" >
                {{ section.section_heading }}
              </span>

            </ng-container>
          </ng-container>
        </ng-container>

      </ng-container>

      </div>
    </div>

    <!-- Drop up button -->
    <div class="col-auto mx-2 ">
      <button
        type="button"
        class="btn btn-outline-warning "
        (click)="isQuesListExpanded = !isQuesListExpanded"
      >
        <i class="fa fa-angle-up"></i>
      </button>
    </div>

    <!-- Rest of the buttons -->
    <div class="col-auto ">
      <button
        class="btn mx-2"
        [disabled]="disableBack"
        [ngClass]="{
          'btn-secondary': !disableBack,
          'btn-outline-secondary': disableBack
        }"
        (click)="back()" >
        <i class="fas fa-arrow-left"></i>
        Previous
      </button>
      <button
        class="btn mx-2"
        [disabled]="disableNext"
        [ngClass]="{
          'btn-success': !disableNext,
          'btn-outline-success': disableNext
        }"
        (click)="next()" >
        Next
        <i class="fas fa-arrow-right"></i>
      </button>
      <button class="btn btn-primary mx-2" (click)="Test.onSubmit()">
        Submit
        <i class="fas fa-check-circle"></i>
      </button>
    </div>
  </div>
  `,
  styleUrls:['../../style.scss']
})
export class TestFooterComponent implements OnDestroy, OnInit {

  @ViewChild('queslist') QuesList: ElementRef;

  private TestSubscription: Subscription;

  public isQuesListExpanded: boolean = false;
  public disableNext: boolean;
  public disableBack: boolean;

  constructor(
    private cd: ChangeDetectorRef,
    public Test: TestV3Service
  ) { }

  ngOnInit(): void {
    this.TestSubscription = this.Test._CurrentQuestion.subscribe((v) => {
      if(v == null) {return;}
      this.isFirstQuestion();
      this.isLastQuestion();
      this.scrollQuesList();
    })
  }

  ngOnDestroy() { this.TestSubscription?.unsubscribe(); }

  /**
   * Is First, is Last question
   */
  private isFirstQuestion(): boolean{
    const first_section_id = this.Test.Test.Sections[0].section_id;
    const first_set_id = this.Test.Test.Sections[0].Sets[0].question_sets_id;

    if(
      first_section_id == this.Test.CurrentQuestion.CurrentSectionId &&
      first_set_id == this.Test.CurrentQuestion.CurrentSetId
    ) {
      this.disableBack = true;
        return true;
    }
    else{
      this.disableBack = false;;
      return false;
    }
  }
  private isLastQuestion(): boolean{
    const section_length = this.Test.Test.Sections.length;
    const last_section = this.Test.Test.Sections[section_length-1];
    const set_length = last_section.Sets.length;
    const last_set = last_section.Sets[set_length - 1];

    const last_section_id = last_section.section_id;
    const last_set_id = last_set.question_sets_id;

    if(
      last_section_id == this.Test.CurrentQuestion.CurrentSectionId &&
      last_set_id == this.Test.CurrentQuestion.CurrentSetId
    ) {
      this.disableNext = true;
      return true;
    }
    else{
      this.disableNext = false;
      return false;
    }
  }

  /**
   * Test Movement Control
   */
  public next(){
    if(this.isLastQuestion()){ return; }

    const {setIndex, sectionIndex} = this.getCurrentIndex();
    let NewSectionId;
    let NewSetId;

    if((setIndex + 1) < this.Test.Test.Sections[sectionIndex].Sets.length){
      // next set
      NewSetId = this.Test.Test.Sections[sectionIndex].Sets[setIndex + 1]
      .question_sets_id;
      NewSectionId = this.Test.CurrentQuestion.CurrentSectionId;
      console.log('next set')
    }
    else if((sectionIndex + 1) < this.Test.Test.Sections.length){
      // next section
      const newsection = this.Test.Test.Sections[sectionIndex +1 ];
      NewSectionId = newsection.section_id;
      NewSetId = newsection.Sets[0].question_sets_id;
      console.log('next section')
    } else{
      console.error('Cannot set next', setIndex, sectionIndex);
    }

    this.Test.CurrentQuestion = {
      CurrentModule: this.Test.CurrentQuestion.CurrentModule,
      CurrentSectionId: NewSectionId,
      CurrentSetId: NewSetId
    };

    console.log('next',this.Test.CurrentQuestion)
  }

  public back(){
    if(this.isFirstQuestion()){ return; }

    const {setIndex, sectionIndex} = this.getCurrentIndex();
    let NewSectionId;
    let NewSetId;

    if((setIndex - 1) >= 0){
      // next set
     NewSetId = this.Test.Test.Sections[sectionIndex].Sets[setIndex -1]
        .question_sets_id;
    NewSectionId = this.Test.CurrentQuestion.CurrentSectionId;
    }
    else if((sectionIndex - 1) >= 0){
      // next section
      const newsection = this.Test.Test.Sections[sectionIndex -1];
      NewSectionId = newsection.section_id;
      NewSetId = newsection.Sets[ newsection.Sets.length - 1 ].question_sets_id;
    } else{
      console.error('Cannot set back', setIndex, sectionIndex);
    }

    this.Test.CurrentQuestion = {
      CurrentModule: this.Test.CurrentQuestion.CurrentModule,
      CurrentSectionId: NewSectionId,
      CurrentSetId: NewSetId
    };

    console.log('back',this.Test.CurrentQuestion)

  }

  public jump(section_id: string, set_id: string){

    this.Test.CurrentQuestion = {
      CurrentModule: this.Test.CurrentQuestion.CurrentModule,
      CurrentSectionId: section_id,
      CurrentSetId: set_id
    };

    this.isQuesListExpanded = false;
  }

  /**
   * @todo Refactor of Next and back function to
   * encapsulate similar functionality
   *
   * @param offsetBy
   */
  private offset(offsetBy?: number){
  }

  /**
   * Gets the index of section and set in test
   */
  private getCurrentIndex(): {setIndex: number, sectionIndex: number}{

    for(let i = 0; i < this.Test.Test.Sections.length; i++){
      const section = this.Test.Test.Sections[i];
      if(section.section_id == this.Test.CurrentQuestion.CurrentSectionId){
        for(let j = 0; j< section.Sets.length; j++){
          const set = section.Sets[j];
          if(set.question_sets_id == this.Test.CurrentQuestion.CurrentSetId){
            return {setIndex: j, sectionIndex: i};
          }
        }
      }
    }

    console.error('Error while getting index')
    return null;

  }

  /**
   * Show the current section question list
   */
  private scrollQuesList(){
    this.cd.detectChanges();
    // rum this only after closing animation is finished
    const timeout: NodeJS.Timeout = setTimeout(() =>{

      this.Test.Test.Sections.forEach((sec,i) => {
        if(sec.section_id == this.Test.CurrentQuestion.CurrentSectionId){
          console.log('jump 2 ', i);
          (this.QuesList.nativeElement as HTMLElement)
            .children[i].scrollIntoView();
        }
      });

    }, 300)

  }

  /**
   * If the given question is attempted by the user
   */
  public isAnswered(ques: iQuestionV2): boolean{
    for(const ans of this.Test.Answer){
      if (ans.question_id == ques.question_id){
        if(ans.student_answers != ''){
          return true;
        } else{
          return false;
        }
      }
    }
      return false;
  }

}
