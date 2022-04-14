import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { from } from 'rxjs';
import { map, retry } from 'rxjs/operators';

@Injectable()
export class PerformanceService {
  resources = {
    speaking_module_wise: '/Get_performance/module_wise/Speaking',
    writing_module_wise: '/Get_performance/module_wise/Writing',
    test_attempts_byid_seq: '/Get_performance/test_attempts_byid_seq',
    test_attempt_id: '/Get_performance/test_attempt_id',
    Get_performance: '/Get_performance',
    individual_module: '/Get_performance/individual_module',
    module_report: '/Get_performance/module_wise',
  };
  url = environment.url + environment.apiVersion;

  performanceType = {
    practice_test: 'PARENT',
    mock: 'mock_test',
    practiceTestReport: 'practice_test',
  };
  constructor(
    public http: ,
    public comm: CommonService
  ) {}

  getPerformance(type) {
    const token = this.comm.uuid;
    if (this.platform.is('cordova')) {
      return from(
        this.httpNative.get(
          this.url + this.resources.Get_performance,
          {},
          { token: token + '', type: type + '' }
        )
      ).pipe(
        map((ev) => {
          this.comm.serverHtmlErrorHandling(ev);
          return JSON.parse(ev.data);
        }),
        retry(this.comm.apiRetry)
      );
    } else {
      const httpOptions = {
        headers: new HttpHeaders({
          token: token + '',
          type: type + '',
        }),
      };
      return this.httpWeb
        .get(this.url + this.resources.Get_performance, httpOptions)
        .pipe(retry(this.comm.apiRetry));
    }
  }

  module_wise(id, category, type) {
    const token = this.comm.uuid;
    const apiUrl = this.resources.module_report + '/' + category + '/' + id;

    console.log('modulewise: ' + apiUrl);

    if (this.platform.is('cordova')) {
      return from(
        this.httpNative.get(
          this.url + apiUrl,
          {},
          { token: token + '', type: type + '' }
        )
      ).pipe(
        map((ev) => {
          this.comm.serverHtmlErrorHandling(ev);
          return JSON.parse(ev.data);
        }),
        retry(this.comm.apiRetry)
      );
    } else {
      const httpOptions = {
        headers: new HttpHeaders({
          token: token + '',
          type: type + '',
        }),
      };
      return this.httpWeb
        .get(this.url + apiUrl, httpOptions)
        .pipe(retry(this.comm.apiRetry));
    }
  }

  test_attempt_id(type, id) {
    const token = this.comm.uuid;
    if (this.platform.is('cordova')) {
      return from(
        this.httpNative.get(
          this.url + this.resources.test_attempt_id + '/' + id,
          {},
          { token: token + '', type: type + '' }
        )
      ).pipe(
        map((ev) => {
          this.comm.serverHtmlErrorHandling(ev);
          return JSON.parse(ev.data);
        }),
        retry(this.comm.apiRetry)
      );
    } else {
      const httpOptions = {
        headers: new HttpHeaders({
          token: token + '',
          type: type + '',
        }),
      };
      return this.httpWeb
        .get(this.url + this.resources.test_attempt_id + '/' + id, httpOptions)
        .pipe(retry(this.comm.apiRetry));
    }
  }

  test_attempts_byid_seq(id, index) {
    const token = this.comm.uuid;
    if (this.platform.is('cordova')) {
      return from(
        this.httpNative.get(
          this.url +
            this.resources.test_attempts_byid_seq +
            '/' +
            id +
            '/' +
            index,
          {},
          { token: token + '' }
        )
      ).pipe(
        map((ev) => {
          this.comm.serverHtmlErrorHandling(ev);
          return JSON.parse(ev.data);
        }),
        retry(this.comm.apiRetry)
      );
    } else {
      const httpOptions = {
        headers: new HttpHeaders({
          token: token + '',
        }),
      };
      return this.httpWeb
        .get(
          this.url +
            this.resources.test_attempts_byid_seq +
            '/' +
            id +
            '/' +
            index,
          httpOptions
        )
        .pipe(retry(this.comm.apiRetry));
    }
  }

  individual_module(type) {
    const token = this.comm.uuid;
    if (this.platform.is('cordova')) {
      return from(
        this.httpNative.get(
          this.url + this.resources.individual_module,
          {},
          { token: token + '', type: type + '' }
        )
      ).pipe(
        map((ev) => {
          this.comm.serverHtmlErrorHandling(ev);
          return JSON.parse(ev.data);
        }),
        retry(this.comm.apiRetry)
      );
    } else {
      const httpOptions = {
        headers: new HttpHeaders({
          token: token + '',
          type: type + '',
        }),
      };
      return this.httpWeb
        .get(this.url + this.resources.individual_module, httpOptions)
        .pipe(retry(this.comm.apiRetry));
    }
  }
}
