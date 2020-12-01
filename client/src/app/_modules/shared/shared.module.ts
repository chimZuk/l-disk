import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlbumInfoComponent } from '../../_components/dialogs/album-info/album-info.component';
import { ImageElementModule } from '../../_directives/image-element/image-element.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SecurePipe } from '../../_pipes/secure/secure.pipe';

import {
  MatMenuModule,
  MatCardModule,
  MatListModule,
  MatIconModule,
  MatInputModule,
  MatRippleModule,
  MatButtonModule,
  MatDialogModule,
  MatTooltipModule,
  MatSidenavModule,
  MatToolbarModule,
  MatSnackBarModule,
  MatFormFieldModule,
  MatProgressBarModule,
  MatProgressSpinnerModule
} from '@angular/material';

@NgModule({
  declarations: [
    AlbumInfoComponent,
    SecurePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ImageElementModule,
    MatMenuModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatInputModule,
    MatRippleModule,
    MatButtonModule,
    MatDialogModule,
    MatTooltipModule,
    MatSidenavModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatProgressSpinnerModule
  ],
  exports: [
    SecurePipe,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ImageElementModule,
    AlbumInfoComponent,
    MatMenuModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatInputModule,
    MatRippleModule,
    MatButtonModule,
    MatDialogModule,
    MatTooltipModule,
    MatSidenavModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatProgressSpinnerModule
  ],
  entryComponents: [
    AlbumInfoComponent
  ]
})
export class SharedModule { }
