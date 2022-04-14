/* eslint-disable @angular-eslint/component-selector */
import { EventEmitter, Input, Output } from "@angular/core";
import { iStaticData } from "src/app/services/static-content.service";
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'doc-grid',
  template: `
<div class="container-fluid mt-5 mb-3">
  <div class="row">
    <ng-container *ngFor="let c of data.child">
      <div class="col-md-6 col-xl-3  p-1 mb-0 mt-0" >
          <div class="grid-item p-3 border" (click)="navigateForward.emit(path.concat(c.static_page_id))">
              <div class="mt-5 overflow-hidden">
                  <img src="{{c.icon ? c.icon : (c.image ? c.image : '/assets/img/data/practice_test.png') }}" alt="">
                  <h5 class="heading">{{ c.title }}</h5>
              </div>
          </div>
      </div>
    </ng-container>
  </div>
</div>
  `,
  styleUrls: ['./doc-components.scss']
})

export class DocGridComponent implements OnInit {
  @Input() data: iStaticData;
  @Input() path: number[];
  @Output() navigateForward = new EventEmitter<number[]>();
  constructor() { }

  ngOnInit() { }
}
