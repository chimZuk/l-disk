import { Pipe, PipeTransform } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'secure'
})
export class SecurePipe implements PipeTransform {

  constructor(
    private http: HttpClient,
    private domSanitizer: DomSanitizer
  ) { }

  transform(url): Observable<SafeUrl> {
    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'image/png');
    headers = headers.append('Content-Type', 'image/png');
    return this.http.post(url, {}, { headers: headers, responseType: 'blob' }).pipe(map(e => this.domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(e))));
  }

}