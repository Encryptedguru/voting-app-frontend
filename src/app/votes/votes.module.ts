import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VotesRoutingModule } from './votes-routing.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { VotesService } from './votes.service';

import { CompetitorsVotesComponent } from './competitors-votes/competitors-votes.component';
import { ResultsComponent } from './results/results.component';


@NgModule({
  declarations: [
    CompetitorsVotesComponent,
    ResultsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    VotesRoutingModule
  ],
  providers: [
    VotesService
  ]
})
export class VotesModule { }
