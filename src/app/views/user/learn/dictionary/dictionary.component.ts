import { Component, OnDestroy, OnInit } from '@angular/core';
import { DictionaryServices } from '../../../services/api/dictionary.service';
import { NavController } from '@ionic/angular';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { CommonService } from '../../../services/core/common.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
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
  constructor(public route: ActivatedRoute, public navCtr: NavController, public dictionaryApi: DictionaryServices, public comm: CommonService) {
    this.icon = this.route.snapshot.params.icon;
    this.category_name = this.route.snapshot.params.category_name;
  }

  ngOnInit() {
    this.eventUnsubscribe = this.inputvalue.valueChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe((v) => {
      this.change(v);
      console.log(v)
    });

    // this.eventUnsubscribe = fromEvent(
    //   document.getElementById('getVal'),
    //   'input'
    // )
    //   .pipe(debounceTime(300), distinctUntilChanged())
    //   .subscribe((event) => {
    //     this.change(event);
    //   });

    // this.emptyeventUnsubscribe = fromEvent(
    //   document.getElementById('getVal'),
    //   'input'
    // ).subscribe((event) => {
    //   this.datas = [];
    // });
  }

  valChange() {
    console.log('valChange');
    this.selected = { word: '', id: '' };
  }

  change(e) {
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
        this.comm.commonError(err);
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

  detail(word, id) {
    this.selected = { word, id };
  }
}
