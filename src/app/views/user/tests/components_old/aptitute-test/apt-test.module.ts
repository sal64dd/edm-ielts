import { TestModule } from '../../modules/test-controller/test-controller.module';
import { CommonModule } from '@angular/common';
import { MxModule } from '../../partials/mx.module';
import { NgModule } from '@angular/core';
import { IeltsAptituteTestComponent } from './ielts-apt-test.component';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '**',
    component: IeltsAptituteTestComponent

  },

]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MxModule,
    TestModule
  ],
  exports: [],
  declarations: [
    IeltsAptituteTestComponent,
  ],
  providers: [],
})
export class IeltsAptituteTestModule { }
