import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { Router } from '@angular/router';

import { ApiService } from '../../../_services/api/api.service';
import { AuthService } from '../../../_services/auth/auth.service';
import { LanguageService } from '../../../_services/language/language.service';

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.css']
})
export class IndexPageComponent implements OnInit {

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar,
    public lang: LanguageService
  ) { }

  mode: string = "register";
  user: any;
  authError: string = "kek";
  loading: boolean = false;

  auth_form = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(4)
    ]),
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(4)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4)
    ])
  });

  openSnackBar(message: string, action: string = "Close") {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  switchMode(mode): void {
    this.mode = mode;
    switch (this.mode) {
      case "login": {
        this.auth_form.controls["name"].disable();
        break;
      }
      case "register": {
        this.auth_form.controls["name"].enable();
        break;
      }
      default: {
        break;
      }
    }
  }

  onSubmit(): void {
    this.loading = true;

    if (this.auth_form.status != "INVALID") {
      switch (this.mode) {
        case "login": {
          this.auth.login(this.auth_form.value).subscribe((result) => {
            this.logIn();
          }, (err) => {
            this.loading = false;
            this.openSnackBar(err.error.message);
          });
          break;
        }
        case "register": {
          this.auth.register(this.auth_form.value).subscribe((result) => {
            this.logIn();
          }, (err) => {
            this.loading = false;
            this.openSnackBar(err.error.message);
          });
          break;
        }
        default: {
          break;
        }
      }
    }
  }

  logIn(): void {
    this.auth.profile().subscribe(() => {
      this.loading = false;
      this.router.navigate(["/"]);
    }, (err) => {
      this.loading = false;
      this.auth.logout();
      this.openSnackBar(err.error.message);
    });
  }


  ngOnInit() {
    this.switchMode("login");
  }
}
