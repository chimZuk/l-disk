import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollectionsRoutingModule } from './collections-routing.module';
import { CollectionsComponent } from './collections.component';

import { ApiService } from '../../../_services/api/api.service';
import { LanguageService } from '../../../_services/language/language.service';

import { SharedModule } from '../../../_modules/shared/shared.module';

@NgModule({
  declarations: [CollectionsComponent],
  imports: [
    CommonModule,
    SharedModule,
    CollectionsRoutingModule
  ],
  providers: [
    ApiService,
    LanguageService
  ]
})
export class CollectionsModule { }
