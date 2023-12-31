import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../auth/auth.guard';

import { VotingComponent } from './voting/voting.component';

const routes: Routes = [
  {path: 'voting', component: VotingComponent, canActivate: [AuthGuard]}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VotingRoutingModule { }
