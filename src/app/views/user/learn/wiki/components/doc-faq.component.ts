/* eslint-disable @angular-eslint/component-selector */
import { ElementRef, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { iStaticData } from "src/app/services/static-content.service";
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'doc-faq',
  template: `
    <div>
      <!-- <h5>{{ data.parent.title  }}</h5> -->
      <div *ngIf="dataSplit.length > 0">
        <!-- Before Children -->
        <mx-annotate [HTML]="dataSplit[0]" [PageID]="'static_content_' + data.parent.static_page_id"></mx-annotate>

        <!-- Children -->
        <ul class="faq-list" #main>
          <li *ngFor="let c of data.child; let i = index" >
            <div class="faq-listItem">
            <button class="btn btn-secondary faq-question" type="button" data-bs-toggle="collapse"
              [attr.data-bs-target]="'#collapse_' + i" (click)="faqtoggle(i)"
            >
              <div [innerHTML]="'<p>Q' + (i+1) + '. ' + c.title + '</p>'"></div>
            </button>

            <div class="collapse collapse-vertical"
              [id]="'collapse_' + i"
            >
              <div>
                <mx-annotate [HTML]="c.contents" [PageID]="'static_content_FAQ' + data.parent.static_page_id + '_' + c.static_page_id + '_a' "></mx-annotate>
              </div>
            </div>

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

export class DocFaqComponent implements OnInit {
  @Input() data: iStaticData;
  @Input() path: number[];
  @Output() navigateForward = new EventEmitter<number[]>();
  dataSplit: string[] = [];
  @ViewChild('main') ref = new ElementRef<HTMLElement>(null);
  ngOnInit() {
    this.dataSplit = this.data.parent.contents.split('[child_location]')
  }
  constructor() { }

  faqtoggle(i: number){
    let e = (this.ref.nativeElement as HTMLElement).querySelector(`#collapse_${i}`)
    if(e.classList.contains('show')){
      e.classList.remove('show')
    }else {
      e.classList.add('show');
    }

  }

}

