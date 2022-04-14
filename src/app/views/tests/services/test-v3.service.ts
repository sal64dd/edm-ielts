import { BehaviorSubject, Subscription } from 'rxjs';
import { Injectable, EventEmitter, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { AudioRecordingV2Service } from 'src/app/services/audio-recording-v2.service';
import { TestV3ApiService } from 'src/app/services/test-v3-api.service';
import { iTestQueryV1, iTestV2, iSectionsV2, iSetV2, iInstructionv1, iTestResultV1, iAnswerv2, iCurentQuestiov1 } from 'src/app/types/test-types';
import { ModalControllerService } from 'src/app/services/modal-controller.service';
import { Router } from '@angular/router';
import { TestModalComponent } from '../components/test-parts/test-modal.component';

@Injectable({providedIn: 'root'})
export class TestV3Service implements OnDestroy {

  // Params to query test data from api
  private Query: iTestQueryV1;
  public setQuery(query: iTestQueryV1){
    this.Query = query;
  }

  // Current_State
  public state: TestState ;
  public status: 'loading' | 'parse-error' | 'loaded' ;


  // data
  public Test: iTestV2;
  public CurrentSectionData: iSectionsV2;
  public CurrentSetData: iSetV2;
  public Instructions: iInstructionv1;
  public Result: iTestResultV1;

  private TestSubscription: Subscription;

  // status

  // answer
  public Answer: iAnswerv2[];
  public AnswerChange = new EventEmitter();

  // current queston
  public _CurrentQuestion = new BehaviorSubject<iCurentQuestiov1>(null);
  public get CurrentQuestion(){ return this._CurrentQuestion.value };
  public set CurrentQuestion(v: iCurentQuestiov1){ this._CurrentQuestion.next(v) };

  // timer
  public TimeLeft: {minutes: string, seconds: string} = null;
  public Timer: NodeJS.Timeout;


  constructor(
    private TestApi: TestV3ApiService,
    private modalController: ModalControllerService,
    private router: Router,
    private recorder: AudioRecordingV2Service
    ) {
  }

   /**
    * Get test data from api
    *
    * @param TestId
    * @param CategoryAssocId
    */
  public getTest( TestId: string, CategoryAssocId: string ) {
    this.status = 'loading';
  }


  public startTest(){
    this.TestApi.getTestData(this.Query.TestId, this.Query.CategoryAssocId).subscribe(
      test => {
        console.log(test)
        this.Test = test;
        this.test_init();
        // this.state = ('TestInProgress');
        // this.SubmitTest();
      },
      error => {
        console.error(error);
        this.status = 'parse-error';
      }
    )

  }

  public stopTimer(){
    clearTimeout(this.Timer);
  }

  /**
   * Inits Test variables
   * Requires Test to be set
   */
  private test_init(){

    if(!this.Test){
      console.error('Test not set');
      this.status = 'parse-error';
      return;
    }

    // set current Mod, Sec, Set
    this.CurrentQuestion = {
      CurrentModule: this.Test.BasicDetails.category_name,
      CurrentSectionId: this.Test.Sections[0].section_id,
      CurrentSetId: this.Test.Sections[0].Sets[0].question_sets_id,
    };

    console.log('current question: ', this.CurrentQuestion)

    this.setTimer();
    this.buildAnswerArray();

    this.TestSubscription = this._CurrentQuestion.subscribe(v => {
      this.getSectionData();
      this.getSetData();
    })

    this.status = 'loaded';
    this.state = ('TestInProgress');
    // this.onSubmit();
  }

  ngOnDestroy(): void {
    this.TestSubscription?.unsubscribe();
  }

  /**
   * Sets timer
   */
  private setTimer(){
    this.TimeLeft = {
      minutes: this.Test.BasicDetails.paper_duration.toString(),
      seconds: "00"
    }
    this.Timer = setInterval(() => {
      let sec = parseInt(this.TimeLeft.minutes, 10) * 60 + parseInt(this.TimeLeft.seconds, 10) ;
      sec -= 1;
      if(sec < 0){
        console.log('Timer Finished');
        this.SubmitTest();
        clearTimeout(this.Timer);
      }
      else {
        this.TimeLeft.minutes = Math.floor((sec / 60)).toString();
        const seconds = (sec % 60).toString();
        this.TimeLeft.seconds = seconds.length == 1 ? '0' + seconds : seconds;
      }

    }, 1000)
  }

  /**
   * builds answer array
   */
  private buildAnswerArray(){
    const Answer: iAnswerv2[] = [];

    for (const section of this.Test.Sections) {
      for (const set of section.Sets) {
        for (const question of set.Questions) {

          Answer.push({
            question_no: question.question_no,
            question_id: question.question_id,
            question_sets_id: set.question_sets_id,
            section_id: section.section_id,

            student_answers: '',

            active: false,

            answer_audio_recrod_duration: 0,
            recordingStatus: 'start',
          });
        }
      }
    }

    this.Answer = Answer;
    this.AnswerChange.emit();
  }

  /**
   * Helper Functions to get section and set data
   * from Test data
   *
   * Requires Test, CurrentQuestion Props to be set.
   */
  private getSectionData(){
    const sec_id = this.CurrentQuestion.CurrentSectionId;
    try{
      this.CurrentSectionData = this.Test.Sections
        .filter(sec => sec.section_id == sec_id)[0];
      console.log( this.CurrentSectionData)
    } catch(e){
      console.error('Section data not found for given id', sec_id, e);
    }
  }
  private getSetData(){
    const set_id = this.CurrentQuestion.CurrentSetId;
    try{
      this.CurrentSetData = this.CurrentSectionData.Sets
        .filter(set => set.question_sets_id == set_id)[0];
      console.log('current set ', this.CurrentSetData)
    } catch(e){
      console.error('Set data not found for given id', set_id, e);
    }

  }

  /**
   * Loads already filled answers from the answer array
   *
   * @returns array of answer string vallues, set to question index in current set
   */
  public loadAnswers(){
    const loadAnswers: string[] = [];
    this.CurrentSetData.Questions.forEach(ques => {
      let ans_val = '';
      try{
        ans_val = (this.Answer.filter(ans => ans.question_id == ques.question_id)[0]).student_answers
      } catch(error){
        console.error('answer array can not find question id',ques.question_id, this.Answer )
      }
      loadAnswers.push(ans_val);
    })
    return loadAnswers;
  }

  /**
   * Test button Handlers
   */
  public onQuit(){
    this.modalController.createModal( {modal: TestModalComponent,
      params: {
        Close: {show: true, callback: () => this.modalController.destroy()},
        Buttons: [
          { text: 'Quit', class: 'btn btn-danger', callback: () => {
            this.modalController.destroy();
            this.QuitTest();
          }},
          { text: 'Continue', class: 'btn btn-secondary', callback: () => this.modalController.destroy()},
        ],
        Header: 'Quit',
        Content: 'Are you sure you want ot quit the test?'
      },
    });
  }

  /**
   * When the sumit btn is pressed
   * - checks number of queston attempted
   * - shows a modal
   */
  public onSubmit(){
    this.modalController.createModal({
      modal: TestModalComponent,
      params: {
        Close: {show: true, callback: () => this.modalController.destroy()},
        Buttons: [
          { text: 'Submit', class: 'btn btn-primary', callback: () => {
            this.modalController.destroy();
            this.SubmitTest();
          }},
          { text: 'Close', class: 'btn btn-secondary', callback: () => this.modalController.destroy()},
        ],
        Header: 'Submit answers for checking?',
        Content: 'Are you sure you want ot submit the test?'
      },
    });
  }

  /**
   * Sumits the test to the backend
   */
  private SubmitTest(){

    this.stopTimer();

    this.status = 'loading';

    this.TestApi.postAnswer(
      this.Test.BasicDetails,
      this.Answer,
      this.getTimeTaken()
    ).subscribe(
      result => {
        this.Result = result
        this.state = ('Result');
        this.status = 'loaded';
      },
      error => {
        this.status = 'parse-error';
      }
    );
  }

  /**
   * quites the test
   */
  private QuitTest(){
    this.stopTimer();
    this.router.navigate(['/user/tests'])
  }

  /**
   * Calculates the time taken
   */
  private getTimeTaken(){
    const {minutes, seconds} = this.TimeLeft;
    const TimeLeft = parseInt(minutes, 10) * 60 + parseInt(seconds, 10);
    const TotalTime = this.Test.BasicDetails.paper_duration * 60;

    const TimeTaken = TotalTime - TimeLeft;
    const minutes_taken = Math.floor(TimeTaken / 60);
    const seconds_taken = Math.floor(TimeTaken % 60);

    return {minutes: minutes_taken, seconds: seconds_taken };
  }

  /**
   * Gets instructions from api
   */
  public getInstructions(){
    this.status = 'loading';
    this.TestApi.getTestInstructions(this.Query.CategoryId).subscribe(
     { next: res => {
        this.Instructions = res; // todo
        this.state = ('Instructions');

        if(res) this.status = 'loaded';
        else this.status = 'parse-error';
        console.log(res)
      },
      error: err => {
        console.log('error ', err);
        this.status = 'parse-error';
      }}
    )

  }

  /**
   * shows modal when no audio devices are detected
   */
  public onAudioError(){
    this.modalController.createModal({
      modal: TestModalComponent,
      params: {
        Close: {show: true, callback: () => this.modalController.destroy()},
        Buttons: [
          { text: 'Retry', class: 'btn btn-primary', callback: async () => {

            if ( (await this.recorder.check()) ){
              this.modalController.destroy();
            }

          }},
          { text: 'Quit', class: 'btn btn-secondary', callback: () => {
            this.modalController.destroy();
            this.QuitTest();
          }},
        ],
        Header: 'No microphone devices found!',
        Content: 'Please attach a microphone to continue the test.'
    }});
  }

  /**
   * If the result is Writing and speaking then it
   * needs to be checked by a human first and is delayed.
   *
   * @returns boolean
   */
  public resultIsDelayed(): boolean {
    return this.CurrentQuestion.CurrentModule == 'Speaking' || this.CurrentQuestion.CurrentModule == 'Writing';
  }
}

export type TestState = 'Instructions' | 'TestInProgress' | 'Result' | 'AnswerReview';
