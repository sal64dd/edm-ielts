import { CacheV1Service, iNode } from './cachev1.service';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { httpService } from './http.service';
import { CommonAuthService } from './common-auth.service';

const routes = {
  staticData: '/sp_new/:id',
  staticCategories: '/Category',
  staticCategories_english_essentials: '/static_page_cat_ee'
}
const URL = environment.url + environment.apiVersion;

export interface iStaticCategory {
  category_id: number;
  packages?: number[];
  category_name: string;
  icon: string;
  active: boolean
};

export interface iStaticDataComponent {
  active?: string;
  display_order?: number;
  video?: string;
  static_page_id?: number;
  packages?: number[];
  template_type?: STATICTEMPLATES;
  pid?: number;
  category_id?: number;
  question_type_id?: number;
  title?: string;
  audio?: string;
  icon?: string;
  image?: string;
  contents?: string
  wh_contents?: string;
}

export interface iStaticData {
  parent: iStaticDataComponent,
  child: iStaticDataComponent[]
}

export enum STATICTEMPLATES { 'Text only', 'Tabs', 'Faqs', 'Listing', 'Grid', 'Tab listing' };

@Injectable({ providedIn: 'root' })
export class StaticContentService {
  public constructor(
    private http: httpService,
    private User: CommonAuthService,
    private cache: CacheV1Service
  ) {
    // this.cacheAllPages();
    // this.buildNavigationTree();
  }

  Tree: iNode = null;

  public getStaticData(path: number[]): Observable<iStaticData> {
    // check cache
    const cachedPage = this.cache.get( ['static-pages'].concat(path.map(n => ''+n)) );
    if(cachedPage){
      // console.log('cached page found', cachedPage)
      return of(cachedPage as iStaticData);
    }

    let res: Observable<iStaticData> = null;
    // if no path is given
    if(path.length == 0){
      // return all the programs

      const result: iStaticData = {
        parent: {
          title: 'Programs'
        },
        child: [
          {
            static_page_id: 0,
            title: 'English Essentials'
          },
          {
            static_page_id: 1,
            title: 'IELTS'
          },
        ]
      }

      res = of(null);
    }
    // if program id is given
    else if(path.length == 1){
      // return program catgories
      const prog_id = path[0];
      if(prog_id == 0){
        res = this.getStaticCategories(true).pipe(
          map((d: iStaticCategory[]): iStaticData => {
            const result: iStaticData = {
              parent: {
                title: 'English Essentials'
              },
              child: d.map(
                (c: iStaticCategory): iStaticDataComponent => {
                  const r: iStaticDataComponent =  {
                    title : c.category_name,
                    static_page_id: c.category_id
                  }
                  return r;
                }
              )
            }
            return result;
        })
        );
      } else if(prog_id == 1){
        res =  this.getStaticCategories(false).pipe(
          map((d: iStaticCategory[]): iStaticData => {
            const result: iStaticData = {
              parent: {
                title: 'IELTS'
              },
              child: d.map(
                (c: iStaticCategory): iStaticDataComponent => {
                  const r: iStaticDataComponent =  {
                    title : c.category_name,
                    static_page_id: c.category_id
                  }
                  return r;
                }
              )
            }
            return result;
        })
        );
      }
    }
    // if program and category id is given
    else if(path.length == 2){
      const prog_id = path[0];
      const cat_id = path[1];
      res = this.getData(cat_id, false)
    }
    // if page id is also given
    else{
      const page_id = path[path.length-1];
      res = this.getData(page_id, true)
    }

    // add to cache
    res.subscribe((pageData: iStaticData) => {
      this.addToCache(path, pageData);
    })

    // return
    return res
  }

  public getTree(): Observable<iNode>{
    if(this.Tree){
      return of(this.Tree);
    } else{
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http.get('./assets/static-content-tree.json', { headers })
        .pipe( map( (d: any): iNode =>  {
          this.Tree = d as iNode;
          return this.Tree
        }));
    }
  }

  public buildNavigationTree() {

    const run = (path: number[]) => {
      this.getStaticData(path).subscribe(d => {
        this.cache.insert(['tree'].concat(path.map(n => ''+n)), d.parent.title)
        if(d.child){
        d.child.forEach(c => {
          run( path.concat([c.static_page_id]) )
        });}
      })
    }
    run([])
  }

  private getData(page_id: number, post = true): Observable<iStaticData> {

    // Build header
    const httpOptions = {
      headers: new HttpHeaders({
        token: this.User.User.UUID,
      })
    };

    const url = URL + routes.staticData.replace(':id', '' + page_id);

    console.log('query url', url);

    let observ = null;
    if(post){
      observ = this.http.post(url, {}, httpOptions)
    } else{
      observ = this.http.get(url, httpOptions)
    }

    return observ.pipe(map((data: any) => {
      if (data.error_message.success != '1') {
        throw Error('Server Error:' + JSON.stringify(data));
      }

      // console.log('s', data);

      // console.log('TEMPLATE TYPE: ', data.template_type)

      const parent = this.jsonToStaticComp(data.error_message.data.parent);
      const child = data.error_message.data.child?.map(
        (c: any) => this.jsonToStaticComp(c));

      // console.log('c', child);
      return {
        parent, child
      } as iStaticData;
    }));
  }

  private getStaticCategories(is_essential: boolean = false):
    Observable<iStaticCategory[]> {
    // Build header
    const httpOptions = {
      headers: new HttpHeaders({
        token: this.User.User.UUID,
      })
    };

    const url = URL + (is_essential ?
      routes.staticCategories_english_essentials :
      routes.staticCategories);

    return this.http.get(url, httpOptions).pipe(
      map((data: any): iStaticCategory[] => {
        if (data.error_message.success != '1') {
          throw Error('Server Error:' + JSON.stringify(data));
        }

        // console.log('scat', data);

        return data.error_message.data
        .filter((f: any) => f.category_id != '78')
        .map(
          (c: any): iStaticCategory => this.jsonToStaticCategories(c)
        );
      })
    );
  }

  private jsonToStaticComp(parent: any) {
    const obj: iStaticDataComponent = {
      static_page_id: parseInt(parent.static_page_id, 10),
      packages: parent.packages?.split(',').map((s: string) => parseInt(s, 10)),
      template_type: parent.template_type as STATICTEMPLATES,
      pid: parseInt(parent.pid, 10),
      category_id: parseInt(parent.category_id, 10),
      question_type_id: parseInt(parent.question_type_id, 10),
      title: parent.title,
      audio: parent.audio,
      icon: parent.icon,
      image: parent.image,
      contents: parent.contents,
      wh_contents: parent.wh_contents,
      active: parent.active,
      display_order: parent.display_order,
      video: parent.video
    };
    return obj;
  }

  private jsonToStaticCategories(e: any) {
    const obj: iStaticCategory = {
      category_id: parseInt(e.category_id, 10),
      packages: e.packages?.split(',').map((s: string) => parseInt(s, 10)),
      category_name: e.category_name,
      icon: e.icon,
      active: e.active == '1' ? true : false
    }
    return obj;
  }

  private addToCache(path: number[], page_data: iStaticData){
    this.cache.insert( ['static-pages'].concat(path.map(n => ''+n)), page_data );
  }

  public cacheAllPages(path: any[] = []){
    this.getStaticData(path).subscribe(d => {
      console.log('caching: ', d.parent.title, path );
      if(d.child){
      d.child.forEach(c => {
        this.cacheAllPages( path.concat([c.static_page_id]) )
      });}
    })
  }



}
