import { NgModule } from '@angular/core';
import { PackagesComponent } from './packages.component';

import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EdmCommonModule } from 'src/app/components/common/ed-common.module';

export const routes: Routes = [
  { path: '', component: PackagesComponent },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    EdmCommonModule
  ],
  exports: [],
  declarations: [PackagesComponent],
  providers: [],
})
export class PackagesModule { }
