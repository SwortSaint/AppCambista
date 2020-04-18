import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';

import { AccountUserRegisterPageModule } from '../modals/account-user-register/account-user-register.module';
import { AccountUserRegisterPage } from '../modals/account-user-register/account-user-register.page';

@NgModule({
  entryComponents:[
    AccountUserRegisterPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    LoginPageRoutingModule,
    AccountUserRegisterPageModule
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
