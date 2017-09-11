import { BrowserModule }                from '@angular/platform-browser';
import { NgModule }                     from '@angular/core';
import { ReactiveFormsModule }          from '@angular/forms';
import { Http }                         from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule }      from '@angular/platform-browser/animations';
import { ToastrModule }                 from 'ngx-toastr';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';

import { MyTranslateStaticLoader }      from './tools/MyTranslateStaticLoader';
import { AppRoutingModule }             from './app.routing.module';
import { environment }                  from '../environments/environment';

import { AppComponent }                 from './app.component';
import { NavbarComponent }              from './components/navbar/navbar.component';
import { HomeComponent }                from './components/home/home.component';
import { DashboardComponent }           from './components/dashboard/dashboard.component';
import { RegisterComponent }            from './components/register/register.component';
import { LoginComponent }               from './components/login/login.component';
import { ClientListComponent }          from './components/client/list/list.component';
import { ClientNewComponent }           from './components/client/new/new.component';
import { ServiceListComponent }         from './components/service/list/list.component';
import { ServiceNewComponent }          from './components/service/new/new.component';
import { CurrencyListComponent }        from './components/currency/list/list.component';
import { CurrencyNewComponent }         from './components/currency/new/new.component';

import { AuthService }                  from './services/auth.service';
import { ClientService }                from './services/client.service';
import { ServiceService }               from './services/service.service';
import { CurrencyService }              from './services/currency.service';

@NgModule({
  declarations: [
      AppComponent
    , NavbarComponent
    , HomeComponent
    , DashboardComponent
    , RegisterComponent
    , LoginComponent
    , ClientListComponent
    , ClientNewComponent
    , ServiceListComponent
    , ServiceNewComponent
    , CurrencyNewComponent
    , CurrencyListComponent
  ],
  imports: [
      BrowserModule
    , HttpClientModule
    , ReactiveFormsModule
    , AppRoutingModule
    , BrowserAnimationsModule
    , ToastrModule.forRoot()
    , TranslateModule.forRoot({
          provide: TranslateLoader
        , useFactory: MyTranslateStaticLoader
        , deps: [Http]
      })
  ],
  providers: [
      AuthService
    , ClientService
    , ServiceService
    , CurrencyService
  ],
  bootstrap: [
      AppComponent
  ]
})
export class AppModule { }
