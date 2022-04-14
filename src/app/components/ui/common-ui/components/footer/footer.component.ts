import { Component } from '@angular/core';
import { iNav } from '../../types/navigation-types';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styles: [
  ]
})
export class FooterComponent {
  public nav: iNav[] = [];
  public year = '2022';
  constructor() { }
}
