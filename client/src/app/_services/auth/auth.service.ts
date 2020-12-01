import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { UrlModule } from '../../_modules/url/url.module';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private links: UrlModule
  ) {
    this.updateUserData();
  }

  private updateUserData() {
    this.profile().subscribe((data) => {
      this.user = data;
    }, (err) => {
      this.logout();
    });
  }

  url: string = this.links.api;
  
  user: any = {};

  private token: string;

  private saveToken(token: string): void {
    localStorage.setItem('token', token);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('token');
    }
    return this.token;
  }

  public logout(params: any = {}): void {
    this.token = '';
    window.localStorage.removeItem('token');
    this.router.navigate(['/login'], params);
  }

  public getUserDetails(): any {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  private request(method, type, user?: any): Observable<any> {
    let base;

    if (method === 'post') {
      base = this.http.post(this.url + `api/${type}`, user);
    } else {
      base = this.http.post(this.url + `api/${type}`, {}, { headers: { Authorization: `Bearer ${this.getToken()}` } });
    }

    const request = base.pipe(
      map((data: any) => {
        if (data.token) {
          this.saveToken(data.token);
          if (type != "profile") {
            this.updateUserData();
          }
        }
        return data;
      })
    );

    return request;
  }

  public register(user): Observable<any> {
    return this.request('post', 'register', user);
  }

  public login(user): Observable<any> {
    return this.request('post', 'login', user);
  }

  public profile(): Observable<any> {
    return this.request('get', 'profile');
  }
}