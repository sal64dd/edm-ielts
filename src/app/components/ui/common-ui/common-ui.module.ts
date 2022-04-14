import { NgModule } from '@angular/core';
import { FooterComponent } from './components/footer/footer.component';
import { ModalComponent } from './components/modal/modal.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [RouterModule, CommonModule],
  exports: [FooterComponent, NavbarComponent, SidebarComponent, ModalComponent],
  declarations: [FooterComponent, NavbarComponent, SidebarComponent, ModalComponent],
  providers: [],
})
export class CommonUiModule { }
