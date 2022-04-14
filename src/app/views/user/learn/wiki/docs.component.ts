import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { get_iNode, iNode } from 'src/app/services/cachev1.service';
import { StaticContentService } from 'src/app/services/static-content.service';

@Component({
  selector: 'app-docs',
  template: `
  <div #main class="container-fluid py-4">
  <div class="row">

    <!-- Sidebar navigation -->
    <!-- <div class="col-3 sidebar" *ngIf="!showOnlyContent"> -->
      <!-- #REFAC this concat is here because of a hack. check init function -->

      <!-- <mx-accordian
        [id]="'sidebar'"
        [cls]="'std'"
        [tree]="tree"
        [path]="numtostr(path)"
        (clicked)="navigateTo([(path[0] + '')].concat($event))"
      ></mx-accordian> -->

    <!-- </div> -->

    <div class="col main">

      <!-- Breadcrumps -->
      <nav aria-label="breadcrumb" *ngIf="!showOnlyContent">
        <ol class="breadcrumb">
          <li class="breadcrumb-item" *ngFor="let b of breadcrumbs; let i = index"  >
            <!-- #REFAC this concat is here because of a hack. check init function -->
            <a (click)="navigateTo([path[0]].concat(b.path))" >
              {{b.title | cap }}
            </a>
          </li>
        </ol>
      </nav>

      <!-- Content Delegator -->
      <div *ngIf="path !== null">
        <docs-delegate
          [path]="path"
          (navigateForward)="navigateTo($event)"
          (pageHeading)="setHeading($event)"
        ></docs-delegate>
      </div>

    </div>
  </div>

  </div>

  `,
  styleUrls: ['./docs.component.scss']
})

export class DocsComponent implements OnInit {

  path: number[] = null;
  tree: iNode = null;
  breadcrumbs: {path: any, title: string}[] = null;
  heading: string;
  showOnlyContent: boolean = null;

  constructor(
    private staticContent: StaticContentService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // On change in url, reset the path
    this.route.url.subscribe( () => this.init() );
  }

  ngOnInit() {
    this.init();
  }

  private async init(){
    await this.getPath()
    await this.setPageType();
  }

  // set page type
  private async setPageType(){
    // if path only has 0-1 length, then we dont need to show breadcrupms and tree
    if(this.path.length < 2){
      this.showOnlyContent = true;
    }
    // else show the correct version of breadcrumps and tree
    else{
      this.showOnlyContent = false;
      await this.buildTree();

      // REFAC: hack - set tree and breadcrumps to right node
      for (const a of this.tree.children){
          if((this.path[0] + '') == a.id){
            this.tree = a;
            break;
          }
      }

      await this.buildBreadcrumbs(this.path.slice(1));
    }
  }

  // to get path from url
  private async getPath(){
    const path: number[] = [];
    try{
      for(const urlseg of this.route.snapshot.url){
        path.push(parseInt(urlseg.path, 10))
      }
    } catch(e){
      console.log('Error While parsing path', e)
      throw e;
    }

    if(path){
      this.path =  path;
    } else{
      this.path =  [];
    }
  }

  // to build sidebar tree
  private async buildTree(){
    this.tree = await this.staticContent.getTree().toPromise()
  }

  // to build current breadcrumps
  private async buildBreadcrumbs(mainPath: any){
    const path = [];
    this.breadcrumbs = [];

    for(const p of mainPath){
      path.push(p);
      const title = get_iNode(path, this.tree.children)
      console.log(p, path, title)
      this.breadcrumbs.push({ path: path.concat(), title })
    }
  }

  // For Jump navigation
  public navigateTo(path: any[]){
    this.router.navigate(['/user/learn/wiki/' + path.join('/')])
  }

  // gets and sets heading from the delegate
  public setHeading(heading: any){
    this.heading = heading;
  }

  numtostr(path: number[]){
    return path.map(n => n + '')
  }
}
