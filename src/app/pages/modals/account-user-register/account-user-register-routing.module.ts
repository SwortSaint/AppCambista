import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountUserRegisterPage } from './account-user-register.page';

const routes: Routes = [
  {
    path: '',
    component: AccountUserRegisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountUserRegisterPageRoutingModule {}
