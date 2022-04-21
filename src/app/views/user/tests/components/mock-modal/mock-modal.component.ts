import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { start } from '@popperjs/core';
import { BasicModalComponent } from 'src/app/components/common/basic-modal/basic-modal.component';
import { ModalControllerService } from 'src/app/services/modal-controller.service';
import { TestV3ApiService } from 'src/app/services/test-v3-api.service';
import { iStatus } from 'src/app/types/api-types';
import { iTestListItemV1 } from 'src/app/types/test-types';

@Component({
  selector: 'app-mock-modal',
  templateUrl: './mock-modal.component.html',
  styleUrls: ['./mock-modal.component.scss']
})
export class MockModalComponent extends BasicModalComponent implements OnInit {
  status: iStatus = 'loading';
  constructor(
    private TestApi: TestV3ApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private modal: ModalControllerService
  ) { super(); }

  close(){
    this.onSubmit.next(null);
  }

  start(){
    this.onSubmit.next(true);
  }

  ngOnInit(): void {
    this.TestApi.getTestList('MOCK').subscribe(d => {
      this.status = 'found';
      this.tests = d;
    })
  }

  public startTest(test: iTestListItemV1){
    if(test.locked) return;
    this.TestApi.getTestCategoryList(test.test_seriese_id).subscribe(d => {
      console.log(test);
      console.log(d);
      this.TestApi.startTestModule(test, d[0]);
      this.modal.destroy();
    })
    // this.mock.selectedTestListItem = test;
    // this.router.navigate(['../slots'], {relativeTo: this.activatedRoute})
  }

  public tests: iTestListItemV1[];
  public modules =  [{
    category_name: "Listening",
    icon: "http://www.masterprep.info/./uploads/gallery/listening1.png",
    info1: "40 Questions",
    info2: "30 Minutes"
    },
    {
        category_name: "Reading",
        icon: "http://www.masterprep.info/./uploads/gallery/reading1.png",
        info1: "40 Questions",
        info2: "60 Minutes"
    },
    {
        category_name: "Writing",
        icon: "http://www.masterprep.info/./uploads/gallery/writing1.png",
        info1: "2 Questions",
        info2: "60 Minutes"
    },
    {
      category_name: "Speaking",
      icon: "http://www.masterprep.info/./uploads/gallery/speaking1.png",
      info1: "Online Video Conferencing",
      info2: "10 Minutes"
  }];

}
