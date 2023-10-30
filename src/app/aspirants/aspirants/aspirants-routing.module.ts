import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { GetaspirantsComponent } from './getaspirants/getaspirants.component';
import { ViewAspirantComponent } from './view-aspirant/view-aspirant.component';

import { AuthGuard } from 'src/app/auth/auth.guard';
import { AspirantGuard } from 'src/app/auth/aspirant.guard';

const routes: Routes = [

  {path: "voters/:voterId/register-aspirant", component: RegisterComponent},
  {path: 'aspirants', component: GetaspirantsComponent, },
  {path: 'aspirants/:id', component: ViewAspirantComponent, canActivate: [AuthGuard, AspirantGuard]},
  {path: 'edit/:id', component: RegisterComponent, canActivate: [AuthGuard, AspirantGuard]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AspirantsRoutingModule { }
