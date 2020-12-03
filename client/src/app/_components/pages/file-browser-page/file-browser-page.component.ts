import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

import { Router, NavigationEnd } from '@angular/router';
import { MatSidenav } from '@angular/material';

import { ApiService } from '../../../_services/api/api.service';
import { AuthService } from '../../../_services/auth/auth.service';
import { LanguageService } from '../../../_services/language/language.service';

import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-file-browser-page',
  templateUrl: './file-browser-page.component.html',
  styleUrls: ['./file-browser-page.component.css']
})
export class FileBrowserPageComponent implements OnInit {

  constructor(
    public api: ApiService,
    public auth: AuthService,
    public router: Router,
    public mediaMatcher: MediaMatcher,
    public changeDetectorRef: ChangeDetectorRef,
    public lang: LanguageService
  ) {
    this.router_sub = router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.pageName = val.urlAfterRedirects;
        this.parseTitle(this.pageName);
      }
    });

    this.mobileQuery = this.mediaMatcher.matchMedia('(max-width: 640px)');
    this._mobileQueryListener = () => { this.isExpanded = true; this.changeDetectorRef.detectChanges() };
    this.mobileQuery.addEventListener("match", this._mobileQueryListener);
  }

  mobileQuery: MediaQueryList;
  private _mobileQueryListener = () => { };

  @ViewChild('drawer', { static: false }) drawer: MatSidenav;

  toggleDrawer() {
    if (this.mobileQuery.matches) {
      this.isExpanded = !this.drawer.opened;
      if (this.isExpanded) {
        this.drawer.open();
      } else {
        this.drawer.close();
      }
    } else {
      this.isExpanded = !this.isExpanded;
    }
  }

  router_sub: any;

  loading: boolean = true;
  isExpanded: boolean = false;

  pageName: string;
  title: string;
  home: string;
  isHome: boolean = true;

  parseTitle(route: any): void {
    switch (route) {
      case "/albums": {
        this.title = this.lang.t("a");
        this.home = "albums";
        this.isHome = true;
        break;
      }
      case "/shared": {
        this.title = this.lang.t("s");
        this.home = "shared";
        this.isHome = true;
        break;
      }
      case "/profile-info": {
        this.title = this.lang.t("pr");
        this.isHome = false;
        break;
      }
      case "/profile-settings": {
        this.title = this.lang.t("st");
        this.isHome = false;
        break;
      }
      default: {
        if (route.indexOf("/photos") > -1) {
          this.title = this.lang.t("p");
          this.home = "albums";
          this.isHome = false;
          break;
        }

        this.title = this.lang.t("a");
        this.home = "albums";
        this.isHome = false;
        break;
      }
    }
  }

  goHome() {
    this.router.navigate(["/" + this.home]);
  }

  menuAction(path) {
    if (this.mobileQuery.matches) {
      this.toggleDrawer();
    }
    this.router.navigate(["/" + path]);
  }

  popupAction(path) {
    this.router.navigate(["/" + path]);
  }

  scrollTop() {
    document.getElementById("sideNavContent").scrollTop = 0;
  }

  ngOnInit() {
    this.loading = true;
    this.auth.profile().subscribe(() => {
      this.loading = false;
      this.router.navigate(["/"]);
    }, (err) => {
      this.auth.logout();
    });
  }

  ngOnDestroy() {
    this.mobileQuery.removeEventListener("match", this._mobileQueryListener);
    this.router_sub.unsubscribe();
  }

}
