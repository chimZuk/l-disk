import { Component, OnInit, OnDestroy } from '@angular/core';

import { ActivatedRoute } from '@angular/router'

import { ApiService } from '../../../_services/api/api.service';
import { LanguageService } from '../../../_services/language/language.service';

import { UrlModule } from '../../../_modules/url/url.module';
import { MatDialog } from '@angular/material/dialog';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    public lang: LanguageService,
    public url: UrlModule,
    public dialog: MatDialog,
    public mediaMatcher: MediaMatcher,
    public changeDetectorRef: ChangeDetectorRef
  ) {
    this.mobileQuery = this.mediaMatcher.matchMedia('(max-width: 640px)');
    this._mobileQueryListener = () => { this.changeDetectorRef.detectChanges() };
    this.mobileQuery.addEventListener("match", this._mobileQueryListener);
  }

  mobileQuery: MediaQueryList;
  public _mobileQueryListener = () => { };
  sub: any;

  loading: boolean = false;
  photos_loading: boolean = false;
  photos: any;

  album: string;

  onImageLoad(i) {
    this.photos[i].loading = false;
  }

  getPhotos(album) {
    this.photos_loading = true;

    this.api
      .getPhotos({ albumID: album })
      .subscribe((data: any) => {
        this.photos = data.files.map((file, i) => {
          return {
            ...file,
            loading: true,
            viewed: false
          }
        });
        this.photos_loading = false;
        this.loading = false;
      });
  }

  deletePhoto(photo) {
    this.photos_loading = true;
    this.api
      .deletePhoto({ _id: photo._id })
      .subscribe((data: any) => {
        this.getPhotos(this.album);
      });
  }

  token: any;

  ngOnInit() {
    this.loading = true;
    this.token = localStorage.getItem('token');
    this.sub = this.route
      .queryParams
      .subscribe(params => {
        this.album = params['album'];
        this.getPhotos(this.album);
      });
  }

  ngOnDestroy() {
    this.mobileQuery.removeEventListener("match", this._mobileQueryListener);
    this.sub.unsubscribe();
  }

  fileUploadProgress: any = 0;
  fileUploadLoadingType: any = "indeterminate";
  filesUploadArrayProgress: any = [];

  uploadPhotos(fileInput: any) {
    this.photos_loading = true;

    const filesToUpload = <Array<File>>fileInput.target.files;
    const files: Array<File> = filesToUpload;
    var filesUploadArray: any = [];

    for (var i = 0; i < files.length; i++) {
      var file_t = files[i];
      var fd: any = new FormData();

      fd.append("albumID", this.album);
      fd.append("files", file_t, file_t['name']);

      this.filesUploadArrayProgress.push({
        name: file_t.name,
        size: file_t.size,
        size_up: 0,
        progress: 0,
        status: "Processing"
      });

      filesUploadArray.push(new Promise(function (resolve, reject) {
        this.filesUpload(fd, i, resolve, reject)
      }.bind(this)));
    }

    Promise.all(filesUploadArray).then(function () {
      this.photos_loading = false;
      this.filesUploadArrayProgress = [];
      this.getPhotos(this.album);
    }.bind(this), err => {
      if (err) {
        console.log(err);
      }
    });

  }

  filesUpload(formData, index, resolve, reject) {
    const myObserver = {
      next: e => {
        this.filesUploadArrayProgress[index].status = "Uploading";
        this.filesUploadArrayProgress[index].size_up = e.loaded;
        this.filesUploadArrayProgress[index].progress = Math.round(e.loaded / e.total * 100);
        console.log(`Uploading: ${index}; Progress: ${Math.round(e.loaded / e.total * 100)}`);
      },
      error: err => reject(err),
      complete: () => resolve(true),
    };

    this.api.uploadPhotos(formData).subscribe(myObserver);
  }
}