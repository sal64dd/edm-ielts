import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private storage: Storage = localStorage;

  constructor() {
  }

  setKey(key: string, value: string): boolean{
    try{
      this.storage.setItem(key, value);
      return true;
    } catch(e){
      console.error('setKey Error: ', e);
      return false;
    }
  }

  getKey(key: string): string{
    try{
      return this.storage.getItem(key);
    } catch(e){
      console.error('getKey Error: ', e);
      return null;
    }
  }

  remove(key: string): boolean {
    try{
      this.storage.removeItem(key);
      return true;
    } catch(e){
      console.error('removeKey Error: ', e);
      return false;
    }
  }

  clear(){
    this.storage.clear();
  }

}
