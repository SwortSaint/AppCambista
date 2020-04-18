import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from 'src/app/components/components.module';
import { AccountUserRegisterPageRoutingModule } from './account-user-register-routing.module';
import { AccountUserRegisterPage } from './account-user-register.page';


@NgModule({
  entryComponents:[
    AccountUserRegisterPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ReactiveFormsModule,
    AccountUserRegisterPageRoutingModule
  ],
  declarations: [AccountUserRegisterPage]
})
export class AccountUserRegisterPageModule {}
