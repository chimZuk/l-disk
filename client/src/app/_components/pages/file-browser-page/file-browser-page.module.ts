import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileBrowserPageRoutingModule } from './file-browser-page-routing.module';
import { FileBrowserPageComponent } from './file-browser-page.component';


import { ApiService } from '../../../_services/api/api.service';
import { LanguageService } from '../../../_services/language/language.service';

import { SharedModule } from '../../../_modules/shared/shared.module';

@NgModule({
  declarations: [
    FileBrowserPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FileBrowserPageRoutingModule
  ],
  providers: [
    ApiService,
    LanguageService
  ]
})
export class FileBrowserPageModule { }