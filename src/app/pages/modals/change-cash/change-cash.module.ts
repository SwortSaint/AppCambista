import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangeCashPageRoutingModule } from './change-cash-routing.module';

import { ChangeCashPage } from './change-cash.page';
import { TransactionCashPageModule } from '../transaction-cash/transaction-cash.module';
import { TransactionCashPage } from '../transaction-cash/transaction-cash.page';

@NgModule({
   entryComponents:[
    TransactionCashPage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ChangeCashPageRoutingModule,
    TransactionCashPageModule
  ],
  declarations: [ChangeCashPage]
})
export class ChangeCashPageModule {}
