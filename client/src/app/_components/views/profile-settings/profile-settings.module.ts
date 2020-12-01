import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileSettingsRoutingModule } from './profile-settings-routing.module';
import { ProfileSettingsComponent } from './profile-settings.component';

import { ApiService } from '../../../_services/api/api.service';
import { LanguageService } from '../../../_services/language/language.service';
import { SharedModule } from '../../../_modules/shared/shared.module';


@NgModule({
  declarations: [ProfileSettingsComponent],
  imports: [
    CommonModule,
    SharedModule,
    ProfileSettingsRoutingModule
  ],
  providers: [
    ApiService,
    LanguageService
  ]
})
export class ProfileSettingsModule { }
