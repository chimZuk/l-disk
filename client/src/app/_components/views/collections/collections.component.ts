import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { ApiService } from '../../../_services/api/api.service';
import { AuthService } from '../../../_services/auth/auth.service';
import { LanguageService } from '../../../_services/language/language.service';

import { MatDialog } from '@angular/material/dialog';

import { AlbumInfoComponent } from '../../dialogs/album-info/album-info.component'

import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css']
})
export class CollectionsComponent implements OnInit {

  constructor(
    public api: ApiService,
    public auth: AuthService,
    public router: Router,
    public dialog: MatDialog,
    public mediaMatcher: MediaMatcher,
    public changeDetectorRef: ChangeDetectorRef,
    public lang: LanguageService
  ) {
    this.mobileQuery = this.mediaMatcher.matchMedia('(max-width: 640px)');
    this._mobileQueryListener = () => { this.changeDetectorRef.detectChanges() };
    this.mobileQuery.addEventListener("match", this._mobileQueryListener);
  }

  mobileQuery: MediaQueryList;
  public _mobileQueryListener = () => { };


  loading: boolean = false;
  album_loading: boolean = false;
  albums: any;

  getAlbums() {
    this.album_loading = true;

    this.api
      .getAlbums()
      .subscribe((data: any) => {
        this.albums = data.albums;
        this.loading = false;
        this.album_loading = false;
      });
  }

  openAlbum(album) {
    this.router.navigate(['/photos'], { queryParams: { album: album._id } });
  }

  deleteAlbum(album) {
    this.album_loading = true;
    this.api
      .deleteAlbum({ _id: album._id })
      .subscribe((data: any) => {
        this.getAlbums();
      });
  }

  ngOnInit() {
    this.loading = true;
    this.getAlbums();
  }

  ngOnDestroy() {
    this.mobileQuery.removeEventListener("match", this._mobileQueryListener);
  }

  newFolder(): void {
    const dialogRef = this.dialog.open(AlbumInfoComponent, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAlbums();
    });
  }
}
