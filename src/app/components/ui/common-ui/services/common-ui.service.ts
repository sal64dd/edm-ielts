import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonUiService {

  /**
   * Page Header
   */
  public _pageHeader: string = '';
  public get pageHeader () {return this._pageHeader; }
  public set pageHeader(v: string) {
    if(v) {
      this._pageHeader = v;
      this.title.setTitle('Edmissions | ' + v);
    }
    else
      this.title.setTitle('Edmissions')

  }

  /**
   * Sidebar Menu
   */
  public sidebarMenu: boolean = false;
  public menuToggle = () => this.sidebarMenu = !this.sidebarMenu;

  constructor(private title: Title) { }
}
