import { Component, OnInit } from '@angular/core';
import { BookmarkService } from 'src/app/services/bookmark.service';

@Component({
  selector: 'app-bookmark-list',
  templateUrl: './bookmark-list.component.html',
  styleUrls: ['./bookmark-list.component.scss']
})
export class BookmarkListComponent implements OnInit {

  constructor(public bk: BookmarkService) { }

  ngOnInit(): void {
  }

}
