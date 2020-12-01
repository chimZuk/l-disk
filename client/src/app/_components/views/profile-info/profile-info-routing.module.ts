import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileInfoComponent } from './profile-info.component';

const routes: Routes = [{ path: '', component: ProfileInfoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileInfoRoutingModule { }
