import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonUiModule } from '../common-ui/common-ui.module';
import { FooterUserComponent } from './components/footer-user/footer-user.component';
import { NavbarUserComponent } from './components/navbar-user/navbar-user.component';
import { SidebarUserComponent } from './components/sidebar-user/sidebar-user.component';

@NgModule({
  imports: [RouterModule, CommonModule, CommonUiModule],
  exports: [
    SidebarUserComponent,
    NavbarUserComponent,
    FooterUserComponent
  ],
  declarations: [
    SidebarUserComponent,
    NavbarUserComponent,
    FooterUserComponent
  ],
  providers: [],
})
export class UserUiModule { }
