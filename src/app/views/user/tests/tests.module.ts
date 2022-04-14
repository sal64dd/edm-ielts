import { NgModule } from '@angular/core';

import { TestsComponent } from './tests.component';

import { RouterModule, Routes } from '@angular/router';
import { EdmCommonModule } from 'src/app/components/common/ed-common.module';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import { PracticeTestListComponent } from './components/practice-test-list/practice-test-list.component';
import { GrammerExcerciseListComponent } from './components/grammer-excercise-list/grammer-excercise-list.component';
import { MockTestInfoModalComponent } from './components/mock-test-info-modal/mock-test-info-modal.component';
import { MockInfoComponent } from './components/mock-test-info-modal/components/mock-info/mock-info.component';
import { MockSlotComponent } from './components/mock-test-info-modal/components/mock-slot/mock-slot.component';
import { PracticeTestModuleComponent } from './components/practice-test-list/components/practice-test-module/practice-test-module.component';
import { OverviewChartComponent } from './components/overview-chart/overview-chart.component';
import { DetailReportChartComponent } from './components/detail-report-chart/detail-report-chart.component';
import { NgChartsModule } from 'ng2-charts';

export const routes: Routes = [{ path: '', component: TestsComponent }];

FullCalendarModule.registerPlugins([
  // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
]);

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    EdmCommonModule,
    FullCalendarModule,
    NgChartsModule
  ],
  exports: [],
  declarations: [
    TestsComponent,
    PracticeTestListComponent,
    GrammerExcerciseListComponent,
    MockTestInfoModalComponent,
    MockInfoComponent,
    MockSlotComponent,
    PracticeTestModuleComponent,
    OverviewChartComponent,
    DetailReportChartComponent
  ],
  providers: [],
})
export class TestsModule {}
