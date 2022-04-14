import { CountryService } from '../../../services/api/country.service';
import { ModalDefaultComponent } from '../../common/modal-default/modal-default.component';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-country',
  templateUrl: 'modal-country.component.html'
})

export class ModalCountryComponent extends ModalDefaultComponent implements OnInit  {
  @Input() activeCode;
  constructor(private country: CountryService) {
    super();
  }

  loader: 'loaded' | 'error' | 'loading' = 'loading';
  list: {text, value}[];

  ngOnInit() {
    this.country.get().subscribe(_ => {
      this.loader = 'loaded';
      this.list = this.country.build();
    }, _ => {
      this.loader = 'error';
    });
   }
}
