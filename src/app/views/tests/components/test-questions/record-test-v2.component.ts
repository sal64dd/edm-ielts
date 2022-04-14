import { Component, ViewChild, ChangeDetectorRef, ElementRef, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { AudioRecordingV2Service } from 'src/app/services/audio-recording-v2.service';
import { TestV3Service } from '../../services/test-v3.service';

@Component({
  selector: 'app-record-test',
  template: `
  <div class="set set-table-completion" *ngIf="status === 'loaded'">
    <!-- <p class="h6 mb-1 text-secondary question-heading" [innerHTML]="Test.CurrentSetData.question_sets_heading"></p> -->
    <!-- <p class="lead question-desp" [innerHTML]="Test.CurrentSetData.Question_descp"></p> -->

    <div class="spk-question mb-4 p-4" *ngFor="let question of Test.CurrentSetData.Questions; let i = index">
      <div class="spk-question-text">
        <span class="col-auto me-2">Q{{question.question_no}}.</span>
        <span class="col" [innerHTML]="question.question"></span>
      </div>
      <div class="recording my-2">

        <div class="btn-group" role="group" >

          <!-- Record -->
          <ng-container *ngIf="this.recordings[i].recorded === false">
            <button type="button"
              class="btn btn-outline-danger"
              (click)="onRecordHandler(i)"
              *ngIf="this.recordings[i].status !== 'recording' " >

              <span >
                <i class="fas fa-microphone"></i> Record
              </span>

            </button>

            <button type="button"
              class="btn btn-danger"
              (click)="onRecordHandler(i)"
              *ngIf="this.recordings[i].status === 'recording' " >

              <span  >
                <i class="fas fa-stop"></i> Stop
              </span>

            </button>
          </ng-container>


          <!-- Play/ delete -->
          <ng-container *ngIf="this.recordings[i].recorded === true">
            <button
              type="button"
              class="btn btn-outline-success"
              (click)="onPlayHandler(i)">

              <span *ngIf="this.recordings[i].status !== 'playing'" >
                <i class="fas fa-play"></i> Play
              </span>

              <span *ngIf="this.recordings[i].status === 'playing'" >
                <i class="fas fa-stop"></i> Stop
              </span>

            </button>

            <!-- Stop -->
            <button type="button"
              class="btn btn-outline-secondary"
              (click)="onDeleteHandler(i)">
              <i class="fa fa-trash"></i> Delete
            </button>
          </ng-container>


        </div>

        <!-- <div class="progress ms-2">
          <div class="progress-bar" role="progressbar" [attr.aria-valuenow]=""
          aria-valuemin="0" aria-valuemax="100" style="width:70%">
          </div>
        </div> -->

        <!-- <div class="record-timing ms-3">
          {{'00:00'}}
        </div> -->

      </div>


    </div>


  </div>
  `,
  styleUrls: ['./../../style.scss']
})

export class RecordTestComponent implements OnInit {

  public status: 'loading' | 'parse-error' | 'loaded' = 'loading' ;

  public recordings: {
    recorded: boolean,
    status: 'ideal' | 'playing' | 'recording',
    blob: Blob,
  }[] ;

  public currentActiveIndex: number;
  public audioStatus: 'ideal' | 'playing' | 'recording';
  private audio: HTMLAudioElement;

  private timer: NodeJS.Timeout;

  constructor(
    private cd: ChangeDetectorRef,
    public Test: TestV3Service,
    public recorder: AudioRecordingV2Service
  ) { }

  ngOnInit() {
    this.Test._CurrentQuestion.subscribe(v => {
      this.prepare();
    })
  }

  startRecording(index: number) {
    try {
      this.recorder.start();
      this.currentActiveIndex = index;
      this.recordings[this.currentActiveIndex].status = 'recording';

    } catch(e){
      console.log(e);
    }
  }

   stopRecording() {
    this.recorder.stop(()=>{

      this.recordings[this.currentActiveIndex] = {
        recorded: true,
        status: 'ideal',
        blob: this.recorder.audioBlob,

      };

      const q = this.Test.CurrentSetData.Questions[this.currentActiveIndex];
      const ans = this.Test.Answer.filter(a => a.question_id == q.question_id)[0];

       this.recorder.BlobToBase64().then(v => {
        ans.is_img = true;
        ans.student_answers = v as string;
        console.log('base 64 answer', v as string)
      })

    });

    this.recorder.status = 'ideal';
  }

  startPlaying(index: number){
    this.audioStatus = 'playing';
    this.recordings[index].status = 'playing';
    const audioURL = URL.createObjectURL(this.recordings[index].blob);
    this.audio = new Audio(audioURL);
    this.audio.play();
    this.audio.addEventListener('ended', ()=>{this.stopPlaying()})
  }

  stopPlaying(){
    this.recordings[this.currentActiveIndex].status = 'ideal';
    this.audioStatus = 'ideal';
    this.audio.pause();
    this.audio = null;
  }


  /**
   * Prepares Element Data
   */
  prepare(){
    this.audioStatus = 'ideal';

    this.recordings = [];
    this.Test.CurrentSetData.Questions.forEach(v => {
      this.recordings.push({
        recorded: false,
        status: 'ideal',
        blob: null,
      });
    })

    this.status = 'loaded';

    // this.recordings = this.Test.loadAnswers();
  }

  public async onRecordHandler(index: any){

    if (! (await this.recorder.check()) ){
      this.Test.onAudioError();
      return;
    }

    if(this.audioStatus == 'playing'){
      this.stopPlaying();
    }

    if(this.recorder.status == 'recording'){
      this.stopRecording();
    } else{
      this.startRecording(index);
    }
  }
  public onDeleteHandler(index: any ){
    if(this.recorder.status == 'recording'){
      this.stopRecording();
    }
    if(this.audioStatus == 'playing'){
      this.stopPlaying();
    }

    (this.recordings as any)[index] = {
      recorded: false,
      status: 'ideal',
      blob: null
    };
  }

  public onPlayHandler(index: any){
    if(this.recorder.status == 'recording'){
      this.stopRecording();
    }

    if(this.audioStatus == 'playing'){
      this.stopPlaying();
    } else{
      this.startPlaying(index);
    }
  }

}
