/* eslint-disable arrow-body-style */
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { httpService } from './http.service';
import { CommonAuthService } from './common-auth.service';
import {
  iTestV2,
  iTestListItemV1,
  iInstructionv1,
  iTestMetaV2,
  iAnswerv2,
  iTestResultV1,
  iSpeakingSlotsOnDayV1,
  iTestListCatItemV1,
} from '../types/test-types';
import { Router } from '@angular/router';

const API = {
  // mock tests
  mockResultSpeaking: '/Get_mock_info',
  mockResultInfo: '/Get_mock_info/result',
  speakingInfo: '/Get_mock_info',
  mockGeneralInst: '/Static_page',
  book_speaking_slot: '/Manage_speaking_slots/book_speaking_slot',
  Manage_speaking_slots: '/Manage_speaking_slots',

  // Tests
  TestList: '/test_seriese',
  TestListCategories: '/test_seriese_cat',
  TestInstructions: '/instruction',
  TestData: '/Papernew',
  TestHistory: '/student_attempts',
  CheckIncompleteTest: '/Check_incomplete_test',

  // Answers
  StudentAnswer: '/student_answer',
  StudentDetailedResult: '/student_detailed_result',
};

@Injectable({ providedIn: 'root' })
export class TestV3ApiService {
  // Api Url
  private URL = environment.url + environment.apiVersion;

  constructor(
    private http: httpService,
    private user: CommonAuthService,
    private router: Router
  ) {}

  /**
   * Gets Test data from Backend
   *
   * @param TestId
   * @param CategoryAssocId
   * @returns
   */
  getTestData(TestId: string, CategoryAssocId: string): Observable<iTestV2> {
    console.log('getTestData', TestId, CategoryAssocId);

    const httpOptions = {
      headers: new HttpHeaders({
        token: this.user.User.UUID,
        tsId: TestId,
        tsCatId: CategoryAssocId,
      }),
    };

    return this.http
      .get(this.URL + API.TestData, httpOptions)
      .pipe(map((data) => (data as any).error_message.data as iTestV2));
  }

  /**
   * Gets Test List from Backend
   *
   * @returns
   */
  getTestList(
    subtest: 'practice_test' | 'MOCK' | 'GRAMMAR'
  ): Observable<iTestListItemV1[]> {
    console.log('GetTestList', subtest);

    const httpOptions = {
      headers: new HttpHeaders({
        token: this.user.User.UUID,
        subTest: subtest,
      }),
    };

    return this.http.get(this.URL + API.TestList, httpOptions).pipe(
      map((testListItem: any) => {
        console.log('TestListData before Parse', testListItem);

        if (testListItem.error_message.success === 1) {
          return testListItem.error_message.data as iTestListItemV1[];
        } else {
          throw Error(
            'testList no success ' + testListItem.error_message.message
          );
        }
      })
    );
  }

  /**
   * Gets Category List from Backend
   *
   * @returns
   */
  getTestCategoryList(test_seriese_id: string) {
    console.log('GetTestCategoryList', test_seriese_id);

    const httpOptions = {
      headers: new HttpHeaders({
        token: this.user.User.UUID,
        tsid: test_seriese_id,
      }),
    };

    return this.http.get(this.URL + API.TestListCategories, httpOptions).pipe(
      map((testListCatItem: any) => {
        console.log('TestListCategory before Parse', testListCatItem);

        if (testListCatItem.error_message.success === 1) {
          return testListCatItem.error_message.data as iTestListCatItemV1[];
        } else {
          throw Error(
            'testList no success ' + testListCatItem.error_message.message
          );
        }
      })
    );
  }

  /**
   * Gets Test Instructions from Backend
   *
   * @returns
   */
  getTestInstructions(categoryId: string): Observable<iInstructionv1> {
    console.log('getTestInstructions', categoryId);
    const httpOptions = {
      headers: new HttpHeaders({
        token: this.user.User.UUID,
        categoryId,
      }),
    };

    return this.http.get(this.URL + API.TestInstructions, httpOptions).pipe(
      map((data: any) => {
        if (data.error_message.success == 1) {
          return data.error_message.data as iInstructionv1;
        } else {
          return undefined;
          throw Error('api error');
        }
      })
    );
  }

  /**
   * Gets Test Result from Backend
   *
   * @returns
   */
  getTestResult() {
    return;
  }

  /**
   * Posts the answer to the backend
   *
   */
  postAnswer(
    Meta: iTestMetaV2,
    Ans: iAnswerv2[],
    TimeTaken: { minutes: number; seconds: number }
  ): Observable<iTestResultV1> {
    const httpOptions = {
      headers: new HttpHeaders({
        token: this.user.User.UUID,
        mockId: '',
        last: '1',
      }),
    };

    // set is_img
    const answers = Ans.map((d) => ({
      ...d,
      is_img: d.is_img ? true : false,
      active: true,
    }));

    const body = {
      test_seriese_id: Meta.test_seriese_id,
      category_id: Meta.category_id,
      max_marks: Meta.max_marks,
      ts_cat_assoc_id: Meta.ts_cat_assoc_id,
      category_name: Meta.category_name,
      student_id: this.user.User.ID,
      std_ans: answers,
      time_taken: `${TimeTaken.minutes}:${TimeTaken.seconds}`,
      is_MtEt: Meta.is_MtEt,
      un_mock_id: '',
    };

    console.log('submitting body', body);

    return this.http
      .post(this.URL + API.StudentAnswer, body, httpOptions)
      .pipe(
        map((res) => {
          console.log('api result', res);
          return res;
        })
      )
      .pipe(map((d: any) => d.error_message as iTestResultV1));
  }

  /**
   * Gets the available speaking dates
   *
   * @returns
   */
  getAvailableSpeakingSlots(): Observable<iSpeakingSlotsOnDayV1[]> {
    console.log('getAvailableSpeakingSlots');

    const httpOptions = {
      headers: new HttpHeaders({
        token: this.user.User.UUID,
        tdate: new Date().toISOString().slice(0, 10),
      }),
    };

    return this.http
      .get(this.URL + API.Manage_speaking_slots, httpOptions)
      .pipe(
        map((data: any) => {
          console.log(data);
          if (data.error_message.success == 1) {
            return data.error_message.other_info as iSpeakingSlotsOnDayV1[];
          } else {
            throw Error('api error');
          }
        })
      );
  }

  bookSpeakingSlot() {}

  startTestModule(test: iTestListItemV1, tscat: iTestListCatItemV1) {
    console.log('starting test');
    this.router.navigate([
      '/test',
      test.test_seriese_id,
      tscat.ts_cat_assoc_id,
      tscat.category_id,
    ]);
  }
}
