import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UpdateComponent } from './update/update.component';
import { VotersComponent } from './voters/voters.component';
import { VoterComponent } from './voter/voter.component';

const routes: Routes = [
  {path:'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'voters', component: VotersComponent},
  {path: 'voters/:id', component: VoterComponent},
  {path: 'update/:id', component:UpdateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
