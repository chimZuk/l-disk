import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material';
import { SwUpdate } from '@angular/service-worker';

@Injectable()
export class PwaService {
  constructor(private swUpdate: SwUpdate, private snackbar: MatSnackBar) {
    this.swUpdate.available.subscribe(evt => {
      const snack: any = this.snackbar.open('Update Available', 'Reload');

      snack
        .onAction()
        .subscribe(() => {
          window.location.reload();
        });

      snack.setTimeout(() => {
        snack.dismiss();
      }, 6000);
    });
  }
}