import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EdmCommonModule } from 'src/app/components/common/ed-common.module';
import { LearnComponent } from './learn.component';

import { RouterModule, Routes } from '@angular/router';
import { ElemComponent } from './components/elem/elem.component';
import { BookmarkListComponent } from './components/bookmark-list/bookmark-list.component';
import { LearnBlogstyleComponent } from './components/learn-blogstyle/learn-blogstyle.component';
import { DictModalComponent } from './components/dict-modal/dict-modal.component';
import { DictionaryInfoComponent } from './dictionary/dictionaryInfo/dictionaryInfo.component';

export const routes: Routes = [
  {
    path: '',
    component: LearnComponent,
  },
  {
    path: 'wiki',
    loadChildren: () => import('./wiki/docs.module').then((m) => m.DocsModule),
  },
  // {
  //   path: 'dictionary',
  //   loadChildren: () => import('./dictionary/dictionary.module').then((m) => m.DictionaryModule),
  // },
  // {
  //   path: 'previous-paper',
  //   loadChildren: () => import('./previous-papers/previousPaper.route').then((m) => m.PreviousPaperRoutingModule),
  // },
  // {
  //   path: 'tips-tricks',
  //   loadChildren: () => import('./tips-tricks/tipsTricks.module').then((m) => m.tipsTricksModule),
  // },
];

@NgModule({
  imports: [CommonModule, EdmCommonModule, RouterModule.forChild(routes)],
  exports: [],
  declarations: [LearnComponent, ElemComponent, BookmarkListComponent, LearnBlogstyleComponent, DictModalComponent, DictionaryInfoComponent],
  providers: [],
})
export class LearnModule {}
