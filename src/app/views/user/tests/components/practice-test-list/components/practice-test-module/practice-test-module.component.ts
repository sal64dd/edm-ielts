import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BasicModalComponent } from 'src/app/components/common/basic-modal/basic-modal.component';
import { TestV3ApiService } from 'src/app/services/test-v3-api.service';
import { iStatus } from 'src/app/types/api-types';
import { iTestListCatItemV1, iTestListItemV1 } from 'src/app/types/test-types';

@Component({
  selector: 'app-practice-test-module',
  templateUrl: './practice-test-module.component.html',
  styleUrls: ['./practice-test-module.component.scss']
})
export class PracticeTestModuleComponent extends BasicModalComponent implements OnInit {
  override data: iTestListItemV1;

  testCat: Observable<iTestListCatItemV1[]>;
  status: iStatus = 'none';

  constructor(private test: TestV3ApiService) { super();}

  ngOnInit(): void {
    this.status = 'loading';
    this.testCat = this.test.getTestCategoryList(this.data.test_seriese_id);
    this.testCat.subscribe({next: (testCat) => {
      console.log('got test cat', testCat);
      this.status = 'found';
    }, error: (e) => {
      console.error('test cat not found', e);
      this.status = 'error';
    }})
  }

  submit(testCat: iTestListCatItemV1) {
    this.onSubmit.next(testCat);
  }

  close(){
    this.onSubmit.next(null);
  }

  attempts(item: iTestListCatItemV1){
    if(!this.data.attempts) return '';
    switch(item.category_name){
      case 'Listening':
        return this.data.attempts.Listening
      case 'Reading':
        return this.data.attempts.Reading
      case 'Writing':
        return this.data.attempts.Writing
      case 'Speaking':
        return this.data.attempts.Speaking
      default:
        return '';
    }
  }

}
