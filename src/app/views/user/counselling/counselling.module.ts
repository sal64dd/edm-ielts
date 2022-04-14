import { NgModule } from '@angular/core';
import { CounsellingComponent } from './counselling.component';
import { UserCounsellingSessionComponent } from './user-counselling-session/user-counselling-session.component';

import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EdmCommonModule } from 'src/app/components/common/ed-common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export const routes: Routes = [
  { path: '', component: CounsellingComponent },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    EdmCommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [],
  declarations: [
    CounsellingComponent,
    UserCounsellingSessionComponent,
  ],
  providers: [],
})
export class CounsellingModule {}
