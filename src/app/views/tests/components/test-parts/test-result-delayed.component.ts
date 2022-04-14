import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TestV3Service } from '../../services/test-v3.service';

@Component({
  selector: 'app-test-result-delayed',
  template: `
    <div class="w-100 m-0 p-0 modules" *ngIf="Test.Result">

      <div class="row">
        <div class="col me-2 mod p-4">

        <h6 class="section-heading my-2 mb-4 col lead" >
          {{ Test.Result.message }}
        </h6>

          <div class="review-btns ">
            <button class="btn-lg btn-secondary" (click)="router.navigate(['/user/tests'])">Close Test</button>
          </div>
        </div>

      </div>
    </div>
  `,
  styleUrls: ['../../style.scss'],
})
export class TestResultDelayedComponent implements OnInit {
  constructor(public Test: TestV3Service, public router: Router) {}
  ngOnInit() {
    console.log(this.Test.Result);
  }
}
