import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountProfilePage } from './account-profile.page';

const routes: Routes = [
  {
    path: '',
    component: AccountProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountProfilePageRoutingModule {}
