/* eslint-disable @typescript-eslint/ban-types */
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { from, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CommonAuthService } from './common-auth.service';
import { iDictonaryWordDefination } from '../types/dictionary-types';
import { httpService } from './http.service';
import { StorageService } from './storage.service';



@Injectable()
export class DictionaryServices {
  url = environment.url + environment.apiVersion;
  resources = {
    search: '/dictonary?action=result&word=${1}',
    result: '/dictonary?action=result&word=${1}'
  }
  db: any = {};

  constructor(
    private storage: StorageService,
    private user: CommonAuthService,
    private http: httpService
  ) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.get('./assets/mostused-db.json', { headers }).subscribe((db) => {
      this.db = db;
    });
    this.loadSaved();
  }

  search(word: string){
    const data = word.replace(' ','+');
    console.log('search data', data);

    const httpOptions = {
      headers: new HttpHeaders({
        token: this.user.User.UUID
      }),
    };

    return this.http.get(
        this.url + this.resources.search.replace('${1}', data),
        httpOptions
    ).pipe(
      map((x: any) => {
        const {success, result, message} = x["error_message"];
        console.log('resultsss: ', x)
        return success == 1 ? (JSON.parse(result)): null;
      }),
    );
  }

  getResult(word: string): Observable<iDictonaryWordDefination> {
    if(this.getCached(word)){
      return of(this.getCached(word));
    }

    const data = word?.replace(' ','+');
    console.log('get word', word);

    if (this.db[data]) {
      return  of(this.db[data] as iDictonaryWordDefination) ;
    }

    const httpOptions = {
      headers: new HttpHeaders({
        token: this.user.User.UUID
      }),
    };

    return this.http.get(
      this.url + this.resources.result.replace('${1}', data),
      httpOptions
    ).pipe(
      map((x: any) => {
        const {success, result} = x["error_message"];
        console.log('resultsss: ', x)
        if( success == 1){
          const obj = JSON.parse(result);
          this.db[word] = obj;
          return obj;
        } else{
          return null;
        }
      }),
    );
  }

  getAudio(file: string) {
      return this.http.get(file);
  }

  getCached(word: string) {
    if (this.db[word]) {
      return this.db[word];
    } else {
      return null;
    }
  }

  // Saved
  savedWords: any[] = [];

  private loadSaved() {
    const strSavedWords = this.storage.getKey('saved-words');
    try {
      this.savedWords = JSON.parse(strSavedWords);
    } catch (e) { }
    if(this.savedWords == null){
      this.savedWords = [];
    }
  }

  private setSaved() {
    return this.storage.setKey('saved-words', JSON.stringify(this.savedWords));
  }

  addSaved(word: any) {
    for (const w of this.savedWords) {
      if (w == word) {
        return;
      }
    }
    this.savedWords.push(word);
    this.setSaved();
  }
  checkSaved(word: any){
    for (const w of this.savedWords) {
      if (w == word) {
        return true;
      }
    }
    return false;
  }
  removeSaved(word: any) {
    const newList: any[] = [];
    for (const w of this.savedWords) {
      if (w != word) {
        newList.push(w);
      }
    }
    this.savedWords = newList;
    this.setSaved();
  }
}
