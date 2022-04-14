import { Injectable } from '@angular/core';

const res = {
  Get_tips_tricks_child: '/Get_tips_tricks_child',
  Get_tips_tricks_parent: '/Get_tips_tricks_parent',
}

@Injectable({providedIn: 'root'})
export class TipsTrickService {
  constructor() { }

  Get_tips_tricks_child(pid) {
    const token = this.comm.uuid;
    if (this.platform.is('cordova')) {
      return from(
        this.httpNative.get(
          this.url + this.resources.Get_tips_tricks_child,
          {},
          { token, id: this.comm.id + '', pid: pid + '' }
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
          token,
          id: this.comm.id.toString(),
          pid: pid + '',
        }),
      };
      return this.httpWeb
        .get(this.url + this.resources.Get_tips_tricks_child, httpOptions)
        .pipe(retry(this.comm.apiRetry));
    }
  }
  Get_tips_tricks_parent() {
    const token = this.comm.uuid;
    if (this.platform.is('cordova')) {
      return from(
        this.httpNative.get(
          this.url + this.resources.Get_tips_tricks_parent,
          {},
          { token, id: this.comm.id + '' }
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
          token,
          id: this.comm.id.toString(),
        }),
      };
      return this.httpWeb
        .get(this.url + this.resources.Get_tips_tricks_parent, httpOptions)
        .pipe(retry(this.comm.apiRetry));
    }
  }


}
