import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicSelectableModule } from 'ionic-selectable';

import { IonicModule } from '@ionic/angular';

import { InicioPageRoutingModule } from './inicio-routing.module';

import { InicioPage } from './inicio.page';
import { ChangeCashPage } from '../modals/change-cash/change-cash.page';
import { ChangeCashPageModule } from '../modals/change-cash/change-cash.module';

@NgModule({
  entryComponents:[
    ChangeCashPage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicSelectableModule,
    InicioPageRoutingModule,
    ChangeCashPageModule
  ],
  declarations: [InicioPage]
})
export class InicioPageModule {}
