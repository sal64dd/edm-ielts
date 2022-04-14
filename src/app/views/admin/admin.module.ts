import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { AdminUiModule } from 'src/app/components/admin-ui.module';
import { EdmCommonModule } from 'src/app/components/common/ed-common.module';
import { AdminLayoutComponent } from 'src/app/layouts/admin/admin.component';

export const routes: Routes = [
  // {
  //   path: 'dashboard',
  //   loadChildren: () => import('').then(m => m.),
  //   data:{
  //     pageHeader: 'Admin Dashboard'
  //   }
  // },
  // {
  //   path: 'users',
  //   loadChildren: () => import('').then(m => m.),
  //   data:{
  //     pageHeader: 'Users'
  //   }
  // },
  // {
  //   path: 'counselling',
  //   loadChildren: () => import('').then(m => m.),
  //   data:{
  //     pageHeader: 'Live Counselling'
  //   }
  // },
  // {
  //   path: 'learn',
  //   loadChildren: () => import('').then(m => m.),
  //   data:{
  //     pageHeader: 'Learning Module'
  //   }
  // },
  // {
  //   path: 'courses',
  //   loadChildren: () => import('').then(m => m.),
  //   data:{
  //     pageHeader: 'Courses Module'
  //   }
  // },
  // {
  //   path: 'tests',
  //   loadChildren: () => import('').then(m => m.),
  //   data:{
  //     pageHeader: 'Testing Module'
  //   }
  // },
  // {
  //   path: 'packages',
  //   loadChildren: () => import('').then(m => m.),
  //   data:{
  //     pageHeader: 'Packages Module'
  //   }
  // },
  // {
  //   path: 'gamification',
  //   loadChildren: () => import('').then(m => m.),
  //   data:{
  //     pageHeader: 'Gamification Module'
  //   }
  // },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    AdminUiModule,
    EdmCommonModule,
  ],
  exports: [],
  declarations: [AdminLayoutComponent],
  providers: [],
  bootstrap: [AdminLayoutComponent]
})
export class AdminModule {}
