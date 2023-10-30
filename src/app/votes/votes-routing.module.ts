import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompetitorsVotesComponent } from './competitors-votes/competitors-votes.component';
import { ResultsComponent } from './results/results.component';

const routes: Routes = [
  {path: 'votes', component: CompetitorsVotesComponent},
  {path: 'results', component: ResultsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VotesRoutingModule { }
