import { TestBed } from '@angular/core/testing';
import { UserV3Service } from 'src/app/services-v2/userv3.service';
import { UserService } from '../../../services/api/user.service';
import { httpService } from '../../../../../services/core/http.service';
import { TestV3Service } from './test-v3.service';
/**
 * Testv3 service testing
 */

describe('TestV3Service', () => {
  let TestV3: TestV3Service;

  beforeEach(() => {

    TestBed.configureTestingModule({ providers: [
        TestV3Service,
      ]
    });

    TestV3 = TestBed.inject(TestV3Service);
  });

  it('#getTestList 1', () => {


    expect(TestV3.getTestList(' '))
      .toBe(() => {});
  })
})
