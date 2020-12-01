import { AfterViewInit, Directive, ElementRef, HostBinding, Input } from '@angular/core';

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { DomSanitizer } from '@angular/platform-browser';
import { map } from 'rxjs/operators';

@Directive({
  selector: 'img[appLazyLoad]'
})
export class ImageElementDirective implements AfterViewInit {

  @HostBinding('attr.src') srcAttr = null;
  @Input() src: string;
  @Input() photo: any;

  constructor(
    private el: ElementRef,
    private http: HttpClient,
    private domSanitizer: DomSanitizer
  ) { }

  ngAfterViewInit() {
    this.canLazyLoad() ? this.lazyLoadImage() : this.loadImage();
  }

  private canLazyLoad() {
    return window && 'IntersectionObserver' in window;
  }

  private lazyLoadImage() {
    const obs = new IntersectionObserver(entries => {
      entries.forEach((element) => {
        if (element.isIntersecting) {
          this.loadImage();
          obs.unobserve(this.el.nativeElement);
        }
      });
    });

    obs.observe(this.el.nativeElement);
  }

  private loadImage() {
    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'image/png');
    headers = headers.append('Content-Type', 'image/png');

    this.photo.viewed = true;
    this.http.post(this.src, {}, { headers: headers, responseType: 'blob' }).pipe(map(e => this.domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(e)))).subscribe(data => {
      this.srcAttr = data;
    });
  }

}
