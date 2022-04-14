import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PreviousPaperComponent } from './previousPaper.component';
import { ShowPaperComponent } from './showPaper/showPaper.component';
import { HistoryPaperDetails } from './historyPaperDetails/historyPaperDetails.component';
import { TestSortList } from './testSortlist/testSortlist.component';
import { Route, RouterModule } from '@angular/router';

const routes: Route[] = [
  { path: 'prePaper', component: PreviousPaperComponent },
  { path: 'historyPaperDetails', component: HistoryPaperDetails },
  { path: 'showPaper', component: ShowPaperComponent },
  { path: 'testSortList', component: TestSortList },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    PreviousPaperComponent,
    HistoryPaperDetails,
    ShowPaperComponent,
    TestSortList,
  ],
})
export class PreviousPaperRoutingModule {}
