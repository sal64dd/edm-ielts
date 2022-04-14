import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMapTo, switchMap } from 'rxjs/operators';
import { ProfileService } from '../services/core/profile.service';
import { ProgramV2Service } from '../services/core/programv2.service';
import { UserV3Service } from '../services/core/userv3.service';

@Injectable({
  providedIn: 'root'
})
export class IfLoggedInGuard implements CanLoad {
  constructor(private user: UserV3Service, private profile: ProfileService, private program: ProgramV2Service){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.user.User = {ID:"964",UUID:"2af6db59b1e2ffa631ac4486ec4a92cd"}
      return this.profile.get(this.user.User).pipe(
        map(profile => {
          this.profile.Profile = profile;
          return true
        }),
        switchMap(v => this.program.get(this.user.User).pipe(
          map(program => {
            this.program.Program = program;
            return true;
          })
        ))
      );

  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.user.User = {ID:"964",UUID:"2af6db59b1e2ffa631ac4486ec4a92cd"};
      return this.profile.get(this.user.User).pipe(
        map(profile => {
          this.profile.Profile = profile;
          return true
        }),
        switchMap(v => this.program.get(this.user.User).pipe(
          map(program => {
            this.program.Program = program;
            return true;
          })
        ))
      );
  }
}
