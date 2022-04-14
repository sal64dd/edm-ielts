import { NgModule } from '@angular/core';
import { CapitalizePipe } from './capitalize.pipe';
import { SanitizeHtml } from './sanitizeHtml';
import { SplitMarksPipe } from './splitMarks';
import { SliceString } from './stringSlice.pipe';
import { TimeConverter } from './timeConverter';


@NgModule({
  imports: [],
  exports: [
    CapitalizePipe,
    SanitizeHtml,
    SplitMarksPipe,
    SliceString,
    TimeConverter
  ],
  declarations: [
    CapitalizePipe,
    SanitizeHtml,
    SplitMarksPipe,
    SliceString,
    TimeConverter
  ],
  providers: [],
})
export class PipesModule { }
