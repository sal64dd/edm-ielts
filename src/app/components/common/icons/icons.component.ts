import { Component, Input, OnInit } from '@angular/core';

export type IconList =
  'office' |
  'shop' |
  'credit-card'|
  'box-3d-50'|
  'settings'|
  'customer-support'|
  'document'|
  'spaceship'|
  'pin';

@Component({
  selector: 'app-icon',
  templateUrl: 'icons.component.html'
})

export class AppIconComponent implements OnInit {
  @Input() m: IconList;

  constructor() { }

  ngOnInit() { }
}
