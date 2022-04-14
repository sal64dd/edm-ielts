/* eslint-disable @angular-eslint/component-selector */
import { EventEmitter, Input, Output } from "@angular/core";
import { Component, OnInit } from '@angular/core';
import { iStaticData } from "src/app/services/static-content.service";

@Component({
  selector: 'doc-tabs',
  template: `
    <div>tabs</div>
  `,
  styleUrls: ['./doc-components.scss']
})

export class DocTabsComponent implements OnInit {
  @Input() data: iStaticData;
  @Input() path: number[];
  @Output() navigateForward = new EventEmitter<number[]>();
  constructor() { }

  ngOnInit() { }
}
