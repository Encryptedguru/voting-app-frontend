import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './register/register.component';
import { MaterialModule } from '../material/material.module';
import { LoginComponent } from './login/login.component';
import { VotersComponent } from './voters/voters.component';
import { UpdateComponent } from './update/update.component';
import { VoterComponent } from './voter/voter.component';
import { AuthService } from './services/auth.service';


@NgModule({
  declarations: [
    VoterComponent,
    RegisterComponent,
    LoginComponent,
    UpdateComponent,
    VotersComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    AuthRoutingModule
  ],
  exports: [
    MaterialModule
  ],
  providers: [AuthService]
})
export class AuthModule { }
