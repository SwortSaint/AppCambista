import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountAddPage } from './account-add.page';

const routes: Routes = [
  {
    path: '',
    component: AccountAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountAddPageRoutingModule {}
