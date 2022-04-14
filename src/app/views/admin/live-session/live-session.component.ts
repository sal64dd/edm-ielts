import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeResourceUrl } from '@angular/platform-browser';
import { ModalDefaultComponent } from 'src/app/components/common/modal-default/modal-default.component';

@Component({
  selector: 'app-modal-live-session',
  templateUrl: 'live-session.component.html'
})

export class LiveSessionComponent implements OnInit {
  @Input() sessionId: string;
  @Input() isModerated: boolean;
  get url() {
    let url  = '';
    if(this.isModerated){
      url = 'https://moderated.jitsi.net/';
    } else{
      url ='https://meet.jit.si/moderated/';
    }
    return this.transform(url + this.sessionId)
  }
  constructor(private _sanitizer: DomSanitizer) {  }
  ngOnInit() { }

  transform(v: string): SafeResourceUrl {
    return this._sanitizer.bypassSecurityTrustResourceUrl(v);
  }


}
