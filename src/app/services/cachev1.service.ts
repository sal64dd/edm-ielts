/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { StorageService } from './storage.service';
import { Injectable } from '@angular/core';

export interface iNode {
  id: string;
  data: any;
  children: iNode[];
}

@Injectable({providedIn: 'root'})
export class CacheV1Service {

  pages: iNode[] = [];

  constructor(private storage: StorageService) {
    try{
      // this.pages = JSON.parse(storage.getKey('cache')) as iNode[]
    } catch(e){
      console.log('Error loading cache!');

    }
    if(!this.pages){
      this.pages = [];
    }

  }

  insert(path: string[], data: any, next: iNode[] | null = null){

    if(path.length < 1){
      throw Error('Error: path length less than 1');
    }

    if (next == null ){
      next = this.pages;
    }

    // get the iNode in the current level
    const search_node_id = path[0];
    let searchNode: iNode | null = null;
    for(const nextNode of next){
      if (nextNode.id == search_node_id){
        searchNode = nextNode;
      }
    }

    // create searchNode if it doesnt exists
    if(searchNode == null){
      searchNode = {
        id: search_node_id,
        data: null,
        children: []
      } as iNode;
      next.push(searchNode)
    }

    if(path.length == 1){
      searchNode.data = data
      this.storage.setKey('cache', JSON.stringify(this.pages));
    } else{
      // call the insert function on searchNode's children
      this.insert(path.concat().splice(1), data, searchNode.children);
    }
  }

  get(path: string[], next: iNode[] | null = null): null | any{
    if(path.length < 1){
      return null;
    }

    if (next == null ){
      next = this.pages;
    }

    // get the iNode in the current level
    const search_node_id = path[0];
    for(const nextNode of next){
      if (nextNode.id == search_node_id){
        if(path.length == 1){
          // check timestamp
          return nextNode.data;
        } else{
          return this.get(path.concat().splice(1), nextNode.children)
        }
      }
    }

    return null;
  }



}

export function insert_iNode(path: string[], data: any, next: iNode[]){

  if(path.length < 1){
    throw Error('Error: path length less than 1');
  }

  // get the iNode in the current level
  const search_node_id = path[0];
  let searchNode: iNode | null = null;
  for(const nextNode of next){
    if (nextNode.id == search_node_id){
      searchNode = nextNode;
    }
  }

  // create searchNode if it doesnt exists
  if(searchNode == null){
    searchNode = {
      id: search_node_id,
      data: null,
      children: []
    } as iNode;
    next.push(searchNode)
  }

  if(path.length == 1){
    searchNode.data = data
  } else{
    // call the insert function on searchNode's children
    insert_iNode(path.concat().splice(1), data, searchNode.children);
  }
}

export function get_iNode(path: string[], next: iNode[]): null | any{
  if(path.length < 1){
    return null;
  }

  // get the iNode in the current level
  const search_node_id = path[0];
  for(const nextNode of next){
    if (nextNode.id == search_node_id){
      if(path.length == 1){
        // check timestamp
        return nextNode.data;
      } else{
        return get_iNode(path.concat().splice(1), nextNode.children)
      }
    }
  }

  return null;
}


