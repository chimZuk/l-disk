import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ApiService } from '../../../_services/api/api.service'
import { LanguageService } from '../../../_services/language/language.service';

export interface DialogData {
  album_name: string;
  album_description: string;
}

@Component({
  selector: 'album-info',
  templateUrl: './album-info.component.html',
  styleUrls: ['./album-info.component.css']
})
export class AlbumInfoComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AlbumInfoComponent>,
    private api: ApiService,
    public lang: LanguageService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  loading: boolean = false;

  album_form = new FormGroup({
    name: new FormControl(this.data.album_name || '', [
      Validators.required,
      Validators.minLength(3)
    ]),
    description: new FormControl('')
  });

  onSubmit(): void {
    if (this.album_form.status != "INVALID") {
      this.loading = true;
      this.api.createAlbum(this.album_form.value).subscribe((result) => {
        this.loading = false;
        this.dialogRef.close();
      }, (err) => {
        this.loading = false;
        console.error(err);
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {

  }
}
