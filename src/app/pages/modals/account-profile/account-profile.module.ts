import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountProfilePageRoutingModule } from './account-profile-routing.module';

import { AccountProfilePage } from './account-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AccountProfilePageRoutingModule
  ],
  declarations: [AccountProfilePage]
})
export class AccountProfilePageModule {}
