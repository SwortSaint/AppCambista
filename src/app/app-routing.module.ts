import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UserGuard } from './guards/user.guard';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule),
    canLoad: [ UserGuard ]
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule),
    canLoad: [ UserGuard ]
  },
  {
    path: 'chat',
    loadChildren: () => import('./pages/chat/chat.module').then( m => m.ChatPageModule),
    canLoad: [ UserGuard ]
  },
  {
    path: 'account',
    loadChildren: () => import('./pages/account/account.module').then( m => m.AccountPageModule),
    canLoad: [ UserGuard ]
  },
  {
    path: 'account-edit',
    loadChildren: () => import('./pages/modals/account-edit/account-edit.module').then( m => m.AccountEditPageModule),
    canLoad: [ UserGuard ]
  },
  {
    path: 'transaction',
    loadChildren: () => import('./pages/transaction/transaction.module').then( m => m.TransactionPageModule),
    canLoad: [ UserGuard ]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'terms',
    loadChildren: () => import('./pages/modals/terms/terms.module').then( m => m.TermsPageModule),
    canLoad: [ UserGuard ]
  },
  {
    path: 'account-user-register',
    loadChildren: () => import('./pages/modals/account-user-register/account-user-register.module').then( m => m.AccountUserRegisterPageModule),
    canLoad: [ UserGuard ]
  },
  {
    path: 'account-profile',
    loadChildren: () => import('./pages/modals/account-profile/account-profile.module').then( m => m.AccountProfilePageModule),
    canLoad: [ UserGuard ]
  },
  {
    path: 'change-cash',
    loadChildren: () => import('./pages/modals/change-cash/change-cash.module').then( m => m.ChangeCashPageModule)
  },
  {
    path: 'transaction-cash',
    loadChildren: () => import('./pages/modals/transaction-cash/transaction-cash.module').then( m => m.TransactionCashPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
