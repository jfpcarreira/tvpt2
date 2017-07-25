import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app.routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { ClientsListComponent } from './components/clients-list/clients-list.component';
import { LoginComponent } from './components/login/login.component';
import { NewClientComponent } from './components/new-client/new-client.component';

import { AuthService } from './services/auth.service';
import { ClientService } from './services/client.service';

@NgModule({
  declarations: [
      AppComponent
    , NavbarComponent
    , HomeComponent
    , DashboardComponent
    , RegisterComponent
    , ClientsListComponent
    , LoginComponent
    , NewClientComponent
  ],
  imports: [
      BrowserModule
    , HttpModule
    , ReactiveFormsModule
    , AppRoutingModule
    , BrowserAnimationsModule
    , ToastrModule.forRoot()
  ],
  providers: [
      AuthService
    , ClientService
  ],
  bootstrap: [
      AppComponent
  ]
})
export class AppModule { }
