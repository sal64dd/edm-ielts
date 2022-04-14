import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserLayoutComponent } from './user-layout.component';
import { Routes } from '@angular/router';
import { UserUiModule } from 'src/app/components/ui/user-ui/user-ui.module';
import { CounsellingClientService } from 'src/app/services/counselling.service';
import { ModalControllerService } from 'src/app/services/modal-controller.service';
import { EdmCommonModule } from 'src/app/components/common/ed-common.module';

export const routes: Routes = [
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'study' },
      {
        path: 'study',
        loadChildren: () =>
          import('./dashboard/dashboard-user.module').then(
            (m) => m.DashboardUserModule
          ),
        data: { pageHeader: 'Study' },
      },
      {
        path: 'learn',
        loadChildren: () =>
          import('./learn/learn.module').then(
            (m) => m.LearnModule
          ),
        data: { pageHeader: 'Learn' },
      },
      {
        path: 'tests',
        loadChildren: () =>
          import('./tests/tests.module').then(
            (m) => m.TestsModule
          ),
        data: { pageHeader: 'Tests' },
      },
      {
        path: 'courses',
        loadChildren: () =>
          import('./courses/courses.module').then(
            (m) => m.CoursesModule
          ),
        data: { pageHeader: 'Courses' },
      },
      {
        path: 'packages',
        loadChildren: () =>
          import('./packages/packages.module').then(
            (m) => m.PackagesModule
          ),
        data: { pageHeader: 'Packages' },
      },
      {
        path: 'counselling',
        loadChildren: () =>
          import('./counselling/counselling.module').then(
            (m) => m.CounsellingModule
          ),
        data: { pageHeader: 'Live Counselling' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule, UserUiModule, EdmCommonModule],
  exports: [],
  declarations: [UserLayoutComponent],
  providers: [CounsellingClientService],
})
export class UserLayoutModule {}
