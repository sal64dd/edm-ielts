/* eslint-disable @angular-eslint/component-selector */

import { ChangeDetectorRef } from '@angular/core';
import { Input, Output } from "@angular/core";
import { Component, OnInit, EventEmitter } from '@angular/core';
import { iStaticData, StaticContentService } from 'src/app/services/static-content.service';

@Component({
  selector: 'doc-tabs-listing',
  template: `

<!-- <h5>{{data.parent.title}}</h5> -->
<div *ngIf="dataSplit.length > 0">

  <!-- Before Children -->
  <mx-annotate [HTML]="dataSplit[0]" [PageID]="'static_content_' + data.parent.static_page_id"></mx-annotate>

  <!-- Children -->
  <ul class="nav nav-pills mb-3" id="myTab" role="tablist">
    <li class="nav-item" role="presentation" *ngFor="let c of data.child; let i = index">
      <button class="nav-link" type="button" role="tab"
        [id]=" 'listing-' + c.static_page_id + '-tab' "
        [ngClass]="{'active': activeTab === i}"
        (click)="changeToTab(i)"
        >
        {{ c.title}}
      </button>
    </li>
  </ul>

  <div class="tab-content" id="myTabContent" *ngFor="let c of data.child; let i = index">
    <div class="tab-pane fade " role="tabpanel"
      [id]="'listing-' + c.static_page_id"
      [ngClass]="{'active': activeTab === i, 'show': activeTab === i}"
    >
    <div class="mt-3 ps-4 pt-2 tab-lising-content" *ngIf="pageDatas[i].status === 'found'">
      <docs-disptacher
        [pageData]="pageDatas[i].data"
        [path]="path.concat([c.static_page_id])"
        (navigateForward)="navigateForward.emit($event)"
      ></docs-disptacher>
    </div>
  </div>

  <!-- After Children -->
  <mx-annotate *ngIf="dataSplit.length > 1" [HTML]="dataSplit[1]" [PageID]="'static_content_' + data.parent.static_page_id"></mx-annotate>
</div>
  `,
  styleUrls: ['./doc-components.scss']
})

export class DocTabsListingComponent implements OnInit {
  @Input() data: iStaticData;
  @Input() path: number[];
  @Output() navigateForward = new EventEmitter<number[]>();

  pageDatas: {data: iStaticData, status: 'loading' | 'not-found' | 'server-error' | 'no-internet' | 'found'}[] = [];

  dataSplit: string[] = [];

  public activeTab = 0;
  public changeToTab(i: number){this.activeTab = i}

  constructor(private staticContent: StaticContentService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.dataSplit = this.data.parent.contents.split('[child_location]');
    for(const d of this.data.child){
      this.pageDatas.push({data: null, status: 'loading'})
    }
    this.getContent();
  }

  private async getContent() {
    for (let index = 0; index < this.data.child.length; index++){
      let status: 'loading' | 'not-found' | 'server-error' | 'no-internet' | 'found'
        = 'loading';

      let data: iStaticData = null;
      try {
        data =
          await this.staticContent
            .getStaticData(this.path.concat(
              this.data.child[index].static_page_id
            ))
            .toPromise();
        status = 'found';
      }
      catch (e) {
        console.error('Error on quering static data', e);
        status = 'server-error';
      }
      this.pageDatas[index] = {data, status};
    }

    this.cd.detectChanges();
  }

}
