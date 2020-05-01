import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransactionCashPage } from './transaction-cash.page';

const routes: Routes = [
  {
    path: '',
    component: TransactionCashPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionCashPageRoutingModule {}
