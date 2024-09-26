import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../service/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {

  constructor(private authService:AuthService,
              private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isLoggedIn()) {
      if (route.data && route.data.roles) {
        for (const role of route.data.roles) {
          if (this.authService.hasGroup(role)) return true;
        }
        return false;
      }
      return true;
    } else {
      this.router.navigate(["login"]);
      return false;
    }
  }

}
