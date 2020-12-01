import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuardService } from './_services/guard/guard.service';


const routes: Routes = [
  { path: '', loadChildren: () => import('./_components/pages/file-browser-page/file-browser-page.module').then(m => m.FileBrowserPageModule), canActivate: [GuardService] },
  { path: 'login', loadChildren: () => import('./_components/pages/index-page/index-page.module').then(m => m.IndexPageModule), canActivate: [GuardService] },
  { path: '*', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
