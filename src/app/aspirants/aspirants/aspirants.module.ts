import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AspirantsRoutingModule } from './aspirants-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

import { RegisterComponent } from './register/register.component';
import { GetaspirantsComponent } from './getaspirants/getaspirants.component';
import { ViewAspirantComponent } from './view-aspirant/view-aspirant.component';


@NgModule({
  declarations: [
    RegisterComponent,
    GetaspirantsComponent,
    ViewAspirantComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    AspirantsRoutingModule
  ]
})
export class AspirantsModule { }
