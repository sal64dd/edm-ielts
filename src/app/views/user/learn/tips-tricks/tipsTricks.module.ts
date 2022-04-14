import { RouterModule, Route } from '@angular/router';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { tipsTricksComponent } from './tipsTricks.component';
import { tipsTricksListComponent } from './tipsTricksList/tipsTricksList.component';

const routes: Route[] = [
  { path: 'tipsTricks', component: tipsTricksComponent },
  { path: 'tipsTricksListComponent', component: tipsTricksListComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [tipsTricksComponent, tipsTricksListComponent],
})
export class tipsTricksModule {}
