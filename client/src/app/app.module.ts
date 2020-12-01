import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { UrlModule } from './_modules/url/url.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { PwaService } from './_services/pwa/pwa.service';
import { SharedModule } from './_modules/shared/shared.module';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FilesService } from './_services/files/files.service';
import { HttpCancelService } from './_services/http-cancel/http-cancel.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    UrlModule,
    SharedModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    HttpCancelService,
    {
      provide: HTTP_INTERCEPTORS, useClass: FilesService, multi: true
    },
    PwaService],
  bootstrap: [AppComponent]
})
export class AppModule { }

////ng generate module profile-info --route profile-info --module ../pages/file-browser-page/file-browser-page.module
