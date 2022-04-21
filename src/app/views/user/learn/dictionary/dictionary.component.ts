import { Component, OnDestroy, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { DictionaryServices } from 'src/app/services/dictionary.service';
@Component({
  selector: 'dictionary',
  templateUrl: 'dictionary.component.html',
  styleUrls: ['dictionary.component.scss'],
})
export class DictionaryComponent implements OnDestroy, OnInit {
  dictionaryApiUbsubscribe: any;
  datas: any = [];
  eventUnsubscribe: any;
  emptyeventUnsubscribe: any;
  skeleton: boolean = false;
  selected = { word: '', id: '' };
  search_loader: any = false;
  icon: any;
  category_name: any;
  inputvalue = new FormControl('');
  constructor(public route: ActivatedRoute, public router: Router, public dictionaryApi: DictionaryServices) {
  }

  ngOnInit() {
    this.eventUnsubscribe = this.inputvalue.valueChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe((v) => {
      this.change(v);
      console.log(v)
    });
  }

  valChange() {
    console.log('valChange');
    this.selected = { word: '', id: '' };
  }

  change(e: string) {
    this.selected = { word: '', id: '' };
    try {
      if (this.dictionaryApiUbsubscribe) {
        this.dictionaryApiUbsubscribe.unsubscribe();
      }
    } catch (err) {}
    if (e == '') {
      this.datas = null;
      this.datas = [];
      return;
    }
    console.log(e);
    this.search_loader = true;
    this.dictionaryApiUbsubscribe = this.dictionaryApi.search(e).subscribe(
      (data) => {
        this.search_loader = false;

        this.datas = data.results;
      },
      (err) => {
        this.search_loader = false;
      }
    );
  }
  static_word_list = [
    {word: 'Significantly'},
    {word: 'Remarkably'},
    {word: 'Dramatically'},
    {word: 'Sharply'},
    {word: 'Gradually'},
    {word: 'Steadily'}
  ]
  ngOnDestroy() {
    try {
      if (this.dictionaryApiUbsubscribe) {
        this.dictionaryApiUbsubscribe.unsubscribe();
      }
    } catch (err) {}
    try {
      if (this.eventUnsubscribe) {
        this.eventUnsubscribe.unsubscribe();
      }
    } catch (err) {}
    try {
      if (this.emptyeventUnsubscribe) {
        this.emptyeventUnsubscribe.unsubscribe();
      }
    } catch (err) {}
  }

  detail(word: string, id: string) {
    this.selected = { word, id };
  }
}
