import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransactionCashPageRoutingModule } from './transaction-cash-routing.module';

import { TransactionCashPage } from './transaction-cash.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    TransactionCashPageRoutingModule
  ],
  declarations: [TransactionCashPage]
})
export class TransactionCashPageModule {}
