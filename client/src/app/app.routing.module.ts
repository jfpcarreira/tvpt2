import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ClientListComponent } from './components/client/list/list.component';
import { ClientNewComponent } from './components/client/new/new.component';
import { ServiceListComponent } from './components/service/list/list.component';
import { ServiceNewComponent } from './components/service/new/new.component';
import { CurrencyListComponent } from './components/currency/list/list.component';
import { CurrencyNewComponent } from './components/currency/new/new.component';

const appRoutes: Routes = [{
  path: ''
  , component: HomeComponent
  }, {
    path: 'dashboard'
    , component: DashboardComponent
  }, {
    path: 'register'
    , component: RegisterComponent
  }, {
    path: 'login'
    , component: LoginComponent
  }, {
    path: 'clients'
    , component: ClientListComponent
  }, {
    path: 'clients/new'
    , component: ClientNewComponent
  }, {
    path: 'services'
    , component: ServiceListComponent
  }, {
    path: 'services/new'
    , component: ServiceNewComponent
  }, {
    path: 'currencies'
    , component: CurrencyListComponent
  }, {
    path: 'currencies/new'
    , component: CurrencyNewComponent
  }, {
    path: '**'
    , component: HomeComponent
}];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [],
  exports: [RouterModule]
})

export class AppRoutingModule { }
