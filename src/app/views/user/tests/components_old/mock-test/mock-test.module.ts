import { MockTestControllerComponent } from './mock-test-controller.component';
import { TestV3Module } from '../../modules/test-v3-module/test-v3.module';
import { CommonModule } from '@angular/common';
import { MxModule } from '../../partials/mx.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TestListComponent } from './components/test-list.component';
import { BookingSlotsListComponent } from './components/booking-slots-list.component';
import { TestEndComponent } from './components/test-end.component';
import { TestResultComponent } from './components/test-result.component';
import { TestStartComponent } from './components/test-start.component';
import { MockTestV2Service } from './mock-test-v2.service';

const routes: Routes = [
  {
    path: '',
    component: MockTestControllerComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: TestListComponent,
      },
      {
        path: 'slots',
        component: BookingSlotsListComponent,
      },
      {
        path: 'test-start',
        component: TestStartComponent,
      },
      {
        path: 'test-end',
        component: TestEndComponent,
      },
      {
        path: 'test-result',
        component: TestResultComponent,
      },
    ]
  },

]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MxModule,
  ],
  exports: [],
  declarations: [
    TestResultComponent,
    TestEndComponent,
    TestStartComponent,
    BookingSlotsListComponent,
    TestListComponent,
    MockTestControllerComponent,
   ],
  providers: [
    MockTestV2Service,
  ],
})
export class MockTestV2Module { }
