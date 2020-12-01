import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { UrlModule } from '../../_modules/url/url.module';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    private links: UrlModule,
    private domSanitizer: DomSanitizer
  ) { }

  url: string = this.links.api;

  token: any;

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('token');
    }
    return this.token;
  }

  getAlbums(data: any = {}): Observable<Object> {
    var req = JSON.stringify(data);

    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append("Authorization", `Bearer ${this.getToken()}`);

    return this.http.post(this.url + `api/albums.get`, req, { headers: headers }).pipe(
      map((response: Response) => {
        let data: any = response;
        if (data) {
          return data;
        } else {
          return "Error";
        }
      }));
  }

  createAlbum(data: any = {}): Observable<Object> {
    var req = JSON.stringify(data);

    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append("Authorization", `Bearer ${this.getToken()}`);

    return this.http.post(this.url + `api/album.create`, req, { headers: headers }).pipe(
      map((response: Response) => {
        let data: any = response;
        if (data) {
          return data;
        } else {
          return "Error";
        }
      }));
  }

  deleteAlbum(data: any = {}): Observable<Object> {
    var req = JSON.stringify(data);

    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append("Authorization", `Bearer ${this.getToken()}`);

    return this.http.post(this.url + `api/album.delete`, req, { headers: headers }).pipe(
      map((response: Response) => {
        let data: any = response;
        if (data) {
          return data;
        } else {
          return "Error";
        }
      }));
  }
  uploadPhotos(data: any = {}) {
    return Observable.create(observer => {
      var xhr = new XMLHttpRequest();
      xhr.open('POST', this.url + 'api/photos.upload', true);
      xhr.setRequestHeader("Authorization", `Bearer ${this.getToken()}`);
      xhr.setRequestHeader("ngsw-bypass", `true`);

      xhr.upload.addEventListener("progress", (e) => {
        observer.next({ loaded: e.loaded, total: e.total });
      });
      xhr.addEventListener("load", (e) => {
        observer.complete();
        return { unsubscribe() { } };
      });

      xhr.send(data);
    });
  }

  uploadPhotosss(data: any = {}) {
    return Observable.create(observer => {
      let xhr: XMLHttpRequest = new XMLHttpRequest();

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log("UPLOADED");
            observer.complete();
          } else {
            observer.error(xhr.response);
          }
        }
      };
      xhr.open('POST', this.url + 'api/photos.upload', true);
      xhr.setRequestHeader("Authorization", `Bearer ${this.getToken()}`);
      xhr.onprogress = function (e) {
        console.log(Math.round(e.loaded / e.total * 100));
      };
      xhr.send(data);
      xhr.onprogress = function (e) {
        console.log(Math.round(e.loaded / e.total * 100));
      };
    });
  }

  uploadPhotoss(data: any = {}) {
    let headers = new HttpHeaders();

    headers = headers.append("Authorization", `Bearer ${this.getToken()}`);
    headers = headers.append("Authorization", `Bearer ${this.getToken()}`);

    return this.http.post(this.url + 'api/photos.upload', data, {
      reportProgress: true,
      observe: 'events',
      headers: headers
    });
  }

  getPhotos(data: any = {}): Observable<Object> {
    var req = JSON.stringify(data);

    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append("Authorization", `Bearer ${this.getToken()}`);

    return this.http.post<Object>(this.url + 'api/photos.get', req, { headers: headers }).pipe(
      map((response: Response) => {
        let data: any = response;
        if (data) {
          return data;
        } else {
          return "Error";
        }
      }));
  }

  deletePhoto(data: any = {}): Observable<Object> {
    var req = JSON.stringify(data);

    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append("Authorization", `Bearer ${this.getToken()}`);

    return this.http.post<Object>(this.url + 'api/photo.delete', req, { headers: headers }).pipe(
      map((response: Response) => {
        let data: any = response;
        if (data) {
          return data;
        } else {
          return "Error";
        }
      }));
  }

  image(data: any = {}): Observable<SafeUrl> {
    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'image/png');
    headers = headers.append('Content-Type', 'image/png');

    return this.http.post(this.url + `api/small${data}`, {}, { headers: headers, responseType: 'blob' }).pipe(map(e => this.domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(e))));
  }
}