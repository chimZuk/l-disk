import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router, ActivationEnd, NavigationStart } from '@angular/router';
import { HttpCancelService } from '../http-cancel/http-cancel.service'
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FilesService implements HttpInterceptor {

  constructor(router: Router,
    private httpCancelService: HttpCancelService) {

    router.events.subscribe(event => {
      var e: any = event;

      if (router.url.indexOf("photos") > -1 && e.url && e.url.indexOf("albums") && event instanceof NavigationStart) {
        //console.log(router.url, event);
        //alert("Cancelled");
        this.httpCancelService.cancelPendingRequests();
      }
    });

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    return next.handle(request).pipe(takeUntil(this.httpCancelService.onCancelPendingRequests()));
  }
}