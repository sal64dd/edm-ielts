import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgxSkltnModule, SkltnConfig } from 'ngx-skltn';
import { AudioRecordingV2Service } from 'src/app/services/audio-recording-v2.service';
import { TestExcerciseV2Component } from './components/test-modules/excercise-mod.component';
import { TestListeningV2Component } from './components/test-modules/listening-mod.component';
import { TestReadingV2Component } from './components/test-modules/reading-mod.component';
import { TestSpeakingV2Component } from './components/test-modules/speaking-mod.component';
import { TestWritingV2Component } from './components/test-modules/writing-mod.component';
import { TestModDispatcherComponent } from './components/test-parts/test-dispatcher-module.component';
import { TestSetDispatcherComponent } from './components/test-parts/test-dispatcher-set.component';
import { TestFooterComponent } from './components/test-parts/test-footer.component';
import { TestHeaderComponent } from './components/test-parts/test-header.component';
import { TestInstructionsComponent } from './components/test-parts/test-instructions.component';
import { TestModalComponent } from './components/test-parts/test-modal.component';
import { TestResultDelayedComponent } from './components/test-parts/test-result-delayed.component';
import { TestResultInstantComponent } from './components/test-parts/test-result-instant.component';
import { TestReviewComponent } from './components/test-parts/test-review.component';
import { FillBlankTestV2Component } from './components/test-questions/fill-blank-test-v2.component';
import { MultipleChoiceTestV2Component } from './components/test-questions/multiple-choice-test-v2.component';
import { RecordTestComponent } from './components/test-questions/record-test-v2.component';
import { SentenceCompTestComponent } from './components/test-questions/sentence-completion.component';
import { ShortAnswerComponent } from './components/test-questions/short-questions.component';
import { TextAreaTestComponent } from './components/test-questions/text-area-test-v2.component';
import { TestV3Service } from './services/test-v3.service';
import { TestV3Component } from './test-v3.component';

import { NgAudioRecorderModule } from 'ng-audio-recorder';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { EdmCommonModule } from 'src/app/components/common/ed-common.module';

const routes: Routes = [
  { path: ':TestId/:CategoryAssocId/:CategoryId', component: TestV3Component },
]

const skltnConfig: SkltnConfig = {
  rectRadius: 10,
  flareWidth: '150px',
  bgFill: '#d8d5d1',
  flareFill: 'rgba(255,255,255, 0.5)',
};

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule, PipesModule,
    NgAudioRecorderModule,
    NgxSkltnModule.forRoot(skltnConfig),
    // CdesignModule,,
    EdmCommonModule
  ],
  exports: [
    TestV3Component
  ],
  declarations: [
    TestV3Component,

    // components
    TestModDispatcherComponent,
    TestSetDispatcherComponent,
    TestFooterComponent,
    TestHeaderComponent,
    TestReviewComponent,
    TestInstructionsComponent,
    TestModalComponent,
    TestResultInstantComponent,
    TestResultDelayedComponent,

    // modules
    TestListeningV2Component,
    TestReadingV2Component,
    TestWritingV2Component,
    TestSpeakingV2Component,
    TestExcerciseV2Component,

    // questions
    FillBlankTestV2Component,
    MultipleChoiceTestV2Component,
    TextAreaTestComponent,
    RecordTestComponent,
    ShortAnswerComponent,
    SentenceCompTestComponent
  ],
  providers: [TestV3Service, AudioRecordingV2Service],
})
export class TestV3Module { }

