import { Injectable } from '@angular/core';

import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {

    var url: String = route.url.toString();

    if (!this.authService.isLoggedIn() && url.indexOf("login") == -1) {
      this.authService.logout(route.url.length > 0 ? { queryParams: { retUrl: route.url } } : {})
      return false;
    } else {
      if (this.authService.isLoggedIn() && url.indexOf("login") != -1) {
        this.router.navigate(["/"]);
        return false;
      }
    }

    return true;
  }

}