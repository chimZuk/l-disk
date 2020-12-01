import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FileBrowserPageComponent } from './file-browser-page.component';

const routes: Routes = [
  {
    path: '', component: FileBrowserPageComponent,
    children: [
      {
        path: '*',
        redirectTo: '',
        pathMatch: 'full'
      },
      {
        path: '',
        redirectTo: 'albums',
        pathMatch: 'full'
      },
      { path: 'albums', loadChildren: () => import('../../views/collections/collections.module').then(m => m.CollectionsModule) },
      { path: 'shared', loadChildren: () => import('../../views/collections/collections.module').then(m => m.CollectionsModule) },
      { path: 'photos', loadChildren: () => import('../../views/photos/photos.module').then(m => m.PhotosModule) },
      { path: 'profile-info', loadChildren: () => import('../../views/profile-info/profile-info.module').then(m => m.ProfileInfoModule) },
      { path: 'profile-settings', loadChildren: () => import('../../views/profile-settings/profile-settings.module').then(m => m.ProfileSettingsModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FileBrowserPageRoutingModule { }
