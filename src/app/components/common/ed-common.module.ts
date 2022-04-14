import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { CalendarV2Component } from './calendar/calendar.component';
import { CommErr404Component, CommErr500Component, CommErrNetworkComponent, CommLoadingComponent } from './errors/common-errors.component';
import { ModalDefaultComponent } from './modal-default/modal-default.component';
import { CaroselComponent } from './carosel/carosel.component';
import { TopElementsComponent } from './top-elements/top-elements.component';
import { ProgressBoxComponent } from './progress-box/progress-box.component';
import { InstaBoxComponent } from './insta-box/insta-box.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { TaskListBoxComponent } from './task-list-box/task-list-box.component';
import { EventListBoxComponent } from './event-list-box/event-list-box.component';
import { LeaderListBoxComponent } from './leader-list-box/leader-list-box.component';
import { RouterModule } from '@angular/router';
import { MxAnnotationComponent } from './annotation/mx-annotate.component';
import { ModalAdhocDirective } from './modal-adhoc.directive';
import { BasicModalComponent } from './basic-modal/basic-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    NgbCarouselModule,
    RouterModule
  ],
  exports: [
    MxAnnotationComponent,
    CommErr404Component,
    CommErr500Component,
    CommErrNetworkComponent,
    CommLoadingComponent,
    ModalDefaultComponent,
    CalendarV2Component,
    CaroselComponent,
    TopElementsComponent,
    ProgressBoxComponent,
    InstaBoxComponent,
    TaskListBoxComponent,
    EventListBoxComponent,
    LeaderListBoxComponent,
    ModalAdhocDirective,
    BasicModalComponent
  ],
  declarations: [
    MxAnnotationComponent,
    CommErr404Component,
    CommErr500Component,
    CommErrNetworkComponent,
    CommLoadingComponent,
    ModalDefaultComponent,
    CalendarV2Component,
    CaroselComponent,
    TopElementsComponent,
    ProgressBoxComponent,
    InstaBoxComponent,
    TaskListBoxComponent,
    EventListBoxComponent,
    LeaderListBoxComponent,
    ModalAdhocDirective,
    BasicModalComponent
  ],
  providers: [],
})
export class EdmCommonModule { }
