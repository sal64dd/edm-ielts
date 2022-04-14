import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonUiModule } from '../common-ui/common-ui.module';
import { FooterAdminComponent } from './components/footer-admin/footer-admin.component';
import { NavbarAdminComponent } from './components/navbar-admin/navbar-admin.component';
import { SidebarAdminComponent } from './components/sidebar-admin/sidebar-admin.component';


@NgModule({
  imports: [RouterModule, CommonModule, CommonUiModule],
  exports: [
    SidebarAdminComponent,
    NavbarAdminComponent,
    FooterAdminComponent
  ],
  declarations: [
    SidebarAdminComponent,
    NavbarAdminComponent,
    FooterAdminComponent
  ],
  providers: [],
})
export class AdminUiModule { }
