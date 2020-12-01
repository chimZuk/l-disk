import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class UrlModule {
  public api: string = "https://photos.chimzuk.com/";
  public socketbase: string = "https://photos.chimzuk.com/";
}