import { DocsDispatcherComponent } from './docs-dispatcher.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DocsComponent } from './docs.component';
import { DocTabsComponent } from './components/doc-tabs.component';
import { DocFaqComponent } from './components/doc-faq.component';
import { DocGridComponent } from './components/doc-grid.component';
import { DocListComponent } from './components/doc-list.component';
import { DocTextComponent } from './components/doc-text.component';
import { DocTabsListingComponent } from './components/doc-tabs-listing.component';
import {  DocsDelegateComponent } from './docs-delegate.component';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { EdmCommonModule } from 'src/app/components/common/ed-common.module';
import { StaticContentService } from 'src/app/services/static-content.service';

export const routes: Routes = [
  {
    path: '**',
    component: DocsComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    PipesModule,
    EdmCommonModule
  ],
  exports: [],
  declarations: [
    DocsComponent,
    DocTabsComponent,
    DocTextComponent,
    DocListComponent,
    DocGridComponent,
    DocFaqComponent,
    DocTabsListingComponent,
    DocsDelegateComponent,
    DocsDispatcherComponent,
  ],
  providers: [
    StaticContentService
  ]
})

export class DocsModule { }
