import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileInfoRoutingModule } from './profile-info-routing.module';
import { ProfileInfoComponent } from './profile-info.component';

import { ApiService } from '../../../_services/api/api.service';
import { LanguageService } from '../../../_services/language/language.service';
import { SharedModule } from '../../../_modules/shared/shared.module';


@NgModule({
  declarations: [ProfileInfoComponent],
  imports: [
    CommonModule,
    SharedModule,
    ProfileInfoRoutingModule
  ],
  providers: [
    ApiService,
    LanguageService
  ]
})
export class ProfileInfoModule { }
