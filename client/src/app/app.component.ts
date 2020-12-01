import { Component } from '@angular/core';
import { PwaService } from './_services/pwa/pwa.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private pwa: PwaService) { }
  
  title = 'photo-hosting-client';
}
