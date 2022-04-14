import { iTestListItemV1 } from '../../../../services/api/test-v3-api.service';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class MockTestV2Service {
  selectedTestListItem: iTestListItemV1;

  constructor() { }

}

export interface iMockTestv1 {
  test_seriese_id: string,
  test_seriese_name: string,
  category_name: string,
  instruction_category_id: string,
  instruction_category_name: string,
  ts_cat_assoc_id: string,
}
