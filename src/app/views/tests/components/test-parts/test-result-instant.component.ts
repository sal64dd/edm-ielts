import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TestV3Service } from '../../services/test-v3.service';

@Component({
  selector: 'app-test-result-instant',
  template: `
    <div class="w-100 m-0 p-0 modules" *ngIf="Test.Result">
      <div class="row mb-2 mod mod-section align-items-center">
        <h6 class="section-heading mt-2 col" >
          Results: {{ Test.Result.basic.category_name }} |
          {{ Test.Result.basic.test_seriese_name }}
        </h6>

        <div class="col-auto ">
          <span class="score-obtained lead">
            {{ Test.Result.Total }}
          </span>
        </div>
      </div>

      <div class="row">
        <div class="col me-2 mod p-4">

          <div class="graph mx-auto mb-3" >
              <!-- <mp-pie-chart [data]="resultData"></mp-pie-chart> -->
          </div>

          <div class="row result-items ">
            <div class="col res-item Total-Correct">
              <span class="lead">{{Test.Result.Total}}</span>
              <span>Total Score</span>
            </div>
            <div class="col res-item  Total-Time-Taken">
              <span class="lead"> {{Test.Result.time_taken}}</span>
              <span>Total Time Taken</span>
            </div>
            <div class="col res-item  Percentage">
              <span class="lead">{{Test.Result.percentage}} %</span>
              <span>Percentage</span>
            </div>
          </div>

          <!-- package -->
          <div class="recomm-packages my-4">
            <div
              class="pack-elemnt "
              (click)="router.navigate(['/user/packages'])"
              [ngClass]="{
                'pack-elemnt-recomm': p.recommended,
                'pack-elemnt-small': !p.recommended
              }"
              *ngFor="let p of packages"
            >
              <div class="image"></div>
              <div class="content ">
                <span class="recomm" *ngIf="p.recommended"
                  >Recommended Package</span
                >
                <div class="pack-name">{{ p.package_name }} Package</div>
                <ul class="pack-features mb-0">
                  <li *ngFor="let f of p.features">{{ f }}</li>
                </ul>
              </div>
              <div class="cta ms-auto">
                Get Now <i class="fas fa-arrow-right"></i>
              </div>
            </div>
          </div>

          <div class="review-btns ">
            <button class="btn-lg btn-success me-2">Review Answers</button>
            <button class="btn-lg btn-secondary" (click)="router.navigate(['/user/tests'])">Close Test</button>
          </div>
        </div>

        <div class="col-3  mod p-4">

        </div>
      </div>
    </div>
  `,
  styleUrls: ['../../style.scss'],
})
export class TestResultInstantComponent implements OnInit {
  constructor(public Test: TestV3Service, public router: Router) {}
  ngOnInit() {
    console.log(this.Test.Result);

    this.preparePieData();
  }

  private preparePieData(){

    const skipped = this.Test.Result.skipped;
    const total = this.Test.Result.totalQuestion;

    const correct = parseFloat(this.Test.Result.Total.split('/')[0]);
    const incorrect = total - (correct + skipped);

    const filtered_labels: string[] = [];
    const filtered_values = [correct, incorrect, skipped].filter((v,i) => {
      if (v > 0){
        filtered_labels.push(['Correct Answers', 'Incorrect Answers', 'Skipped'][i])
        return true;
      } else{
        return false;
      }
    })



    this.resultData = {
      labels: filtered_labels,
      datasets: [
        {
          data: filtered_values,
          backgroundColor: ['#EFEF18', '#E20030', '#058A0E'],

        }
      ]
    };
  }

  resultData: any;


  public packages: {
    package_name: string;
    recommended: boolean;
    features: string[];
    icon: string;
  }[] = [
    {
      package_name: 'Silver',
      recommended: true,
      features: [
        '1 IELTS Orientation Class at your nearest Masterprep Institute',
        'Email assistance',
        'Duration: 30 Days',
      ],
      icon: 'http://masterprep.info/newV1/./uploads/gallery/silver-img.svg',
    },
  ];
}
