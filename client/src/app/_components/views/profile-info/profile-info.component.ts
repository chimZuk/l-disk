import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../../_services/language/language.service';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css']
})
export class ProfileInfoComponent implements OnInit {

  constructor(
    public lang: LanguageService
  ) { }

  ngOnInit() {
  }

}
