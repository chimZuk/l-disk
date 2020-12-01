import { Component, OnInit } from '@angular/core';

import { LanguageService } from '../../../_services/language/language.service';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent implements OnInit {

  constructor(
    public lang: LanguageService
  ) { }

  ngOnInit() {
  }

}
