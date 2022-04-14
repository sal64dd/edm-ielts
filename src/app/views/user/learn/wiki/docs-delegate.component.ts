/* eslint-disable @angular-eslint/component-selector */

import { BehaviorSubject } from 'rxjs';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { iStaticData, StaticContentService } from 'src/app/services/static-content.service';

@Component({
  selector: 'docs-delegate',
  template: `
  <ng-container *ngIf="pageStatus === 'found'">
    <docs-disptacher
        [pageData]="pageData"
        [path]="path"
        (navigateForward)="navigateForward.emit($event)"
      ></docs-disptacher>
  </ng-container>

  <app-comm-loading     *ngIf="pageStatus === 'loading'"      ></app-comm-loading>
  <app-comm-err-500     *ngIf="pageStatus === 'server-error'" ></app-comm-err-500>
  <app-comm-err-404     *ngIf="pageStatus === 'not-found'"    ></app-comm-err-404>
  <app-comm-err-network *ngIf="pageStatus === 'no-internet'"  ></app-comm-err-network>
  `

})

export class DocsDelegateComponent implements OnInit {
  private _path: BehaviorSubject<number[]> =
    new BehaviorSubject<number[]>([]);

  public get path(): number[] {
    return this._path.value;
  }

  @Input() public set path(v) {
    this._path.next(v);
  }

  @Output() navigateForward = new EventEmitter<number[]>();
  @Output() pageHeading = new EventEmitter<string>()

  pageData: iStaticData;
  pageStatus:
    'loading' | 'not-found' | 'server-error' | 'no-internet' | 'found'
    = null;

  constructor(
    private staticContent: StaticContentService,
    private route: ActivatedRoute,
    ) {
      this._path.subscribe(v => {
        this.getContent()
      });
    }

  ngOnInit() { }

  async getContent() {
    this.pageStatus = 'loading';

    if(this.path.length == 0) return;
    // query data
    try {
      this.pageData =
        await this.staticContent
          .getStaticData(this.path)
          .toPromise();

      if(this.pageData != null){
        this.pageStatus = 'found';
        this.pageHeading.emit(this.pageData.parent.title);
        return;
      }

      throw Error('pagedata null')
    }
    catch (e) {
      console.error('Error on quering static data', e);
      this.pageStatus = 'server-error';
    }

      //
  }
}


