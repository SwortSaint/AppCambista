import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountAddPageRoutingModule } from './account-add-routing.module';

import { AccountAddPage } from './account-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AccountAddPageRoutingModule
  ],
  declarations: [AccountAddPage]
})
export class AccountAddPageModule {}
