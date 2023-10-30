import { Component, OnInit, OnDestroy } from '@angular/core';
import { Voter, Alert } from '../interfaces';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-voters',
  templateUrl: './voters.component.html',
  styleUrls: ['./voters.component.scss']
})
export class VotersComponent implements OnInit, OnDestroy {
  loading:boolean = false
  votersSubs: Subscription
  voters:Voter[];
  messageToast:Alert;
  displayedColumns: string[] = ['idNumber', 'county', 'constituency', 'ward', 'view', 'aspirant']

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.getVoters()
    
   this.votersSubs = this.authService.votersUpdateListener().subscribe((voters: Voter[]) => {
      this.voters = voters
    })
  }

  getVoters() {
    this.loading = true
    this.authService.getVoters()
  }

  ngOnDestroy(): void {
    this.votersSubs.unsubscribe()
  }
}
