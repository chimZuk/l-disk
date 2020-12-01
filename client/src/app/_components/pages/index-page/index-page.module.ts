import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndexPageRoutingModule } from './index-page-routing.module';
import { IndexPageComponent } from './index-page.component';

import { ApiService } from '../../../_services/api/api.service';
import { LanguageService } from '../../../_services/language/language.service';

import { SharedModule } from '../../../_modules/shared/shared.module';

@NgModule({
  declarations: [IndexPageComponent],
  imports: [
    CommonModule,
    SharedModule,
    IndexPageRoutingModule
  ],
  providers: [
    ApiService,
    LanguageService
  ]
})
export class IndexPageModule { }
