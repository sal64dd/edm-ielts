/* eslint-disable @angular-eslint/component-selector */
import { EventEmitter, Input, Output } from "@angular/core";
import { iStaticData } from "src/app/services/static-content.service";
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'doc-text',
  template: `
  <div class="text">
    <mx-annotate [HTML]="data.parent.contents" [PageID]="'static_content_' + data.parent.static_page_id" ></mx-annotate>
  </div>
  `,
  styleUrls: ['./doc-components.scss']
})

export class DocTextComponent implements OnInit {
  @Input() data: iStaticData;
  @Input() path: number[];
  @Output() navigateForward = new EventEmitter<number[]>();
  constructor() { }

  ngOnInit() { }
}
