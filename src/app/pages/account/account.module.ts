import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountPageRoutingModule } from './account-routing.module';

import { AccountPage } from './account.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ReactiveFormsModule} from '@angular/forms';
import { AccountAddPage } from '../modals/account-add/account-add.page';
import { AccountAddPageModule } from '../modals/account-add/account-add.module';
import { AccountEditPageModule } from '../modals/account-edit/account-edit.module';
import { AccountEditPage } from '../modals/account-edit/account-edit.page';

@NgModule({
  entryComponents:[
    AccountAddPage,
    AccountEditPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountPageRoutingModule,
    ComponentsModule,
    PipesModule,
    ReactiveFormsModule,
    AccountAddPageModule,
    AccountEditPageModule
  ],
  declarations: [AccountPage]
})
export class AccountPageModule {}
