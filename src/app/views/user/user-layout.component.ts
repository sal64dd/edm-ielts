import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ModalAdhocDirective } from 'src/app/components/common/modal-adhoc.directive';
import { ModalControllerService } from 'src/app/services/modal-controller.service';

@Component({
  selector: 'app-user-layout',
  template: `
    <div class="g-sidenav-show vh-100 border d-flex">
        <div class="">
          <app-sidebar-user></app-sidebar-user>
        </div>
      <main class=" w-100 position-relative mt-1 border-radius-lg overflow-auto">
        <app-navbar-user></app-navbar-user>
        <div class="">
          <router-outlet></router-outlet>
        </div>
        <div class="mb-3">
          <app-footer-user></app-footer-user>
        </div>
      </main>
    </div>
  `,
})
export class UserLayoutComponent implements OnInit, AfterViewInit {



  constructor() {
   }

  ngOnInit() {
  }

  ngAfterViewInit(): void {

  }
}
