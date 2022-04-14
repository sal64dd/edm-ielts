/* eslint-disable @angular-eslint/component-selector */
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { iStaticData } from 'src/app/services/static-content.service';

@Component({
  selector: 'docs-disptacher',
  template: `
    <div class="content">

      <div [ngSwitch]="pageData.parent.template_type">
        <div *ngSwitchCase="'Tabs'">
        <doc-tabs-listing
            [data]="pageData"
            [path]="path"
            (navigateForward)="navigateForward.emit($event)"
          ></doc-tabs-listing>
        </div>
        <div *ngSwitchCase="'Text only'">
        <doc-list
            [data]="pageData"
            [path]="path"
            (navigateForward)="navigateForward.emit($event)"
          ></doc-list>
        </div>
        <div *ngSwitchCase="'Faqs'">
          <doc-faq
            [data]="pageData"
            [path]="path"
            (navigateForward)="navigateForward.emit($event)"
          ></doc-faq>
        </div>
        <div *ngSwitchCase="'Listing'">
          <doc-list
            [data]="pageData"
            [path]="path"
            (navigateForward)="navigateForward.emit($event)"
          ></doc-list>
        </div>
        <div *ngSwitchCase="'Grid'">
          <doc-grid
            [data]="pageData"
            [path]="path"
            (navigateForward)="navigateForward.emit($event)"
          ></doc-grid>
        </div>
        <div *ngSwitchCase="'Tab listing'">
          <doc-tabs-listing
            [data]="pageData"
            [path]="path"
            (navigateForward)="navigateForward.emit($event)"
          ></doc-tabs-listing>
        </div>

        <div *ngSwitchDefault="">
          <doc-grid
            [data]="pageData"
            [path]="path"
            (navigateForward)="navigateForward.emit($event)"
          ></doc-grid>
        </div>

      </div>

      <!-- <div class="border mt-5">
        <p>title: {{ pageData.parent.title }}</p>
        <p>template: {{ pageData.parent.template_type }}</p>
        <p>content: {{ pageData.parent.contents }}</p>
        <p>image: {{ pageData.parent.image }}</p>
        <p>children: {{ pageData.child?.length }}</p>
        <ul class="childLinks">
          <li class="childlink"
            *ngFor="let child of pageData.child"
            (click)="navigateForward.emit(path.concat(child.static_page_id))"
          >
            {{ child.title }}
          </li>
        </ul>
      </div> -->

    </div>
  `
})

export class DocsDispatcherComponent implements OnInit {
  @Input() pageData: iStaticData;
  @Input() path: number[];
  @Output() navigateForward = new EventEmitter<number[]>();

  ngOnInit() {
  }
}
