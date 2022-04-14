import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalControllerService } from 'src/app/services/modal-controller.service';
import { TestV3ApiService } from 'src/app/services/test-v3-api.service';
import { iTestListCatItemV1, iTestListItemV1 } from 'src/app/types/test-types';
import { PracticeTestModuleComponent } from './components/practice-test-module/practice-test-module.component';

@Component({
  selector: 'app-practice-test-list',
  templateUrl: './practice-test-list.component.html',
  styles: [
  ]
})
export class PracticeTestListComponent implements OnInit {
  practiceTestList: Observable<iTestListItemV1[]>;
  loadingPracticeTestList: boolean = true;

  constructor(public test: TestV3ApiService, private modalController: ModalControllerService) {
    this.practiceTestList = this.test.getTestList('practice_test');
    this.practiceTestList.subscribe(() => {this.loadingPracticeTestList = false})
  }
  ngOnInit(): void {
  }

  onTestSelection(test: iTestListItemV1){
    const modalRef = this.modalController.createModal({modal: PracticeTestModuleComponent, params: test });
    modalRef.subscribe((testCat: iTestListCatItemV1 | null) => {
      console.log('submit pressed', testCat);
      this.modalController.destroy()
      if(test && testCat)
        this.test.startTestModule(test, testCat);

    });
  }

}
