import { Router, ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { MockTestV2Service } from '../mock-test-v2.service';
import { TestV3ApiService, iTestListItemV1 } from '../../../../../services/api/test-v3-api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-list',
  template: `
  <mx-page [type]="0"
    [header]="{ heading: 'Mock Tests', back: true }" >

    <!-- hero section -->
    <section class="hero-content">
      <div class="bg"></div>
      <h3>Test yourself under actual exam conditions.</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>


      <div class="modules d-flex flex-column flex-md-row">
        <div class="module-item "
          *ngFor="let module of modules">
          <div class="module-item-inner">
            <!-- img -->
            <div class="img-wrapper me-2">
              <img [src]="module.icon">
            </div>

            <!-- text -->
            <div class="right-text">
              <span class="mod-title lead">
                {{module.category_name}}
              </span>
              <div class="mod-info text-secondary text-sm question-number">
              <i class="fas fa-caret-right"></i> {{module.info1}}
              </div>
              <div class="mod-info text-secondary text-sm time-limit">
              <i class="fas fa-caret-right"></i> {{module.info2}}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="test-instructions my-3 alert alert-warning">
        <b>Note:</b> Once you start the test you can not quit.
      </div>
    </section>

    <!-- Listing Section -->
    <section class="listing">
      <div class="list-header">
        <h4>Mock Test Sets</h4>
        <p> Select one of the following Test Sets </p>
      </div>
      <div class="list-content">
        <div class="list-item"
          *ngFor="let test of tests; let i = index"
          (click)="startTest(test)" >
          <div class="list-item-inner alert-light">
            <!-- title -->
            <div class="list-title lead">{{test.test_seriese_name}}</div>
            <!-- lock -->
            <div class="lock" [class.d-none]="!test.locked" >
              <i class="fas fa-lock"></i>
            </div>
            <!-- forward -->
            <div class="move-forward" [class.d-none]="test.locked">
              Start Test
              <i class="fas fa-arrow-right"></i>
            </div>
          </div>
        </div>
      </div>
    </section>
  </mx-page>
`,
styleUrls: ['./../styles.scss']
})
export class TestListComponent implements OnInit {
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

  constructor(
    private TestApi: TestV3ApiService,
    private mock: MockTestV2Service,
    private router: Router,
    private activatedRoute: ActivatedRoute)
  { }


  ngOnInit() {
    this.TestApi.getTestList('MOCK').subscribe(d => {
      this.tests = d;
    })
  }

  /**
   * Starts the test
   * - sets the test in service
   * - routes to ./slots
   *
   * @param test
   */
  public startTest(test: iTestListItemV1){
    this.mock.selectedTestListItem = test;
    this.router.navigate(['../slots'], {relativeTo: this.activatedRoute})
    console.log(test);
  }
}
