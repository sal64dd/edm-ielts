import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { map, filter, take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UIService {
  navSidebarMenu: boolean = false;
  sidebarFlag: boolean = false;
  searchFlag: boolean = false;
  timer: any;
  routeAnimStatus = new BehaviorSubject<
    | 'curr'
    | 'forward1'
    | 'forward2'
    | 'backward1'
    | 'backward2'
    | 'root1'
    | 'root2'
  >('curr');
  public scrollstatus = new BehaviorSubject<1 | 0 | -1>(0);

  constructor(private location: Location, private router: Router) {
    this.routeAnimStatus.subscribe((value) => {});

    location.onUrlChange((url, state) => {
      switch (router.getCurrentNavigation()?.trigger) {
        case 'imperative':
          if (this.routeAnimStatus.value == 'forward1') {
            this.routeAnimStatus.next('forward2');
          } else {
            this.routeAnimStatus.next('forward1');
          }
          break;
        case 'popstate':
          if (this.routeAnimStatus.value == 'backward1') {
            this.routeAnimStatus.next('backward2');
          } else {
            this.routeAnimStatus.next('backward1');
          }
          break;
        case 'hashchange':
          if (this.routeAnimStatus.value == 'root1') {
            this.routeAnimStatus.next('root2');
          } else {
            this.routeAnimStatus.next('root1');
          }
          break;
        default:
          this.routeAnimStatus.next('curr');
          break;
      }
      console.warn('location change: ', this.routeAnimStatus.value);
    });

    router.events.pipe(filter((v) => true)).subscribe();
  }
}
