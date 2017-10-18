import { BrowserModule }                    from '@angular/platform-browser';
import { NgModule }                         from '@angular/core';
import { ReactiveFormsModule }              from '@angular/forms';
import { HttpClientModule, HttpClient }     from '@angular/common/http';
import { BrowserAnimationsModule }          from '@angular/platform-browser/animations';
import { NgbModule }                        from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { ToastrModule }                     from 'ngx-toastr';
import { Ng4LoadingSpinnerModule }          from 'ng4-loading-spinner';

import { MyTranslateStaticLoader }          from './tools/MyTranslateStaticLoader';
import { AppRoutingModule }                 from './app.routing.module';
import { environment }                      from '../environments/environment';

import { AppComponent }                     from './app.component';
import { NavbarComponent }                  from './components/navbar/navbar.component';
import { HomeComponent }                    from './components/home/home.component';
import { DashboardComponent }               from './components/dashboard/dashboard.component';
import { RegisterComponent }                from './components/register/register.component';
import { LoginComponent }                   from './components/login/login.component';
import { ClientListComponent }              from './components/client/list/list.component';
import { ClientNewComponent }               from './components/client/new/new.component';
import { ServiceListComponent }             from './components/service/list/list.component';
import { ServiceNewComponent }              from './components/service/new/new.component';
import { CurrencyListComponent }            from './components/currency/list/list.component';
import { CurrencyNewComponent }             from './components/currency/new/new.component';

import { AuthService }                      from './services/auth.service';
import { UtilsService }                     from './services/utils.service';
import { ClientService }                    from './services/client.service';
import { ServiceService }                   from './services/service.service';
import { CurrencyService }                  from './services/currency.service';

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
    , Ng4LoadingSpinnerModule
    , NgbModule.forRoot()
    , ToastrModule.forRoot()
    , TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader
          , useFactory: MyTranslateStaticLoader
          , deps: [HttpClient]
        }
      })
  ],
  providers: [
      AuthService
    , UtilsService
    , ClientService
    , ServiceService
    , CurrencyService
  ],
  bootstrap: [
      AppComponent
  ]
})
export class AppModule { }
