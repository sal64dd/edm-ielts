/* eslint-disable @angular-eslint/component-selector */
import { Input, Output } from "@angular/core";
import { Component, OnInit, EventEmitter } from '@angular/core';
import { iStaticData } from "src/app/services/static-content.service";

@Component({
  selector: 'doc-list',
  template: `
    <div>
      <!-- <h5>{{ data.parent.title  }}</h5> -->
      <div *ngIf="dataSplit.length > 0">
        <!-- Before Children -->
        <mx-annotate [HTML]="dataSplit[0]" [PageID]="'static_content_' + data.parent.static_page_id"></mx-annotate>

        <!-- Children -->
        <ul class="list">
          <li *ngFor="let c of data.child" (click)="navigateForward.emit(path.concat(c.static_page_id))">
            <div class="listItem">
              <div class="icon"><img src="{{c.icon ? c.icon : c.image}}" ></div>
              <div class="text">{{ c.title }}</div>
              <div class="forward_arrow ms-auto"><i class="fas fa-arrow-right"></i></div>
            </div>
          </li>
        </ul>

        <!-- After Children -->
        <mx-annotate *ngIf="dataSplit.length > 1" [HTML]="dataSplit[1]" [PageID]="'static_content_' + data.parent.static_page_id"></mx-annotate>
      </div>

    </div>
  `,
  styleUrls: ['./doc-components.scss']
})

export class DocListComponent implements OnInit {
  @Input() data: iStaticData;
  @Input() path: number[];
  @Output() navigateForward = new EventEmitter<number[]>();
  dataSplit: string[] = [];
  ngOnInit() {
    this.dataSplit = this.data.parent.contents.split('[child_location]')
  }
  constructor() {
  }


}
