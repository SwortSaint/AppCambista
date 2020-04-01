import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {ComponentsModule} from './components/components.module';
import { HttpClientModule } from '@angular/common/http';
import { PipesModule } from './pipes/pipes.module';
import { ReactiveFormsModule} from '@angular/forms';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
const config: SocketIoConfig = { url: 'http://localhost:5000', options: {} };

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, ReactiveFormsModule , IonicModule.forRoot({
    mode: 'ios',
    backButtonText: 'Atrás'
  }), AppRoutingModule,
      ComponentsModule,
      PipesModule,
      HttpClientModule,
      SocketIoModule.forRoot(config)
],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
