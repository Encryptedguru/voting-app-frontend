import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { VotingModule } from './voting/voting.module';
import { AuthModule } from './auth/auth.module';
import { AspirantsModule } from './aspirants/aspirants/aspirants.module';
import { VotesModule } from './votes/votes.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { StaticNavComponent } from './components/static-nav/static-nav.component';
import { DynamicNavComponent } from './components/dynamic-nav/dynamic-nav.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AlertComponent } from './global/alert/alert.component';

import { ErrorInterceptor } from './global/error.interceptor';
import { HeadersInterceptor } from './global/headers.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
    StaticNavComponent,
    DynamicNavComponent,
    DashboardComponent,
    AlertComponent,
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    VotingModule,
    AuthModule,
    AspirantsModule,
    VotesModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HeadersInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
