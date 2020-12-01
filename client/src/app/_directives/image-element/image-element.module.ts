import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageElementDirective } from './image-element.directive';

@NgModule({
  declarations: [ImageElementDirective],
  imports: [
    CommonModule
  ],
  exports: [
    ImageElementDirective
  ]
})
export class ImageElementModule { }
