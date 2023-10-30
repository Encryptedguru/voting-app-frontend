import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms'

import { VotingRoutingModule } from './voting-routing.module';
import { VotingComponent } from './voting/voting.component';
import { AspirantComponent } from './aspirant/aspirant.component';
import { MaterialModule } from '../material/material.module';





@NgModule({
  declarations: [
    VotingComponent,
    AspirantComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    VotingRoutingModule
  ]
})
export class VotingModule { }
