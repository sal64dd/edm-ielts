import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { iBookmark, iHighlightRangeID } from 'src/app/types/annotation-types';
import { StorageService } from './storage.service';

const BOOKMARK_KEY = 'bookmarks';

@Injectable({ providedIn: 'root' })

export class BookmarkService {
  Bookmarks: iBookmark[] = []

  constructor(
    private storage: StorageService,
    private router: Router
  ) {
    this.getLocalStorage();
  }

  public setLocalStorage() {
    return this.storage.setKey(BOOKMARK_KEY, JSON.stringify(this.Bookmarks));
  }

  public clearLocalStorage() {
    this.storage.remove(BOOKMARK_KEY);
  }

  private getLocalStorage() {
    const strBookmarks = this.storage.getKey(BOOKMARK_KEY);
    let Bookmarks: iBookmark[];
    try {
      Bookmarks = JSON.parse(strBookmarks) as iBookmark[];
      if(Bookmarks){
        this.Bookmarks = Bookmarks;
      }
    } catch (e) {
      console.error(' error parsing bookmark data from LS: ', e);
    }
  }

  public route(b: iBookmark) {
    this.router.navigate([b.address?.link]);
  }

  public remove(removeRange: iHighlightRangeID, bookmark: iBookmark) {
    const newRange: iHighlightRangeID[] = []
    for(const r of bookmark.ranges){
      if(r.startId != removeRange.startId || r.endId != removeRange.endId){
        newRange.push(r)
      }
    }
    if(newRange.length > 0){
      bookmark.ranges = newRange;
    } else{
      this.Bookmarks = this.Bookmarks.filter(v => v.id != bookmark.id);
    }

    this.setLocalStorage();
    // this.cd.detectChanges();
  }

  public get(id: string): iHighlightRangeID[] {
    for(const b of this.Bookmarks){
     if (b.id == id){
       return b.ranges;
     }
    }
    return [];
  }

  public set(id: string, ranges: iHighlightRangeID[], address: { name: string; link: string }){
    console.log(id, ranges)

    let isFound = false;
    for(const c of this.Bookmarks){
      if (c.id == id){
        c.ranges = ranges
        isFound = true;
      }
    }
    if(!isFound){
      this.Bookmarks.push({id, ranges, address})
    }
    this.setLocalStorage();
  }

}

