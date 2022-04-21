import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardUserV2Component } from './dashboard-user.component';
import { Routes } from '@angular/router';
import { EdmCommonModule } from 'src/app/components/common/ed-common.module';
import { ModuleElemComponent } from './components/module-elem/module-elem.component';
import { QuickTestComponent } from './components/quick-test/quick-test.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { NgbCarousel, NgbModule } from '@ng-bootstrap/ng-bootstrap';

export const routes: Routes = [
  { path: '', component: DashboardUserV2Component },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), EdmCommonModule, NgbModule],
  exports: [],
  declarations: [
    DashboardUserV2Component,
    ModuleElemComponent,
    QuickTestComponent,
  ],
  providers: [],
  bootstrap: [],
})
export class DashboardUserModule {}
