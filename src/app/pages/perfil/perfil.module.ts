import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilPageRoutingModule } from './perfil-routing.module';

import { PerfilPage } from './perfil.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { TermsPageModule } from '../modals/terms/terms.module';
import { TermsPage } from '../modals/terms/terms.page';

@NgModule({
  entryComponents:[
    TermsPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilPageRoutingModule,
    ComponentsModule,
    TermsPageModule
  ],
  declarations: [PerfilPage]
})
export class PerfilPageModule {}
