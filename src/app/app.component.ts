import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { ModalAdhocDirective } from './components/common/modal-adhoc.directive';
import { CommonUiService } from './components/ui/common-ui/services/common-ui.service';
import { ModalControllerService } from './services/modal-controller.service';

@Component({
  selector: 'app-root',
  template: `
  <router-outlet></router-outlet>
  <ng-template modalAdhoc></ng-template>
  `,
})
export class AppComponent implements OnInit{
  @ViewChild(ModalAdhocDirective, {static: true}) modalAdHoc: ModalAdhocDirective;

  constructor(
    private ui: CommonUiService,
    private router: Router,
    private route: ActivatedRoute,
    private modalController: ModalControllerService
  ){}

  ngOnInit() {
    //  Title
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }

      window.scrollTo(0, 0);
    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        return this.getHeaderClasses();
      }),
    )
    .subscribe((headerClasses: string | null) => {
      this.ui.pageHeader = headerClasses!;
    });
    this.ui.pageHeader = this.getHeaderClasses()!;

    // Modal
    console.log(this.modalAdHoc);
    this.modalController.register(this.modalAdHoc);
  }


  getHeaderClasses(): string | null {
    let child = this.route.firstChild;
    while (child) {
      if (child.firstChild) {
        child = child.firstChild;
      } else if (child.snapshot.data && child.snapshot.data['pageHeader']) {
        return child.snapshot.data['pageHeader'];
      } else {
        return null;
      }
    }
    return null;
  }

}





























