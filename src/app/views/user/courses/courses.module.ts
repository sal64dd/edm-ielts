import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { EdmCommonModule } from 'src/app/components/common/ed-common.module';
import { CoursesHomeComponent } from './courses-layout.component';

export const routes: Routes = [
  { path: '', component: CoursesHomeComponent },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    EdmCommonModule
  ],
  exports: [],
  declarations: [CoursesHomeComponent],
  providers: [],
})
export class CoursesModule { }

