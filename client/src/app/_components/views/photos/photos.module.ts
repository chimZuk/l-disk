import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhotosRoutingModule } from './photos-routing.module';
import { PhotosComponent } from './photos.component';

import { ApiService } from '../../../_services/api/api.service';
import { LanguageService } from '../../../_services/language/language.service';
import { SharedModule } from '../../../_modules/shared/shared.module';

@NgModule({
  declarations: [
    PhotosComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PhotosRoutingModule
  ],
  providers: [
    ApiService,
    LanguageService
  ],
  entryComponents: [
    
  ]
})
export class PhotosModule { }
