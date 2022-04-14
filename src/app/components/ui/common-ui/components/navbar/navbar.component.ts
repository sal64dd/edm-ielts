import { Component, OnInit } from '@angular/core';
import { CommonUiService } from '../../services/common-ui.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent {
  constructor(public ui: CommonUiService) {
  }
}
