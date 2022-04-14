import { Component, Input } from '@angular/core';
import { CommonUiService } from '../../services/common-ui.service';
import { iNav } from '../../types/navigation-types';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {

  @Input() nav: iNav[] = [];
  public basePath: string[] = ['/'];

  constructor(public ui: CommonUiService) { }

}
